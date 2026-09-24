# AI Integration PCF

`ApiFieldMapper` is a Power Apps Component Framework control for model-driven Case forms. It sends Case information to a configurable AI endpoint, normalizes the returned recommendation, presents it for review, and maps the approved values to Dataverse fields.

The control supports four user actions:

- **Generate** retrieves or simulates an AI recommendation and saves a persistent preview.
- **Accept** writes the recommendation to the mapped Case fields and can create related legal-note records.
- **Modify** places the recommendation in bound form fields for manual editing without automatically saving those operational fields.
- **Reject** removes or restores operational AI values while preserving the recommendation and the Rejected status for audit and display.

## Project Status

- Initial generation when the form first loads is currently disabled.
- Automatic generation based on Service Status and Route to Service Provider Count is active.
- The endpoint timeout is 900 seconds.
- Development logging and raw JSON display are controlled by `isdevleopment`.
- The repository does not currently contain an automated test suite.
- Local verification for this project must use `npm run build`. Do not build the full Dataverse solution package as part of normal PCF verification.

## Architecture

The control is divided into four main files:

| File | Responsibility |
| --- | --- |
| `ApiFieldMapper/index.ts` | PCF lifecycle, endpoint calls, response parsing, action handling, Dataverse persistence, gates, and auto-generation. |
| `ApiFieldMapper/ApiFieldMapperView.tsx` | React presentation, badges, tooltips, legal-note display, and button availability. |
| `ApiFieldMapper/css/ApiFieldMapper.css` | Control layout, action styling, status badges, legal-note cards, and responsive behavior. |
| `ApiFieldMapper/ControlManifest.Input.xml` | Maker-facing inputs, bound outputs, feature flags, and Web API capability declaration. |

Supporting files include:

| File | Purpose |
| --- | --- |
| `AI_Integration_PCF.pcfproj` | PCF MSBuild project definition. |
| `Solution/AgenticAPIPCF` | Dataverse solution wrapper. It is not required for the normal `npm run build` verification step. |
| `incident.js` | External Case form script retained as a reference. It is not imported by the PCF and should not be modified as part of PCF maintenance. |
| `test.json` | General testing response used with `testingResponseJson`. |
| `need_more_info_test_payload.json` | Example of the `NeedMoreInfo` response flow. |
| `Route_To_SP_reponse.json` | Route to Service Provider testing response. |
| `Route_To_deaprtment_Test_response.json` | Department response reference file. It currently contains more than one JSON document and cannot be pasted directly as one testing response. |

## Runtime Flow

The high-level control flow is:

1. `init` stores the PCF callbacks, hydrates bound values, starts persisted-state loading, and starts BPF and owner checks.
2. `updateView` refreshes configuration, record gates, persisted review state, and service-status auto-generation state.
3. The React view receives the current recommendation, status, permissions, and callbacks.
4. Generate validates record access and BPF state.
5. Generate either parses `testingResponseJson` or calls the configured endpoint.
6. The response is normalized into one `PendingSuggestion` model.
7. The generated preview and reserved AI fields are saved through `context.webAPI.updateRecord`.
8. Accept, Modify, or Reject applies the behavior described in the action matrix below.

The control uses a generation identifier and `AbortController` so an older asynchronous response cannot overwrite a newer request.

## Request Construction

### Prompt priority

The prompt is selected in this order:

1. `inputValue`, when it contains text.
2. A generated prompt using `caseDetails`, the Service Provider option-set label, and `providerResponse`.

The generated prompt has this structure:

```text
Please review the following case details and provide a suggested decision based on our uploaded knowledge base documents:
- Case Details: <caseDetails>
- Service Provider Name: <providerName label>
- Service Provider Response: <providerResponse>
```

The numeric Service Provider value is not sent when a label can be resolved. The control first uses the bound field's formatted value or option metadata. For on-premises environments where that metadata is unavailable, it queries the global option set named `ldv_serviceprovider`.

### Default request body

When `requestTemplate` is empty and the method is not GET, the control sends:

```json
{
  "CaseId": "<current Case GUID>",
  "InputText": "<selected prompt>"
}
```

### Request template

`requestTemplate` replaces double-brace tokens. For example:

```json
{
  "CaseId": "{{CaseId}}",
  "InputText": "{{inputText}}",
  "IncludeLegalNotes": "{{includeLegalNotes}}"
}
```

Supported tokens are:

| Token | Value |
| --- | --- |
| `{{apiRequestId}}` | New request GUID. |
| `{{apiVersion}}` | Configured API version or `1.0`. |
| `{{CaseId}}`, `{{caseId}}`, `{{recordId}}` | Current Case record GUID. |
| `{{caseDetails}}` | Bound Case details text. |
| `{{caseRequestId}}`, `{{requestId}}` | Current Case record GUID. |
| `{{correlationId}}` | New correlation GUID. |
| `{{entityName}}` | Current Dataverse table logical name. |
| `{{includeLegalNoteText}}` | Legal-note text flag. |
| `{{includeLegalNotes}}` | Legal-note association flag. |
| `{{inputText}}`, `{{requestNumber}}`, `{{value}}` | Selected prompt text. |
| `{{providerName}}` | Service Provider option-set label. |
| `{{providerResponse}}` | Service Provider response text. |

Single-brace tokens such as `{CaseId}` are not replaced. Use `{{CaseId}}`.

### Headers

The control adds these headers:

- `Accept: application/json`
- `x-correlation-id`
- `x-api-version`
- `Content-Type: application/json` for non-GET requests
- `x-request-id` for non-GET requests

Additional headers can be supplied as a JSON object in `headersJson`. Template tokens are also replaced inside that JSON. Authorization header values are redacted from development logs.

### GET requests

GET requests do not contain a body. The control adds `caseId`, `CaseId`, `inputText`, and `correlationId` query parameters.

### Dynamic Dataverse URL

When `isBaseUrlDynamicallyHandled` is Yes, the control uses the current Dataverse client URL and preserves the `/api/data/...` path from `apiEndpoint`. If no usable path is configured, it falls back to:

```text
/api/data/v9.1/ldv_CallAzureAgentAIAction
```

### Testing response

When `testingResponseJson` contains valid JSON:

- No endpoint is required.
- No HTTP request is made.
- The normal parser, preview persistence, UI, and review actions are still used.
- Record owner, inactive-record, and BPF restrictions still apply.

## Supported Response Shape

The parser accepts a direct response, a standard `{ success, data, error }` envelope, or a Dataverse action response containing a JSON string in `OutputResult`.

A representative response is:

```json
{
  "Decision": "Route to Department",
  "DecisionValue": 2,
  "Validation": "Valid",
  "ValidationValue": 1,
  "CloseInFavorOf": "N/A",
  "CloseInFavorOfValue": 0,
  "InvalidReason": "",
  "InvalidReasonValue": 0,
  "Department1Json": "{\"Id\":\"a1102c7a-e5e9-e511-80ce-00155d7e9f35\",\"Name\":\"Administration Dept - Procurement & Contracts Section\"}",
  "RouteToSPReasonsJson": "{}",
  "Reason": "Route the case to the selected department.",
  "LegalNotesJson": "[]",
  "MatchedCasesJson": "[]",
  "OutputResult": "{\"Decision\":\"Route to Department\",\"DecisionValue\":2}"
}
```

### Parsed recommendation fields

The normalizer supports common casing and naming variations for:

- Decision and `DecisionValue`
- Validation and `ValidationValue`
- Closed In Favor Of and its numeric value
- Invalid Reason and its numeric value
- Feedback or Reason
- Customer Call Instructions
- Confidence
- Route to Service Provider Reason
- Department 1
- Legal Notes

When `OutputResult` is valid object JSON, it is merged with the outer action response. The embedded result can provide recommendation values while outer action properties remain available.

### Option sets

Option sets are normalized as:

```json
{
  "label": "Route to Department",
  "value": 2
}
```

Values at or below zero are treated as empty option values. Placeholder labels such as `N/A`, `none`, `null`, and `not applicable` are treated as missing.

Known Decision values are:

| Value | Decision |
| --- | --- |
| `1` | Route to Service Provider |
| `2` | Route to Department |
| `3` | Assess Dispute |
| `4` | Set On Hold |
| `5` | Route to IVR |
| `6` | Escalate to Lead |

The control uses the bound Decision field metadata when available. If on-premises PCF metadata does not expose its options, values 1 through 6 are used as the fallback valid set.

### Invalid Reason values

The parser maps these labels when a numeric value is not returned:

| Value | Label |
| --- | --- |
| `1` | Wrong Feedback |
| `2` | Missing Details |
| `3` | Missing Docs |
| `4` | Feedback not clear |
| `5` | Extra Info required |
| `6` | Final Billing Approval |
| `7` | No Issue from SP Side |
| `8` | Consumer Behavior |
| `9` | Process and Policies |
| `10` | TDRA-related |

### Lookup JSON

`RouteToSPReasonsJson` and `Department1Json` accept a JSON object or a JSON-encoded string with this shape:

```json
{
  "Id": "<Dataverse GUID>",
  "Name": "<display name>",
  "LogicalName": "<optional target table logical name>"
}
```

If the response does not include a target logical name, configure `routeToSPReasonLookupLogicalName` or `department1LookupLogicalName`. The PCF lookup parameter metadata is used only as a fallback because some host versions report the Case table instead of the referenced lookup table.

### Legal notes

The parser supports both flat and nested legal-note structures.

Nested example:

```json
[
  {
    "Category": { "Id": "<guid>", "Name": "Category" },
    "Level1": { "Id": "<guid>", "Name": "Level 1" },
    "Level2": null,
    "Level3": null,
    "Level4": null
  }
]
```

Flat example:

```json
[
  {
    "CategoryId": "<guid>",
    "Level1Id": "<guid>",
    "LegalNoteCategory": "Category",
    "LegalNoteLevel1": "Level 1"
  }
]
```

Rules:

- An empty string, `null`, or `[]` is displayed as no legal notes.
- Level 1 is required before the PCF creates a related legal-note record.
- Levels 2 through 4 are optional.
- Legal notes under matched-case data are not used as the recommendation's legal notes.
- Association occurs only when `includeLegalNotes` is enabled and the decision is Assess Dispute.

## Review Actions

| Action | Operational fields | Reserved fields | Save behavior | Pending recommendation |
| --- | --- | --- | --- | --- |
| Generate | Not applied | Saved with `Generated` status | Web API update | Available for review |
| Accept | Applied according to decision | Saved with `Accepted` status | Web API update, then legal-note creation | Cleared after a successful save |
| Modify | Emitted to bound form fields | Saved with `Modified` status | Reserved fields use Web API; operational fields remain form edits | Remains available |
| Reject | Restored or cleared | Saved with `Rejected` status | Web API update | Removed from action state but retained for persistent display |

### Decision-specific comments

The returned feedback is routed to one decision-specific bound field:

- Assess Dispute -> `assessDisputeComment`
- Route to Service Provider -> `routeToServiceProviderComment`
- Route to Department -> `routeToDepartmentComment`
- Escalate to Lead -> `escalateToLeadComment`

The generic `suggestedComment`, `resultText`, and `feedbackByAI` fields are maintained for compatibility and persistence.

### Agent comment sequencing

When a mapped comment field has logical name `ldv_agentcomment`, Modify temporarily holds that output from the first PCF output packet and replays it after short delays. This protects the value from Case form scripts that overwrite the agent comment during the initial field update.

### Reject restoration

Reject uses an explicit output packet because omitting a PCF output leaves the existing CRM value unchanged. Lookup clears are sent as the lookup logical name with `null`; the control never sends `lookup@odata.bind: null`, because Dataverse rejects a null `odata.bind` annotation.

## Button Availability

### Generate

Generate requires:

- A saved record and identifiable current user
- Current user ownership of the Case
- An active Case record
- An allowed BPF stage when BPF handling is enabled
- A valid endpoint, unless testing JSON is populated
- A prompt, unless testing JSON is populated

`isDisabled` does not disable Generate. It disables review actions only.

### Accept

Accept is disabled when any of these conditions applies:

- The common owner, inactive-record, or BPF gate fails.
- `isDisabled` is Yes.
- `disableAccept` is Yes.
- No recommendation is pending.
- Decision by AI is missing or is not a valid bound option.
- Decision is Assess Dispute, because Customer Satisfaction must be completed outside the PCF.
- Validation is Invalid, `applyInvalidReasonRequirement` is enabled, and Invalid Reason is missing or invalid.
- Decision is Route to Department, `isDepartment1Required` is enabled, and Department 1 has no valid Dataverse GUID.
- The response indicates that more information is needed.

All applicable Accept reasons are combined in the button tooltip.

### Modify

Modify uses the common action gates and always requires a valid Decision by AI. It does not automatically save the operational form fields.

### Reject

Reject uses the common action gates. An invalid or missing Decision blocks Reject only when `disableRejectWhenDecisionInvalid` is Yes.

## Persistent Review State

The reserved fields keep the recommendation visible across normal tabs, associated grids, form refreshes, browser closure, and later reopening of the Case.

The persisted action labels are:

- `Generated`
- `Accepted`
- `Modified`
- `Rejected`

The control reads reserved values directly from Dataverse. A local revision counter and refresh-pause depth prevent an older asynchronous read from overwriting a newer action that is still being saved.

The full `resultJson` is also saved. This allows Route to SP Reason, Department 1, legal notes, and other values that do not have dedicated reserved fields to be reconstructed.

## Access and Disable Gates

### Owner gate

The PCF retrieves `_ownerid_value` and `statecode` from the current record. Only the current Case owner can Generate, Accept, Modify, or Reject. Owner state is refreshed at most once every five seconds unless an action forces a new check.

The PCF cannot impersonate an administrator. Dataverse custom actions, plugins, field updates, metadata reads, and legal-note creation execute under the current user's permissions unless server-side code is explicitly registered to run under another account.

### Inactive record gate

When `statecode` is not Active, the entire control is disabled, including Generate.

### Manual review gate

When `isDisabled` is Yes, Accept, Modify, and Reject are disabled. Generate remains available so the user can preview a fixed or live response.

### BPF gate

When `isBpfHandled` is Yes:

- The PCF queries the configured BPF table for the current Case.
- It resolves `_activestageid_value` to the process stage name.
- The stage name must match one of `allowedBpfStageNames`, case-insensitively.
- A failed stage match disables the entire control.
- The current stage is refreshed at most once every five seconds unless an action forces a refresh.

Default values are:

- BPF table: `ldv_bpf_c7bfac2f19d840fdafbbe0bcafa3b206`
- Case lookup: `bpf_incidentid`
- Allowed stage: `Customer Care Decision`

## Service-Status Auto-Generation

Auto-generation is evaluated during `updateView` and requires both conditions:

1. The live Service Status name matches `autoGenerateServiceStatusNames`.
2. The live Route to Service Provider Count is greater than the last auto-generated count.

The default allowed status is `Pending on Customer Care`.

For each check, the control reads these values directly from Dataverse:

- Current Service Status
- Current Route to Service Provider Count
- Last Auto Generated Service Status
- Last Auto Generated Route to Service Provider Count

Live reads are used because PCF bound parameters can remain stale after a Web API update or after navigation through an associated grid.

After a generated preview succeeds in an eligible status, the current status GUID and route count are saved as the processed markers. An in-memory key also prevents duplicate calls from the same control instance.

Initial form-load generation is currently not invoked. The retained `tryInitialGenerate` method does not run because its call in `updateView` is commented out.

## Manifest Configuration

### Host and prompt inputs

| Property | Type / usage | Purpose |
| --- | --- | --- |
| `BoundField` | Text / bound | Host field used to place the control on the form. |
| `inputValue` | Text / input | Direct prompt override. Takes priority over generated prompt fields. |
| `caseDetails` | Text group / input | Case details used in the generated prompt. |
| `providerName` | Option set / input | Service Provider whose label is added to the prompt. |
| `providerResponse` | Text group / input | Service Provider response used in the generated prompt. |

### Endpoint inputs

| Property | Type / usage | Purpose |
| --- | --- | --- |
| `apiEndpoint` | URL / input | AI endpoint or Dataverse custom-action URL. |
| `isBaseUrlDynamicallyHandled` | Yes/No enum / input | Replaces the configured host with the current Dataverse client URL. |
| `testingResponseJson` | Text group / input | Local response used instead of calling the endpoint. |
| `requestMethod` | Text / input | GET, POST, PUT, or PATCH. Defaults to POST. |
| `requestTemplate` | Multiline / input | JSON body template using double-brace tokens. |
| `headersJson` | Multiline / input | Additional request headers as JSON. |
| `apiVersion` | Text / input | Value sent in `x-api-version`; defaults to `1.0`. |
| `includeLegalNoteText` | Two options / input | Template flag indicating whether legal-note text is requested. |
| `resultPath` | Text / input | Optional fallback JSON path for the main result text. |

### Behavior inputs

| Property | Default | Purpose |
| --- | --- | --- |
| `isDisabled` | No | Disables review actions but leaves Generate available. |
| `disableAccept` | No | Disables Accept independently of other review actions. |
| `isdevleopment` | Production | Enables development logs, numeric option values, lookup GUIDs, and raw JSON. The misspelling is part of the current manifest contract. |
| `includeLegalNotes` | Do not include | Enables legal-note creation for Assess Dispute. |
| `isBpfHandled` | No | Enables the allowed-stage gate. |
| `allowUnsupportedFormRefresh` | No | Compatibility flag for legacy `Xrm.Page` refresh behavior. See Known Limitations. |
| `applyInvalidReasonRequirement` | Yes | Blocks Accept when Validation is Invalid and Invalid Reason is unavailable. |
| `disableRejectWhenDecisionInvalid` | No | Optionally applies Decision validation to Reject. |
| `isDepartment1Required` | No | Requires a valid Department 1 for Route to Department before Accept. |

### BPF and auto-generation inputs

| Property | Purpose |
| --- | --- |
| `bpfEntityName` | BPF table logical name. |
| `bpfCaseLookupFieldName` | BPF lookup that links the process instance to the Case. |
| `allowedBpfStageNames` | One allowed stage or a comma-separated list. |
| `serviceStatus` | Current Case Service Status lookup. |
| `serviceStatusFieldName` | Logical-name override for live status reads. |
| `routeToServiceProviderCount` | Current route counter. |
| `routeToServiceProviderCountFieldName` | Logical-name override for live count reads. |
| `autoGenerateServiceStatusNames` | One eligible status or a comma-separated list. |

### Lookup configuration

| Property | Purpose |
| --- | --- |
| `routeToSPReasonLookupLogicalName` | Target table logical name for Route to SP Reason. |
| `department1LookupLogicalName` | Target table logical name for Department 1. |

### Operational bound fields

| Property | Purpose |
| --- | --- |
| `decisionByAI` | AI Decision option-set value. |
| `customerCallSuggestionInstructionsByAI` | Customer call instructions. |
| `validationByAI` | AI Validation whenever a valid value is returned. |
| `invalidReason` | AI Invalid Reason when Validation is Invalid. |
| `closedInFavorOf` | Closed In Favor Of for Assess Dispute. |
| `routeToSPReasons` | Route to Service Provider Reason lookup. |
| `department1` | Route to Department lookup. |
| `assessDisputeComment` | Feedback for Assess Dispute. |
| `routeToServiceProviderComment` | Feedback for Route to Service Provider. |
| `routeToDepartmentComment` | Feedback for Route to Department. |
| `escalateToLeadComment` | Feedback for Escalate to Lead. |
| `suggestedComment` | Generic compatibility comment. |
| `suggestedDecision` | Generic compatibility Decision label. |
| `legalNotesJson` | Normalized legal-note JSON. |
| `correlationId` | Correlation GUID used for request tracing. |
| `resultText` | Main response text. |
| `resultJson` | Full formatted response JSON. |
| `statusText` | Latest detailed control status. |
| `lastRunOn` | Recommendation generation time. |
| `feedbackByAI` | Persistent generic AI feedback. |

### Reserved bound fields

| Property | Purpose |
| --- | --- |
| `reservedDecisionByAI` | Last generated Decision for persistent display. |
| `reservedFeedbackByAI` | Last generated feedback. |
| `reservedValidationByAI` | Last generated Validation. |
| `reservedInvalidReasonByAI` | Last generated Invalid Reason. |
| `reservedCustomerCallSuggestionInstructionsByAI` | Last generated customer call instructions. |
| `reservedClosedInFavorOfByAI` | Last generated Closed In Favor Of value. |
| `aiReviewStatusLabel` | Generated, Accepted, Modified, or Rejected status. |
| `lastAutoGeneratedServiceStatus` | Last processed Service Status GUID stored as text. |
| `lastAutoGeneratedRouteToServiceProviderCount` | Last processed route count. |

## Dataverse Dependencies

### Case table

The primary record is expected to be `incident`. Bound properties determine the actual Case field logical names used in update payloads.

### Legal-note table

The control creates `ldv_legalnotescase` records and uses these configured schema elements:

- Case relationship: `ldv_incident_ldv_legalnotescase_RelatedCase`
- Category relationship: `ldv_ldv_legalnotecategory_ldv_legalnotescase_Legalnotecategory`
- Level 1 relationship: `ldv_ldv_legalnotelevel1_ldv_legalnotescase_Legalnotelevel1`
- Corresponding Level 2, Level 3, and Level 4 relationships

The control first attempts relationship schema names. If creation fails, it retries using lookup navigation names.

### Permissions

Users need sufficient privileges for the enabled features, including:

- Read and Write on the Case fields bound to the control
- Read access to the current Case owner and state
- Read access to the configured BPF and Process Stage records
- Permission to execute the configured Dataverse action
- Read metadata access required by lookup and option-set fallback logic
- Create, Append, and Append To privileges for legal-note records and their related tables when legal-note association is enabled

Any server-side plugin executed by the action can require additional privileges that are separate from the PCF itself.

## Development Mode

When `isdevleopment` is Development:

- Console messages are written with the `[ApiFieldMapper]` prefix.
- Raw returned JSON is displayed below the control.
- Option-set labels include numeric values.
- Lookup labels include GUIDs.
- Bound logical-name and payload diagnostics are logged.

Production mode suppresses these logs and development-only values.

## Build and Local Verification

Prerequisites:

- Node.js compatible with the installed `pcf-scripts` version
- npm
- Power Platform build tooling already represented by the project dependencies

Install dependencies when needed:

```powershell
npm install
```

Build the PCF only:

```powershell
npm run build
```

Start the PCF test harness when interactive testing is needed:

```powershell
npm start
```

The harness cannot fully reproduce model-driven form ownership, BPF, bound lookup, associated-grid, or Case form-script behavior. Use `testingResponseJson` on a Dataverse test form for those scenarios.

## Troubleshooting

### Generate remains disabled with "Checking Case owner"

Confirm that the control can identify the current record and `context.userSettings.userId`, and that the user can read `_ownerid_value` and `statecode` on the Case.

### Global action returns resource not found for one user

Confirm the action is activated and included in the deployed solution, then compare the user's privileges with a working user. A browser PCF cannot force the request to execute as an administrator.

### Lookup update reports an invalid `odata.bind`

Configure the lookup target logical-name input and confirm the response contains a valid GUID. Empty lookups must be sent as `<logicalName>: null`, never `<logicalName>@odata.bind: null`.

### Lookup entity set cannot be found

The control asks PCF metadata first, then queries Dataverse `EntityDefinitions`, and finally uses a plural-name fallback. Verify metadata privileges and explicitly configure the target table logical name when PCF lookup metadata is incorrect.

### Option-set value is outside the allowed range

The numeric value returned by the AI must exist in the option set bound to that PCF property. A label alone is not enough for writing the CRM field unless the control has an explicit label mapping, as it does for Invalid Reason.

### Testing response is rejected as invalid JSON

The configured value must be one complete JSON document. Quotes inside JSON-string properties such as `OutputResult`, `LegalNotesJson`, or `Department1Json` must be escaped. JavaScript-style `\'` is not a valid JSON escape.

### Recommendation disappears after an associated-grid tab

Bind all reserved fields and `resultJson` to persistent Case fields. The PCF reads those fields directly from Dataverse when a new control instance is created.

### Auto-generation repeats after tab navigation

Confirm both marker fields are bound and writable. The live route count must be saved to `lastAutoGeneratedRouteToServiceProviderCount` after a successful eligible generation.

### Accept is disabled

Hover over Accept to see every active requirement. Check Decision validity, Assess Dispute Customer Satisfaction handling, Invalid Reason, Department 1, the manual Disable Accept flag, ownership, record state, and BPF stage.

## Known Limitations

- Initial form-load generation is disabled even though its implementation remains in the code.
- The `isdevleopment` property name is misspelled and retained for compatibility.
- The current Accept flow forces the legacy `Xrm.Page` refresh for non-Route-to-SP decisions, so `allowUnsupportedFormRefresh` does not fully control that path.
- Route to Service Provider Accept deliberately skips form refresh because the Case form routing script can react to the saved fields.
- Assess Dispute always disables Accept in the PCF because Customer Satisfaction is handled outside this control.
- `incident.js` can still alter required levels and field values after PCF output events or saves.
- The control has no automated unit or integration test suite.
- The department testing-response file is not currently one valid JSON document.
- Two active `debugger` statements remain in `ApiFieldMapper/index.ts` and should be removed as a separate behavior-neutral cleanup.

## Maintenance Guidance

- Keep operational output fields separate from reserved recommendation fields.
- Persist reserved state through Web API so it survives control recreation.
- Read auto-generation markers live from Dataverse instead of trusting bound parameter refresh timing.
- Never emit an `@odata.bind` property with a null value.
- Keep Reject's explicit null/restoration packet so CRM fields are actually cleared.
- Apply new validation in both the React button state and the controller action handler.
- Add requirement flags directly below their corresponding fields in the manifest.
- Add a short `Reason:` and `Change:` comment above non-obvious maintenance changes.
- Run only `npm run build` for normal project verification.
