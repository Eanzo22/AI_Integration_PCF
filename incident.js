// JavaScript source code
/// <reference path="ldv_Common.js" />
//TODO: Bishoy123
//debugger;
/// <reference path="ldv_CallAction" />


var requestStatus = {
    draft: 1,
    Resolved: 2,
    underProcessing: 3,
    pendingOnApplicant: 5,
    closed: 6,
    rejected: 7,
    pendingOnRepresentative: 8,
    PendingOnCSR: 18,
    PendingonRelevantDepartment: 19,
    PendingonSuggestionsCommitteeDecision: 23,
    PendingonSuggestionCommitteeFeedback: 24,
    PendingonRelevantDepartmentFinalFeedback: 25,
    PendingonSuggestionCommitteeFeedbackonExtension: 26,
    PendingOnCustomerCare: 31,
    PendingOnTDA: 32,
    PendingOnServiceProvider: 33,
    PendingOnServiceProviderLead: 59,
    PendingOnCATFinalFeedback: 34,
    PendingOnCustomerCareFinalFeedback: 35,
    PendingOnCATFeedbackReview: 36,
    PendingOnTDAtoReviewServiceProviderFeedback: 37,
    ReOpened: 38,
    onHold: 753240002,
    SenttoIVR: 300,
    PendingITScreeningReview: 104,
    PendingITSupportTeamReview: 105,
    PendingITScreeningReviewNeedClarification: 106,
    PendingITScreeningReviewOutofScope: 107,
    PendingITScreeningFinalReview_forApproving: 108,
    PendingITScreeningFinalReview_forRejection: 113,
    IrrelevanttoBusinessTeam: 109,
    ApprovedbyBusinessTeam: 110,
    PendingCustomerSatisfactionSurvey_forApproving: 111,
    PendingCustomerSatisfactionSurvey_forRejection: 114
}

var requestType = {
    inquiry: 1,
    suggestion: 2,
    ComplaintAgainstTRA: 3,
    DisputeWithServiceProvider: 4,
    ComplaintAgainstServiceProvider: 5,
    SMSSpam: 6,
    ServiceProviderComplaint: 7,
    TechnicalSupportComplaint: 8,
    ReportFraudNumbers: 9
}

var complaintType = {
    ComplainAboutService: 1,
    ComplainAboutEmployee: 2,
    Others: 3,
    ComplaintAboutServiceChannel: 4,
    ComplaintAboutIntiative: 5
}

var inquiryType = {
    InquiryAboutService: 1,
    InquiryAboutRequest: 2,
    GeneralInquiry: 3,
    InquiryAboutIntiative: 4
}

var suggestionType = {
    SuggestionRelatedtoService: 1,
    SuggestionRelatedtoServiceChannels: 2,
    OtherSuggestions: 3
}

var complaintDecision = {
    RouteteDepartment: 1,
    assessComplaint: 2,
    SetOnHold: 4,
    RouteToIVR: 5,
}

var inquiryDecision = {
    AddFeedback: 1,
    RouteteDepartment: 2,
    SendBack: 3
}

var suggestionInitialDecision = {
    sendBack: 1,
    assessSuggestion: 2
}

var suggestionDecision = {
    approve: 1,
    sendBack: 2
}

var suggestionExtensionDecision = {
    approve: 1,
    reject: 2
}

var suggestionCategory = {
    Valid_Tangible: 1,
    Valid_Intangible: 2,
    InvalidSuggestion: 3,
    WithinTRAPlan: 4,
    OutTRAScope: 5,
    ImplementedSuggestion: 6,
    RepeatedSuggestion: 7,
    UnderStudy: 8
}

var deptInitialDecision = {
    TobeImplemented: 1,
    NotFeasible: 2
}

var deptFinalAction = {
    SubmitFeedback: 1,
    RequestforExtension: 2
}

var CSRDecision = {
    RouteToServiceProvider: 1,
    RouteToDepartment: 2,
    assessDispute: 3,
    SetOnHold: 4,
    RouteToIVR: 5,
    Escalatetolead: 6,
}

var SatisfactionDecision = {
    Satisfied: 1,
    NotSatisfied: 2

}

var SMSServiceProviderDecision = {
    RouteTotheOtherServiceProvider: 1
}

var aiRequestType = {
    Suggestion: 2,
    Complain: 3
}



// Technical Support Models
var ServiceTypes = {
    Initiatives: 1,
    Services: 2,
    Other: 3
}
var initialScreeningReviewDecision = {
    Sendback: 1,
    AssignTeam: 2
}
var iTSupportDecision = {
    Solve: 1,
    NeedClarification: 2,
    OutofScope: 3,
    NeedBusinessApproval: 4
}
var businssTeamDecision = {
    Reject: 1,
    Sendback: 2,
    Irrelevant: 3,
    Approved: 4
}
var iTScreeningFinalReviewDecision = {
    Close: 1,
    AssigntoTeam: 2
}


// Case - New CRS
var ValidType = {
    Valid: 1,
    NotValid: 2
}

var InvalidReasons = {
    Wrong_Feedback: 1,
    Missing_Details: 2,
    Missing_Docs: 3,
    Feedback_not_clear: 4,
    Extra_Info_required: 5,
    Final_Billing_Approval: 6,
    No_Issue_from_SP_Side: 7,
    Consumer_Behavior: 8,
    Process_and_Policies: 9,
    TDRA_related: 10
}
var fields = {
    origin: 'caseorigincode',
    requestStatus: 'statuscode',
    SubmitRequest: 'ldv_submitrequest',
    internalStatus: 'ldv_servicestatus',
    requestType: 'ldv_requesttype',
    complaintType: 'ldv_complainttype',
    inquiryType: 'ldv_inquirytype',
    suggestionType: 'ldv_suggestiontype',
    AddAdditionalContactDetails: 'ldv_addadditionalcontactdetails',
    AdditionalEmail: 'ldv_additionalemail',
    AdditionalMobile: 'ldv_additionalmobilenumber',
    EmployeeDept: 'ldv_employeedepartment',
    OthersEmployeeDept: 'ldv_othersemployeedepartment',
    OthersDisputeService: 'ldv_othersdisputeservicecategory',
    serviceCategory: 'ldv_servicecategory',
    service: 'ldv_service',
    department: 'ldv_department',
    department2: 'ldv_seconddepartment',
    department3: 'ldv_thirddepartment',
    CSRDecision: 'ldv_csrdecision',
    inquiryCSRDecision: 'ldv_csrinquirydecision',
    CSRReason: 'ldv_csrreason',
    CSRFeedback: 'ldv_csrfeedback',
    DRDecision: 'ldv_departmentrepdecision',
    DRReason: 'ldv_departmentrepreason',
    DRFeedback: 'ldv_departmentrepfeedback',
    SCInitDecision: 'ldv_suggestioncommitteeinitialdecision',
    SCDecision: 'ldv_suggestioncommitteedecision',
    IsSendBack: 'ldv_issendback',
    SCDecisionOnExtension: 'ldv_suggestioncommitteeextensiondecision',
    SCReason: 'ldv_suggestioncommitteereason',
    SuggestionCategory: 'ldv_suggestioncategory',
    DRInitialDecision: 'ldv_departmentinitialdecision',
    DRFinalAction: 'ldv_departmentfinalaction',
    DateofImplementation: 'ldv_dateofimplementation',
    NewDateofImplementation: 'ldv_newdateofimplementation',
    ActionPlan: 'ldv_actionplan',
    SCReasonOnPlan: 'ldv_suggestioncommitteereasononplan',
    SCReasonOnExtension: 'ldv_suggestioncommitteereasononextension',
    DoYouHaveReferenceNumber: 'ldv_doyouhaveareferencenumber',
    DidYouSubmitComplaint: 'ldv_didyousubmitacomplainttotheserviceprovide',
    RefernceNumber: 'ldv_referencenumber',
    RefernceNumberOptions: 'ldv_referencenumberoptions',
    CSRDisputeDecision: 'ldv_csrdisputedecision',
    CATDecision: 'ldv_catdecision',
    CATResponse: 'ldv_catresponse',
    TDAFeedback: 'ldv_tdafeedback',
    TDADecision: 'ldv_tdadecision',
    TDAResponse: 'ldv_tdaresponse',
    ServiceProviderOutcome: 'ldv_spfeedback',
    CSRFinalDecision: 'ldv_csrfinaldecision',
    DisputeServiceCategory: 'ldv_disputeservicecategory',
    DisputeSubServiceCategory: 'ldv_disputesubservicecategory',
    DisputeSubServiceCategoryClassification: 'ldv_disputesubservicecategoryclassification',
    ComplaintCategory: 'ldv_complaintcategory',
    ServiceProvider: 'ldv_serviceprovider',
    ReOpenCount: 'ldv_reopencount',
    ReOpenRequest: 'ldv_reopenrequest',
    ReOpenComment: 'ldv_reopencomment',
    ReOpenFeedback: 'ldv_reopenfeedback',
    EntityName: 'ldv_organization',
    Contact: 'customerid',
    ldv_Services: 'ldv_services',
    CopiedTo: 'ldv_copiedto',
    CustomerSatisfactionSurvey: 'ldv_customersatisfactionsurvey',
    CustomerSatisfactionComment: 'ldv_customersatisfactioncomment',
    CustomerValidArgument: 'ldv_customerhasavalidargument',
    IsResolvedByDepartment: 'ldv_isresolvedbydepartment',
    AgentComment: 'ldv_agentcomment',
    SMSServiceProviderDecision: 'ldv_smsserviceproviderdecision',
    SMSReferenceNumber: 'ldv_smscasereferencenumber',
    IsResolvedByServiceProvider: 'ldv_isresolvedbyserviceprovider',
    ServiceProviderSalesId: 'ldv_serviceprovidersalesid',
    priority: 'prioritycode',
    ReturnDate: 'ldv_returndate',
    OnHoldStatus: 'ldv_onholdstatus',
    SetOnHold: 'ldv_setonhold',
    IVRIntegrationMessage: 'ldv_ivrintegrationmessage',
    IVRMessage: 'ldv_ivrmessage',
    ShowIVRMessage: 'ldv_isivrmessagevisibile',
    LastCallStatus: 'ldv_lastcallstatus',
    //on hold reason
    OnHoldReason: "ldv_onholdreasonid",
    OnHoldReasonHeader: "header_process_ldv_onholdreasonid",
    OnHoldOtherReason: "ldv_otherreason",
    OnHoldOtherReasonHeader: "header_process_ldv_otherreason",
    ClosedInFavorOf: "ldv_closedinfavorof",
    ClosedInFavorOfHeader: "header_process_ldv_closedinfavorof",
    AiRequestType: "ldv_airequesttype",
    RoutetoSpReasons: "header_process_ldv_routetospreasons",
    Invalid: "header_process_ldv_invalid",
    InvalidReasons: "header_process_ldv_invalidreasons",
    AIProposedDecision: "header_process_ldv_aiproposeddecision",
    //TechnicalSupport
    BusinessTeam: "ldv_businessteam",
    BusinessTeamFeedback: "ldv_businessteamfeedback",
    BusinessTeamReviewDecision: 'ldv_businessteamreviewdecision',
    CustomerSatisfactionSurveyLink: 'ldv_customersatisfactionsurveylink',
    FinalFeedback: 'ldv_finalfeedback',
    Initiatives: 'ldv_initiatives',
    ITInitialReviewDecision: 'ldv_itinitialreviewdecision',
    ITScreeningFeedback: 'ldv_itscreeningfeedback',
    ITSupportDecision: 'ldv_itsupportdecision',
    ITSupportFeedback: 'ldv_itsupportfeedback',
    ITSupportTeam: 'ldv_itsupportteam',
    OtherServiceType: 'ldv_otherservicetype',
    RequestReferenceNumber: 'ldv_requestreferencenumber',
    ScreeningFinalReviewDecision: 'ldv_screeningfinalreviewdecision',
    ServiceType: 'ldv_servicetype',
    // Case - New CRS 
    SenderID: 'ldv_sender',
    SpecifyNumber: 'ldv_pleasespecifyyournumber',
    CancellationReasons: 'ldv_ctrcancellationreasons',
    Valid: 'ldv_valid'

}
var caseChanal = {
    Media: '{32F8D8A8-7717-E611-8116-000D3A203DB9}'
}

var CaseBPF = {
    InquiriesComplaintsandSuggestions: 'C726BBBF-9BD5-4675-82E4-1154B7AC92BB',
    SmsSpam: 'CC1B02E0-891A-4452-8581-2E4C26183CD6',
    RollbackCase: '708BE91B-8B7A-493E-8C2B-B48FC2CB5E03',
    DisputewithServiceProvider: /*'3aca588f-00d6-4f24-9525-5c9f89cc7d7b'*/'C7BFAC2F-19D8-40FD-AFBB-E0BCAFA3B206',
    serviceprovidercomplaint: 'F1DA492B-1D8C-4B03-97BF-B336D78E3707',
    TechnicalSupportRequest: '66B5C021-1B93-487A-AAF1-044ED86EF1EE',
    ReportFraudNumbers: '952C972E-2CA2-43EC-AE61-737CA70E4FFB'

}

var newrequestType = {
    inquiry: 1,
    suggestion: 2,
    ComplaintAgainstTRA: 3,
    DisputeWithServiceProvider: 4
}


function ShowChildCase_Subgrid(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var isparent = false;
    if (formContext.getAttribute("ldv_isparent") != null && formContext.getAttribute("ldv_isparent").getValue() != null)
        isparent = formContext.getAttribute("ldv_isparent").getValue();
    if (isparent == true) {
        var mySection = formContext.ui.tabs.get("General").sections.get("childCase");
        mySection.setVisible(true);
    }
    else {
        //check if the case is parent for another case
        //var recordId = formContext.data.entity.getId().replace("{", "").replace("}", "");
        //var query = "/incidents?$filter=(_ldv_copiedfrom_value eq '"+recordId+"')";
        //var requestResults = fetchQuerySync(null, query);
        //if (requestResults != null && requestResults.value != null && requestResults.value.length > 0) {
        //    var mySection = formContext.ui.tabs.get("General").sections.get("childCase");
        //    mySection.setVisible(true);
        //}
        //else{
        var myTab = formContext.ui.tabs.get("General");
        var mySection = myTab.sections.get("childCase");
        mySection.setVisible(false);
        //}
    }
}
//----------------------------- Form Events --------------------------------
function Form_OnLoad(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var RequestType = formContext.getAttribute(fields.requestType);

    //LoadCssPath(ExecutionContext);
    //HideCreateBPCssPath(ExecutionContext);
    showHideBusinessProcessFlowByFormType(ExecutionContext);
    //Child_Onload(ExecutionContext);
    UnlockClassification(ExecutionContext);
    handleServiceCategory(ExecutionContext);
    //debugger;
    ShowChildCase_Subgrid(ExecutionContext)
    //var isparent = false;
    //if (formContext.getAttribute("ldv_isparent") != null && formContext.getAttribute("ldv_isparent").getValue() != null)
    //    isparent = formContext.getAttribute("ldv_isparent").getValue();
    //if (isparent == true) {
    //    var mySection = formContext.ui.tabs.get("General").sections.get("childCase");
    //    mySection.setVisible(true);
    //}
    //else {
    //   var myTab = formContext.ui.tabs.get("General");
    //    var mySection = myTab.sections.get("childCase");
    //    mySection.setVisible(false);
    //}

    //setTimeout(function () {
    // Need update : Show only Contacts
    //var customerInput = SearchForElementByDom(document, "customerid_i");
    //if (customerInput != null) {
    //    customerInput.setAttribute("lookuptypes", "2");
    //    customerInput.setAttribute("defaulttype", 2);
    //    customerInput.setAttribute("createpermissiondictionary", "account:false,contact:true");
    //    customerInput.setAttribute("lookuptypenames", "contact:2:Contact");
    //    customerInput.setAttribute("disableViewPicker", "1");
    //}
    //}, 500);

    // filter Customer lookup to show contacts only 

    var customer = formContext.getControl("customerid");
    customer.setEntityTypes(["contact"]);



    //CorporateAccountpreFilterLookup();

    RequestType_OnChange(ExecutionContext);
    EmployeeDept_OnChange(ExecutionContext);
    DisputeServiceCategory_OnChange(ExecutionContext);
    AddAdditionalContactDetails_OnChange(ExecutionContext);
    //RequestStatus_OnChange();
    //debugger;
    PreFilter_DisputeSubServiceCategoryClassification_Lookup(ExecutionContext);
    //PreFilter_DisputeSubServiceCategory_Lookup();
    //stage_change(ExecutionContext);
    //Disable_InactiveBPFStages(BPFCallback);
    //Disable_InactiveBPFStages(ExecutionContext);
    HandleBPF(ExecutionContext);
    RequestStatus_OnChange(ExecutionContext);

    //formContext.data.process.addOnStageChange(stage_change);
    //formContext.data.process.addOnStageSelected(stage_change);
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);

    var formType = formContext.ui.getFormType();
    if (formType != 1) {
        DisableSectionFields(ExecutionContext, "RequestInformation");
        //SetTabVisibility(ExecutionContext, "Activities", true);
        //DisableTab(ExecutionContext, "TechnicalSupportDetails", true);
        if (currentStatusCode != requestStatus.draft) {

            EnableDisableAllFieldsinTab(ExecutionContext, "TechnicalSupportDetails", true);
        } else if (currentStatusCode == requestStatus.draft) {
            EnableDisableAllFieldsinTab(ExecutionContext, "TechnicalSupportDetails", false);

        }
        if (formContext.getAttribute("ldv_casechannle") != null)
            DisableField(ExecutionContext, "ldv_casechannle");
        //SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        //SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");
    }

    // SPC

    if (formType == 1) {
        formContext.getControl(fields.requestType).removeOption(requestType.ServiceProviderComplaint);
        formContext.getControl(fields.requestType).removeOption(requestType.ReportFraudNumbers);
        formContext.getControl(fields.complaintType).removeOption(complaintType.Others);
        // Case - Technical Support
        formContext.getControl(fields.requestType).removeOption(requestType.TechnicalSupportComplaint);
    }

    //  if (formType == 2) {
    //      formContext.getControl(fields.requestType).removeOption(requestType.ServiceProviderComplaint);
    //  }

    if (Dispute_IfParentCaseIsSPC(ExecutionContext)) {
        formContext.getControl('parentcaseid').setDisabled(true);
    }



    if (formContext.getAttribute(fields.requestType).getValue() == requestType.ServiceProviderComplaint) {
        formContext.getControl('header_process_ldv_submitrequest').setDisabled(true);
    }

    if (formContext.getAttribute(fields.requestType).getValue() == requestType.ReportFraudNumbers) {
        formContext.getControl('header_process_ldv_submitrequest').setDisabled(true);
    }
    // debugger







    if (formType == 3 || formType == 4) {
        //disable form fields & grids
        DisableFormFieldsOnly(ExecutionContext);
        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
        //DisableGrid("ComplaintCategory_SubGrid");
    }

    if (!UserHasRole("System Administrator")) {
        DisableTab(ExecutionContext, "Administration", true);
    }

    if (formContext.getAttribute(fields.ReOpenComment).getValue() != null && formContext.getAttribute(fields.ReOpenFeedback).getValue() != null) {
        SetTabVisibility(ExecutionContext, "ReOpen", true);
    }

    var customerid = GetLookupObject(ExecutionContext, fields.Contact);
    if (IsNull(customerid)) {
        DisableField(ExecutionContext, fields.EntityName);
    }



    setFieldControlsVisibility(ExecutionContext, fields.origin, false);

    //isthecomplaintregardingyournumber_OnChange();
    DisputeSubServiceCategory_OnChange(ExecutionContext);
    var _stage = formContext.data.process.getActiveStage();
    if (_stage != null) {
        var activeStg = formContext.data.process.getActiveStage().getName();
        if (formContext.getAttribute(fields.requestType).getValue() != null) {
            requesrtypeValue = formContext.getAttribute(fields.requestType).getValue()
            if (requesrtypeValue != requestType.ComplaintAgainstTRA && requesrtypeValue != requestType.inquiry) {
                //  SetFieldVisibility(ExecutionContext , fields.priority, false);
                ///formContext.getControl(fields.priority).setVisible(false);
            }
        }

        if (formContext.getAttribute("ldv_casechannle").getValue() != null) {

            casechannel = formContext.getAttribute("ldv_casechannle").getValue()[0].id;
            casechannelname = formContext.getAttribute("ldv_casechannle").getValue()[0].name;
            if (!GuidsAreEqual(casechannel, caseChanal.Media)) {
                // formContext.getControl(fields.priority).removeOption(1);
            }
        }
        if (activeStg == "Customer Care Decision") {
            var smsServiceProviderDecision = formContext.getAttribute(fields.SMSServiceProviderDecision).getValue();
            if (smsServiceProviderDecision == SMSServiceProviderDecision.RouteTotheOtherServiceProvider) {
                DisableFieldControls(ExecutionContext, fields.ServiceProvider, false);
            } else {
                DisableFieldControls(ExecutionContext, fields.ServiceProvider, true);
            }

            if (formContext.getAttribute(fields.requestType).getValue() == requestType.inquiry || formContext.getAttribute(fields.requestType).getValue() == requestType.ComplaintAgainstTRA) {
                var airequesttypeAttribute = formContext.getAttribute("ldv_airequesttype");
                if (airequesttypeAttribute) {
                    formContext.getControl("header_process_ldv_airequesttype").setVisible(false);

                }
                //formContext.getControl("header_process_ldv_valid").setVisible(true);

                //formContext.getAttribute("ldv_valid").setRequiredLevel("required");


            }

            // Dispute CR - 17/03/2024 - Hide On Hold option from CSR Dispute Decision
            /*if(formContext.getControl(fields.CSRDisputeDecision) != null ){
                formContext.getControl(fields.CSRDisputeDecision).removeOption(CSRDecision.SetOnHold);
            }
    
            if(formContext.getControl(fields.CSRDecision) != null ){
                formContext.getControl(fields.CSRDecision).removeOption(CSRDecision.SetOnHold);
            }
    
            if(formContext.getControl("header_process_ldv_csrdisputedecision") != null ){
                formContext.getControl("header_process_ldv_csrdisputedecision").removeOption(CSRDecision.SetOnHold);
            }
    
            if(formContext.getControl("header_process_ldv_csrdecision") != null ){
                formContext.getControl("header_process_ldv_csrdecision").removeOption(CSRDecision.SetOnHold);
            }*/

            RemoveOnhold(ExecutionContext);

            /// Dispute CR - 17/03/2024 - Hide or Show the Invalid and Route to SP Reasons
            /*var CSRDisputeDecision =  formContext.getAttribute(fields.CSRDisputeDecision);
            var Invalid =  formContext.getAttribute("ldv_invalid");
            if(Invalid != null && Invalid.getValue() == true) 
            {
                /// will remove Options of ()
                if(formContext.getControl(fields.CSRDisputeDecision) != null ){
                    formContext.getControl(fields.CSRDisputeDecision).removeOption(CSRDecision.RouteToIVR);
                }
                if(formContext.getControl("header_process_ldv_csrdisputedecision") != null ){
                    formContext.getControl("header_process_ldv_csrdisputedecision").removeOption(CSRDecision.RouteToIVR);
                }
            }*/
            showorHideInvalidReasonsdependonInvalidFlag(ExecutionContext, true);
            /*if(CSRDisputeDecision != null && CSRDisputeDecision.getValue() == CSRDecision.RouteToServiceProvider)
            {
                /// Show Route to SP Reasons 
                if(formContext.getControl(fields.RoutetoSpReasons) != null ){
                    formContext.getControl(fields.RoutetoSpReasons).setVisible(true);
                }
                // Show Invalid flag
                if(formContext.getControl(fields.Invalid) != null ){
                    formContext.getControl(fields.Invalid).setVisible(true);
                    showorHideInvalidReasonsdependonInvalidFlag();
                }
            }
            else // Hide Invalid flags and SP Reasons and Invalid Reasons 
            {
                /// Hide Route to SP Reasons 
                if(formContext.getControl(fields.RoutetoSpReasons) != null ){
                    formContext.getControl(fields.RoutetoSpReasons).setVisible(false);
                }
                // Show Invalid flag
                if(formContext.getControl(fields.Invalid) != null ){
                    formContext.getControl(fields.Invalid).setVisible(false);
                    showorHideInvalidReasonsdependonInvalidFlag();
                }
            }*/

            // Remove Exclate to Lead on SMS Spam 
            if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.SMSSpam) {
                // remove Esclate to Lead on SMS Spam Type
                if (formContext.getControl(fields.CSRDisputeDecision)) {
                    formContext.getControl("ldv_csrdisputedecision").removeOption(CSRDecision.Escalatetolead);
                    formContext.getControl("header_process_ldv_csrdisputedecision").removeOption(CSRDecision.Escalatetolead);
                }
            }

        }



        CSRDecision_OnChange(ExecutionContext);
        CSRDecision_OnChange_Dispute(ExecutionContext);

        if (activeStg == "Service Provider Feedback") {
            // Accelerators 2.0  CR
            // Lock AI Proposed Decision 
            var AIProposedField = formContext.getControl(fields.AIProposedDecision);
            if (AIProposedField != null) {
                AIProposedField.setDisabled(true);
            }
            // Routing to SP
            var AIProposedField_route = formContext.getControl(fields.AIProposedDecision + "1");
            if (AIProposedField_route != null) {
                AIProposedField_route.setDisabled(true);
            }
        }



        //if (activeStg == "Rollback Case") {
        //    FilterNewRequestType(ExecutionContext);
        //}

        if (activeStg == "Rollback Case") {


            SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
            SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

            SetTabVisibility(ExecutionContext, "InquiryDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

            SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
            //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

            SetTabVisibility(ExecutionContext, "DisputeDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");

            SetTabVisibility(ExecutionContext, "SmsSpamTab", false);

            SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

            SetFieldRequiredLevel(ExecutionContext, "ldv_referencenumberoptions", "none");
            SetFieldRequiredLevel(ExecutionContext, "ldv_referencenumber", "none");
            SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");



            /// Technical Support Request

            SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");
            SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
            SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
            SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
            SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
            SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
            SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);

            // Complaint Against TRA
            SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_complainttype", "none");

            SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

            // Hidden
            SetTabFieldsRequiredLevel(ExecutionContext, "Hidden", "none");


            if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.inquiry) {
                SetTabVisibility(ExecutionContext, "InquiryDetails", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "InquiryDetails", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.suggestion) {
                SetTabVisibility(ExecutionContext, "SuggestionDetails", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "SuggestionDetails", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.ComplaintAgainstTRA) {
                SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "ComplaintAgainstTRADetails", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.DisputeWithServiceProvider) {
                SetTabVisibility(ExecutionContext, "DisputeDetails", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "DisputeDetails", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.ComplaintAgainstServiceProvider) {
                //  SetTabVisibility(ExecutionContext, "", true);

            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.SMSSpam) {
                SetTabVisibility(ExecutionContext, "SmsSpamTab", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "SmsSpamTab", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.ServiceProviderComplaint) {
                SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "ServiceProviderComplaint_Tab", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.ReportFraudNumbers) {
                SetTabVisibility(ExecutionContext, "ReportFraudNumbers", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "ReportFraudNumbers", true);


            } else if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {
                SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", true);
                EnableDisableAllFieldsinTab(ExecutionContext, "TechnicalSupportDetails", true);


            }


        }
    }
    Operator_Details_setting(ExecutionContext);
    showHideServiceSurvey(ExecutionContext);
    ValidateIVR(ExecutionContext);
    handleAttachmentsIframe(ExecutionContext);
    onholdreason_onchange(ExecutionContext);
    onholdreason_filterByCaseType(ExecutionContext);
    EnableDisableAllFieldsinTab(ExecutionContext, "ReportFraudNumbers", true);

    var ClosedInFavorOfHeaderField = formContext.getControl(fields.ClosedInFavorOfHeader);
    var CSRDisputeDecision = formContext.getAttribute(fields.CSRDisputeDecision);
    var requestTypeAttribute = formContext.getAttribute(fields.requestType);
    if (ClosedInFavorOfHeaderField && (requestTypeAttribute.getValue() != requestType.DisputeWithServiceProvider) && (CSRDisputeDecision.getValue() != CSRDecision.assessDispute)) {
        ClosedInFavorOfHeaderField.setVisible(false);
    }

    HandleMultipleDepartmentRouting(ExecutionContext);
    formContext.data.process.addOnStageSelected(function () {
        HandleMultipleDepartmentRouting(ExecutionContext);
    });
    SetBPFProcessField(ExecutionContext);
    CheckIfUserisMemebrofTeam(ExecutionContext);
    FilterServiceProvider(ExecutionContext);
    formContext.data.process.addOnStageSelected(function () {
        DisblefinalstageFieldsafterCloseCase(ExecutionContext);
    });

    // case - Technical Support
    FilterScreeningFinalReview(ExecutionContext);
    ScreeningFinalReviewDecision_OnChange(ExecutionContext);
    BusinessTeamReviewDecision_OnChange(ExecutionContext);
    ITSupportDecision_OnChange(ExecutionContext);
    InitialReviewDecision_OnChange(ExecutionContext);
    formContext.data.process.addOnStageSelected(function () {
        DisableTechnicalSupportStagesFields(ExecutionContext);
    });
    var CopiedFrom = formContext.getAttribute("ldv_copiedfrom");
    var SubjectForTechnicalSupport = formContext.getAttribute("ldv_subject");
    var SubjectForCase = formContext.getAttribute("ldv_casesubject")?.getValue();

    if (RequestType != null && RequestType.getValue() != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

        if (CopiedFrom != null && CopiedFrom.getValue() != null
            && SubjectForTechnicalSupport != null
            && SubjectForTechnicalSupport.getValue() == null) {

            SubjectForTechnicalSupport.setValue(SubjectForCase);
        }
    }


    // Case - New CRS
    SenderID_OnChange(ExecutionContext);
    SpecifyNumber_OnChange(ExecutionContext);
    CancellationReason_OnChange(ExecutionContext);
    ValidFieldVisibility(ExecutionContext);
    Valid_OnChange(ExecutionContext);


    //To be Removed after solving Reference number issue 21/4/2026
    var activeStage = formContext.data.process.getActiveStage();
    //   if (activeStage.getName() == "Customer Care Decision") {
    if (activeStage != null && activeStage.getName() == "Customer Care Decision") {
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumberOptions, "none");
    }

}





//function isthecomplaintregardingyournumber_OnChange() {
//    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

//    if (requestTypeCode == requestType.SMSSpam) {
//        var isthecomplaintregardingyournumber = formContext.getAttribute("ldv_isthecomplaintregardingyournumber").getValue();
//        if (isthecomplaintregardingyournumber) {
//            SetFieldVisibility(ExecutionContext , "ldv_pleasespecifyyournumber", true);
//            SetFieldRequiredLevel(ExecutionContext , "ldv_pleasespecifyyournumber", "required");
//            SetFieldVisibility(ExecutionContext , "ldv_pleasespecifythenumberrelatedtothecomplai", false);
//            SetFieldRequiredLevel(ExecutionContext , "ldv_pleasespecifythenumberrelatedtothecomplai", "none");
//        } else {
//            SetFieldVisibility(ExecutionContext , "ldv_pleasespecifythenumberrelatedtothecomplai", true);
//            SetFieldRequiredLevel(ExecutionContext , "ldv_pleasespecifythenumberrelatedtothecomplai", "required");
//            SetFieldVisibility(ExecutionContext , "ldv_pleasespecifyyournumber", false);
//            SetFieldRequiredLevel(ExecutionContext , "ldv_pleasespecifyyournumber", "none");
//        }
//    }

//}

function form_OnSave(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //rollback issue fix
    formContext.getAttribute("ldv_requesttype").setSubmitMode("always");
    //
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.DisputeWithServiceProvider) {

        var activeStage = formContext.data.process.getActiveStage();
        if (activeStage.getName() == "Customer Care Decision") {

            var subServiceCategoryId = GetLookupObject(ExecutionContext, fields.DisputeSubServiceCategory)
            var csrDicision = formContext.getAttribute(fields.CSRDisputeDecision).getValue();
            if (subServiceCategoryId == null && (csrDicision == CSRDecision.RouteToServiceProvider || csrDicision == CSRDecision.RouteToDepartment || csrDicision == CSRDecision.assessDispute)) {
                formContext.ui.setFormNotification("Sub Service Category must be provided", 'ERROR', 'SubServiceCategoryProvided');
            }
            else {
                formContext.ui.clearFormNotification('SubServiceCategoryProvided');
            }

            // Disable check for Dispute Sub Category for now.
            //var DisputesSubServices_SubGrid = document.getElementById("DisputesSubServices_SubGrid").control;
            //var csrDicision = formContext.getAttribute(fields.CSRDisputeDecision).getValue();
            //if ((csrDicision == CSRDecision.RouteToServiceProvider || csrDicision == CSRDecision.RouteToDepartment || csrDicision == CSRDecision.assessDispute) && DisputesSubServices_SubGrid.GetRecordsFromInnerGrid().length == 0) {
            //    formContext.ui.setFormNotification("Sub Service Category must be provided", 'ERROR', 'SubServiceCategoryProvided');
            //    stopSave(context);
            //}
            //else if ((csrDicision == CSRDecision.RouteToServiceProvider || csrDicision == CSRDecision.RouteToDepartment || csrDicision == CSRDecision.assessDispute) && DisputesSubServices_SubGrid.GetRecordsFromInnerGrid().length > 1) {
            //    formContext.ui.setFormNotification("Sub Service Category must be Only one record", 'ERROR', 'SubServiceCategoryProvided');
            //    stopSave(context);
            //}
            //else
            //    formContext.ui.clearFormNotification('SubServiceCategoryProvided');



            //var ComplaintCategory_SubGrid = document.getElementById("ComplaintCategory_SubGrid").control;
            //if (ComplaintCategory_SubGrid.GetRecordsFromInnerGrid().length == 0) {
            //    formContext.ui.setFormNotification("Complaint Category must be provided", 'ERROR', 'ComplaintCategoryProvided');
            //    stopSave(context);
            //}
            //else
            //    formContext.ui.clearFormNotification('ComplaintCategoryProvided');
        }
        else {
            //formContext.ui.clearFormNotification('SubServiceCategoryProvided');
            //formContext.ui.clearFormNotification('ComplaintCategoryProvided');
        }
    }

    if (formContext.getAttribute(fields.AddAdditionalContactDetails).getValue()) {

        if (formContext.getAttribute(fields.AdditionalEmail).getValue() == null && formContext.getAttribute(fields.AdditionalMobile).getValue() == null) {
            formContext.ui.setFormNotification("At least one of the following fields must be provided: Additional Mobile Number / Additional Email", 'ERROR', 'AdditionalContactDetailsProvided');
            stopSave(ExecutionContext);
        }
        else
            formContext.ui.clearFormNotification('AdditionalContactDetailsProvided');
    }
    else
        formContext.ui.clearFormNotification('AdditionalContactDetailsProvided');
    var formType = formContext.ui.getFormType();
    if (formType != 1) {
        var activeStage = formContext.data.process.getActiveStage();
        if (activeStage.getName() == "Customer Care Decision") {

            var returnDate = formContext.getAttribute(fields.ReturnDate).getValue();
            var returnedDate = new Date(returnDate)
            var today = new Date();
            if (returnDate != null && (returnDate <= today
                || (returnedDate.getDate() == today.getDate() && returnedDate.getMonth() == today.getMonth()
                    && returnedDate.getFullYear() == today.getFullYear()))) {
                stopSave(ExecutionContext);
            } else {
                if (formContext.getAttribute("ldv_setonhold").getValue() == true)
                    formContext.getAttribute(fields.OnHoldStatus).setValue(2);
            }
        }
    }
    else if (formType == 1) {
        //SetBPFProcessField(ExecutionContext);
    }

    // ValidateCustomerCareDecision(context);
}

function stopSave(context) {
    var saveEvt = context.getEventArgs();
    if (saveEvt.getSaveMode() == 70 || saveEvt.getSaveMode() == 1 || saveEvt.getSaveMode() == 2) { //Form AutoSave Event
        saveEvt.preventDefault();
    }
}

///------------------------------------------------------Attachment Functions-------------------------------------------

//Used for SharePoint documents
/*
function handleAttachmentsIframe() {
    //Handle attachment
    var navDocument;
    navDocument = document.all.navDocument;
    var recordId = formContext.data.entity.getId().("{"replace, "").replace("}", "");
    if (navDocument != null && recordId != null && recordId != "") {

        SetTabVisibility(ExecutionContext , "Attachments", true);

        var oTypeCode = formContext.data.attributes().etc;

        var CurrentFormId = formContext.ui.formSelector.getCurrentItem().getId().replace("{", "").replace("}", "");
        document.all.IFRAME_sp_documents.src = Xrm.Utility.getGlobalContext().getClientUrl() + "/tools/documentmanagement/areas.aspx?formid=%7b" + CurrentFormId + "%7d&oId=%7b" + recordId + "%7d&oType=" + oTypeCode + "&pagemode=iframe&rof=true";
        formContext.getControl("IFRAME_sp_documents").setSrc(Xrm.Utility.getGlobalContext().getClientUrl() + "/tools/documentmanagement/areas.aspx?formid=%7b" + CurrentFormId + "%7d&oId=%7b" + recordId + "%7d&oType=" + oTypeCode + "&pagemode=iframe&rof=true");
        var iframeObjId = "IFRAME_sp_documents";
        SetIframeContent(iframeObjId, oTypeCode, CurrentFormId, recordId);
    }
    else {
        SetTabVisibility(ExecutionContext , "Attachments", false);
    }
}
*/

//Used for new file management system related to new portal
function handleAttachmentsIframe(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var globalNumber = formContext.getAttribute("ldv_globalnumber").getValue();

    if (!IsNull(globalNumber)) {
        SetTabVisibility(ExecutionContext, "Attachments", true);

        //Entity Type which refers to entity name must be passed if the value of "isFileRequestedByCode" is false
        formContext.getControl("IFRAME_sp_documents").setSrc(getFMSURL(ExecutionContext, globalNumber, true));
    }
    else {
        SetTabVisibility(ExecutionContext, "Attachments", false);
    }
}

//------------------------------------------------------------------------------------------------------------------------

function ValidateCustomerCareDecision(ExecutionContext) {

    var _stage = formContext.data.process.getActiveStage();
    if (_stage != null) {
        var currntStg = formContext.data.process.getActiveStage().getName();
        if (currntStg == "Customer Care Decision") {
            var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

            if (requestTypeCode == requestType.ComplaintAgainstTRA || requestTypeCode == requestType.suggestion
                || requestTypeCode == requestType.inquiry) {
                var csrDecision = formContext.getAttribute(fields.CSRDecision).getValue();
                if (csrDecision == null)
                    stopSave(ExecutionContext);
            }

            if (requestTypeCode == requestType.DisputeWithServiceProvider) {
                var CSRDisputeDecision = formContext.getAttribute(fields.CSRDisputeDecision).getValue();
                if (CSRDisputeDecision == null)
                    stopSave(ExecutionContext);
                else {
                    BPFCallback(ExecutionContext);
                }
            }
        }
    }
}

//----------------------------- End Form Events -----------------------------

//----------------------------- On Change Events ----------------------------
function RequestType_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var formType = formContext.ui.getFormType();
    //debugger;
    DisableField(ExecutionContext, "prioritycode");
    //SetTabVisibility(ExecutionContext, "SuggestionCategory", false);
    //SetFieldRequiredLevel(ExecutionContext, "ldv_suggestioncategory", "none");

    if (requestTypeCode == requestType.ComplaintAgainstTRA) {

        if (formType == 1 || formContext.getAttribute(fields.SubmitRequest).getValue() == false || formContext.getAttribute(fields.origin).getValue() == 1) {
            SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintApplicantFeedback", false);
        }
        else if (formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintApplicantFeedback", true);
        }

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");

        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);

        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");
        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);

        // Complaint Against TRA
        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_complainttype", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_subject", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_details", "required");
        //debugger
        //EnableField(ExecutionContext, "prioritycode");
        ComplaintType_OnChange(ExecutionContext);
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifyyournumber", "none");
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.InquiriesComplaintsandSuggestions, () => { })


    }
    else if (requestTypeCode == requestType.inquiry) {

        if (formType == 1 || formContext.getAttribute(fields.SubmitRequest).getValue() == false || formContext.getAttribute(fields.origin).getValue() == 1) {
            SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryApplicantFeedback", false);
        }
        else if (formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryApplicantFeedback", true);
        }

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");

        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);

        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

        /// Technical Support Request
        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");


        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false)

        // Inquiry
        //debugger
        //EnableField(ExecutionContext, "prioritycode");
        SetTabVisibility(ExecutionContext, "InquiryDetails", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_inquirytype", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_casesubject", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_details", "required");

        InquiryType_OnChange(ExecutionContext);
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifyyournumber", "none");
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.InquiriesComplaintsandSuggestions, () => { })

        ;
    }
    else if (requestTypeCode == requestType.suggestion) {

        if (formType == 1 || formContext.getAttribute(fields.SubmitRequest).getValue() == false || formContext.getAttribute(fields.origin).getValue() == 1) {
            SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionApplicantFeedback", false);
        }
        else if (formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionApplicantFeedback", true);
        }

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");

        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);


        // Suggestion
        SetTabVisibility(ExecutionContext, "SuggestionDetails", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_suggestiontype", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_casesubject", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_details", "required");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", true);
        //SetTabVisibility(ExecutionContext, "SuggestionCategory", true);
       // SetFieldRequiredLevel(ExecutionContext, "ldv_suggestioncategory", "required");//Ø´dded by tariq
        SuggestionType_OnChange(ExecutionContext);
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifyyournumber", "none");
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.InquiriesComplaintsandSuggestions, () => { })


    }
    else if (requestTypeCode == requestType.DisputeWithServiceProvider) {

        if (formType == 1 || formContext.getAttribute(fields.SubmitRequest).getValue() == false || formContext.getAttribute(fields.origin).getValue() == 1) {
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeApplicantFeedback", false);
        }
        else if (formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeApplicantFeedback", true);

        }
        if (formType == 1) {
            formContext.getControl("ldv_disputesubservicecategoryclassification").setDisabled(false);

            SetFieldRequiredLevel(ExecutionContext, "ldv_disputesubservicecategoryclassification", "required");

        }



        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "DisputeCategory", "required");

        // Dispute CR 
        var emirates = formContext.getAttribute("ldv_disputeemirate");
        if (emirates != null) {
            setFieldControlsVisibility(ExecutionContext, "ldv_disputeemirate", false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_disputeemirate", "none");
        }
        var Area = formContext.getAttribute("ldv_area");
        if (Area != null) {
            setFieldControlsVisibility(ExecutionContext, "ldv_area", false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_area", "none");
        }
        handleServiceCategory(ExecutionContext);
        ////////////////// 

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);


        // Dispute
        SetTabVisibility(ExecutionContext, "DisputeDetails", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_serviceprovider", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_didyousubmitacomplainttotheserviceprovide", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_casesubject", "required");
        //SetFieldRequiredLevel(ExecutionContext , "ldv_subjecttype", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_details", "required");

        DidYouSubmitComplaintToServiceProvider_OnChange(ExecutionContext);
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifyyournumber", "none");
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");
        DisputeService_OnChange(ExecutionContext);

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.DisputewithServiceProvider, () => { })



    }
    else if (requestTypeCode == requestType.SMSSpam) {

        if (formType == 1 || formContext.getAttribute(fields.SubmitRequest).getValue() == false || formContext.getAttribute(fields.origin).getValue() == 1) {
            SetSectionVisibility(ExecutionContext, "SmsSpamTab", "SMSSpamApplicantFeedback", false);
        }
        else if (formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            SetSectionVisibility(ExecutionContext, "SmsSpamTab", "SMSSpamApplicantFeedback", true);
        }

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");
        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);


        // SMS Spam
        SetTabVisibility(ExecutionContext, "SmsSpamTab", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_serviceprovider", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_didyousubmitacomplainttotheserviceprovide", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_isthecomplaintregardingyournumber", "required");

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        //SetTabVisibility(ExecutionContext , "DisputeDetails", false);
        //SetTabFieldsRequiredLevel(ExecutionContext , "DisputeDetails", "none");

        DidYouSubmitComplaintToServiceProvider_OnChange(ExecutionContext);

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.InquiriesComplaintsandSuggestions, () => { })



    } // SPC
    else if (requestTypeCode == requestType.ServiceProviderComplaint) {
        //debugger
        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);

        // SPC
        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", true);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetFieldVisibility(ExecutionContext, "prioritycode", false);

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.serviceprovidercomplaint, () => { })
        // disableForm();

    } else if (requestTypeCode == requestType.ReportFraudNumbers) {


        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);

        // SPC
        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", true);
        EnableDisableAllFieldsinTab(ExecutionContext, "ReportFraudNumbers", true);
        SetFieldVisibility(ExecutionContext, "prioritycode", false);

        //SetBPFProcessField(ExecutionContext);
        //SwitchBPF(formContext, CaseBPF.serviceprovidercomplaint, () => { })
        // disableForm();

    }
    else if (requestTypeCode == requestType.TechnicalSupportComplaint) {

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");

        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");
        // Tabs 

        EnableDisableAllFieldsinTab(ExecutionContext, "InitialScreeningReviewDetails", true);
        EnableDisableAllFieldsinTab(ExecutionContext, "ITSupportTeamReviewDetails", true);
        EnableDisableAllFieldsinTab(ExecutionContext, "BusinessTeamReviewDetails", true);
        EnableDisableAllFieldsinTab(ExecutionContext, "ScreeningFinalReview", true);


        //required Fields
        SetFieldRequiredLevel(ExecutionContext, "ldv_servicetype", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_subject", "required");
        SetFieldRequiredLevel(ExecutionContext, "ldv_details", "required");

        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", true);

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", true);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", true);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", true);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", true);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", true);
        TechnicalSupportService_OnChange(ExecutionContext);

    }
    else {

        SetTabVisibility(ExecutionContext, "ComplaintAgainstTRADetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "none");

        SetTabVisibility(ExecutionContext, "InquiryDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "none");

        SetTabVisibility(ExecutionContext, "SuggestionDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "none");
        //SetTabVisibility(ExecutionContext, "SuggestionOptionalDetails", false);

        SetTabVisibility(ExecutionContext, "DisputeDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "DisputeDetails", "none");



        SetTabVisibility(ExecutionContext, "SmsSpamTab", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "SmsSpamTab", "none");

        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifyyournumber", "none");
        SetFieldRequiredLevel(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai", "none");

        SetTabVisibility(ExecutionContext, "ServiceProviderComplaint_Tab", false);
        SetTabVisibility(ExecutionContext, "ReportFraudNumbers", false);

        /// Technical Support Request

        SetTabVisibility(ExecutionContext, "TechnicalSupportDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "TechnicalSupportDetails", "none");

        SetTabVisibility(ExecutionContext, "InitialScreeningReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "InitialScreeningReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ITSupportTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ITSupportTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "BusinessTeamReviewDetails", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "BusinessTeamReviewDetails", "none");
        SetTabVisibility(ExecutionContext, "ScreeningFinalReview", false);
        SetTabFieldsRequiredLevel(ExecutionContext, "ScreeningFinalReview", "none");
        SetTabVisibility(ExecutionContext, "Technical Support Feedbacks", false);
    }

}

//---------------------------------- case - Technical Support  ------------------------------

function TechnicalSupportService_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var RequestType = formContext.getAttribute(fields.requestType);
    if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

        var ServiceTypeCodeAtt = formContext.getAttribute(fields.ServiceType);
        if (ServiceTypeCodeAtt != null) {

            var ServiceTypeCode = ServiceTypeCodeAtt.getValue();
            if (ServiceTypeCode == ServiceTypes.Initiatives) {


                //SetFieldVisibility(ExecutionContext, fields.service, false);
                //formContext.getControl('ldv_service3').setVisible(false);

                if (formContext.getControl('ldv_service3') != null)
                    formContext.getControl('ldv_service3').setVisible(false);

                //SetFieldVisibility(ExecutionContext, 'ldv_service3', false);

                SetFieldRequiredLevel(ExecutionContext, fields.service, "none");

                SetFieldVisibility(ExecutionContext, fields.OtherServiceType, false);
                SetFieldRequiredLevel(ExecutionContext, fields.OtherServiceType, "none");

                if (formContext.getControl('ldv_initiatives2') != null)
                    formContext.getControl('ldv_initiatives2').setVisible(true);

                //SetFieldVisibility(ExecutionContext, 'ldv_initiatives2', true);
                SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "required");
                // var InitiativeID = GetLookupObject(ExecutionContext, fields.Initiatives);

            }
            else if (ServiceTypeCode == ServiceTypes.Services) {
                if (formContext.getControl('ldv_initiatives2') != null)
                    formContext.getControl('ldv_initiatives2').setVisible(false);
                SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");

                SetFieldVisibility(ExecutionContext, fields.OtherServiceType, false);
                SetFieldRequiredLevel(ExecutionContext, fields.OtherServiceType, "none");


                if (formContext.getControl('ldv_service3') != null)
                    formContext.getControl('ldv_service3').setVisible(true);
                SetFieldRequiredLevel(ExecutionContext, fields.service, "required");

            }
            else if (ServiceTypeCode == ServiceTypes.Other) {
                if (formContext.getControl('ldv_initiatives2') != null)
                    formContext.getControl('ldv_initiatives2').setVisible(false);
                SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");

                //formContext.getControl('ldv_service3').setVisible(false);
                if (formContext.getControl('ldv_service3') != null)
                    formContext.getControl('ldv_service3').setVisible(false);
                SetFieldRequiredLevel(ExecutionContext, fields.service, "none");

                SetFieldVisibility(ExecutionContext, fields.OtherServiceType, true);
                SetFieldRequiredLevel(ExecutionContext, fields.OtherServiceType, "required");
            }
            else {
                if (formContext.getControl('ldv_initiatives2') != null)
                    formContext.getControl('ldv_initiatives2').setVisible(false);
                SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");

                if (formContext.getControl('ldv_service3') != null)
                    formContext.getControl('ldv_service3').setVisible(false);
                SetFieldRequiredLevel(ExecutionContext, fields.service, "none");

                SetFieldVisibility(ExecutionContext, fields.OtherServiceType, false);
                SetFieldRequiredLevel(ExecutionContext, fields.OtherServiceType, "none");
            }
        }
        else {
            if (formContext.getControl('ldv_initiatives2') != null)
                formContext.getControl('ldv_initiatives2').setVisible(false);
            SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");

            if (formContext.getControl('ldv_service3') != null)
                formContext.getControl('ldv_service3').setVisible(false);
            SetFieldRequiredLevel(ExecutionContext, fields.service, "none");

            SetFieldVisibility(ExecutionContext, fields.OtherServiceType, false);
            SetFieldRequiredLevel(ExecutionContext, fields.OtherServiceType, "none");
        }
    }
}

function InitialReviewDecision_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var owner = formContext.getAttribute("ownerid");

    if (owner != null && owner.getValue() != null) {

        owner = owner.getValue();
        var ownerID = owner[0].id;

    }

    var userID = Xrm.Utility.getGlobalContext().userSettings.userId;
    console.log(ownerID == userID)
    if (userID == ownerID || UserHasRole("System Administrator")) {

        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {


            //SetFieldRequiredLevel(ExecutionContext, fields.ITInitialReviewDecision, "required");
            var DecisionCodeAtt = formContext.getAttribute(fields.ITInitialReviewDecision);

            if (DecisionCodeAtt != null) {
                var DecisionCode = DecisionCodeAtt.getValue();
                if (DecisionCode == initialScreeningReviewDecision.AssignTeam) {
                    if (formContext.getControl('header_process_' + fields.ITScreeningFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITScreeningFeedback).setVisible(true);

                    if (formContext.getControl('header_process_' + fields.ITSupportTeam) != null) {
                        formContext.getControl('header_process_' + fields.ITSupportTeam).setVisible(true);
                        formContext.getControl('header_process_' + fields.ITSupportTeam).setDefaultView("A4139A0A-6C6E-EC11-8811-000D3A27BAFB");
                    }
                    SetFieldVisibility(ExecutionContext, fields.ITScreeningFeedback, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITScreeningFeedback, "required");
                    DisableFieldControls(ExecutionContext, fields.ITSupportTeam, false);
                    SetFieldVisibility(ExecutionContext, fields.ITSupportTeam, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "required");
                }
                else if (DecisionCode == initialScreeningReviewDecision.Sendback) {
                    if (formContext.getControl('header_process_' + fields.ITScreeningFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITScreeningFeedback).setVisible(true);

                    if (formContext.getControl('header_process_' + fields.ITSupportTeam) != null)
                        formContext.getControl('header_process_' + fields.ITSupportTeam).setVisible(false);

                    SetFieldVisibility(ExecutionContext, fields.ITSupportTeam, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "none");
                    SetFieldVisibility(ExecutionContext, fields.ITScreeningFeedback, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITScreeningFeedback, "required");
                }
                else {

                    if (formContext.getControl('header_process_' + fields.ITScreeningFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITScreeningFeedback).setVisible(false);

                    if (formContext.getControl('header_process_' + fields.ITSupportTeam) != null)
                        formContext.getControl('header_process_' + fields.ITSupportTeam).setVisible(false);

                    SetFieldVisibility(ExecutionContext, fields.ITSupportTeam, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "none");

                    SetFieldVisibility(ExecutionContext, fields.ITScreeningFeedback, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITScreeningFeedback, "none");
                }
            }
            else {
                if (formContext.getControl('header_process_' + fields.ITScreeningFeedback) != null)
                    formContext.getControl('header_process_' + fields.ITScreeningFeedback).setVisible(false);

                if (formContext.getControl('header_process_' + fields.ITSupportTeam) != null)
                    formContext.getControl('header_process_' + fields.ITSupportTeam).setVisible(false);

                SetFieldVisibility(ExecutionContext, fields.ITSupportTeam, false);
                SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "none");
                SetFieldVisibility(ExecutionContext, fields.ITScreeningFeedback, false);
                SetFieldRequiredLevel(ExecutionContext, fields.ITScreeningFeedback, "none");
            }

            if (formContext.getControl('ldv_itsupportteam1') != null)
                SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', false);

        }
    } else {

        DisableFormFieldsOnly(ExecutionContext);

        if (formContext.getControl('header_process_' + fields.ITInitialReviewDecision) != null)
            formContext.getControl('header_process_' + fields.ITInitialReviewDecision).setDisabled(true);

        EnableDisableAllFieldsinTab(ExecutionContext, "InitialScreeningReviewDetails", true);
    }


}

function ITSupportDecision_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var owner = formContext.getAttribute("ownerid");

    if (owner != null && owner.getValue() != null) {

        owner = owner.getValue();
        var ownerID = owner[0].id;

    }

    var userID = Xrm.Utility.getGlobalContext().userSettings.userId;

    if (userID == ownerID || UserHasRole("System Administrator")) {
        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

            // Hide Next Btn
            ShowNextStageUCI(false);
            // Hide BPF Finish Btn
            ShowFinishButtonInUCI(false);

            SetFieldRequiredLevel(ExecutionContext, fields.ITSupportDecision, "required");
            var DecisionCodeAtt = formContext.getAttribute(fields.ITSupportDecision)
            if (DecisionCodeAtt != null) {
                var DecisionCode = formContext.getAttribute(fields.ITSupportDecision).getValue();

                if (DecisionCode == iTSupportDecision.NeedBusinessApproval) {

                    if (formContext.getControl('header_process_' + fields.ITSupportFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITSupportFeedback).setVisible(true);
                    if (formContext.getControl('header_process_' + fields.BusinessTeam) != null)
                        formContext.getControl('header_process_' + fields.BusinessTeam).setVisible(true);

                    SetFieldVisibility(ExecutionContext, fields.ITSupportFeedback, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportFeedback, "required");

                    SetFieldVisibility(ExecutionContext, fields.BusinessTeam, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeam, "required");

                }
                else if (!IsNull(DecisionCode) && DecisionCode != iTSupportDecision.NeedBusinessApproval) {

                    if (formContext.getControl('header_process_' + fields.ITSupportFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITSupportFeedback).setVisible(true);
                    if (formContext.getControl('header_process_' + fields.BusinessTeam) != null)
                        formContext.getControl('header_process_' + fields.BusinessTeam).setVisible(false);

                    SetFieldVisibility(ExecutionContext, fields.BusinessTeam, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeam, "none");

                    SetFieldVisibility(ExecutionContext, fields.ITSupportFeedback, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportFeedback, "required");

                }
                else {
                    if (formContext.getControl('header_process_' + fields.ITSupportFeedback) != null)
                        formContext.getControl('header_process_' + fields.ITSupportFeedback).setVisible(false);
                    if (formContext.getControl('header_process_' + fields.BusinessTeam) != null)
                        formContext.getControl('header_process_' + fields.BusinessTeam).setVisible(false);

                    SetFieldVisibility(ExecutionContext, fields.BusinessTeam, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeam, "none");

                    SetFieldVisibility(ExecutionContext, fields.ITSupportFeedback, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportFeedback, "none");
                }
            }
            else {
                if (formContext.getControl('header_process_' + fields.ITSupportFeedback) != null)
                    formContext.getControl('header_process_' + fields.ITSupportFeedback).setVisible(false);
                if (formContext.getControl('header_process_' + fields.BusinessTeam) != null)
                    formContext.getControl('header_process_' + fields.BusinessTeam).setVisible(false);

                SetFieldVisibility(ExecutionContext, fields.BusinessTeam, false);
                SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeam, "none");

                SetFieldVisibility(ExecutionContext, fields.ITSupportFeedback, false);
                SetFieldRequiredLevel(ExecutionContext, fields.ITSupportFeedback, "none");
            }
        }

    } else {

        if (formContext.getControl('header_process_' + fields.ITSupportDecision) != null)
            formContext.getControl('header_process_' + fields.ITSupportDecision).setDisabled(true);

        EnableDisableAllFieldsinTab(ExecutionContext, "ITSupportTeamReviewDetails", true);



    }

}


function BusinessTeamReviewDecision_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var owner = formContext.getAttribute("ownerid");

    if (owner != null && owner.getValue() != null) {

        owner = owner.getValue();
        var ownerID = owner[0].id;

    }

    var userID = Xrm.Utility.getGlobalContext().userSettings.userId;
    if (userID == ownerID || UserHasRole("System Administrator")) {
        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

            // Hide Next Btn
            ShowNextStageUCI(false);
            // Hide BPF Finish Btn
            ShowFinishButtonInUCI(false);
            SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeamReviewDecision, "required");
            var DecisionAtt = formContext.getAttribute(fields.BusinessTeamReviewDecision).getValue();
            if (DecisionAtt != null) {
                var Decision = formContext.getAttribute(fields.BusinessTeamReviewDecision).getValue();

                if (!IsNull(Decision)) {
                    if (formContext.getControl('header_process_' + fields.BusinessTeamFeedback) != null)
                        formContext.getControl('header_process_' + fields.BusinessTeamFeedback).setVisible(true);

                    SetFieldVisibility(ExecutionContext, fields.BusinessTeamFeedback, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeamFeedback, "required");
                }
                else {
                    if (formContext.getControl('header_process_' + fields.BusinessTeamFeedback) != null)
                        formContext.getControl('header_process_' + fields.BusinessTeamFeedback).setVisible(false);
                    SetFieldVisibility(ExecutionContext, fields.BusinessTeamFeedback, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeamFeedback, "none");
                }
            }
            else {
                if (formContext.getControl('header_process_' + fields.BusinessTeamFeedback) != null)
                    formContext.getControl('header_process_' + fields.BusinessTeamFeedback).setVisible(false);
                SetFieldVisibility(ExecutionContext, fields.BusinessTeamFeedback, false);
                SetFieldRequiredLevel(ExecutionContext, fields.BusinessTeamFeedback, "none");
            }
        }

    } else {

        if (formContext.getControl('header_process_' + fields.BusinessTeamReviewDecision) != null)
            formContext.getControl('header_process_' + fields.BusinessTeamReviewDecision).setDisabled(true);

        EnableDisableAllFieldsinTab(ExecutionContext, "BusinessTeamReviewDetails", true);
    }
}
function ScreeningFinalReviewDecision_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var owner = formContext.getAttribute("ownerid");

    if (owner != null && owner.getValue() != null) {

        owner = owner.getValue();
        var ownerID = owner[0].id;

    }

    var userID = Xrm.Utility.getGlobalContext().userSettings.userId;
    if (userID == ownerID || UserHasRole("System Administrator")) {
        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

            // Hide Next Btn
            ShowNextStageUCI(false);
            // Hide BPF Finish Btn
            ShowFinishButtonInUCI(false);

            if (formContext.getControl('header_process_ldv_itsupportteam') != null & formContext.getAttribute('ldv_itsupportteam') != null && formContext.getAttribute('ldv_itsupportteam').getValue() != null)
                formContext.getControl('header_process_ldv_itsupportteam').setVisible(true);

            SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam', true);

            if (formContext.getControl('header_process_ldv_itsupportteam_1') != null)
                formContext.getControl('header_process_ldv_itsupportteam_1').setVisible(false);

            if (formContext.getControl('header_process_ldv_itsupportteam_2') != null)
                formContext.getControl('header_process_ldv_itsupportteam_2').setVisible(false);


            SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', false);

            if (formContext.getControl('ldv_itsupportteam') != null)
                DisableField(ExecutionContext, 'ldv_itsupportteam');
            //formContext.getControl('ldv_itsupportteam').setDisabled(true);
            ////IT Screening Final Review
            //var activeStage = formContext.data.process.getActiveStage().getName();

            SetFieldRequiredLevel(ExecutionContext, fields.ScreeningFinalReviewDecision, "required");




            var DecisionCodeAtt = formContext.getAttribute(fields.ScreeningFinalReviewDecision);
            if (DecisionCodeAtt != null) {
                var DecisionCode = DecisionCodeAtt.getValue();
                if (DecisionCode == iTScreeningFinalReviewDecision.AssigntoTeam) {

                    if (formContext.getControl('header_process_' + fields.FinalFeedback + '_1') != null)
                        formContext.getControl('header_process_' + fields.FinalFeedback + '_1').setVisible(false);

                    //if (formContext.getControl('header_process_ldv_finalfeedback_1') != null)
                    //    formContext.getControl('header_process_ldv_finalfeedback_1').setVisible(false);

                    if (formContext.getControl('header_process_ldv_itsupportteam_1') != null) {
                        formContext.getControl('header_process_ldv_itsupportteam_1').setVisible(true);
                        formContext.getControl('header_process_ldv_itsupportteam_1').setDefaultView("A4139A0A-6C6E-EC11-8811-000D3A27BAFB");
                    }


                    if (formContext.getControl('ldv_itsupportteam1') != null)
                        formContext.getControl('ldv_itsupportteam1').setVisible(true);
                    //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', true);

                    SetFieldVisibility(ExecutionContext, fields.FinalFeedback, false, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.FinalFeedback, "none");
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "required");
                    //SetFieldRequiredLevel(ExecutionContext, 'ldv_itsupportteam1', "required");

                }
                else if (!IsNull(DecisionCode) && DecisionCode == iTScreeningFinalReviewDecision.Close) {
                    // Hide IT Support Team
                    if (formContext.getControl('header_process_ldv_itsupportteam_1') != null)
                        formContext.getControl('header_process_ldv_itsupportteam_1').setVisible(false);

                    if (formContext.getControl('ldv_itsupportteam1') != null)
                        formContext.getControl('ldv_itsupportteam1').setVisible(false);
                    //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', false, false);
                    //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam', false, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "none");

                    // Show Final Feedback
                    if (formContext.getControl('header_process_' + fields.FinalFeedback + '_1') != null)
                        formContext.getControl('header_process_' + fields.FinalFeedback + '_1').setVisible(true);
                    //if (formContext.getControl('header_process_ldv_finalfeedback_1') != null)
                    //    formContext.getControl('header_process_ldv_finalfeedback_1').setVisible(true);
                    SetFieldVisibility(ExecutionContext, fields.FinalFeedback, true, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.FinalFeedback, "required");

                }
                else {
                    // Hide Final Feedback
                    if (formContext.getControl('header_process_' + fields.FinalFeedback + '_1') != null)
                        formContext.getControl('header_process_' + fields.FinalFeedback + '_1').setVisible(false);
                    //if (formContext.getControl('header_process_ldv_finalfeedback_1') != null)
                    //    formContext.getControl('header_process_ldv_finalfeedback_1').setVisible(false);
                    SetFieldVisibility(ExecutionContext, fields.FinalFeedback, false, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.FinalFeedback, "none");

                    // Hide IT Support Team
                    if (formContext.getControl('header_process_ldv_itsupportteam_1') != null)
                        formContext.getControl('header_process_ldv_itsupportteam_1').setVisible(false);
                    //if (formContext.getControl('header_process_ldv_itsupportteam_2') != null)
                    //    formContext.getControl('header_process_ldv_itsupportteam_2').setVisible(false);

                    if (formContext.getControl('ldv_itsupportteam1') != null)
                        formContext.getControl('ldv_itsupportteam1').setVisible(false);
                    //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', false, false);
                    //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam', false, false);
                    //SetFieldRequiredLevel(ExecutionContext, 'ldv_itsupportteam1', "none");
                    SetFieldRequiredLevel(ExecutionContext, fields.ITSupportTeam, "none");

                }
            }
            else {
                // Hide Final Feedback
                if (formContext.getControl('header_process_' + fields.FinalFeedback + '_1') != null)
                    formContext.getControl('header_process_' + fields.FinalFeedback + '_1').setVisible(false);
                //if (formContext.getControl('header_process_ldv_finalfeedback_1') != null)
                //    formContext.getControl('header_process_ldv_finalfeedback_1').setVisible(false);
                SetFieldVisibility(ExecutionContext, fields.FinalFeedback, false, false);
                SetFieldRequiredLevel(ExecutionContext, fields.FinalFeedback, "none");

                // Hide IT Support Team
                if (formContext.getControl('header_process_ldv_itsupportteam_1') != null)
                    formContext.getControl('header_process_ldv_itsupportteam_1').setVisible(false);
                //if (formContext.getControl('header_process_ldv_itsupportteam_2') != null)
                //    formContext.getControl('header_process_ldv_itsupportteam_2').setVisible(false);

                if (formContext.getControl('ldv_itsupportteam1') != null)
                    formContext.getControl('ldv_itsupportteam1').setVisible(false);
                //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam1', false, false);
                //SetFieldVisibility(ExecutionContext, 'ldv_itsupportteam', false, false);
                SetFieldRequiredLevel(ExecutionContext, 'ldv_itsupportteam1', "none");
            }

        }
    }
    else {
        if (formContext.getControl('header_process_' + fields.ScreeningFinalReviewDecision) != null)
            formContext.getControl('header_process_' + fields.ScreeningFinalReviewDecision).setDisabled(true);


        EnableDisableAllFieldsinTab(ExecutionContext, "ScreeningFinalReview", true);
    }

}

function FilterScreeningFinalReview(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var RequestType = formContext.getAttribute(fields.requestType);
    if (RequestType != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {

        var InternalStatus = formContext.getAttribute(fields.internalStatus);
        var BusinessTeamReviewDecision = formContext.getAttribute(fields.BusinessTeamReviewDecision);
        if ((!IsNull(InternalStatus) && !IsNull(InternalStatus.getValue()) && InternalStatus.getValue()[0].id.toLowerCase() == "{dce3d785-89ce-f011-ad40-6045bd8b5b0d}") && //Pending IT Screening Final Review - Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠØ© Ù„ÙØ­Øµ ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª (For Rejection)
            (!IsNull(BusinessTeamReviewDecision) && !IsNull(BusinessTeamReviewDecision.getValue()) && BusinessTeamReviewDecision.getValue() == businssTeamDecision.Reject)) // Hide Re-Assign Option 
        {
            var screeningFinalReviewDecisionControl = formContext.getControl(fields.ScreeningFinalReviewDecision);
            if (screeningFinalReviewDecisionControl != null) {
                screeningFinalReviewDecisionControl.removeOption(iTScreeningFinalReviewDecision.AssigntoTeam);
            }
            var screeningFinalReviewDecisionControlBPF = formContext.getControl('header_process_' + fields.ScreeningFinalReviewDecision);
            if (screeningFinalReviewDecisionControlBPF != null) {
                screeningFinalReviewDecisionControlBPF.removeOption(iTScreeningFinalReviewDecision.AssigntoTeam);
            }
            var screeningFinalReviewDecisionControlBPF1 = formContext.getControl('header_process_' + fields.ScreeningFinalReviewDecision + '_1');
            if (screeningFinalReviewDecisionControlBPF1 != null) {
                screeningFinalReviewDecisionControlBPF1.removeOption(iTScreeningFinalReviewDecision.AssigntoTeam);
            }
        }
    }
}


function DisableTechnicalSupportStagesFields(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var owner = formContext.getAttribute("ownerid");

    if (owner != null && owner.getValue() != null) {

        owner = owner.getValue();
        var ownerID = owner[0].id;

    }

    var userID = Xrm.Utility.getGlobalContext().userSettings.userId;

    if (userID != ownerID && !UserHasRole("System Administrator")) {
        var _stage = formContext.data.process.getActiveStage();
        if (_stage != null) {
            DisableStageFields(formContext, _stage, true);
        }
    }

}

//---------------------------------- case - New CRS  ------------------------------
function SenderID_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    ClearFieldNotification(ExecutionContext, fields.SenderID);
    var reqType = formContext.getAttribute(fields.requestType);
    if (reqType != null && reqType.getValue() == requestType.SMSSpam) {


        var senderID = formContext.getAttribute(fields.SenderID);

        if (senderID != null) {
            var SenderIDValue = senderID.getValue();

            if (SenderIDValue == null || SenderIDValue == "" || SenderIDValue.length > 11) {

                SetFieldNotification(ExecutionContext, fields.SenderID, " should allow English characters only, with a maximum length of 11 characters.");
                var activeStage = formContext.data.process.getActiveStage();
                if (activeStage.getName() == "Rollback Case") {
                    ClearFieldNotification(ExecutionContext, fields.SenderID);


                }

            } else {
                ClearFieldNotification(ExecutionContext, fields.SenderID);

            }
        }
    }

}

function SpecifyNumber_OnChange(ExecutionContext) {

    ValidateSMSSpamNumber(ExecutionContext, fields.SpecifyNumber);

}


function CancellationReason_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var cancellationReason = formContext.getAttribute(fields.CancellationReasons);
    if (cancellationReason != null) {

        var Value = cancellationReason.getValue();

        if (Value != null && Value != "") {
            SetSectionVisibility(ExecutionContext, "General", "moreInfo_tab", true);
            SetFieldVisibility(ExecutionContext, fields.CancellationReasons, true);
            DisableField(ExecutionContext, fields.CancellationReasons);
        } else {
            SetSectionVisibility(ExecutionContext, "General", "moreInfo_tab", false);
            SetFieldVisibility(ExecutionContext, fields.CancellationReasons, false);
            DisableField(ExecutionContext, fields.CancellationReasons);

        }

    }
}


function ValidFieldVisibility(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var Type = formContext.getAttribute(fields.requestType);



    if (Type != null) {
        var value = Type.getValue();
        var valid = formContext.getControl('header_process_' + fields.Valid);
        var csrdecision = formContext.getControl('header_process_' + fields.CSRDecision)


        if (value != null && valid != null && csrdecision != null) {
            var csrdecisionvalue = csrdecision.getAttribute().getValue();
            var invalidReasons = formContext.getControl('header_process_ldv_ctrinvalidreasons');

            if (value == requestType.ComplaintAgainstTRA && csrdecisionvalue == complaintDecision.assessComplaint) {


                //if (valid != null) {

                valid.setVisible(true);
                valid.getAttribute().setRequiredLevel("required")
                // }

            }
            else {
                valid.setVisible(false);
                valid.getAttribute().setRequiredLevel("none")
                valid.getAttribute().setValue(null);
                invalidReasons.setVisible(false);
                invalidReasons.getAttribute().setRequiredLevel("none");



            }
        }
    }
}

function Valid_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var valid = formContext.getControl('header_process_' + fields.Valid);


    if (valid != null && (valid.getAttribute().getValue() != null)) {

        var value = valid.getAttribute().getValue();


        var invalidReasons = formContext.getControl('header_process_ldv_ctrinvalidreasons');
        //  var invalidReasonsvalue = formContext.getControl('header_process_ldv_ctrinvalidreasons');


        if (value == ValidType.NotValid) {
            if (invalidReasons != null) {
                invalidReasons.setVisible(true);
                invalidReasons.getAttribute().setRequiredLevel("required");
                //invalidReasonsvalue.setRequiredLevel("required")

            }

        } else {
            if (invalidReasons != null) {
                invalidReasons.setVisible(false);
                invalidReasons.getAttribute().setRequiredLevel("none");

                //invalidReasonsvalue.setRequiredLevel("none")

            }
        }
    }
}



function ComplaintType_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var complaintTypeCode = formContext.getAttribute(fields.complaintType).getValue();
    //var initiativeField = formContext.getControl(fields.Initiatives);

    if (complaintTypeCode == complaintType.ComplainAboutService) {

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "none");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "required");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    initiativeField.setVisible(false);
        //}

        var serviceCatgId = GetLookupObject(ExecutionContext, fields.serviceCategory);
        if (IsNull(serviceCatgId)) {
            DisableFieldControls(ExecutionContext, fields.service, true);
        }

        var formType = formContext.ui.getFormType();
        if (formType != 1) {
            SetTabVisibility(ExecutionContext, "ServiceSurvey", true);
        }
    }
    else if (complaintTypeCode == complaintType.ComplainAboutEmployee) {

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "none");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "required");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    initiativeField.setVisible(false);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }

    }
    else if (complaintTypeCode == complaintType.Others) {
        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "none");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", true);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "required");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    initiativeField.setVisible(false);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else if (complaintTypeCode == complaintType.ComplaintAboutServiceChannel) {
        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "none");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "required");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    initiativeField.setVisible(false);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else if (complaintTypeCode == complaintType.ComplaintAboutIntiative) {
        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "required");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "none");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "required");
        //    initiativeField.setVisible(true);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else {
        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintEmployeeDetails", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintAboutServiceChannel", "none");

        SetSectionVisibility(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "ComplaintAgainstTRADetails", "ComplaintInitiativesDetails", "none");

        SetFieldVisibility(ExecutionContext, "ldv_otherscomplainttype", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_otherscomplainttype", "none");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    initiativeField.setVisible(false);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
}

function InquiryType_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var inquiryTypeCode = formContext.getAttribute(fields.inquiryType).getValue();

    //var initiativeField = formContext.getControl('ldv_initiatives1');




    if (inquiryTypeCode == inquiryType.InquiryAboutService) {

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", "required");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", "none");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    //SetFieldVisibility(ExecutionContext, "ldv_initiatives1", false);
        //    initiativeField.setVisible(false);
        //}


        var serviceCatgId = GetLookupObject(ExecutionContext, fields.serviceCategory);
        if (IsNull(serviceCatgId)) {
            DisableFieldControls(ExecutionContext, fields.service, true);
        }
        var formType = formContext.ui.getFormType();
        if (formType != 1) {
            SetTabVisibility(ExecutionContext, "ServiceSurvey", true);
        }
    }

    else if (inquiryTypeCode == inquiryType.InquiryAboutRequest) {

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", "required");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", "none");


        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    //SetFieldVisibility(ExecutionContext, "ldv_initiatives1", false);
        //    initiativeField.setVisible(false);
        //}

        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else if (inquiryTypeCode == inquiryType.InquiryAboutIntiative) {


        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "required");
        //    //SetFieldVisibility(ExecutionContext, "ldv_initiatives1", false);
        //    initiativeField.setVisible(true);

        //}

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", "required");


        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else {
        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceRequestDetails", "none");

        SetSectionVisibility(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "InquiryDetails", "InquiryServiceInitiativesDetails", "none");

        //if (initiativeField != null) {

        //    SetFieldRequiredLevel(ExecutionContext, fields.Initiatives, "none");
        //    //SetFieldVisibility(ExecutionContext, "ldv_initiatives1", false);
        //    initiativeField.setVisible(false);
        //}


        if (!IsNull(formContext.getAttribute(fields.service).getValue())) {
            formContext.getAttribute(fields.serviceCategory).setValue(null);
            formContext.getAttribute(fields.service).setValue(null);
            formContext.getAttribute(fields.service).fireOnChange();
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
}


function SuggestionType_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var suggestionTypeCode = formContext.getAttribute(fields.suggestionType).getValue();

    if (suggestionTypeCode == suggestionType.SuggestionRelatedtoService) {

        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", "none");

        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", "required");

    }
    else if (suggestionTypeCode == suggestionType.SuggestionRelatedtoServiceChannels) {

        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", true);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", "required");

    }
    else {
        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceDetails", "none");

        SetSectionVisibility(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", false);
        SetSectionFieldsRequiredLevel(ExecutionContext, "SuggestionDetails", "SuggestionServiceChannel", "none");
    }
}

function RequestStatus_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var statusCode = formContext.getAttribute(fields.requestStatus).getValue();
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    //if (requestTypeCode == requestType.ComplaintAgainstTRA) {
    if (currentStatusCode == requestStatus.PendingOnCSR || currentStatusCode == requestStatus.PendingonRelevantDepartment ||
        currentStatusCode == requestStatus.PendingonRelevantDepartmentFinalFeedback || currentStatusCode == requestStatus.PendingonSuggestionCommitteeFeedback ||
        currentStatusCode == requestStatus.PendingonSuggestionCommitteeFeedbackonExtension || currentStatusCode == requestStatus.PendingonSuggestionsCommitteeDecision) {
        //disable fields
        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);
        DisableTab(ExecutionContext, "SmsSpamTab", true);

        if (requestTypeCode == requestType.DisputeWithServiceProvider) {
            //DisableTab(ExecutionContext , "ServiceProviderFeedback", true);
            DisableFieldControls(ExecutionContext, fields.ServiceProviderOutcome, true);
            //DisableTab(ExecutionContext , "DisputeDeptFeedback", false);
            DisableFieldControls(ExecutionContext, fields.DRFeedback, false);
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
            //DisableGrid("DisputesSubServices_SubGrid"); // is added to hidden section
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, true);
            DisableFieldControls(ExecutionContext, fields.IsResolvedByServiceProvider, true);
        } else if (requestTypeCode == requestType.SMSSpam) {

            DisableFieldControls(ExecutionContext, fields.ServiceProviderOutcome, true);
            DisableFieldControls(ExecutionContext, fields.DRFeedback, false);
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, true);
            DisableFieldControls(ExecutionContext, fields.IsResolvedByServiceProvider, true);
        }
        else {
            DisableFieldControls(ExecutionContext, fields.DRFeedback, false);
            if (requestTypeCode == requestType.suggestion) {
                //SetTabVisibility(ExecutionContext, "SuggestionCategory", true);
                //DisableTab(ExecutionContext, "SuggestionCategory", true);
            }
        }


    }
    else if (currentStatusCode == requestStatus.PendingOnCustomerCare) {
        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableSection(ExecutionContext, "DisputeRequestDetails", true);
        DisableTab(ExecutionContext, "SmsSpamTab", true);
        if (requestTypeCode == requestType.DisputeWithServiceProvider) {
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
            //DisableGrid("DisputesSubServices_SubGrid");  // is added to hidden section
        } else if (requestTypeCode == requestType.suggestion) {
            //SetTabVisibility(ExecutionContext, "SuggestionCategory", true);
            //DisableTab(ExecutionContext, "SuggestionCategory", false);
        }

        SetTabVisibility(ExecutionContext, "Comments", false);

    }
    else if (currentStatusCode == requestStatus.PendingOnServiceProvider) {
        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);
        SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
        //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
        DisableTab(ExecutionContext, "SmsSpamTab", true);

        //DisableTab(ExecutionContext , "DisputeDeptFeedback", true);
        //DisableTab(ExecutionContext , "ServiceProviderFeedback", false);
        DisableFieldControls(ExecutionContext, fields.ServiceProviderOutcome, false);
        DisableFieldControls(ExecutionContext, fields.IsResolvedByServiceProvider, false);
        DisableFieldControls(ExecutionContext, fields.DRFeedback, true);

        if (requestTypeCode == requestType.SMSSpam) {
            SetFieldVisibility(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //SetFieldVisibility(ExecutionContext , fields.SMSReferenceNumber, true);
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, false);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, false);
        }
        else {
            SetFieldVisibility(ExecutionContext, fields.SMSServiceProviderDecision, false);
            //SetFieldVisibility(ExecutionContext , fields.SMSReferenceNumber, false);
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, true);
        }


        SetTabVisibility(ExecutionContext, "Comments", false);

    }
    else if (currentStatusCode == requestStatus.PendingOnCustomerCareFinalFeedback || currentStatusCode == requestStatus.Resolved) {
        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);
        // formContext.getControl("ldv_disputeservicecategory").setDisabled(false);
        // formContext.getControl("ldv_disputesubservicecategory").setDisabled(false);
        DisableTab(ExecutionContext, "SmsSpamTab", true);

        if (requestTypeCode == requestType.DisputeWithServiceProvider) {
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
            //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
        } else if (requestTypeCode == requestType.suggestion) {
            //SetTabVisibility(ExecutionContext, "SuggestionCategory", true);
            //DisableTab(ExecutionContext, "SuggestionCategory", true);
        }

        //DisableTab(ExecutionContext , "DisputeDeptFeedback", true);
        //DisableTab(ExecutionContext , "ServiceProviderFeedback", true);
        DisableFieldControls(ExecutionContext, fields.ServiceProviderOutcome, true);
        DisableFieldControls(ExecutionContext, fields.IsResolvedByServiceProvider, true);
        if (requestTypeCode == requestType.SMSSpam) {
            SetFieldVisibility(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //SetFieldVisibility(ExecutionContext , fields.SMSReferenceNumber, true);
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, true);
        }
        else {
            SetFieldVisibility(ExecutionContext, fields.SMSServiceProviderDecision, false);
            //SetFieldVisibility(ExecutionContext , fields.SMSReferenceNumber, false);
            DisableFieldControls(ExecutionContext, fields.SMSServiceProviderDecision, true);
            //DisableFieldControls(ExecutionContext , fields.SMSReferenceNumber, true);
        }

        DisableFieldControls(ExecutionContext, fields.DRFeedback, true);

        SetTabVisibility(ExecutionContext, "Comments", false);
        //  DisableGrid("DisputesSubServices_SubGrid");
        //DisableGrid("ComplaintCategory_SubGrid");


        //var smsServiceProviderDecision = formContext.getAttribute(fields.SMSServiceProviderDecision).getValue();
        //if (smsServiceProviderDecision == SMSServiceProviderDecision.RouteTotheOtherServiceProvider) {
        //    DisableFieldControls(ExecutionContext , fields.ServiceProvider, false);
        //} else {
        //    DisableFieldControls(ExecutionContext , fields.ServiceProvider, true);
        //}

    }
    else if (currentStatusCode == requestStatus.pendingOnApplicant) {
        DisableTab(ExecutionContext, "General", true);
        EnableField(ExecutionContext, fields.AddAdditionalContactDetails);
        EnableField(ExecutionContext, fields.AdditionalEmail);
        EnableField(ExecutionContext, fields.AdditionalMobile);

        EnableTab(ExecutionContext, "ComplaintAgainstTRADetails");
        DisableField(ExecutionContext, fields.complaintType);
        DisableSection(ExecutionContext, "ComplaintApplicantFeedback", true);

        EnableTab(ExecutionContext, "InquiryDetails");
        DisableField(ExecutionContext, fields.inquiryType);
        DisableSection(ExecutionContext, "InquiryApplicantFeedback", true);

        EnableTab(ExecutionContext, "SuggestionDetails");
        //EnableTab(ExecutionContext, "SuggestionOptionalDetails");
        DisableField(ExecutionContext, fields.suggestionType);
        DisableSection(ExecutionContext, "SuggestionApplicantFeedback", true);

        EnableTab(ExecutionContext, "DisputeDetails");
        DisableField(ExecutionContext, fields.ServiceProvider);
        DisableSection(ExecutionContext, "DisputeApplicantFeedback", true);
        DisableSection(ExecutionContext, "SMSSpamApplicantFeedback", true);

        EnableTab(ExecutionContext, "SmsSpamTab");

        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        // DisableGrid("DisputesSubServices_SubGrid");
        //DisableGrid("ComplaintCategory_SubGrid");

    }
    else if (currentStatusCode == requestStatus.closed) {
        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        // DisableGrid("DisputesSubServices_SubGrid");
        //DisableGrid("ComplaintCategory_SubGrid");
    }
    else if (currentStatusCode == requestStatus.ReOpened) {
        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);
        DisableTab(ExecutionContext, "SmsSpamTab", true);

        SetTabVisibility(ExecutionContext, "ReOpen", true);

        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        if (requestTypeCode == requestType.DisputeWithServiceProvider) {
            SetSectionVisibility(ExecutionContext, "DisputeDetails", "DisputeCategory", true);
            //DisableGrid("DisputesSubServices_SubGrid");  // is added to hidden section
            //DisableGrid("ComplaintCategory_SubGrid");
        } else if (requestTypeCode == requestType.suggestion) {
            //SetTabVisibility(ExecutionContext, "SuggestionCategory", true);
            //DisableTab(ExecutionContext, "SuggestionCategory", true);
        }
    }

    //if (currentStatusCode != requestStatus.draft && currentStatusCode != requestStatus.PendingOnServiceProvider) {
    //    SetTabVisibility(ExecutionContext , "Comments", true);
    //}

    /*inquiry*/
    //if (requestTypeCode == requestType.inquiry) {
    //    if (currentStatusCode == requestStatus.PendingonRelevantDepartment || currentStatusCode == requestStatus.closed) {
    //        SetTabVisibility(ExecutionContext , "InquiryFeedback", true);
    //        SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryDeptFeedback", true);
    //    }
    //}

    /*dispute*/
    //*if (currentStatusCode == requestStatus.PendingOnTDA || formContext.getAttribute(fields.TDAFeedback).getValue() != null) {
    //    SetTabVisibility(ExecutionContext , "TDAFeedback", true);
    //}

    //*if (currentStatusCode == requestStatus.PendingOnCATFinalFeedback || formContext.getAttribute(fields.CATResponse).getValue() != null) {
    //    SetTabVisibility(ExecutionContext , "CATFinalFeedback", true);
    //}

    //*if (currentStatusCode == requestStatus.PendingOnTDAtoReviewServiceProviderFeedback || formContext.getAttribute(fields.TDAResponse).getValue() != null) {
    //    SetTabVisibility(ExecutionContext , "TDAFinalFeedback", true);
    //}

    if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) {
        if (currentStatusCode == requestStatus.PendingOnServiceProviderLead || currentStatusCode == requestStatus.PendingOnServiceProvider || formContext.getAttribute(fields.IsResolvedByServiceProvider).getValue() != null) {
            SetTabVisibility(ExecutionContext, "ServiceProviderFeedback", true);
        }
        if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) {
            if (currentStatusCode == requestStatus.PendingonRelevantDepartment || formContext.getAttribute(fields.DRFeedback).getValue() != null) {
                SetTabVisibility(ExecutionContext, "DisputeDeptFeedback", true);
            }
        }

        if (formContext.getAttribute(fields.AgentComment).getValue() != null) {
            SetTabVisibility(ExecutionContext, "AgentComment", true);
        }
    }
    else {
        if (currentStatusCode == requestStatus.PendingonRelevantDepartment || formContext.getAttribute(fields.DRFeedback).getValue() != null) {
            SetTabVisibility(ExecutionContext, "DeptFeedback", true);
        }
    }
}

function DidYouSubmitComplaintToServiceProvider_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    if (formContext.getAttribute(fields.DidYouSubmitComplaint).getValue() == 1) {
        setFieldControlsVisibility(ExecutionContext, fields.DoYouHaveReferenceNumber, true);
        SetFieldRequiredLevel(ExecutionContext, fields.DoYouHaveReferenceNumber, "required");
        DoYouHaveReferenceNumber_OnChange(ExecutionContext);
    }
    else {
        setFieldControlsVisibility(ExecutionContext, fields.DoYouHaveReferenceNumber, false);
        SetFieldRequiredLevel(ExecutionContext, fields.DoYouHaveReferenceNumber, "none");

        setFieldControlsVisibility(ExecutionContext, fields.RefernceNumber, false);
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumber, "none");

        setFieldControlsVisibility(ExecutionContext, fields.RefernceNumberOptions, false);
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumberOptions, "none");
        ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumberOptions, "5001");

    }
}

function DoYouHaveReferenceNumber_OnChange(ExecutionContext) {

    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var activeStg = formContext.data.process.getActiveStage().getName();
    if (formContext.getAttribute(fields.DoYouHaveReferenceNumber).getValue() == 1) {
        // setFieldControlsVisibility(ExecutionContext, fields.RefernceNumber, true);
        setFieldControlsVisibility(ExecutionContext, fields.RefernceNumberOptions, true);
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumber, "required");
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumberOptions, "required");
        //if (formContext.getAttribute(fields.RefernceNumber) != null && formContext.getAttribute(fields.RefernceNumber).getValue() != null)
        //    ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumber, "5001");
        //else
        //    SetNotificationFieldControls(ExecutionContext, fields.RefernceNumber, "Please enter the reference number of the complaint submitted to service provider if any", "5001");
        //formContext.ui.clearFormNotification('RequestsWithoutReference');
        debugger
        if (formContext.getAttribute(fields.RefernceNumber) != null && formContext.getAttribute(fields.RefernceNumber).getValue() != null)
            ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumberOptions, "5001");
        else
            SetNotificationFieldControls(ExecutionContext, fields.RefernceNumberOptions, "Please enter the reference number of the complaint submitted to service provider if any", "5001");
        if (activeStg == "Rollback Case") {
            ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumberOptions, "5001");
        }
        formContext.ui.clearFormNotification('RequestsWithoutReference');
    }
    else if (formContext.getAttribute(fields.DoYouHaveReferenceNumber).getValue() == 2) {
        //  setFieldControlsVisibility(ExecutionContext, fields.RefernceNumber, false);
        setFieldControlsVisibility(ExecutionContext, fields.RefernceNumberOptions, false);
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumber, "none");
        //ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumber, "5001");
        formContext.getAttribute(fields.RefernceNumber).setValue(null);
        formContext.getAttribute(fields.RefernceNumberOptions).setValue(null);

        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumberOptions, "none");
        ClearNotificationFieldControls(ExecutionContext, fields.RefernceNumberOptions, "5001");
        var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
        if (currentStatusCode == requestStatus.draft) {
            formContext.ui.setFormNotification("Requests without reference numbers shall take more time to be investigated", "INFO", "RequestsWithoutReference");
        }
    }
    else {
        //  setFieldControlsVisibility(ExecutionContext, fields.RefernceNumber, false);
        setFieldControlsVisibility(ExecutionContext, fields.RefernceNumberOptions, false);
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumber, "none");
        SetFieldRequiredLevel(ExecutionContext, fields.RefernceNumberOptions, "none");
        formContext.ui.clearFormNotification('RequestsWithoutReference');
    }
}

function EmployeeDept_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var employeeDeptId = GetLookupObject(ExecutionContext, fields.EmployeeDept);

    if (IsNull(employeeDeptId)) {
        SetFieldVisibility(ExecutionContext, fields.OthersEmployeeDept, false);
        SetFieldRequiredLevel(ExecutionContext, fields.OthersEmployeeDept, "none");
    }
    else {
        var employeeDept = RetrieveOdataObject(formContext, employeeDeptId, "ldv_employeesdepartments");

        if (!IsNull(employeeDept)) {
            //Employee Dept value
            if (!(IsNull(employeeDept.ldv_code))) {
                if (employeeDept.ldv_code == 4) { //Others
                    SetFieldVisibility(ExecutionContext, fields.OthersEmployeeDept, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.OthersEmployeeDept, "required");
                }
                else {
                    SetFieldVisibility(ExecutionContext, fields.OthersEmployeeDept, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.OthersEmployeeDept, "none");
                }
            }
        }
    }
}

function AddAdditionalContactDetails_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    if (formContext.getAttribute(fields.AddAdditionalContactDetails).getValue()) {
        SetFieldVisibility(ExecutionContext, fields.AdditionalEmail, true);
        //SetFieldRequiredLevel(ExecutionContext , fields.AdditionalEmail, "required");
        SetFieldVisibility(ExecutionContext, fields.AdditionalMobile, true);
        //SetFieldRequiredLevel(ExecutionContext , fields.AdditionalMobile, "required");
    }
    else {
        //SetFieldVisibility(ExecutionContext, fields.AdditionalEmail, false);
        SetFieldVisibility(ExecutionContext, fields.AdditionalEmail, false, false);
        //SetFieldRequiredLevel(ExecutionContext , fields.AdditionalEmail, "none");
        //SetFieldVisibility(ExecutionContext, fields.AdditionalMobile, false);
        SetFieldVisibility(ExecutionContext, fields.AdditionalMobile, false, false);
        // SetFieldRequiredLevel(ExecutionContext , fields.AdditionalMobile, "none");
    }
}

//function CSRDecision_OnChange_CT() {

//    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

//    if (requestTypeCode == requestType.ComplaintAgainstTRA) {

//        if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.sendBack) {
//            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
//            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRReason", true);
//            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRFeedback", false);

//            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "required");
//            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");
//        }
//        else if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.assessComplaint) {
//            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
//            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRFeedback", true);
//            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRReason", false);

//            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, true);
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "required");
//            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
//        }
//        else {
//            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", false);

//            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");

//            if (formContext.getAttribute(fields.CSRReason).getValue() == null) {
//                setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
//            }
//            else {
//                SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
//                SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRReason", true);
//                SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintCSRFeedback", false);

//                setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
//            }
//            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
//        }

//    }
//}

function CSRDecision_OnChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);

    if (requestTypeCode != requestType.DisputeWithServiceProvider && requestTypeCode != requestType.SMSSpam && requestTypeCode != requestType.TechnicalSupportComplaint) {

        if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.RouteteDepartment) {
            ShowNextStageUCI(false);
            // Hide BPF Finish Btn
            SetTabVisibility(ExecutionContext, "CSRFeedback", false);
            SetTabVisibility(ExecutionContext, "AgentComment", false);

            setFieldControlsVisibility(ExecutionContext, fields.department, true);
            setFieldControlsVisibility(ExecutionContext, fields.department2, true);
            setFieldControlsVisibility(ExecutionContext, fields.department3, true);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "required");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------
            //if (formContext.getAttribute(fields.department).getValue() != null) {
            var departmentName = (formContext.getAttribute(fields.department).getValue()) != null ?
                formContext.getAttribute(fields.department).getValue()[0].name : "";
            var departmentName2 = (formContext.getAttribute(fields.department2).getValue()) != null ?
                (formContext.getAttribute(fields.department2).getValue())[0].name : "";
            var departmentName3 = formContext.getAttribute(fields.department3).getValue() != null ?
                formContext.getAttribute(fields.department3).getValue()[0].name : "";
            if (departmentName === "MBME" || departmentName2 === "MBME" || departmentName3 === "MBME") {
                setFieldControlsVisibility(ExecutionContext, fields.AgentComment, true);
                SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "required");
                SetTabVisibility(ExecutionContext, "AgentComment", true);

            }
            //}
            SetTabVisibility(ExecutionContext, "Comments", false);
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
            ValidFieldVisibility(ExecutionContext)

        }
        else if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.assessComplaint) {
            ShowFinishButtonInUCI(false);

            SetTabVisibility(ExecutionContext, "CSRFeedback", true);
            ValidFieldVisibility(ExecutionContext)
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "required");
            if (formContext.getAttribute(fields.LastCallStatus).getValue() != null) {
                setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, true);
            }
            else setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            SetTabVisibility(ExecutionContext, "AgentComment", false);
            SetTabVisibility(ExecutionContext, "Comments", true);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            //---------------------------------------------------
            // AI Request Type
            if (formContext.getAttribute(fields.requestType).getValue() == requestType.suggestion) {
                var airequesttypeAttribute = formContext.getAttribute("ldv_airequesttype");
                if (airequesttypeAttribute) {
                    formContext.getControl("header_process_ldv_airequesttype").setVisible(true);

                }

            }
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
        }
        else if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.SetOnHold) {
            ValidFieldVisibility(ExecutionContext)

            SetTabVisibility(ExecutionContext, "CSRFeedback", false);
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            SetTabVisibility(ExecutionContext, "AgentComment", false);
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, true);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "required");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, true);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "required");
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------
            //on hold reason 
            if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "none");
                setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReasonHeader, false);
            }

            if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "none");
                setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, false);
            }

            setFieldControlsVisibility(ExecutionContext, fields.OnHoldReason, true);
            SetFieldRequiredLevel(ExecutionContext, fields.OnHoldReason, "required");

        }
        else if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.RouteToIVR) {
            ValidFieldVisibility(ExecutionContext)

            //  SetTabVisibility(ExecutionContext , "CSRFeedback", false);
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            SetTabVisibility(ExecutionContext, "AgentComment", false);
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, true);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            //---------------------------------------------------
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);

        }
        else {
            ValidFieldVisibility(ExecutionContext)

            SetTabVisibility(ExecutionContext, "CSRFeedback", false);

            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");

            SetTabVisibility(ExecutionContext, "AgentComment", false);
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");

            // AI Request Type 
            setFieldControlsVisibility(ExecutionContext, fields.AiRequestType, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AiRequestType, "none");
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);

        }
    }
    else if (requestTypeCode == requestType.TechnicalSupportComplaint) {
        SetTabVisibility(ExecutionContext, "CSRFeedback", false);

        setFieldControlsVisibility(ExecutionContext, fields.department, false);
        setFieldControlsVisibility(ExecutionContext, fields.department2, false);
        setFieldControlsVisibility(ExecutionContext, fields.department3, false);
        SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
        setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
        SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
        setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
        SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
        setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
        SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");

        SetTabVisibility(ExecutionContext, "AgentComment", false);
        SetTabVisibility(ExecutionContext, "Comments", false);
        setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
        SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
        setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
        SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
        setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
        SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

        // added by hesham
        setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
        SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
        //---------------------------------------------------
        setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
        SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");

        // AI Request Type 
        setFieldControlsVisibility(ExecutionContext, fields.AiRequestType, false);
        SetFieldRequiredLevel(ExecutionContext, fields.AiRequestType, "none");
        //on hold reason 
        hideAndClear_onholdreasonfields(ExecutionContext);

        // Show CustomerSatisfactionComment & CustomerSatisfactionSurvey
        // Remove Duplicated Case , and Test Case Option
        // Lock Fields
        var customerSatisfactionSurveyBPF = formContext.getControl('header_process_' + fields.CustomerSatisfactionSurvey);
        if (customerSatisfactionSurveyBPF != null) {
            customerSatisfactionSurveyBPF.setVisible(true);
            customerSatisfactionSurveyBPF.removeOption(4);// Test Case
            customerSatisfactionSurveyBPF.removeOption(5);// Duplicated Case
            customerSatisfactionSurveyBPF.setDisabled(true);
        }
        var customerSatisfactionSurveyBPF_1 = formContext.getControl('header_process_' + fields.CustomerSatisfactionSurvey + '_1');
        if (customerSatisfactionSurveyBPF_1 != null) {
            customerSatisfactionSurveyBPF_1.setVisible(true);
            customerSatisfactionSurveyBPF_1.removeOption(4);// Test Case
            customerSatisfactionSurveyBPF_1.removeOption(5);// Duplicated Case
            customerSatisfactionSurveyBPF_1.setDisabled(true);
        }
        var customerSatisfactionCommentBPF = formContext.getControl('header_process_' + fields.CustomerSatisfactionComment);
        if (customerSatisfactionCommentBPF != null) {
            customerSatisfactionCommentBPF.setVisible(true);
            customerSatisfactionCommentBPF.setDisabled(true);
        }
        var customerSatisfactionCommentBPF_1 = formContext.getControl('header_process_' + fields.CustomerSatisfactionComment + '_1');
        if (customerSatisfactionCommentBPF_1 != null) {
            customerSatisfactionCommentBPF_1.setVisible(true);
            customerSatisfactionCommentBPF_1.setDisabled(true);
        }



    }
}


/*function CSRDecision_OnChange_I() {
    
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.inquiry) {

        if (formContext.getAttribute(fields.inquiryCSRDecision).getValue() == inquiryDecision.SendBack) {
            SetTabVisibility(ExecutionContext , "InquiryFeedback", true);
            SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRReason", true);
            SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "required");
            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext , fields.department, false);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "none");

            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
            SetTabVisibility(ExecutionContext , "Comments", true);
        }
        else if (formContext.getAttribute(fields.inquiryCSRDecision).getValue() == inquiryDecision.AddFeedback) {
            SetTabVisibility(ExecutionContext , "InquiryFeedback", true);
            SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRFeedback", true);
            SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRReason", false);

            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "required");
            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
            setFieldControlsVisibility(ExecutionContext , fields.department, false);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "none");

            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
            SetTabVisibility(ExecutionContext , "Comments", true);
        }
        else if (formContext.getAttribute(fields.inquiryCSRDecision).getValue() == inquiryDecision.RouteteDepartment) {
            SetTabVisibility(ExecutionContext , "InquiryFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.department, true);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "required");
            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");

            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
            SetTabVisibility(ExecutionContext , "Comments", false);
        }
        else {
            SetTabVisibility(ExecutionContext , "InquiryFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext , fields.department, false);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "none");

            if (formContext.getAttribute(fields.CSRReason).getValue() == null) {
                setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
                //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
                SetTabVisibility(ExecutionContext , "Comments", false);
            }
            else {
                SetTabVisibility(ExecutionContext , "InquiryFeedback", true);
                SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRReason", true);
                SetSectionVisibility( ExecutionContext , "InquiryFeedback", "InquiryCSRFeedback", false);

                setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
            }
            SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
        }
    }
}

function DRDecision_OnChange() {
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.ComplaintAgainstTRA) {
        if (formContext.getAttribute(fields.DRDecision).getValue() == complaintDecision.sendBack) {
            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptReason", true);
            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.DRReason, true);
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "required");
            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "none");
        }
        else if (formContext.getAttribute(fields.DRDecision).getValue() == complaintDecision.assessComplaint) {
            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptFeedback", true);
            SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptReason", false);

            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "required");
            setFieldControlsVisibility(ExecutionContext , fields.DRReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "none");
        }
        else {
            SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "none");

            if (formContext.getAttribute(fields.DRReason).getValue() == null) {
                setFieldControlsVisibility(ExecutionContext , fields.DRReason, false);
            }
            else {
                SetTabVisibility(ExecutionContext , "ComplaintAgainstTRAFeedback", true);
                SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptFeedback", false);
                SetSectionVisibility( ExecutionContext , "ComplaintAgainstTRAFeedback", "ComplaintDeptReason", true);

                setFieldControlsVisibility(ExecutionContext , fields.DRReason, true);
            }
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "none");
        }
    }
}

function SCDecision_OnChange_Initial() {

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {

        if (formContext.getAttribute(fields.SCInitDecision).getValue() == suggestionInitialDecision.sendBack) {
            SetTabVisibility(ExecutionContext , "SuggestionInitialFeedback", true);

            setFieldControlsVisibility(ExecutionContext , fields.SCReason, true);
            SetFieldRequiredLevel(ExecutionContext , fields.SCReason, "required");

            setFieldControlsVisibility(ExecutionContext , fields.SuggestionCategory, false);
            SetFieldRequiredLevel(ExecutionContext , fields.SuggestionCategory, "none");
            setFieldControlsVisibility(ExecutionContext , fields.department, false);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "none");
            if (formContext.getAttribute(fields.SuggestionCategory).getValue() != null) {
                formContext.getAttribute(fields.SuggestionCategory).setValue(null);
            }

            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
            SetTabVisibility(ExecutionContext , "Comments", true);
        }
        else if (formContext.getAttribute(fields.SCInitDecision).getValue() == suggestionInitialDecision.assessSuggestion) {
            SetTabVisibility(ExecutionContext , "SuggestionInitialFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.SuggestionCategory, true);
            SetFieldRequiredLevel(ExecutionContext , fields.SuggestionCategory, "required");
            SuggestionCategory_OnChange();

            setFieldControlsVisibility(ExecutionContext , fields.SCReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.SCReason, "none");

            // SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
            SetTabVisibility(ExecutionContext , "Comments", false);
        }
        else {
            setFieldControlsVisibility(ExecutionContext , fields.SuggestionCategory, false);
            SetFieldRequiredLevel(ExecutionContext , fields.SuggestionCategory, "none");
            setFieldControlsVisibility(ExecutionContext , fields.department, false);
            SetFieldRequiredLevel(ExecutionContext , fields.department, "none");
            if (formContext.getAttribute(fields.SuggestionCategory).getValue() != null) {
                formContext.getAttribute(fields.SuggestionCategory).setValue(null);
            }

            if (formContext.getAttribute(fields.SCReason).getValue() == null) {
                SetTabVisibility(ExecutionContext , "SuggestionInitialFeedback", false);
                setFieldControlsVisibility(ExecutionContext , fields.SCReason, false);
                //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
                SetTabVisibility(ExecutionContext , "Comments", false);
            }
            else {
                SetTabVisibility(ExecutionContext , "SuggestionInitialFeedback", true);
                setFieldControlsVisibility(ExecutionContext , fields.SCReason, true);
            }

        }
    }
}*/

function SuggestionCategory_OnChange(ExecutionContext) {

    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {
        var suggestionCategoryCode = formContext.getAttribute(fields.SuggestionCategory).getValue();

        if (suggestionCategoryCode == suggestionCategory.Valid_Tangible || suggestionCategoryCode == suggestionCategory.Valid_Intangible || suggestionCategoryCode == suggestionCategory.UnderStudy) {
            //   setFieldControlsVisibility(ExecutionContext , fields.department, true);
            //SetFieldRequiredLevel(ExecutionContext , fields.department, "required");

            if (suggestionCategoryCode == suggestionCategory.UnderStudy && formContext.getAttribute(fields.IsSendBack).getValue() == false) {
                setFieldControlsVisibility(ExecutionContext, fields.DRInitialDecision, true);
                //SetFieldRequiredLevel(ExecutionContext , fields.DRInitialDecision, "required");
            }
            else {
                setFieldControlsVisibility(ExecutionContext, fields.DRInitialDecision, false);
                SetFieldRequiredLevel(ExecutionContext, fields.DRInitialDecision, "none");
            }

            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
            SetTabVisibility(ExecutionContext, "Comments", false);
        }
        else {
            // setFieldControlsVisibility(ExecutionContext , fields.department, false);
            // SetFieldRequiredLevel(ExecutionContext , fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.DRInitialDecision, false);
            SetFieldRequiredLevel(ExecutionContext, fields.DRInitialDecision, "none");

            if (suggestionCategoryCode != null) {
                //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
                SetTabVisibility(ExecutionContext, "Comments", true);
            }

        }
    }
}

/*
function DeptInitialDecision_OnChange() {

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {
        var suggestionCategoryCode = formContext.getAttribute(fields.SuggestionCategory).getValue();

        if (suggestionCategoryCode == suggestionCategory.UnderStudy && formContext.getAttribute(fields.IsSendBack).getValue() == false) {
            var deptInitialDecisionCode = formContext.getAttribute(fields.DRInitialDecision).getValue();

            if (deptInitialDecisionCode == deptInitialDecision.TobeImplemented) {
                SetTabVisibility(ExecutionContext , "DepartmentInitialFeedback", true);

                setFieldControlsVisibility(ExecutionContext , fields.DateofImplementation, true);
                SetFieldRequiredLevel(ExecutionContext , fields.DateofImplementation, "required");
                setFieldControlsVisibility(ExecutionContext , fields.ActionPlan, true);
                SetFieldRequiredLevel(ExecutionContext , fields.ActionPlan, "required");

                //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
                SetTabVisibility(ExecutionContext , "Comments", false);
            }
            else {
                SetTabVisibility(ExecutionContext , "DepartmentInitialFeedback", false);

                setFieldControlsVisibility(ExecutionContext , fields.DateofImplementation, false);
                SetFieldRequiredLevel(ExecutionContext , fields.DateofImplementation, "none");
                setFieldControlsVisibility(ExecutionContext , fields.ActionPlan, false);
                SetFieldRequiredLevel(ExecutionContext , fields.ActionPlan, "none");

                if (deptInitialDecisionCode != null) {
                    //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
                    SetTabVisibility(ExecutionContext , "Comments", true);
                }
                else {
                    //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
                    SetTabVisibility(ExecutionContext , "Comments", false);
                }
            }
        }
        else if (suggestionCategoryCode == suggestionCategory.Valid_Tangible || suggestionCategoryCode == suggestionCategory.Valid_Intangible) {
            SetTabVisibility(ExecutionContext , "DepartmentInitialFeedback", true);

            setFieldControlsVisibility(ExecutionContext , fields.DateofImplementation, true);
            SetFieldRequiredLevel(ExecutionContext , fields.DateofImplementation, "required");
            setFieldControlsVisibility(ExecutionContext , fields.ActionPlan, true);
            SetFieldRequiredLevel(ExecutionContext , fields.ActionPlan, "required");

        }
    }
}

function SCDecision_OnChange_Plan() {

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {

        if (formContext.getAttribute(fields.SCDecision).getValue() == suggestionDecision.sendBack) {
            SetTabVisibility(ExecutionContext , "SuggestionFeedbackonPlan", true);

            setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnPlan, true);
            SetFieldRequiredLevel(ExecutionContext , fields.SCReasonOnPlan, "required");

        }
        else {

            if (formContext.getAttribute(fields.SCReasonOnPlan).getValue() == null) {
                SetTabVisibility(ExecutionContext , "SuggestionFeedbackonPlan", false);
                setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnPlan, false);
            }
            else {
                SetTabVisibility(ExecutionContext , "SuggestionFeedbackonPlan", true);
                setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnPlan, true);
            }
            SetFieldRequiredLevel(ExecutionContext , fields.SCReasonOnPlan, "none");
        }
    }
}

function DeptFinalAction_OnChange() {

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {
        var deptFinalActionCode = formContext.getAttribute(fields.DRFinalAction).getValue();

        if (deptFinalActionCode == deptFinalAction.SubmitFeedback) {
            SetTabVisibility(ExecutionContext , "DepartmentFinalFeedback", true);
            SetSectionVisibility( ExecutionContext , "DepartmentFinalFeedback", "DepartmentFeedback", true);
            SetSectionVisibility( ExecutionContext , "DepartmentFinalFeedback", "DepartmentReason", false);

            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "required");
            setFieldControlsVisibility(ExecutionContext , fields.DRReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "none");
            setFieldControlsVisibility(ExecutionContext , fields.NewDateofImplementation, false);
            SetFieldRequiredLevel(ExecutionContext , fields.NewDateofImplementation, "none");
        }
        else if (deptFinalActionCode == deptFinalAction.RequestforExtension) {
            SetTabVisibility(ExecutionContext , "DepartmentFinalFeedback", true);
            SetSectionVisibility( ExecutionContext , "DepartmentFinalFeedback", "DepartmentFeedback", false);
            SetSectionVisibility( ExecutionContext , "DepartmentFinalFeedback", "DepartmentReason", true);

            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext , fields.DRReason, true);
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "required");
            setFieldControlsVisibility(ExecutionContext , fields.NewDateofImplementation, true);
            SetFieldRequiredLevel(ExecutionContext , fields.NewDateofImplementation, "required");

        }
        else {
            SetTabVisibility(ExecutionContext , "DepartmentFinalFeedback", false);

            setFieldControlsVisibility(ExecutionContext , fields.DRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext , fields.DRReason, false);
            SetFieldRequiredLevel(ExecutionContext , fields.DRReason, "none");
            setFieldControlsVisibility(ExecutionContext , fields.NewDateofImplementation, false);
            SetFieldRequiredLevel(ExecutionContext , fields.NewDateofImplementation, "none");
        }
    }
}

function SCDecision_OnChange_Extension() {

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.suggestion) {

        if (formContext.getAttribute(fields.SCDecisionOnExtension).getValue() == suggestionExtensionDecision.reject) {
            SetTabVisibility(ExecutionContext , "SuggestionFeedbackOnExtension", true);

            setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnExtension, true);
            SetFieldRequiredLevel(ExecutionContext , fields.SCReasonOnExtension, "required");

        }
        else {

            if (formContext.getAttribute(fields.SCReasonOnExtension).getValue() == null) {
                SetTabVisibility(ExecutionContext , "SuggestionFeedbackOnExtension", false);
                setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnExtension, false);
            }
            else {
                SetTabVisibility(ExecutionContext , "SuggestionFeedbackOnExtension", true);
                setFieldControlsVisibility(ExecutionContext , fields.SCReasonOnExtension, true);
            }
            SetFieldRequiredLevel(ExecutionContext , fields.SCReasonOnExtension, "none");
        }
    }
}
*/
function DateofImplementation_OnChange(ExecutionContext) {
    CheckDateGreaterThanToday(ExecutionContext, fields.DateofImplementation);
}

function NewDateofImplementation_OnChange(ExecutionContext) {
    CheckDateGreaterThanToday(ExecutionContext, fields.NewDateofImplementation);
}

//function CustomerSatisfaction_OnChange() {
//    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

//    if (requestTypeCode == requestType.DisputeWithServiceProvider) {

//        if (formContext.getAttribute(fields.CustomerSatisfactionSurvey).getValue() == SatisfactionDecision.NotSatisfied)
//        {
//            SetTabVisibility(ExecutionContext , "CustomerSatisfactionSurvey", true);

//            setFieldControlsVisibility(ExecutionContext , fields.CustomerValidArgument, true);
//            SetFieldRequiredLevel(ExecutionContext , fields.CustomerValidArgument, "required");
//            setFieldControlsVisibility(ExecutionContext , fields.CustomerSatisfactionComment, true);
//        }
//        else
//        {
//            SetTabVisibility(ExecutionContext , "CustomerSatisfactionSurvey", false);

//            setFieldControlsVisibility(ExecutionContext , fields.CustomerValidArgument, false);
//            SetFieldRequiredLevel(ExecutionContext , fields.CustomerValidArgument, "none");
//            setFieldControlsVisibility(ExecutionContext , fields.CustomerSatisfactionComment, false);
//            SetFieldRequiredLevel(ExecutionContext , fields.CustomerSatisfactionComment, "none");
//        }
//    }
//}

function IsResolved_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    if (formContext.getAttribute(fields.IsResolvedByDepartment).getValue() != null) {
        SetFieldRequiredLevel(ExecutionContext, fields.DRFeedback, "required");
    }
}

function CSRDecision_OnChange_Dispute(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);

    if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) {
        //reset ClosedInFavorOf to default to check again
        SetFieldRequiredLevel(ExecutionContext, fields.ClosedInFavorOf, "none");
        setFieldControlsVisibility(ExecutionContext, fields.ClosedInFavorOf, false);

        if (formContext.getControl(fields.ClosedInFavorOfHeader) != null)
            formContext.getControl(fields.ClosedInFavorOfHeader).setVisible(false);

        if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() != CSRDecision.assessDispute) {
            formContext.getAttribute(fields.ClosedInFavorOf).setValue(null);

        }
        //to exclude requestType.SMSSpam
        if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.assessDispute && requestTypeCode == requestType.DisputeWithServiceProvider) {
            SetFieldRequiredLevel(ExecutionContext, fields.ClosedInFavorOf, "required");
            setFieldControlsVisibility(ExecutionContext, fields.ClosedInFavorOf, true);

            if (formContext.getControl(fields.ClosedInFavorOfHeader) != null)
                formContext.getControl(fields.ClosedInFavorOfHeader).setVisible(true);

            // Legal Note
            SetTabVisibility(ExecutionContext, "LegalNotes", true);
        }
        else {
            // Legal Note
            SetTabVisibility(ExecutionContext, "LegalNotes", false);
        }
        if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.RouteToDepartment) {
            if (requestTypeCode == requestType.DisputeWithServiceProvider) {
                SetTabVisibility(ExecutionContext, "DisputeCSRFeedback", false);
            }
            SetTabVisibility(ExecutionContext, "AgentComment", true);

            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");
            setFieldControlsVisibility(ExecutionContext, fields.department, true);
            setFieldControlsVisibility(ExecutionContext, fields.department2, true);
            setFieldControlsVisibility(ExecutionContext, fields.department3, true);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "required");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, true);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "required");
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, true, false);

        }
        else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.RouteToServiceProvider
            || formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.Escalatetolead) { /// Dispute CR :  Add new condition for "Escalate to lead"
            if (requestTypeCode == requestType.DisputeWithServiceProvider) {
                SetTabVisibility(ExecutionContext, "DisputeCSRFeedback", false);
                formContext.getAttribute(fields.department).setValue(null);
            }
            SetTabVisibility(ExecutionContext, "AgentComment", true);
            if (currentStatusCode == requestStatus.PendingOnServiceProvider)
                formContext.ui.tabs.get("AgentComment").sections.get("DisputeAgentCommentHistory").setVisible(true);

            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");

            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, true);
            // Dipute CR Updates 17/03/2024
            //if(formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.RouteToServiceProvider )
            //    SetFieldRequiredLevel(ExecutionContext , fields.AgentComment, "required");
            //else
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");

            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);

            // added for Dispute CR 17/03/2024
            // show Invalid flag and set Required
            /*if(formContext.getControl(fields.Invalid) != null )
            {
                //setFieldControlsVisibility(ExecutionContext , fields.Invalid, true);
                //SetFieldRequiredLevel(ExecutionContext , fields.Invalid, "required");
                formContext.getControl(fields.Invalid).setVisible(true);
                formContext.getControl(fields.Invalid).setRequiredLevel("required");
            }
            // show Route to SP Reasons and set required
            if(formContext.getControl(fields.RoutetoSpReasons) != null)
            {
                //setFieldControlsVisibility(ExecutionContext , fields.RoutetoSpReasons, true);
                //SetFieldRequiredLevel(ExecutionContext , fields.RoutetoSpReasons, "required");
                formContext.getControl(fields.RoutetoSpReasons).setVisible(true);
                formContext.getControl(fields.RoutetoSpReasons).setRequiredLevel("required");
            }*/
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, true, true);
        }
        else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.assessDispute) {
            if (requestTypeCode == requestType.DisputeWithServiceProvider) {
                SetTabVisibility(ExecutionContext, "DisputeCSRFeedback", true);
                SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "required");
            }
            SetTabVisibility(ExecutionContext, "AgentComment", false);

            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "required");

            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");

            SetTabVisibility(ExecutionContext, "Comments", true);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            if (formContext.getAttribute(fields.LastCallStatus).getValue() != null) {
                setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, true);
            } else setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");

            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            //---------------------------------------------------
            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, true, false);
        }
        else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.SetOnHold) {
            SetTabVisibility(ExecutionContext, "DisputeCSRFeedback", false);
            SetTabVisibility(ExecutionContext, "AgentComment", false);

            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");

            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, true);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "required");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, true);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "required");
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------

            //on hold reason
            if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "none");
                setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReasonHeader, false);
            }

            if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "none");
                setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, false);
            }
            if (requestTypeCode != requestType.SMSSpam) {
                setFieldControlsVisibility(ExecutionContext, fields.OnHoldReason, true);
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldReason, "required");
            }
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, false, false);
        }
        else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.RouteToIVR) {
            // SetTabVisibility(ExecutionContext , "CSRFeedback", false);
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            SetTabVisibility(ExecutionContext, "AgentComment", false);
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, true);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, true);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "required");
            //---------------------------------------------------

            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, true, false);
        }
        else {
            SetTabVisibility(ExecutionContext, "DisputeCSRFeedback", false);
            SetTabVisibility(ExecutionContext, "AgentComment", false);

            setFieldControlsVisibility(ExecutionContext, fields.department, false);
            setFieldControlsVisibility(ExecutionContext, fields.department2, false);
            setFieldControlsVisibility(ExecutionContext, fields.department3, false);
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            setFieldControlsVisibility(ExecutionContext, fields.CustomerSatisfactionSurvey, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CustomerSatisfactionSurvey, "none");
            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");
            setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
            SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
            SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "none");
            setFieldControlsVisibility(ExecutionContext, fields.ReturnDate, false);
            SetFieldRequiredLevel(ExecutionContext, fields.ReturnDate, "none");
            setFieldControlsVisibility(ExecutionContext, fields.SetOnHold, false);
            SetFieldRequiredLevel(ExecutionContext, fields.SetOnHold, "none");
            setFieldControlsVisibility(ExecutionContext, fields.LastCallStatus, false);
            SetFieldRequiredLevel(ExecutionContext, fields.LastCallStatus, "none");
            SetTabVisibility(ExecutionContext, "Comments", false);
            setFieldControlsVisibility(ExecutionContext, fields.IVRMessage, false);
            SetFieldRequiredLevel(ExecutionContext, fields.IVRMessage, "none");

            // added by hesham
            setFieldControlsVisibility(ExecutionContext, fields.CSRFeedback, false);
            SetFieldRequiredLevel(ExecutionContext, fields.CSRFeedback, "none");
            //---------------------------------------------------

            //on hold reason 
            hideAndClear_onholdreasonfields(ExecutionContext);
            Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, true, false);
        }
    }
}

//*function CSRDecision_OnChange_Dispute() {
/*var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
var currentStatusCode = GetCurrentStatusCode(ExecutionContext , fields.internalStatus);

if (requestTypeCode == requestType.DisputeWithServiceProvider) {

    if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.SendBack) {
        SetTabVisibility(ExecutionContext , "DisputeCSRFeedback", true);
        SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRReason", true);
        SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRResponse", false);

        setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "required");
        setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");

        //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
        SetTabVisibility(ExecutionContext , "Comments", true);
    }
    else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.RouteToCAT) {
        SetTabVisibility(ExecutionContext , "DisputeCSRFeedback", false);

        setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
        setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");

        if (currentStatusCode == requestStatus.PendingOnCSR) {
            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
            SetTabVisibility(ExecutionContext , "Comments", false);
        }
    }
    else if (formContext.getAttribute(fields.CSRDisputeDecision).getValue() == CSRDecision.assessDispute) {
        SetTabVisibility(ExecutionContext , "DisputeCSRFeedback", true);
        SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRResponse", true);
        SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRReason", false);

        setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");
        setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, true);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");

        //SetSectionVisibility( ExecutionContext , "Comments", "Comments", true);
        SetTabVisibility(ExecutionContext , "Comments", true);
    }
    else {
        SetTabVisibility(ExecutionContext , "DisputeCSRFeedback", false);

        if (formContext.getAttribute(fields.CSRReason).getValue() == null) {
            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, false);
            //SetSectionVisibility( ExecutionContext , "Comments", "Comments", false);
            SetTabVisibility(ExecutionContext , "Comments", false);
        }
        else {
            SetTabVisibility(ExecutionContext , "DisputeCSRFeedback", true);
            SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRReason", true);
            SetSectionVisibility( ExecutionContext , "DisputeCSRFeedback", "DisputeCSRResponse", false);

            setFieldControlsVisibility(ExecutionContext , fields.CSRReason, true);
        }
        SetFieldRequiredLevel(ExecutionContext , fields.CSRReason, "none");

        setFieldControlsVisibility(ExecutionContext , fields.CSRFeedback, false);
        SetFieldRequiredLevel(ExecutionContext , fields.CSRFeedback, "none");
    }
}
}*/

function ServiceCategory_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    formContext.getAttribute(fields.service).setValue(null);
    var serviceCatgId = GetLookupObject(ExecutionContext, fields.serviceCategory);

    if (IsNull(serviceCatgId)) {
        DisableFieldControls(ExecutionContext, fields.service, true);
    }
    else {
        DisableFieldControls(ExecutionContext, fields.service, false);
    }

}

function DisputeServiceCategory_OnChange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);

    if (requestTypeCode == requestType.DisputeWithServiceProvider) {
        // clear Dispute SubService Category and Dispute Sub Service Category Classification
        var formType = formContext.ui.getFormType();
        if (formType == 1) {
            var serviceCatgId = GetLookupObject(ExecutionContext, fields.DisputeServiceCategory);
            formContext.getAttribute(fields.DisputeSubServiceCategory).setValue("");
            formContext.getControl(fields.DisputeSubServiceCategory).setDisabled(false);


            formContext.getAttribute(fields.DisputeSubServiceCategoryClassification).setValue("");
            formContext.getControl(fields.DisputeSubServiceCategoryClassification).setDisabled(false);
        }


        if (!IsNull(serviceCatgId)) {

            var name = formContext.getAttribute(fields.DisputeServiceCategory).getValue()[0].name.toLowerCase();
            if (name == 'other') {
                setFieldControlsVisibility(ExecutionContext, fields.OthersDisputeService, true);
                SetFieldRequiredLevel(ExecutionContext, fields.OthersDisputeService, "required");
            }
            else {
                setFieldControlsVisibility(ExecutionContext, fields.OthersDisputeService, false);
                SetFieldRequiredLevel(ExecutionContext, fields.OthersDisputeService, "none");
            }
        }
        else {
            setFieldControlsVisibility(ExecutionContext, fields.OthersDisputeService, false);
            SetFieldRequiredLevel(ExecutionContext, fields.OthersDisputeService, "none");
        }
    }

    // Dispute CR - 17/03/2024 - set priority field


}

function Service_OnChange(ExecutionContext) {
    //debugger;
    forceRefreshServiceSurvey(ExecutionContext);

    /*var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.ComplaintAgainstTRA) {
        var serviceId = GetLookupObject(ExecutionContext , fields.service);
        if (!IsNull(serviceId)) {
            var serviceLists = ODataRequestJSONParsed("/ldv_serviceSet$filter=ldv_serviceId eq guid'" + serviceId + "'");
            if (serviceLists != null) {
                var serviceObj = serviceLists.results[0];
                if (serviceObj != null && serviceObj.ldv_Department != null) {
                    formContext.getAttribute(fields.department).setValue([{ id: serviceObj.ldv_Department.Id, name: serviceObj.ldv_Department.Name, entityType: serviceObj.ldv_Department.LogicalName }]);
                }
            }
        }
        else {
            formContext.getAttribute(fields.department).setValue(null);
        }
    }*/
}

function openCopiedCase(ExecutionContext) {

    setTimeout(function (ExecutionContext) {
        var caseId = GetLookupObject(ExecutionContext, fields.CopiedTo);
        if (!IsNull(caseId)) {
            //Xrm.Navigation.openForm("incident", caseId);
            var entityFormOptions = {};
            entityFormOptions["entityName"] = "incident";

            var formParameters = {};
            formParameters["incidentid"] = caseId;//"Sample";

            //Xrm.Navigation.openForm(entityFormOptions, formParameters);
            Xrm.Navigation.openForm("incident", caseId);
        }
    }, 5000);
}

//----------------------------- End On Change Events ----------------------------

//----------------------------- Validations ------------------------------------
function ValidateFutureDate(ExecutionContext, sourceField) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    formContext.getControl(sourceField).clearNotification();
    var date = new Date(formContext.getAttribute(sourceField).getValue());
    var today = new Date();
    if (date <= today) {
        //alert("BirthDay can't be in the future");
        formContext.getControl(sourceField).setNotification("Date must be in Future");
    }
}

function CheckDateGreaterThanToday(ExecutionContext, DateCntrlName) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var DateValue = formContext.getAttribute(DateCntrlName).getValue();
    var DateCntrl = GetBPFField(ExecutionContext, DateCntrlName);
    if (DateCntrl == null) {
        for (i = 1; i <= 3; i++) {
            DateCntrl = GetBPFField(ExecutionContext, DateCntrlName + i.toString());
            if (DateCntrl != null) {
                break;
            }
        }
    }

    if (DateCntrl == null) {
        DateCntrl = formContext.getControl(DateCntrlName);
    }

    if (DateCntrl != null) {
        DateCntrl.clearNotification();
    }

    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (DateValue != null) {

        // if (StartDate < todayDate) {
        var difference = DateValue - todayDate;
        var differenceInDays = difference / (24 * 60 * 60 * 1000);
        if (differenceInDays <= 0) {

            if (DateCntrl != null) {
                //DateCntrl.setNotification(GetMessage(ExecutionContext ,"General - DateLessThanOrEqualTodayError"));
                DateCntrl.setNotification("Date Cannot be less than Today");
            } else {
                //alert(GetMessage(ExecutionContext ,"General - DateLessThanOrEqualTodayError"));
                //alert(GetMessage(ExecutionContext, "Date Cannot be less than Today"));
                Xrm.Utility.alertDialog(GetMessage(ExecutionContext, "Date Cannot be less than Today"));

            }

            formContext.getAttribute(DateCntrlName).setValue(null);
            return;
        }

    }
}

function ValidateEmiratesMobile(ExecutionContext) {

    // Check prerequisites
    if (IsNull(ExecutionContext) || IsNull(ExecutionContext.getEventSource()))
        return;

    var evntSrc = ExecutionContext.getEventSource();

    ClearNotificationFieldControls(ExecutionContext, evntSrc.getName(), evntSrc.getName() + " " + "Mobile number should be in format (9715xxxxxxxx)");

    if (IsNull(evntSrc.getValue()))
        return;

    ValidateMobileNumber(ExecutionContext, evntSrc.getName());
}


//----------------------------- End Validations --------------------------------

//----------------------------- BP Functions -----------------------------------
function stage_change(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    setFieldControlsVisibility(ExecutionContext, fields.origin, false);
    CSRDecision_OnChange(ExecutionContext);
    //complaint
    //CSRDecision_OnChange_CT();
    //DRDecision_OnChange();
    //inquiry
    //CSRDecision_OnChange_I();
    //suggestion
    //SCDecision_OnChange_Initial();
    SuggestionCategory_OnChange(ExecutionContext);
    //DeptInitialDecision_OnChange();
    //SCDecision_OnChange_Plan();
    //DeptFinalAction_OnChange();
    //SCDecision_OnChange_Extension();
    //Dispute
    CSRDecision_OnChange_Dispute(ExecutionContext);
    //DisputeServiceCategory_OnChange();
    //CustomerSatisfaction_OnChange();


    var formType = formContext.ui.getFormType();
    if (formType != 1) {
        DisableSectionFields(ExecutionContext, "RequestInformation");
    }

    if (formType == 3 || formType == 4) {
        //disable form fields & grids
        DisableFormFieldsOnly(ExecutionContext);
        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        //DisableGrid("DisputesSubServices_SubGrid");  // is added to hidden section
        //DisableGrid("ComplaintCategory_SubGrid");
    }

    var activeStage = formContext.data.process.getActiveStage();
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var valid = formContext.getControl('header_process_' + fields.Valid);

    if (requestTypeCode == requestType.ComplaintAgainstTRA) {
        if (activeStage != null && activeStage.getName() == "Relevant Department Feedback") {
            if (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
            }
        } else if (activeStage != null && activeStage.getName() == "Customer Care Decision") {
            //valid.setRequiredLevel("true")
            //formContext.getAttribute("ldv_valid").setRequiredLevel("required");

        }
    }
    else if (requestTypeCode == requestType.inquiry) {
        if (activeStage != null && (activeStage.getName() == "Relevant Department Feedback" || activeStage.getName() == "Request Completed")) {
            if (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
            }
        }
    }
    else if (requestTypeCode == requestType.suggestion) {
        if (activeStage != null && (activeStage.getName() == "Suggestion Committee Initial Feedback" ||
            activeStage.getName() == "Suggestion Committeeâ€™S Feedback On Plan" || activeStage.getName() == "Suggestion Committee Feedback On Extension Request")) {
            if (!UserHasRole("Suggestion Committee") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
            }
        }
        else if (activeStage != null && (activeStage.getName() == "Department Initial Feedback" || activeStage.getName() == "Department Final Feedback")) {

            if (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
            }
        }
    }
    else if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) {
        if (activeStage != null && (activeStage.getName() == "CAT Initial Feedback" || activeStage.getName() == "CAT Final Feedback")) {
            if (!UserHasRole("Consumer Affairs (CAT)") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
                //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
                //DisableGrid("ComplaintCategory_SubGrid");
            }
        }
        else if (activeStage != null && (activeStage.getName() == "TDA Feedback" || activeStage.getName() == "TDA Final Feedback")) {
            if (!UserHasRole("Technology Development Affairs (TDA)") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
                //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
                //DisableGrid("ComplaintCategory_SubGrid");
            }
        }
        else if (activeStage != null && activeStage.getName() == "Service Provider Feedback") {
            if (!UserHasRole("Service Provider") && !UserHasRole("System Administrator")) {
                DisableFormFieldsOnly(ExecutionContext);
                //DisableGrid("internal_comment");

                //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
                //DisableGrid("Activities");
                //DisableGrid("Comment");
                //DisableGrid("DisputesSubServices_SubGrid");   // is added to hidden section
                //DisableGrid("ComplaintCategory_SubGrid");
            }
        }
    }
    //debugger;
    LockRelevantDepartmentFeedbackForm(ExecutionContext);
}

function BPFCallback(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    try {
        var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
        var activeStage = formContext.data.process.getActiveStage();

        if (currentStatusCode == requestStatus.closed)
            DisableStageFields(ExecutionContext, activeStage, true);
        else {
            var steps = activeStage.getSteps();

            for (var i = 0; i < steps.getLength(); i++) {
                var step = steps.get(i);
                if (!IsNull(step) && !IsNull(step.getAttribute())) {
                    if (step.getAttribute() == fields.requestStatus)
                        DisableStep(ExecutionContext, step.getAttribute(), true);
                    else if (formContext.getAttribute(step.getAttribute()) != null) {
                        if (formContext.getAttribute(step.getAttribute()).getUserPrivilege().canUpdate)
                            DisableStep(ExecutionContext, step.getAttribute(), false);
                        else
                            DisableStep(ExecutionContext, step.getAttribute(), true);
                    }
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

function ldv_businessprocessflag(ExecutionContext) {
    ReLoadForm(ExecutionContext);
}

//----------------------------- End BP Functions -------------------------------

function CorporateAccountpreFilterLookup(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getAttribute(fields.EntityName).setValue(null);
    var contactId = formContext.getAttribute(fields.Contact).getValue();
    var contactIdValue;
    if (contactId != null) {
        EnableField(ExecutionContext, fields.EntityName);
        contactIdValue = contactId[0].id;
    }
    else {
        DisableField(ExecutionContext, fields.EntityName);
        contactIdValue = null;
    }

    formContext.getControl(fields.EntityName).addPreSearch(function () {
        addCorporateAccountFilter(ExecutionContext, contactIdValue);
    });
}
function filterCustomerLookup(executionContext) {
    var formContext = executionContext.getFormContext();
    var accountAttr = formContext.getAttribute("ldv_organization");
    var customerCtrl = formContext.getControl("customerid");

    if (!accountAttr || !accountAttr.getValue()) {
        return;
    }

    var accountId = accountAttr.getValue()[0].id.replace("{", "").replace("}", "");

    // Ø§Ø³ØªØ®Ø¯Ù… FetchXML ÙÙŠÙ‡ linked-entity Ù„Ù„Ø¹Ù„Ø§Ù‚Ø© new_contact_account
    var fetchXml =
        "<filter type='and'>" +
        "  <condition attribute='contactid' operator='in'>" +
        "    <link-entity name='new_contact_account' from='contactid' to='contactid' intersect='true'>" +
        "      <filter type='and'>" +
        "        <condition attribute='accountid' operator='eq' value='" + accountId + "' />" +
        "      </filter>" +
        "    </link-entity>" +
        "  </condition>" +
        "</filter>";

    // Apply filter only for Contacts inside Customer lookup
    customerCtrl.addPreSearch(function () {
        customerCtrl.addCustomFilter(fetchXml, "contact");
    });
}
function ValidateCaseEligibility(ExecutionContext) {
    ValidateServiceCategoryAuthorization(ExecutionContext, fields.Contact, fields.EntityName, fields.ldv_Services);
}

function addCorporateAccountFilter(ExecutionContext, contactIdValue) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var _viewId = formContext.getControl(fields.EntityName).getDefaultView();
    var _entityName = 'account';
    var _viewDisplayName = 'Entity Names';
    var fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
        "<entity name='account'>" +
        "<attribute name='name' />" +
        "<attribute name='emailaddress1' />" +
        "<attribute name='ldv_mobilenumber' />" +
        "<attribute name='accountid' />" +
        "<order attribute='name' descending='false' />" +
        "<filter type=\"and\">" +
        "<condition attribute=\"statecode\" operator=\"eq\" value=\"0\" />" +
        "</filter>" +
        "<link-entity name=\"new_contact_account\" from=\"accountid\" to=\"accountid\" visible=\"false\" intersect=\"true\">" +
        "<link-entity name=\"contact\" from=\"contactid\" to=\"contactid\">" +
        "<filter type=\"and\">" +
        "<condition attribute=\"contactid\" operator=\"eq\" uitype=\"contact\" value=\"" + contactIdValue + "\" />" +
        "</filter>" +
        "</link-entity>" +
        "</link-entity>" +
        "</entity>" +
        "</fetch>";
    var layoutXML = "<grid name='resultset' object='1' jump='accountid' select='1' icon='1' preview='1'>" +
        "<row name='result' id='accountid'>" +
        "<cell name='name' width='300' />" +
        "<cell name='emailaddress1' width='200' />" +
        "<cell name='ldv_mobilenumber' width='100' />" +
        "</row>" +
        "</grid>";
    formContext.getControl(fields.EntityName).addCustomView(_viewId, _entityName, _viewDisplayName, fetchXML, layoutXML, true);
}

PreFilter_DisputeSubServiceCategory_Lookup = function (ExecutionContext) {
    // clear custom filter if exist, because crm
    // compin each fetch xml with AND operator
    //
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var fieldName = fields.DisputeSubServiceCategory;
    var controls = formContext.getAttribute(fieldName).controls;
    for (var i = 0; i < controls.getLength(); i++) {
        formContext.getControl(controls.get(i).getName()).removePreSearch(AddFilter_DisputeSubServiceCategory);

        formContext.getControl(controls.get(i).getName()).addPreSearch(AddFilter_DisputeSubServiceCategory);
    }
}

//three levels of Category
PreFilter_DisputeSubServiceCategoryClassification_Lookup = function (ExecutionContext) {
    // clear custom filter if exist, because crm
    // compin each fetch xml with AND operator
    //
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var fieldName = fields.DisputeSubServiceCategoryClassification;
    var controls = formContext.getAttribute(fieldName).controls;
    for (var i = 0; i < controls.getLength(); i++) {
        //formContext.getControl(controls.get(i).getName()).removePreSearch(AddFilter_DisputeSubServiceCategoryClassification);

        formContext.getControl(controls.get(i).getName()).addPreSearch(AddCustomViewToClassification);
        //formContext.getControl(controls.get(i).getName()).addPreSearch(AddFilter_DisputeSubServiceCategoryClassification);
    }
}

FilterClassificationByCategoryAndSubCategory = function (ExecutionContext) {
    var serviceId = GetLookupObject(ExecutionContext, fields.DisputeServiceCategory)
    var subservicecategoryId = GetLookupObject(ExecutionContext, fields.DisputeSubServiceCategory)
    var fetchxml =
        "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\">" +
        "<entity name=\"ldv_disputesubservicecategoryclassification\"> " +
        "<attribute name=\"ldv_disputesubservicecategoryclassificationid\" />" +
        "<attribute name=\"ldv_name\" />" +
        "<filter type=\"and\">" +
        "	<condition attribute=\"statecode\" operator=\"eq\" value=\"0\"/>" +
        "</filter>" +

        "<link-entity name=\"ldv_ldv_disputeervicecategoryclassificaleve\" from=\"ldv_disputesubservicecategoryclassificationid\" to=\"ldv_disputesubservicecategoryclassificationid\" visible=\"false\" intersect=\"true\">" +
        "	<link-entity name=\"ldv_disputecategorylevels\" from=\"ldv_disputecategorylevelsid\" to=\"ldv_disputecategorylevelsid\" alias=\"ldv_disputesservicescategory\" >" +
        "		<filter type=\"and\">" +
        "			<condition attribute=\"ldv_disputeservicecategory\" operator=\"eq\" value=\"" + serviceId + "\" />" +
        "			<condition attribute=\"ldv_disputesubservicecategory\" operator=\"eq\" value=\"" + subservicecategoryId + "\" />" +
        "		</filter>" +
        "	</link-entity>" +
        "</link-entity>" +

        "</entity>" +
        "</fetch>";

    return fetchxml;

}

function AddCustomViewToClassification(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var fetchXML = FilterClassificationByCategoryAndSubCategory(ExecutionContext);
    // var viewName = "Custom View";
    // var viewId = "{951F3574-0153-EE11-89D5-00224881B1FA}";
    var viewName = "Dispute Sub Service Category Classification Lookup View";
    var viewId = "{E0918591-4534-4950-AC0A-BC200A7451BD}";
    var isDefault = true;
    var fieldName = fields.DisputeSubServiceCategoryClassification;
    var layoutXml = "<grid name=\"resultset\" object=\"1\" jump=\"ldv_name\" select=\"1\" icon=\"1\" preview=\"1\"><row name=\"result\" id=\"ldv_disputesubservicecategoryclassificationid\"><cell name=\"ldv_name\" width=\"300\"/></row></grid>";

    formContext.getControl(fieldName).addCustomView(viewId, "ldv_disputesubservicecategoryclassification", viewName, fetchXML, layoutXml, isDefault);
}

AddFilter_DisputeSubServiceCategoryClassification = function (ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var serviceId = GetLookupObject(ExecutionContext, fields.DisputeServiceCategory)
    var subservicecategoryId = GetLookupObject(ExecutionContext, fields.DisputeSubServiceCategory)
    var fetchXml =
        "<filter type=\"and\">" +
        "	<condition attribute=\"statecode\" operator=\"eq\" value=\"0\" />" +
        "</filter>" +
        "<link-entity name=\"ldv_ldv_disputeervicecategoryclassificaleve\" from=\"ldv_disputesubservicecategoryclassificationid\" to=\"ldv_disputesubservicecategoryclassificationid\" visible=\"false\" intersect=\"true\">" +
        "	<link-entity name=\"ldv_disputecategorylevels\" from=\"ldv_disputecategorylevelsid\" to=\"ldv_disputecategorylevelsid\" alias=\"ldv_disputesservicescategory\"> " +
        "		<filter type=\"and\">" +
        "			<condition attribute=\"ldv_disputeservicecategory\" operator=\"eq\" value=\"" + serviceId + "\" />" +
        "			<condition attribute=\"ldv_disputesubservicecategory\" operator=\"eq\" value=\"" + subservicecategoryId + "\" />" +
        "		</filter>" +
        "	</link-entity>" +
        "</link-entity>";

    var fieldName = fields.DisputeSubServiceCategoryClassification;
    formContext.getControl(fieldName).addCustomFilter(fetchXml, 'ldv_disputesubservicecategoryclassification');
    //var controls = formContext.getAttribute(fieldName).controls;
    //for (var i = 0; i < controls.getLength() ; i++) {
    //    formContext.getControl(controls.get(i).getName()).addCustomFilter(fetchXml);
    //}

}



AddFilter_DisputeSubServiceCategory = function (ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var serviceId = GetLookupObject(ExecutionContext, fields.DisputeServiceCategory)
    var fetchXml =
        "<filter type=\"and\">" +
        "	<condition attribute=\"statecode\" operator=\"eq\" value=\"0\" />" +
        "</filter>" +
        "<link-entity name=\"ldv_ldv_disputesservicescategory_ldv_disput\" from=\"ldv_disputessubservicescategoryid\" to=\"ldv_disputessubservicescategoryid\" visible=\"false\" intersect=\"true\">" +
        "	<link-entity name=\"ldv_disputesservicescategory\" from=\"ldv_disputesservicescategoryid\" to=\"ldv_disputesservicescategoryid\" alias=\"ldv_disputesservicescategory\"> " +
        "		<filter type=\"and\">" +
        "			<condition attribute=\"ldv_disputesservicescategoryid\" operator=\"eq\" value=\"" + serviceId + "\" />" +
        "		</filter>" +
        "	</link-entity>" +
        "</link-entity>";

    var fieldName = fields.DisputeSubServiceCategory;
    formContext.getControl(fieldName).addCustomFilter(fetchXml);
    //var controls = formContext.getAttribute(fieldName).controls;
    //for (var i = 0; i < controls.getLength() ; i++) {
    //    formContext.getControl(controls.get(i).getName()).addCustomFilter(fetchXml);
    //}

}

function GetSubCategoriesAccoridingToCategory(ExecutionContext, gridTypeCode, gridControl, primaryEntity) {
    //debugger;
    //if (primaryEntity != "112") {
    //    try {
    //        // Default customized function generated by CRM for Add Exsiting cutomizing command.
    //        Mscrm.GridRibbonActions.addExistingFromSubGridAssociated(ExecutionContext, gridTypeCode, gridControl); //default button click functio
    //    } catch (e) { console.log(e); }
    //    return;
    //}

    //var serviceCategoryId = GetLookupObject(ExecutionContext, "ldv_disputeservicecategory");

    //var fechXMLSubServices =
    //    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'> " +
    //    "  <entity name='ldv_disputessubservicescategory'> " +
    //    "    <attribute name='ldv_disputessubservicescategoryid' /> " +
    //    "    <attribute name='ldv_name' /> " +
    //    "    <attribute name='createdon' /> " +
    //    "    <order attribute='ldv_name' descending='false' /> " +
    //    "    <link-entity name='ldv_ldv_disputesservicescategory_ldv_disput' from='ldv_disputessubservicescategoryid' to='ldv_disputessubservicescategoryid' visible='false' intersect='true'> " +
    //    "      <link-entity name='ldv_disputesservicescategory' from='ldv_disputesservicescategoryid' to='ldv_disputesservicescategoryid' alias='ldv_disputesservicescategory'> " +
    //    "        <filter type='and'> " +
    //    "          <condition attribute='ldv_disputesservicescategoryid' operator='eq' value='" + serviceCategoryId + "' /> " +
    //    "        </filter> " +
    //    "      </link-entity> " +
    //    "    </link-entity> " +
    //    "  </entity> " +
    //    "</fetch>";

    ////columns to display in the custom view (make sure to include these in the fetch query) 
    //var layout =
    //    "<grid name='resultset' object='10001' jump='ldv_disputessubservicescategoryid' select='1' icon='1' preview='1'>" +
    //    "  <row name='result' id='ldv_disputessubservicescategoryid'>" +
    //    "    <cell name='ldv_name' width='300' />" +
    //    "    <cell name='createdon' width='300' />" +
    //    "  </row>" +
    //    "</grid>";

    //addExistingFromSubGridCustom(ExecutionContext, gridTypeCode, gridControl, this, fechXMLSubServices, layout, "DisputesSubServices_SubGrid");
    var alertMessage = { text: "File : ldv_incident.js , Function Name: GetSubCategoriesAccoridingToCategory  , deperected due to upgrade" };
    Xrm.Navigation.openAlertDialog(alertMessage, null);
}

function addExistingFromSubGridCustom(ExecutionContext, gridTypeCode, gridControl, context, fetch, layout, viewName) {
    //var viewId = "{944D745C-CF3C-4298-863F-996B24B968A0}"; // a dummy view ID
    //var relName = gridControl.GetParameter("relName");
    //var roleOrd = gridControl.GetParameter("roleOrd");

    ////creates the custom view object
    //var customView = {
    //    fetchXml: fetch,
    //    id: viewId,
    //    layoutXml: layout,
    //    name: viewName,
    //    recordType: gridTypeCode,
    //    Type: 0
    //};

    //var parent = GetParentObject(null, 0);
    //var parameters = [gridTypeCode, "", relName, roleOrd, parent];
    //var callbackRef = Mscrm.Utilities.createCallbackFunctionObject("locAssocObjAction", context, parameters, false);

    ////pops the lookup window with our view injected
    //// Reference : https://mscrmdeveloper.wordpress.com/2014/11/27/lookupobjectswithcallback-function-parameters/
    //LookupObjectsWithCallback(callbackRef, null, "multi", gridTypeCode, 0, null, "", null, null, null, null, null, null, viewId, [customView], null, null, null, null, null, null, 1, null, null, null);
    var alertMessage = { text: "File : ldv_incident.js , Function Name: addExistingFromSubGridCustom  , deperected due to upgrade" };
    Xrm.Navigation.openAlertDialog(alertMessage, null);
}

//set all tab fields required level
function SetSectionFieldsRequiredLevel(ExecutionContext, tabName, sectionName, RequirementLevel) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var section = formContext.ui.tabs.get(tabName).sections.get(sectionName);
    if (section != null) {
        var controls = section.controls.get();
        for (var i in controls) {
            var control = controls[i];
            SetFieldRequiredLevel(ExecutionContext, control.getAttribute().getName(), RequirementLevel);
        }
    }
}

function GetCurrentStatusCode(ExecutionContext, statusFieldName) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    try {
        var status = formContext.getAttribute(statusFieldName);
        if (status == null || status.getValue() == null)
            return;
        status = status.getValue();
        var statusID = status[0].id;
        var returnedServiceStatus = ODataRequestJSONParsed(formContext, "/ldv_servicestatuses?$select=ldv_code&$filter=ldv_servicestatusid eq '" + statusID + "'");
        if (!IsNull(returnedServiceStatus) && !IsNull(returnedServiceStatus.value) && returnedServiceStatus.value.length > 0) {

            var statusCode = returnedServiceStatus.value[0].ldv_code;
            if (statusCode != null && statusCode > 0)
                return statusCode
        }
    } catch (e) { console.log(e); }
    return 0;
}

function LoadCssPath(ExecutionContext) {
    //var orgName = Xrm.Utility.getGlobalContext().getClientUrl().split("/")[3];
    //var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl(); //"http://" + document.location.href.split("/")[2] + "/" + orgName;
    //var normalCssPath = serverUrl + "/WebResources/ldv_bootstrap.min.css";
    //LoadCSS(normalCssPath);

    //normalCssPath = serverUrl + "/WebResources/ldv_Form_CSS";
    //LoadCSS(normalCssPath);
    var alertMessage = { text: "File : ldv_incident.js , Function Name: LoadCSS  , deperected due to upgrade" };
    Xrm.Navigation.openAlertDialog(alertMessage, null);
}

function ReLoadForm(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //formContext.data.entity.save();
    if (formContext.getAttribute("parentcaseid").getValue() != null) {
        var id = formContext.data.entity.getId();
        var entityLogicalName = formContext.data.entity.getEntityName();

        var entityFormOptions = {};
        entityFormOptions["entityName"] = entityLogicalName;//"contact";
        entityFormOptions["entityId"] = id;

        //Xrm.Navigation.openForm(entityFormOptions, formParameters);
        //Xrm.Navigation.openForm("incident", id);
        Xrm.Navigation.openForm(entityFormOptions);
    }
    setTimeout(function () {
        var id = formContext.data.entity.getId();
        var entityLogicalName = formContext.data.entity.getEntityName();
        //var entityFormOptions = {};
        //var entityName = formContext.data.entity.getEntityName();
        //entityFormOptions["entityName"] = formContext.data.entity.getEntityName();

        //var formParameters = {};
        //var Id = formContext.data.entity.getId().replace('{', '').replace('}', '');
        //formParameters["incidentid"] = formContext.data.entity.getId().replace('{', '').replace('}', '');

        var entityFormOptions = {};
        entityFormOptions["entityName"] = entityLogicalName;//"contact";
        entityFormOptions["entityId"] = id;
        //Xrm.Navigation.openForm(entityFormOptions, formParameters);
        //Xrm.Navigation.openForm(entityName, Id);
        Xrm.Navigation.openForm(entityFormOptions);
        //Xrm.Utility.openEntityForm(entityLogicalName, id);
    }, 5000);


}

function HideSocialPaneItems(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //var ctrlElement = Xrm.Page.getControl("header_notescontrol");
    var ctrlElement = formContext.getControl("header_notescontrol");

    if (ctrlElement.children != null && ctrlElement.children.length > 0) {
        for (var ele = 0; ele < ctrlElement.children.length; ele++) {
            var ctrl = ctrlElement.children[ele];
            if (ctrl.title == 'POSTS' || ctrl.title == 'ACTIVITIES') {
                ctrl.style.display = "none";
                if (ele + 1 < ctrlElement.children.length) { ctrlElement.children[ele + 1].click(); } else if (ele - 1 >= 0) {
                    ctrlElement.children[ele - 1].click();
                    return;
                }
            }
        }
    }
}

//---------------------------------- Re-Open --------------------------------
function CanReOpen() {
    return false;
    //var currentStatusCode = GetCurrentStatusCode(ExecutionContext , fields.internalStatus);
    //if (currentStatusCode != requestStatus.closed || formContext.getAttribute(fields.ReOpenCount).getValue() > 0 || (!UserHasRole("Customer Service Representative Customed Role") && !UserHasRole("System Administrator")))
    //    return false;
    //else
    //    return true;
}

var ReopenComment;
function ReOpenCase(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if ((formContext.getAttribute(fields.ReOpenCount).getValue() == null || formContext.getAttribute(fields.ReOpenCount).getValue() == 0) && (UserHasRole("Customer Service Representative Customed Role") || UserHasRole("System Administrator"))) {

        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);

        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        //DisableGrid("DisputesSubServices_SubGrid");
        //DisableGrid("ComplaintCategory_SubGrid");

        //bootbox.dialog({
        //    message: "Applicant Comment <label style='color:red'> * </label> <input id='CommentTxt' type='text' name='awesomeness'>",
        //    title: "Reopen Case",
        //    buttons: {
        //        main: {
        //            label: "Save",
        //            className: "",
        //            callback: function () {

        //                var formIsValid = doFormValidation();
        //                if (!formIsValid) {
        //                    return false;
        //                }
        //                else {
        //                    
        //                    ReopenComment = document.getElementById("CommentTxt").value;
        //                    ActivateCase();
        //                }

        //                function doFormValidation() {
        //                    if (document.getElementById("CommentTxt").value == "") {
        //                        return false;
        //                    }
        //                    else {
        //                        return true;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //});
    }
}

function ActivateCase(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var entityId = formContext.data.entity.getId();
    var entityName = "incidents";
    var requestName = "ldv_CaseReopen";
    ExecuteAction(ExecutionContext, entityId, entityName, ReopenComment, requestName);
    ReLoadForm(ExecutionContext);

    //var odataSelect = url + "/xrmservices/2011/OrganizationData.svc/WorkflowSet?$select=WorkflowId&$filter=ActiveWorkflowId/Id ne null and Name eq 'Case - Reopen'";
    //$.ajax({

    //    type: "GET",

    //    contentType: "application/json; charset=utf-8",

    //    datatype: "json",

    //    url: odataSelect,

    //    beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },

    //    success: function (data, textStatus, XmlHttpRequest) {

    //        if (data.d != null && data.d.results != null && data.d.results.length != 0 && data.d.results[0].WorkflowId != null) {

    //            var workflowId = data.d.results[0].WorkflowId;
    //            var request = "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>" +
    //                             "<s:Body>" +
    //                               "<Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>" +
    //                                 "<request i:type='b:ExecuteWorkflowRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>" +
    //                                   "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>" +
    //                                     "<a:KeyValuePairOfstringanyType>" +
    //                                       "<c:key>EntityId</c:key>" +
    //                                       "<c:value i:type='d:guid' xmlns:d='http://schemas.microsoft.com/2003/10/Serialization/'>" + formContext.data.entity.getId() + "</c:value>" +
    //                                     "</a:KeyValuePairOfstringanyType>" +
    //                                     "<a:KeyValuePairOfstringanyType>" +
    //                                       "<c:key>WorkflowId</c:key>" +
    //                                       "<c:value i:type='d:guid' xmlns:d='http://schemas.microsoft.com/2003/10/Serialization/'>" + workflowId + "</c:value>" +
    //                                     "</a:KeyValuePairOfstringanyType>" +
    //                                   "</a:Parameters>" +
    //                                   "<a:RequestId i:nil='true' />" +
    //                                   "<a:RequestName>ExecuteWorkflow</a:RequestName>" +
    //                                 "</request>" +
    //                               "</Execute>" +
    //                             "</s:Body>" +
    //                           "</s:Envelope>";

    //            var req = new XMLHttpRequest();
    //            req.open("POST", url + "/XRMServices/2011/Organization.svc/web", true);

    //            req.setRequestHeader("Accept", "application/xml, text/xml, */*");
    //            req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    //            req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
    //            req.onreadystatechange = function () {
    //                if (req.readyState == 4) {
    //                    if (req.status == 200) {
    //                        var caseId = formContext.data.entity.getId();
    //                        var changes = new Object();
    //                        changes.StateCode = { Value: '0' };
    //                        changes.StatusCode = { Value: '753240000' };
    //                        changes.ldv_ReOpenComment = ReopenComment;
    //                        changes.ldv_ReOpenRequest = true;
    //                        UpdateRecord(caseId, changes, 'IncidentSet');
    //                        ReLoadForm();
    //                    }
    //                }
    //            };

    //            req.send(request);
    //        }

    //    },

    //    error: function (XmlHttpRequest, textStatus, errorThrown) { //alert('OData Select Failed: '+ odataSelect); 
    //    }

    //});

}

//function ExecuteAction(ExecutionContext, entityId, entityName, param, requestName) {
//    var formContext;
//    try {

//        formContext = ExecutionContext.getFormContext();
//    }
//    catch (e) {
//        formContext = ExecutionContext;
//    }
//    var orgName = Xrm.Utility.getGlobalContext().getClientUrl().split("/")[3];
//    var url = "http://" + document.location.href.split("/")[2] + "/" + orgName;
//    // Creating the request XML for calling the Action
//    var requestXML = ""
//    requestXML += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
//    requestXML += "  <s:Body>";
//    requestXML += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";
//    requestXML += "      <request xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">";
//    requestXML += "        <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";
//    requestXML += "          <a:KeyValuePairOfstringanyType>";
//    requestXML += "            <b:key>Target</b:key>";
//    requestXML += "            <b:value i:type=\"a:EntityReference\">";
//    requestXML += "              <a:Id>" + entityId + "</a:Id>";
//    requestXML += "              <a:LogicalName>" + entityName + "</a:LogicalName>";
//    requestXML += "              <a:Name i:nil=\"true\" />";
//    requestXML += "            </b:value>";
//    requestXML += "          </a:KeyValuePairOfstringanyType>";
//    requestXML += "          <a:KeyValuePairOfstringanyType>";
//    requestXML += "            <b:key>ReOpenComment</b:key>";
//    requestXML += "            <b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + param + "</b:value>";
//    requestXML += "          </a:KeyValuePairOfstringanyType>";
//    requestXML += "        </a:Parameters>";
//    requestXML += "        <a:RequestId i:nil=\"true\" />";
//    requestXML += "        <a:RequestName>" + requestName + "</a:RequestName>";
//    requestXML += "      </request>";
//    requestXML += "    </Execute>";
//    requestXML += "  </s:Body>";
//    requestXML += "</s:Envelope>";
//    var req = new XMLHttpRequest();
//    req.open("POST", url + "/XRMServices/2011/Organization.svc/web", false)
//    req.setRequestHeader("Accept", "application/xml, text/xml, */*");
//    req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
//    req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
//    req.send(requestXML);
//    //Get the Resonse from the CRM Execute method
//    var response = req.responseXML.xml;

//}
function ExecuteAction(ExecutionContext, entityId, entitySetName, param, requestName) {

    var actionName = entitySetName + "(" + entityId.replace(/[{}]/g, "") + ")/Microsoft.Dynamics.CRM." + requestName;

    var parameters = {
        "ReOpenComment": param
    };
    CallActionFromJavaScript(actionName, parameters);
    //var req = new XMLHttpRequest();
    //req.open("POST", requestUrl, true);
    //req.setRequestHeader("OData-MaxVersion", "4.0");
    //req.setRequestHeader("OData-Version", "4.0");
    //req.setRequestHeader("Accept", "application/json");
    //req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    //req.onreadystatechange = function () {
    //    if (req.readyState === 4) {
    //        req.onreadystatechange = null;
    //        if (req.status === 200) {
    //            var response = JSON.parse(req.responseText);
    //            console.log("Action executed successfully with output:", response);
    //        } else if (req.status === 204) {
    //            console.log("Action executed successfully (no output).");
    //        } else {
    //            console.error("Error executing action:", req.responseText);
    //        }
    //    }
    //};

    //req.send(JSON.stringify(parameters));
}


function CanClose(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var owner = formContext.getAttribute("ownerid");
    if (owner == null || owner.getValue() == null)
        return false;
    owner = owner.getValue();
    var ownerID = owner[0].id;

    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);

    if (currentStatusCode != requestStatus.ReOpened || (Xrm.Utility.getGlobalContext().userSettings.userId != ownerID && !UserHasRole("System Administrator")))
        return false;
    else
        return true;
}

function CloseCase(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var owner = formContext.getAttribute("ownerid");
    if (owner == null || owner.getValue() == null)
        return false;
    owner = owner.getValue();
    var ownerID = owner[0].id;

    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    if (currentStatusCode == requestStatus.ReOpened && (Xrm.Utility.getGlobalContext().userSettings.userId == ownerID || UserHasRole("System Administrator"))) {

        DisableTab(ExecutionContext, "General", true);
        DisableTab(ExecutionContext, "ComplaintAgainstTRADetails", true);
        DisableTab(ExecutionContext, "InquiryDetails", true);
        DisableTab(ExecutionContext, "SuggestionDetails", true);
        //DisableTab(ExecutionContext, "SuggestionOptionalDetails", true);
        DisableTab(ExecutionContext, "DisputeDetails", true);
        DisableTab(ExecutionContext, "SmsSpamTab", true);

        //DisableGrid("internal_comment");

        //Upgrade:  replaced with Hide buttons on WB (Add, Add Existing & delete)
        //DisableGrid("Activities");
        //DisableGrid("Comment");

        //DisableGrid("DisputesSubServices_SubGrid");
        //DisableGrid("ComplaintCategory_SubGrid");

        //Need Update
        // commented due to old business
        //bootbox.dialog({
        //    message: "Escalation Point Comment <label style='color:red'> * </label> <input id='CommentTxt' type='text' name='awesomeness'>",
        //    title: "Close Case",
        //    buttons: {
        //        main: {
        //            label: "Save",
        //            className: "",
        //            callback: function () {

        //                var formIsValid = doFormValidation();
        //                if (!formIsValid) {
        //                    return false;
        //                }
        //                else {

        //                    var caseId = formContext.data.entity.getId();
        //                    var changes = new Object();
        //                    changes.ldv_ReOpenFeedback = document.getElementById("CommentTxt").value;

        //                    var jsonEntity = window.JSON.stringify(changes);
        //                    var serverUrl = "http://" + document.location.href.split("/")[2] + '/' + document.location.href.split("/")[3];
        //                    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
        //                    jQuery.support.cors = true;
        //                    $.ajax({
        //                        type: "POST",
        //                        contentType: "application/json; charset=utf-8",
        //                        datatype: "jsonp",
        //                        data: jsonEntity,
        //                        url: serverUrl + ODATA_ENDPOINT + "/" + 'IncidentSet' + "(guid'" + caseId + "')",
        //                        beforeSend: function (XMLHttpRequest) {
        //                            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        //                            XMLHttpRequest.setRequestHeader("X-HTTP-Method", "MERGE");
        //                        },
        //                        success: function () {
        //                            ReLoadForm();
        //                        },
        //                        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                            if (XMLHttpRequest && XMLHttpRequest.responseText) {
        //                                //alert("Error while close case ; Error â€“ " + XmlHttpRequest.responseText);
        //                            }
        //                        }
        //                    });

        //                }
        //                function doFormValidation() {
        //                    if (document.getElementById("CommentTxt").value == "") {
        //                        return false;
        //                    }
        //                    else {
        //                        return true;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //});
    }
}

//-------------------------------- End Re-Open -------------------------------
// Need Update --  handle
function OpenNewCase(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var orgname = Xrm.Utility.getGlobalContext().organizationSettings.uniqueName();
    if (!orgname || 0 === orgname.length || orgname == "" || orgname == null)
        orgname = "tra";
    var status = formContext.getAttribute("statuscode").getValue();
    if (formContext.ui.getFormType() != 1) {
        if (status == 5) {
            //ReOpenCase();
        }
        //Set the Parent Customer field value to â€œContosoâ€.
        var caseID = formContext.data.entity.getId();
        var caseNumber = formContext.getAttribute("ticketnumber").getValue();
        //var requestCode = formContext.getAttribute("statuscode").getValue();
        var customer = formContext.getAttribute("customerid").getValue()[0].id;
        var customername = formContext.getAttribute("customerid").getValue()[0].name;
        var casechannel;
        var casechannelname;
        if (formContext.getAttribute("ldv_casechannle").getValue() != null) {
            casechannel = formContext.getAttribute("ldv_casechannle").getValue()[0].id;
            casechannelname = formContext.getAttribute("ldv_casechannle").getValue()[0].name;
        }

        var requesttype = formContext.getAttribute("ldv_requesttype").getValue();
        var complaintsourceid;//= formContext.getAttribute("ldv_complaintsource").getValue()[0].id;
        var complaintsourcename;// = formContext.getAttribute("ldv_complaintsource").getValue()[0].name;
        var newspaperid;// = formContext.getAttribute("ldv_newspaper").getValue()[0].id;
        var newspapername;//= formContext.getAttribute("ldv_newspaper").getValue()[0].name;
        var tvid;// = formContext.getAttribute("ldv_tvchannel").getValue()[0].id;
        var tvname;// = formContext.getAttribute("ldv_tvchannel").getValue()[0].name;
        var radioid;//= formContext.getAttribute("ldv_radiochannel").getValue()[0].id;
        var radioname;// = formContext.getAttribute("ldv_radiochannel").getValue()[0].name;
        var socialmediaid;// = formContext.getAttribute("ldv_socialmedia").getValue()[0].id;
        var socialmedianame;// = formContext.getAttribute("ldv_socialmedia").getValue()[0].name;
        var inquirytype;
        var servicecategory;//ldv_servicecategory
        var requestnumber; // ldv_requestnumber
        var casesubject = formContext.getAttribute("ldv_casesubject").getValue();
        // var details = formContext.getAttribute("ldv_details").getValue();
        var sugg;
        var complaint;
        var othercomplaint;
        var servprov;
        var doyousumbit;
        var doyourefnum;
        var refnum;
        switch (requesttype) {
            case 1:
                inquirytype = formContext.getAttribute("ldv_inquirytype").getValue();
                if (formContext.getAttribute("ldv_servicecategory").getValue() != null) {
                    var servicecatID = formContext.getAttribute("ldv_servicecategory").getValue()[0].id;
                    var servicecatName = formContext.getAttribute("ldv_servicecategory").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_requestnumber").getValue() != undefined || formContext.getAttribute("ldv_requestnumber").getValue() != null) {
                    var requestNum = formContext.getAttribute("ldv_requestnumber").getValue();
                }
                if (formContext.getAttribute("ldv_service").getValue() != null) {
                    var servid = formContext.getAttribute("ldv_service").getValue()[0].id;
                    var servname = formContext.getAttribute("ldv_service").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_applicantfeedback").getValue() != null) {
                    var feedback = formContext.getAttribute("ldv_applicantfeedback").getValue()
                }
                if (formContext.getAttribute("ldv_applicantfeedbackcomment").getValue() != null) {
                    var feedbackcomment = formContext.getAttribute("ldv_applicantfeedbackcomment").getValue();
                }
                if (formContext.getAttribute("ldv_newspaper").getValue() != null) {
                    var newspaperid = formContext.getAttribute("ldv_newspaper").getValue()[0].id;
                    var newspapername = formContext.getAttribute("ldv_newspaper").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_complaintsource").getValue() != null) {
                    var complaintsourceid = formContext.getAttribute("ldv_complaintsource").getValue()[0].id;
                    var complaintsourcename = formContext.getAttribute("ldv_complaintsource").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_tvchannel").getValue() != null) {
                    var tvid = formContext.getAttribute("ldv_tvchannel").getValue()[0].id;
                    var tvname = formContext.getAttribute("ldv_tvchannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_radiochannel").getValue() != null) {
                    var radioid = formContext.getAttribute("ldv_radiochannel").getValue()[0].id;
                    var radioname = formContext.getAttribute("ldv_radiochannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_socialmedia").getValue() != null) {
                    var socialmediaid = formContext.getAttribute("ldv_socialmedia").getValue()[0].id;
                    var socialmedianame = formContext.getAttribute("ldv_socialmedia").getValue()[0].name;
                }
                var extraqs = "customer_id=" + customer;
                extraqs += "&customer_idname=" + customername;
                extraqs += "&parentcase_id=" + caseID;
                extraqs += "&parentcase_idname=" + caseNumber;

                if (casechannel != null && casechannel != undefined) {
                    extraqs += "&casechannle_id=" + casechannel;
                    extraqs += "&casechannle_idname=" + casechannelname;
                }

                extraqs += "&ldv_requesttype=" + requesttype;
                extraqs += "&ldv_inquirytype=" + inquirytype;
                // extraqs += "&ldv_details=" + details;
                extraqs += "&ldv_casesubject=" + casesubject;
                if (servicecatID != undefined && servicecatName != undefined) {
                    extraqs += "&servicecat_id=" + servicecatID;
                    extraqs += "&servicecat_name=" + servicecatName;
                }
                if (servid != undefined && servname != undefined) {
                    extraqs += "&serv_id=" + servid;
                    extraqs += "&serv_name=" + servname;
                }
                if (complaintsourceid != undefined && complaintsourcename != undefined) {
                    extraqs += "&complaintsource_id=" + complaintsourceid;
                    extraqs += "&complaintsource_name=" + complaintsourcename;
                }
                if (newspaperid != undefined && newspapername != undefined) {
                    extraqs += "&newspaper_id=" + newspaperid;
                    extraqs += "&newspaper_name=" + newspapername;
                }
                if (tvid != undefined && tvname != undefined) {
                    extraqs += "&tv_id=" + tvid;
                    extraqs += "&tv_name=" + tvname;
                }
                if (radioid != undefined && radioname != undefined) {
                    extraqs += "&radio_id=" + radioid;
                    extraqs += "&radio_name=" + radioname;
                }
                if (socialmediaid != undefined && socialmedianame != undefined) {
                    extraqs += "&social_id=" + socialmediaid;
                    extraqs += "&social_name=" + socialmedianame;
                }
                if (requestNum != undefined) {
                    extraqs += "&ldv_requestnumber=" + requestNum;
                }
                if (formContext.getAttribute("ldv_applicantfeedback").getValue() != null) {
                    var feedback = formContext.getAttribute("ldv_applicantfeedback").getValue()
                }
                if (formContext.getAttribute("ldv_applicantfeedbackcomment").getValue() != null) {
                    var feedbackcomment = formContext.getAttribute("ldv_applicantfeedbackcomment").getValue();
                }
                var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
                window.open("/" + orgname + "/main.aspx?etn=incident&pagetype=entityrecord&extraqs=" +
                    encodeURIComponent(extraqs), "_blank", features, false);
                break;
            case 2:
                sugg = formContext.getAttribute("ldv_suggestiontype").getValue();
                if (formContext.getAttribute("ldv_service").getValue() != null) {
                    var servid = formContext.getAttribute("ldv_service").getValue()[0].id;
                    var servname = formContext.getAttribute("ldv_service").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_servicechannel").getValue() != null) {
                    var servchannelid = formContext.getAttribute("ldv_servicechannel").getValue()[0].id;
                    var servchannelname = formContext.getAttribute("ldv_servicechannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_applicantfeedback").getValue() != null) {
                    var feedback = formContext.getAttribute("ldv_applicantfeedback").getValue()
                }
                if (formContext.getAttribute("ldv_applicantfeedbackcomment").getValue() != null) {
                    var feedbackcomment = formContext.getAttribute("ldv_applicantfeedbackcomment").getValue();
                }
                if (formContext.getAttribute("ldv_complaintsource").getValue() != null) {
                    var complaintsourceid = formContext.getAttribute("ldv_complaintsource").getValue()[0].id;
                    var complaintsourcename = formContext.getAttribute("ldv_complaintsource").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_newspaper").getValue() != null) {
                    var newspaperid = formContext.getAttribute("ldv_newspaper").getValue()[0].id;
                    var newspapername = formContext.getAttribute("ldv_newspaper").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_tvchannel").getValue() != null) {
                    var tvid = formContext.getAttribute("ldv_tvchannel").getValue()[0].id;
                    var tvname = formContext.getAttribute("ldv_tvchannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_radiochannel").getValue() != null) {
                    var radioid = formContext.getAttribute("ldv_radiochannel").getValue()[0].id;
                    var radioname = formContext.getAttribute("ldv_radiochannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_socialmedia").getValue() != null) {
                    var socialmediaid = formContext.getAttribute("ldv_socialmedia").getValue()[0].id;
                    var socialmedianame = formContext.getAttribute("ldv_socialmedia").getValue()[0].name;
                }
                var extraqs = "customer_id=" + customer;
                extraqs += "&customer_idname=" + customername;
                extraqs += "&parentcase_id=" + caseID;
                extraqs += "&parentcase_idname=" + caseNumber;

                if (casechannel != null && casechannel != undefined) {
                    extraqs += "&casechannle_id=" + casechannel;
                    extraqs += "&casechannle_idname=" + casechannelname;
                }

                extraqs += "&ldv_requesttype=" + requesttype;
                extraqs += "&ldv_suggestiontype=" + sugg;
                //extraqs += "&ldv_details=" + details;
                if (servid != undefined && servname != undefined) {
                    extraqs += "&serv_id=" + servid;
                    extraqs += "&serv_name=" + servname;
                }
                if (complaintsourceid != undefined && complaintsourcename != undefined) {
                    extraqs += "&complaintsource_id=" + complaintsourceid;
                    extraqs += "&complaintsource_name=" + complaintsourcename;
                }
                if (newspaperid != undefined && newspapername != undefined) {
                    extraqs += "&newspaper_id=" + newspaperid;
                    extraqs += "&newspaper_name=" + newspapername;
                }
                if (tvid != undefined && tvname != undefined) {
                    extraqs += "&tv_id=" + tvid;
                    extraqs += "&tv_name=" + tvname;
                }
                if (radioid != undefined && radioname != undefined) {
                    extraqs += "&radio_id=" + radioid;
                    extraqs += "&radio_name=" + radioname;
                }
                if (socialmediaid != undefined && socialmedianame != undefined) {
                    extraqs += "&social_id=" + socialmediaid;
                    extraqs += "&social_name=" + socialmedianame;
                }
                if (servchannelid != undefined && servchannelname != undefined) {
                    extraqs += "&servchannel_id=" + servchannelid;
                    extraqs += "&servchannel_name=" + servchannelname;
                }
                extraqs += "&ldv_casesubject=" + casesubject;
                if (feedback != undefined) {
                    extraqs += "&ldv_applicantfeedback=" + feedback;
                }
                if (feedbackcomment != undefined) {
                    extraqs += "&ldv_applicantfeedbackcomment=" + feedbackcomment;
                }

                var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
                window.open("/" + orgname + "/main.aspx?etn=incident&pagetype=entityrecord&extraqs=" +
                    encodeURIComponent(extraqs), "_blank", features, false);
                break;
            case 3:
                complaint = formContext.getAttribute("ldv_complainttype").getValue();
                if (formContext.getAttribute("ldv_otherscomplainttype").getValue() != undefined) {
                    othercomplaint = formContext.getAttribute("ldv_otherscomplainttype").getValue();
                }
                if (formContext.getAttribute("ldv_servicecategory").getValue() != null) {
                    var servicecatID = formContext.getAttribute("ldv_servicecategory").getValue()[0].id;
                    var servicecatName = formContext.getAttribute("ldv_servicecategory").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_service").getValue() != null) {
                    var servid = formContext.getAttribute("ldv_service").getValue()[0].id;
                    var servname = formContext.getAttribute("ldv_service").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_complaintsource").getValue() != null) {
                    var complaintsourceid = formContext.getAttribute("ldv_complaintsource").getValue()[0].id;
                    var complaintsourcename = formContext.getAttribute("ldv_complaintsource").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_employeedepartment").getValue() != null) {
                    var empDepId = formContext.getAttribute("ldv_employeedepartment").getValue()[0].id;
                    var empDepname = formContext.getAttribute("ldv_employeedepartment").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_othersemployeedepartment").getValue() != null) {
                    var othesrempdep = formContext.getAttribute("ldv_othersemployeedepartment").getValue();
                }
                if (formContext.getAttribute("ldv_applicantfeedback").getValue() != null) {
                    var feedback = formContext.getAttribute("ldv_applicantfeedback").getValue()
                }

                if (formContext.getAttribute("ldv_newspaper").getValue() != null) {
                    var newspaperid = formContext.getAttribute("ldv_newspaper").getValue()[0].id;
                    var newspapername = formContext.getAttribute("ldv_newspaper").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_tvchannel").getValue() != null) {
                    var tvid = formContext.getAttribute("ldv_tvchannel").getValue()[0].id;
                    var tvname = formContext.getAttribute("ldv_tvchannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_radiochannel").getValue() != null) {
                    var radioid = formContext.getAttribute("ldv_radiochannel").getValue()[0].id;
                    var radioname = formContext.getAttribute("ldv_radiochannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_socialmedia").getValue() != null) {
                    var socialmediaid = formContext.getAttribute("ldv_socialmedia").getValue()[0].id;
                    var socialmedianame = formContext.getAttribute("ldv_socialmedia").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_applicantfeedbackcomment").getValue() != null) {
                    var feedbackcomment = formContext.getAttribute("ldv_applicantfeedbackcomment").getValue();
                }
                var subject = formContext.getAttribute("ldv_subject").getValue();
                var extraqs = "customer_id=" + customer;
                extraqs += "&customer_idname=" + customername;
                extraqs += "&parentcase_id=" + caseID;
                extraqs += "&parentcase_idname=" + caseNumber;

                if (casechannel != null && casechannel != undefined) {
                    extraqs += "&casechannle_id=" + casechannel;
                    extraqs += "&casechannle_idname=" + casechannelname;
                }

                extraqs += "&ldv_requesttype=" + requesttype;
                extraqs += "&ldv_complainttype=" + complaint;
                extraqs += "&ldv_otherscomplainttype=" + othercomplaint;
                //extraqs += "&ldv_details=" + details;
                extraqs += "&ldv_subject=" + subject;
                if (servicecatID != undefined && servicecatName != undefined) {
                    extraqs += "&servicecat_id=" + servicecatID;
                    extraqs += "&servicecat_name=" + servicecatName;
                }
                if (complaintsourceid != undefined && complaintsourcename != undefined) {
                    extraqs += "&complaintsource_id=" + complaintsourceid;
                    extraqs += "&complaintsource_name=" + complaintsourcename;
                }
                if (newspaperid != undefined && newspapername != undefined) {
                    extraqs += "&newspaper_id=" + newspaperid;
                    extraqs += "&newspaper_name=" + newspapername;
                }
                if (tvid != undefined && tvname != undefined) {
                    extraqs += "&tv_id=" + tvid;
                    extraqs += "&tv_name=" + tvname;
                }
                if (radioid != undefined && radioname != undefined) {
                    extraqs += "&radio_id=" + radioid;
                    extraqs += "&radio_name=" + radioname;
                }
                if (socialmediaid != undefined && socialmedianame != undefined) {
                    extraqs += "&social_id=" + socialmediaid;
                    extraqs += "&social_name=" + socialmedianame;
                }
                if (servid != undefined && servname != undefined) {
                    extraqs += "&serv_id=" + servid;
                    extraqs += "&serv_name=" + servname;
                }
                if (empDepId != undefined && empDepname != undefined) {
                    extraqs += "&empdep_id=" + empDepId;
                    extraqs += "&empdep_name=" + empDepname;
                }

                if (othesrempdep != undefined) {
                    extraqs += "&ldv_othersemployeedepartment=" + othesrempdep;
                }
                if (feedback != undefined) {
                    extraqs += "&ldv_applicantfeedback=" + feedback;
                }
                if (feedbackcomment != undefined) {
                    extraqs += "&ldv_applicantfeedbackcomment=" + feedbackcomment;
                }
                var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
                window.open("/" + orgname + "/main.aspx?etn=incident&pagetype=entityrecord&extraqs=" +
                    encodeURIComponent(extraqs), "_blank", features, false);
                break;
            case 4:
                servprov = formContext.getAttribute("ldv_serviceprovider").getValue();
                doyousumbit = formContext.getAttribute("ldv_didyousubmitacomplainttotheserviceprovide").getValue();
                if (formContext.getAttribute("ldv_disputeservicecategory").getValue() != null) {
                    var dipsuteservid = formContext.getAttribute("ldv_disputeservicecategory").getValue()[0].id;
                    var dipsuteservname = formContext.getAttribute("ldv_disputeservicecategory").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_othersdisputeservicecategory").getValue() != null) {
                    var otherdisputeservicecat = formContext.getAttribute("ldv_othersdisputeservicecategory").getValue();
                }
                if (formContext.getAttribute("ldv_applicantfeedback").getValue() != null) {
                    var feedback = formContext.getAttribute("ldv_applicantfeedback").getValue()
                }
                if (formContext.getAttribute("ldv_applicantfeedbackcomment").getValue() != null) {
                    var feedbackcomment = formContext.getAttribute("ldv_applicantfeedbackcomment").getValue();
                }
                if (doyousumbit == 1) {
                    doyourefnum = formContext.getAttribute("ldv_doyouhaveareferencenumber").getValue();
                    if (doyourefnum == 1) {
                        refnum = formContext.getAttribute("ldv_referencenumber").getValue();
                    }
                }
                if (formContext.getAttribute("ldv_complaintsource").getValue() != null) {
                    var complaintsourceid = formContext.getAttribute("ldv_complaintsource").getValue()[0].id;
                    var complaintsourcename = formContext.getAttribute("ldv_complaintsource").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_newspaper").getValue() != null) {
                    var newspaperid = formContext.getAttribute("ldv_newspaper").getValue()[0].id;
                    var newspapername = formContext.getAttribute("ldv_newspaper").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_tvchannel").getValue() != null) {
                    var tvid = formContext.getAttribute("ldv_tvchannel").getValue()[0].id;
                    var tvname = formContext.getAttribute("ldv_tvchannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_radiochannel").getValue() != null) {
                    var radioid = formContext.getAttribute("ldv_radiochannel").getValue()[0].id;
                    var radioname = formContext.getAttribute("ldv_radiochannel").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_socialmedia").getValue() != null) {
                    var socialmediaid = formContext.getAttribute("ldv_socialmedia").getValue()[0].id;
                    var socialmedianame = formContext.getAttribute("ldv_socialmedia").getValue()[0].name;
                }
                if (formContext.getAttribute("ldv_numberofnewlines").getValue() != null) {
                    var numberOfNewLines = formContext.getAttribute("ldv_numberofnewlines").getValue();
                }

                if (formContext.getAttribute("ldv_disputesubservicecategory").getValue() != null) {
                    var dipsuteSubservid = formContext.getAttribute("ldv_disputesubservicecategory").getValue()[0].id;
                    var dipsuteSubservname = formContext.getAttribute("ldv_disputesubservicecategory").getValue()[0].name;
                }
                var extraqs = "customer_id=" + customer;
                extraqs += "&customer_idname=" + customername;
                extraqs += "&parentcase_id=" + caseID;
                extraqs += "&parentcase_idname=" + caseNumber;

                if (casechannel != null && casechannel != undefined) {
                    extraqs += "&casechannle_id=" + casechannel;
                    extraqs += "&casechannle_idname=" + casechannelname;
                }

                if (numberOfNewLines != null && numberOfNewLines != undefined) {
                    extraqs += "&ldv_numberofnewlines=" + numberOfNewLines;
                }

                extraqs += "&ldv_requesttype=" + requesttype;
                extraqs += "&ldv_serviceprovider=" + servprov;
                extraqs += "&ldv_didyousubmitacomplainttotheserviceprovide=" + doyousumbit;
                extraqs += "&ldv_doyouhaveareferencenumber=" + doyousumbit;
                extraqs += "&ldv_referencenumber=" + refnum;
                //extraqs += "&ldv_details=" + details;
                extraqs += "&ldv_casesubject=" + casesubject;
                if (dipsuteservid != undefined && dipsuteservname != undefined) {
                    extraqs += "&dipsuteservcat_id=" + dipsuteservid;
                    extraqs += "&dipsuteservcat_name=" + dipsuteservname;
                }

                if (dipsuteSubservid != undefined && dipsuteSubservname != undefined) {
                    extraqs += "&disputesubservcat_id=" + dipsuteSubservid;
                    extraqs += "&disputesubservcat_name=" + dipsuteSubservname;
                }
                if (otherdisputeservicecat != undefined) {
                    extraqs += "&ldv_othersdisputeservicecategory=" + otherdisputeservicecat;
                }
                if (complaintsourceid != undefined && complaintsourcename != undefined) {
                    extraqs += "&complaintsource_id=" + complaintsourceid;
                    extraqs += "&complaintsource_name=" + complaintsourcename;
                }
                if (newspaperid != undefined && newspapername != undefined) {
                    extraqs += "&newspaper_id=" + newspaperid;
                    extraqs += "&newspaper_name=" + newspapername;
                }
                if (tvid != undefined && tvname != undefined) {
                    extraqs += "&tv_id=" + tvid;
                    extraqs += "&tv_name=" + tvname;
                }
                if (radioid != undefined && radioname != undefined) {
                    extraqs += "&radio_id=" + radioid;
                    extraqs += "&radio_name=" + radioname;
                }
                if (socialmediaid != undefined && socialmedianame != undefined) {
                    extraqs += "&social_id=" + socialmediaid;
                    extraqs += "&social_name=" + socialmedianame;
                }
                if (feedback != undefined) {
                    extraqs += "&ldv_applicantfeedback=" + feedback;
                }
                if (feedbackcomment != undefined) {
                    extraqs += "&ldv_applicantfeedbackcomment=" + feedbackcomment;
                }
                var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
                window.open("/" + orgname + "/main.aspx?etn=incident&pagetype=entityrecord&extraqs=" +
                    encodeURIComponent(extraqs), "_blank", features, false);
                break;
            case 6:
                servprov = formContext.getAttribute("ldv_serviceprovider").getValue();
                doyousumbit = formContext.getAttribute("ldv_didyousubmitacomplainttotheserviceprovide").getValue();
                if (doyousumbit == 1) {
                    doyourefnum = formContext.getAttribute("ldv_doyouhaveareferencenumber").getValue();
                    if (doyourefnum == 1) {
                        refnum = formContext.getAttribute("ldv_referencenumber").getValue();
                    }
                }
                var extraqs = "customer_id=" + customer;
                extraqs += "&customer_idname=" + customername;
                extraqs += "&parentcase_id=" + caseID;
                extraqs += "&parentcase_idname=" + caseNumber;
                extraqs += "&ldv_requesttype=" + requesttype;
                if (casechannel != null && casechannel != undefined) {
                    extraqs += "&casechannle_id=" + casechannel;
                    extraqs += "&casechannle_idname=" + casechannelname;
                }
                extraqs += "&ldv_serviceprovider=" + servprov;
                extraqs += "&ldv_didyousubmitacomplainttotheserviceprovide=" + doyousumbit;
                extraqs += "&ldv_doyouhaveareferencenumber=" + doyousumbit;
                extraqs += "&ldv_referencenumber=" + refnum;

                var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
                window.open("/" + orgname + "/main.aspx?etn=incident&pagetype=entityrecord&extraqs=" +
                    encodeURIComponent(extraqs), "_blank", features, false);
                break;

        }
    }
}
function CanOpenChildCase(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var satisfaction = false;
    if (formContext.getAttribute("ldv_customersatisfactionsurvey") != null) {

        if (formContext.getAttribute("ldv_customersatisfactionsurvey").getValue() != null) {
            var customersatisfactionsurvey = formContext.getAttribute("ldv_customersatisfactionsurvey").getValue();
            if (customersatisfactionsurvey == 2 || customersatisfactionsurvey == 3) {
                satisfaction = true;
            }
        }
    }
    var parent = formContext.getAttribute("parentcaseid").getValue();
    var status = formContext.getAttribute("statuscode").getValue();
    var Isparent = formContext.getAttribute("ldv_isparent").getValue();
    if ((status == 1 || status == 5) && satisfaction == true) {
        //return true;
        return false;
    }
    else {
        return false;
    }
}
function Child_Onload(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //var param = formContext.data.attributes();
    var parameters = formContext.data.entity.attributes.get();
    var param = {};
    for (var i = 0; i < parameters.length; i++) {
        param[parameters[i]._attributeName] = formContext.getAttribute(parameters[i]._attributeName).getValue()
    }
    //parameters.forEach(p => {
    //    dict[p._attributeName] = formContext.getAttribute(p._attributeName).getValue()
    //});
    var details = formContext.getAttribute("ldv_details");
    //var subject = formContext.getAttribute("ldv_casesubject");
    var sourceDetails;
    var sourceSubject;
    if (param['customerid'] != undefined && param['customerid'][0] != undefined) {
        sourceDetails = formContext.getAttribute("ldv_details");
        // sourceSubject = formContext.getAttribute("ldv_casesubject");
        if (sourceDetails != null) {
            details.setValue(sourceDetails.getValue());
        }
        var classification = formContext.getAttribute("ldv_disputesubservicecategoryclassification");
        if (classification != null) {
            formContext.getAttribute("ldv_disputesubservicecategoryclassification").setValue(classification.getValue());
        }
        var Entity = formContext.getAttribute("ldv_organization");
        if (Entity != null) {
            formContext.getAttribute("ldv_organization").setValue(Entity.getValue());
        }

        var AccountNumber = formContext.getAttribute("ldv_accountnumber");
        if (AccountNumber != null) {
            formContext.getAttribute("ldv_accountnumber").setValue(AccountNumber.getValue());
        }

        var ServiceCateg = formContext.getAttribute("ldv_servicecategory");
        if (ServiceCateg != null) {
            formContext.getAttribute("ldv_servicecategory").setValue(ServiceCateg.getValue());
        }

        var ProblemToBeSolved = formContext.getAttribute("ldv_problemtoberesolved");
        if (ProblemToBeSolved != null) {
            formContext.getAttribute("ldv_problemtoberesolved").setValue(ProblemToBeSolved.getValue());
        }

        var Target = formContext.getAttribute("ldv_target");
        if (Target != null) {
            formContext.getAttribute("ldv_target").setValue(Target.getValue());
        }

        var ImprovmentMech = formContext.getAttribute("ldv_improvementmechanism");
        if (ImprovmentMech != null) {
            formContext.getAttribute("ldv_improvementmechanism").setValue(ImprovmentMech.getValue());
        }

        var NeededRec = formContext.getAttribute("ldv_neededresources");
        if (NeededRec != null) {
            formContext.getAttribute("ldv_neededresources").setValue(NeededRec.getValue());
        }

        var ExpectedOutput = formContext.getAttribute("ldv_expectedoutput");
        if (ExpectedOutput != null) {
            formContext.getAttribute("ldv_expectedoutput").setValue(ExpectedOutput.getValue());
        }

        var Duration = formContext.getAttribute("ldv_duration");
        if (Duration != null) {
            formContext.getAttribute("ldv_duration").setValue(Duration.getValue());
        }

        var AddtionalContactDet = formContext.getAttribute("ldv_addadditionalcontactdetails");
        if (AddtionalContactDet != null) {
            formContext.getAttribute("ldv_addadditionalcontactdetails").setValue(AddtionalContactDet.getValue());
        }

        var AdditionalEmail = formContext.getAttribute("ldv_additionalemail");
        if (AdditionalEmail != null) {
            formContext.getAttribute("ldv_additionalemail").setValue(AdditionalEmail.getValue());
        }

        var AdditionalMobile = formContext.getAttribute("ldv_additionalmobilenumber");
        if (AdditionalMobile != null) {
            formContext.getAttribute("ldv_additionalmobilenumber").setValue(AdditionalMobile.getValue());
        }

        var Sender = formContext.getAttribute("ldv_sender");
        if (Sender != null) {
            formContext.getAttribute("ldv_sender").setValue(Sender.getValue());
        }

        var LastSMSDate = formContext.getAttribute("ldv_lastsmsdate");
        if (LastSMSDate != null) {
            formContext.getAttribute("ldv_lastsmsdate").setValue(LastSMSDate.getValue());
        }

        var Contractowner = formContext.getAttribute("ldv_contractownernamewithserviceprovider");
        if (Contractowner != null) {
            formContext.getAttribute("ldv_contractownernamewithserviceprovider").setValue(Contractowner.getValue());
        }

        var ComplainRegardingYNumber = formContext.getAttribute("ldv_isthecomplaintregardingyournumber");
        if (ComplainRegardingYNumber != null) {
            formContext.getAttribute("ldv_isthecomplaintregardingyournumber").setValue(ComplainRegardingYNumber.getValue());
            formContext.getAttribute("ldv_isthecomplaintregardingyournumber").fireOnChange();
        }

        var PleaseSpecify = formContext.getAttribute("ldv_pleasespecifythenumberrelatedtothecomplai");
        if (PleaseSpecify != null) {
            formContext.getAttribute("ldv_pleasespecifythenumberrelatedtothecomplai").setValue(PleaseSpecify.getValue());
        }

        var PleaseSpecifyYNumber = formContext.getAttribute("ldv_pleasespecifyyournumber");
        if (PleaseSpecifyYNumber != null) {
            formContext.getAttribute("ldv_pleasespecifyyournumber").setValue(PleaseSpecifyYNumber.getValue());
        }

        var ServChanel = formContext.getAttribute("ldv_servicechannel");
        if (ServChanel != null) {
            formContext.getAttribute("ldv_servicechannel").setValue(ServChanel.getValue());
        }

        var DisputeApplicationOrigin = formContext.getAttribute("ldv_disputeapplicantorigin");
        if (DisputeApplicationOrigin != null) {
            formContext.getAttribute("ldv_disputeapplicantorigin").setValue(DisputeApplicationOrigin.getValue());
        }



        // if (sourceSubject != null) {
        // subject.setValue(sourceSubject.setValue());
        // }
        var regardingId = param['customerid'][0].id;
        var regardingName = param['customerid'][0].name;
        var entityType = "contact";
        var casechannleid = param['ldv_casechannle'][0].id;
        var casechannlename = param['ldv_casechannle'][0].name;
        var casechannelentity = "ldv_casechannel";
        //var regardingType = param['regarding_type'];

        if (regardingId != undefined) {
            formContext.getAttribute('customerid')
                .setValue([{ id: regardingId, name: regardingName, entityType: entityType }]);
            formContext.getControl("customerid").setDisabled(true);
            formContext.getAttribute("ldv_casechannle").setValue([{ id: casechannleid, name: casechannlename, entityType: casechannelentity }]);
            formContext.getControl("ldv_requesttype").setDisabled(true);
        }
        if (param['parentcaseid'] != undefined && param['parentcaseid'][0] != undefined) {
            //var copiedfromid = param['parentcaseid'][0].id;
            //var copiedfromname = param['parentcaseid'][0].name;
            //var enttype = "incident";

            formContext.getControl("parentcaseid").setVisible(true);
            //formContext.getAttribute('parentcaseid')
            //    .setValue([{ id: copiedfromid, name: copiedfromname, entityType: enttype }]);
            formContext.getAttribute('parentcaseid').setValue(param['parentcaseid']);
        }

        if (param['ldv_servicecategory'] != undefined && param['ldv_servicecategory'][0] != undefined) {
            //var servicecategoryID = param['ldv_servicecategory'][0].id;
            //var servicecategoryname = param['ldv_servicecategory'][0].name;
            //var servicecatentityname = "ldv_caseservicecategory";
            //formContext.getAttribute('ldv_servicecategory')
            //    .setValue([{ id: servicecategoryID, name: servicecategoryname, entityType: servicecatentityname }]);
            formContext.getAttribute('ldv_servicecategory').setValue(param['ldv_servicecategory']);
        }
        if (param['ldv_service'] != undefined && param['ldv_service'][0] != undefined) {//ldv_service
            //var serviceId = param['serv_id'];
            //var servicename = param['serv_name'];
            //var serviceentityname = "ldv_service";
            //formContext.getAttribute('ldv_service')
            //    .setValue([{ id: serviceId, name: servicename, entityType: serviceentityname }]);
            formContext.getAttribute('ldv_service').setValue(param['ldv_service']);
        }
        //if (newspaperid != undefined && newspapername != undefined) {
        //    extraqs += "&newspaper_id=" + newspaperid;
        //    extraqs += "&newspaper_name=" + newspapername;
        //}
        //if (tvid != undefined && tvname != undefined) {
        //    extraqs += "&tv_id=" + tvid;
        //    extraqs += "&tv_name=" + tvname;
        //}
        //if (radioid != undefined && radioname != undefined) {
        //    extraqs += "&radio_id=" + radioid;
        //    extraqs += "&radio_name=" + radioname;
        //}
        //if (socialmediaid != undefined && socialmedianame != undefined) {
        //    extraqs += "&social_id=" + socialmediaid;
        //    extraqs += "&social_name=" + socialmedianame;
        //}
        if (param['ldv_complaintsource'] != undefined && param['ldv_complaintsource'][0] != undefined) {
            //var complaintsourceid = param['complaintsource_id'];
            //var complaintsourcename = param['complaintsource_name'];
            //var complaintEntity = "ldv_complaintsource";
            //formContext.getAttribute('ldv_complaintsource')
            //    .setValue([{ id: complaintsourceid, name: complaintsourcename, entityType: complaintEntity }]);
            formContext.getAttribute('ldv_complaintsource').setValue(param['ldv_complaintsource']);
        }
        if (param['ldv_newspaper'] != undefined && param['ldv_newspaper'][0] != undefined) {
            //var newspaperid = param['newspaper_id'];
            //var newspapername = param['newspaper_name'];
            //var IEntity = "ldv_newspaper";
            //formContext.getAttribute('ldv_newspaper')
            //    .setValue([{ id: newspaperid, name: newspapername, entityType: IEntity }]);
            formContext.getAttribute('ldv_newspaper').setValue(param['ldv_newspaper']);
        }
        if (param['ldv_tvchannel'] != undefined && param['ldv_tvchannel'][0] != undefined) {
            //var tvid = param['tv_id'];
            //var tvname = param['tv_name'];
            //var IEntity = "ldv_tvchannel";
            //formContext.getAttribute('ldv_tvchannel')
            //    .setValue([{ id: tvid, name: tvname, entityType: IEntity }]);
            formContext.getAttribute('ldv_tvchannel').setValue(param['ldv_tvchannel']);
        }
        if (param['ldv_radiochannel'] != undefined && param['ldv_radiochannel'][0] != undefined) {
            //var radioid = param['radio_id'];
            //var radioname = param['radio_name'];
            //var IEntity = "ldv_radiochannel";
            //formContext.getAttribute('ldv_radiochannel')
            //    .setValue([{ id: radioid, name: radioname, entityType: IEntity }]);
            formContext.getAttribute('ldv_radiochannel').setValue(param['ldv_radiochannel']);
        }
        if (param['ldv_socialmedia'] != undefined && param['ldv_socialmedia'][0] != undefined) {
            //var socialid = param['social_id'];
            //var socialname = param['social_name'];
            //var IEntity = "ldv_socialmedia";
            //formContext.getAttribute('ldv_socialmedia')
            //    .setValue([{ id: socialid, name: socialname, entityType: IEntity }]);
            formContext.getAttribute('ldv_socialmedia').setValue(param['ldv_socialmedia']);
        }
        if (param['ldv_servicechannel'] != undefined && param['ldv_servicechannel'][0] != undefined) {
            //var servchannelid = param['servchannel_id'];
            //var servchannelname = param['servchannel_name'];
            //var servchannelentity = "ldv_servicechannels";
            //formContext.getAttribute('ldv_servicechannel')
            //    .setValue([{ id: servchannelid, name: servchannelname, entityType: servchannelentity }]);
            formContext.getAttribute('ldv_servicechannel').setValue(param['ldv_servicechannel']);
        }
        if (param['ldv_employeedepartment'] != undefined && param['ldv_employeedepartment'][0] != undefined) {
            //var empdepid = param['empdep_id'];
            //var empdepname = param['empdep_name'];
            //var empdepentity = "ldv_employeesdepartment";
            //formContext.getAttribute('ldv_employeedepartment')
            //    .setValue([{ id: empdepid, name: empdepname, entityType: empdepentity }]);
            formContext.getAttribute('ldv_employeedepartment').setValue(param['ldv_employeedepartment']);
        }
        if (param['ldv_disputeservicecategory'] != undefined && param['ldv_disputeservicecategory'][0] != undefined) {
            //var disputeservcatid = param['dipsuteservcat_id'];
            //var disputeservcatname = param['dipsuteservcat_name'];
            //var disputeservcatentity = "ldv_disputesservicescategory";
            //formContext.getAttribute('ldv_disputeservicecategory')
            //    .setValue([{ id: disputeservcatid, name: disputeservcatname, entityType: disputeservcatentity }]);
            formContext.getAttribute('ldv_disputeservicecategory').setValue(param['ldv_disputeservicecategory']);
        }

        if (param['ldv_disputesubservicecategory'] != undefined && param['ldv_disputesubservicecategory'][0] != undefined) {
            //var disputeSubservcatid = param['disputesubservcat_id'];
            //var disputeSubservcatname = param['disputesubservcat_name'];
            //var disputeSubservcatentity = "ldv_disputessubservicescategory";
            //formContext.getAttribute('ldv_disputesubservicecategory')
            //    .setValue([{ id: disputeSubservcatid, name: disputeSubservcatname, entityType: disputeSubservcatentity }]);
            formContext.getAttribute('ldv_disputesubservicecategory').setValue(param['ldv_disputesubservicecategory']);
        }
    }
}
function hidePreviousStageButton(stageBackActionContainer, stageAdvanceActionContainer) {
    //$("#stageBackActionContainer").hide();
    //$("#stageBackActionContainer").html("");
    //$("#stageAdvanceActionContainer").hide();
    //$("#stageAdvanceActionContainer").html("");
    //$("#stageAdvanceActionContainer").css("width", "90px");
    var alertMessage = { text: "File : ldv_incident.js , Function Name: hidePreviousStageButton  , deperected due to upgrade and replaced with HandleBPF" };
    Xrm.Navigation.openAlertDialog(alertMessage, null);
}
function ChangeCustomerCareProccess(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var activeStage = formContext.data.process.getActiveStage();
    var CSRDecision = formContext.getAttribute("ldv_csrdisputedecision").getValue();
    if (CSRDecision == 1) {
        if (activeStage.getName() == "Customer Care Decision") {
            var CSRComment = formContext.getAttribute("ldv_agentcomment").getValue();
            if (CSRComment != null) {
                formContext.data.process.moveNext();
            }
        }
    }
}
// not Used
// needs Odata update 
function MoveNextStage(ExecutionContext, stageToMove) {

    //var formContext;
    //try {

    //    formContext = ExecutionContext.getFormContext();
    //}
    //catch (e) {
    //    formContext = ExecutionContext;
    //}
    //var processId = formContext.getAttribute("processid").getValue();
    //// var currentStage = formContext.getAttribute("salesstage").getText();
    //// alert(currentStage);
    //var oDataURI = Xrm.Utility.getGlobalContext().getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ProcessStageSet?$select=ProcessStageId,StageName&$filter=ProcessId/Id eq (guid'" + processId + "')";
    //var req = new XMLHttpRequest();
    //req.open("GET", encodeURI(oDataURI), true);
    //req.setRequestHeader("Accept", "application/json");
    //req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //req.onreadystatechange = function () {
    //    if (this.readyState == 4 /* complete */) {
    //        req.onreadystatechange = null; //avoids memory leaks            
    //        if (this.status == 200) {
    //            var stages = JSON.parse(this.responseText);
    //            var counter = 0;
    //            var findIndex = -1;
    //            var findStage = stageToMove;
    //            //if (currentStage == "Develop")
    //            //    findStage = "propose";
    //            //else if (currentStage == "Qualify")
    //            //    findStage = "develop";
    //            //alert(stages.d.results.length);
    //            for (var i in stages.d.results) {
    //                // alert("INFO " + findIndex + " findStage " + findStage + "  ArrayStage " + stages.d.results[counter].StageName);
    //                if (stages.d.results[counter].StageName == findStage) {
    //                    findIndex = counter;
    //                    alert("Matched " + findIndex + " findStage " + findStage + "  ArrayStage " + stages.d.results[counter].StageName);
    //                    break;
    //                }
    //                counter++;
    //                //alert(stages.d.results[counter].StageName);
    //            }
    //            var nextStageId = stages.d.results[findIndex].ProcessStageId;
    //            formContext.getAttribute("stageid").setValue(nextStageId);
    //            formContext.getAttribute("stageid").setSubmitMode('always');
    //            //formContext.data.entity.save();
    //            //window.location.reload(true);
    //        } else {
    //            //errorCallback();
    //        }
    //    }
    //};
    //req.send();
    var alertMessage = { text: "File : ldv_incident.js , Function Name: MoveNextStage  , deperected due Old Odata usage" };
    Xrm.Navigation.openAlertDialog(alertMessage, null);
}
function InvokeSaveThen(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.data.save().then(successCallback, errorCallback);
    formContext.data.entity.save();
}

function successCallback(ExecutionContext) {
    //Needed to set form dirty to false explicitly as it is not done by platform
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.data.setFormDirty(false);
    var Id = formContext.data.entity.getId();
    //Xrm.Utility.openEntityForm("opportunity", Id);
}

function errorCallback(attr1, attr2) {
}

//----------------------------- Queue Item Details -----------------------------

function CanOpenQueueItemDetails() {
    return true;
}

function OpenQueueItemDetails(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var entityId = formContext.data.entity.getId();
    var urlstring = "";
    XrmServiceToolkit.Rest.RetrieveMultiple(
        "TaskSet",
        "$select=ActivityId,Subject,new_taskconfiguration,ActivityTypeCode,StateCode&$filter=RegardingObjectId/Id eq (guid'" + entityId + "') and ActivityTypeCode eq 'task' and StateCode/Value eq 0",
        function (results) {

            if (results != null && results.length > 0) {
                var allOpenTasksExceptSLA = [];
                for (var i = 0; i < results.length; i++) {
                    if (results[i].Subject.indexOf("SLA") == -1) {
                        allOpenTasksExceptSLA.push(results[i]);
                    }
                }
                if (allOpenTasksExceptSLA.length > 1)
                    //alert("There are more than tasks opend except SLA task");
                    Xrm.Navigation.openAlertDialog("There are more than tasks opend except SLA task", null);

                else if (allOpenTasksExceptSLA.length == 1) {
                    XrmServiceToolkit.Rest.RetrieveMultiple(
                        "QueueItemSet",
                        "$select=QueueItemId&$filter=ObjectId/Id eq(guid'" + allOpenTasksExceptSLA[0].ActivityId + "')",
                        function (results) {

                            if (results != null && results.length > 0) {
                                urlstring = "id={" + results[0].QueueItemId + "}&newWindow=true";
                            }
                        }, function (error) {
                        }, function onComplete() {
                        }, false
                    );
                }
            }

        }, function (error) {
        }, function onComplete() {
        }, false
    );
    if (urlstring != null) {
        if (urlstring === "") {
            //alert("There are no open tasks or Open task doesn't have queue item details.");
            Xrm.Navigation.openAlertDialog("There are no open tasks or Open task doesn't have queue item details.", null);

        }
        else {
            var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,width=1400, height=1400";
            window.open("/tracrm/main.aspx?etc=2029&pagetype=entityrecord&extraqs=" + encodeURIComponent(urlstring), "_blank", features, false);
        }
    }
}

//----------------------------- End Queue Item Details ----------------------------

function ValidatePleaseSpecifyYourNumber(ExecutionContext) {
    ValidateSMSSpamNumber(ExecutionContext, "ldv_pleasespecifyyournumber");
}

function ValidatePleaseSpecifyTheNumberRelatedToTheComplaint(ExecutionContext) {
    ValidateSMSSpamNumber(ExecutionContext, "ldv_pleasespecifythenumberrelatedtothecomplai");
}


function ValidateSMSSpamNumber(ExecutionContext, field) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getControl(field).clearNotification();
    var num = formContext.getAttribute(field).getValue();
    if (num == null) return;
    var numRegex = /^(?:\+971|0(0971)?)(5[01256])([0-9]{7})$/;
    if (!num.match(numRegex)) {
        formContext.getControl(field).setNotification("Number must be in this format (+ 971 + 2-digits mobile code + 7-digit local number)");
    }
}

function ValidateLastSMSDateInTheFuture(ExecutionContext) {
    SetDateFieldInTheFuture(ExecutionContext, "ldv_lastsmsdate", "Last SMS date should be accepts date value within maximum one month back.");
}

function SetDateFieldInTheFuture(ExecutionContext, fieldName, message) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var today = new Date();

    var lastsmsdate = formContext.getAttribute(fieldName).getValue();
    if (lastsmsdate != null) {

        var difference = today - lastsmsdate;
        var differenceInDays = difference / (24 * 60 * 60 * 1000);

        if (differenceInDays < 0 || differenceInDays > 31) {

            formContext.getControl(fieldName).setNotification(message);
        }
        else {
            formContext.getControl(fieldName).clearNotification();
        }
    }
    else {
        formContext.getControl(fieldName).clearNotification();
    }
}

function ValidateSender(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getControl("ldv_sender").clearNotification();
    var num = formContext.getAttribute("ldv_sender").getValue();
    if (num == null) return;
    var regex = /^-?\d+\.?\d*$/;
    if (num.match(regex)) {
        if (num.length > 6) {
            formContext.getControl("ldv_sender").setNotification("6 digits number only");
        }
    }
}


function SetPleaseSpecifyYourNumberField(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var regarding = formContext.getAttribute("ldv_isthecomplaintregardingyournumber").getValue();

    if (regarding == true) {
        var contactId = GetLookupObject(ExecutionContext, "customerid");
        if (contactId != null) {
            var query = ODataRequestJSONParsed(formContext, "/contacts?$select=mobilephone&$filter=contactid eq '" + contactId + "'");
            var result = query.value[0].mobilephone;
            formContext.getAttribute("ldv_pleasespecifyyournumber").setValue(result);

        }
    }

}

function SalesIdBehaviour(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 2) {
        var _stage = formContext.data.process.getActiveStage();
        if (_stage != null) {
            var activeStg = formContext.data.process.getActiveStage().getName();
            if (formContext.getAttribute(fields.requestType) != null) {
                var ReqType = formContext.getAttribute(fields.requestType).getValue();
                if (UserHasRole("Customer Service Representative") && /*activeStg == "Customer Care Decision" &&*/ ReqType == requestType.DisputeWithServiceProvider) {
                    SetFieldVisibility(ExecutionContext, fields.ServiceProviderSalesId, true);
                    //EnableField(ExecutionContext , fields.ServiceProviderSalesId);
                    //if (!formContext.getControl(fields.ServiceProviderSalesId).getVisible()) {
                    //    $(document).ready(function () {
                    //        ReLoadForm();
                    //    });
                    //}

                }
            }
        }
    }

}

function DisputeSubServiceCategory_OnChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 2) {
        if (formContext.getAttribute(fields.requestType) != null) {
            var ReqType = formContext.getAttribute(fields.requestType).getValue()

            if (formContext.getAttribute(fields.DisputeSubServiceCategory) != null) {
                var subServiceCategoryId = GetLookupObject(ExecutionContext, fields.DisputeSubServiceCategory)
                if (subServiceCategoryId == "{89311078-1E20-E711-80BF-00155D323725}" && UserHasRole("Customer Service Representative") && ReqType == requestType.DisputeWithServiceProvider) {
                    SetFieldRequiredLevel(ExecutionContext, "ldv_numberofnewlines", "required");
                    SetFieldVisibility(ExecutionContext, "ldv_numberofnewlines", true);
                    formContext.getAttribute("ldv_numberofnewlines").setSubmitMode('always');
                    SalesIdBehaviour(ExecutionContext);
                }
                else {
                    SetFieldRequiredLevel(ExecutionContext, "ldv_numberofnewlines", "none");
                    SetFieldVisibility(ExecutionContext, "ldv_numberofnewlines", false);
                    SetFieldVisibility(ExecutionContext, fields.ServiceProviderSalesId, false);
                    if (formType == 1)
                        formContext.getAttribute(fields.DisputeSubServiceCategoryClassification).setValue("");
                    //DisableField(ExecutionContext , fields.ServiceProviderSalesId);
                }
            }
        }
    }
    if (formType != 1) {
        SetTabVisibility(ExecutionContext, "ServiceSurvey", true);
        forceRefreshServiceSurvey(ExecutionContext);
    }
}

function SuggestionService_OnChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 2) {
        if (formContext.getAttribute(fields.requestType) != null) {
            var ReqType = formContext.getAttribute(fields.requestType).getValue();
            if (ReqType == requestType.suggestion) {
                if (formContext.getAttribute(fields.suggestionType) != null) {
                    var SugType = formContext.getAttribute(fields.suggestionType).getValue();
                    if (SugType == suggestionType.SuggestionRelatedtoService && formContext.getAttribute("ldv_servicecategory") != null && formContext.getAttribute("ldv_servicecategory").getValue() != null) {

                        //SetFieldVisibility(ExecutionContext , fields.service, true);
                        formContext.getAttribute(fields.service).setSubmitMode('always');
                        setFieldControlsVisibility(ExecutionContext, fields.service, true);
                        SetFieldRequiredLevel(ExecutionContext, fields.service, "required");
                        // DisableFieldControls(ExecutionContext , fields.service, false);
                    }
                    else {
                        //SetFieldVisibility(ExecutionContext , fields.service, false);
                        formContext.getAttribute(fields.service).setSubmitMode('always');
                        setFieldControlsVisibility(ExecutionContext, fields.service, false);
                        SetFieldRequiredLevel(ExecutionContext, fields.service, "none");
                        //DisableFieldControls(ExecutionContext , fields.service, true);
                    }
                }
            }

        }
    }
}

function DisputeService_OnChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 2) {
        if (formContext.getAttribute(fields.requestType) != null) {
            var ReqType = formContext.getAttribute(fields.requestType).getValue();
            if (ReqType == requestType.DisputeWithServiceProvider) {
                if (formContext.getAttribute(fields.DisputeServiceCategory) != null && formContext.getAttribute(fields.DisputeServiceCategory).getValue() != null) {

                    //SetFieldVisibility(ExecutionContext , fields.service, true);
                    // formContext.getAttribute(fields.DisputeSubServiceCategory).setSubmitMode('always');
                    setFieldControlsVisibility(ExecutionContext, fields.DisputeSubServiceCategory, true);
                    SetFieldRequiredLevel(ExecutionContext, fields.DisputeSubServiceCategory, "required");
                    // DisableFieldControls(ExecutionContext , fields.service, false);
                }
                else {
                    //SetFieldVisibility(ExecutionContext , fields.service, false);
                    // formContext.getAttribute(fields.DisputeSubServiceCategory).setSubmitMode('always');
                    formContext.getAttribute(fields.DisputeSubServiceCategory).setValue(null);
                    formContext.getAttribute(fields.DisputeSubServiceCategory).fireOnChange();
                    setFieldControlsVisibility(ExecutionContext, fields.DisputeSubServiceCategory, false);
                    SetFieldRequiredLevel(ExecutionContext, fields.DisputeSubServiceCategory, "none");
                    //DisableFieldControls(ExecutionContext , fields.service, true);
                }
            }
        }
    }
}

// Samar -- stop it
function setSubgridLookupFiltering(ExecutionContext) {
    //debugger;
    //var formContext;
    //try {

    //    formContext = ExecutionContext.getFormContext();
    //}
    //catch (e) {
    //    formContext = ExecutionContext;
    //}
    //var subgridAddButtonId = "CSRAttachments_addImageButton";
    //var subgridAddButton = document.getElementById(subgridAddButtonId) || window.parent.document.getElementById(subgridAddButtonId);

    //var getSubgridLookupAndAddFilter = function () {
    //    var subgridLookup = formContext.getControl("CSRAttachments").$c_0.$N_4.$Y_3;
    //    //var subgridLookup = formContext.getControl("lookup_CSRAttachments");

    //    subgridLookup.addPreSearch(function () {
    //        var filterQuery = "";
    //        filterQuery = "<filter type='and'><condition attribute='ldv_prefix' value='DSP_Required_Attachment_By_CSR' operator='eq'/></filter>";
    //        subgridLookup.addCustomFilter(filterQuery, "ldv_attachment");
    //    });
    //};
    //subgridAddButton.addEventListener("click", function () {
    //    setTimeout(getSubgridLookupAndAddFilter, 200);
    //});
    var alertMessage = { text: "File : ldv_incident.js , Function Name: setSubgridLookupFiltering  , deperected due to upgrade  " };
    Xrm.Navigation.openAlertDialog(alertMessage, null);

}


function Operator_Details_setting(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 2) {
        var _stage = formContext.data.process.getActiveStage();
        if (_stage != null) {
            var activeStg = formContext.data.process.getActiveStage().getName();
            if (activeStg == "Relevant Department Feedback") {
                var userName = Xrm.Utility.getGlobalContext().userSettings.userName;
                if (userName == "Departmentrep Rep") {
                    SetTabVisibility(ExecutionContext, "opereator_Details", true);
                    SetTabFieldsRequiredLevel(ExecutionContext, "opereator_Details", "required");
                    SetFieldRequiredLevel(ExecutionContext, "ldv_description", "none");
                    SetFieldRequiredLevel(ExecutionContext, "ldv_portaleffortinminutes", "none");
                    SetFieldRequiredLevel(ExecutionContext, "ldv_portalresourcename", "none");
                    EnableTab(ExecutionContext, "opereator_Details");
                }
                else {
                    SetTabFieldsRequiredLevel(ExecutionContext, "opereator_Details", "none");
                }

            }
        }
    }

}


function setsuggestioncategoryrequired(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    if (requestTypeCode == requestType.suggestion) {
        var formType = formContext.ui.getFormType();
        var _stage = formContext.data.process.getActiveStage();
        if (_stage != null) {
            var activeStg = formContext.data.process.getActiveStage().getName();
            if (activeStg == "Customer Care Decision" && formType == 2) {
               // SetFieldRequiredLevel(ExecutionContext, "ldv_suggestioncategory", "required");
                // Enable Suggestion Category 
                EnableField(ExecutionContext, fields.SuggestionCategory)
                DisableTab(ExecutionContext, "SuggestionCategory", false);
            }
        }
    }
}

function caseChannelOnchange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    requesrtypeValue = formContext.getAttribute(fields.requestType).getValue()
    if (requesrtypeValue != requestType.ComplaintAgainstTRA && requesrtypeValue != requestType.inquiry) {
        // SetFieldVisibility(ExecutionContext , fields.priority, false);
        ///formContext.getControl(fields.priority).setVisible(false);
    } else {
        //debugger
        //if (formContext.getAttribute("ldv_casechannle").getValue() != null ) {
        formContext.getControl(fields.priority).removeOption(1);

        //formContext.getControl(fields.priority).setDisabled(false);
        if (formContext.getAttribute("ldv_casechannle").getValue() != null) {
            casechannel = formContext.getAttribute("ldv_casechannle").getValue()[0].id;
            casechannelname = formContext.getAttribute("ldv_casechannle").getValue()[0].name;
            if (GuidsAreEqual(casechannel, caseChanal.Media)) {
                //formContext.getControl(fields.priority).addOption(1);
                AddOption(ExecutionContext, fields.priority, 1);
            }


            // SetFieldVisibility(ExecutionContext , fields.priority, true);
            formContext.getControl(fields.priority).setVisible(true);
        }
    }

}
function RequestTypeOnchange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    requesrtypeValue = formContext.getAttribute(fields.requestType).getValue()
    if (requesrtypeValue != requestType.ComplaintAgainstTRA && requesrtypeValue != requestType.inquiry) {
        //  SetFieldVisibility(ExecutionContext , fields.priority, false);
        ///formContext.getControl(fields.priority).setVisible(false);
    } else {
        //SetFieldVisibility(ExecutionContext , fields.priority, true);
        formContext.getControl(fields.priority).setVisible(true);
    }
}

// Added by Fady - Ribbon [Case Audit Button]

function SetCaseAuditButtonVisibility(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var status = formContext.getAttribute("statecode").getValue();
    //If status equals resolved and user has one of these roles, show the button
    if ((status == 1) && (UserHasRole("Quality Leader") || UserHasRole("System Administrator"))) {
        //return true;
        return false;
    }
    else {
        return false;
    }
}

function OpenCaseAuditRecord(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var caseId = formContext.data.entity.getId();
    var caseAuditRecordId = getCaseAuditRecord(ExecutionContext, caseId);



    if (!IsNull(caseAuditRecordId)) {
        var entityFormOptions = {};
        entityFormOptions["entityName"] = "ldv_caseaudit";

        var formParameters = {};
        formParameters["ldv_caseauditid"] = caseAuditRecordId;//"Sample";

        //Xrm.Navigation.openForm(entityFormOptions, formParameters);
        Xrm.Navigation.openForm("ldv_caseaudit", caseAuditRecordId)
    }
    else {
        var caseNumber = formContext.getAttribute("ticketnumber").getValue();
        var caseOwner = formContext.getAttribute("ownerid").getValue();

        var entityFormOptions = {};
        entityFormOptions["entityName"] = "ldv_caseaudit";

        var formParameters = {};

        formParameters["ldv_name"] = "Audit - " + caseNumber;

        //Set Case
        formParameters["ldv_case"] = caseId;
        formParameters["ldv_casename"] = caseNumber;

        //Set Resolved By
        formParameters["ldv_resolvedby"] = caseOwner[0].id;
        formParameters["ldv_resolvedbyname"] = caseOwner[0].name;

        Xrm.Navigation.openForm("ldv_caseaudit", null, formParameters);
        //Xrm.Navigation.openForm(entityFormOptions, formParameters);
    }

}

function getCaseAuditRecord(ExecutionContext, caseId) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl();

    var ODATA_EntityCollection = "/ldv_caseaudits?$select=ldv_caseauditid&$filter=(ldv_caseauditid eq '" + caseId + "')&$top=1";
    var caseAuditRecordId;
    var caseAuditRecord = ODataRequestJSONParsed(formContext, ODATA_EntityCollection);
    if (caseAuditRecord != null && caseAuditRecord.value != null && caseAuditRecord.value.length > 0) {
        if (caseAuditRecord.value[0].ldv_caseauditid != null)
            caseAuditRecordId = caseAuditRecord.value[0].ldv_caseauditid;
    }
    //var oDataSelect = serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection;
    //var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
    //var req = new XMLHttpRequest();
    //req.open("GET", oDataSelect, false);
    //req.setRequestHeader("Accept", "application/json");
    //req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //req.onreadystatechange = function () {
    //    if (this.readyState === 4) {
    //        this.onreadystatechange = null;
    //        if (this.status === 200) {
    //            var returned = JSON.parse(this.responseText).d;
    //            var results = returned.results;
    //            for (var i = 0; i < results.length; i++) {
    //                caseAuditRecordId = results[i].ldv_caseauditId;
    //            }
    //        } else {
    //            //Xrm.Utility.alertDialog(this.statusText);
    //        }
    //    }
    //};
    //req.send();

    return caseAuditRecordId;
}
// added By Hesham on 9-4-2020
function DisplayFollowUPSubGrid(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.ui.getFormType() != 1) {
        var satisficationOptionList = formContext.getAttribute(CaseLogicalObject.ldv_customersatisfactionsurvey).getSelectedOption();
        var statusCodeoptionList = formContext.getAttribute(CaseLogicalObject.statecode).getSelectedOption()
        if (satisficationOptionList != null && statusCodeoptionList !== null) {
            var satisficationValue = satisficationOptionList.value;
            var statusCodeValue = statusCodeoptionList.value;
            if (satisficationValue === 3 && statusCodeValue === 1) {
                formContext.ui.tabs.get(CaseLogicalObject.CaseFollowUpTab).setVisible(true);
            }
            else {
                formContext.ui.tabs.get(CaseLogicalObject.CaseFollowUpTab).setVisible(false);
            }
        }
        else {
            formContext.ui.tabs.get(CaseLogicalObject.CaseFollowUpTab).setVisible(false);
        }
    }
    else {
        formContext.ui.tabs.get(CaseLogicalObject.CaseFollowUpTab).setVisible(false);
    }
}

var CaseLogicalObject =
{
    customerid: "customerid",
    incidentid: "incidentid",
    CaseFollowUpTab: "CaseFollowUps",
    ldv_customersatisfactionsurvey: "ldv_customersatisfactionsurvey",
    statecode: "statecode"

}
function OpenFollowUpRecord(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var caseId = formContext.data.entity.getId();
    var caseNumber = formContext.getAttribute("ticketnumber").getValue();

    var entityFormOptions = {};
    entityFormOptions["entityName"] = "ldv_casefollowup";

    var formParameters = {};

    //Set Case
    formParameters["ldv_case"] = caseId;
    formParameters["ldv_casename"] = caseNumber;

    //Xrm.Navigation.openForm(entityFormOptions, formParameters);
    Xrm.Navigation.openForm("ldv_casefollowup", null, parameters);


}
function DisplayAddfollowButton(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.ui.getFormType() != 1) {
        //var satisficationOptionList = formContext.getAttribute(CaseLogicalObject.ldv_customersatisfactionsurvey).getSelectedOption();
        //var statusCodeoptionList = formContext.getAttribute(CaseLogicalObject.statecode).getSelectedOption()
        var satisficationValue = formContext.getAttribute(CaseLogicalObject.ldv_customersatisfactionsurvey).getValue();
        var statusCodeValue = formContext.getAttribute(CaseLogicalObject.statecode).getValue();
        if (satisficationValue != null && statusCodeValue !== null) {
            //var satisficationValue = satisficationOptionList.value;
            //var statusCodeValue = statusCodeoptionList.value;
            if (satisficationValue === 3 && statusCodeValue === 1) {
                if (UserHasRole("Customer Service Representative Customed Role") || UserHasRole("System Administrator") || UserHasRole("Customer Service Representative")) {
                    //return true;
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
//------------------------------------------------------------------------------------------

function HandleMultipleDepartmentRouting(ExecutionContext) {
    //debugger;
    ShowHideDepartmentFeedBackGrid(ExecutionContext);
    LockRelevantDepartmentFeedbackForm(ExecutionContext);
    CheckIfUserisMemebrofTeam(ExecutionContext);
}
function ShowHideDepartmentFeedBackGrid(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getAttribute("ldv_notresolveddepartment") == null) return;
    var departmentFeedbackCreated = formContext.getAttribute("ldv_notresolveddepartment").getValue();
    if (departmentFeedbackCreated != null)
        formContext.ui.tabs.get("DepartmentFeedbackRequests").setVisible(true);
    else
        formContext.ui.tabs.get("DepartmentFeedbackRequests").setVisible(false);

}
function LockRelevantDepartmentFeedbackForm(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    if (currentStatusCode == requestStatus.PendingonRelevantDepartment) {
        if (formContext.getControl("header_process_ldv_thirddepartment1") != null)
            formContext.getControl("header_process_ldv_thirddepartment1").setDisabled(true);
        if (formContext.getControl("header_process_ldv_seconddepartment1") != null)
            formContext.getControl("header_process_ldv_seconddepartment1").setDisabled(true);
        if (formContext.getControl("header_process_ldv_department1") != null)
            formContext.getControl("header_process_ldv_department1").setDisabled(true);

        //cause issue 

        if (formContext.getControl("header_process_ldv_thirddepartment") != null)
            formContext.getControl("header_process_ldv_thirddepartment").setDisabled(true);
        if (formContext.getControl("header_process_ldv_seconddepartment") != null)
            formContext.getControl("header_process_ldv_seconddepartment").setDisabled(true);
        if (formContext.getControl("header_process_ldv_department") != null)
            formContext.getControl("header_process_ldv_department").setDisabled(true);

        //Upgrade Issue
        if (formContext.getControl("header_process_ldv_thirddepartment_1") != null)
            formContext.getControl("header_process_ldv_thirddepartment_1").setDisabled(true);
        if (formContext.getControl("header_process_ldv_seconddepartment_1") != null)
            formContext.getControl("header_process_ldv_seconddepartment_1").setDisabled(true);
        if (formContext.getControl("header_process_ldv_department_1") != null)
            formContext.getControl("header_process_ldv_department_1").setDisabled(true);

        if (formContext.getControl("ldv_thirddepartment") != null)
            formContext.getControl("ldv_thirddepartment").setDisabled(true);
        if (formContext.getControl("ldv_seconddepartment") != null)
            formContext.getControl("ldv_seconddepartment").setDisabled(true);
        if (formContext.getControl("ldv_department") != null)
            formContext.getControl("ldv_department").setDisabled(true);

        var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
        //SetTabVisibility(ExecutionContext , "DisputeDeptFeedback", false);
        SetTabVisibility(ExecutionContext, "DeptFeedback", false);

        if (formContext.getControl("header_process_ldv_isresolvedbydepartment") != null)
            formContext.getControl("header_process_ldv_isresolvedbydepartment").setDisabled(true);

        formContext.data.entity.attributes.forEach(function (attribute, index) {
            var fields = formContext.getControl(attribute.getName());
            if (fields) {
                fields.setDisabled(true)
            }
        });
        if (formContext.getAttribute("ldv_departmentrepfeedback1") != null)
            formContext.getControl("ldv_departmentrepfeedback1").setDisabled(true);

        if (formContext.getAttribute("ldv_departmentrepfeedback_1") != null)
            formContext.getControl("ldv_departmentrepfeedback_1").setDisabled(true);
        //formContext.ui.tabs.get("DeptFeedback").sections.get("DeptResponse").setVisible(false);
    }
    else {
        var activeStage = formContext.data.process.getActiveStage();
        if (activeStage != null && activeStage.getName() == "Customer Care Decision") {
            if (formContext.getControl("header_process_ldv_thirddepartment") != null)
                formContext.getControl("header_process_ldv_thirddepartment").setDisabled(false);
            if (formContext.getControl("header_process_ldv_seconddepartment") != null)
                formContext.getControl("header_process_ldv_seconddepartment").setDisabled(false);
            if (formContext.getControl("header_process_ldv_department") != null)
                formContext.getControl("header_process_ldv_department").setDisabled(false);

            if (formContext.getControl("header_process_ldv_thirddepartment_2") != null)
                formContext.getControl("header_process_ldv_thirddepartment_2").setDisabled(false);
            if (formContext.getControl("header_process_ldv_seconddepartment_2") != null)
                formContext.getControl("header_process_ldv_seconddepartment_2").setDisabled(false);
            if (formContext.getControl("header_process_ldv_department_2") != null)
                formContext.getControl("header_process_ldv_department_2").setDisabled(false);
        }
    }
}
function PreFilterDepartmentLookup(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType != 1) {
        var activeStage = formContext.data.process.getActiveStage();
        if (activeStage != null && activeStage.getName() == "Customer Care Decision") {
            formContext.getControl("header_process_ldv_seconddepartment").addPreSearch(function () {
                FilterDepartment(ExecutionContext, "ldv_thirddepartment", "ldv_department", "header_process_ldv_seconddepartment");
            });
            formContext.getControl("header_process_ldv_thirddepartment").addPreSearch(function () {
                FilterDepartment(ExecutionContext, "ldv_seconddepartment", "ldv_department", "header_process_ldv_thirddepartment");
            });
            formContext.getControl("header_process_ldv_department").addPreSearch(function () {
                FilterDepartment(ExecutionContext, "ldv_seconddepartment", "ldv_thirddepartment", "header_process_ldv_department");
            });

            /// SMS Spam
            if (formContext.getControl("header_process_ldv_seconddepartment_2") != null) {
                formContext.getControl("header_process_ldv_seconddepartment_2").addPreSearch(function () {
                    FilterDepartment(ExecutionContext, "ldv_thirddepartment", "ldv_department", "header_process_ldv_seconddepartment_2");
                });
            }
            if (formContext.getControl("header_process_ldv_thirddepartment_2") != null) {
                formContext.getControl("header_process_ldv_thirddepartment_2").addPreSearch(function () {
                    FilterDepartment(ExecutionContext, "ldv_seconddepartment", "ldv_department", "header_process_ldv_thirddepartment_2");
                });
            }

            if (formContext.getControl("header_process_ldv_department_2") != null) {
                formContext.getControl("header_process_ldv_department_2").addPreSearch(function () {
                    FilterDepartment(ExecutionContext, "ldv_seconddepartment", "ldv_thirddepartment", "header_process_ldv_department_2");
                });
            }
        }
    }
}
function FilterDepartment(ExecutionContext, deptFieldName1, deptFieldName2, filteredDepartment) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    var dept1 = (formContext.getAttribute(deptFieldName1).getValue()) != null ? formContext.getAttribute(deptFieldName1).getValue()[0].id : null;
    var dept2 = (formContext.getAttribute(deptFieldName2).getValue()) != null ? formContext.getAttribute(deptFieldName2).getValue()[0].id : null;
    var fetchXml = "<filter type='and'>";
    if (dept2 != null || dept1 != null) {
        fetchXml += "<condition attribute='ldv_departmentid' operator='not-in'>";
        if (dept1 != null)
            fetchXml += "<value>" + dept1 + "</value>";
        if (dept2 != null)
            fetchXml += "<value>" + dept2 + "</value>";
        fetchXml += "</condition>";
    }
    if (requestTypeCode == requestType.DisputeWithServiceProvider
        || requestTypeCode == requestType.SMSSpam)
        fetchXml += "<condition attribute='ldv_name' operator='ne' value='MBME' />";
    //fetchXml += "<condition attribute='ldv_departmentid' operator='ne' value='{B252743F-9658-EA11-8470-000D3A23E6B3}'/>";
    fetchXml += "<condition attribute='statecode' operator='eq' value='0'/>";
    fetchXml += "<filter type='or'>" +
        "<condition attribute='ldv_itdepartment' operator='ne' value='1' />" +
        "<condition attribute='ldv_departmentid' operator='eq' uiname='IT Screening' uitype='ldv_department' value='{a3ed7882-c33b-ec11-80e4-00155d329348}' />" +
        "</filter>";
    fetchXml += "</filter>";
    formContext.getControl(filteredDepartment).addCustomFilter(fetchXml);
}

function ValidateMBMEDepartment(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    setFieldControlsVisibility(ExecutionContext, fields.AgentComment, false);
    SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "none");
    SetTabVisibility(ExecutionContext, "AgentComment", false);
    var departmentName = (formContext.getAttribute(fields.department).getValue()) != null ?
        formContext.getAttribute(fields.department).getValue()[0].name : "";
    var departmentName2 = (formContext.getAttribute(fields.department2).getValue()) != null ?
        (formContext.getAttribute(fields.department2).getValue())[0].name : "";
    var departmentName3 = formContext.getAttribute(fields.department3).getValue() != null ?
        formContext.getAttribute(fields.department3).getValue()[0].name : "";
    if (departmentName === "MBME" || departmentName2 === "MBME" || departmentName3 === "MBME") {
        setFieldControlsVisibility(ExecutionContext, fields.AgentComment, true);
        SetFieldRequiredLevel(ExecutionContext, fields.AgentComment, "required");
        SetTabVisibility(ExecutionContext, "AgentComment", true);

    }
}
function ClearFieldsOnCSRDecisionChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //  formContext.getAttribute(fields.CSRFeedback).setValue(null);
    var RequestType = formContext.getAttribute(fields.requestType);
    var CaseChannel = formContext.getAttribute("ldv_casechannle");
    var ClosedByAI = formContext.getAttribute("ldv_closedbyai");
    if (!(RequestType != null && RequestType.getValue() == requestType.inquiry
        && CaseChannel != null && CaseChannel.getValue() != null && CaseChannel.getValue()[0].id == "{0CFAE9D8-FA3C-EF11-8AAF-00224881B1FA}"
        && ClosedByAI != null && ClosedByAI.getValue() == true)) {
        formContext.getAttribute(fields.CustomerSatisfactionSurvey).setValue(null);
        formContext.getAttribute(fields.AgentComment).setValue(null);
        formContext.getAttribute(fields.department).setValue(null);
        formContext.getAttribute(fields.department2).setValue(null);
        formContext.getAttribute(fields.department3).setValue(null);
        formContext.getAttribute(fields.ReturnDate).setValue(null);
        var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
        if (requestTypeCode != requestType.DisputeWithServiceProvider && requestTypeCode != requestType.SMSSpam) {
            var csrDecision = formContext.getAttribute(fields.CSRDecision).getValue();
            if (csrDecision != complaintDecision.assessComplaint && csrDecision != complaintDecision.RouteToIVR) {
                formContext.getAttribute(fields.IVRMessage).setValue(null);
                formContext.getAttribute(fields.CSRFeedback).setValue(null);
            }
        }
        else {
            var csrDecision = formContext.getAttribute(fields.CSRDisputeDecision).getValue();
            if (csrDecision != CSRDecision.assessDispute && csrDecision != CSRDecision.RouteToIVR) {
                formContext.getAttribute(fields.IVRMessage).setValue(null);
                formContext.getAttribute(fields.CSRFeedback).setValue(null);
            }
        }
        formContext.getAttribute(fields.SetOnHold).setValue(false);
        formContext.ui.clearFormNotification("1");
    }

}
function ValidateReturnDate(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getControl(fields.ReturnDate).clearNotification();
    formContext.ui.clearFormNotification("1");
    var returnDate = formContext.getAttribute(fields.ReturnDate).getValue();
    var returnedDate = new Date(returnDate);
    var today = new Date();
    if (returnDate != null && (returnDate <= new Date()
        || (returnedDate.getDate() == today.getDate() && returnedDate.getMonth() == today.getMonth()
            && returnedDate.getFullYear() == today.getFullYear()))) {
        formContext.ui.setFormNotification("Return Date Must Be Bigger Than Today ", "ERROR", "1");
    }
}
function LockFormOnHold(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getAttribute(fields.CSRDecision).getValue() == complaintDecision.SetOnHold) {
        SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
        setFieldControlsVisibility(ExecutionContext, fields.department, false);
    }
    var statusCode = formContext.getAttribute(fields.requestStatus).getValue();
    if (statusCode == requestStatus.onHold || formContext.getAttribute(fields.SetOnHold).getValue() == true) {
        //setFieldControlsVisibility(ExecutionContext , "ldv_internalrequeststatusbeforeonhold", true);
        var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
        if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam)
            formContext.getControl("header_process_ldv_csrdisputedecision").setDisabled(true);
        else formContext.getControl("header_process_ldv_csrdecision").setDisabled(true);
        formContext.getControl("header_process_ldv_setonhold").setDisabled(true);
        formContext.getControl("header_process_ldv_returndate").setDisabled(true);

        //on hold reason
        if (formContext.getControl("header_process_ldv_onholdreasonid") != null)
            formContext.getControl("header_process_ldv_onholdreasonid").setDisabled(true);
        if (formContext.getControl("header_process_ldv_otherreason") != null)
            formContext.getControl("header_process_ldv_otherreason").setDisabled(true);

        formContext.getControl("ldv_details1").setDisabled(true);
        formContext.data.entity.attributes.forEach(function (attribute, index) {
            var fields = formContext.getControl(attribute.getName());
            if (fields) {
                fields.setDisabled(true)
            }
        });
    }
}
function ValidateIVR(ExecutionContext) {
    //debugger;
    ShowIVRIntegrationMessage(ExecutionContext);
    //LockFormSenttoIVR();
    //disableIVRFormFields();
    RemoveCSRDecision(ExecutionContext);
}
function LockFormSenttoIVR(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    var csrDecision = formContext.getAttribute(fields.CSRDecision).getValue();
    var csrDisputeDecision = formContext.getAttribute(fields.CSRDisputeDecision).getValue();

    if (currentStatusCode == requestStatus.SenttoIVR && (csrDisputeDecision == CSRDecision.RouteToIVR || csrDecision == complaintDecision.RouteToIVR)) {
        if (csrDecision == complaintDecision.RouteToIVR) {
            SetFieldRequiredLevel(ExecutionContext, fields.department, "none");
            setFieldControlsVisibility(ExecutionContext, fields.department, false);
        }
        //.....
        disableIVRFormFields(ExecutionContext);
        //DisableTab(ExecutionContext , "SuggestionCategory", true);

        // var fields = formContext.getAttribute("ldv_suggestioncategory").setDisabled(true);
        ////    if (fields) {
        ////        fields.setDisabled(true)

        // DisableFormFields(ExecutionContext);
        //......
        // suzan comment
        //var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
        //if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam)
        //    formContext.getControl("header_process_ldv_csrdisputedecision").setDisabled(true);
        //else formContext.getControl("header_process_ldv_csrdecision").setDisabled(true);
        //formContext.getControl("header_process_ldv_ivrmessage").setDisabled(true);
        //formContext.getControl("ldv_details").setDisabled(true);
        //formContext.data.entity.attributes.forEach(function (attribute, index) {
        //    var fields = formContext.getControl(attribute.getName());
        //    if (fields) {
        //        fields.setDisabled(true)
        //    }
        //});
        //
    }
}
function disableIVRFormFields(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.ui.controls.forEach(function (control, index) {
        var controlType = control.getControlType();
        if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
            if (typeof (control.setDisabled) != "undefined") control.setDisabled(true);
            // control.setDisabled(true);
        }
        //formContext.getControl("ldv_suggestioncategory").setDisabled(true);
        //DisableTab(ExecutionContext , "SuggestionCategoryDetails", true);

    });
}
function ShowIVRIntegrationMessage(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    // formContext.ui.clearFormNotification('IVRIntegartion');
    // check ivr message:
    // var showIVRMessage = formContext.getAttribute(fields.ShowIVRMessage).getValue();
    // if showIVRMessage = true and internal request status = sent to ivr and ivr integration message != null : show notification
    // if (showIVRMessage == true) {
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    if (currentStatusCode == requestStatus.SenttoIVR) { // if  internal request status  == sent to ivr
        var ivrIntegrationMessage = formContext.getAttribute(fields.IVRIntegrationMessage).getValue();
        if (ivrIntegrationMessage != null && ivrIntegrationMessage != "") {
            //alert(ivrIntegrationMessage);
            formContext.ui.setFormNotification(ivrIntegrationMessage, "INFO", "IVRIntegartion");
            // reset show ivr message flag
        }
        // }
    }
}
function RemoveCSRDecision(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    if (currentStatusCode == requestStatus.SenttoIVR) {
        if (requestTypeCode == requestType.inquiry || requestTypeCode == requestType.ComplaintAgainstTRA
            || requestTypeCode == requestType.suggestion) {
            var csrDecison = formContext.getAttribute("ldv_csrdecision").getValue();
            if (csrDecison == null) {
                var pickList = formContext.getControl("header_process_ldv_csrdecision");
                var options = formContext.getAttribute("ldv_csrdecision").getOptions();
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value != complaintDecision.assessComplaint) {
                        pickList.removeOption(options[i].value);
                    }
                }
            }
        }
        else if (requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) {
            var csrDisputeDecison = formContext.getAttribute("ldv_csrdisputedecision").getValue();
            if (csrDisputeDecison == null) {
                var disputePickList = formContext.getControl("header_process_ldv_csrdisputedecision");
                var disputeOptions = formContext.getAttribute("ldv_csrdisputedecision").getOptions();
                for (var i = 0; i < disputeOptions.length; i++) {
                    if (disputeOptions[i].value != CSRDecision.assessDispute) {
                        disputePickList.removeOption(disputeOptions[i].value);
                    }
                }
            }
        }
    }



}
//-----------------------------------------------------------------------------------

function showHideServiceSurvey(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    //var activeStage = formContext.data.process.getActiveStage();
    //if (activeStage.getName() == "Customer Care Decision" || activeStage.getName() == "Request Submission (Active)") {
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    if (requestTypeCode == requestType.inquiry || requestTypeCode == requestType.ComplaintAgainstTRA || requestTypeCode == requestType.DisputeWithServiceProvider) {
        var service = formContext.getAttribute(fields.service).getValue();
        var disputeService = formContext.getAttribute(fields.DisputeSubServiceCategory).getValue();
        if (!IsNull(service) || !IsNull(disputeService)) {
            SetTabVisibility(ExecutionContext, "ServiceSurvey", true);
        }
        else {
            SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
        }
    }
    else {
        SetTabVisibility(ExecutionContext, "ServiceSurvey", false);
    }
}

function forceRefreshServiceSurvey(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var webResourceControl = formContext.getControl("WebResource_servicesurvey");
    var src = webResourceControl.getSrc();
    webResourceControl.setSrc(null);
    webResourceControl.setSrc(src);
}

function FilterClassification(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getAttribute("ldv_disputesubservicecategoryclassification") != null && formContext.getAttribute("ldv_disputesubservicecategoryclassification").getValue() != null) {
        var recordid = formContext.getAttribute("ldv_disputesubservicecategoryclassification").getValue();

        /*var req = new XMLHttpRequest();
        req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ldv_disputesubservicecategoryclassificationSet(guid'" + recordid[0].id + "')?$select=ldv_IsCoverage", false);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                this.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.responseText).d;
                    var ldv_IsCoverage = result.ldv_IsCoverage;
                    if (ldv_IsCoverage != null && ldv_IsCoverage == true) {
                        setFieldControlsVisibility(ExecutionContext , "ldv_disputeemirate", true);
                        SetFieldRequiredLevel(ExecutionContext , "ldv_disputeemirate", "required");
                        formContext.getControl("ldv_disputeemirate").setDisabled(false);

                        setFieldControlsVisibility(ExecutionContext , "ldv_area", true);
                        SetFieldRequiredLevel(ExecutionContext , "ldv_area", "required");
                        formContext.getControl("ldv_area").setDisabled(false);
                        var formType = formContext.ui.getFormType();
                        if (formType == 2 && formContext.getAttribute('ownerid').getValue() != null) {
                            var logedinuserid = Xrm.Utility.getGlobalContext().userSettings.userId;
                            var ownerid = formContext.getAttribute('ownerid').getValue()[0].id;
                            if (logedinuserid != ownerid) {
                                formContext.getControl("ldv_area").setDisabled(true);
                                formContext.getControl("ldv_disputeemirate").setDisabled(true);
                            }
                        }

                    }
                    else {
                        setFieldControlsVisibility(ExecutionContext , "ldv_disputeemirate", false);
                        SetFieldRequiredLevel(ExecutionContext , "ldv_disputeemirate", "none");
                        setFieldControlsVisibility(ExecutionContext , "ldv_area", false);
                        SetFieldRequiredLevel(ExecutionContext , "ldv_area", "none");
                    }
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();*/
        var EntityCollection = "/ldv_disputesubservicecategoryclassifications('" + recordid[0].id.replace("{", "").replace("}", "") + "')?$select=ldv_iscoverage";
        var DisputeSubServiceCatgeoryClassification = ODataRequestJSONParsed(formContext, EntityCollection);
        if (DisputeSubServiceCatgeoryClassification != null && DisputeSubServiceCatgeoryClassification.value != null && DisputeSubServiceCatgeoryClassification.value.length > 0) {
            var ldv_IsCoverage = rDisputeSubServiceCatgeoryClassification.value[0].ldv_iscoverage;
            if (ldv_IsCoverage != null && ldv_IsCoverage == true) {
                setFieldControlsVisibility(ExecutionContext, "ldv_disputeemirate", true);
                SetFieldRequiredLevel(ExecutionContext, "ldv_disputeemirate", "required");
                formContext.getControl("ldv_disputeemirate").setDisabled(false);

                setFieldControlsVisibility(ExecutionContext, "ldv_area", true);
                SetFieldRequiredLevel(ExecutionContext, "ldv_area", "required");
                formContext.getControl("ldv_area").setDisabled(false);
                var formType = formContext.ui.getFormType();
                if (formType == 2 && formContext.getAttribute('ownerid').getValue() != null) {
                    var logedinuserid = Xrm.Utility.getGlobalContext().userSettings.userId;
                    var ownerid = formContext.getAttribute('ownerid').getValue()[0].id;
                    if (logedinuserid != ownerid) {
                        formContext.getControl("ldv_area").setDisabled(true);
                        formContext.getControl("ldv_disputeemirate").setDisabled(true);
                    }
                }
            }
            else {
                setFieldControlsVisibility(ExecutionContext, "ldv_disputeemirate", false);
                SetFieldRequiredLevel(ExecutionContext, "ldv_disputeemirate", "none");
                setFieldControlsVisibility(ExecutionContext, "ldv_area", false);
                SetFieldRequiredLevel(ExecutionContext, "ldv_area", "none");
            }
        }
        else {
            setFieldControlsVisibility(ExecutionContext, "ldv_disputeemirate", false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_disputeemirate", "none");
            setFieldControlsVisibility(ExecutionContext, "ldv_area", false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_area", "none");
        }

    }
    else {
        setFieldControlsVisibility(ExecutionContext, "ldv_disputeemirate", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_disputeemirate", "none");
        setFieldControlsVisibility(ExecutionContext, "ldv_area", false);
        SetFieldRequiredLevel(ExecutionContext, "ldv_area", "none");
    }
}

function UnlockClassification(ExecutionContext) {
    //FilterClassification();
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    var stage = formContext.data.process.getActiveStage();
    if (stage != null) {
        var activeStg = formContext.data.process.getActiveStage().getName();
        if (formContext.getAttribute(fields.requestType).getValue() != null && formType == 2 && activeStg == "Customer Care Decision") {

            var logedinuserid = Xrm.Utility.getGlobalContext().userSettings.userId;
            var ownerid = formContext.getAttribute('ownerid').getValue()[0].id;
            requesrtypeValue = formContext.getAttribute(fields.requestType).getValue()
            if (requesrtypeValue == requestType.DisputeWithServiceProvider && logedinuserid == ownerid) {
                // formContext.getControl("ldv_disputesubservicecategoryclassification").setDisabled(false);
                SetFieldRequiredLevel(ExecutionContext, "ldv_disputesubservicecategoryclassification", "required");

                //formContext.getControl("ldv_disputesubservicecategory").setDisabled(false);
                SetFieldRequiredLevel(ExecutionContext, "ldv_disputesubservicecategory", "required");
                // formContext.getControl(fields.DisputeServiceCategory).setDisabled(false);
                SetFieldRequiredLevel(ExecutionContext, fields.DisputeServiceCategory, "required");

            }
        }
    }
    if (formType == 4) {
        if (formContext.getAttribute("ldv_disputeemirate") != null) {
            formContext.getControl("ldv_area").setDisabled(true);
            formContext.getControl("ldv_disputeemirate").setDisabled(true);
        }
    }

}

function ClearSubCategory(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getAttribute(fields.DisputeServiceCategory).setSubmitMode('always');
    if (formContext.getAttribute("ldv_disputesubservicecategoryclassification") != null && formContext.getAttribute("ldv_disputesubservicecategoryclassification").getValue() != null) {
        formContext.getAttribute("ldv_disputesubservicecategoryclassification").setValue(null);
        //formContext.getAttribute("ldv_disputesubservicecategoryclassification").fireOnChange();

    }
    if (formContext.getAttribute("ldv_disputesubservicecategory") != null && formContext.getAttribute("ldv_disputesubservicecategory").getValue() != null) {
        formContext.getAttribute("ldv_disputesubservicecategory").setValue(null);
        //formContext.getAttribute("ldv_disputesubservicecategory").fireOnChange();
    }

    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    if (currentStatusCode == requestStatus.PendingOnServiceProvider) {
        formContext.getControl("ldv_disputesubservicecategory").setDisabled(true);
        formContext.getControl("ldv_disputeservicecategory").setDisabled(true);
        formContext.getControl("ldv_disputesubservicecategoryclassification").setDisabled(true);
    }
    else {
        formContext.getControl("ldv_disputesubservicecategory").setDisabled(false);
        formContext.getControl("ldv_disputeservicecategory").setDisabled(false);
        formContext.getControl("ldv_disputesubservicecategoryclassification").setDisabled(false);
    }

}
function ClearClassifcation(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    formContext.getAttribute(fields.DisputeSubServiceCategory).setSubmitMode('always');
    if (formContext.getAttribute("ldv_disputesubservicecategoryclassification") != null && formContext.getAttribute("ldv_disputesubservicecategoryclassification").getValue() != null) {
        formContext.getAttribute("ldv_disputesubservicecategoryclassification").setValue(null);
        formContext.getAttribute("ldv_disputesubservicecategoryclassification").fireOnChange();
    }
}

//on hold
function onholdreason_onchange(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getAttribute(fields.OnHoldReason).getValue() != null) {
        var name = formContext.getAttribute(fields.OnHoldReason).getValue()[0].name;
        if (name.toLowerCase() == 'other') {
            //show other field and make it mandatory 
            setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, true);
            if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "required");
            }

            if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "required");
            }


        } else {
            setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, false);
            if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "none");
                formContext.getAttribute(fields.OnHoldOtherReasonHeader).setValue("");
            }

            if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
                SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "none");
                formContext.getAttribute(fields.OnHoldOtherReason).setValue("");
            }

        }
    } else {
        setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, false);
        if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
            SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "none");
            formContext.getAttribute(fields.OnHoldOtherReasonHeader).setValue("");
        }

        if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
            SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "none");
            formContext.getAttribute(fields.OnHoldOtherReason).setValue("");
        }
    }
}
//on hold
function onholdreason_filterByCaseType(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getControl(fields.OnHoldReasonHeader) != null) {
        formContext.getControl(fields.OnHoldReasonHeader).addPreSearch(function () {

            var typeCode = (formContext.getAttribute(fields.requestType).getValue()) != null ? formContext.getAttribute(fields.requestType).getValue() : null;

            var fetchXml = "<filter type='and'>";

            if (typeCode != null) {
                fetchXml += "<condition attribute='ldv_requesttype' operator='eq' ";
                fetchXml += "value = '" + typeCode + "'";
                fetchXml += "/>";

            }
            fetchXml += "</filter>";
            formContext.getControl(fields.OnHoldReasonHeader).addCustomFilter(fetchXml);

        });
    }



}

function hideAndClear_onholdreasonfields(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getAttribute(fields.OnHoldOtherReasonHeader) != null) {
        SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReasonHeader, "none");
        formContext.getAttribute(fields.OnHoldOtherReasonHeader).setValue("");
        setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReasonHeader, false);
    }

    if (formContext.getAttribute(fields.OnHoldOtherReason) != null) {
        SetFieldRequiredLevel(ExecutionContext, fields.OnHoldOtherReason, "none");
        formContext.getAttribute(fields.OnHoldOtherReason).setValue("");
        setFieldControlsVisibility(ExecutionContext, fields.OnHoldOtherReason, false);
    }

    if (formContext.getAttribute(fields.OnHoldReason) != null) {
        SetFieldRequiredLevel(ExecutionContext, fields.OnHoldReason, "none");
        formContext.getAttribute(fields.OnHoldReason).setValue(null);
        setFieldControlsVisibility(ExecutionContext, fields.OnHoldReason, false);
    }

    if (formContext.getAttribute(fields.OnHoldReasonHeader) != null) {
        SetFieldRequiredLevel(ExecutionContext, fields.OnHoldReasonHeader, "none");
        formContext.getAttribute(fields.OnHoldReasonHeader).setValue(null);
        setFieldControlsVisibility(ExecutionContext, fields.OnHoldReasonHeader, false);
    }

}

// Remove OnHold - Route to IVR
function RemoveOnhold(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var GetDecision = formContext.getControl('header_process_ldv_csrdecision');
    var CSRDecision = formContext.getControl('ldv_csrdecision');
    var options = formContext.getAttribute('ldv_csrdecision').getOptions();
    if (GetDecision != null) {
        //for (var i = 0; i < options.length; i++) {
        GetDecision.removeOption(4); // On-Hold
        CSRDecision.removeOption(4); // On-Hold
        GetDecision.removeOption(5); // Route to IVR
        CSRDecision.removeOption(5); // Route to IVR
        //}
    }

    var GetDisputeDecision = formContext.getControl('header_process_ldv_csrdisputedecision');
    var CSRDisputeDecision = formContext.getControl('ldv_csrdecision');
    var options = formContext.getAttribute('ldv_csrdisputedecision').getOptions();
    if (GetDisputeDecision != null) {
        //for (var i = 0; i < options.length; i++) {
        GetDisputeDecision.removeOption(4); // On-Hold 
        CSRDisputeDecision.removeOption(4); // On-Hold
        GetDisputeDecision.removeOption(5); // Route to IVR
        CSRDisputeDecision.removeOption(5); // Route to IVR
        //}
    }
}

function HideCompalaintypeField(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();

    if (requestTypeCode == requestType.ComplaintAgainstTRA) {
        formContext.getControl(fields.complaintType).removeOption(2);


    }
}



function disableForm(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    let formControls = formContext.ui.controls;

    for (var i = 0; i < formControls.getLength(); i++) {
        if (control.getName() != "" && control.getName() != null) {

            formContext.getControl(control.getName()).setDisabled(true);

        }
    }

}



function Dispute_IfParentCaseIsSPC(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
    if (requestTypeCode == requestType.DisputeWithServiceProvider) {
        var parentCaseId = formContext.getAttribute('parentcaseid').getValue();

        if (!IsNull(parentCaseId) && parentCaseId != undefined) {
            try {


                var returnedParentCase = ODataRequestJSONParsed(formContext, "/incidents?$select=ldv_requesttype&$filter=incidentid eq '" + parentCaseId + "'");
                if (!IsNull(returnedParentCase) && !IsNull(returnedParentCase.value) && returnedParentCase.value.length > 0) {

                    var parentRequestType = returnedParentCase.value[0].ldv_requesttype;
                    if (parentRequestType != null && parentRequestType > 0) {
                        if (parentRequestType == 7) {
                            console.log("Test");
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            catch (e) { console.log(e.message); }
        }
    }
}

function Ai_request_type_OnChange(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
    var pickList = formContext.getControl("header_process_ldv_csrdecision");
    if (formContext.getAttribute(fields.requestType).getValue() == requestType.suggestion && currentStatusCode != requestStatus.closed) {
        //SetFieldRequiredLevel(ExecutionContext , fields.AiRequestType, "required");
        var aiRequestTypeValue = formContext.getAttribute(fields.AiRequestType).getValue();


        if (formContext.getAttribute(fields.AiRequestType).getValue() == null && formContext.getAttribute(fields.SubmitRequest).getValue() == true) {
            // update this from CRM and set field default value to Suggestion
            //remove the empty attribute
            //var selectElement = document.getElementById('header_process_ldv_airequesttype_i');
            //if (selectElement) {
            //    var options = selectElement.querySelectorAll('option');
            //    if (options.length > 0 && options[0].value === '') {
            //        selectElement.removeChild(options[0]);
            //    }
            //}
            ////make suggestion default value 
            //formContext.getAttribute(fields.AiRequestType).setValue(aiRequestType.Suggestion);

        }

        if (aiRequestTypeValue === aiRequestType.Complain) {
            SetFieldRequiredLevel(ExecutionContext, fields.SuggestionCategory, "none");

            // Get the current options
            var options = formContext.getAttribute("ldv_csrdecision").getOptions();

            // Filter out options not equal to complaintDecision.assessComplaint
            var filteredOptions = options.filter(function (option) {
                return option.value == complaintDecision.assessComplaint;
            });

            // Clear existing options
            pickList.clearOptions();

            // Add filtered options
            for (var i = 0; i < filteredOptions.length; i++) {
                pickList.addOption(filteredOptions[i]);
            }
        } else {
          //  SetFieldRequiredLevel(ExecutionContext, fields.SuggestionCategory, "required");

            // Restore all original options
            var originalOptions = formContext.getAttribute("ldv_csrdecision").getOptions();
            if (formContext.getAttribute(fields.CSRDecision).getValue() == null && pickList !== null) {
                // Clear existing options
                pickList.clearOptions();

                // Add all original options
                for (var i = 0; i < originalOptions.length; i++) {
                    pickList.addOption(originalOptions[i]);
                }
            }

        }

        // // Dispute CR - 17/03/2024 - Hide On Hold option from CSR Dispute Decision
        RemoveOnhold(ExecutionContext);
    }

}

function Dispute_clearandresetRoutingandvalidflagfields(ExecutionContext, showInvalid, showRouteSPReasons) {
    // added for Dispute CR
    // Hide Invalid flag and set not Required
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    if (formContext.getControl(fields.Invalid) != null && showInvalid == false) {
        //setFieldControlsVisibility(ExecutionContext , fields.Invalid, false);
        formContext.getControl(fields.Invalid).setVisible(false);
        //SetFieldRequiredLevel(ExecutionContext , fields.Invalid, "none");
        formContext.getControl(fields.Invalid).setRequiredLevel("none");
        formContext.getControl(fields.Invalid).getAttribute(fields.Invalid).setRequiredLevel("none");
    }
    else if (formContext.getControl(fields.Invalid) != null && showInvalid == true) {
        //setFieldControlsVisibility(ExecutionContext , fields.Invalid, false);
        formContext.getControl(fields.Invalid).setVisible(true);
        //SetFieldRequiredLevel(ExecutionContext , fields.Invalid, "none");
        //formContext.getControl(fields.Invalid).setRequiredLevel("required");
        formContext.getControl(fields.Invalid).getAttribute(fields.Invalid).setRequiredLevel("required");
    }

    // Hide Route to SP Reasons and set not required
    if (formContext.getControl(fields.RoutetoSpReasons) != null && formContext.getAttribute("ldv_routetospreasons") != null && showRouteSPReasons == false) {
        //setFieldControlsVisibility(ExecutionContext , fields.RoutetoSpReasons, false);
        formContext.getControl(fields.RoutetoSpReasons).setVisible(false);
        //SetFieldRequiredLevel(ExecutionContext , fields.RoutetoSpReasons, "none");
        //formContext.getControl(fields.RoutetoSpReasons).setRequiredLevel("none");
        formContext.getControl(fields.RoutetoSpReasons).getAttribute(fields.RoutetoSpReasons).setRequiredLevel("none");
        if (formContext.getAttribute("ldv_routetospreasons") != null && formContext.getAttribute("ldv_routetospreasons").getValue() != null)
            formContext.getAttribute("ldv_routetospreasons").setValue(null);
    }
    else if (formContext.getControl(fields.RoutetoSpReasons) != null && formContext.getAttribute("ldv_routetospreasons") != null && showRouteSPReasons == true) {
        //setFieldControlsVisibility(ExecutionContext , fields.RoutetoSpReasons, false);
        formContext.getControl(fields.RoutetoSpReasons).setVisible(true);
        //SetFieldRequiredLevel(ExecutionContext , fields.RoutetoSpReasons, "none");
        //formContext.getControl(fields.RoutetoSpReasons).setRequiredLevel("required");
        formContext.getControl(fields.RoutetoSpReasons).getAttribute(fields.RoutetoSpReasons).setRequiredLevel("required");
        var CSRDisputeDecision = formContext.getAttribute(fields.CSRDisputeDecision);
        if (formContext.getAttribute("ldv_routetospreasons") != null && formContext.getAttribute("ldv_routetospreasons").getValue() != null
            && CSRDisputeDecision != null && !(CSRDisputeDecision.getValue() == CSRDecision.Escalatetolead || CSRDisputeDecision.getValue() == CSRDecision.RouteToServiceProvider))
            formContext.getAttribute("ldv_routetospreasons").setValue(null);
    }
}

function showorHideInvalidReasonsdependonInvalidFlag(ExecutionContext, OnLoad) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var Invalid = formContext.getControl(fields.Invalid);
    var InvalidFlag = formContext.getAttribute("ldv_invalid");
    console.log("Invalid Flag value is " + InvalidFlag.getValue());
    // MB : Support CR to make the field appear only when it is invalid
    if (Invalid != null && InvalidFlag != null && InvalidFlag.getValue() != true) {
        // show Invalid Reasons and Set as required
        //setFieldControlsVisibility(ExecutionContext , fields.InvalidReasons, true);
        if (formContext.getControl(fields.InvalidReasons) != null) {
            formContext.getControl(fields.InvalidReasons).setVisible(true);
            //formContext.getControl(fields.InvalidReasons).setRequiredLevel("required");
            formContext.getControl(fields.InvalidReasons).getAttribute(fields.InvalidReasons).setRequiredLevel("required");
        }
        //SetFieldRequiredLevel(ExecutionContext , fields.InvalidReasons, "required");

        /// Dispute CR - 17/03/2024 - Hide or Show the Invalid and Route to SP Reasons

        /// will remove Options of (RouteToIVR , and Route to Department)
        if (formContext.getControl(fields.CSRDisputeDecision) != null) {
            formContext.getControl(fields.CSRDisputeDecision).removeOption(CSRDecision.RouteToIVR);
            formContext.getControl(fields.CSRDisputeDecision).removeOption(CSRDecision.RouteToDepartment);
        }
        if (formContext.getControl("header_process_ldv_csrdisputedecision") != null) {
            formContext.getControl("header_process_ldv_csrdisputedecision").removeOption(CSRDecision.RouteToIVR);
            formContext.getControl("header_process_ldv_csrdisputedecision").removeOption(CSRDecision.RouteToDepartment);
        }
        /// Dispute CR - 3/4/2026 to change the reasons to differ based on the CSR Decision
        console.log("CSRDisputeDecision: " + formContext.getControl(fields.CSRDisputeDecision).getAttribute(fields.CSRDisputeDecision).getValue())
        if (formContext.getControl(fields.CSRDisputeDecision) != null && formContext.getControl(fields.CSRDisputeDecision).getAttribute(fields.CSRDisputeDecision).getValue() === CSRDecision.assessDispute) {
            //remove unrelated options for Dispute Assessment
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Wrong_Feedback)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Missing_Details)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Missing_Docs)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Feedback_not_clear)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Extra_Info_required)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Final_Billing_Approval)
            //add related options for Dispute Assessment
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.No_Issue_from_SP_Side)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Consumer_Behavior)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Process_and_Policies)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.TDRA_related)
        } else {
            //remove the unrelated options for other CSR Decision
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.No_Issue_from_SP_Side)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Consumer_Behavior)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.Process_and_Policies)
            formContext.getControl(fields.InvalidReasons).removeOption(InvalidReasons.TDRA_related)
            //add related options for other CSR Decision
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Wrong_Feedback)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Missing_Details)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Missing_Docs)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Feedback_not_clear)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Extra_Info_required)
            AddOption(ExecutionContext, fields.InvalidReasons, InvalidReasons.Final_Billing_Approval)
        }
        //console.log("CSRDisputeDecision in the process header: " + formContext.getControl("header_process_ldv_invalidreasons").getAttribute("header_process_ldv_invalidreasons").getValue())
        //if (formContext.getControl("header_process_ldv_invalidreasons") != null && formContext.getControl("header_process_ldv_invalidreasons").getAttribute("header_process_ldv_invalidreasons").getValue() === CSRDecision.assessDispute) {
        //    //remove the unrelated options for other CSR Decision
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Wrong_Feedback)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Missing_Details)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Missing_Docs)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Feedback_not_clear)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Extra_Info_required)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Final_Billing_Approval)

        //    //add related options for Dispute Assessment
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.No_Issue_from_SP_Side)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Consumer_Behavior)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Process_and_Policies)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.TDRA_related)
        //} else {
        //    //remove the unrelated options for other CSR Decision
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.No_Issue_from_SP_Side)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Consumer_Behavior)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.Process_and_Policies)
        //    formContext.getControl("header_process_ldv_invalidreasons").removeOption(InvalidReasons.TDRA_related)

        //    //add related options for other CSR Decision
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Wrong_Feedback)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Missing_Details)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Missing_Docs)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Feedback_not_clear)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Extra_Info_required)
        //    AddOption(ExecutionContext, "header_process_ldv_invalidreasons", InvalidReasons.Final_Billing_Approval)
        //}
    }
    else {
        // Hide Invalid Reasons and Set as not required
        //setFieldControlsVisibility(ExecutionContext , fields.InvalidReasons, false);
        if (formContext.getControl(fields.InvalidReasons) != null) {
            formContext.getControl(fields.InvalidReasons).setVisible(false);
            //formContext.getControl(fields.InvalidReasons).setRequiredLevel("none");
            formContext.getControl(fields.InvalidReasons).getAttribute(fields.InvalidReasons).setRequiredLevel("none");
        }
        //SetFieldRequiredLevel(ExecutionContext , fields.InvalidReasons, "none");

        // Dispute CR 
        /// will add Options of (RouteToIVR and Route to Department)
        if (OnLoad == false) {
            if (formContext.getControl(fields.CSRDisputeDecision) != null) {
                AddOption(ExecutionContext, fields.CSRDisputeDecision, CSRDecision.RouteToDepartment);
                //var RouteToDepartment = { value: CSRDecision.RouteToDepartment, text: "Route to Department" };
                //formContext.getControl(fields.CSRDisputeDecision).addOption(RouteToDepartment);
                //formContext.getControl(fields.CSRDisputeDecision).addOption(CSRDecision.RouteToIVR);
                //formContext.getControl(fields.CSRDisputeDecision).addOption(CSRDecision.RouteToDepartment);
            }
            if (formContext.getControl("header_process_ldv_csrdisputedecision") != null) {
                //AddOption(ExecutionContext,"header_process_ldv_csrdisputedecision", CSRDecision.RouteToIVR);
                AddOption(ExecutionContext, "header_process_ldv_csrdisputedecision", CSRDecision.RouteToDepartment);
                //formContext.getControl("header_process_ldv_csrdisputedecision").addOption(CSRDecision.RouteToIVR);
                //formContext.getControl("header_process_ldv_csrdisputedecision").addOption(CSRDecision.RouteToDepartment);
            }
        }
    }
}

function getPriorityfromSubServiceCategoryClassification(ExecutionContext) {
    // check the request is dispute 
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var formType = formContext.ui.getFormType();
    if (formType == 1) {
        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null && RequestType.getValue() == requestType.DisputeWithServiceProvider) {
            var DisputeSubServiceCategoryClassification = formContext.getAttribute(fields.DisputeSubServiceCategoryClassification);
            if (DisputeSubServiceCategoryClassification != null && DisputeSubServiceCategoryClassification.getValue() != null) {
                var EntityCollection = "/ldv_disputesubservicecategoryclassifications?$select=ldv_prioritycode&$filter=ldv_disputesubservicecategoryclassificationid eq '" + DisputeSubServiceCategoryClassification.getValue()[0].id.replace("{", "").replace("}", "") + "'";
                //var result = getEntityRecordOData(EntityCollection);
                var disputeserviceclassification = ODataRequestJSONParsed(formContext, EntityCollection);
                if (disputeserviceclassification != null && disputeserviceclassification.value != null && disputeserviceclassification.value.length > 0) {
                    var result = disputeserviceclassification.value;
                    if (result != null) {
                        // set Priority
                        Priority = result[0].ldv_prioritycode;
                        var PriorityField = formContext.getAttribute(fields.priority);
                        if (Priority != null && PriorityField != null) {
                            PriorityField.setValue(Priority);
                        }
                    }
                }
            }

        }
    }

}

//function getEntityRecordOData(ExecutionContext,EntityCollection) {
//    debugger;
//    var formContext;
//    try {

//        formContext = ExecutionContext.getFormContext();
//    }
//    catch (e) {
//        formContext = ExecutionContext;
//    }
//    var serverUrl = Xrm.Utility.getGlobalContext().getClientUrl();
//    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
//    //var ODATA_EntityCollection = "/ldv_caseauditSet?$select=ldv_caseauditId&$filter=ldv_Case/Id eq guid'" + caseId + "'";
//    var ODATA_EntityCollection = EntityCollection;
//    var oDataSelect = serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection;
//    var results;
//    var req = new XMLHttpRequest();
//    req.open("GET", oDataSelect, false);
//    req.setRequestHeader("Accept", "application/json");
//    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//    req.onreadystatechange = function () {
//        if (this.readyState === 4) {
//            this.onreadystatechange = null;
//            if (this.status === 200) {
//                var returned = JSON.parse(this.responseText).d;
//                results = returned.results;
//                //return results;
//                //for (var i = 0; i < results.length; i++) {
//                //    caseAuditRecordId = results[i].ldv_caseauditId;
//                //}
//            } else {
//                //Xrm.Utility.alertDialog(this.statusText);
//            }
//        }
//    };
//    req.send();

//    return results;
//}

function AddOption(ExecutionContext, OptionsetName, optionvalue) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var OptionSet = formContext.getControl(OptionsetName);
    var exist = false;
    if (OptionSet != null) {
        var options;
        var optionsatt;
        if (OptionsetName.includes("header"))
            optionsatt = formContext.getControl(OptionsetName).getAttribute(OptionsetName);//.getOptions();
        else
            optionsatt = formContext.getAttribute(OptionsetName);//.getOptions();

        if (optionsatt != null) {
            options = formContext.getControl(OptionsetName)._options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].value == optionvalue) {
                    exist = true;
                }
            }
        }
        //options = optionsatt.getOptions()
        if (exist == false) {
            // add option 
            var option = optionsatt.getOption(optionvalue);
            OptionSet.addOption(option);
        }
    }
}

function handleServiceCategory(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var requestType = formContext.getAttribute("ldv_requesttype");
    if (requestType != null && requestType.getValue() == 4) {
        var disputeServiceCategory = formContext.getAttribute("ldv_disputeservicecategory");
        var disputeServiceCategoryValue = disputeServiceCategory.getValue();
        var disputeSubServiceCategory = formContext.getAttribute("ldv_disputesubservicecategory");
        var disputeSubServiceCategoryValue = disputeSubServiceCategory.getValue();

        var mobileServiceId = "{2B0A2D95-9245-EE11-815C-00155D32379B}";
        var covarageSubServiceId = "{2DCB0C69-9145-EE11-815C-00155D32379B}";

        var longitude = formContext.getControl("ldv_longitude");
        var latitude = formContext.getControl("ldv_latitude");

        if (disputeServiceCategory != null && disputeSubServiceCategory != null && disputeServiceCategoryValue != null && disputeSubServiceCategoryValue != null && disputeServiceCategoryValue[0].id == mobileServiceId && disputeSubServiceCategoryValue[0].id == covarageSubServiceId) {
            longitude.setVisible(true);
            SetFieldRequiredLevel(ExecutionContext, "ldv_longitude", "none");
            latitude.setVisible(true);
            SetFieldRequiredLevel(ExecutionContext, "ldv_latitude", "none");
        }
        else {
            longitude.setVisible(false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_longitude", "none");
            latitude.setVisible(false);
            SetFieldRequiredLevel(ExecutionContext, "ldv_latitude", "none");
        }
    }
}

//function SwitchBPF(formContext, processIdField_Custom, callBackFn) {
//    debugger;
//    let currentBPF = formContext.data.process.getActiveProcess();
//    //var processIdField_Custom = formContext.getAttribute("ldv_process");
//    let currentBPFId = currentBPF.getId();
//    let newBPFId = processIdField_Custom;
//    if (currentBPFId !== null && newBPFId !== null && currentBPFId.toLowerCase() !== newBPFId.toLowerCase()) {
//        formContext.data.process.setActiveProcess(newBPFId, callBackFn);
//    }
//    //if (currentBPF !== null && processIdField_Custom !== null) {
//    //    let currentBPFId = currentBPF.getId();
//    //    let newBPFId = processIdField_Custom;
//    //    if (currentBPFId !== null && newBPFId !== null && currentBPFId.toLowerCase() !== newBPFId.toLowerCase()) {
//    //        formContext.data.process.setActiveProcess(newBPFId, callBackFn);
//    //    }
//    //    else if (currentBPFId !== null && newBPFId !== null && currentBPFId.toLowerCase() === newBPFId.toLowerCase()) {
//    //        // If the current BPF is the same as the new BPF, execute the callback function directly
//    //        formContext.data.refresh(false);
//    //        callBackFn(); // Execute the callback function
//    //    }
//    //}
//    //else if (currentBPF === null && newBPF !== null) {
//    //    let newBPFId = newBPF[0].id.replace('{', '').replace('}', '');
//    //    if (newBPFId !== null) {
//    //        formContext.data.process.setActiveProcess(newBPFId, callBackFn);
//    //    }
//    //}
//}

function SwitchBPF(formContext, processIdField_Custom, callBackFn) {

    let currentBPF = formContext.data.process.getActiveProcess();
    let newBPF = processIdField_Custom;//formContext.getAttribute(processIdField_Custom).getValue();

    if (currentBPF !== null && newBPF !== null) {
        let currentBPFId = currentBPF.getId();
        let newBPFId = newBPF;//[0].id.replace("{", "").replace("}", "");
        if (currentBPFId !== null && newBPFId !== null && currentBPFId.toLowerCase() !== newBPFId.toLowerCase()) {
            formContext.data.process.setActiveProcess(newBPFId, callBackFn);
        } else if (currentBPFId !== null && newBPFId !== null && currentBPFId.toLowerCase() === newBPFId.toLowerCase()) {
            // If the current BPF is the same as the new BPF, execute the callback function directly
            callBackFn(); // Execute the callback function
        }

    } else if (currentBPF === null && newBPF !== null && newBPF[0] != null && newBPF[0].id != null) {
        let newBPFId = newBPF[0].id.replace("{", "").replace("}", "");
        if (newBPFId !== null) {
            formContext.data.process.setActiveProcess(newBPFId, callBackFn());
        }
    }
};

//function callBackFn(executionContext) {
//    var formContext;
//    try {

//        formContext = executionContext.getFormContext();
//    }
//    catch (e) {
//        formContext = executionContext;
//    }
//    formContext.data.entity.save();
//}

function SetBPFProcessField(executionContext) {
    var formContext;
    try {

        formContext = executionContext.getFormContext();
    }
    catch (e) {
        formContext = executionContext;
    }

    var RequestType = formContext.getAttribute("ldv_requesttype");
    var RollbackRequestType = formContext.getAttribute("ldv_rollbackrequesttype");
    var NewRequestType = formContext.getAttribute("ldv_newrequesttype");
    var RollbackIsdone = formContext.getAttribute("ldv_rollbackisdone");
    //var ProcessIdLookup = formContext.getAttribute("ldv_process");
    var ProcessId = "";
    if (RollbackRequestType != null && RollbackRequestType.getValue() != null && NewRequestType != null && NewRequestType.getValue() == null && RollbackIsdone != null && RollbackIsdone.getValue() == true) {
        ProcessId = CaseBPF.RollbackCase
        SwitchBPF(formContext, ProcessId, () => {
            // Call the callBackFN after switching the BPF
            if (typeof callBackFn === 'function') {
                callBackFn();
            }
        });
    }
    else if (RequestType != null && RequestType.getValue() != null) {

        //let lookupValue = new Array();
        //lookupValue[0] = new Object();
        //lookupValue[0].entityType = 'workflow';

        if ((RequestType.getValue() == requestType.inquiry) || (RequestType.getValue() == requestType.suggestion) || (RequestType.getValue() == requestType.ComplaintAgainstTRA)) {
            ProcessId = CaseBPF.InquiriesComplaintsandSuggestions;
        }
        else if (RequestType.getValue() == requestType.SMSSpam) {
            ProcessId = CaseBPF.SmsSpam;
        }
        else if (RequestType.getValue() == requestType.DisputeWithServiceProvider) {
            ProcessId = CaseBPF.DisputewithServiceProvider;
        }
        else if (RequestType.getValue() == requestType.ServiceProviderComplaint) {
            ProcessId = CaseBPF.serviceprovidercomplaint;
        }
        else if (RequestType.getValue() == requestType.ReportFraudNumbers) {
            ProcessId = CaseBPF.ReportFraudNumbers;
        } else if (RequestType.getValue() == requestType.TechnicalSupportComplaint) {
            ProcessId = CaseBPF.TechnicalSupportRequest;

        }
        //lookupValue[0].id = ProcessId;
        //else if (RequestType == requestType.ComplaintAgainstServiceProvider) {
        //    lookupValue[0].id = CaseBPF.InquiriesComplaintsandSuggestions;
        //}
        //formContext.getAttribute('ldv_process').setValue(lookupValue);
        SwitchBPF(formContext, ProcessId, () => {
            // Call the callBackFN after switching the BPF
            if (typeof callback === 'function') {
                callback(formContext);
            }
        });
    }
}

function ShoworHideActivitiesandCommetsSubgrids_OnCase(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }

    // check on entity
    var entityname = formContext.data.entity.getEntityName();
    if (entityname == "incident") {
        var statusCode = formContext.getAttribute(fields.requestStatus).getValue();
        var currentStatusCode = GetCurrentStatusCode(ExecutionContext, fields.internalStatus);
        var requestTypeCode = formContext.getAttribute(fields.requestType).getValue();
        if (currentStatusCode == requestStatus.pendingOnApplicant || currentStatusCode == requestStatus.ReOpened
            || currentStatusCode == requestStatus.closed) {
            return false; // for Activites and Comments
        }

        else if (requestTypeCode == requestType.ComplaintAgainstTRA &&
            activeStage.getName() == "Relevant Department Feedback"
            && (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if (requestTypeCode == requestType.inquiry &&
            (activeStage.getName() == "Relevant Department Feedback" || activeStage.getName() == "Request Completed") &&
            (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if (requestTypeCode == requestType.suggestion &&
            (activeStage.getName() == "Suggestion Committee Initial Feedback" || activeStage.getName() == "Suggestion Committeeâ€™S Feedback On Plan" || activeStage.getName() == "Suggestion Committee Feedback On Extension Request") &&
            (!UserHasRole("Suggestion Committee") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if (requestTypeCode == requestType.suggestion &&
            (activeStage.getName() == "Department Initial Feedback" || activeStage.getName() == "Department Final Feedback") &&
            (!UserHasRole("Department Representative Customed Role") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if ((requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) &&
            (activeStage.getName() == "CAT Initial Feedback" || activeStage.getName() == "CAT Final Feedback") &&
            (!UserHasRole("Consumer Affairs (CAT)") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if ((requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) &&
            (activeStage.getName() == "TDA Feedback" || activeStage.getName() == "TDA Final Feedback") &&
            (!UserHasRole("Technology Development Affairs (TDA)") && !UserHasRole("System Administrator"))) {
            return false;
        }

        else if ((requestTypeCode == requestType.DisputeWithServiceProvider || requestTypeCode == requestType.SMSSpam) &&
            (activeStage.getName() == "Service Provider Feedback") &&
            (!UserHasRole("Service Provider") && !UserHasRole("System Administrator"))) {
            return false;
        }

        if ((formContext.getAttribute(fields.ReOpenCount).getValue() == null || formContext.getAttribute(fields.ReOpenCount).getValue() == 0) &&
            (UserHasRole("Customer Service Representative Customed Role") || UserHasRole("System Administrator"))) {
            return false;
        }

        if (currentStatusCode == requestStatus.ReOpened &&
            (Xrm.Utility.getGlobalContext().userSettings.userId == ownerID || UserHasRole("System Administrator"))) {
            return false;
        }
    }
}


function CheckIfUserisMemebrofTeam(ExecutionContext) {
    //debugger;
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var _stage = formContext.data.process.getActiveStage();
    if (_stage != null) {
        var activeStg = formContext.data.process.getActiveStage().getName();
        var RequestType = formContext.getAttribute("ldv_requesttype");
        if (activeStg == "Customer Care Decision") {
            if (UserHasRole("System Administrator")) {
                if (RequestType.getValue() == requestType.DisputeWithServiceProvider || RequestType.getValue() == requestType.SMSSpam)
                    formContext.getControl("header_process_ldv_csrdisputedecision").setDisabled(false);
                else
                    formContext.getControl("header_process_ldv_csrdecision").setDisabled(false);

                return;
            }
            var teamId = "";
            var UserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var OwnerId = formContext.getAttribute("ownerid");
            if (OwnerId.getValue() != null && OwnerId.getValue()[0].id == UserId) {

                if (RequestType != null && RequestType.getValue() == requestType.inquiry) {
                    // Inquiry Team 
                    teamId = "8fa66ce0-7bf2-ee11-817d-00155d3237e0";
                }
                else if (RequestType != null && RequestType.getValue() == requestType.suggestion) {
                    // suggestion Team 
                    teamId = "fbb54254-7cf2-ee11-817d-00155d3237e0";
                }
                else if (RequestType != null && RequestType.getValue() == requestType.ComplaintAgainstTRA) {
                    // CTR Team 
                    teamId = "7f661b8a-7cf2-ee11-817d-00155d3237e0";
                }
                else if (RequestType != null && RequestType.getValue() == requestType.SMSSpam) {
                    // SMS Spam Team 
                    teamId = "c4f7b4c5-bbfc-ee11-8a72-00224881b1fa";
                }
                else if (RequestType != null && RequestType.getValue() == requestType.DisputeWithServiceProvider) {
                    // Dispute Team 
                    teamId = "e653da11-eaeb-ec11-8870-00224881b1fa";
                }
                if (teamId != "") {
                    var Query = "/systemusers?$select=systemuserid&$expand=teammembership_association($filter=(teamid eq '" + teamId + "'))&$filter=(systemuserid eq '" + UserId + "') and (teammembership_association/any(o1:(o1/teamid eq '" + teamId + "')))";
                    var UserInTeam = ODataRequestJSONParsed(formContext, Query);
                    if (!IsNull(UserInTeam) && !IsNull(UserInTeam.value) && UserInTeam.value.length > 0) {

                        // Unlock CSR Decision
                        // Unlock CSR Dispute Decision
                        if (RequestType.getValue() == requestType.DisputeWithServiceProvider || RequestType.getValue() == requestType.SMSSpam) {
                            formContext.getControl("header_process_ldv_csrdisputedecision").setDisabled(false);
                            if (formContext.getControl("header_process_ldv_csrdisputedecision_1") != null)
                                formContext.getControl("header_process_ldv_csrdisputedecision_1").setDisabled(false);
                        }
                        else {
                            formContext.getControl("header_process_ldv_csrdecision").setDisabled(false);
                        }

                    }
                    else {
                        // lock CSR Decision
                        // lock CSR Dispute Decision
                        if (RequestType.getValue() == requestType.DisputeWithServiceProvider || RequestType.getValue() == requestType.SMSSpam) {
                            formContext.getControl("header_process_ldv_csrdisputedecision").setDisabled(true);
                            if (formContext.getControl("header_process_ldv_csrdisputedecision_1") != null)
                                formContext.getControl("header_process_ldv_csrdisputedecision_1").setDisabled(true);
                        }
                        else
                            formContext.getControl("header_process_ldv_csrdecision").setDisabled(true);
                    }
                }
            }
        }
    }
}

function SetRequestType(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var NewRequestType = formContext.getAttribute("ldv_newrequesttype");
    if (NewRequestType != null && NewRequestType.getValue() != null) {
        // Set Case Request Type 
        var RequestType = formContext.getAttribute(fields.requestType);
        if (RequestType != null) {
            RequestType.setValue(NewRequestType.getValue());
        }
    }
}

function FilterNewRequestType(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var NewRequestType = formContext.getAttribute("ldv_newrequesttype");
    var NewRequestTypeBPF = formContext.getControl("header_process_ldv_newrequesttype");
    var RequestType = formContext.getAttribute(fields.requestType);
    if (RequestType != null && NewRequestType != null && NewRequestTypeBPF != null) {
        if (RequestType.getValue() != null && RequestType.getValue() == requestType.DisputeWithServiceProvider) {
            // remove Dispute with Service PRovider from New Request
            formContext.getControl("ldv_newrequesttype").removeOption(newrequestType.DisputeWithServiceProvider);
            formContext.getControl("header_process_ldv_newrequesttype").removeOption(newrequestType.DisputeWithServiceProvider);
        }
        else if (RequestType.getValue() != null && RequestType.getValue() == requestType.inquiry) {
            // remove Inquiry from New Request
            formContext.getControl("ldv_newrequesttype").removeOption(newrequestType.inquiry);
            formContext.getControl("header_process_ldv_newrequesttype").removeOption(newrequestType.inquiry);
        }
        else if (RequestType.getValue() != null && RequestType.getValue() == requestType.suggestion) {
            // remove suggestion from New Request
            formContext.getControl("ldv_newrequesttype").removeOption(newrequestType.suggestion);
            formContext.getControl("header_process_ldv_newrequesttype").removeOption(newrequestType.suggestion);
        }
        else if (RequestType.getValue() != null && RequestType.getValue() == requestType.ComplaintAgainstTRA) {
            // remove Complaint Againt TRA (CTR) from New Request
            formContext.getControl("ldv_newrequesttype").removeOption(newrequestType.ComplaintAgainstTRA);
            formContext.getControl("header_process_ldv_newrequesttype").removeOption(newrequestType.ComplaintAgainstTRA);
        }
        else if (RequestType.getValue() != null && RequestType.getValue() == requestType.TechnicalSupportComplaint) {
            // remove TechnicalSupportComplaint Againt TRA (CTR) from New Request
            formContext.getControl("ldv_newrequesttype").removeOption(newrequestType.TechnicalSupportComplaint);
            formContext.getControl("header_process_ldv_newrequesttype").removeOption(newrequestType.TechnicalSupportComplaint);
        }
    }
}

function FilterServiceProvider(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var ServiceProvider = formContext.getAttribute("ldv_serviceprovider");
    if (ServiceProvider != null && (ServiceProvider.getValue() == null || (ServiceProvider.getValue() != null && !(ServiceProvider.getValue() == 3 || ServiceProvider.getValue() == 5)))) {
        formContext.getControl("ldv_serviceprovider").removeOption(3);
        formContext.getControl("ldv_serviceprovider").removeOption(5);
    }
}

function DisblefinalstageFieldsafterCloseCase(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var stateCode = formContext.getAttribute("statecode");
    if (stateCode != null && (stateCode.getValue() == 1 || stateCode == 2)) {
        var _stage = formContext.data.process.getActiveStage();
        if (_stage != null) {
            DisableStageFields(formContext, _stage, true);
        }
    }
}



function CancelCaseButton(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var confirmStrings = { text: "Do You Want to Cancel this Case?", title: "Confirmation Dialog" };
    var confirmOptions = { height: 120, width: 250 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                //var entityId = formContext.data.entity.getId();
                var entity = {
                    "EntityId": formContext.data.entity.getId().replace("{", "").replace("}", "") // caseid
                };

                var WorkflowId = "BDE7358C-10C0-452D-B29A-A5EEC609DCE1";


                var workflowName = "workflows(" + WorkflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
                //CallCustomActionFromJavaScript(actionName, null).then((success) => {
                var result = CallActionFromJavaScript(workflowName, entity);/*CallCustomActionFromJavaScript(actionName, "ldv_changepayrollrequest", entityId, null);*/
                if (result == 200 || result == 204) {
                    ReLoadForm(ExecutionContext);
                }
            }
            else {
                console.log("Dialog closed using Cancel button or X.");
            }
        });


}

function showOrHideCancelCaseButton(ExecutionContext) {
    var formContext;
    try {

        formContext = ExecutionContext.getFormContext();
    }
    catch (e) {
        formContext = ExecutionContext;
    }
    var statecode = formContext.getAttribute("statecode");

    var formType = formContext.ui.getFormType();
    if (formType != 1 && statecode.getValue() == 0) {
        //var logedinuserid = Xrm.Utility.getGlobalContext().userSettings.userId;
        //var ownerid = formContext.getAttribute('ownerid').getValue()[0].id;
        //if (logedinuserid == ownerid) {
        if (UserHasRole("System Administrator") || UserHasRole("Customer Service Representative - Cancel Case")) {
            return true;
        }
        else
            return false;
    }
    else
        return false;
    //}
    //else
    //    return false;
}