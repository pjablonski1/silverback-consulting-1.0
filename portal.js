const portalKeys = {
  clients: "silverbackClientsV2",
  tasks: "silverbackTasksV2",
  activities: "silverbackActivitiesV2",
  contacts: "silverbackContactsV2",
  portalMessages: "silverbackPortalMessagesV1",
  portalDocuments: "silverbackPortalDocumentsV1",
  portalInvoices: "silverbackPortalInvoicesV1",
  portalPayments: "silverbackPortalPaymentsV1",
  portalPlaid: "silverbackPortalPlaidV1",
  portalAudit: "silverbackPortalAuditV1",
  assessments: "silverbackBusinessHealthAssessmentsV1",
  documentTemplates: "silverbackDocumentTemplatesV1",
  signaturePackets: "silverbackSignaturePacketsV1",
  onboardingConfig: "silverbackOnboardingConfigV1",
  projects: "silverbackProjectsV1",
  unlocked: "silverbackClientPortalUnlocked",
  activeClient: "silverbackClientPortalActiveClient"
};

const fallbackClients = [];

const processSteps = [
  { phase: "Foundation", detail: "Business setup, documents, licenses, bank setup, and launch checklist." },
  { phase: "Financial Organization", detail: "Bookkeeping, reporting, expenses, cash flow, and profit tracking." },
  { phase: "Operations", detail: "SOPs, workflows, roles, checklists, and accountability." },
  { phase: "Growth", detail: "Marketing, sales, customer retention, referrals, and revenue planning." },
  { phase: "Scale", detail: "Leadership, KPIs, hiring plan, expansion planning, and operating rhythm." }
];

const starterDocuments = [];

const starterInvoices = [];

const notificationEmails = ["michaelcocom@yahoo.com", "aidamorales2014@gmail.com"];

const clientAssessmentBlueprint = [
  { id: "profile", title: "Company Profile", fields: [
    { key: "companyName", label: "Company Name", type: "text", required: true },
    { key: "industry", label: "Business Type", type: "select", required: true, options: ["Consulting", "Professional Services", "Food Service", "Retail", "Construction", "Healthcare", "Technology", "Transportation", "Other"] },
    { key: "phase", label: "Current Phase", type: "select", required: true, options: ["Foundation", "Financial Organization", "Operations", "Growth", "Scale"] },
    { key: "revenueRange", label: "Monthly Revenue Range", type: "select", required: true, options: ["Pre-revenue", "Under $10K", "$10K-$25K", "$25K-$75K", "$75K-$150K", "$150K+"] },
    { key: "primaryGoal", label: "Main Goal", type: "textarea", required: true }
  ] },
  { id: "foundation", title: "Legal Foundation", fields: [
    { key: "foundationItems", label: "Completed Foundation Items", type: "multiselect", options: ["LLC", "EIN", "Business License", "Seller's Permit", "Insurance", "Client Contracts", "Business Bank Account"] },
    { key: "foundationRisk", label: "Foundation Risk", type: "radio", required: true, options: ["Low", "Moderate", "High"] },
    { key: "foundationScore", label: "Foundation Score", type: "rating", required: true }
  ] },
  { id: "finance", title: "Financial Organization", fields: [
    { key: "financeItems", label: "Financial Systems In Place", type: "multiselect", options: ["Bookkeeping", "QuickBooks", "Profit & Loss", "Balance Sheet", "Expense Tracking", "Profit Tracking", "Budget"] },
    { key: "cashFlowClarity", label: "Cash Flow Clarity", type: "radio", required: true, options: ["Clear", "Somewhat Clear", "Unclear"] },
    { key: "revenueGoal", label: "Revenue Goal", type: "text", required: true }
  ] },
  { id: "operations", title: "Operations & Growth", fields: [
    { key: "operationsItems", label: "Operating Systems In Place", type: "multiselect", options: ["SOPs", "Employee Roles", "Training", "Daily Checklists", "Customer Service Process", "Task Management"] },
    { key: "biggestBottleneck", label: "Biggest Bottleneck", type: "textarea", required: true },
    { key: "next30Days", label: "Next 30-Day Plan", type: "textarea", required: true }
  ] }
];

const loginScreen = document.querySelector("[data-login-screen]");
const loginForm = document.querySelector("[data-login-form]");
const loginError = document.querySelector("[data-login-error]");
const clientSelect = document.querySelector("[data-client-select]");
const portalShell = document.querySelector("[data-portal-shell]");
const lockButton = document.querySelector("[data-lock-portal]");
const sessionStatus = document.querySelector("[data-session-status]");
const clientHeading = document.querySelector("[data-client-heading]");
const currentPhase = document.querySelector("[data-current-phase]");
const clientStatus = document.querySelector("[data-client-status]");
const nextAction = document.querySelector("[data-next-action]");
const openItems = document.querySelector("[data-open-items]");
const homeWelcome = document.querySelector("[data-home-welcome]");
const homeSummary = document.querySelector("[data-home-summary]");
const homeNextAction = document.querySelector("[data-home-next-action]");
const homeProject = document.querySelector("[data-home-project]");
const homeProblem = document.querySelector("[data-home-problem]");
const homeLastContact = document.querySelector("[data-home-last-contact]");
const homeDocumentCount = document.querySelector("[data-home-document-count]");
const homeBalance = document.querySelector("[data-home-balance]");
const portalOnboardingPercent = document.querySelector("[data-portal-onboarding-percent]");
const portalOnboardingBar = document.querySelector("[data-portal-onboarding-bar]");
const portalOnboardingNext = document.querySelector("[data-portal-onboarding-next]");
const portalOnboardingChecklist = document.querySelector("[data-portal-onboarding-checklist]");
const processTrack = document.querySelector("[data-process-track]");
const biggestProblem = document.querySelector("[data-biggest-problem]");
const currentProject = document.querySelector("[data-current-project]");
const lastContact = document.querySelector("[data-last-contact]");
const messageThread = document.querySelector("[data-message-thread]");
const messageForm = document.querySelector("[data-message-form]");
const messageStatus = document.querySelector("[data-message-status]");
const documentGrid = document.querySelector("[data-document-grid]");
const invoiceList = document.querySelector("[data-invoice-list]");
const invoiceSelect = document.querySelector("[data-invoice-select]");
const paymentForm = document.querySelector("[data-payment-form]");
const paymentStatus = document.querySelector("[data-payment-status]");
const plaidStatus = document.querySelector("[data-plaid-status]");
const connectPlaid = document.querySelector("[data-connect-plaid]");
const statementGrid = document.querySelector("[data-statement-grid]");
const auditLog = document.querySelector("[data-audit-log]");
const clientAssessmentForm = document.querySelector("[data-client-assessment-form]");
const clientAssessmentSections = document.querySelector("[data-client-assessment-sections]");
const clientAssessmentProgressText = document.querySelector("[data-client-assessment-progress-text]");
const clientAssessmentProgressBar = document.querySelector("[data-client-assessment-progress-bar]");
const clientAssessmentStatus = document.querySelector("[data-client-assessment-status]");
const clientAssessmentUpdated = document.querySelector("[data-client-assessment-updated]");
const clientAssessmentError = document.querySelector("[data-client-assessment-error]");
const clientAssessmentSave = document.querySelector("[data-client-assessment-save]");
const clientAssessmentSubmit = document.querySelector("[data-client-assessment-submit]");
const clientAssessmentExport = document.querySelector("[data-client-assessment-export]");
const portalLinks = document.querySelectorAll("[data-portal-link]");
const portalViews = document.querySelectorAll("[data-portal-view]");
const portalJumpButtons = document.querySelectorAll("[data-portal-jump]");

let activeClientName = localStorage.getItem(portalKeys.activeClient) || "";
let sessionTimer;

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function currency(value) {
  return Number(value || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function sharedTemplates() {
  return read(portalKeys.documentTemplates, [
    { id: "template-1", name: "Silverback Consulting Agreement", type: "Consulting Agreement" },
    { id: "template-5", name: "Silverback NDA", type: "NDA" },
    { id: "template-9", name: "Silverback Welcome Packet", type: "Welcome Packet" }
  ]);
}

function sharedSignatures() {
  return read(portalKeys.signaturePackets, []);
}

function writeSharedSignatures(value) {
  write(portalKeys.signaturePackets, value);
}

function onboardingConfig() {
  return read(portalKeys.onboardingConfig, {
    requiredDocuments: ["Consulting Agreement", "NDA"],
    requiredForms: ["Business Startup Intake", "Growth & Operations Intake"],
    paymentRequiresSignedDocs: true
  });
}

function sharedProjects() {
  return read(portalKeys.projects, []);
}

function templateType(templateId) {
  return sharedTemplates().find((template) => template.id === templateId)?.type || "Document";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function assessmentFields() {
  return clientAssessmentBlueprint.flatMap((section) => section.fields);
}

function defaultClientAssessment(client) {
  const responses = {};
  assessmentFields().forEach((field) => {
    responses[field.key] = field.type === "multiselect" ? [] : "";
  });
  responses.companyName = client.clientName || "";
  responses.industry = client.businessType || "";
  responses.phase = client.currentPhase || "Foundation";
  responses.primaryGoal = client.nextAction || "";
  responses.biggestBottleneck = client.biggestProblem || "";
  return { status: "Draft", updatedAt: "", submittedAt: "", responses };
}

function allAssessments() {
  return read(portalKeys.assessments, {});
}

function clientAssessment() {
  const client = activeClient();
  const assessments = allAssessments();
  const existing = assessments[client.clientName];
  const fallback = defaultClientAssessment(client);
  const assessment = {
    ...fallback,
    ...(existing || {}),
    responses: { ...fallback.responses, ...((existing && existing.responses) || {}) }
  };
  assessmentFields().forEach((field) => {
    if (field.type === "multiselect" && !Array.isArray(assessment.responses[field.key])) assessment.responses[field.key] = [];
  });
  return assessment;
}

function saveClientAssessment(assessment) {
  const client = activeClient();
  const assessments = allAssessments();
  assessments[client.clientName] = { ...assessment, updatedAt: new Date().toISOString() };
  write(portalKeys.assessments, assessments);
}

function assessmentCompletion(assessment) {
  const required = assessmentFields().filter((field) => field.required);
  const done = required.filter((field) => {
    const value = assessment.responses[field.key];
    return Array.isArray(value) ? value.length > 0 : String(value || "").trim();
  });
  return {
    percent: required.length ? Math.round((done.length / required.length) * 100) : 100,
    missing: required.filter((field) => !done.includes(field))
  };
}

function renderAssessmentInput(field, assessment) {
  const value = assessment.responses[field.key];
  const required = field.required ? " data-required=\"true\"" : "";
  const requiredMark = field.required ? "<em>Required</em>" : "";
  if (field.type === "textarea") return `<label class="portal-assessment-field portal-wide"${required}>${escapeHtml(field.label)} ${requiredMark}<textarea name="assessment.${escapeHtml(field.key)}" rows="3">${escapeHtml(value)}</textarea></label>`;
  if (field.type === "select") return `<label class="portal-assessment-field"${required}>${escapeHtml(field.label)} ${requiredMark}<select name="assessment.${escapeHtml(field.key)}"><option value="">Select one</option>${field.options.map((option) => `<option${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
  if (field.type === "radio") return `<fieldset class="portal-assessment-field"${required}><legend>${escapeHtml(field.label)} ${requiredMark}</legend><div class="portal-choice-row">${field.options.map((option) => `<label><input type="radio" name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(option)}"${option === value ? " checked" : ""}>${escapeHtml(option)}</label>`).join("")}</div></fieldset>`;
  if (field.type === "multiselect") {
    const selected = Array.isArray(value) ? value : [];
    return `<fieldset class="portal-assessment-field portal-wide"><legend>${escapeHtml(field.label)}</legend><div class="portal-checkbox-grid">${field.options.map((option) => `<label><input type="checkbox" name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(option)}"${selected.includes(option) ? " checked" : ""}>${escapeHtml(option)}</label>`).join("")}</div></fieldset>`;
  }
  if (field.type === "rating") return `<fieldset class="portal-assessment-field"${required}><legend>${escapeHtml(field.label)} ${requiredMark}</legend><div class="portal-rating-row">${Array.from({ length: 10 }, (_, index) => index + 1).map((score) => `<label><input type="radio" name="assessment.${escapeHtml(field.key)}" value="${score}"${Number(value) === score ? " checked" : ""}>${score}</label>`).join("")}</div></fieldset>`;
  return `<label class="portal-assessment-field"${required}>${escapeHtml(field.label)} ${requiredMark}<input name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(value)}"></label>`;
}

function collectClientAssessment(base) {
  const assessment = { ...base, responses: { ...base.responses } };
  if (!clientAssessmentForm) return assessment;
  assessmentFields().forEach((field) => {
    const controls = [...clientAssessmentForm.querySelectorAll(`[name="assessment.${CSS.escape(field.key)}"]`)];
    if (!controls.length) return;
    if (field.type === "multiselect") {
      assessment.responses[field.key] = controls.filter((control) => control.checked).map((control) => control.value);
    } else if (field.type === "radio" || field.type === "rating") {
      assessment.responses[field.key] = controls.find((control) => control.checked)?.value || "";
    } else {
      assessment.responses[field.key] = controls[0].value;
    }
  });
  return assessment;
}

function refreshClientAssessmentSummary(assessment) {
  const completion = assessmentCompletion(assessment);
  if (clientAssessmentProgressText) clientAssessmentProgressText.textContent = `${completion.percent}%`;
  if (clientAssessmentProgressBar) clientAssessmentProgressBar.style.width = `${completion.percent}%`;
  if (clientAssessmentStatus) clientAssessmentStatus.textContent = assessment.status || "Draft";
  if (clientAssessmentUpdated) clientAssessmentUpdated.textContent = assessment.updatedAt ? new Date(assessment.updatedAt).toLocaleString() : "Not saved";
}

function renderClientAssessment() {
  if (!clientAssessmentSections) return;
  const assessment = clientAssessment();
  clientAssessmentSections.innerHTML = clientAssessmentBlueprint.map((section) => `
    <article class="portal-assessment-card">
      <h3>${escapeHtml(section.title)}</h3>
      <div class="portal-assessment-grid">${section.fields.map((field) => renderAssessmentInput(field, assessment)).join("")}</div>
    </article>
  `).join("");
  if (clientAssessmentError) clientAssessmentError.textContent = "";
  refreshClientAssessmentSummary(assessment);
}

function savePortalAssessmentDraft(message = "Assessment draft saved.") {
  const assessment = collectClientAssessment(clientAssessment());
  assessment.status = "Draft";
  saveClientAssessment(assessment);
  logActivity(`${activeClientName} saved assessment draft.`);
  refreshClientAssessmentSummary(clientAssessment());
  if (clientAssessmentError) clientAssessmentError.textContent = message;
}

function submitPortalAssessment() {
  const assessment = collectClientAssessment(clientAssessment());
  const completion = assessmentCompletion(assessment);
  if (completion.missing.length) {
    clientAssessmentError.textContent = `Please complete: ${completion.missing.map((field) => field.label).join(", ")}.`;
    clientAssessmentForm.querySelector(`[name="assessment.${CSS.escape(completion.missing[0].key)}"]`)?.focus();
    return;
  }
  assessment.status = "Submitted";
  assessment.submittedAt = new Date().toISOString();
  saveClientAssessment(assessment);
  logActivity(`${activeClientName} submitted business health assessment.`);
  syncCrmActivity("Client submitted business health assessment.", "Advisor review required");
  sendNotificationEmail("Silverback client assessment submitted", [`Client: ${activeClientName}`, "A business health assessment was submitted from the client portal."]);
  refreshClientAssessmentSummary(clientAssessment());
  clientAssessmentError.textContent = "Assessment submitted to Silverback.";
}

function exportPortalAssessment() {
  savePortalAssessmentDraft("Assessment copy prepared.");
  window.print();
}

function sendNotificationEmail(subject, lines) {
  const body = [
    "Silverback Client Portal Notification",
    "",
    ...lines,
    "",
    "This notification was generated from the Silverback client portal.",
    "Automated delivery is handled through the configured Azure notification service."
  ].join("\n");
  const mailto = `mailto:${notificationEmails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function clients() {
  return read(portalKeys.clients, fallbackClients).filter((client) => client.clientName !== "Silverback Consulting");
}

function clientData() {
  return clients().find((client) => client.clientName === activeClientName) || clients()[0] || {
    clientName: "Client",
    businessType: "",
    currentPhase: "Foundation",
    status: "Pending",
    biggestProblem: "",
    currentProject: "",
    nextAction: "",
    lastContact: ""
  };
}

function clientKey(name = activeClientName) {
  return String(name || "client").replace(/[^a-z0-9]/gi, "-").toLowerCase();
}

function scopedRecords(key, starter) {
  const allData = read(key, {});
  const all = Array.isArray(allData) || !allData || typeof allData !== "object" ? {} : allData;
  const scoped = all[clientKey()];
  if (scoped) return scoped;
  all[clientKey()] = [...starter];
  write(key, all);
  return [...starter];
}

function saveScopedRecords(key, records) {
  const all = read(key, {});
  all[clientKey()] = records;
  write(key, all);
}

function messages() {
  return scopedRecords(portalKeys.portalMessages, []);
}

function documents() {
  return scopedRecords(portalKeys.portalDocuments, starterDocuments);
}

function invoices() {
  return scopedRecords(portalKeys.portalInvoices, starterInvoices);
}

function signedSharedDocumentTypes() {
  return sharedSignatures()
    .filter((packet) => packet.client === activeClientName && ["Signed", "Completed"].includes(packet.status))
    .map((packet) => templateType(packet.templateId));
}

function portalOnboardingStatus() {
  const client = clientData();
  const signedDocs = signedSharedDocumentTypes();
  const localDocsSigned = documents().filter((doc) => doc.status === "Signed").length;
  const assessment = clientAssessment();
  const assessmentDone = ["Submitted", "Completed"].includes(assessment.status) || assessmentCompletion(assessment).percent >= 80;
  const invoicePaid = invoices().some((invoice) => invoice.status === "Paid");
  const hasProject = sharedProjects().some((project) => project.client === activeClientName);
  const config = onboardingConfig();
  const requiredDocsDone = config.requiredDocuments.every((doc) => signedDocs.includes(doc)) || localDocsSigned >= 2;
  const checklist = [
    { label: "Consultation Scheduled", complete: Boolean(client.nextAction || client.lastContact), next: "Confirm appointment with Silverback." },
    { label: "Proposal Accepted", complete: ["Proposal Accepted", "Required Documents Sent", "Waiting for E-Signatures", "Payment Required", "Client Activated", "Project Created", "Project In Progress"].includes(client.lifecycleStage), next: "Review proposal with the team." },
    { label: "Required Documents Signed", complete: requiredDocsDone, next: "Review and e-sign required documents." },
    { label: "Business Health Assessment", complete: assessmentDone, next: "Complete the assessment form." },
    { label: "Payment Received", complete: invoicePaid, next: requiredDocsDone ? "Submit payment." : "Payment unlocks after required signatures." },
    { label: "Project Workspace Created", complete: hasProject, next: "Silverback will create your project workspace." }
  ];
  const complete = checklist.filter((item) => item.complete).length;
  const percent = Math.round((complete / checklist.length) * 100);
  return { checklist, percent, next: checklist.find((item) => !item.complete)?.next || "Onboarding complete. Continue project execution.", paymentUnlocked: !config.paymentRequiresSignedDocs || requiredDocsDone };
}

function plaidConnection() {
  const all = read(portalKeys.portalPlaid, {});
  return all[clientKey()] || { connected: false, bank: "" };
}

function savePlaidConnection(connection) {
  const all = read(portalKeys.portalPlaid, {});
  all[clientKey()] = connection;
  write(portalKeys.portalPlaid, all);
}

function auditItems() {
  return scopedRecords(portalKeys.portalAudit, []);
}

function logActivity(text) {
  const audit = auditItems();
  audit.unshift({ date: today(), text });
  saveScopedRecords(portalKeys.portalAudit, audit.slice(0, 12));
  renderAudit();
}

function syncCrmActivity(summary, nextStep = "Review client portal update.") {
  const activities = read(portalKeys.activities, []);
  activities.unshift({
    client: activeClientName,
    type: "Client Portal",
    date: today(),
    summary,
    nextStep
  });
  write(portalKeys.activities, activities);
}

function populateClientSelect() {
  clientSelect.innerHTML = clients().length ? clients().map((client) => `<option>${escapeHtml(client.clientName)}</option>`).join("") : `<option value="">No client profiles available</option>`;
  if (!activeClientName && clients()[0]) activeClientName = clients()[0].clientName;
  clientSelect.value = activeClientName;
}

function unlockPortal() {
  loginScreen.hidden = true;
  portalShell.hidden = false;
  document.body.classList.add("portal-open");
  localStorage.setItem(portalKeys.unlocked, "true");
  localStorage.setItem(portalKeys.activeClient, activeClientName);
  resetSessionTimer();
  renderPortal();
}

function lockPortal() {
  localStorage.removeItem(portalKeys.unlocked);
  loginScreen.hidden = false;
  portalShell.hidden = true;
  document.body.classList.remove("portal-open");
  clearTimeout(sessionTimer);
  loginForm.reset();
  populateClientSelect();
}

function resetSessionTimer() {
  clearTimeout(sessionTimer);
  if (sessionStatus) sessionStatus.textContent = "Protected session";
  sessionTimer = setTimeout(() => {
    if (sessionStatus) sessionStatus.textContent = "Session locked for inactivity";
    lockPortal();
  }, 12 * 60 * 1000);
}

function renderOverview() {
  const client = clientData();
  clientHeading.textContent = `${client.clientName} Portal`;
  currentPhase.textContent = client.currentPhase || "Foundation";
  clientStatus.textContent = client.status || "Active";
  nextAction.textContent = client.nextAction || "Review next action plan";
  homeWelcome.textContent = `Welcome back, ${client.clientName}.`;
  homeSummary.textContent = `Your current Silverback phase is ${client.currentPhase || "Foundation"}. Use this portal to message the team, review documents, track progress, and manage billing.`;
  homeNextAction.textContent = client.nextAction || "Review next action plan";
  homeProject.textContent = client.currentProject || "Initial assessment";
  homeProblem.textContent = client.biggestProblem || "Not yet documented";
  homeLastContact.textContent = client.lastContact || "No date recorded";
  biggestProblem.textContent = client.biggestProblem || "Not yet documented";
  currentProject.textContent = client.currentProject || "Initial assessment";
  lastContact.textContent = client.lastContact || "No date recorded";
  const unsigned = documents().filter((item) => item.status !== "Signed").length;
  const unpaid = invoices().filter((item) => item.status !== "Paid").length;
  const balance = invoices().filter((item) => item.status !== "Paid").reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);
  const onboarding = portalOnboardingStatus();
  openItems.textContent = unsigned + unpaid;
  homeDocumentCount.textContent = `${unsigned} Pending`;
  homeBalance.textContent = `${currency(balance)} Due`;
  if (portalOnboardingPercent) portalOnboardingPercent.textContent = `${onboarding.percent}%`;
  if (portalOnboardingBar) portalOnboardingBar.style.width = `${onboarding.percent}%`;
  if (portalOnboardingNext) portalOnboardingNext.textContent = onboarding.next;
}

function renderProcess() {
  const activePhase = clientData().currentPhase || "Foundation";
  const activeIndex = Math.max(0, processSteps.findIndex((step) => step.phase === activePhase));
  processTrack.innerHTML = processSteps.map((step, index) => {
    const className = index < activeIndex ? "complete" : index === activeIndex ? "active" : "";
    return `<article class="process-step ${className}"><h3>${step.phase}</h3><p>${step.detail}</p></article>`;
  }).join("");
  if (portalOnboardingChecklist) {
    portalOnboardingChecklist.innerHTML = portalOnboardingStatus().checklist.map((item) => `
      <article class="${item.complete ? "complete" : ""}">
        <strong>${item.complete ? "Complete" : "Open"}</strong>
        <h3>${escapeHtml(item.label)}</h3>
        <p>${escapeHtml(item.complete ? "Requirement satisfied." : item.next)}</p>
      </article>
    `).join("");
  }
}

function renderMessages() {
  const items = messages();
  messageThread.innerHTML = items.length ? items.map((message) => `
    <article class="message ${message.role === "client" ? "client" : "team"}">
      <strong>${escapeHtml(message.from)}</strong>
      <p>${escapeHtml(message.text)}</p>
      <small>${escapeHtml(message.date)}</small>
    </article>
  `).join("") : `<p class="portal-empty">No messages yet.</p>`;
  messageThread.scrollTop = messageThread.scrollHeight;
}

function renderDocuments() {
  const items = documents();
  documentGrid.innerHTML = items.length ? items.map((document) => `
    <article class="document-card ${document.status === "Signed" ? "signed" : ""}">
      <span>${escapeHtml(document.type)}</span>
      <h3>${escapeHtml(document.title)}</h3>
      <p>Status: <strong>${escapeHtml(document.status)}</strong></p>
      <p>Due: ${escapeHtml(document.due)}</p>
      <button type="button" data-sign-document="${document.id}">${document.status === "Signed" ? "View Signed Copy" : "Review & E-Sign"}</button>
    </article>
  `).join("") : `<p class="portal-empty">No document records yet.</p>`;
}

function renderInvoices() {
  const items = invoices();
  invoiceList.innerHTML = items.length ? items.map((invoice) => `
    <article class="invoice-card ${invoice.status === "Paid" ? "paid" : "due"}">
      <span>${escapeHtml(invoice.id)}</span>
      <h3>${escapeHtml(invoice.title)}</h3>
      <p>Amount: <strong>${currency(invoice.amount)}</strong></p>
      <p>Due: ${escapeHtml(invoice.due)}</p>
      <p>Status: ${escapeHtml(invoice.status)}</p>
    </article>
  `).join("") : `<p class="portal-empty">No invoices created yet.</p>`;
  invoiceSelect.innerHTML = items.length ? items.map((invoice) => `<option value="${escapeHtml(invoice.id)}">${escapeHtml(invoice.id)} - ${escapeHtml(invoice.title)} (${escapeHtml(invoice.status)})</option>`).join("") : `<option value="">No invoices available</option>`;
  const firstDue = items.find((invoice) => invoice.status !== "Paid") || items[0];
  if (firstDue) {
    invoiceSelect.value = firstDue.id;
    paymentForm.amount.value = firstDue.amount;
  } else {
    paymentForm.amount.value = "";
  }
  const onboarding = portalOnboardingStatus();
  [...paymentForm.elements].forEach((element) => {
    if (element.matches("[data-connect-plaid]")) return;
    if (element.name === "invoice" || element.name === "method" || element.name === "amount" || element.type === "checkbox" || element.type === "submit") {
      element.disabled = !onboarding.paymentUnlocked;
    }
  });
  if (!onboarding.paymentUnlocked) {
    paymentStatus.textContent = "Payment is locked until required onboarding documents are signed.";
  } else if (paymentStatus.textContent.includes("locked")) {
    paymentStatus.textContent = "Payment is unlocked. Choose an invoice and method when ready.";
  }

  const plaid = plaidConnection();
  const plaidBox = plaidStatus?.closest(".plaid-box");
  if (plaid.connected) {
    plaidStatus.textContent = `Connected: ${plaid.bank}`;
    plaidBox?.classList.add("is-connected");
    if (connectPlaid) connectPlaid.textContent = "Reconnect Bank";
  } else {
    plaidStatus.textContent = "Bank not connected";
    plaidBox?.classList.remove("is-connected");
    if (connectPlaid) connectPlaid.textContent = "Connect Bank With Plaid";
  }
}

function renderStatements() {
  const items = invoices();
  statementGrid.innerHTML = items.length ? items.map((invoice) => `
    <article>
      <h3>${escapeHtml(invoice.id)}</h3>
      <p>${escapeHtml(invoice.title)}</p>
      <p>${currency(invoice.amount)} - ${escapeHtml(invoice.status)}</p>
      <p>Statement period: ${escapeHtml(invoice.due.slice(0, 7))}</p>
    </article>
  `).join("") : `<p class="portal-empty">No statements available yet.</p>`;
}

function renderAudit() {
  const items = auditItems();
  auditLog.innerHTML = items.length ? items.map((item) => `<div class="audit-item"><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.text)}</span></div>`).join("") : `<p class="portal-empty">No portal activity yet.</p>`;
}

function showPortalView(viewName) {
  const targetView = [...portalViews].some((view) => view.dataset.portalView === viewName) ? viewName : "overview";
  portalViews.forEach((view) => {
    const isActive = view.dataset.portalView === targetView;
    view.classList.toggle("active", isActive);
    view.hidden = !isActive;
    if (isActive) view.scrollTop = 0;
  });
  portalLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.portalLink === targetView);
  });
  window.history.replaceState(null, "", `#${targetView}`);
}

function renderPortal() {
  renderOverview();
  renderProcess();
  renderClientAssessment();
  renderMessages();
  renderDocuments();
  renderInvoices();
  renderStatements();
  renderAudit();
}

portalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPortalView(link.dataset.portalLink);
  });
});

portalJumpButtons.forEach((button) => {
  button.addEventListener("click", () => showPortalView(button.dataset.portalJump));
});

clientAssessmentForm?.addEventListener("input", () => {
  const assessment = collectClientAssessment(clientAssessment());
  assessment.status = "Draft";
  saveClientAssessment(assessment);
  refreshClientAssessmentSummary(clientAssessment());
});

clientAssessmentForm?.addEventListener("change", () => {
  const assessment = collectClientAssessment(clientAssessment());
  assessment.status = "Draft";
  saveClientAssessment(assessment);
  refreshClientAssessmentSummary(clientAssessment());
});

clientAssessmentSave?.addEventListener("click", () => savePortalAssessmentDraft());
clientAssessmentSubmit?.addEventListener("click", submitPortalAssessment);
clientAssessmentExport?.addEventListener("click", exportPortalAssessment);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  activeClientName = formData.get("clientName");
  const accessCode = String(formData.get("accessCode") || "").trim();
  if (accessCode !== "CLIENT2026") {
    loginError.textContent = "Incorrect access code.";
    return;
  }
  loginError.textContent = "";
  unlockPortal();
  showPortalView("overview");
  logActivity("Secure client login completed with portal verification.");
});

lockButton.addEventListener("click", lockPortal);

["click", "keydown", "mousemove"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    if (!portalShell.hidden) resetSessionTimer();
  }, { passive: true });
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = new FormData(messageForm).get("message").trim();
  if (!text) return;
  const records = messages();
  records.push({ from: activeClientName, text, date: today(), role: "client" });
  saveScopedRecords(portalKeys.portalMessages, records);
  syncCrmActivity(`Client sent portal message: ${text}`, "Respond to client portal message.");
  logActivity("Client message sent and synced to Silverback HQ activity.");
  sendNotificationEmail("New Client Portal Message", [
    `Client: ${activeClientName}`,
    `Message: ${text}`,
    "Source: Client portal message center"
  ]);
  messageStatus.textContent = "Message sent to Silverback HQ and email notification prepared.";
  messageForm.reset();
  renderMessages();
});

documentGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-sign-document]");
  if (!button) return;
  const documentId = button.dataset.signDocument;
  const templateLookup = {
    engagement: "Consulting Agreement",
    disclosure: "Disclosure",
    scope: "Statement of Work"
  };
  const records = documents().map((document) => {
    if (document.id !== documentId) return document;
    if (document.status === "Signed") return document;
    return { ...document, status: "Signed", signedDate: today() };
  });
  const signed = records.find((document) => document.id === documentId);
  saveScopedRecords(portalKeys.portalDocuments, records);
  const templates = sharedTemplates();
  const matchedTemplate = templates.find((template) => {
    const normalizedName = String(template.name || "").toLowerCase();
    const normalizedTitle = String(signed.title || "").toLowerCase();
    const expected = String(templateLookup[documentId] || "").toLowerCase();
    return normalizedName.includes(expected) || normalizedTitle.includes(normalizedName);
  });
  const packets = sharedSignatures();
  const packetIndex = packets.findIndex((packet) => {
    const sameClient = String(packet.client || "").toLowerCase() === activeClientName.toLowerCase();
    const sameTemplate = matchedTemplate ? packet.templateId === matchedTemplate.id : packet.templateId === documentId;
    return sameClient && sameTemplate;
  });
  const completedPacket = {
    id: packetIndex >= 0 ? packets[packetIndex].id : `sig-${Date.now()}`,
    client: activeClientName,
    templateId: matchedTemplate ? matchedTemplate.id : documentId,
    status: "Signed",
    sentAt: packetIndex >= 0 ? packets[packetIndex].sentAt : today(),
    signedAt: today(),
    verification: "Portal e-signature verification captured"
  };
  if (packetIndex >= 0) {
    packets[packetIndex] = { ...packets[packetIndex], ...completedPacket };
  } else {
    packets.unshift(completedPacket);
  }
  writeSharedSignatures(packets);
  syncCrmActivity(`Client signed document: ${signed.title}.`, "Review signed document packet.");
  logActivity(`DocuSign workflow completed for ${signed.title}.`);
  sendNotificationEmail("Client Document Signed", [
    `Client: ${activeClientName}`,
    `Document: ${signed.title}`,
    `Status: ${signed.status}`,
    `Date: ${today()}`,
    "Source: Client portal document workflow"
  ]);
  renderPortal();
});

connectPlaid.addEventListener("click", () => {
  const connection = { connected: true, bank: "Connected business bank account", connectedDate: today() };
  savePlaidConnection(connection);
  syncCrmActivity("Client connected bank account through Plaid workflow.", "Verify bank connection before ACH payment.");
  logActivity("Plaid bank connection completed.");
  sendNotificationEmail("Client Connected Bank With Plaid", [
    `Client: ${activeClientName}`,
    `Bank: ${connection.bank}`,
    `Date: ${connection.connectedDate}`,
    "Source: Client portal Plaid workflow"
  ]);
  renderPortal();
});

invoiceSelect.addEventListener("change", () => {
  const invoice = invoices().find((item) => item.id === invoiceSelect.value);
  if (invoice) paymentForm.amount.value = invoice.amount;
});

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const onboarding = portalOnboardingStatus();
  if (!onboarding.paymentUnlocked) {
    paymentStatus.textContent = "Payment remains locked until required onboarding documents are signed.";
    logActivity("Payment attempt blocked because onboarding requirements are incomplete.");
    return;
  }
  const formData = new FormData(paymentForm);
  const invoiceId = formData.get("invoice");
  const method = formData.get("method");
  const amount = Number(formData.get("amount"));
  if (!invoiceId || !invoices().some((invoice) => invoice.id === invoiceId)) {
    paymentStatus.textContent = "No invoice is available for payment yet.";
    logActivity("Payment attempt blocked because no invoice is available.");
    return;
  }
  if (method === "Plaid Bank Connection" && !plaidConnection().connected) {
    paymentStatus.textContent = "Connect a bank with Plaid before submitting this payment method.";
    return;
  }
  const records = invoices().map((invoice) => invoice.id === invoiceId ? { ...invoice, status: "Paid", paidDate: today(), paidMethod: method, paidAmount: amount } : invoice);
  saveScopedRecords(portalKeys.portalInvoices, records);
  const payments = read(portalKeys.portalPayments, []);
  payments.unshift({ client: activeClientName, invoice: invoiceId, method, amount, date: today() });
  write(portalKeys.portalPayments, payments);
  syncCrmActivity(`Client submitted ${currency(amount)} payment for ${invoiceId} using ${method}.`, "Confirm payment settlement and update invoice record.");
  logActivity(`Payment submitted for ${invoiceId} using ${method}.`);
  sendNotificationEmail("Client Portal Payment Submitted", [
    `Client: ${activeClientName}`,
    `Invoice: ${invoiceId}`,
    `Amount: ${currency(amount)}`,
    `Payment Method: ${method}`,
    `Date: ${today()}`,
    "Source: Client portal payment workflow"
  ]);
  paymentStatus.textContent = `Payment request captured for ${currency(amount)} and email notification prepared.`;
  renderPortal();
});

populateClientSelect();

if (localStorage.getItem(portalKeys.unlocked) === "true") {
  unlockPortal();
  showPortalView("overview");
} else {
  lockPortal();
}
