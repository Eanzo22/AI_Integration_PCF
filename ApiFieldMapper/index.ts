import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {
    AdvisorSuggestionViewModel,
    ApiFieldMapperView,
    ApiFieldMapperViewProps,
    LegalNoteViewModel,
    OptionSetItemViewModel
} from "./ApiFieldMapperView";
import * as React from "react";
import * as ReactDOM from "react-dom";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH";

interface ContextInfo {
    entityId?: string;
    entityTypeName?: string;
}

interface RequestIdentifiers {
    apiRequestId: string;
    correlationId: string;
}

interface StandardApiResponse {
    success?: boolean;
    statusCode?: number;
    correlationId?: string;
    timestamp?: string;
    message?: string;
    data?: unknown;
    error?: {
        code?: string;
        details?: unknown;
    };
}

interface PendingSuggestion extends AdvisorSuggestionViewModel {
    generatedOnDate: Date;
    rawJson: string;
}

interface SaveResult {
    associatedLegalNotes: number;
    saved: boolean;
}

interface BpfStageResult {
    stageId?: string;
    stageName?: string;
}

interface CommentOutputSnapshot {
    assessDisputeComment?: string;
    escalateToLeadComment?: string;
    feedbackByAI?: string;
    resultText?: string;
    routeToDepartmentComment?: string;
    routeToServiceProviderComment?: string;
    suggestedComment?: string;
}

interface HeldOutputValue {
    name: keyof IOutputs;
    value: string;
}

interface OutputBindingInfo {
    name: keyof IOutputs;
    parameter?: unknown;
    usage: "bound";
    value: OutputValue;
}

interface AgentCommentOutputGate {
    heldOutputs: HeldOutputValue[];
    released: boolean;
    releaseScheduled: boolean;
    sourceAction: string;
    token: number;
}

type OutputValue = Date | number | string | undefined;
type RejectOutputValue = Date | number | string | null;
type OutputSnapshot = Partial<Record<keyof IOutputs, OutputValue>>;
type RejectOutputPacket = Partial<Record<keyof IOutputs, RejectOutputValue>>;

interface XrmGlobalContext {
    getClientUrl?: () => string;
}

interface XrmPage {
    data?: {
        refresh?: (save?: boolean) => PromiseLike<void> | void;
    };
    ui?: {
        refreshRibbon?: (refreshAll?: boolean) => void;
    };
}

interface XrmGlobal {
    Page?: XrmPage;
    Utility?: {
        getGlobalContext?: () => XrmGlobalContext;
    };
}

interface ContextWithPage {
    page?: {
        getClientUrl?: () => string;
    };
}

export class ApiFieldMapper implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private readonly defaultApiEndpoint = "";
    private readonly caseEntityName = "incident";
    private readonly caseEntitySetName = "incidents";
    private readonly legalNoteCategoryEntityName = "ldv_legalnotecategory";
    private readonly legalNoteCategoryEntitySetName = "ldv_legalnotecategories";
    private readonly legalNoteCategoryLookup = "ldv_Legalnotecategory";
    private readonly legalNoteCategoryRelationship = "ldv_ldv_legalnotecategory_ldv_legalnotescase_Legalnotecategory";
    private readonly legalNoteEntityName = "ldv_legalnotescase";
    private readonly legalNoteLevel1EntityName = "ldv_legalnotelevel1";
    private readonly legalNoteLevel1EntitySetName = "ldv_legalnotelevel1s";
    private readonly legalNoteLevel1Lookup = "ldv_Legalnotelevel1";
    private readonly legalNoteLevel1Relationship = "ldv_ldv_legalnotelevel1_ldv_legalnotescase_Legalnotelevel1";
    private readonly legalNoteLevel2EntityName = "ldv_legalnotelevel2";
    private readonly legalNoteLevel2EntitySetName = "ldv_legalnotelevel2s";
    private readonly legalNoteLevel2Lookup = "ldv_Legalnotelevel2";
    private readonly legalNoteLevel2Relationship = "ldv_ldv_legalnotelevel2_ldv_legalnotescase_Legalnotelevel2";
    private readonly legalNoteLevel3EntityName = "ldv_legalnotelevel3";
    private readonly legalNoteLevel3EntitySetName = "ldv_legalnotelevel3s";
    private readonly legalNoteLevel3Lookup = "ldv_Legalnotelevel3";
    private readonly legalNoteLevel3Relationship = "ldv_ldv_legalnotelevel3_ldv_legalnotescase_Legalnotelevel3";
    private readonly legalNoteLevel4EntityName = "ldv_legalnotelevel4";
    private readonly legalNoteLevel4EntitySetName = "ldv_legalnotelevel4s";
    private readonly legalNoteLevel4Lookup = "ldv_Legalnotelevel4";
    private readonly legalNoteLevel4Relationship = "ldv_ldv_legalnotelevel4_ldv_legalnotescase_Legalnotelevel4";
    private readonly legalNoteNameField = "ldv_name";
    private readonly legalNoteRelatedCaseLookup = "ldv_RelatedCase";
    private readonly legalNoteRelatedCaseRelationship = "ldv_incident_ldv_legalnotescase_RelatedCase";
    private readonly requestTimeoutMs = 60000;
    private readonly decisionAssessDisputeValue = 3;
    private readonly decisionEscalateToLeadValue = 6;
    private readonly decisionRouteToDepartmentValue = 2;
    private readonly decisionRouteToServiceProviderValue = 1;
    private readonly agentCommentLogicalName = "ldv_agentcomment";
    private readonly commentOutputReplayDelaysMs = [250, 1000];
    private readonly initialGenerateRecordKeyStateName = "initialGenerateRecordKey";
    private readonly initialGenerateStartedStateName = "initialGenerateStarted";
    private readonly rejectRestorableOutputNames: (keyof IOutputs)[] = [
        "decisionByAI",
        "customerCallSuggestionInstructionsByAI",
        "validationByAI",
        "invalidReason",
        "closedInFavorOf",
        "routeToSPReasons",
        "assessDisputeComment",
        "routeToServiceProviderComment",
        "routeToDepartmentComment",
        "escalateToLeadComment",
        "suggestedComment",
        "suggestedDecision",
        "legalNotesJson",
        "correlationId",
        "resultText",
        "resultJson",
        "lastRunOn",
        "feedbackByAI"
    ];
    private readonly invalidReasonValues: Record<string, number> = {
        consumerbehavior: 8,
        extrainforequired: 5,
        feedbacknotclear: 4,
        finalbillingapproval: 6,
        missingdetails: 2,
        missingdocs: 3,
        noissuefromspside: 7,
        processandpolicies: 9,
        tdrarelated: 10,
        wrongfeedback: 1
    };
    private readonly serviceProviderOptionLabelLanguageCode = 1033;
    private readonly serviceProviderGlobalOptionSetName = "ldv_serviceprovider";
    private activeGenerationId = 0;
    private associatedLegalNoteKeys: Record<string, boolean> = {};
    private assessDisputeComment?: string;
    private boundField?: string;
    private bpfCheckKey?: string;
    private bpfDisabledReason?: string;
    private bpfStageName?: string;
    private commentOutputSnapshot?: CommentOutputSnapshot;
    private agentCommentOutputGate?: AgentCommentOutputGate;
    private appliedOutputSnapshot?: OutputSnapshot;
    private commentOutputReplayHandles: number[] = [];
    private commentOutputReplayToken = 0;
    private rejectOutputPacket?: RejectOutputPacket;
    private controlState: ComponentFramework.Dictionary = {};
    private entitySetNameCache: Record<string, string> = {};
    private notifyOutputChanged: () => void = () => undefined;
    private abortController?: AbortController;
    private aiReviewStatusLabel?: string;
    private closedInFavorOf?: number;
    private customerCallSuggestionInstructionsByAI?: string;
    private decisionByAI?: number;
    private errorMessage?: string;
    private escalateToLeadComment?: string;
    private feedbackByAI?: string;
    private hasAppliedSuggestionOutputs = false;
    private initialRequestStarted = false;
    private invalidReason?: number;
    private isBpfDisabled = false;
    private isDevelopmentMode = false;
    private isLoading = false;
    private lastRunOn?: Date;
    private legalNotesJson?: string;
    private pendingResultJson?: string;
    private pendingResultText?: string;
    private pendingSuggestion?: PendingSuggestion;
    private persistedSuggestion?: AdvisorSuggestionViewModel;
    private resultJson?: string;
    private resultText?: string;
    private routeToDepartmentComment?: string;
    private routeToSPReasons?: string;
    private routeToServiceProviderComment?: string;
    private serviceProviderOptionLabels?: Record<number, string>;
    private serviceProviderOptionLabelsPromise?: Promise<Record<number, string> | undefined>;
    private statusText?: string;
    private suggestedComment?: string;
    private suggestedDecision?: string;
    private suggestionCorrelationId?: string;
    private validationByAI?: number;
    private _container?: HTMLDivElement;
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.controlState = state ?? {};
        this.isDevelopmentMode = this.getIsDevelopment(context);
        this.initialRequestStarted = this.hasInitialGenerateStartedForRecord(context);
        context.mode.trackContainerResize(true);
        this.hydrateOutputs(context);
        this._container = container;
        this.log("init", {
            apiEndpoint: this.getApiEndpoint(context),
            hasInputText: Boolean(this.getInputText(context))
        });
        this.logBoundOutputLogicalNames(context, "init");
        this.log("initial generate disabled");
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.isDevelopmentMode = this.getIsDevelopment(context);
        const sourceValue = context.parameters.inputValue.raw ?? "";
        const apiEndpoint = this.getApiEndpoint(context);

        // this.tryInitialGenerate(context);

        const props: ApiFieldMapperViewProps = {
            acceptedDecision: this.suggestedDecision,
            acceptedResultText: this.suggestedComment ?? this.resultText,
            actionStatusLabel: this.aiReviewStatusLabel,
            canReview: this.hasPendingResult(),
            displaySuggestion: this.persistedSuggestion,
            endpointConfigured: Boolean(apiEndpoint),
            errorMessage: this.errorMessage,
            isDevelopment: this.getIsDevelopment(context),
            isDisabled: this.isBpfDisabled,
            isLoading: this.isLoading,
            pendingResultJson: this.pendingResultJson,
            pendingResultText: this.pendingResultText,
            pendingSuggestion: this.pendingSuggestion,
            sourceValue,
            statusText: this.statusText,
            onAccept: () => {
                void this.acceptPendingResult(context);
            },
            onModify: () => {
                void this.modifyPendingResult(context);
            },
            onGenerate: () => {
                void this.generateResult(context);
            },
            onReject: () => {
                void this.rejectPendingResult(context);
            }
        };

        if (!this._container) {
            this.log("updateView skipped: missing container");
            return;
        }

        ReactDOM.render(
            React.createElement(ApiFieldMapperView, props),
            this._container
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        const rejectOutputPacket = this.consumeRejectOutputPacket();

        if (rejectOutputPacket) {
            this.log("getOutputs called: reject restore packet", {
                diagnostics: this.getOutputPacketDiagnostics(rejectOutputPacket),
                returnedKeys: Object.keys(rejectOutputPacket)
            });
            return rejectOutputPacket as IOutputs;
        }

        const outputs: IOutputs = {};

        this.addOutputWithGate(outputs, "BoundField", this.boundField);
        this.addOutputWithGate(outputs, "decisionByAI", this.decisionByAI);
        this.addOutputWithGate(outputs, "customerCallSuggestionInstructionsByAI", this.customerCallSuggestionInstructionsByAI);
        this.addOutputWithGate(outputs, "validationByAI", this.validationByAI);
        this.addOutputWithGate(outputs, "invalidReason", this.invalidReason);
        this.addOutputWithGate(outputs, "closedInFavorOf", this.closedInFavorOf);
        this.addOutputWithGate(outputs, "routeToSPReasons", this.routeToSPReasons);
        this.addOutputWithGate(outputs, "assessDisputeComment", this.assessDisputeComment);
        this.addOutputWithGate(outputs, "routeToServiceProviderComment", this.routeToServiceProviderComment);
        this.addOutputWithGate(outputs, "routeToDepartmentComment", this.routeToDepartmentComment);
        this.addOutputWithGate(outputs, "escalateToLeadComment", this.escalateToLeadComment);
        this.addOutputWithGate(outputs, "suggestedComment", this.suggestedComment);
        this.addOutputWithGate(outputs, "suggestedDecision", this.suggestedDecision);
        this.addOutputWithGate(outputs, "legalNotesJson", this.legalNotesJson);
        this.addOutputWithGate(outputs, "correlationId", this.suggestionCorrelationId);
        this.addOutputWithGate(outputs, "resultText", this.resultText);
        this.addOutputWithGate(outputs, "resultJson", this.resultJson);
        this.addOutputWithGate(outputs, "statusText", this.statusText);
        this.addOutputWithGate(outputs, "lastRunOn", this.lastRunOn);
        this.addOutputWithGate(outputs, "feedbackByAI", this.feedbackByAI);
        this.addOutputWithGate(outputs, "reservedDecisionByAI", this.persistedSuggestion?.decisionByAI?.value);
        this.addOutputWithGate(outputs, "reservedFeedbackByAI", this.persistedSuggestion?.feedbackByAI);
        this.addOutputWithGate(outputs, "reservedValidationByAI", this.persistedSuggestion?.validationByAI?.value);
        this.addOutputWithGate(outputs, "reservedInvalidReasonByAI", this.persistedSuggestion?.invalidReason?.value);
        this.addOutputWithGate(
            outputs,
            "reservedCustomerCallSuggestionInstructionsByAI",
            this.persistedSuggestion?.customerCallSuggestionInstructionsByAI
        );
        this.addOutputWithGate(outputs, "reservedClosedInFavorOfByAI", this.persistedSuggestion?.closedInFavorOf?.value);
        this.addOutputWithGate(outputs, "aiReviewStatusLabel", this.aiReviewStatusLabel);

        this.log("getOutputs called", {
            diagnostics: this.getOutputDiagnostics(),
            heldAgentCommentOutputs: this.agentCommentOutputGate?.heldOutputs.map((output) => output.name),
            isAgentCommentOutputReleased: this.agentCommentOutputGate?.released,
            returnedKeys: Object.keys(outputs)
        });

        return outputs;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        this.abortController?.abort();
        this.clearCommentOutputReplay();

        if (this._container) {
            ReactDOM.unmountComponentAtNode(this._container);
        }
    }

    private hydrateOutputs(context: ComponentFramework.Context<IInputs>): void {
        this.boundField = context.parameters.BoundField.raw ?? undefined;
        this.decisionByAI = context.parameters.decisionByAI.raw ?? undefined;
        this.feedbackByAI = context.parameters.feedbackByAI.raw ?? undefined;
        this.customerCallSuggestionInstructionsByAI = context.parameters.customerCallSuggestionInstructionsByAI.raw ?? undefined;
        this.validationByAI = context.parameters.validationByAI.raw ?? undefined;
        this.invalidReason = context.parameters.invalidReason.raw ?? undefined;
        this.closedInFavorOf = context.parameters.closedInFavorOf.raw ?? undefined;
        this.routeToSPReasons = context.parameters.routeToSPReasons.raw ?? undefined;
        this.assessDisputeComment = context.parameters.assessDisputeComment.raw ?? undefined;
        this.routeToServiceProviderComment = context.parameters.routeToServiceProviderComment.raw ?? undefined;
        this.routeToDepartmentComment = context.parameters.routeToDepartmentComment.raw ?? undefined;
        this.escalateToLeadComment = context.parameters.escalateToLeadComment.raw ?? undefined;
        this.suggestedComment = context.parameters.suggestedComment.raw ?? undefined;
        this.suggestedDecision = context.parameters.suggestedDecision.raw ?? undefined;
        this.legalNotesJson = context.parameters.legalNotesJson.raw ?? undefined;
        this.suggestionCorrelationId = context.parameters.correlationId.raw ?? undefined;
        this.resultText = context.parameters.resultText.raw ?? this.suggestedComment ?? undefined;
        this.resultJson = context.parameters.resultJson.raw ?? undefined;
        this.statusText = context.parameters.statusText.raw ?? "Ready";
        this.lastRunOn = context.parameters.lastRunOn.raw ?? undefined;
        this.aiReviewStatusLabel = context.parameters.aiReviewStatusLabel.raw ?? undefined;
        this.persistedSuggestion = this.buildPersistedSuggestionFromReservedOutputs(context);
    }

    private buildPersistedSuggestionFromReservedOutputs(
        context: ComponentFramework.Context<IInputs>
    ): AdvisorSuggestionViewModel | undefined {
        const decisionByAI = this.getOptionSetItemFromBoundParameter(context.parameters.reservedDecisionByAI);
        const validationByAI = this.getOptionSetItemFromBoundParameter(context.parameters.reservedValidationByAI);
        const invalidReason = this.getOptionSetItemFromBoundParameter(context.parameters.reservedInvalidReasonByAI);
        const closedInFavorOf = this.getOptionSetItemFromBoundParameter(context.parameters.reservedClosedInFavorOfByAI);
        const feedbackByAI = context.parameters.reservedFeedbackByAI.raw ?? undefined;
        const customerCallSuggestionInstructionsByAI =
            context.parameters.reservedCustomerCallSuggestionInstructionsByAI.raw ?? undefined;

        const hasReservedData = [
            decisionByAI,
            validationByAI,
            invalidReason,
            closedInFavorOf,
            feedbackByAI,
            customerCallSuggestionInstructionsByAI
        ].some((value) => Boolean(value));

        if (!hasReservedData) {
            return undefined;
        }

        return {
            closedInFavorOf,
            customerCallSuggestionInstructionsByAI,
            decisionByAI,
            feedbackByAI,
            generatedOn: this.lastRunOn?.toISOString(),
            invalidReason,
            legalNotes: this.normalizeLegalNotes(this.legalNotesJson),
            suggestedComment: feedbackByAI,
            suggestedDecision: this.formatOptionSetLabel(decisionByAI),
            validationByAI
        };
    }

    private getOptionSetItemFromBoundParameter(
        parameter: ComponentFramework.PropertyTypes.OptionSetProperty
    ): OptionSetItemViewModel | undefined {
        const value = parameter.raw;

        if (value === undefined || value === null) {
            return undefined;
        }

        return {
            label: this.getTextOrOptionSetLabel(parameter),
            value
        };
    }

    private getInitialGenerateRecordKey(context: ComponentFramework.Context<IInputs>): string | undefined {
        const contextInfo = this.getContextInfo(context);
        const entityName = contextInfo?.entityTypeName?.trim().toLowerCase();
        const recordId = this.cleanGuid(contextInfo?.entityId ?? "").toLowerCase();

        return entityName && recordId ? `${entityName}:${recordId}` : undefined;
    }

    private hasInitialGenerateStartedForRecord(context: ComponentFramework.Context<IInputs>): boolean {
        const recordKey = this.getInitialGenerateRecordKey(context);

        return Boolean(
            recordKey
                && this.controlState[this.initialGenerateRecordKeyStateName] === recordKey
                && this.controlState[this.initialGenerateStartedStateName] === true
        );
    }

    private markInitialGenerateStarted(context: ComponentFramework.Context<IInputs>): void {
        const recordKey = this.getInitialGenerateRecordKey(context);
        this.initialRequestStarted = true;

        if (!recordKey) {
            this.log("initial generate state not persisted: missing record key");
            return;
        }

        this.controlState = {
            ...this.controlState,
            [this.initialGenerateRecordKeyStateName]: recordKey,
            [this.initialGenerateStartedStateName]: true
        };

        const saved = context.mode.setControlState(this.controlState);
        this.log("initial generate state persisted", {
            recordKey,
            saved
        });
    }

    private async tryInitialGenerate(context: ComponentFramework.Context<IInputs>): Promise<void> {
        const hasInitialGenerateStartedForRecord = this.hasInitialGenerateStartedForRecord(context);

        if (this.initialRequestStarted || this.isLoading || hasInitialGenerateStartedForRecord) {
            this.log("initial generate skipped", {
                hasInitialGenerateStartedForRecord,
                initialRequestStarted: this.initialRequestStarted,
                isLoading: this.isLoading
            });
            return;
        }

        const bpfAllowed = await this.refreshBpfGate(context);

        if (!bpfAllowed) {
            this.log("initial generate skipped: bpf stage not allowed", {
                bpfStageName: this.bpfStageName
            });
            this.publishState(context);
            return;
        }

        const apiEndpoint = this.getApiEndpoint(context);
        await this.ensureServiceProviderOptionLabels(context);

        if (!apiEndpoint || !this.getInputText(context)) {
            this.log("initial generate waiting for required inputs", {
                hasApiEndpoint: Boolean(apiEndpoint),
                hasInputText: Boolean(this.getInputText(context))
            });
            return;
        }

        this.markInitialGenerateStarted(context);
        this.log("initial generate started", {
            apiEndpoint,
            inputTextLength: this.getInputText(context).length
        });
        void this.generateResult(context);
    }

    private async generateResult(context: ComponentFramework.Context<IInputs>): Promise<void> {
        const apiEndpoint = this.getApiEndpoint(context);
        const method = this.getMethod(context);
        const identifiers = this.createRequestIdentifiers();
        const generationId = this.activeGenerationId + 1;
        this.rejectOutputPacket = undefined;

        if (!await this.refreshBpfGate(context, true)) {
            this.publishState(context);
            return;
        }

        await this.ensureServiceProviderOptionLabels(context);

        this.log("generate requested", {
            apiEndpoint,
            apiRequestId: identifiers.apiRequestId,
            correlationId: identifiers.correlationId,
            method,
            inputTextLength: this.getInputText(context).length
        });

        if (!apiEndpoint) {
            this.setError("API endpoint is not configured.", false);
            this.publishState(context);
            return;
        }

        if (!this.getInputText(context)) {
            this.setError("Prompt input is missing. Bind Case Details, Provider Name, Provider Response, or enter inputValue.", false);
            this.publishState(context);
            return;
        }

        this.abortController?.abort();
        this.activeGenerationId = generationId;
        const abortController = new AbortController();
        this.abortController = abortController;
        let didTimeout = false;
        const timeoutHandle = window.setTimeout(() => {
            didTimeout = true;
            abortController.abort();
        }, this.requestTimeoutMs);
        this.errorMessage = undefined;
        this.isLoading = true;
        this.statusText = "Generating preview...";
        this.publishState(context);

        try {
            const url = this.buildUrl(apiEndpoint, context, identifiers);
            const body = this.buildBody(context, identifiers);
            const headers = this.buildHeaders(context, identifiers, method);

            this.log("api request prepared", {
                body: body ? this.parseResponse(body) : undefined,
                headers: this.sanitizeHeadersForLog(headers),
                url
            });

            const response = await fetch(url, {
                body,
                headers,
                method,
                signal: abortController.signal
            });

            const responseText = await response.text();
            const responseData = this.parseResponse(responseText);

            this.log("api response received", {
                ok: response.ok,
                response: responseData,
                status: response.status,
                statusText: response.statusText
            });

            if (!response.ok) {
                throw new Error(this.formatApiError(response.status, response.statusText, responseData, responseText));
            }

            if (!this.isCurrentGeneration(generationId)) {
                this.log("stale api response ignored", {
                    apiRequestId: identifiers.apiRequestId,
                    generationId
                });
                return;
            }

            const suggestion = this.buildPendingSuggestion(responseData, responseText, identifiers, context);
            this.pendingSuggestion = suggestion;
            this.pendingResultText = suggestion.suggestedComment ?? "";
            this.pendingResultJson = suggestion.rawJson;
            this.statusText = suggestion.responseMessage ?? "Preview generated. Review it before choosing an action.";
            this.log("preview suggestion ready", this.toSuggestionLog(suggestion));
        } catch (error) {
            if (!this.isCurrentGeneration(generationId)) {
                this.log("stale generate failure ignored", {
                    error: (error as Error).message,
                    generationId
                });
                return;
            }

            if ((error as Error).name === "AbortError" && didTimeout) {
                this.pendingSuggestion = undefined;
                this.pendingResultText = undefined;
                this.pendingResultJson = undefined;
                this.setError(`API request timed out after ${Math.round(this.requestTimeoutMs / 1000)} seconds. Try again or check the endpoint.`, false);
            } else if ((error as Error).name === "AbortError") {
                this.log("generate aborted", {
                    generationId
                });
            } else {
                this.pendingSuggestion = undefined;
                this.pendingResultText = undefined;
                this.pendingResultJson = undefined;
                this.log("generate failed", {
                    error: (error as Error).message
                });
                this.setError((error as Error).message, false);
            }
        } finally {
            window.clearTimeout(timeoutHandle);

            if (this.isCurrentGeneration(generationId)) {
                this.isLoading = false;
                this.abortController = undefined;
                this.publishState(context);
                this.log("generate finished", {
                    hasPendingSuggestion: Boolean(this.pendingSuggestion),
                    statusText: this.statusText
                });
            }
        }
    }

    private async acceptPendingResult(context: ComponentFramework.Context<IInputs>): Promise<void> {
        if (!await this.refreshBpfGate(context, true)) {
            this.publishState(context);
            return;
        }

        if (!this.pendingSuggestion) {
            this.log("accept ignored: no pending suggestion");
            return;
        }

        const suggestion = this.pendingSuggestion;
        this.log("accept clicked", this.toSuggestionLog(suggestion));
        this.rejectOutputPacket = undefined;
        this.captureCommentOutputSnapshot();
        this.captureAppliedOutputSnapshot(context);
        this.applySuggestionToOutputs(suggestion);
        this.applyPersistedSuggestionOutputs(suggestion, "Accepted");
        this.logOutputBindings(context, "accept after apply", suggestion);
        this.prepareAgentCommentOutputGate(context, suggestion, "accept");
        this.errorMessage = undefined;
        this.isLoading = true;
        this.statusText = "Accepted. Saving suggested fields...";
        this.publishState(context);

        try {
            const saveResult = await this.saveAcceptedOutputs(context, suggestion);

            if (saveResult.saved) {
                await this.tryUnsupportedFormRefresh(context, "accept");
                this.clearPendingSuggestion();
                this.commentOutputSnapshot = undefined;
                this.appliedOutputSnapshot = undefined;
                this.hasAppliedSuggestionOutputs = false;
            }

            this.statusText = saveResult.saved
                ? this.formatSaveSuccessMessage(saveResult.associatedLegalNotes)
                : "Accepted locally, but nothing was saved because the Case record context is missing.";
            this.log("accept completed", {
                associatedLegalNotes: saveResult.associatedLegalNotes,
                saved: saveResult.saved,
                statusText: this.statusText
            });
        } catch (error) {
            this.errorMessage = (error as Error).message;
            this.statusText = `Accepted locally, but save failed: ${(error as Error).message}`;
            this.log("accept save failed", {
                error: (error as Error).message
            });
        } finally {
            this.isLoading = false;
            this.publishState(context);
        }
    }

    private async modifyPendingResult(context: ComponentFramework.Context<IInputs>): Promise<void> {
        if (!await this.refreshBpfGate(context, true)) {
            this.publishState(context);
            return;
        }

        if (!this.pendingSuggestion) {
            this.log("modify ignored: no pending suggestion");
            return;
        }

        const suggestion = this.pendingSuggestion;
        this.log("modify clicked", this.toSuggestionLog(suggestion));
        this.rejectOutputPacket = undefined;
        this.captureCommentOutputSnapshot();
        this.captureAppliedOutputSnapshot(context);
        this.applySuggestionToOutputs(suggestion);
        this.applyPersistedSuggestionOutputs(suggestion, "Modified");
        this.logOutputBindings(context, "modify after apply", suggestion);
        this.prepareAgentCommentOutputGate(context, suggestion, "modify");
        this.errorMessage = undefined;
        this.isLoading = true;
        this.statusText = "Modify applied. Associating legal notes...";
        this.publishState(context);

        try {
            const associatedCount = await this.associateLegalNotesToCurrentRecord(context, suggestion);
            const savedReviewState = await this.saveReservedReviewState(context);
            await this.tryUnsupportedFormRefresh(context, "modify");
            this.statusText = associatedCount > 0
                ? `Modify applied. ${associatedCount} legal note(s) associated to the Case.`
                : "Modify applied. Review the returned AI data and edit the form fields before saving.";
            this.log("modify completed", {
                associatedCount,
                savedReviewState,
                statusText: this.statusText
            });
        } catch (error) {
            this.errorMessage = (error as Error).message;
            this.statusText = `Modify applied locally, but legal note association failed: ${(error as Error).message}`;
            this.log("modify legal note association failed", {
                error: (error as Error).message
            });
        } finally {
            this.isLoading = false;
            this.publishState(context);
        }
    }

    private async rejectPendingResult(context: ComponentFramework.Context<IInputs>): Promise<void> {
        if (!await this.refreshBpfGate(context, true)) {
            this.publishState(context);
            return;
        }

        if (!this.hasPendingResult()) {
            this.log("reject ignored: no pending suggestion");
            return;
        }

        this.log("reject clicked", {
            pendingResultText: this.pendingResultText
        });
        const suggestion = this.pendingSuggestion;

        if (suggestion) {
            this.applyPersistedSuggestionOutputs(suggestion, "Rejected");
        }

        this.clearCommentOutputReplay();
        this.clearPendingSuggestion();
        if (this.hasAppliedSuggestionOutputs) {
            this.prepareRejectOutputPacket();
            this.clearSuggestionOutputs();
            this.restoreAppliedOutputSnapshot();
            this.hasAppliedSuggestionOutputs = false;
        }
        if (suggestion) {
            this.applyPersistedSuggestionOutputs(suggestion, "Rejected");
        }
        this.errorMessage = undefined;
        this.statusText = "Rejected. Suggested values were discarded.";

        try {
            await this.saveReservedReviewState(context);
            await this.tryUnsupportedFormRefresh(context, "reject");
        } catch (error) {
            this.log("reject reserved review state save failed", {
                error: (error as Error).message
            });
        }

        this.logOutputBindings(context, "reject after clear");
        this.publishState(context);
    }

    private applySuggestionToOutputs(suggestion: PendingSuggestion): void {
        const legalNotesJson = JSON.stringify(suggestion.legalNotes, null, 2);
        const feedback = suggestion.feedbackByAI ?? suggestion.suggestedComment ?? "";
        const decisionLabel = this.formatOptionSetLabel(suggestion.decisionByAI)
            ?? suggestion.suggestedDecision
            ?? "";
        const shouldApplyAssessOnlyFields = this.isAssessCaseDecision(suggestion);

        this.decisionByAI = suggestion.decisionByAI?.value;
        this.feedbackByAI = feedback;
        this.customerCallSuggestionInstructionsByAI = suggestion.customerCallSuggestionInstructionsByAI ?? "";
        this.validationByAI = shouldApplyAssessOnlyFields ? suggestion.validationByAI?.value : undefined;
        this.invalidReason = shouldApplyAssessOnlyFields && this.isInvalidValidation(suggestion)
            ? suggestion.invalidReason?.value
            : undefined;
        this.closedInFavorOf = shouldApplyAssessOnlyFields ? suggestion.closedInFavorOf?.value : undefined;
        this.routeToSPReasons = suggestion.routeToSPReasons;
        this.applyDecisionComment(suggestion, feedback);
        this.suggestedComment = feedback;
        this.suggestedDecision = decisionLabel;
        this.legalNotesJson = legalNotesJson;
        this.suggestionCorrelationId = suggestion.correlationId;
        this.resultText = feedback;
        this.resultJson = suggestion.rawJson;
        this.lastRunOn = suggestion.generatedOnDate;
        this.log("outputs applied", {
            closedInFavorOf: this.closedInFavorOf,
            decisionByAI: this.decisionByAI,
            feedbackByAI: this.feedbackByAI,
            legalNotesCount: suggestion.legalNotes.length,
            validationByAI: this.validationByAI
        });
        this.hasAppliedSuggestionOutputs = true;
    }

    private applyPersistedSuggestionOutputs(suggestion: PendingSuggestion, actionStatusLabel: string): void {
        const feedback = suggestion.feedbackByAI ?? suggestion.suggestedComment ?? "";

        this.persistedSuggestion = {
            ...suggestion,
            feedbackByAI: feedback,
            suggestedComment: feedback,
            suggestedDecision: this.formatOptionSetLabel(suggestion.decisionByAI)
                ?? suggestion.suggestedDecision
        };
        this.aiReviewStatusLabel = actionStatusLabel;
    }

    private applyDecisionComment(suggestion: PendingSuggestion, feedback: string): void {
        if (!feedback) {
            return;
        }

        if (this.isAssessCaseDecision(suggestion)) {
            this.assessDisputeComment = feedback;
            return;
        }

        if (this.isRouteToServiceProviderDecision(suggestion)) {
            this.routeToServiceProviderComment = feedback;
            return;
        }

        if (this.isRouteToDepartmentDecision(suggestion)) {
            this.routeToDepartmentComment = feedback;
            return;
        }

        if (this.isEscalateToLeadDecision(suggestion)) {
            this.escalateToLeadComment = feedback;
        }
    }

    private clearPendingSuggestion(): void {
        this.pendingSuggestion = undefined;
        this.pendingResultText = undefined;
        this.pendingResultJson = undefined;
    }

    private captureAppliedOutputSnapshot(context: ComponentFramework.Context<IInputs>): void {
        if (this.hasAppliedSuggestionOutputs && this.appliedOutputSnapshot) {
            return;
        }

        this.appliedOutputSnapshot = this.rejectRestorableOutputNames.reduce<OutputSnapshot>((snapshot, outputName) => {
            snapshot[outputName] = this.getCurrentBoundOutputValue(context, outputName);
            return snapshot;
        }, {});
    }

    private captureCommentOutputSnapshot(): void {
        if (this.hasAppliedSuggestionOutputs && this.commentOutputSnapshot) {
            return;
        }

        this.commentOutputSnapshot = {
            assessDisputeComment: this.assessDisputeComment,
            escalateToLeadComment: this.escalateToLeadComment,
            feedbackByAI: this.feedbackByAI,
            resultText: this.resultText,
            routeToDepartmentComment: this.routeToDepartmentComment,
            routeToServiceProviderComment: this.routeToServiceProviderComment,
            suggestedComment: this.suggestedComment
        };
    }

    private prepareRejectOutputPacket(): RejectOutputPacket | undefined {
        if (!this.appliedOutputSnapshot) {
            this.rejectOutputPacket = undefined;
            return undefined;
        }

        // CRM leaves omitted outputs untouched, so Reject sends one explicit undo packet.
        this.rejectOutputPacket = this.rejectRestorableOutputNames.reduce<RejectOutputPacket>((packet, outputName) => {
            const snapshotValue = this.appliedOutputSnapshot?.[outputName];
            packet[outputName] = snapshotValue ?? null;
            return packet;
        }, {});

        this.log("reject output packet prepared", {
            diagnostics: this.getOutputPacketDiagnostics(this.rejectOutputPacket)
        });

        return this.rejectOutputPacket;
    }

    private consumeRejectOutputPacket(): RejectOutputPacket | undefined {
        const packet = this.rejectOutputPacket;
        this.rejectOutputPacket = undefined;

        return packet;
    }

    private restoreAppliedOutputSnapshot(): void {
        const snapshot = this.appliedOutputSnapshot;

        if (!snapshot) {
            this.restoreCommentOutputSnapshot();
            return;
        }

        this.decisionByAI = snapshot.decisionByAI as number | undefined;
        this.customerCallSuggestionInstructionsByAI = snapshot.customerCallSuggestionInstructionsByAI as string | undefined;
        this.validationByAI = snapshot.validationByAI as number | undefined;
        this.invalidReason = snapshot.invalidReason as number | undefined;
        this.closedInFavorOf = snapshot.closedInFavorOf as number | undefined;
        this.routeToSPReasons = snapshot.routeToSPReasons as string | undefined;
        this.assessDisputeComment = snapshot.assessDisputeComment as string | undefined;
        this.routeToServiceProviderComment = snapshot.routeToServiceProviderComment as string | undefined;
        this.routeToDepartmentComment = snapshot.routeToDepartmentComment as string | undefined;
        this.escalateToLeadComment = snapshot.escalateToLeadComment as string | undefined;
        this.suggestedComment = snapshot.suggestedComment as string | undefined;
        this.suggestedDecision = snapshot.suggestedDecision as string | undefined;
        this.legalNotesJson = snapshot.legalNotesJson as string | undefined;
        this.suggestionCorrelationId = snapshot.correlationId as string | undefined;
        this.resultText = snapshot.resultText as string | undefined;
        this.resultJson = snapshot.resultJson as string | undefined;
        this.lastRunOn = snapshot.lastRunOn as Date | undefined;
        this.feedbackByAI = snapshot.feedbackByAI as string | undefined;

        this.appliedOutputSnapshot = undefined;
        this.commentOutputSnapshot = undefined;
    }

    private restoreCommentOutputSnapshot(): void {
        if (!this.commentOutputSnapshot) {
            return;
        }

        this.assessDisputeComment = this.commentOutputSnapshot.assessDisputeComment;
        this.escalateToLeadComment = this.commentOutputSnapshot.escalateToLeadComment;
        this.feedbackByAI = this.commentOutputSnapshot.feedbackByAI;
        this.resultText = this.commentOutputSnapshot.resultText;
        this.routeToDepartmentComment = this.commentOutputSnapshot.routeToDepartmentComment;
        this.routeToServiceProviderComment = this.commentOutputSnapshot.routeToServiceProviderComment;
        this.suggestedComment = this.commentOutputSnapshot.suggestedComment;
        this.commentOutputSnapshot = undefined;
    }

    private clearSuggestionOutputs(): void {
        this.clearCommentOutputReplay();
        this.assessDisputeComment = undefined;
        this.closedInFavorOf = undefined;
        this.customerCallSuggestionInstructionsByAI = undefined;
        this.decisionByAI = undefined;
        this.escalateToLeadComment = undefined;
        this.feedbackByAI = undefined;
        this.invalidReason = undefined;
        this.lastRunOn = undefined;
        this.legalNotesJson = undefined;
        this.resultJson = undefined;
        this.resultText = undefined;
        this.routeToDepartmentComment = undefined;
        this.routeToSPReasons = undefined;
        this.routeToServiceProviderComment = undefined;
        this.suggestedComment = undefined;
        this.suggestedDecision = undefined;
        this.suggestionCorrelationId = undefined;
        this.validationByAI = undefined;
    }

    private prepareAgentCommentOutputGate(
        context: ComponentFramework.Context<IInputs>,
        suggestion: PendingSuggestion,
        sourceAction: string
    ): void {
        this.clearCommentOutputReplay(false);
        const heldOutputs = this.getAgentCommentHeldOutputs(context, suggestion);

        if (heldOutputs.length === 0) {
            this.log("agent comment output gate skipped", {
                selectedCommentOutput: this.getDecisionCommentOutputName(suggestion),
                sourceAction
            });
            return;
        }

        this.commentOutputReplayToken += 1;

        this.agentCommentOutputGate = {
            heldOutputs,
            released: false,
            releaseScheduled: false,
            sourceAction,
            token: this.commentOutputReplayToken
        };

        this.log("agent comment output gate prepared", {
            heldOutputs: heldOutputs.map((output) => output.name),
            sourceAction
        });
    }

    private clearCommentOutputReplay(incrementToken = true): void {
        this.commentOutputReplayHandles.forEach((handle) => window.clearTimeout(handle));
        this.commentOutputReplayHandles = [];
        this.agentCommentOutputGate = undefined;

        if (incrementToken) {
            this.commentOutputReplayToken += 1;
        }
    }

    private getAgentCommentHeldOutputs(
        context: ComponentFramework.Context<IInputs>,
        suggestion: AdvisorSuggestionViewModel
    ): HeldOutputValue[] {
        const bindings = this.getOutputBindings(context);
        const selectedCommentOutput = this.getDecisionCommentOutputName(suggestion) as keyof IOutputs | undefined;
        const bindingsWithLogicalNames = bindings.filter((binding) => Boolean(this.getBoundLogicalName(binding.parameter)));
        const agentCommentBindings = bindings.filter((binding) =>
            this.isAgentCommentBinding(binding)
                && typeof binding.value === "string"
                && Boolean(binding.value)
        );
        const selectedAgentCommentBinding = selectedCommentOutput
            ? agentCommentBindings.find((binding) => binding.name === selectedCommentOutput)
            : undefined;
        const heldBindings = selectedAgentCommentBinding
            ? [
                selectedAgentCommentBinding,
                ...agentCommentBindings.filter((binding) => binding.name !== selectedAgentCommentBinding.name)
            ]
            : agentCommentBindings;

        if (heldBindings.length > 0) {
            return this.toUniqueHeldOutputs(heldBindings);
        }

        if (selectedCommentOutput && bindingsWithLogicalNames.length === 0) {
            const selectedBinding = bindings.find((binding) => binding.name === selectedCommentOutput);

            if (selectedBinding && typeof selectedBinding.value === "string" && selectedBinding.value) {
                return this.toUniqueHeldOutputs([selectedBinding]);
            }
        }

        return [];
    }

    private toUniqueHeldOutputs(bindings: OutputBindingInfo[]): HeldOutputValue[] {
        return bindings.reduce<HeldOutputValue[]>((heldOutputs, binding) => {
            if (heldOutputs.some((output) => output.name === binding.name) || typeof binding.value !== "string" || !binding.value) {
                return heldOutputs;
            }

            heldOutputs.push({
                name: binding.name,
                value: binding.value
            });

            return heldOutputs;
        }, []);
    }

    private isAgentCommentBinding(binding: OutputBindingInfo): boolean {
        return this.normalizeLogicalName(this.getBoundLogicalName(binding.parameter)) === this.agentCommentLogicalName;
    }

    private normalizeLogicalName(logicalName: string | undefined): string | undefined {
        return logicalName?.trim().toLowerCase();
    }

    private getHeldAgentCommentOutput<TKey extends keyof IOutputs>(
        key: TKey,
        value: IOutputs[TKey]
    ): HeldOutputValue | undefined {
        if (!this.agentCommentOutputGate || this.agentCommentOutputGate.released) {
            return undefined;
        }

        return this.agentCommentOutputGate.heldOutputs.find((output) => output.name === key && output.value === value);
    }

    private scheduleAgentCommentOutputRelease(): void {
        const gate = this.agentCommentOutputGate;

        if (!gate || gate.releaseScheduled) {
            return;
        }

        gate.releaseScheduled = true;
        this.commentOutputReplayHandles = this.commentOutputReplayDelaysMs.map((delayMs) => window.setTimeout(() => {
            const currentGate = this.agentCommentOutputGate;

            if (currentGate?.token !== gate.token) {
                return;
            }

            currentGate.released = true;
            this.log("agent comment output released", {
                delayMs,
                heldOutputs: currentGate.heldOutputs.map((output) => output.name),
                sourceAction: currentGate.sourceAction
            });
            this.notifyOutputChanged();
        }, delayMs));

        this.log("agent comment output release scheduled", {
            delaysMs: this.commentOutputReplayDelaysMs,
            heldOutputs: gate.heldOutputs.map((output) => output.name),
            sourceAction: gate.sourceAction
        });
    }

    private getCommentOutputValue(outputName: string): string | undefined {
        switch (outputName) {
            case "assessDisputeComment":
                return this.assessDisputeComment;
            case "routeToServiceProviderComment":
                return this.routeToServiceProviderComment;
            case "routeToDepartmentComment":
                return this.routeToDepartmentComment;
            case "escalateToLeadComment":
                return this.escalateToLeadComment;
            default:
                return undefined;
        }
    }

    private async saveAcceptedOutputs(
        context: ComponentFramework.Context<IInputs>,
        suggestion: PendingSuggestion
    ): Promise<SaveResult> {
        const contextInfo = this.getContextInfo(context);
        const recordId = this.cleanGuid(contextInfo?.entityId ?? "");
        const entityName = contextInfo?.entityTypeName;
        const payload = this.buildDataversePayload(context, suggestion);

        this.log("save payload prepared", {
            entityName,
            payload,
            recordId
        });

        if (!recordId || !entityName || Object.keys(payload).length === 0) {
            this.log("save skipped", {
                hasEntityName: Boolean(entityName),
                hasPayload: Object.keys(payload).length > 0,
                hasRecordId: Boolean(recordId)
            });
            return {
                associatedLegalNotes: 0,
                saved: false
            };
        }

        await context.webAPI.updateRecord(entityName, recordId, payload);
        const associatedLegalNotes = await this.associateLegalNotesToCurrentRecord(context, suggestion);

        return {
            associatedLegalNotes,
            saved: true
        };
    }

    private buildDataversePayload(
        context: ComponentFramework.Context<IInputs>,
        suggestion: PendingSuggestion
    ): ComponentFramework.WebApi.Entity {
        const payload: ComponentFramework.WebApi.Entity = {};
        const shouldSaveAssessOnlyFields = this.isAssessCaseDecision(suggestion);

        this.addBoundOptionSetValue(payload, context.parameters.decisionByAI, this.decisionByAI);
        this.addBoundTextValue(
            payload,
            context.parameters.customerCallSuggestionInstructionsByAI,
            this.customerCallSuggestionInstructionsByAI
        );
        if (shouldSaveAssessOnlyFields) {
            this.addBoundOptionSetValue(payload, context.parameters.validationByAI, this.validationByAI);
        }

        if (shouldSaveAssessOnlyFields && this.isInvalidValidation(suggestion)) {
            this.addBoundOptionSetValue(payload, context.parameters.invalidReason, this.invalidReason);
        }

        if (shouldSaveAssessOnlyFields) {
            this.addBoundOptionSetValue(payload, context.parameters.closedInFavorOf, this.closedInFavorOf);
        }

        this.addBoundTextValue(payload, context.parameters.routeToSPReasons, this.routeToSPReasons);
        this.addDecisionCommentToPayload(payload, context, suggestion);
        this.addBoundTextValue(payload, context.parameters.suggestedComment, this.suggestedComment);
        this.addBoundTextValue(payload, context.parameters.suggestedDecision, this.suggestedDecision);
        this.addBoundTextValue(payload, context.parameters.legalNotesJson, this.legalNotesJson);
        this.addBoundTextValue(payload, context.parameters.correlationId, this.suggestionCorrelationId);
        this.addBoundTextValue(payload, context.parameters.resultText, this.resultText);
        this.addBoundTextValue(payload, context.parameters.resultJson, this.resultJson);
        this.addBoundTextValue(payload, context.parameters.feedbackByAI, this.feedbackByAI);
        this.addReservedReviewValuesToPayload(payload, context);

        return payload;
    }

    private async saveReservedReviewState(
        context: ComponentFramework.Context<IInputs>
    ): Promise<boolean> {
        const contextInfo = this.getContextInfo(context);
        const recordId = this.cleanGuid(contextInfo?.entityId ?? "");
        const entityName = contextInfo?.entityTypeName;
        const payload: ComponentFramework.WebApi.Entity = {};

        this.addReservedReviewValuesToPayload(payload, context);

        if (!recordId || !entityName || Object.keys(payload).length === 0) {
            this.log("reserved review state save skipped", {
                hasEntityName: Boolean(entityName),
                hasPayload: Object.keys(payload).length > 0,
                hasRecordId: Boolean(recordId)
            });
            return false;
        }

        await context.webAPI.updateRecord(entityName, recordId, payload);
        this.log("reserved review state saved", {
            entityName,
            payload,
            recordId
        });

        return true;
    }

    private addReservedReviewValuesToPayload(
        payload: ComponentFramework.WebApi.Entity,
        context: ComponentFramework.Context<IInputs>
    ): void {
        this.addBoundOptionSetValueOrNull(
            payload,
            context.parameters.reservedDecisionByAI,
            this.persistedSuggestion?.decisionByAI?.value
        );
        this.addBoundTextValue(payload, context.parameters.reservedFeedbackByAI, this.persistedSuggestion?.feedbackByAI);
        this.addBoundOptionSetValueOrNull(
            payload,
            context.parameters.reservedValidationByAI,
            this.persistedSuggestion?.validationByAI?.value
        );
        this.addBoundOptionSetValueOrNull(
            payload,
            context.parameters.reservedInvalidReasonByAI,
            this.persistedSuggestion?.invalidReason?.value
        );
        this.addBoundTextValue(
            payload,
            context.parameters.reservedCustomerCallSuggestionInstructionsByAI,
            this.persistedSuggestion?.customerCallSuggestionInstructionsByAI
        );
        this.addBoundOptionSetValueOrNull(
            payload,
            context.parameters.reservedClosedInFavorOfByAI,
            this.persistedSuggestion?.closedInFavorOf?.value
        );
        this.addBoundTextValue(payload, context.parameters.aiReviewStatusLabel, this.aiReviewStatusLabel);
    }

    private addDecisionCommentToPayload(
        payload: ComponentFramework.WebApi.Entity,
        context: ComponentFramework.Context<IInputs>,
        suggestion: PendingSuggestion
    ): void {
        if (this.isAssessCaseDecision(suggestion)) {
            this.addBoundTextValue(payload, context.parameters.assessDisputeComment, this.assessDisputeComment);
            return;
        }

        if (this.isRouteToServiceProviderDecision(suggestion)) {
            this.addBoundTextValue(
                payload,
                context.parameters.routeToServiceProviderComment,
                this.routeToServiceProviderComment
            );
            return;
        }

        if (this.isRouteToDepartmentDecision(suggestion)) {
            this.addBoundTextValue(payload, context.parameters.routeToDepartmentComment, this.routeToDepartmentComment);
            return;
        }

        if (this.isEscalateToLeadDecision(suggestion)) {
            this.addBoundTextValue(payload, context.parameters.escalateToLeadComment, this.escalateToLeadComment);
        }
    }

    private addOutput<TKey extends keyof IOutputs>(
        outputs: IOutputs,
        key: TKey,
        value: IOutputs[TKey]
    ): void {
        if (value !== undefined) {
            outputs[key] = value;
        }
    }

    private addOutputWithGate<TKey extends keyof IOutputs>(
        outputs: IOutputs,
        key: TKey,
        value: IOutputs[TKey]
    ): void {
        const heldOutput = this.getHeldAgentCommentOutput(key, value);

        if (heldOutput) {
            this.scheduleAgentCommentOutputRelease();
            this.log("agent comment output held from first packet", {
                outputName: heldOutput.name,
                valuePreview: this.formatLogPreview(heldOutput.value)
            });
            return;
        }

        this.addOutput(outputs, key, value);
    }

    private logBoundOutputLogicalNames(context: ComponentFramework.Context<IInputs>, stage: string): void {
        this.log(`bound output logical names: ${stage}`, this.getOutputBindings(context).reduce<Record<string, unknown>>(
            (diagnostics, binding) => {
                diagnostics[binding.name] = {
                    hasAttributes: Boolean(this.readJsonPath(binding.parameter, "attributes")),
                    logicalName: this.getBoundLogicalName(binding.parameter),
                    parameterType: this.readString(binding.parameter, ["type"]),
                    usage: binding.usage
                };
                return diagnostics;
            },
            {}
        ));
    }

    private logOutputBindings(
        context: ComponentFramework.Context<IInputs>,
        stage: string,
        suggestion?: AdvisorSuggestionViewModel
    ): void {
        this.log(`output binding diagnostics: ${stage}`, {
            bindings: this.getOutputBindings(context).reduce<Record<string, unknown>>((diagnostics, binding) => {
                diagnostics[binding.name] = {
                    boundLogicalName: this.getBoundLogicalName(binding.parameter),
                    hasAttributes: Boolean(this.readJsonPath(binding.parameter, "attributes")),
                    output: this.getValueDiagnostics(binding.value),
                    parameterType: this.readString(binding.parameter, ["type"]),
                    raw: this.getValueDiagnostics(this.readJsonPath(binding.parameter, "raw")),
                    usage: binding.usage
                };
                return diagnostics;
            }, {}),
            decisionLabel: suggestion ? this.getDecisionLabel(suggestion) : undefined,
            decisionValue: suggestion?.decisionByAI?.value,
            selectedCommentOutput: suggestion ? this.getDecisionCommentOutputName(suggestion) : undefined
        });
    }

    private getOutputDiagnostics(): Record<string, unknown> {
        return this.getOutputBindings().reduce<Record<string, unknown>>((diagnostics, binding) => {
            diagnostics[binding.name] = this.getValueDiagnostics(binding.value);
            return diagnostics;
        }, {});
    }

    private getOutputPacketDiagnostics(packet: RejectOutputPacket): Record<string, unknown> {
        return Object.keys(packet).reduce<Record<string, unknown>>((diagnostics, outputName) => {
            diagnostics[outputName] = this.getValueDiagnostics(packet[outputName as keyof IOutputs]);
            return diagnostics;
        }, {});
    }

    private getCurrentBoundOutputValue(
        context: ComponentFramework.Context<IInputs>,
        outputName: keyof IOutputs
    ): OutputValue {
        const parameters = context.parameters as IInputs & Record<keyof IOutputs, { raw?: unknown } | undefined>;
        const value = parameters[outputName]?.raw;

        if (value instanceof Date || typeof value === "number" || typeof value === "string") {
            return value;
        }

        return undefined;
    }

    private getOutputBindings(context?: ComponentFramework.Context<IInputs>): OutputBindingInfo[] {
        return [
            { name: "BoundField", parameter: context?.parameters.BoundField, usage: "bound", value: this.boundField },
            { name: "decisionByAI", parameter: context?.parameters.decisionByAI, usage: "bound", value: this.decisionByAI },
            {
                name: "customerCallSuggestionInstructionsByAI",
                parameter: context?.parameters.customerCallSuggestionInstructionsByAI,
                usage: "bound",
                value: this.customerCallSuggestionInstructionsByAI
            },
            { name: "validationByAI", parameter: context?.parameters.validationByAI, usage: "bound", value: this.validationByAI },
            { name: "invalidReason", parameter: context?.parameters.invalidReason, usage: "bound", value: this.invalidReason },
            { name: "closedInFavorOf", parameter: context?.parameters.closedInFavorOf, usage: "bound", value: this.closedInFavorOf },
            { name: "routeToSPReasons", parameter: context?.parameters.routeToSPReasons, usage: "bound", value: this.routeToSPReasons },
            { name: "assessDisputeComment", parameter: context?.parameters.assessDisputeComment, usage: "bound", value: this.assessDisputeComment },
            {
                name: "routeToServiceProviderComment",
                parameter: context?.parameters.routeToServiceProviderComment,
                usage: "bound",
                value: this.routeToServiceProviderComment
            },
            { name: "routeToDepartmentComment", parameter: context?.parameters.routeToDepartmentComment, usage: "bound", value: this.routeToDepartmentComment },
            { name: "escalateToLeadComment", parameter: context?.parameters.escalateToLeadComment, usage: "bound", value: this.escalateToLeadComment },
            { name: "suggestedComment", parameter: context?.parameters.suggestedComment, usage: "bound", value: this.suggestedComment },
            { name: "suggestedDecision", parameter: context?.parameters.suggestedDecision, usage: "bound", value: this.suggestedDecision },
            { name: "legalNotesJson", parameter: context?.parameters.legalNotesJson, usage: "bound", value: this.legalNotesJson },
            { name: "correlationId", parameter: context?.parameters.correlationId, usage: "bound", value: this.suggestionCorrelationId },
            { name: "resultText", parameter: context?.parameters.resultText, usage: "bound", value: this.resultText },
            { name: "resultJson", parameter: context?.parameters.resultJson, usage: "bound", value: this.resultJson },
            { name: "statusText", parameter: context?.parameters.statusText, usage: "bound", value: this.statusText },
            { name: "lastRunOn", parameter: context?.parameters.lastRunOn, usage: "bound", value: this.lastRunOn },
            { name: "feedbackByAI", parameter: context?.parameters.feedbackByAI, usage: "bound", value: this.feedbackByAI },
            {
                name: "reservedDecisionByAI",
                parameter: context?.parameters.reservedDecisionByAI,
                usage: "bound",
                value: this.persistedSuggestion?.decisionByAI?.value
            },
            {
                name: "reservedFeedbackByAI",
                parameter: context?.parameters.reservedFeedbackByAI,
                usage: "bound",
                value: this.persistedSuggestion?.feedbackByAI
            },
            {
                name: "reservedValidationByAI",
                parameter: context?.parameters.reservedValidationByAI,
                usage: "bound",
                value: this.persistedSuggestion?.validationByAI?.value
            },
            {
                name: "reservedInvalidReasonByAI",
                parameter: context?.parameters.reservedInvalidReasonByAI,
                usage: "bound",
                value: this.persistedSuggestion?.invalidReason?.value
            },
            {
                name: "reservedCustomerCallSuggestionInstructionsByAI",
                parameter: context?.parameters.reservedCustomerCallSuggestionInstructionsByAI,
                usage: "bound",
                value: this.persistedSuggestion?.customerCallSuggestionInstructionsByAI
            },
            {
                name: "reservedClosedInFavorOfByAI",
                parameter: context?.parameters.reservedClosedInFavorOfByAI,
                usage: "bound",
                value: this.persistedSuggestion?.closedInFavorOf?.value
            },
            { name: "aiReviewStatusLabel", parameter: context?.parameters.aiReviewStatusLabel, usage: "bound", value: this.aiReviewStatusLabel }
        ];
    }

    private getValueDiagnostics(value: unknown): Record<string, unknown> {
        const textValue = value instanceof Date ? value.toISOString() : value;
        const preview = this.formatLogPreview(textValue);

        return {
            hasValue: value !== undefined && value !== null && value !== "",
            length: typeof textValue === "string" ? textValue.length : undefined,
            preview,
            type: value instanceof Date ? "Date" : typeof value
        };
    }

    private getBoundLogicalName(parameter: unknown): string | undefined {
        return this.readString(parameter, ["attributes.LogicalName", "attributes.logicalName"]);
    }

    private formatLogPreview(value: unknown): string | number | boolean | undefined {
        if (value === undefined || value === null) {
            return undefined;
        }

        if (typeof value === "number" || typeof value === "boolean") {
            return value;
        }

        const textValue = typeof value === "string" ? value : JSON.stringify(value);
        return textValue.length > 120 ? `${textValue.slice(0, 120)}...` : textValue;
    }

    private async associateLegalNotesToCurrentRecord(
        context: ComponentFramework.Context<IInputs>,
        suggestion: PendingSuggestion
    ): Promise<number> {
        const contextInfo = this.getContextInfo(context);
        const recordId = this.cleanGuid(contextInfo?.entityId ?? "");
        const entityName = (contextInfo?.entityTypeName ?? this.caseEntityName).toLowerCase();

        if (!this.getShouldAssociateLegalNotes(context) || !this.isAssessCaseDecision(suggestion)) {
            this.log("legal note association skipped", {
                includeLegalNotes: this.getShouldAssociateLegalNotes(context),
                isAssessDecision: this.isAssessCaseDecision(suggestion)
            });
            return 0;
        }

        if (!recordId || entityName !== this.caseEntityName || suggestion.legalNotes.length === 0) {
            this.log("legal note association skipped", {
                entityName,
                hasLegalNotes: suggestion.legalNotes.length > 0,
                hasRecordId: Boolean(recordId)
            });
            return 0;
        }

        let associatedCount = 0;

        for (const legalNote of suggestion.legalNotes) {
            if (!this.hasLegalNoteReferences(legalNote)) {
                continue;
            }

            const associationKey = this.getLegalNoteAssociationKey(recordId, legalNote);

            if (this.associatedLegalNoteKeys[associationKey]) {
                continue;
            }

            await this.createLegalNoteForCase(context, recordId, legalNote);
            this.associatedLegalNoteKeys[associationKey] = true;
            associatedCount += 1;
        }

        return associatedCount;
    }

    private async createLegalNoteForCase(
        context: ComponentFramework.Context<IInputs>,
        caseId: string,
        legalNote: LegalNoteViewModel
    ): Promise<void> {
        const relationshipPayload = await this.buildLegalNotePayload(context, caseId, legalNote, true);

        try {
            await context.webAPI.createRecord(this.legalNoteEntityName, relationshipPayload);
            return;
        } catch (error) {
            this.log("legal note association retrying with lookup navigation names", {
                error: (error as Error).message
            });
        }

        const lookupPayload = await this.buildLegalNotePayload(context, caseId, legalNote, false);
        await context.webAPI.createRecord(this.legalNoteEntityName, lookupPayload);
    }

    private async buildLegalNotePayload(
        context: ComponentFramework.Context<IInputs>,
        caseId: string,
        legalNote: LegalNoteViewModel,
        useRelationshipNames: boolean
    ): Promise<ComponentFramework.WebApi.Entity> {
        const payload: ComponentFramework.WebApi.Entity = {};
        const caseEntitySetName = await this.getEntitySetName(context, this.caseEntityName, this.caseEntitySetName);

        payload[this.legalNoteNameField] = this.getLegalNoteName(legalNote);
        payload[`${useRelationshipNames ? this.legalNoteRelatedCaseRelationship : this.legalNoteRelatedCaseLookup}@odata.bind`] =
            `/${caseEntitySetName}(${caseId})`;

        await this.addLookupBind(
            context,
            payload,
            useRelationshipNames ? this.legalNoteCategoryRelationship : this.legalNoteCategoryLookup,
            this.legalNoteCategoryEntityName,
            this.legalNoteCategoryEntitySetName,
            legalNote.CategoryId
        );
        await this.addLookupBind(
            context,
            payload,
            useRelationshipNames ? this.legalNoteLevel1Relationship : this.legalNoteLevel1Lookup,
            this.legalNoteLevel1EntityName,
            this.legalNoteLevel1EntitySetName,
            legalNote.Level1Id
        );
        await this.addLookupBind(
            context,
            payload,
            useRelationshipNames ? this.legalNoteLevel2Relationship : this.legalNoteLevel2Lookup,
            this.legalNoteLevel2EntityName,
            this.legalNoteLevel2EntitySetName,
            legalNote.Level2Id
        );
        await this.addLookupBind(
            context,
            payload,
            useRelationshipNames ? this.legalNoteLevel3Relationship : this.legalNoteLevel3Lookup,
            this.legalNoteLevel3EntityName,
            this.legalNoteLevel3EntitySetName,
            legalNote.Level3Id
        );
        await this.addLookupBind(
            context,
            payload,
            useRelationshipNames ? this.legalNoteLevel4Relationship : this.legalNoteLevel4Lookup,
            this.legalNoteLevel4EntityName,
            this.legalNoteLevel4EntitySetName,
            legalNote.Level4Id
        );

        return payload;
    }

    private addBoundTextValue(
        payload: ComponentFramework.WebApi.Entity,
        parameter: ComponentFramework.PropertyTypes.StringProperty,
        value: string | undefined
    ): void {
        const logicalName = parameter.attributes?.LogicalName;

        if (!logicalName) {
            return;
        }

        payload[logicalName] = value ?? null;
    }

    private addBoundOptionSetValue(
        payload: ComponentFramework.WebApi.Entity,
        parameter: ComponentFramework.PropertyTypes.OptionSetProperty,
        value: number | undefined
    ): void {
        const logicalName = parameter.attributes?.LogicalName;

        if (!logicalName || value === undefined) {
            return;
        }

        payload[logicalName] = value;
    }

    private addBoundOptionSetValueOrNull(
        payload: ComponentFramework.WebApi.Entity,
        parameter: ComponentFramework.PropertyTypes.OptionSetProperty,
        value: number | undefined
    ): void {
        const logicalName = parameter.attributes?.LogicalName;

        if (!logicalName) {
            return;
        }

        payload[logicalName] = value ?? null;
    }

    private async addLookupBind(
        context: ComponentFramework.Context<IInputs>,
        payload: ComponentFramework.WebApi.Entity,
        navigationProperty: string,
        entityName: string,
        fallbackEntitySetName: string,
        id: string | undefined
    ): Promise<void> {
        const cleanId = this.cleanGuid(id ?? "");

        if (!cleanId) {
            return;
        }

        const entitySetName = await this.getEntitySetName(context, entityName, fallbackEntitySetName);
        payload[`${navigationProperty}@odata.bind`] = `/${entitySetName}(${cleanId})`;
    }

    private async getEntitySetName(
        context: ComponentFramework.Context<IInputs>,
        entityName: string,
        fallbackEntitySetName: string
    ): Promise<string> {
        if (this.entitySetNameCache[entityName]) {
            return this.entitySetNameCache[entityName];
        }

        try {
            const metadata = await context.utils.getEntityMetadata(entityName);
            const entitySetName = this.readString(metadata, ["EntitySetName", "entitySetName"]);

            if (entitySetName) {
                this.entitySetNameCache[entityName] = entitySetName;
                return entitySetName;
            }
        } catch (error) {
            this.log("entity set metadata lookup failed", {
                entityName,
                error: (error as Error).message
            });
        }

        this.entitySetNameCache[entityName] = fallbackEntitySetName;
        return fallbackEntitySetName;
    }

    private getLegalNoteName(legalNote: LegalNoteViewModel): string {
        return [
            legalNote.Title,
            legalNote.Name,
            legalNote.Number,
            legalNote.LegalNoteLevel1,
            legalNote.Level1Id,
            legalNote.CategoryId,
            "AI Legal Note"
        ].find((value) => Boolean(value)) ?? "AI Legal Note";
    }

    private hasLegalNoteReferences(legalNote: LegalNoteViewModel): boolean {
        return Boolean(this.cleanGuid(legalNote.Level1Id ?? ""));
    }

    private getLegalNoteAssociationKey(recordId: string, legalNote: LegalNoteViewModel): string {
        return [
            this.cleanGuid(recordId),
            this.cleanGuid(legalNote.CategoryId ?? ""),
            this.cleanGuid(legalNote.Level1Id ?? ""),
            this.cleanGuid(legalNote.Level2Id ?? ""),
            this.cleanGuid(legalNote.Level3Id ?? ""),
            this.cleanGuid(legalNote.Level4Id ?? "")
        ].join("|").toLowerCase();
    }

    private formatSaveSuccessMessage(associatedLegalNotes: number): string {
        if (associatedLegalNotes > 0) {
            return `Accepted. Suggested fields and ${associatedLegalNotes} legal note(s) were saved to the Case.`;
        }

        return "Accepted. Suggested fields were saved to the Case.";
    }

    private buildBody(context: ComponentFramework.Context<IInputs>, identifiers: RequestIdentifiers): string | undefined {
        const method = this.getMethod(context);

        if (method === "GET") {
            return undefined;
        }

        const template = context.parameters.requestTemplate.raw;
        const payload = template
            ? this.applyTemplate(template, context, identifiers)
            : JSON.stringify(this.buildTemporaryPayload(context));

        return payload;
    }

    private buildHeaders(
        context: ComponentFramework.Context<IInputs>,
        identifiers: RequestIdentifiers,
        method: HttpMethod
    ): HeadersInit {
        const headers = this.parseHeaders(context, identifiers);
        const apiVersion = this.getApiVersion(context);

        this.setHeader(headers, "Accept", "application/json");

        if (method !== "GET") {
            this.setHeader(headers, "Content-Type", "application/json");
            this.setHeader(headers, "x-request-id", identifiers.apiRequestId);
        }

        this.setHeader(headers, "x-correlation-id", identifiers.correlationId);
        this.setHeader(headers, "x-api-version", apiVersion);

        return headers;
    }

    private parseHeaders(
        context: ComponentFramework.Context<IInputs>,
        identifiers: RequestIdentifiers
    ): Record<string, string> {
        const headersJson = context.parameters.headersJson.raw;

        if (!headersJson) {
            return {};
        }

        const parsedHeaders = JSON.parse(this.applyTemplate(headersJson, context, identifiers)) as Record<string, unknown>;
        const headers: Record<string, string> = {};

        Object.keys(parsedHeaders).forEach((headerName) => {
            const headerValue = parsedHeaders[headerName];

            if (headerValue !== undefined && headerValue !== null) {
                headers[headerName] = this.formatHeaderValue(headerValue);
            }
        });

        return headers;
    }

    private sanitizeHeadersForLog(headers: HeadersInit): Record<string, string> {
        const sanitizedHeaders: Record<string, string> = {};
        const sourceHeaders = headers as Record<string, string>;

        Object.keys(sourceHeaders).forEach((name) => {
            sanitizedHeaders[name] = name.toLowerCase() === "authorization"
                ? "[redacted]"
                : sourceHeaders[name];
        });

        return sanitizedHeaders;
    }

    private toSuggestionLog(suggestion: PendingSuggestion): Record<string, unknown> {
        return {
            closedInFavorOf: suggestion.closedInFavorOf,
            correlationId: suggestion.correlationId,
            decisionByAI: suggestion.decisionByAI,
            feedbackByAI: suggestion.feedbackByAI,
            legalNotesCount: suggestion.legalNotes.length,
            requestId: suggestion.caseRequestId,
            responseMessage: suggestion.responseMessage,
            validationByAI: suggestion.validationByAI
        };
    }

    private formatHeaderValue(value: unknown): string {
        if (typeof value === "string") {
            return value;
        }

        if (typeof value === "number" || typeof value === "boolean") {
            return String(value);
        }

        return JSON.stringify(value);
    }

    private getApiVersion(context: ComponentFramework.Context<IInputs>): string {
        const configuredVersion = context.parameters.apiVersion.raw?.trim();
        return configuredVersion && configuredVersion.length > 0 ? configuredVersion : "1.0";
    }

    private getApiEndpoint(context: ComponentFramework.Context<IInputs>): string {
        const configuredEndpoint = context.parameters.apiEndpoint.raw?.trim();
        return configuredEndpoint && configuredEndpoint.length > 0 ? configuredEndpoint : this.defaultApiEndpoint;
    }

    private getCaseRequestId(context: ComponentFramework.Context<IInputs>): string {
        return this.getCurrentRecordId(context);
    }

    private getCurrentRecordId(context: ComponentFramework.Context<IInputs>): string {
        return this.cleanGuid(this.getContextInfo(context)?.entityId ?? "");
    }

    private getInputText(context: ComponentFramework.Context<IInputs>): string {
        const generatedPrompt = this.getGeneratedPrompt(context);

        if (generatedPrompt) {
            return generatedPrompt;
        }

        return context.parameters.inputValue.raw?.trim() ?? "";
    }

    private getGeneratedPrompt(context: ComponentFramework.Context<IInputs>): string {
        const caseDetails = this.getCaseDetails(context);
        const providerName = this.getProviderName(context);
        const providerResponse = this.getProviderResponse(context);

        if (!caseDetails && !providerName && !providerResponse) {
            return "";
        }

        return [
            "Please review the following case details and provide a suggested decision based on our uploaded knowledge base documents:",
            `- Case Details: ${caseDetails}`,
            `- Service Provider Name: ${providerName}`,
            `- Service Provider Response: ${providerResponse}`
        ].join("\n");
    }

    private getCaseDetails(context: ComponentFramework.Context<IInputs>): string {
        return context.parameters.caseDetails.raw?.trim() ?? "";
    }

    private getProviderName(context: ComponentFramework.Context<IInputs>): string {
        return this.getTextOrOptionSetLabel(context.parameters.providerName);
    }

    private getProviderResponse(context: ComponentFramework.Context<IInputs>): string {
        return context.parameters.providerResponse.raw?.trim() ?? "";
    }

    private async ensureServiceProviderOptionLabels(
        context: ComponentFramework.Context<IInputs>
    ): Promise<Record<number, string> | undefined> {
        const selectedValue = context.parameters.providerName.raw;

        if (selectedValue === null || this.getTextOrOptionSetLabel(context.parameters.providerName)) {
            return this.serviceProviderOptionLabels;
        }

        if (this.serviceProviderOptionLabels) {
            return this.serviceProviderOptionLabels;
        }

        if (this.serviceProviderOptionLabelsPromise) {
            return this.serviceProviderOptionLabelsPromise;
        }

        this.serviceProviderOptionLabelsPromise = this.fetchServiceProviderOptionLabels(context, selectedValue)
            .catch((error) => {
                this.log("service provider option-set metadata unavailable", {
                    error: (error as Error).message,
                    optionSetName: this.serviceProviderGlobalOptionSetName
                });
                return undefined;
            })
            .finally(() => {
                this.serviceProviderOptionLabelsPromise = undefined;
            });

        return this.serviceProviderOptionLabelsPromise;
    }

    private async fetchServiceProviderOptionLabels(
        context: ComponentFramework.Context<IInputs>,
        selectedValue: number
    ): Promise<Record<number, string>> {
        const urls = this.buildGlobalOptionSetMetadataUrls(context);
        const errors: string[] = [];

        for (const url of urls) {
            try {
                const response = await fetch(url, {
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "OData-MaxVersion": "4.0",
                        "OData-Version": "4.0"
                    },
                    method: "GET"
                });

                if (!response.ok) {
                    errors.push(`${url}: ${response.status}`);
                    continue;
                }

                const responseData = await response.json() as unknown;
                const labels = this.parseGlobalOptionSetLabels(responseData);

                if (Object.keys(labels).length === 0) {
                    errors.push(`${url}: no options in response`);
                    continue;
                }

                this.serviceProviderOptionLabels = labels;
                this.log("service provider option-set metadata loaded", {
                    optionCount: Object.keys(labels).length,
                    selectedLabel: labels[selectedValue],
                    selectedValue,
                    url
                });
                return labels;
            } catch (error) {
                errors.push(`${url}: ${(error as Error).message}`);
            }
        }

        throw new Error(errors.join(" | ") || "No metadata URL could be built.");
    }

    private buildGlobalOptionSetMetadataUrls(context: ComponentFramework.Context<IInputs>): string[] {
        const escapedOptionSetName = this.serviceProviderGlobalOptionSetName.replace(/'/g, "''");
        const relativePaths = [
            `/api/data/v9.1/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')/Microsoft.Dynamics.CRM.OptionSetMetadata?$select=Name,Options`,
            `/api/data/v9.2/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')/Microsoft.Dynamics.CRM.OptionSetMetadata?$select=Name,Options`,
            `/api/data/v9.1/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')/Microsoft.Dynamics.CRM.OptionSetMetadata`,
            `/api/data/v9.2/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')/Microsoft.Dynamics.CRM.OptionSetMetadata`,
            `/api/data/v9.1/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')?$select=Name`,
            `/api/data/v9.2/GlobalOptionSetDefinitions(Name='${escapedOptionSetName}')?$select=Name`
        ];
        const clientUrl = this.getClientUrl(context);
        const urls = clientUrl
            ? relativePaths.map((path) => `${clientUrl}${path}`)
            : [];

        relativePaths.forEach((path) => {
            if (!urls.includes(path)) {
                urls.push(path);
            }
        });

        return urls;
    }

    private getIsDevelopment(context: ComponentFramework.Context<IInputs>): boolean {
        const parameters = context.parameters as IInputs & Record<string, { raw?: unknown } | undefined>;

        return [
            parameters.isdevleopment?.raw,
            parameters.isdevelopment?.raw,
            parameters.isdevelpment?.raw
        ].some((value) => this.parseBooleanInput(value));
    }

    private getShouldAssociateLegalNotes(context: ComponentFramework.Context<IInputs>): boolean {
        const parameters = context.parameters as IInputs & Record<string, { raw?: unknown } | undefined>;

        return [
            parameters.includeLegalNotes?.raw,
            parameters.includelegalnotes?.raw
        ].some((value) => this.parseBooleanInput(value));
    }

    private getIsBpfHandled(context: ComponentFramework.Context<IInputs>): boolean {
        const parameters = context.parameters as IInputs & Record<string, { raw?: unknown } | undefined>;

        return [
            parameters.isBpfHandled?.raw,
            parameters.isbpfhandled?.raw,
            parameters.IsBPFHandled?.raw
        ].some((value) => this.parseBooleanInput(value));
    }

    private getAllowUnsupportedFormRefresh(context: ComponentFramework.Context<IInputs>): boolean {
        const parameters = context.parameters as IInputs & Record<string, { raw?: unknown } | undefined>;

        return [
            parameters.allowUnsupportedFormRefresh?.raw,
            parameters.allowunsupportedformrefresh?.raw
        ].some((value) => this.parseBooleanInput(value));
    }

    private getBpfEntityName(context: ComponentFramework.Context<IInputs>): string {
        return context.parameters.bpfEntityName.raw?.trim() ?? "ldv_bpf_c7bfac2f19d840fdafbbe0bcafa3b206";
    }

    private getBpfCaseLookupFieldName(context: ComponentFramework.Context<IInputs>): string {
        return context.parameters.bpfCaseLookupFieldName.raw?.trim() ?? "bpf_incidentid";
    }

    private getAllowedBpfStageNames(context: ComponentFramework.Context<IInputs>): string[] {
        const parameters = context.parameters as IInputs & Record<string, { raw?: unknown } | undefined>;
        const configuredStages = this.readRawString(parameters.allowedBpfStageNames?.raw)
            ?? this.readRawString(parameters.disabledBpfStageNames?.raw)
            ?? "Customer Care Decision";

        return configuredStages
            .split(",")
            .map((stageName) => stageName.trim())
            .filter(Boolean);
    }

    private getBpfCheckKey(context: ComponentFramework.Context<IInputs>): string {
        return [
            this.getIsBpfHandled(context) ? "true" : "false",
            this.getCurrentRecordId(context),
            this.getBpfEntityName(context),
            this.getBpfCaseLookupFieldName(context),
            this.getAllowedBpfStageNames(context).join(",")
        ].join("|");
    }

    private async refreshBpfGate(context: ComponentFramework.Context<IInputs>, force = false): Promise<boolean> {
        if (!this.getIsBpfHandled(context)) {
            this.isBpfDisabled = false;
            this.bpfDisabledReason = undefined;
            this.bpfStageName = undefined;
            return true;
        }

        const checkKey = this.getBpfCheckKey(context);

        if (!force && this.bpfCheckKey === checkKey) {
            return !this.isBpfDisabled;
        }

        this.bpfCheckKey = checkKey;
        const allowedStages = this.getAllowedBpfStageNames(context).map((stageName) => this.normalizeStageName(stageName));

        if (!this.getCurrentRecordId(context) || allowedStages.length === 0) {
            this.isBpfDisabled = true;
            this.bpfDisabledReason = "AI Advisor is disabled because no allowed BPF stages are configured.";
            this.statusText = this.bpfDisabledReason;
            this.errorMessage = undefined;
            return false;
        }

        let stage: BpfStageResult = {};

        try {
            stage = await this.getCurrentBpfStage(context);
        } catch (error) {
            this.isBpfDisabled = false;
            this.bpfDisabledReason = undefined;
            this.log("bpf gate check failed", {
                error: (error as Error).message
            });
            return true;
        }

        this.bpfStageName = stage.stageName;
        const currentStageName = this.normalizeStageName(stage.stageName ?? "");
        this.isBpfDisabled = !currentStageName || !allowedStages.includes(currentStageName);
        this.bpfDisabledReason = this.isBpfDisabled
            ? `AI Advisor is disabled because BPF stage "${stage.stageName ?? "Unknown"}" is not allowed.`
            : undefined;

        if (this.isBpfDisabled) {
            this.statusText = this.bpfDisabledReason;
            this.errorMessage = undefined;
        } else if (this.statusText?.startsWith("AI Advisor is disabled because BPF stage")) {
            this.statusText = "Ready";
        }

        this.log("bpf gate checked", {
            allowedStages,
            isBpfDisabled: this.isBpfDisabled,
            stage
        });

        return !this.isBpfDisabled;
    }

    private async getCurrentBpfStage(context: ComponentFramework.Context<IInputs>): Promise<BpfStageResult> {
        const caseId = this.getCurrentRecordId(context);
        const bpfEntityName = this.getBpfEntityName(context);
        const lookupValueName = this.toLookupValueName(this.getBpfCaseLookupFieldName(context));
        const options = [
            "?$select=_activestageid_value",
            `&$filter=${lookupValueName} eq ${caseId}`,
            "&$top=1"
        ].join("");
        const result = await context.webAPI.retrieveMultipleRecords(bpfEntityName, options, 1);
        const bpfInstance = result.entities[0];

        if (!bpfInstance) {
            return {};
        }

        const stageId = this.cleanGuid(this.readString(bpfInstance, ["_activestageid_value", "activestageid"]) ?? "");
        const formattedStageName = this.readString(bpfInstance, [
            "_activestageid_value@OData.Community.Display.V1.FormattedValue",
            "activestageid@OData.Community.Display.V1.FormattedValue"
        ]);

        if (formattedStageName || !stageId) {
            return {
                stageId,
                stageName: formattedStageName
            };
        }

        const stageRecord = await context.webAPI.retrieveRecord("processstage", stageId, "?$select=stagename");

        return {
            stageId,
            stageName: this.readString(stageRecord, ["stagename", "StageName"])
        };
    }

    private toLookupValueName(fieldName: string): string {
        const normalizedFieldName = fieldName.trim();

        if (normalizedFieldName.startsWith("_") && normalizedFieldName.endsWith("_value")) {
            return normalizedFieldName;
        }

        return `_${normalizedFieldName}_value`;
    }

    private normalizeStageName(stageName: string): string {
        return stageName.trim().toLowerCase();
    }

    private readRawString(value: unknown): string | undefined {
        if (typeof value !== "string") {
            return undefined;
        }

        const trimmedValue = value.trim();
        return trimmedValue ? trimmedValue : undefined;
    }

    private parseBooleanInput(value: unknown): boolean {
        if (typeof value === "boolean") {
            return value;
        }

        if (typeof value === "number") {
            return value === 1;
        }

        if (typeof value === "string") {
            const normalizedValue = value.trim().toLowerCase();
            return normalizedValue === "true"
                || normalizedValue === "yes"
                || normalizedValue === "1"
                || normalizedValue === "development";
        }

        return false;
    }

    private buildRequestKey(context: ComponentFramework.Context<IInputs>): string {
        return [
            this.getApiEndpoint(context),
            this.getInputText(context),
            this.getCaseDetails(context),
            this.getProviderName(context),
            this.getProviderResponse(context),
            context.parameters.requestMethod.raw ?? "",
            context.parameters.requestTemplate.raw ?? "",
            context.parameters.headersJson.raw ?? "",
            context.parameters.apiVersion.raw ?? "",
            context.parameters.includeLegalNoteText.raw === true ? "true" : "false",
            this.getShouldAssociateLegalNotes(context) ? "true" : "false",
            this.getIsBpfHandled(context) ? "true" : "false",
            this.getBpfEntityName(context),
            this.getBpfCaseLookupFieldName(context),
            this.getAllowedBpfStageNames(context).join(","),
            context.parameters.resultPath.raw ?? ""
        ].join("|");
    }

    private buildTemporaryPayload(context: ComponentFramework.Context<IInputs>): Record<string, unknown> {
        return {
            CaseId: this.getCurrentRecordId(context),
            InputText: this.getInputText(context)
        };
    }

    private buildUrl(
        apiEndpoint: string,
        context: ComponentFramework.Context<IInputs>,
        identifiers: RequestIdentifiers
    ): string {
        if (this.getMethod(context) !== "GET") {
            return apiEndpoint;
        }

        const url = new URL(apiEndpoint);
        const caseId = this.getCurrentRecordId(context);
        url.searchParams.set("caseId", caseId);
        url.searchParams.set("CaseId", caseId);
        url.searchParams.set("inputText", this.getInputText(context));
        url.searchParams.set("correlationId", identifiers.correlationId);
        return url.toString();
    }

    private applyTemplate(
        template: string,
        context: ComponentFramework.Context<IInputs>,
        identifiers: RequestIdentifiers
    ): string {
        const contextInfo = this.getContextInfo(context);
        const caseId = this.getCurrentRecordId(context);
        const replacements: Record<string, string> = {
            apiRequestId: identifiers.apiRequestId,
            apiVersion: this.getApiVersion(context),
            CaseId: caseId,
            caseDetails: this.getCaseDetails(context),
            caseId,
            caseRequestId: this.getCaseRequestId(context),
            correlationId: identifiers.correlationId,
            entityName: contextInfo?.entityTypeName ?? "",
            includeLegalNoteText: String(context.parameters.includeLegalNoteText.raw !== false),
            includeLegalNotes: String(this.getShouldAssociateLegalNotes(context)),
            inputText: this.getInputText(context),
            providerName: this.getProviderName(context),
            providerResponse: this.getProviderResponse(context),
            recordId: caseId,
            requestId: this.getCaseRequestId(context),
            requestNumber: this.getInputText(context),
            value: this.getInputText(context)
        };

        return Object.keys(replacements).reduce(
            (result, key) => result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), replacements[key]),
            template
        );
    }

    private buildPendingSuggestion(
        responseData: unknown,
        responseText: string,
        identifiers: RequestIdentifiers,
        context: ComponentFramework.Context<IInputs>
    ): PendingSuggestion {
        const standardResponse = this.isRecord(responseData) ? responseData as StandardApiResponse : undefined;
        const responseCorrelationId = this.readString(standardResponse, ["correlationId", "CorrelationId"]);
        const isStandardResponse = Boolean(
            standardResponse && (
                "success" in standardResponse
                || "statusCode" in standardResponse
                || "data" in standardResponse
                || "error" in standardResponse
            )
        );

        if (responseCorrelationId && responseCorrelationId.toLowerCase() !== identifiers.correlationId.toLowerCase()) {
            throw new Error("API correlation mismatch. The response did not echo the CRM x-correlation-id.");
        }

        if (isStandardResponse && standardResponse?.success === false) {
            throw new Error(this.getErrorText(responseData, responseText));
        }

        const payload = isStandardResponse ? standardResponse?.data : responseData;
        const suggestion = this.normalizeSuggestion(payload);
        const resultPath = context.parameters.resultPath.raw ?? "";
        const configuredResult = resultPath ? this.readJsonPath(payload, resultPath) : undefined;
        const fallbackComment = suggestion.suggestedComment
            ?? this.formatMappedValue(configuredResult)
            ?? this.readString(standardResponse, ["message"]);

        return {
            ...suggestion,
            correlationId: responseCorrelationId ?? identifiers.correlationId,
            generatedOn: new Date().toISOString(),
            generatedOnDate: new Date(),
            legalNotes: suggestion.legalNotes,
            rawJson: this.formatResponseJson(responseData, responseText),
            requestId: suggestion.caseRequestId ?? this.getCaseRequestId(context),
            responseMessage: this.readString(standardResponse, ["message"]),
            suggestedComment: fallbackComment,
            suggestedDecision: suggestion.suggestedDecision ?? ""
        };
    }

    private normalizeSuggestion(data: unknown): AdvisorSuggestionViewModel {
        const candidate = this.getSuggestionCandidate(data);
        const legalNotes = this.readLegalNotes(candidate, data);
        const decisionByAI = this.readOptionSetItemFromValueAndLabel(candidate, "DecisionValue", "Decision")
            ?? this.readOptionSetItem(candidate, [
            "decisionByAI",
            "DecisionByAI",
            "DecisionValue",
            "decision",
            "Decision",
            "suggestedDecision",
            "SuggestedDecision"
        ]);
        const validationByAI = this.readOptionSetItemFromValueAndLabel(candidate, "ValidationValue", "Validation")
            ?? this.readOptionSetItem(candidate, [
            "validationByAI",
            "ValidationByAI",
            "ValidationValue",
            "validation",
            "Validation"
        ]);
        const invalidReason = this.readInvalidReason(candidate);
        const closedInFavorOf = this.readOptionSetItemFromValueAndLabel(candidate, "CloseInFavorOfValue", "CloseInFavorOf")
            ?? this.readOptionSetItemFromValueAndLabel(candidate, "CloseInFavorOfValue", "CloseinFavorOf")
            ?? this.readOptionSetItem(candidate, [
            "closedInFavorOf",
            "ClosedInFavorOf",
            "CloseinFavorOf",
            "CloseInFavorOf",
            "CloseInFavorOfValue",
            "closed_in_favor_of"
        ]);
        const feedbackByAI = this.readString(candidate, [
            "feedbackByAI",
            "FeedbackByAI",
            "feedback",
            "Feedback",
            "Reason",
            "reason",
            "suggestedComment",
            "SuggestedComment",
            "comment",
            "Comment",
            "caseComment",
            "case_comment"
        ]);
        const confidence = this.readNumber(candidate, [
            "confidence",
            "Confidence",
            "confidenceScore",
            "confidence_score",
            "score"
        ]);

        return {
            advisoryNote: this.readString(candidate, [
                "advisoryNote",
                "advisory_note",
                "note",
                "advisorNote",
                "advisor_note"
            ]),
            caseRequestId: this.readString(candidate, [
                "requestId",
                "RequestId",
                "RequestID",
                "id",
                "Id"
            ]),
            closedInFavorOf,
            confidence,
            confidenceLabel: this.readString(candidate, ["confidenceLabel", "confidence_label"]),
            customerCallSuggestionInstructionsByAI: this.readString(candidate, [
                "customerCallSuggestionInstructionsByAI",
                "CustomerCallSuggestionInstructionsByAI",
                "customerCallSuggestion",
                "customer_call_suggestion",
                "callInstructions",
                "call_instructions",
                "Reason",
                "reason"
            ]),
            decisionByAI,
            validationByAI,
            feedbackByAI,
            invalidReason,
            legalNotes,
            policyReference: this.readString(candidate, ["policyReference", "policy_reference", "policy"]),
            reasoning: this.readString(candidate, [
                "reasoning",
                "analysis",
                "reasoningAnalysis",
                "reasoning_analysis"
            ]),
            routeToSPReasons: this.readString(candidate, [
                "routeToSPReasons",
                "RouteToSPReasons",
                "routetoSPReasons",
                "RoutetoSPReasons",
                "route_to_sp_reasons"
            ]),
            suggestedComment: feedbackByAI,
            suggestedDecision: this.formatOptionSetLabel(decisionByAI)
        };
    }

    private getSuggestionCandidate(data: unknown): unknown {
        const outputResult = this.parseJsonObject(this.readJsonPath(data, "OutputResult"))
            ?? this.parseJsonObject(this.readJsonPath(data, "outputResult"));
        const candidate = this.readJsonPath(data, "disputeObject")
            ?? this.readJsonPath(data, "DisputeObject")
            ?? this.readJsonPath(data, "dispute")
            ?? this.readJsonPath(data, "Dispute")
            ?? this.readJsonPath(data, "data.disputeObject")
            ?? this.readJsonPath(data, "data.DisputeObject")
            ?? this.readJsonPath(data, "suggestion")
            ?? this.readJsonPath(data, "aiSuggestion")
            ?? this.readJsonPath(data, "recommendation")
            ?? this.readJsonPath(data, "result")
            ?? outputResult
            ?? data;

        if (this.isRecord(data) && this.isRecord(candidate) && candidate !== data) {
            return {
                ...candidate,
                ...data
            };
        }

        return candidate;
    }

    private readLegalNotes(...candidates: unknown[]): LegalNoteViewModel[] {
        const legalNotePaths = [
            "legalNoteIds.legalNotes",
            "LegalNoteIds.LegalNotes",
            "legalNoteIds",
            "LegalNoteIds",
            "LegalNotesJson",
            "legalNotesJson",
            "legalNotes",
            "LegalNotes",
            "legal_notes",
            "legalNote",
            "LegalNote",
            "policyReferences",
            "policy_references"
        ];

        for (const candidate of candidates) {
            for (const path of legalNotePaths) {
                const value = this.readJsonPath(candidate, path);
                const legalNotes = this.normalizeLegalNotes(value);

                if (legalNotes.length > 0) {
                    return legalNotes;
                }
            }
        }

        return [];
    }

    private normalizeLegalNotes(value: unknown): LegalNoteViewModel[] {
        if (!value) {
            return [];
        }

        if (typeof value === "string" && value.trim()) {
            try {
                const parsedValue = JSON.parse(value) as unknown;
                return this.normalizeLegalNotes(parsedValue);
            } catch {
                return [{
                    Text: value.trim()
                }];
            }
        }

        if (Array.isArray(value)) {
            return value
                .map((item) => this.normalizeLegalNote(item))
                .filter((item): item is LegalNoteViewModel => Boolean(item));
        }

        const nestedLegalNotes = this.readJsonPath(value, "legalNotes")
            ?? this.readJsonPath(value, "LegalNotes");

        if (nestedLegalNotes && nestedLegalNotes !== value) {
            return this.normalizeLegalNotes(nestedLegalNotes);
        }

        const singleNote = this.normalizeLegalNote(value);
        return singleNote ? [singleNote] : [];
    }

    private normalizeLegalNote(value: unknown): LegalNoteViewModel | undefined {
        if (typeof value === "string" && value.trim()) {
            return {
                Text: value
            };
        }

        if (!this.isRecord(value)) {
            return undefined;
        }

        return {
            CategoryId: this.readString(value, ["CategoryId", "categoryId", "legalNoteCategoryId", "legal_note_category_id"]),
            Id: this.readString(value, ["Id", "id", "legalNoteId", "legal_note_id"]),
            Level1Id: this.readString(value, ["Level1Id", "level1Id", "legalNoteLevel1Id", "legal_note_level_1_id"]),
            Level2Id: this.readString(value, ["Level2Id", "level2Id", "legalNoteLevel2Id", "legal_note_level_2_id"]),
            Level3Id: this.readString(value, ["Level3Id", "level3Id", "legalNoteLevel3Id", "legal_note_level_3_id"]),
            Level4Id: this.readString(value, ["Level4Id", "level4Id", "legalNoteLevel4Id", "legal_note_level_4_id"]),
            LegalNoteCategory: this.readString(value, ["LegalNoteCategory", "legalNoteCategory", "legal_note_category"]),
            LegalNoteLevel1: this.readString(value, ["LegalNoteLevel1", "legalNoteLevel1", "legal_note_level_1"]),
            LegalNoteLevel2: this.readString(value, ["LegalNoteLevel2", "legalNoteLevel2", "legal_note_level_2"]),
            LegalNoteLevel3: this.readString(value, ["LegalNoteLevel3", "legalNoteLevel3", "legal_note_level_3"]),
            LegalNoteLevel4: this.readString(value, ["LegalNoteLevel4", "legalNoteLevel4", "legal_note_level_4"]),
            Name: this.readString(value, ["Name", "name"]),
            Number: this.readString(value, ["Number", "number", "code", "Code"]),
            Title: this.readString(value, ["Title", "title", "name", "Name"]),
            Text: this.readString(value, ["Text", "text", "body", "Body"]),
            isActive: this.readBoolean(value, ["isActive", "IsActive", "active", "Active"]),
            ldv_RelatedCase: this.readString(value, ["ldv_RelatedCase", "relatedCase", "RelatedCase"])
        };
    }

    private getContextInfo(context: ComponentFramework.Context<IInputs>): ContextInfo | undefined {
        return (
            context.mode as ComponentFramework.Mode & {
                contextInfo?: ContextInfo;
            }
        ).contextInfo;
    }

    private getErrorText(responseData: unknown, fallback: string): string {
        if (this.isRecord(responseData)) {
            const message = this.readString(responseData, ["message"]);
            const errorCode = this.readString(responseData, ["error.code"]);
            const details = this.readJsonPath(responseData, "error.details");

            if (message && errorCode) {
                return `${message} (${errorCode})`;
            }

            if (message) {
                return message;
            }

            if (errorCode) {
                return details ? `${errorCode}: ${JSON.stringify(details)}` : errorCode;
            }
        }

        return fallback || "The API request failed.";
    }

    private formatApiError(
        status: number,
        statusText: string,
        responseData: unknown,
        responseText: string
    ): string {
        const reason = this.getErrorText(responseData, responseText);
        const statusLabel = statusText ? `${status} ${statusText}` : String(status);
        return `API returned ${statusLabel}: ${reason}`;
    }

    private getMethod(context: ComponentFramework.Context<IInputs>): HttpMethod {
        const method = (context.parameters.requestMethod.raw ?? "POST").toUpperCase();

        if (method === "GET" || method === "POST" || method === "PUT" || method === "PATCH") {
            return method;
        }

        return "POST";
    }

    private parseResponse(responseText: string): unknown {
        if (!responseText) {
            return {};
        }

        try {
            return JSON.parse(responseText);
        } catch {
            return responseText;
        }
    }

    private parseJsonObject(value: unknown): Record<string, unknown> | undefined {
        if (this.isRecord(value)) {
            return value;
        }

        if (typeof value !== "string" || !value.trim()) {
            return undefined;
        }

        try {
            const parsedValue = JSON.parse(value) as unknown;
            return this.isRecord(parsedValue) ? parsedValue : undefined;
        } catch {
            return undefined;
        }
    }

    private formatMappedValue(value: unknown): string | undefined {
        if (value === undefined || value === null) {
            return undefined;
        }

        if (typeof value === "string") {
            return value;
        }

        if (typeof value === "number" || typeof value === "boolean") {
            return String(value);
        }

        return JSON.stringify(value, null, 2);
    }

    private formatResponseJson(responseData: unknown, responseText: string): string {
        if (typeof responseData === "string") {
            return responseText || responseData;
        }

        return JSON.stringify(responseData, null, 2);
    }

    private hasPendingResult(): boolean {
        return this.pendingSuggestion !== undefined;
    }

    private getTextOrOptionSetLabel(parameter: unknown): string {
        if (!this.isRecord(parameter)) {
            return "";
        }

        const formatted = this.readString(parameter, ["formatted"]);

        if (formatted) {
            return formatted;
        }

        const rawValue = parameter.raw;

        if (typeof rawValue === "string") {
            return rawValue.trim();
        }

        if (typeof rawValue !== "number") {
            return "";
        }

        const optionLabel = this.getOptionSetMetadataLabel(parameter, rawValue);

        return optionLabel ?? this.serviceProviderOptionLabels?.[rawValue] ?? "";
    }

    private getOptionSetMetadataLabel(parameter: Record<string, unknown>, value: number): string | undefined {
        const options = this.readJsonPath(parameter, "attributes.Options");

        if (!Array.isArray(options)) {
            return undefined;
        }

        for (const option of options) {
            const optionValue = this.readNumber(option, ["Value", "value"]);

            if (optionValue !== value) {
                continue;
            }

            return this.readOptionMetadataLabel(option);
        }

        return undefined;
    }

    private parseGlobalOptionSetLabels(data: unknown): Record<number, string> {
        const labels: Record<number, string> = {};
        const options = this.readJsonPath(data, "Options")
            ?? this.readJsonPath(data, "options")
            ?? this.readJsonPath(data, "value[0].Options")
            ?? this.readJsonPath(data, "value[0].options");

        if (!Array.isArray(options)) {
            return labels;
        }

        options.forEach((option) => {
            const value = this.readNumber(option, ["Value", "value"]);
            const label = this.readOptionMetadataLabel(option);

            if (value !== undefined && label) {
                labels[value] = label;
            }
        });

        return labels;
    }

    private readOptionMetadataLabel(option: unknown): string | undefined {
        return this.readLocalizedLabel(option, this.serviceProviderOptionLabelLanguageCode)
            ?? this.readString(option, [
            "Label",
            "label",
            "Name",
            "name",
            "Label.UserLocalizedLabel.Label",
            "label.UserLocalizedLabel.Label",
            "Label.userLocalizedLabel.Label",
            "label.userLocalizedLabel.label",
            "Label.LocalizedLabels[0].Label",
            "label.LocalizedLabels[0].Label"
        ]);
    }

    private readLocalizedLabel(option: unknown, preferredLanguageCode: number): string | undefined {
        const localizedLabels = this.readJsonPath(option, "Label.LocalizedLabels")
            ?? this.readJsonPath(option, "label.LocalizedLabels")
            ?? this.readJsonPath(option, "Label.localizedLabels")
            ?? this.readJsonPath(option, "label.localizedLabels");

        if (!Array.isArray(localizedLabels)) {
            return undefined;
        }

        const labels = localizedLabels as unknown[];
        const preferredLabel = labels.find((label) => (
            this.readNumber(label, ["LanguageCode", "languageCode"]) === preferredLanguageCode
            && Boolean(this.readString(label, ["Label", "label"]))
        ));

        if (preferredLabel) {
            return this.readString(preferredLabel, ["Label", "label"]);
        }

        for (const label of labels) {
            const labelText = this.readString(label, ["Label", "label"]);

            if (labelText) {
                return labelText;
            }
        }

        return undefined;
    }

    private getClientUrl(context: ComponentFramework.Context<IInputs>): string | undefined {
        const contextClientUrl = (context as ComponentFramework.Context<IInputs> & ContextWithPage)
            .page
            ?.getClientUrl?.();

        if (contextClientUrl) {
            return contextClientUrl.replace(/\/$/, "");
        }

        const xrm = this.getXrmGlobal();
        const clientUrl = xrm?.Utility?.getGlobalContext?.().getClientUrl?.();

        return clientUrl?.replace(/\/$/, "");
    }

    private async tryUnsupportedFormRefresh(
        context: ComponentFramework.Context<IInputs>,
        actionName: string
    ): Promise<void> {
        if (!this.getAllowUnsupportedFormRefresh(context)) {
            this.log("unsupported form refresh skipped: flag disabled", {
                actionName
            });
            return;
        }

        const xrmPage = this.getXrmPage();

        if (!xrmPage?.data?.refresh) {
            this.log("unsupported form refresh skipped: Xrm.Page unavailable", {
                actionName
            });
            return;
        }

        try {
            const refreshResult = xrmPage.data.refresh(false);

            if (this.isPromiseLike(refreshResult)) {
                await refreshResult;
            }

            xrmPage.ui?.refreshRibbon?.(false);
            this.log("unsupported form refresh completed", {
                actionName
            });
        } catch (error) {
            this.log("unsupported form refresh failed", {
                actionName,
                error: (error as Error).message
            });
        }
    }

    private getXrmGlobal(): XrmGlobal | undefined {
        const currentWindowXrm = (window as Window & { Xrm?: XrmGlobal }).Xrm;

        if (currentWindowXrm) {
            return currentWindowXrm;
        }

        try {
            return window.parent && window.parent !== window
                ? (window.parent as Window & { Xrm?: XrmGlobal }).Xrm
                : undefined;
        } catch {
            return undefined;
        }
    }

    private getXrmPage(): XrmPage | undefined {
        const xrm = this.getXrmGlobal();

        if (xrm?.Page) {
            return xrm.Page;
        }

        try {
            return window.parent && window.parent !== window
                ? (window.parent as Window & { Xrm?: XrmGlobal }).Xrm?.Page
                : undefined;
        } catch {
            return undefined;
        }
    }

    private isPromiseLike(value: unknown): value is PromiseLike<void> {
        return typeof value === "object"
            && value !== null
            && typeof (value as { then?: unknown }).then === "function";
    }

    private readString(data: unknown, paths: string[]): string | undefined {
        for (const path of paths) {
            const value = this.readJsonPath(data, path);

            if (typeof value === "string" && value.trim()) {
                return value;
            }

            if (typeof value === "number" || typeof value === "boolean") {
                return String(value);
            }
        }

        return undefined;
    }

    private readOptionSetItem(data: unknown, paths: string[]): OptionSetItemViewModel | undefined {
        for (const path of paths) {
            const value = this.readJsonPath(data, path);
            const optionSetItem = this.normalizeOptionSetItem(value);

            if (optionSetItem) {
                return optionSetItem;
            }
        }

        return undefined;
    }

    private readOptionSetItemFromValueAndLabel(
        data: unknown,
        valuePath: string,
        labelPath: string
    ): OptionSetItemViewModel | undefined {
        const value = this.readNumber(data, [valuePath]);
        const label = this.readString(data, [labelPath]);

        if (value === undefined && !label) {
            return undefined;
        }

        return {
            label,
            value
        };
    }

    private readInvalidReason(data: unknown): OptionSetItemViewModel | undefined {
        const invalidReason = this.readOptionSetItemFromValueAndLabel(data, "InvalidReasonValue", "InvalidReason")
            ?? this.readOptionSetItemFromValueAndLabel(data, "invalidReasonValue", "invalidReason")
            ?? this.readOptionSetItemFromValueAndLabel(data, "InvalidReasonValue", "invalid_reason")
            ?? this.readOptionSetItem(data, [
                "invalidReason",
                "InvalidReason",
                "invalidReasonValue",
                "InvalidReasonValue",
                "invalid_reason",
                "Invalid_Reason"
            ]);

        if (!invalidReason) {
            return undefined;
        }

        if (invalidReason.value !== undefined) {
            return invalidReason;
        }

        const mappedValue = this.mapInvalidReasonLabelToValue(invalidReason.label);

        return mappedValue === undefined
            ? invalidReason
            : {
                ...invalidReason,
                value: mappedValue
            };
    }

    private mapInvalidReasonLabelToValue(label: string | undefined): number | undefined {
        if (!label) {
            return undefined;
        }

        return this.invalidReasonValues[this.normalizeLookupKey(label)];
    }

    private normalizeLookupKey(value: string): string {
        return value.toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    private normalizeOptionSetItem(value: unknown): OptionSetItemViewModel | undefined {
        if (typeof value === "number") {
            return { value };
        }

        if (typeof value === "string" && value.trim()) {
            const numericValue = Number(value);

            return Number.isNaN(numericValue)
                ? { label: value }
                : { value: numericValue };
        }

        if (!this.isRecord(value)) {
            return undefined;
        }

        const optionValue = this.readNumber(value, ["value", "Value"]);
        const optionLabel = this.readString(value, ["label", "Label", "name", "Name"]);

        if (optionValue === undefined && !optionLabel) {
            return undefined;
        }

        return {
            label: optionLabel,
            value: optionValue
        };
    }

    private formatOptionSetLabel(item: OptionSetItemViewModel | undefined): string | undefined {
        if (!item) {
            return undefined;
        }

        if (item.label) {
            return item.label;
        }

        if (item.value !== undefined) {
            return String(item.value);
        }

        return undefined;
    }

    private isAssessCaseDecision(suggestion: AdvisorSuggestionViewModel): boolean {
        if (suggestion.decisionByAI?.value === this.decisionAssessDisputeValue) {
            return true;
        }

        const decisionLabel = this.getDecisionLabel(suggestion);

        if (decisionLabel) {
            return decisionLabel.includes("assess");
        }

        return false;
    }

    private isInvalidValidation(suggestion: AdvisorSuggestionViewModel): boolean {
        const validationLabel = suggestion.validationByAI?.label?.toLowerCase();

        if (validationLabel) {
            return validationLabel.includes("invalid");
        }

        return suggestion.validationByAI?.value !== undefined && suggestion.validationByAI.value !== 1;
    }

    private isRouteToServiceProviderDecision(suggestion: AdvisorSuggestionViewModel): boolean {
        if (suggestion.decisionByAI?.value === this.decisionRouteToServiceProviderValue) {
            return true;
        }

        const decisionLabel = this.getDecisionLabel(suggestion);

        if (decisionLabel) {
            return decisionLabel.includes("route")
                && (decisionLabel.includes("service provider") || decisionLabel.includes("sp"));
        }

        return false;
    }

    private isRouteToDepartmentDecision(suggestion: AdvisorSuggestionViewModel): boolean {
        if (suggestion.decisionByAI?.value === this.decisionRouteToDepartmentValue) {
            return true;
        }

        const decisionLabel = this.getDecisionLabel(suggestion);

        return Boolean(decisionLabel?.includes("route") && decisionLabel.includes("department"));
    }

    private isEscalateToLeadDecision(suggestion: AdvisorSuggestionViewModel): boolean {
        if (suggestion.decisionByAI?.value === this.decisionEscalateToLeadValue) {
            return true;
        }

        const decisionLabel = this.getDecisionLabel(suggestion);

        return Boolean(decisionLabel?.includes("escalate") && decisionLabel.includes("lead"));
    }

    private getDecisionCommentOutputName(suggestion: AdvisorSuggestionViewModel): string | undefined {
        if (this.isAssessCaseDecision(suggestion)) {
            return "assessDisputeComment";
        }

        if (this.isRouteToServiceProviderDecision(suggestion)) {
            return "routeToServiceProviderComment";
        }

        if (this.isRouteToDepartmentDecision(suggestion)) {
            return "routeToDepartmentComment";
        }

        if (this.isEscalateToLeadDecision(suggestion)) {
            return "escalateToLeadComment";
        }

        return undefined;
    }

    private getDecisionLabel(suggestion: AdvisorSuggestionViewModel): string | undefined {
        return [
            suggestion.decisionByAI?.label,
            suggestion.suggestedDecision
        ].find((value) => Boolean(value))?.toLowerCase();
    }

    private readNumber(data: unknown, paths: string[]): number | undefined {
        for (const path of paths) {
            const value = this.readJsonPath(data, path);

            if (typeof value === "number") {
                return value;
            }

            if (typeof value === "string" && value.trim()) {
                const parsedValue = Number(value.replace("%", ""));

                if (!Number.isNaN(parsedValue)) {
                    return parsedValue;
                }
            }
        }

        return undefined;
    }

    private readBoolean(data: unknown, paths: string[]): boolean | undefined {
        for (const path of paths) {
            const value = this.readJsonPath(data, path);

            if (typeof value === "boolean") {
                return value;
            }

            if (typeof value === "string" && value.trim()) {
                if (value.toLowerCase() === "true") {
                    return true;
                }

                if (value.toLowerCase() === "false") {
                    return false;
                }
            }
        }

        return undefined;
    }

    private readJsonPath(data: unknown, path: string): unknown {
        if (!path) {
            return data;
        }

        return path
            .replace(/\[(\d+)\]/g, ".$1")
            .split(".")
            .filter(Boolean)
            .reduce<unknown>((current, segment) => {
                if (current === undefined || current === null) {
                    return undefined;
                }

                return (current as Record<string, unknown>)[segment];
            }, data);
    }

    private createRequestIdentifiers(): RequestIdentifiers {
        const identifiers = {
            apiRequestId: this.createGuid(),
            correlationId: this.createGuid()
        };

        this.log("request identifiers created", identifiers);
        return identifiers;
    }

    private createGuid(): string {
        if (window.crypto?.randomUUID) {
            return window.crypto.randomUUID();
        }

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
            const randomValue = Math.random() * 16 | 0;
            const value = character === "x" ? randomValue : (randomValue & 0x3) | 0x8;
            return value.toString(16);
        });
    }

    private setHeader(headers: Record<string, string>, name: string, value: string): void {
        const existingName = Object.keys(headers).find((headerName) => headerName.toLowerCase() === name.toLowerCase());

        if (existingName) {
            delete headers[existingName];
        }

        headers[name] = value;
    }

    private hasHeader(headers: Record<string, string>, name: string): boolean {
        return Object.keys(headers).some((headerName) => headerName.toLowerCase() === name.toLowerCase());
    }

    private cleanGuid(value: string): string {
        return value.replace(/[{}]/g, "");
    }

    private isRecord(value: unknown): value is Record<string, unknown> {
        return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }

    private isCurrentGeneration(generationId: number): boolean {
        return generationId === this.activeGenerationId;
    }

    private publishState(context: ComponentFramework.Context<IInputs>): void {
        this.notifyOutputChanged();
        this.updateView(context);
    }

    private setError(message: string, notify = true): void {
        this.log("error set", {
            message
        });
        this.errorMessage = message;
        this.statusText = message;

        if (notify) {
            this.notifyOutputChanged();
        }
    }

    private log(message: string, data?: unknown): void {
        if (!this.isDevelopmentMode) {
            return;
        }

        if (data === undefined) {
            console.log(`[ApiFieldMapper] ${message}`);
            return;
        }

        console.log(`[ApiFieldMapper] ${message}`, data);
    }
}
