import * as React from "react";

export interface LegalNoteViewModel {
  CategoryId?: string;
  Id?: string;
  Level1Id?: string;
  Level2Id?: string;
  Level3Id?: string;
  Level4Id?: string;
  LegalNoteCategory?: string;
  LegalNoteLevel1?: string;
  LegalNoteLevel2?: string;
  LegalNoteLevel3?: string;
  LegalNoteLevel4?: string;
  Number?: string;
  Name?: string;
  Title?: string;
  Text?: string;
  isActive?: boolean;
  ldv_RelatedCase?: string;
}

export interface OptionSetItemViewModel {
  label?: string;
  value?: number;
}

export interface AdvisorSuggestionViewModel {
  advisoryNote?: string;
  caseRequestId?: string;
  closedInFavorOf?: OptionSetItemViewModel;
  confidence?: number;
  confidenceLabel?: string;
  correlationId?: string;
  customerCallSuggestionInstructionsByAI?: string;
  decisionByAI?: OptionSetItemViewModel;
  feedbackByAI?: string;
  generatedOn?: string;
  invalidReason?: OptionSetItemViewModel;
  legalNotes: LegalNoteViewModel[];
  policyReference?: string;
  requestId?: string;
  reasoning?: string;
  responseMessage?: string;
  routeToSPReasons?: string;
  suggestedComment?: string;
  suggestedDecision?: string;
  validationByAI?: OptionSetItemViewModel;
}

interface AdvisorSections {
  advisoryNote: string;
  confidenceLabel: string;
  confidenceScore: string;
  customerCallSuggestionInstructions: string;
  invalidReason: string;
  policyReference: string;
  processingNotes: string;
  reasoning: string;
  routeToSPReasons: string;
  suggestedComment: string;
  suggestedDecision: string;
  validationByAI: string;
  closedInFavorOf: string;
}

export interface ApiFieldMapperViewProps {
  acceptedDecision?: string;
  acceptedResultText?: string;
  actionStatusLabel?: string;
  actionDisabledReason?: string;
  canReview: boolean;
  canTakeActions: boolean;
  displaySuggestion?: AdvisorSuggestionViewModel;
  endpointConfigured: boolean;
  errorMessage?: string;
  isDevelopment: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  pendingResultJson?: string;
  pendingResultText?: string;
  pendingSuggestion?: AdvisorSuggestionViewModel;
  sourceValue?: string;
  statusText?: string;
  onAccept: () => void;
  onModify: () => void;
  onGenerate: () => void;
  onReject: () => void;
}

interface ApiFieldMapperViewState {
  isStatusVisible: boolean;
}

const statusVisibleMs = 8000;

export class ApiFieldMapperView extends React.Component<ApiFieldMapperViewProps, ApiFieldMapperViewState> {
  private statusTimer?: number;

  public constructor(props: ApiFieldMapperViewProps) {
    super(props);
    this.state = { isStatusVisible: true };
  }

  public componentDidMount(): void {
    this.scheduleStatusHide();
  }

  public componentDidUpdate(previousProps: ApiFieldMapperViewProps): void {
    const previousStatus = previousProps.errorMessage ?? previousProps.statusText ?? "Ready";
    const currentStatus = this.props.errorMessage ?? this.props.statusText ?? "Ready";

    if (
      previousStatus !== currentStatus
      || previousProps.isLoading !== this.props.isLoading
      || previousProps.isDisabled !== this.props.isDisabled
    ) {
      this.setState({ isStatusVisible: true }, () => this.scheduleStatusHide());
    }
  }

  public componentWillUnmount(): void {
    this.clearStatusTimer();
  }

  public render(): React.ReactNode {
    const status = this.props.errorMessage ?? this.props.statusText ?? "Ready";
    const hasAcceptedResult = [this.props.acceptedResultText, this.props.acceptedDecision]
      .some((value) => Boolean(value));
    const displaySuggestion = this.getDisplaySuggestion();
    const advisor = this.getAdvisorSections();
    const badge = this.getBadgeState();
    const shouldShowStatus = this.props.isLoading || this.state.isStatusVisible;
    const actionDisabledReason = this.props.canTakeActions ? undefined : this.props.actionDisabledReason;
    const isActionBlocked = Boolean(actionDisabledReason);
    const isAcceptBlockedByAssessDispute = this.isAssessDisputeSuggestion(this.props.pendingSuggestion);
    const acceptDisabledReason = isAcceptBlockedByAssessDispute
      ? "You need to fill the Customer Satisfaction"
      : actionDisabledReason;

    return (
      <div className="ai-advisor">
        <div className="ai-advisor__header">
          <div className="ai-advisor__title">
            <span className="ai-advisor__title-icon">AI</span>
            <span className="ai-advisor__heading">
              AI Advisor Head
            </span>
          </div>
          <div className="ai-advisor__status">
            <span className={`ai-advisor__badge ai-advisor__badge--${badge.kind}`}>
              {badge.icon === "generate" ? <span className="ai-advisor__badge-dot" /> : <BadgeIcon kind={badge.icon} />}
              <span>{badge.label}</span>
            </span>
            <span className="ai-advisor__info-icon">i</span>
          </div>
        </div>

        {this.props.errorMessage ? <div className="ai-advisor__error">{this.props.errorMessage}</div> : null}

        <section className="ai-advisor__section">
          <div className="ai-advisor__section-title">
            <span className="ai-advisor__section-icon">R</span>
            AI Recommendation
          </div>
          <div className="ai-advisor__rows">
            <div className="ai-advisor__recommendation-grid">
              <div className="ai-advisor__row ai-advisor__row--compact">
                <span className="ai-advisor__label">Decision by AI:</span>
                <span className="ai-advisor__value">{advisor.suggestedDecision}</span>
              </div>
              <div className="ai-advisor__row ai-advisor__row--compact">
                <span className="ai-advisor__label">Validation by AI:</span>
                <span className="ai-advisor__value">{advisor.validationByAI}</span>
              </div>
              <div className="ai-advisor__row ai-advisor__row--compact">
                <span className="ai-advisor__label">Closed In Favor Of:</span>
                <span className="ai-advisor__value">{advisor.closedInFavorOf}</span>
              </div>
              <div className="ai-advisor__row ai-advisor__row--compact">
                <span className="ai-advisor__label">Invalid Reason by AI:</span>
                <span className="ai-advisor__value">{advisor.invalidReason}</span>
              </div>
            </div>
            <div className="ai-advisor__row ai-advisor__row--full">
              <span className="ai-advisor__label">Feedback by AI:</span>
              <span className="ai-advisor__value">{advisor.suggestedComment}</span>
            </div>
            {advisor.routeToSPReasons ? (
              <div className="ai-advisor__row ai-advisor__row--full">
                <span className="ai-advisor__label">Route to SP Reasons:</span>
                <span className="ai-advisor__value">{advisor.routeToSPReasons}</span>
              </div>
            ) : null}
          </div>
        </section>

        {advisor.customerCallSuggestionInstructions ? (
          <section className="ai-advisor__section">
            <div className="ai-advisor__section-title">
              <span className="ai-advisor__section-icon">Q</span>
              Customer Call Instructions
            </div>
            <div className="ai-advisor__body">{advisor.customerCallSuggestionInstructions}</div>
          </section>
        ) : null}

        {advisor.processingNotes ? (
          <section className="ai-advisor__section">
            <div className="ai-advisor__section-title">
              <span className="ai-advisor__section-icon">V</span>
              Processing Notes
            </div>
            <div className="ai-advisor__body">{advisor.processingNotes}</div>
          </section>
        ) : null}

        <section className="ai-advisor__section">
          <div className="ai-advisor__section-title">
            <span className="ai-advisor__section-icon">L</span>
            Legal Notes
          </div>
          {this.renderLegalNotes(displaySuggestion?.legalNotes)}
        </section>

        {advisor.policyReference ? (
          <section className="ai-advisor__section">
            <div className="ai-advisor__section-title">
              <span className="ai-advisor__section-icon">P</span>
              Policy Reference
            </div>
            <div className="ai-advisor__body">{advisor.policyReference}</div>
          </section>
        ) : null}

        <div className="ai-advisor__footer">
          <div className="ai-advisor__metric">
            <div className="ai-advisor__metric-header">
              <span className="ai-advisor__metric-icon">%</span>
              Confidence
            </div>
            <div className="ai-advisor__body">
              {advisor.confidenceLabel}
              <br />
              {advisor.confidenceScore}
            </div>
          </div>
          <div className="ai-advisor__metric">
            <div className="ai-advisor__metric-header">
              <span className="ai-advisor__metric-icon">i</span>
              Advisory Note
            </div>
            <div className="ai-advisor__body">{advisor.advisoryNote}</div>
          </div>
        </div>

        <div className="ai-advisor__actions">
          <div className="ai-advisor__button-row">
            <span className="ai-advisor__button-shell" data-tooltip={actionDisabledReason}>
              <button
                type="button"
                className="ai-advisor__button ai-advisor__button--generate"
                disabled={this.props.isDisabled || isActionBlocked || !this.props.endpointConfigured || this.props.isLoading}
                onClick={this.props.onGenerate}
              >
                <FluentIconBox kind="generate" />
                <span>Generate</span>
              </button>
            </span>
            <span className="ai-advisor__button-shell" data-tooltip={acceptDisabledReason}>
              <button
                type="button"
                className={`ai-advisor__button ai-advisor__button--accept${isAcceptBlockedByAssessDispute ? " ai-advisor__button--dimmed" : ""}`}
                disabled={
                  this.props.isDisabled
                  || isActionBlocked
                  || !this.props.canReview
                  || this.props.isLoading
                  || isAcceptBlockedByAssessDispute
                }
                onClick={this.props.onAccept}
              >
                <FluentIconBox kind="accept" />
                <span>Accept</span>
              </button>
            </span>
            <span className="ai-advisor__button-shell" data-tooltip={actionDisabledReason}>
              <button
                type="button"
                className="ai-advisor__button ai-advisor__button--reject"
                disabled={this.props.isDisabled || isActionBlocked || !this.props.canReview || this.props.isLoading}
                onClick={this.props.onReject}
              >
                <FluentIconBox kind="reject" />
                <span>Reject</span>
              </button>
            </span>
            <span className="ai-advisor__button-shell" data-tooltip={actionDisabledReason}>
              <button
                type="button"
                className="ai-advisor__button ai-advisor__button--modify"
                disabled={this.props.isDisabled || isActionBlocked || !this.props.canReview || this.props.isLoading}
                onClick={this.props.onModify}
              >
                <FluentIconBox kind="modify" />
                <span>Modify</span>
              </button>
            </span>
          </div>
          {shouldShowStatus ? (
            <span className="ai-advisor__action-status">
              {this.props.isLoading ? <span className="ai-advisor__spinner" aria-hidden="true" /> : null}
              <span>{status}</span>
            </span>
          ) : null}
        </div>

        {hasAcceptedResult && this.props.isDevelopment  ? (
          <span className="ai-advisor__accepted">
            Current values: {this.formatAcceptedSummary()}
          </span>
        ) : null}

        {this.props.isDevelopment && this.props.pendingResultJson ? (
          <pre className="ai-advisor__raw">{this.props.pendingResultJson}</pre>
        ) : null}
      </div>
    );
  }

  private clearStatusTimer(): void {
    if (this.statusTimer !== undefined) {
      window.clearTimeout(this.statusTimer);
      this.statusTimer = undefined;
    }
  }

  private scheduleStatusHide(): void {
    this.clearStatusTimer();

    if (this.props.isLoading) {
      return;
    }

    this.statusTimer = window.setTimeout(() => {
      this.setState({ isStatusVisible: false });
    }, statusVisibleMs);
  }

  private getAdvisorSections(): AdvisorSections {
    const suggestion = this.getDisplaySuggestion();
    const confidence = suggestion?.confidence;
    const feedback = suggestion?.feedbackByAI
      ?? suggestion?.suggestedComment
      ?? this.props.pendingResultText
      ?? "Generate a response to preview the AI feedback here.";
    const decisionByAI = this.formatOptionSetItem(suggestion?.decisionByAI)
      ?? suggestion?.suggestedDecision
      ?? "Pending decision";

    return {
      advisoryNote: suggestion?.advisoryNote
        ?? "AI output is advisory only. The final decision remains with the assigned employee.",
      closedInFavorOf: this.formatOptionSetItem(suggestion?.closedInFavorOf) ?? "--",
      confidenceLabel: suggestion?.confidenceLabel ?? this.mapConfidenceLabel(confidence),
      confidenceScore: this.formatConfidence(confidence),
      customerCallSuggestionInstructions: suggestion?.customerCallSuggestionInstructionsByAI?.trim() ?? "",
      invalidReason: this.formatOptionSetItem(suggestion?.invalidReason) ?? "--",
      policyReference: suggestion?.policyReference ?? "",
      processingNotes: this.formatProcessingNotes(suggestion),
      reasoning: suggestion?.reasoning
        ?? feedback,
      routeToSPReasons: this.shouldShowRouteToSPReasons(suggestion)
        ? suggestion?.routeToSPReasons?.trim() ?? ""
        : "",
      suggestedComment: feedback,
      suggestedDecision: decisionByAI,
      validationByAI: this.formatOptionSetItem(suggestion?.validationByAI) ?? "--"
    };
  }

  private getBadgeState(): {
    icon: BadgeIconKind;
    kind: "danger" | "neutral" | "success" | "warning";
    label: string;
  } {
    if (this.props.errorMessage) {
      return {
        icon: "error",
        kind: "danger",
        label: "AI Failed"
      };
    }

    if (this.props.isDisabled) {
      return {
        icon: "disabled",
        kind: "neutral",
        label: "Disabled"
      };
    }

    if (this.props.isLoading) {
      return {
        icon: "generate",
        kind: "warning",
        label: "Generating"
      };
    }

    if (this.props.canReview) {
      return {
        icon: "completed",
        kind: "success",
        label: "AI Completed"
      };
    }

    const actionStatus = this.getActionBadgeState();

    if (actionStatus) {
      return actionStatus;
    }

    return {
      icon: "ready",
      kind: "neutral",
      label: "Ready"
    };
  }

  private getActionBadgeState(): {
    icon: BadgeIconKind;
    kind: "danger" | "neutral" | "success" | "warning";
    label: string;
  } | undefined {
    const label = this.props.actionStatusLabel?.trim();

    if (!label) {
      return undefined;
    }

    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel === "accepted") {
      return {
        icon: "accept",
        kind: "success",
        label: "Accepted"
      };
    }

    if (normalizedLabel === "rejected") {
      return {
        icon: "reject",
        kind: "danger",
        label: "Rejected"
      };
    }

    if (normalizedLabel === "modified") {
      return {
        icon: "modify",
        kind: "warning",
        label: "Modified"
      };
    }

    return {
      icon: "ready",
      kind: "neutral",
      label
    };
  }

  private getDisplaySuggestion(): AdvisorSuggestionViewModel | undefined {
    return this.props.pendingSuggestion ?? this.props.displaySuggestion;
  }

  private formatOptionSetItem(item: OptionSetItemViewModel | undefined): string | undefined {
    if (!item) {
      return undefined;
    }

    if (item.label && item.value !== undefined) {
      return this.props.isDevelopment ? `${item.label} (${item.value})` : item.label;
    }

    if (item.label) {
      return item.label;
    }

    if (item.value !== undefined) {
      return this.props.isDevelopment ? String(item.value) : undefined;
    }

    return undefined;
  }

  private formatProcessingNotes(suggestion: AdvisorSuggestionViewModel | undefined): string {
    if (!suggestion) {
      return "";
    }

    return [
      suggestion.invalidReason ? `Invalid Reason: ${this.formatOptionSetItem(suggestion.invalidReason)}` : undefined
    ].filter(Boolean).join("\n");
  }

  private shouldShowRouteToSPReasons(suggestion: AdvisorSuggestionViewModel | undefined): boolean {
    if (!suggestion?.routeToSPReasons?.trim()) {
      return false;
    }

    if (suggestion.decisionByAI?.value === 1) {
      return true;
    }

    const decisionText = [
      suggestion.decisionByAI?.label,
      suggestion.suggestedDecision
    ]
      .filter((value): value is string => Boolean(value))
      .join(" ")
      .toLowerCase();

    return decisionText.includes("route to service provider")
      || decisionText.includes("route to sp");
  }

  private isAssessDisputeSuggestion(suggestion: AdvisorSuggestionViewModel | undefined): boolean {
    if (suggestion?.decisionByAI?.value === 3) {
      return true;
    }

    const decisionText = [
      suggestion?.decisionByAI?.label,
      suggestion?.suggestedDecision
    ]
      .filter((value): value is string => Boolean(value))
      .join(" ")
      .toLowerCase();

    return decisionText.includes("assess dispute")
      || decisionText.includes("assess case");
  }

  private formatAcceptedSummary(): string {
    const values = [
      this.props.acceptedDecision ? `Decision: ${this.props.acceptedDecision}` : undefined,
      this.props.acceptedResultText ? `Comment: ${this.props.acceptedResultText}` : undefined
    ].filter(Boolean);

    return values.join(" | ");
  }

  private renderLegalNotes(legalNotes: LegalNoteViewModel[] | undefined): React.ReactNode {
    if (!legalNotes || legalNotes.length === 0) {
      const message = this.getDisplaySuggestion()
        ? "No legal notes were returned for this suggestion."
        : "Legal notes will appear here after the AI returns a response.";

      return <div className="ai-advisor__body">{message}</div>;
    }

    return (
      <div className="ai-advisor__legal-note-grid">
        {legalNotes.map((note, index) => this.renderLegalNoteCard(note, index))}
      </div>
    );
  }

  private renderLegalNoteCard(note: LegalNoteViewModel, index: number): React.ReactNode {
    const title = [note.Title, note.Name, note.Number,`Legal Note ${index + 1}`]
      .find((value) => Boolean(value)) ?? `Legal Note ${index + 1}`;
    const metaItems = [
      note.LegalNoteCategory,
      note.LegalNoteLevel1 ? `Level 1: ${note.LegalNoteLevel1}` : undefined,
      note.LegalNoteLevel2 ? `Level 2: ${note.LegalNoteLevel2}` : undefined,
      note.LegalNoteLevel3 ? `Level 3: ${note.LegalNoteLevel3}` : undefined,
      note.LegalNoteLevel4 ? `Level 4: ${note.LegalNoteLevel4}` : undefined
    ].filter((item): item is string => Boolean(item));

    return (
      <article className="ai-advisor__legal-note-card" key={note.Id ?? `legal-note-${index}`}>
        <div className="ai-advisor__legal-note-card-header">
          <span className="ai-advisor__legal-note-title">{title}</span>
          {note.isActive !== undefined ? (
            <span className={`ai-advisor__legal-note-status ${note.isActive ? "is-active" : "is-inactive"}`}>
              {note.isActive ? "Active" : "Inactive"}
            </span>
          ) : null}
        </div>

        {metaItems.length > 0 ? (
          <div className="ai-advisor__legal-note-meta">
            {metaItems.map((item) => (
              <span className="ai-advisor__legal-note-chip" key={item}>{item}</span>
            ))}
          </div>
        ) : null}

        {/* {note.Id ? <div className="ai-advisor__legal-note-id">{note.Id}</div> : null} */}
        {note.Text ? <div className="ai-advisor__legal-note-text">{note.Text}</div> : null}
      </article>
    );
  }

  private formatConfidence(value: number | undefined): string {
    if (value === undefined) {
      return "--";
    }

    const normalizedValue = value > 0 && value <= 1 ? value * 100 : value;
    return `${Math.round(normalizedValue)}%`;
  }

  private mapConfidenceLabel(value: number | undefined): string {
    if (value === undefined) {
      return "Pending";
    }

    const normalizedValue = value > 0 && value <= 1 ? value * 100 : value;

    if (normalizedValue >= 80) {
      return "High";
    }

    if (normalizedValue >= 55) {
      return "Medium";
    }

    return "Low";
  }
}

type FluentIconKind = "accept" | "modify" | "generate" | "reject";
type BadgeIconKind = FluentIconKind | "completed" | "disabled" | "error" | "ready";

interface FluentIconBoxProps {
  kind: FluentIconKind;
}

const fluentIconPaths: Record<FluentIconKind, string> = {
  accept: "M3.37 10.17a.5.5 0 0 0-.74.66l4 4.5c.19.22.52.23.72.02l10.5-10.5a.5.5 0 0 0-.7-.7L7.02 14.27l-3.65-4.1Z",
  modify: "M17.18 2.93a2.97 2.97 0 0 0-4.26-.06l-9.37 9.38c-.33.33-.56.74-.66 1.2l-.88 3.94a.5.5 0 0 0 .6.6l3.93-.87c.46-.1.9-.34 1.23-.68l9.36-9.36a2.97 2.97 0 0 0 .05-4.15Zm-3.55.65a1.97 1.97 0 1 1 2.8 2.8l-.68.66-2.8-2.79.68-.67Zm-1.38 1.38 2.8 2.8-7.99 7.97c-.2.2-.46.35-.74.41l-3.16.7.7-3.18c.07-.27.2-.51.4-.7l8-8Z",
  generate: "M4 10a6 6 0 0 1 10.47-4H12.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v1.6a7 7 0 1 0 1.98 4.36.5.5 0 1 0-1 .08L16 10a6 6 0 0 1-12 0Z",
  reject: "m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
};

const badgeIconPaths: Record<BadgeIconKind, string> = {
  ...fluentIconPaths,
  completed: fluentIconPaths.accept,
  disabled: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-5.1 4.2a7 7 0 0 0 8.9 8.9L4.9 6.2Zm10.2 7.6a7 7 0 0 0-8.9-8.9l8.9 8.9Z",
  error: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-.5 4.5v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-1 0Zm.5 7.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  ready: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 1a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-.5 3.5a.5.5 0 0 1 1 0V10c0 .13-.05.26-.15.35l-2 2a.5.5 0 0 1-.7-.7L9.5 9.79V6.5Z"
};

function BadgeIcon(props: { kind: BadgeIconKind }): React.ReactElement {
  return (
    <span className="ai-advisor__badge-icon" aria-hidden="true">
      <svg focusable="false" viewBox="0 0 20 20">
        <path d={badgeIconPaths[props.kind]} />
      </svg>
    </span>
  );
}

function FluentIconBox(props: FluentIconBoxProps): React.ReactElement {
  return (
    <span className="ai-advisor__button-icon" aria-hidden="true">
      <svg focusable="false" viewBox="0 0 20 20">
        <path d={fluentIconPaths[props.kind]} />
      </svg>
    </span>
  );
}
