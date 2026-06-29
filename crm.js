const starterClients = [];

const starterLifecycleStages = [
  "New Lead",
  "Consultation Requested",
  "Consultation Scheduled",
  "Consultation Completed",
  "Proposal Sent",
  "Waiting for Client Decision",
  "Proposal Accepted",
  "Required Documents Sent",
  "Waiting for E-Signatures",
  "All Required Documents Completed",
  "Payment Required",
  "Payment Received",
  "Client Activated",
  "Project Created",
  "Project In Progress",
  "Project Review",
  "Project Completed",
  "Follow-Up",
  "Long-Term Client"
].map((name, index) => ({
  id: `stage-${index + 1}`,
  name,
  owner: index < 7 ? "Sales" : index < 13 ? "Client Success" : "Operations",
  requiredAction: index < 7 ? "Confirm client intent and next conversation." : index < 13 ? "Complete onboarding requirement." : "Advance project milestone.",
  active: true
}));

const starterIntakeForms = [
  {
    id: "intake-foundation",
    name: "Business Startup Intake",
    service: "Foundation",
    required: true,
    fields: [
      { id: "entity", label: "Has the business entity been formed?", type: "dropdown", options: ["Yes", "No", "In Progress"], required: true },
      { id: "licenses", label: "Which foundation items are complete?", type: "checkboxes", options: ["LLC", "EIN", "Seller's Permit", "Business License", "Business Bank Account"], required: false },
      { id: "launchDate", label: "Target launch date", type: "date", options: [], required: false }
    ]
  },
  {
    id: "intake-growth",
    name: "Growth & Operations Intake",
    service: "Growth",
    required: true,
    fields: [
      { id: "topProblem", label: "What is the biggest growth or operations problem?", type: "textarea", options: [], required: true },
      { id: "monthlyRevenue", label: "Current monthly revenue range", type: "dropdown", options: ["Under $10K", "$10K-$25K", "$25K-$75K", "$75K+"], required: true },
      { id: "systems", label: "Systems currently used", type: "checkboxes", options: ["QuickBooks", "CRM", "Task Manager", "Google Workspace", "None"], required: false }
    ]
  }
];

const starterIntakeResponses = [];

const starterDocumentTemplates = [
  "Consulting Agreement",
  "Master Service Agreement",
  "Statement of Work",
  "Proposal",
  "NDA",
  "Terms & Conditions",
  "Change Order",
  "Invoice",
  "Welcome Packet"
].map((type, index) => ({
  id: `template-${index + 1}`,
  name: `Silverback ${type}`,
  type,
  service: index < 4 ? "All Services" : "Onboarding",
  version: "1.0",
  status: "Active",
  updatedAt: today()
}));

const starterSignaturePackets = [];

const starterOnboardingConfig = {
  requiredDocuments: ["Consulting Agreement", "NDA"],
  requiredForms: ["Business Startup Intake", "Growth & Operations Intake"],
  paymentRequiresSignedDocs: true,
  notificationRecipients: ["aidamorales2014@gmail.com", "michaelcocom@yahoo.com", "sbph2026@gmail.com"],
  reminderSchedule: ["24 hours after send", "3 days before due date", "7 days after inactivity"],
  welcomeEmail: "Welcome to Silverback Consulting. Your portal is ready and your next required action is listed on your home screen.",
  paymentReminderEmail: "Your invoice is ready once required onboarding documents are complete. Please log into the portal to review next steps."
};

const starterProjects = [];

const starterAppointments = [];

const assessmentBlueprint = [
  {
    id: "profile",
    title: "Company Profile",
    guidance: "Capture the basics needed to frame the engagement before strategy work begins.",
    fields: [
      { key: "companyName", label: "Company Name", type: "text", required: true },
      { key: "industry", label: "Business Type", type: "select", required: true, options: ["Consulting", "Professional Services", "Food Service", "Retail", "Construction", "Healthcare", "Technology", "Transportation", "Other"] },
      { key: "phase", label: "Current Phase", type: "select", required: true, options: ["Foundation", "Financial Organization", "Operations", "Growth", "Scale"] },
      { key: "revenueRange", label: "Monthly Revenue Range", type: "select", required: true, options: ["Pre-revenue", "Under $10K", "$10K-$25K", "$25K-$75K", "$75K-$150K", "$150K+"] },
      { key: "primaryGoal", label: "Main Goal", type: "textarea", required: true }
    ]
  },
  {
    id: "foundation",
    title: "Legal Foundation",
    guidance: "Verify the required setup items before growth planning.",
    fields: [
      { key: "foundationItems", label: "Completed Foundation Items", type: "multiselect", options: ["LLC", "EIN", "Business License", "Seller's Permit", "Insurance", "Client Contracts", "Business Bank Account"] },
      { key: "foundationRisk", label: "Foundation Risk", type: "radio", required: true, options: ["Low", "Moderate", "High"] },
      { key: "foundationNotes", label: "Foundation Notes", type: "textarea" },
      { key: "foundationScore", label: "Foundation Score", type: "rating", required: true }
    ]
  },
  {
    id: "finance",
    title: "Financial Organization",
    guidance: "Determine whether the owner can see revenue, profit, expenses, and cash flow clearly.",
    fields: [
      { key: "financeItems", label: "Financial Systems In Place", type: "multiselect", options: ["Business Bank Account", "Bookkeeping", "QuickBooks", "Profit & Loss", "Balance Sheet", "Expense Tracking", "Profit Tracking", "Budget"] },
      { key: "cashFlowClarity", label: "Cash Flow Clarity", type: "radio", required: true, options: ["Clear", "Somewhat Clear", "Unclear"] },
      { key: "revenueGoal", label: "Revenue Goal", type: "text", required: true },
      { key: "financeScore", label: "Finance Score", type: "rating", required: true }
    ]
  },
  {
    id: "operations",
    title: "Operations & Accountability",
    guidance: "Evaluate whether the business can deliver consistently without relying on memory.",
    fields: [
      { key: "operationsItems", label: "Operating Systems In Place", type: "multiselect", options: ["SOPs", "Employee Roles", "Training", "Daily Checklists", "Customer Service Process", "Owner Responsibilities", "Task Management"] },
      { key: "biggestBottleneck", label: "Biggest Bottleneck", type: "textarea", required: true },
      { key: "ownerDependency", label: "Owner Dependency", type: "radio", required: true, options: ["Low", "Moderate", "High"] },
      { key: "operationsScore", label: "Operations Score", type: "rating", required: true }
    ]
  },
  {
    id: "growth",
    title: "Marketing, Sales & Growth",
    guidance: "Map visibility, follow-up, retention, pricing, and growth priorities.",
    fields: [
      { key: "growthItems", label: "Growth Systems In Place", type: "multiselect", options: ["Website", "Google Business Profile", "Instagram", "Reviews", "Promotions", "Lead Tracking", "Follow-Up System", "Referral System", "Pricing Strategy"] },
      { key: "growthPriority", label: "Top Growth Priority", type: "select", required: true, options: ["More leads", "Better conversion", "Higher pricing", "Customer retention", "Referral system", "Marketing consistency"] },
      { key: "next30Days", label: "Next 30-Day Plan", type: "textarea", required: true },
      { key: "growthScore", label: "Growth Score", type: "rating", required: true }
    ]
  }
];

const starterTasks = [];

const starterOpportunities = [];

const starterContacts = [];

const starterActivities = [];

const starterKpis = [];

const starterInvoices = [];

const starterRevenuePlans = [];

const starterWorkbench = {
  notes: "",
  updatedAt: ""
};

const starterCeoBoard = {
  today: [],
  week: [],
  month: [],
  done: []
};

const starterAutomations = [
  { workflow: "New lead alert", trigger: "Website form submitted", owner: "Aida + Michael", channel: "Email", status: "Configuration Required" },
  { workflow: "Future investor follow-up", trigger: "Investor intake submitted", owner: "Michael", channel: "Email", status: "Configuration Required" },
  { workflow: "Appointment confirmation", trigger: "Consultation scheduled", owner: "Aida + Michael", channel: "Email", status: "Configuration Required" },
  { workflow: "Invoice reminder", trigger: "Invoice due in 3 days", owner: "Finance", channel: "Invoice Reminder", status: "Planned" },
  { workflow: "Client weekly check-in", trigger: "Active client without contact in 7 days", owner: "Advisor", channel: "CRM Task", status: "Planned" }
];

const starterIntegrations = [
  { name: "Azure Static Web Apps", category: "Hosting", status: "Live", detail: "Production front-end hosting with SSL and GitHub deployment." },
  { name: "GitHub", category: "Deployment", status: "Live", detail: "Version control and deployment source." },
  { name: "Microsoft Entra ID", category: "Authentication", status: "Configuration Required", detail: "Production login, MFA, and role claims are prepared; owners must be created in Azure before live use." },
  { name: "Google Analytics 4", category: "Analytics", status: "Setup Required", detail: "Add the live GA4 measurement ID after the Silverback web data stream is created." },
  { name: "Azure Functions Email Router", category: "Communication", status: "Configuration Required", detail: "Website forms and portal notices are wired for queue-based email once Azure app settings are configured." },
  { name: "DocuSign", category: "E-Signature", status: "Prepared", detail: "Client disclosures, agreements, and onboarding signatures are mapped to future envelope flows." },
  { name: "Stripe / Square / PayPal", category: "Payments", status: "Prepared", detail: "Card, wallet, PayPal, Venmo, Apple Pay, and Google Pay rails stay outside the CRM." },
  { name: "Plaid", category: "Financial Data", status: "Prepared", detail: "Bank verification and permissioned financial data access are planned for client-side finance workflows." },
  { name: "QuickBooks", category: "Accounting", status: "Prepared", detail: "Invoice sync, revenue reporting, billable hours, and reconciliation fields are mapped." },
  { name: "Azure Blob Storage", category: "Documents", status: "Configuration Required", detail: "Secure file storage path is prepared for statements, contracts, assessments, and portal documents." },
  { name: "Application Insights", category: "Monitoring", status: "Configuration Required", detail: "Production uptime, errors, and performance monitoring activate after Azure instrumentation is configured." },
  { name: "Google Drive", category: "Documents", status: "Prepared", detail: "Client workspace links and document organization are supported without storing Drive credentials." }
];

const starterAuditEvents = [];

const starterNotificationHistory = [];

const keys = {
  clients: "silverbackClientsV2",
  tasks: "silverbackTasksV2",
  opportunities: "silverbackOpportunitiesV2",
  contacts: "silverbackContactsV2",
  activities: "silverbackActivitiesV2",
  kpis: "silverbackKpisV1",
  invoices: "silverbackInvoicesV1",
  revenuePlans: "silverbackRevenuePlansV1",
  workbench: "silverbackWorkbenchV1",
  automations: "silverbackAutomationsV1",
  integrations: "silverbackIntegrationsV1",
  auditEvents: "silverbackAuditEventsV1",
  assessments: "silverbackBusinessHealthAssessmentsV1",
  lifecycleStages: "silverbackLifecycleStagesV1",
  intakeForms: "silverbackIntakeFormsV1",
  intakeResponses: "silverbackIntakeResponsesV1",
  documentTemplates: "silverbackDocumentTemplatesV1",
  signaturePackets: "silverbackSignaturePacketsV1",
  onboardingConfig: "silverbackOnboardingConfigV1",
  projects: "silverbackProjectsV1",
  appointments: "silverbackAppointmentsV1",
  notificationHistory: "silverbackNotificationHistoryV1",
  daily: "silverbackDailyV2",
  cleanup: "silverbackRealDataCleanupV1",
  unlocked: "silverbackHqUnlocked"
};

const sessionMinutes = 30;
const idleMinutes = 10;

const store = {
  get clients() { return getData(keys.clients, starterClients); },
  set clients(value) { setData(keys.clients, value); },
  get tasks() { return getData(keys.tasks, starterTasks); },
  set tasks(value) { setData(keys.tasks, value); },
  get opportunities() { return getData(keys.opportunities, starterOpportunities); },
  set opportunities(value) { setData(keys.opportunities, value); },
  get contacts() { return getData(keys.contacts, starterContacts); },
  set contacts(value) { setData(keys.contacts, value); },
  get activities() { return getData(keys.activities, starterActivities); },
  set activities(value) { setData(keys.activities, value); },
  get kpis() { return getData(keys.kpis, starterKpis); },
  set kpis(value) { setData(keys.kpis, value); },
  get invoices() { return getData(keys.invoices, starterInvoices); },
  set invoices(value) { setData(keys.invoices, value); },
  get revenuePlans() { return getData(keys.revenuePlans, starterRevenuePlans); },
  set revenuePlans(value) { setData(keys.revenuePlans, value); },
  get workbench() { return getData(keys.workbench, starterWorkbench); },
  set workbench(value) { setData(keys.workbench, value); },
  get automations() { return getData(keys.automations, starterAutomations); },
  set automations(value) { setData(keys.automations, value); },
  get integrations() { return getData(keys.integrations, starterIntegrations); },
  set integrations(value) { setData(keys.integrations, value); },
  get auditEvents() { return getData(keys.auditEvents, starterAuditEvents); },
  set auditEvents(value) { setData(keys.auditEvents, value); },
  get assessments() { return getData(keys.assessments, {}); },
  set assessments(value) { setData(keys.assessments, value); },
  get lifecycleStages() { return getData(keys.lifecycleStages, starterLifecycleStages); },
  set lifecycleStages(value) { setData(keys.lifecycleStages, value); },
  get intakeForms() { return getData(keys.intakeForms, starterIntakeForms); },
  set intakeForms(value) { setData(keys.intakeForms, value); },
  get intakeResponses() { return getData(keys.intakeResponses, starterIntakeResponses); },
  set intakeResponses(value) { setData(keys.intakeResponses, value); },
  get documentTemplates() { return getData(keys.documentTemplates, starterDocumentTemplates); },
  set documentTemplates(value) { setData(keys.documentTemplates, value); },
  get signaturePackets() { return getData(keys.signaturePackets, starterSignaturePackets); },
  set signaturePackets(value) { setData(keys.signaturePackets, value); },
  get onboardingConfig() { return getData(keys.onboardingConfig, starterOnboardingConfig); },
  set onboardingConfig(value) { setData(keys.onboardingConfig, value); },
  get projects() { return getData(keys.projects, starterProjects); },
  set projects(value) { setData(keys.projects, value); },
  get appointments() { return getData(keys.appointments, starterAppointments); },
  set appointments(value) { setData(keys.appointments, value); },
  get notificationHistory() { return getData(keys.notificationHistory, starterNotificationHistory); },
  set notificationHistory(value) { setData(keys.notificationHistory, value); },
  get daily() { return getData(keys.daily, {}); },
  set daily(value) { setData(keys.daily, value); }
};

function getData(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function enableRealDataMode() {
  if (localStorage.getItem(keys.cleanup) === "complete") return;
  const emptyArrays = [
    keys.clients,
    keys.tasks,
    keys.opportunities,
    keys.contacts,
    keys.activities,
    keys.kpis,
    keys.invoices,
    keys.revenuePlans,
    keys.intakeResponses,
    keys.signaturePackets,
    keys.projects,
    keys.appointments,
    keys.notificationHistory
  ];
  emptyArrays.forEach((key) => localStorage.setItem(key, JSON.stringify([])));
  [
    "silverbackPortalDocumentsV1",
    "silverbackPortalInvoicesV1",
    "silverbackPortalPaymentsV1",
    "silverbackPortalMessagesV1",
    "silverbackPortalAuditV1",
    "silverbackPortalPlaidV1"
  ].forEach((key) => localStorage.setItem(key, JSON.stringify({})));
  localStorage.setItem(keys.workbench, JSON.stringify(starterWorkbench));
  localStorage.setItem(keys.daily, JSON.stringify(starterCeoBoard));
  localStorage.setItem(keys.assessments, JSON.stringify({}));
  localStorage.setItem(keys.cleanup, "complete");
}

enableRealDataMode();

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateValue, days) {
  const date = new Date(`${dateValue}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function money(value) {
  const number = Number(value);
  return number ? number.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "$0";
}

function invoiceTotal(invoice) {
  return (Number(invoice.hours || 0) * Number(invoice.rate || 0)) + Number(invoice.flatFee || 0);
}

function servicePackages() {
  return [
    { name: "Foundation Setup", value: 2500, deposit: 500, cadence: "One-Time", fit: "New owners who need LLC, EIN, permits, banking, launch checklist, and business foundation roadmap.", features: ["LLC/EIN guidance", "Business launch checklist", "Foundation roadmap"] },
    { name: "Business Assessment & Strategy", value: 3500, deposit: 750, cadence: "Project", fit: "Businesses that feel stuck, disorganized, or unsure what to fix first.", features: ["Business health assessment", "SWOT and revenue review", "30/60/90 day roadmap"] },
    { name: "Growth Roadmap", value: 5000, deposit: 1000, cadence: "Project", fit: "Businesses ready to increase revenue, visibility, customers, and referral flow.", features: ["Marketing strategy", "Pricing review", "Sales process recommendations"] },
    { name: "Scale Operating System", value: 7500, deposit: 1500, cadence: "Project", fit: "Businesses with chaos, inconsistency, growing pains, or owner bottlenecks.", features: ["SOP development", "Workflow mapping", "Accountability system"] },
    { name: "Premium Business Platform", value: 12000, deposit: 2500, cadence: "Project", fit: "Clients that need strategy, finance, operations, marketing, and leadership support in one operating system.", features: ["CRM/client portal", "KPI dashboards", "Financial and operating cadence"] },
    { name: "Monthly Advisory", value: 1500, deposit: 0, cadence: "Monthly", fit: "Owners who need ongoing guidance, decision support, KPI review, and accountability.", features: ["Monthly leadership session", "KPI review", "Action plan updates"] },
    { name: "Custom Project", value: 4000, deposit: 750, cadence: "Custom", fit: "Specialized engagements that do not fit a standard package.", features: ["Custom scope", "Custom milestones", "Custom deliverables"] }
  ];
}

function maintenancePlans() {
  return [
    { name: "No Ongoing Support", value: 0, detail: "Project-only engagement." },
    { name: "Monthly Check-In", value: 299, detail: "Light monthly accountability and next-step review." },
    { name: "Growth Support", value: 799, detail: "Monthly execution support, KPI review, and business development focus." },
    { name: "Executive Advisory", value: 1500, detail: "High-touch leadership, finance, operations, and growth support." }
  ];
}

function packageForClient(client) {
  const phase = client?.currentPhase || "";
  if (phase === "Foundation") return "Foundation Setup";
  if (phase === "Financial Organization") return "Business Assessment & Strategy";
  if (phase === "Operations") return "Scale Operating System";
  if (phase === "Growth") return "Growth Roadmap";
  if (phase === "Scale") return "Premium Business Platform";
  return "Business Assessment & Strategy";
}

function stageWeight(stage) {
  return {
    "New Lead": 0.1,
    Discovery: 0.25,
    Proposal: 0.5,
    Negotiation: 0.75,
    Won: 1,
    Lost: 0
  }[stage] ?? 0;
}

function daysSince(dateValue) {
  if (!dateValue) return 999;
  const start = new Date(`${dateValue}T00:00:00`);
  const now = new Date(`${today()}T00:00:00`);
  return Math.floor((now - start) / 86400000);
}

function clientRisk(client) {
  const score = [
    client.status === "Active" && daysSince(client.lastContact) > 14,
    !client.nextAction,
    store.tasks.some((task) => task.client === client.clientName && task.status !== "Done" && task.dueDate && task.dueDate < today()),
    store.kpis.some((kpi) => kpi.client === client.clientName && kpi.status === "Off Track")
  ].filter(Boolean).length;
  if (score >= 2) return "High";
  if (score === 1) return "Watch";
  return "Healthy";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "");
  return date.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

const loginScreen = document.querySelector("[data-login-screen]");
const appShell = document.querySelector("[data-app-shell]");
const appMain = document.querySelector(".app-shell main");
const crmSectionLinks = document.querySelectorAll('.sidebar nav a[href^="#"]');
const loginForm = document.querySelector("[data-login-form]");
const loginError = document.querySelector("[data-login-error]");
const sessionStatus = document.querySelector("[data-session-status]");
let idleTimer;

function scrollToCrmSection(hash, updateHash = true) {
  const target = document.querySelector(hash);
  if (!target) return false;
  const mainStyle = appMain ? getComputedStyle(appMain) : null;
  const mainCanScroll = appMain && appMain.scrollHeight > appMain.clientHeight + 2 && /(auto|scroll)/.test(mainStyle.overflowY);
  if (mainCanScroll) {
    appMain.scrollTo({ top: Math.max(0, target.offsetTop - 18), behavior: "smooth" });
  } else {
    const offset = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
  }
  crmSectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === hash));
  if (updateHash && history.replaceState) history.replaceState(null, "", hash);
  return true;
}

function unlock() {
  loginScreen.hidden = true;
  appShell.hidden = false;
  updateSessionStatus();
  resetIdleTimer();
}

function lock(reason = "") {
  localStorage.removeItem(keys.unlocked);
  loginScreen.hidden = false;
  appShell.hidden = true;
  loginError.textContent = reason;
  clearTimeout(idleTimer);
}

function isSessionValid() {
  const expiresAt = Number(localStorage.getItem(keys.unlocked));
  return expiresAt && Date.now() < expiresAt;
}

function updateSessionStatus() {
  const expiresAt = Number(localStorage.getItem(keys.unlocked));
  if (!expiresAt || !sessionStatus) return;
  const minutesLeft = Math.max(0, Math.ceil((expiresAt - Date.now()) / 60000));
  sessionStatus.textContent = `Protected session | ${minutesLeft} min`;
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => lock("Session locked after inactivity."), idleMinutes * 60000);
}

if (isSessionValid()) unlock();
else localStorage.removeItem(keys.unlocked);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = new FormData(loginForm).get("accessCode");
  if (String(code).trim().toUpperCase() === "SILVERBACK") {
    localStorage.setItem(keys.unlocked, String(Date.now() + sessionMinutes * 60000));
    unlock();
    if (window.location.hash) requestAnimationFrame(() => scrollToCrmSection(window.location.hash, false));
  } else {
    loginError.textContent = "Incorrect access code.";
  }
});

crmSectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToCrmSection(link.getAttribute("href"));
  });
});

document.querySelector("[data-lock-crm]").addEventListener("click", () => {
  lock("CRM locked.");
});

["click", "keydown", "mousemove", "scroll", "touchstart"].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    if (!appShell.hidden) resetIdleTimer();
  }, { passive: true });
});

setInterval(() => {
  if (!appShell.hidden && !isSessionValid()) lock("Session expired. Please enter the access code again.");
  if (!appShell.hidden) updateSessionStatus();
}, 30000);

const clientTable = document.querySelector("[data-clients-table]");
const clientForm = document.querySelector("[data-client-form]");
const taskForm = document.querySelector("[data-task-form]");
const opportunityForm = document.querySelector("[data-opportunity-form]");
const contactForm = document.querySelector("[data-contact-crm-form]");
const kpiForm = document.querySelector("[data-kpi-form]");
const activityForm = document.querySelector("[data-activity-form]");
const invoiceForm = document.querySelector("[data-invoice-form]");
const revenueBuilderForm = document.querySelector("[data-revenue-builder-form]");
const packageSelect = document.querySelector("[data-package-select]");
const maintenanceSelect = document.querySelector("[data-maintenance-select]");
const workbenchNotes = document.querySelector("[data-workbench-notes]");
const automationForm = document.querySelector("[data-automation-form]");
const ceoTaskForm = document.querySelector("[data-ceo-task-form]");
const generateCeoPlanButton = document.querySelector("[data-generate-ceo-plan]");
const taskBoard = document.querySelector("[data-task-board]");
const pipelineBoard = document.querySelector("[data-pipeline-board]");
const phaseBoard = document.querySelector("[data-phase-board]");
const kpiGrid = document.querySelector("[data-kpi-grid]");
const invoiceList = document.querySelector("[data-invoice-list]");
const clientView = document.querySelector("[data-client-view]");
const clientSearch = document.querySelector("[data-client-search]");
const globalSearch = document.querySelector("[data-global-search]");
const assessmentClient = document.querySelector("[data-assessment-client]");
const assessmentForm = document.querySelector("[data-assessment-form]");
const assessmentSections = document.querySelector("[data-assessment-sections]");
const assessmentProgressText = document.querySelector("[data-assessment-progress-text]");
const assessmentProgressBar = document.querySelector("[data-assessment-progress-bar]");
const assessmentStatus = document.querySelector("[data-assessment-status]");
const assessmentUpdated = document.querySelector("[data-assessment-updated]");
const assessmentScore = document.querySelector("[data-assessment-score]");
const assessmentError = document.querySelector("[data-assessment-error]");
const assessmentSave = document.querySelector("[data-assessment-save]");
const assessmentResume = document.querySelector("[data-assessment-resume]");
const assessmentSubmit = document.querySelector("[data-assessment-submit]");
const assessmentExport = document.querySelector("[data-assessment-export]");
const contactsGrid = document.querySelector("[data-contacts-grid]");
const activityTimeline = document.querySelector("[data-activity-timeline]");
const toast = document.querySelector("[data-toast]");

function filteredClients() {
  const query = `${clientSearch.value} ${globalSearch.value}`.trim().toLowerCase();
  const view = clientView.value;
  return store.clients.filter((client) => {
    const matchesSearch = Object.values(client).join(" ").toLowerCase().includes(query);
    const matchesView = view === "all" || (view === "active" && client.status === "Active") || (view === "leads" && client.status === "Lead") || view === "phase";
    return matchesSearch && matchesView;
  });
}

function clientOptions() {
  if (!store.clients.length) return `<option value="">No clients added yet</option>`;
  return store.clients.map((client) => `<option>${escapeHtml(client.clientName)}</option>`).join("");
}

function allAssessmentFields() {
  return assessmentBlueprint.flatMap((section) => section.fields.map((field) => ({ ...field, sectionId: section.id })));
}

function defaultAssessment(client) {
  const responses = {};
  allAssessmentFields().forEach((field) => {
    responses[field.key] = field.type === "multiselect" ? [] : "";
  });
  responses.companyName = client?.clientName || "";
  responses.industry = client?.businessType || "";
  responses.phase = client?.currentPhase || "Foundation";
  responses.primaryGoal = client?.nextAction || "";
  responses.biggestBottleneck = client?.biggestProblem || "";
  return {
    status: "Draft",
    updatedAt: "",
    submittedAt: "",
    responses
  };
}

function assessmentKey(client) {
  return client?.clientName || "Unknown Client";
}

function selectedAssessmentClient() {
  const index = Number(assessmentClient?.value || 0);
  return store.clients[index] || store.clients[0];
}

function normalizeAssessment(assessment, client) {
  const fallback = defaultAssessment(client);
  const normalized = {
    ...fallback,
    ...(assessment || {}),
    responses: { ...fallback.responses, ...((assessment && assessment.responses) || {}) }
  };
  allAssessmentFields().forEach((field) => {
    if (field.type === "multiselect" && !Array.isArray(normalized.responses[field.key])) normalized.responses[field.key] = [];
  });
  return normalized;
}

function getAssessment(client) {
  return normalizeAssessment(store.assessments[assessmentKey(client)], client);
}

function saveAssessment(client, assessment) {
  store.assessments = {
    ...store.assessments,
    [assessmentKey(client)]: {
      ...assessment,
      updatedAt: new Date().toISOString()
    }
  };
}

function assessmentMetrics(assessment) {
  const fields = allAssessmentFields();
  const required = fields.filter((field) => field.required);
  const completedRequired = required.filter((field) => {
    const value = assessment.responses[field.key];
    return Array.isArray(value) ? value.length > 0 : String(value || "").trim().length > 0;
  }).length;
  const scoreFields = fields.filter((field) => field.type === "rating");
  const scoreTotal = scoreFields.reduce((sum, field) => sum + Number(assessment.responses[field.key] || 0), 0);
  const score = scoreFields.length ? Math.round((scoreTotal / (scoreFields.length * 10)) * 100) : 0;
  return {
    completion: required.length ? Math.round((completedRequired / required.length) * 100) : 100,
    score,
    missing: required.filter((field) => {
      const value = assessment.responses[field.key];
      return Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
    })
  };
}

function renderAssessmentField(field, assessment) {
  const value = assessment.responses[field.key];
  const required = field.required ? " data-required=\"true\"" : "";
  const requiredMark = field.required ? "<em>Required</em>" : "";
  if (field.type === "textarea") {
    return `<label class="assessment-field assessment-field-wide"${required}>${escapeHtml(field.label)} ${requiredMark}<textarea name="assessment.${escapeHtml(field.key)}" rows="3">${escapeHtml(value)}</textarea></label>`;
  }
  if (field.type === "select") {
    return `<label class="assessment-field"${required}>${escapeHtml(field.label)} ${requiredMark}<select name="assessment.${escapeHtml(field.key)}"><option value="">Select one</option>${field.options.map((option) => `<option${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`;
  }
  if (field.type === "radio") {
    return `<fieldset class="assessment-field"${required}><legend>${escapeHtml(field.label)} ${requiredMark}</legend><div class="choice-row">${field.options.map((option) => `<label><input type="radio" name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(option)}"${option === value ? " checked" : ""}>${escapeHtml(option)}</label>`).join("")}</div></fieldset>`;
  }
  if (field.type === "multiselect") {
    const selected = Array.isArray(value) ? value : [];
    return `<fieldset class="assessment-field assessment-field-wide"><legend>${escapeHtml(field.label)}</legend><div class="checkbox-grid">${field.options.map((option) => `<label><input type="checkbox" name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(option)}"${selected.includes(option) ? " checked" : ""}>${escapeHtml(option)}</label>`).join("")}</div></fieldset>`;
  }
  if (field.type === "rating") {
    return `<fieldset class="assessment-field"${required}><legend>${escapeHtml(field.label)} ${requiredMark}</legend><div class="rating-row">${Array.from({ length: 10 }, (_, index) => index + 1).map((score) => `<label><input type="radio" name="assessment.${escapeHtml(field.key)}" value="${score}"${Number(value) === score ? " checked" : ""}>${score}</label>`).join("")}</div></fieldset>`;
  }
  return `<label class="assessment-field"${required}>${escapeHtml(field.label)} ${requiredMark}<input name="assessment.${escapeHtml(field.key)}" value="${escapeHtml(value)}"></label>`;
}

function collectAssessmentFromForm(baseAssessment) {
  const assessment = normalizeAssessment(baseAssessment, selectedAssessmentClient());
  if (!assessmentForm) return assessment;
  allAssessmentFields().forEach((field) => {
    const controls = [...assessmentForm.querySelectorAll(`[name="assessment.${CSS.escape(field.key)}"]`)];
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

function refreshAssessmentSummary(assessment) {
  const metrics = assessmentMetrics(assessment);
  if (assessmentProgressText) assessmentProgressText.textContent = `${metrics.completion}%`;
  if (assessmentProgressBar) assessmentProgressBar.style.width = `${metrics.completion}%`;
  if (assessmentStatus) assessmentStatus.textContent = assessment.status || "Draft";
  if (assessmentUpdated) assessmentUpdated.textContent = assessment.updatedAt ? new Date(assessment.updatedAt).toLocaleString() : "Not saved";
  if (assessmentScore) assessmentScore.textContent = `${metrics.score} / 100`;
}

function renderAssessment() {
  if (!assessmentClient || !assessmentSections) return;
  const client = selectedAssessmentClient();
  if (!client) return;
  const assessment = getAssessment(client);
  assessmentSections.innerHTML = assessmentBlueprint.map((section) => `
    <article class="assessment-card">
      <div>
        <p>${escapeHtml(section.id)}</p>
        <h3>${escapeHtml(section.title)}</h3>
        <span>${escapeHtml(section.guidance)}</span>
      </div>
      <div class="assessment-field-grid">
        ${section.fields.map((field) => renderAssessmentField(field, assessment)).join("")}
      </div>
    </article>
  `).join("");
  if (assessmentError) assessmentError.textContent = "";
  refreshAssessmentSummary(assessment);
}

function persistAssessmentDraft(message = "Assessment draft saved.") {
  const client = selectedAssessmentClient();
  if (!client) return;
  const assessment = collectAssessmentFromForm(getAssessment(client));
  assessment.status = "Draft";
  saveAssessment(client, assessment);
  refreshAssessmentSummary(getAssessment(client));
  showToast(message);
}

function submitAssessment() {
  const client = selectedAssessmentClient();
  const assessment = collectAssessmentFromForm(getAssessment(client));
  const metrics = assessmentMetrics(assessment);
  if (metrics.missing.length) {
    if (assessmentError) assessmentError.textContent = `Complete required fields: ${metrics.missing.map((field) => field.label).join(", ")}.`;
    const firstMissing = assessmentForm?.querySelector(`[name="assessment.${CSS.escape(metrics.missing[0].key)}"]`);
    firstMissing?.focus();
    return;
  }
  assessment.status = "Submitted";
  assessment.submittedAt = new Date().toISOString();
  saveAssessment(client, assessment);
  addAuditEvent("Advisor", `Submitted business health assessment for ${client.clientName}`, "Assessment");
  if (assessmentError) assessmentError.textContent = "";
  refreshAssessmentSummary(getAssessment(client));
  showToast("Assessment submitted and ready for client review.");
}

function exportAssessmentPdf() {
  const client = selectedAssessmentClient();
  const assessment = collectAssessmentFromForm(getAssessment(client));
  saveAssessment(client, assessment);
  const metrics = assessmentMetrics(assessment);
  const sections = assessmentBlueprint.map((section) => `
    <section>
      <h2>${escapeHtml(section.title)}</h2>
      ${section.fields.map((field) => {
        const value = assessment.responses[field.key];
        const printable = Array.isArray(value) ? value.join(", ") : value;
        return `<p><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(printable || "Not answered")}</p>`;
      }).join("")}
    </section>
  `).join("");
  const win = window.open("", "_blank", "width=900,height=1000");
  if (!win) {
    showToast("Allow popups to export the assessment PDF.");
    return;
  }
  win.document.write(`<!doctype html><html><head><title>${escapeHtml(client.clientName)} Assessment</title><style>body{font-family:Arial,sans-serif;margin:40px;color:#181818}h1{font-size:30px}h2{border-top:1px solid #ccc;padding-top:18px}p{line-height:1.45}strong{color:#000}.meta{color:#666}</style></head><body><h1>Silverback Business Health Assessment</h1><p class="meta">${escapeHtml(client.clientName)} | Completion ${metrics.completion}% | Readiness ${metrics.score}/100 | Status ${escapeHtml(assessment.status || "Draft")}</p>${sections}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
}

function renderSummary() {
  const clients = store.clients;
  const tasks = store.tasks;
  const opportunities = store.opportunities;
  const due = tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate <= today()).length;
  const overdue = tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate < today()).length;
  document.querySelector("[data-total-clients]").textContent = clients.length;
  document.querySelector("[data-active-clients]").textContent = clients.filter((client) => client.status === "Active").length;
  document.querySelector("[data-open-tasks]").textContent = tasks.filter((task) => task.status !== "Done").length;
  document.querySelector("[data-followups-due]").textContent = due;
  document.querySelector("[data-lead-count]").textContent = clients.filter((client) => client.status === "Lead").length;
  document.querySelector("[data-pipeline-value]").textContent = money(opportunities.filter((opportunity) => !["Lost", "Won"].includes(opportunity.stage)).reduce((sum, opportunity) => sum + Number(opportunity.value || 0), 0));
  document.querySelector("[data-overdue-tasks]").textContent = overdue;
  document.querySelector("[data-risk-clients]").textContent = clients.filter((client) => clientRisk(client) !== "Healthy").length;
  document.querySelector("[data-open-invoices]").textContent = money(store.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0));
  document.querySelector("[data-security-score]").textContent = `${securityScore()}%`;
  document.querySelector("[data-active-automations]").textContent = store.automations.filter((automation) => ["Ready", "Live"].includes(automation.status)).length;
  document.querySelector("[data-connected-systems]").textContent = store.integrations.filter((integration) => ["Live", "Ready"].includes(integration.status)).length;
}

function securityScore() {
  const checks = securityChecks();
  return Math.round((checks.filter((check) => check.status === "Active" || check.status === "Ready").length / checks.length) * 100);
}

function securityChecks() {
  return [
    { name: "Protected Admin Session", status: "Active", detail: "CRM locks after inactivity. Azure Static Web Apps protects the live CRM route before the page loads." },
    { name: "Azure Auth Path", status: "Configuration Required", detail: "Microsoft Entra ID owner accounts, MFA, and role assignments must be completed in Azure." },
    { name: "Role-Based Access", status: "Prepared", detail: "Owner, advisor, client, and investor roles are mapped for backend enforcement." },
    { name: "Audit Trail", status: "Active", detail: "Client actions, invoice events, and security events are visible in HQ." },
    { name: "Data Export Backup", status: "Active", detail: "Full CRM export creates a portable JSON backup." },
    { name: "Payment Data Isolation", status: "Prepared", detail: "Card and bank data should stay inside Stripe, PayPal, Plaid, and banking providers." },
    { name: "Production Monitoring", status: "Configuration Required", detail: "Azure deployment, GA4 traffic, and uptime checks require live provider keys." }
  ];
}

function crmReadinessChecks() {
  const searchableRecords = [
    ...store.clients,
    ...store.tasks,
    ...store.opportunities,
    ...store.contacts,
    ...store.activities,
    ...store.kpis,
    ...store.invoices,
    ...store.revenuePlans,
    ...store.intakeResponses,
    ...store.signaturePackets,
    ...store.projects,
    ...store.appointments,
    ...store.notificationHistory
  ];
  const text = JSON.stringify(searchableRecords).toLowerCase();
  const blockedTerms = ["sample", "demo", "mock", "test client", "example", "fake", "lorem", "dummy", "avy's ribs", "sb plum", "felipe"];
  const demoFree = !blockedTerms.some((term) => text.includes(term));
  return [
    { name: "Demo Data Removed", status: demoFree ? "Active" : "Needs Review", detail: demoFree ? "Client, appointment, invoice, onboarding, document, payment, and notification records are clean." : "A cleanup keyword still appears in stored CRM records." },
    { name: "Real Data Mode Enabled", status: localStorage.getItem(keys.cleanup) === "complete" ? "Active" : "Needs Review", detail: "CRM tables start empty and dashboard counts calculate from real records only." },
    { name: "Authentication Enabled", status: "Configuration Required", detail: "Azure Static Web Apps route protection is configured; create Entra owner accounts before live CRM use." },
    { name: "Environment Variables Configured", status: "Configuration Required", detail: "Email recipients, queue names, provider keys, and database settings must be added in Azure app settings." },
    { name: "API Connected", status: "Configuration Required", detail: "Website appointment events are wired to the Azure notification endpoint after Functions app settings are configured." },
    { name: "Database / Storage Connected", status: "Configuration Required", detail: "Browser storage supports preview mode; production client records need Azure database or storage connection." }
  ];
}

function productionModules() {
  return [
    { title: "Microsoft Entra ID Login", status: "Ready", owner: "Azure Identity", phase: "Security", detail: "Replace temporary access code with real Microsoft login, MFA, conditional access, and session control.", nextStep: "Create app registration and assign Owner, Advisor, Client, and Investor roles." },
    { title: "Role-Based Access Control", status: "Ready", owner: "Silverback HQ", phase: "Security", detail: "Owner, advisor, client portal, and investor access levels are mapped across CRM and portal features.", nextStep: "Enforce route and data visibility through Azure roles or backend claims." },
    { title: "Azure Function Email Router", status: "Ready", owner: "Operations", phase: "Communication", detail: "Consultations, future investors, portal messages, and invoice events can trigger email notifications.", nextStep: "Connect SendGrid, Microsoft Graph, or Gmail SMTP with verified business sender." },
    { title: "Payment Provider Checkout", status: "Ready", owner: "Finance", phase: "Payments", detail: "Invoice payments can route to Stripe, Square, PayPal, Venmo, Apple Pay, and Google Pay without storing card data.", nextStep: "Create hosted checkout links and store provider transaction IDs only." },
    { title: "DocuSign Envelope Flow", status: "Ready", owner: "Client Success", phase: "Signatures", detail: "Disclosure packets, service agreements, onboarding forms, and authorization forms are staged for e-signature.", nextStep: "Create DocuSign templates and attach envelope status to client records." },
    { title: "QuickBooks Accounting Sync", status: "Ready", owner: "Accounting", phase: "Finance", detail: "Billable hours, invoice totals, paid status, and client revenue can sync into QuickBooks.", nextStep: "Connect QuickBooks app and map invoice, customer, service, and payment fields." },
    { title: "Analytics & Reporting", status: "Ready", owner: "Leadership", phase: "Reporting", detail: "GA4, CRM KPIs, revenue forecast, pipeline conversion, tasks, and portal usage are represented in HQ.", nextStep: "Connect the live GA4 measurement ID and stream events from forms, portal actions, and payments." },
    { title: "Secure Document Storage", status: "Ready", owner: "Client Portal", phase: "Documents", detail: "Client statements, invoices, contracts, assessments, and SOP files can live in role-protected storage.", nextStep: "Use Azure Blob Storage containers with expiring signed links and client-level permissions." }
  ];
}

function documentVaultItems() {
  return [
    { name: "Client onboarding packet", access: "Client + Admin", system: "DocuSign + Azure Storage", status: "Ready" },
    { name: "Service agreement and disclosures", access: "Client + Owner", system: "DocuSign Envelope", status: "Ready" },
    { name: "Monthly statements and invoices", access: "Client + Finance", system: "QuickBooks + Portal", status: "Ready" },
    { name: "Business assessments", access: "Client + Advisor", system: "Silverback HQ", status: "Active" },
    { name: "Financial documents", access: "Finance Only", system: "Azure Blob Storage", status: "Ready" },
    { name: "SOP and operating files", access: "Advisor + Client", system: "Document Vault", status: "Active" }
  ];
}

function lifecycleStageIndex(stageName) {
  const stages = store.lifecycleStages.filter((stage) => stage.active !== false);
  const index = stages.findIndex((stage) => stage.name === stageName);
  return index >= 0 ? index : 0;
}

function templateName(templateId) {
  return store.documentTemplates.find((template) => template.id === templateId)?.type || "Document";
}

function clientRecord(clientName) {
  return store.clients.find((client) => client.clientName === clientName) || store.clients[0];
}

function signaturesForClient(clientName) {
  return store.signaturePackets.filter((packet) => packet.client === clientName);
}

function signedDocumentTypes(clientName) {
  return signaturesForClient(clientName)
    .filter((packet) => ["Signed", "Completed"].includes(packet.status))
    .map((packet) => templateName(packet.templateId));
}

function completedIntakeNames(clientName) {
  return store.intakeResponses
    .filter((response) => response.client === clientName && response.status === "Completed")
    .map((response) => store.intakeForms.find((form) => form.id === response.formId)?.name)
    .filter(Boolean);
}

function onboardingChecklist(client) {
  const stageIndex = lifecycleStageIndex(client.lifecycleStage || client.status || "New Lead");
  const signedTypes = signedDocumentTypes(client.clientName);
  const completedForms = completedIntakeNames(client.clientName);
  const invoices = store.invoices.filter((invoice) => invoice.client === client.clientName);
  const projects = store.projects.filter((project) => project.client === client.clientName);
  const hasAppointment = store.appointments.some((appointment) => appointment.client === client.clientName && appointment.status === "Scheduled");
  const hasPaidInvoice = invoices.some((invoice) => invoice.status === "Paid");
  const config = store.onboardingConfig;
  const docsComplete = config.requiredDocuments.every((doc) => signedTypes.includes(doc));
  const formsComplete = config.requiredForms.some((form) => completedForms.includes(form)) || completedForms.length > 0;

  return [
    { label: "Consultation Scheduled", complete: hasAppointment || stageIndex >= lifecycleStageIndex("Consultation Scheduled"), next: "Schedule consultation." },
    { label: "Consultation Completed", complete: stageIndex >= lifecycleStageIndex("Consultation Completed"), next: "Mark consultation complete." },
    { label: "Proposal Accepted", complete: stageIndex >= lifecycleStageIndex("Proposal Accepted"), next: "Send or accept proposal." },
    { label: "Service Agreement Signed", complete: signedTypes.includes("Consulting Agreement"), next: "Send Consulting Agreement." },
    { label: "NDA Signed", complete: signedTypes.includes("NDA"), next: "Send NDA packet." },
    { label: "Required Intake Forms Completed", complete: formsComplete, next: "Complete required intake form." },
    { label: "All Required Documents Completed", complete: docsComplete, next: "Collect remaining signatures." },
    { label: "Payment Received", complete: hasPaidInvoice || stageIndex >= lifecycleStageIndex("Payment Received"), next: docsComplete ? "Collect payment." : "Complete signatures before payment." },
    { label: "Welcome Package Delivered", complete: signedTypes.includes("Welcome Packet") || stageIndex >= lifecycleStageIndex("Client Activated"), next: "Deliver welcome packet." },
    { label: "Project Created", complete: projects.length > 0 || stageIndex >= lifecycleStageIndex("Project Created"), next: "Run project automation." },
    { label: "Project Started", complete: projects.some((project) => project.status === "Project In Progress") || stageIndex >= lifecycleStageIndex("Project In Progress"), next: "Start project tracking." }
  ];
}

function onboardingStatus(client) {
  const checklist = onboardingChecklist(client);
  const complete = checklist.filter((item) => item.complete).length;
  const percent = checklist.length ? Math.round((complete / checklist.length) * 100) : 0;
  const next = checklist.find((item) => !item.complete)?.next || "Onboarding complete. Continue project execution.";
  return { checklist, percent, next, readyForProject: percent >= 80 && checklist.find((item) => item.label === "All Required Documents Completed")?.complete };
}

function renderExecutiveLifecycleMetrics() {
  const target = document.querySelector("[data-executive-lifecycle-metrics]");
  if (!target) return;
  const clients = store.clients;
  const statusCount = (stage) => clients.filter((client) => client.lifecycleStage === stage).length;
  const metrics = [
    ["New Leads", clients.filter((client) => client.status === "Lead" || client.lifecycleStage === "New Lead").length],
    ["Scheduled Consultations", store.appointments.filter((appointment) => appointment.status === "Scheduled").length],
    ["Consultations Completed", statusCount("Consultation Completed")],
    ["Pending Proposals", clients.filter((client) => ["Proposal Sent", "Waiting for Client Decision"].includes(client.lifecycleStage)).length],
    ["Waiting for Documents", statusCount("Required Documents Sent")],
    ["Waiting for E-Signatures", store.signaturePackets.filter((packet) => !["Signed", "Completed"].includes(packet.status)).length],
    ["Waiting for Payment", clients.filter((client) => client.lifecycleStage === "Payment Required").length],
    ["Active Clients", clients.filter((client) => client.status === "Active").length],
    ["Projects In Progress", store.projects.filter((project) => project.status === "Project In Progress").length],
    ["Completed Projects", store.projects.filter((project) => project.status === "Project Completed").length],
    ["Outstanding Invoices", money(store.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0))],
    ["Upcoming Appointments", store.appointments.filter((appointment) => appointment.date >= today()).length]
  ];
  target.innerHTML = metrics.map(([label, value]) => `
    <article>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </article>
  `).join("");
}

function renderLifecycleOs() {
  renderExecutiveLifecycleMetrics();
  const target = document.querySelector("[data-lifecycle-stage-grid]");
  if (!target) return;
  const stages = store.lifecycleStages.filter((stage) => stage.active !== false);
  target.innerHTML = stages.map((stage, index) => {
    const count = store.clients.filter((client) => (client.lifecycleStage || "New Lead") === stage.name).length;
    return `
      <article class="lifecycle-stage-card">
        <div class="stage-order">${index + 1}</div>
        <div>
          <input data-lifecycle-edit="${index}" data-field="name" value="${escapeHtml(stage.name)}">
          <p>${count} client${count === 1 ? "" : "s"} here</p>
        </div>
        <label>Owner<input data-lifecycle-edit="${index}" data-field="owner" value="${escapeHtml(stage.owner || "")}"></label>
        <label>Required Action<input data-lifecycle-edit="${index}" data-field="requiredAction" value="${escapeHtml(stage.requiredAction || "")}"></label>
        <div class="stage-actions">
          <button type="button" data-lifecycle-move="${index}" data-direction="-1">Move Up</button>
          <button type="button" data-lifecycle-move="${index}" data-direction="1">Move Down</button>
          <button type="button" data-lifecycle-remove="${index}">Archive</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderIntakeBuilder() {
  const formOptions = document.querySelector("[data-intake-form-options]");
  if (formOptions) formOptions.innerHTML = store.intakeForms.map((form) => `<option value="${escapeHtml(form.id)}">${escapeHtml(form.name)}</option>`).join("");
  const grid = document.querySelector("[data-intake-builder-grid]");
  const vault = document.querySelector("[data-intake-response-vault]");
  if (grid) {
    grid.innerHTML = store.intakeForms.map((form) => `
      <article class="builder-card">
        <header>
          <span class="badge">${escapeHtml(form.service)}</span>
          <h3>${escapeHtml(form.name)}</h3>
          <small>${form.required ? "Required" : "Optional"}</small>
        </header>
        <div class="field-stack">
          ${form.fields.map((field) => `
            <div>
              <strong>${escapeHtml(field.label)}</strong>
              <span>${escapeHtml(field.type)}${field.required ? " | required" : ""}</span>
            </div>
          `).join("")}
        </div>
      </article>
    `).join("");
  }
  if (vault) {
    vault.innerHTML = `
      <h3>Searchable Intake Response Vault</h3>
      <div class="response-grid">
        ${store.intakeResponses.map((response) => {
          const form = store.intakeForms.find((item) => item.id === response.formId);
          return `
            <article class="response-card">
              <span class="badge">${escapeHtml(response.status)}</span>
              <h4>${escapeHtml(response.client)} | ${escapeHtml(form?.name || "Intake Form")}</h4>
              <p>${Object.entries(response.responses || {}).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join(" | ")}</p>
            </article>
          `;
        }).join("") || "<p>No intake responses yet.</p>"}
      </div>
    `;
  }
}

function renderTemplateLibrary() {
  const templateOptions = document.querySelector("[data-template-options]");
  if (templateOptions) templateOptions.innerHTML = store.documentTemplates.filter((template) => template.status !== "Archived").map((template) => `<option value="${escapeHtml(template.id)}">${escapeHtml(template.name)}</option>`).join("");
  const grid = document.querySelector("[data-template-library-grid]");
  if (!grid) return;
  grid.innerHTML = store.documentTemplates.map((template) => `
    <article class="template-card ${template.status === "Archived" ? "muted-card" : ""}">
      <span class="status-dot ${escapeHtml(template.status.toLowerCase())}">${escapeHtml(template.status)}</span>
      <h3>${escapeHtml(template.name)}</h3>
      <p>${escapeHtml(template.type)} | ${escapeHtml(template.service)} | v${escapeHtml(template.version || "1.0")}</p>
      <div class="stage-actions">
        <button type="button" data-template-generate="${escapeHtml(template.id)}">Generate Client Doc</button>
        <button type="button" data-template-archive="${escapeHtml(template.id)}">${template.status === "Archived" ? "Restore" : "Archive"}</button>
      </div>
    </article>
  `).join("");
}

function renderSignatures() {
  const grid = document.querySelector("[data-signature-grid]");
  if (!grid) return;
  const statuses = ["Pending", "Viewed", "Signed", "Declined", "Expired", "Needs Revision", "Completed"];
  grid.innerHTML = store.signaturePackets.map((packet, index) => `
    <article class="signature-card">
      <span class="status-dot ${escapeHtml(packet.status.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(packet.status)}</span>
      <h3>${escapeHtml(packet.client)}</h3>
      <p>${escapeHtml(templateName(packet.templateId))} | ${escapeHtml(packet.provider)}</p>
      <label>Status<select data-signature-status="${index}">${statuses.map((status) => `<option${status === packet.status ? " selected" : ""}>${escapeHtml(status)}</option>`).join("")}</select></label>
      <dl>
        <div><dt>Sent</dt><dd>${escapeHtml(packet.sentAt || "Not sent")}</dd></div>
        <div><dt>Signed</dt><dd>${escapeHtml(packet.signedAt || "Pending")}</dd></div>
        <div><dt>Verification</dt><dd>${escapeHtml(packet.verification || "Provider pending")}</dd></div>
      </dl>
      <p>${escapeHtml(packet.audit || "No provider audit entry yet.")}</p>
    </article>
  `).join("");
}

function renderOnboarding() {
  const select = document.querySelector("[data-onboarding-client]");
  const checklistTarget = document.querySelector("[data-onboarding-checklist]");
  if (!select || !checklistTarget) return;
  const selected = select.value || store.clients[0]?.clientName;
  select.innerHTML = store.clients.map((client) => `<option${client.clientName === selected ? " selected" : ""}>${escapeHtml(client.clientName)}</option>`).join("");
  const client = clientRecord(select.value || selected);
  const status = onboardingStatus(client);
  document.querySelector("[data-onboarding-percent]").textContent = `${status.percent}%`;
  document.querySelector("[data-onboarding-progress]").style.width = `${status.percent}%`;
  document.querySelector("[data-onboarding-next]").textContent = status.next;
  checklistTarget.innerHTML = status.checklist.map((item) => `
    <article class="checklist-card ${item.complete ? "complete" : ""}">
      <strong>${item.complete ? "Complete" : "Open"}</strong>
      <h3>${escapeHtml(item.label)}</h3>
      <p>${escapeHtml(item.complete ? "Requirement satisfied." : item.next)}</p>
    </article>
  `).join("");
}

function renderProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;
  grid.innerHTML = store.projects.map((project) => `
    <article class="project-card">
      <span class="badge">${escapeHtml(project.status)}</span>
      <h3>${escapeHtml(project.name)}</h3>
      <p>${escapeHtml(project.client)} | ${escapeHtml(project.consultant || "Unassigned")}</p>
      <div class="progress-track"><i style="width:${Math.min(100, Number(project.progress || 0))}%"></i></div>
      <dl>
        <div><dt>Workspace</dt><dd>${escapeHtml(project.workspace || "Pending")}</dd></div>
        <div><dt>Next Milestone</dt><dd>${escapeHtml(project.nextMilestone || "Set milestone")}</dd></div>
        <div><dt>Created</dt><dd>${escapeHtml(project.createdAt || today())}</dd></div>
      </dl>
    </article>
  `).join("");
}

function renderAdminConfig() {
  const form = document.querySelector("[data-admin-config-form]");
  if (!form) return;
  const config = store.onboardingConfig;
  if (document.activeElement && form.contains(document.activeElement)) return;
  form.notificationRecipients.value = config.notificationRecipients.join(", ");
  form.requiredDocuments.value = config.requiredDocuments.join(", ");
  form.requiredForms.value = config.requiredForms.join(", ");
  form.reminderSchedule.value = config.reminderSchedule.join(", ");
  form.paymentRequiresSignedDocs.value = String(config.paymentRequiresSignedDocs);
  form.welcomeEmail.value = config.welcomeEmail || "";
  form.paymentReminderEmail.value = config.paymentReminderEmail || "";
}

function renderIntelligence() {
  const clients = store.clients;
  const tasks = store.tasks;
  const opportunities = store.opportunities;
  const invoices = store.invoices;
  const weightedForecast = opportunities.reduce((sum, opportunity) => sum + (Number(opportunity.value || 0) * stageWeight(opportunity.stage)), 0);
  const riskyClients = clients.filter((client) => clientRisk(client) !== "Healthy").length;
  const healthScore = clients.length ? Math.max(0, Math.round(((clients.length - riskyClients) / clients.length) * 100)) : 0;
  const collectionRisk = invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  const nextActions = [
    ...tasks.filter((task) => task.status !== "Done" && (task.priority === "High" || (task.dueDate && task.dueDate <= today()))),
    ...clients.filter((client) => clientRisk(client) !== "Healthy"),
    ...opportunities.filter((opportunity) => ["Proposal", "Negotiation"].includes(opportunity.stage)),
    ...invoices.filter((invoice) => ["Sent", "Overdue"].includes(invoice.status))
  ].length;

  document.querySelector("[data-weighted-forecast]").textContent = money(weightedForecast);
  document.querySelector("[data-health-score]").textContent = `${healthScore}%`;
  document.querySelector("[data-collection-risk]").textContent = money(collectionRisk);
  document.querySelector("[data-next-action-count]").textContent = nextActions;

  const topDeals = opportunities
    .filter((opportunity) => !["Won", "Lost"].includes(opportunity.stage))
    .sort((a, b) => Number(b.value || 0) - Number(a.value || 0))
    .slice(0, 3);
  const successItems = clients
    .map((client) => ({ client, risk: clientRisk(client) }))
    .sort((a, b) => (a.risk === "High" ? -1 : b.risk === "High" ? 1 : a.risk.localeCompare(b.risk)))
    .slice(0, 3);
  const accountingItems = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .sort((a, b) => String(a.dueDate || "9999").localeCompare(String(b.dueDate || "9999")))
    .slice(0, 3);

  document.querySelector("[data-sales-motion]").innerHTML = topDeals.map((deal) => `
    <p><strong>${escapeHtml(deal.name)}</strong><br>${money(deal.value)} | ${escapeHtml(deal.stage)} | Forecast ${money(Number(deal.value || 0) * stageWeight(deal.stage))}</p>
  `).join("") || "<p>No open sales motion.</p>";

  document.querySelector("[data-client-success-motion]").innerHTML = successItems.map(({ client, risk }) => `
    <p><strong>${escapeHtml(client.clientName)}</strong><br>${escapeHtml(risk)} | ${escapeHtml(client.currentPhase)} | ${escapeHtml(client.nextAction || "Set next action")}</p>
  `).join("") || "<p>Client health is clean.</p>";

  document.querySelector("[data-accounting-motion]").innerHTML = accountingItems.map((invoice) => `
    <p><strong>${escapeHtml(invoice.invoiceNumber)}</strong><br>${escapeHtml(invoice.client)} | ${money(invoiceTotal(invoice))} | Due ${escapeHtml(invoice.dueDate || "not set")}</p>
  `).join("") || "<p>No open accounting motion.</p>";
}

function renderClients() {
  const clients = filteredClients();
  clientTable.innerHTML = clients.length ? clients.map((client) => `
    <tr>
      <td><strong>${escapeHtml(client.clientName)}</strong></td>
      <td>${escapeHtml(client.businessType)}</td>
      <td><span class="badge">${escapeHtml(client.currentPhase)}</span></td>
      <td>${escapeHtml(client.status)}</td>
      <td>${money(client.monthlyRevenue)}</td>
      <td>${money(client.monthlyProfit)}</td>
      <td>${escapeHtml(client.biggestProblem)}</td>
      <td>${escapeHtml(client.currentProject)}</td>
      <td>${escapeHtml(client.nextAction)}</td>
      <td>${escapeHtml(client.lastContact)}</td>
      <td>${client.googleDriveLink ? `<a href="${escapeHtml(client.googleDriveLink)}" target="_blank" rel="noreferrer">Open</a>` : ""}</td>
    </tr>
  `).join("") : `<tr><td colspan="11" class="empty-table-cell">No clients added yet.</td></tr>`;

  document.querySelector(".table-wrap").hidden = clientView.value === "phase";
  phaseBoard.hidden = clientView.value !== "phase";
  renderPhaseBoard(clients);
}

function renderPhaseBoard(clients) {
  const phases = ["Foundation", "Financial Organization", "Operations", "Growth", "Scale"];
  phaseBoard.innerHTML = phases.map((phase) => {
    const cards = clients.filter((client) => client.currentPhase === phase).map((client) => `
      <div class="mini-card draggable-client" draggable="true" data-client-name="${escapeHtml(client.clientName)}">
        <strong>${escapeHtml(client.clientName)}</strong>
        <span>${escapeHtml(client.status)}</span>
        <span>${escapeHtml(client.nextAction || "No next action set")}</span>
      </div>
    `).join("");
    return `
      <section class="phase-column">
        <h3>${phase}</h3>
        <div class="phase-dropzone" data-phase="${escapeHtml(phase)}">
          ${cards || `<p class="empty-phase">Drop clients here</p>`}
        </div>
      </section>
    `;
  }).join("");
  bindPhaseDragEvents();
}

function renderSelectors() {
  document.querySelectorAll("[data-client-options], [data-client-options-opportunities], [data-client-options-contacts], [data-client-options-activity], [data-client-options-kpis], [data-client-options-invoices], [data-client-options-revenue], [data-client-options-signatures], [data-client-options-projects]").forEach((select) => {
    const selectedValue = select.value;
    select.innerHTML = clientOptions();
    if (selectedValue) select.value = selectedValue;
  });
  if (packageSelect) {
    const selectedPackage = packageSelect.value || "Growth Roadmap";
    packageSelect.innerHTML = servicePackages().map((item) => `<option>${escapeHtml(item.name)}</option>`).join("");
    packageSelect.value = selectedPackage;
  }
  if (maintenanceSelect) {
    const selectedMaintenance = maintenanceSelect.value || "Growth Support";
    maintenanceSelect.innerHTML = maintenancePlans().map((item) => `<option>${escapeHtml(item.name)}</option>`).join("");
    maintenanceSelect.value = selectedMaintenance;
  }
  if (assessmentClient) {
    const selectedClient = assessmentClient.value;
    assessmentClient.innerHTML = store.clients.length ? store.clients.map((client, index) => `<option value="${index}">${escapeHtml(client.clientName)}</option>`).join("") : `<option value="">No clients added yet</option>`;
    if (selectedClient) assessmentClient.value = selectedClient;
  }
}

function bindPhaseDragEvents() {
  phaseBoard.querySelectorAll(".draggable-client").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.clientName);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });

  phaseBoard.querySelectorAll(".phase-dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      const clientName = event.dataTransfer.getData("text/plain");
      const targetPhase = zone.dataset.phase;
      zone.classList.remove("drag-over");
      moveClientToPhase(clientName, targetPhase);
    });
  });
}

function moveClientToPhase(clientName, targetPhase) {
  let changed = false;
  store.clients = store.clients.map((client) => {
    if (client.clientName !== clientName || client.currentPhase === targetPhase) return client;
    changed = true;
    return { ...client, currentPhase: targetPhase, lastContact: today(), nextAction: client.nextAction || `Review ${targetPhase} phase plan` };
  });
  if (!changed) return;
  store.activities = [{
    client: clientName,
    type: "Phase Update",
    date: today(),
    summary: `${clientName} moved to ${targetPhase}.`,
    nextStep: `Confirm next ${targetPhase} milestone.`
  }, ...store.activities];
  showToast(`${clientName} moved to ${targetPhase}.`);
  renderAll();
}

function renderPipeline() {
  const stages = ["New Lead", "Discovery", "Proposal", "Negotiation", "Won", "Lost"];
  pipelineBoard.innerHTML = stages.map((stage) => {
    const items = store.opportunities.filter((opportunity) => opportunity.stage === stage);
    const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0);
    const cards = items.map((item) => `
      <div class="mini-card draggable-opportunity" draggable="true" data-opportunity-name="${escapeHtml(item.name)}">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.client)}</span>
        <span>${money(item.value)} | ${escapeHtml(item.closeDate || "No close date")}</span>
      </div>
    `).join("");
    return `<section class="pipeline-column" data-pipeline-stage="${escapeHtml(stage)}"><h3>${stage}</h3><span class="badge">${money(total)}</span>${cards || `<p class="empty-phase">Drop deals here</p>`}</section>`;
  }).join("");
  bindPipelineDragEvents();
}

function renderTasks() {
  const statuses = ["Not Started", "In Progress", "Waiting", "Done"];
  taskBoard.innerHTML = statuses.map((status) => {
    const cards = store.tasks.map((task, index) => ({ ...task, index })).filter((task) => task.status === status).map((task) => `
      <div class="mini-card draggable-task" draggable="true" data-task-index="${task.index}">
        <strong>${escapeHtml(task.task)}</strong>
        <span>${escapeHtml(task.client)}</span>
        <span>${escapeHtml(task.priority)} priority | ${escapeHtml(task.category)} | ${escapeHtml(task.cadence || "One-Time")}</span>
        <span>${escapeHtml(task.dueDate || "No due date")}</span>
      </div>
    `).join("");
    return `<section class="kanban-column" data-task-status="${escapeHtml(status)}"><h3>${status}</h3>${cards || `<p class="empty-phase">Drop tasks here</p>`}</section>`;
  }).join("");
  bindTaskDragEvents();
  renderTaskMetrics();
  renderCadenceBoard();
  renderCommandCenter();
}

function bindPipelineDragEvents() {
  if (!pipelineBoard) return;
  pipelineBoard.querySelectorAll(".draggable-opportunity").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.opportunityName);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });

  pipelineBoard.querySelectorAll("[data-pipeline-stage]").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      moveOpportunityToStage(event.dataTransfer.getData("text/plain"), column.dataset.pipelineStage);
    });
  });
}

function moveOpportunityToStage(name, stage) {
  let movedDeal;
  store.opportunities = store.opportunities.map((opportunity) => {
    if (opportunity.name !== name || opportunity.stage === stage) return opportunity;
    movedDeal = opportunity;
    return { ...opportunity, stage };
  });
  if (!movedDeal) return;
  store.activities = [{
    client: movedDeal.client,
    type: "Pipeline",
    date: today(),
    summary: `${movedDeal.name} moved to ${stage}.`,
    nextStep: stage === "Won" ? "Create onboarding and invoice workflow." : "Confirm next sales step."
  }, ...store.activities];
  showToast(`${movedDeal.name} moved to ${stage}.`);
  renderAll();
}

function bindTaskDragEvents() {
  if (!taskBoard) return;
  taskBoard.querySelectorAll(".draggable-task").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.taskIndex);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });

  taskBoard.querySelectorAll("[data-task-status]").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      moveTaskToStatus(Number(event.dataTransfer.getData("text/plain")), column.dataset.taskStatus);
    });
  });
}

function moveTaskToStatus(index, status) {
  const tasks = store.tasks;
  if (!tasks[index] || tasks[index].status === status) return;
  const task = tasks[index];
  tasks[index] = { ...task, status };
  store.tasks = tasks;
  store.activities = [{
    client: task.client,
    type: "Task",
    date: today(),
    summary: `${task.task} moved to ${status}.`,
    nextStep: status === "Done" ? "Confirm outcome and update client notes." : "Keep task moving."
  }, ...store.activities];
  showToast(`${task.task} moved to ${status}.`);
  renderAll();
}

function renderTaskMetrics() {
  const openTasks = store.tasks.filter((task) => task.status !== "Done");
  const countCadence = (cadence) => openTasks.filter((task) => (task.cadence || "One-Time") === cadence).length;
  document.querySelector("[data-cadence-daily]").textContent = countCadence("Daily");
  document.querySelector("[data-cadence-weekly]").textContent = countCadence("Weekly");
  document.querySelector("[data-cadence-monthly]").textContent = countCadence("Monthly");
  document.querySelector("[data-cadence-onetime]").textContent = countCadence("One-Time");
}

function renderCadenceBoard() {
  const board = document.querySelector("[data-cadence-board]");
  if (!board) return;
  const cadences = ["Daily", "Weekly", "Monthly", "One-Time"];
  board.innerHTML = cadences.map((cadence) => {
    const items = store.tasks.filter((task) => task.status !== "Done" && (task.cadence || "One-Time") === cadence);
    const cards = items.map((task) => `
      <div class="mini-card ${task.dueDate && task.dueDate < today() ? "is-overdue" : ""}">
        <strong>${escapeHtml(task.task)}</strong>
        <span>${escapeHtml(task.client)}</span>
        <span>${escapeHtml(task.priority)} priority | Due ${escapeHtml(task.dueDate || "not set")}</span>
      </div>
    `).join("");
    return `<section class="cadence-column"><h3>${cadence}</h3>${cards || `<p class="empty-phase">No open ${cadence.toLowerCase()} work.</p>`}</section>`;
  }).join("");
}

function renderCommandCenter() {
  const priorityTarget = document.querySelector("[data-priority-today]");
  const riskTarget = document.querySelector("[data-risk-watch]");
  const revenueTarget = document.querySelector("[data-revenue-watch]");
  if (!priorityTarget || !riskTarget || !revenueTarget) return;

  const priorityTasks = store.tasks
    .filter((task) => task.status !== "Done")
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3) || String(a.dueDate || "9999").localeCompare(String(b.dueDate || "9999"));
    })
    .slice(0, 5);

  const riskClients = store.clients
    .map((client) => ({ ...client, risk: clientRisk(client) }))
    .filter((client) => client.risk !== "Healthy")
    .slice(0, 5);

  const openRevenue = store.opportunities
    .filter((opportunity) => !["Won", "Lost"].includes(opportunity.stage))
    .sort((a, b) => Number(b.value || 0) - Number(a.value || 0))
    .slice(0, 5);

  priorityTarget.innerHTML = priorityTasks.map((task) => `<p><strong>${escapeHtml(task.task)}</strong><br>${escapeHtml(task.client)} | ${escapeHtml(task.priority)} | ${escapeHtml(task.dueDate || "No due date")}</p>`).join("") || "<p>No open priority work.</p>";
  riskTarget.innerHTML = riskClients.map((client) => `<p><strong>${escapeHtml(client.clientName)}</strong><br>${escapeHtml(client.risk)} risk | Next: ${escapeHtml(client.nextAction || "Set next action")}</p>`).join("") || "<p>No risk flags.</p>";
  revenueTarget.innerHTML = openRevenue.map((opportunity) => `<p><strong>${escapeHtml(opportunity.name)}</strong><br>${money(opportunity.value)} | ${escapeHtml(opportunity.stage)}</p>`).join("") || "<p>No open opportunities.</p>";
}

function renderRevenueBuilder() {
  const preview = document.querySelector("[data-package-preview]");
  const output = document.querySelector("[data-revenue-builder-output]");
  const plays = document.querySelector("[data-revenue-plays]");
  if (!preview || !output || !plays) return;

  const selectedPackage = servicePackages().find((item) => item.name === packageSelect?.value) || servicePackages()[2];
  const selectedMaintenance = maintenancePlans().find((item) => item.name === maintenanceSelect?.value) || maintenancePlans()[2];
  const clientName = document.querySelector("[data-client-options-revenue]")?.value;
  const client = store.clients.find((item) => item.clientName === clientName) || store.clients[0];
  const recommended = servicePackages().find((item) => item.name === packageForClient(client)) || selectedPackage;

  preview.innerHTML = `
    <span class="badge">${escapeHtml(selectedPackage.cadence)}</span>
    <h3>${escapeHtml(selectedPackage.name)}</h3>
    <strong>${money(selectedPackage.value)}</strong>
    <p>${escapeHtml(selectedPackage.fit)}</p>
    <ul>${selectedPackage.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
    <div class="revenue-meta">
      <span>Suggested deposit</span><strong>${money(selectedPackage.deposit)}</strong>
      <span>Ongoing option</span><strong>${escapeHtml(selectedMaintenance.name)} ${selectedMaintenance.value ? `/ ${money(selectedMaintenance.value)} monthly` : ""}</strong>
    </div>
  `;

  plays.innerHTML = [
    [`Recommended for ${client?.clientName || "selected client"}`, `${recommended.name} based on ${client?.currentPhase || "current"} phase.`],
    ["Fastest close path", "Create proposal, schedule review, collect deposit, then convert to active client plan."],
    ["Backend-ready flow", "Opportunity, task, invoice draft, and activity history are all created from this one action."]
  ].map(([label, detail]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(detail)}</p>`).join("");

  output.innerHTML = store.revenuePlans.slice().reverse().map((plan) => `
    <article class="revenue-plan-card">
      <div>
        <span class="badge">${escapeHtml(plan.status || "Draft")}</span>
        <h3>${escapeHtml(plan.client)} | ${escapeHtml(plan.packageName)}</h3>
        <p>${escapeHtml(plan.maintenanceName || "No ongoing support")} | Owner: ${escapeHtml(plan.owner || "Unassigned")}</p>
      </div>
      <dl>
        <div><dt>Project Value</dt><dd>${money(plan.estimatedValue)}</dd></div>
        <div><dt>Upfront</dt><dd>${money(plan.upfrontPayment)}</dd></div>
        <div><dt>Created</dt><dd>${escapeHtml(plan.createdAt || today())}</dd></div>
      </dl>
      <p><strong>Next:</strong> ${escapeHtml(plan.nextStep || "Schedule proposal review.")}</p>
    </article>
  `).join("") || "<p>No revenue plans yet.</p>";
}

function renderClientJourney() {
  const target = document.querySelector("[data-client-journey-grid]");
  if (!target) return;
  if (!store.clients.length) {
    target.innerHTML = `<p class="muted-card">No clients added yet.</p>`;
    return;
  }
  const phases = ["Foundation", "Financial Organization", "Operations", "Growth", "Scale"];
  const statuses = ["Lead", "Active", "Paused", "Completed"];
  target.innerHTML = store.clients.map((client, index) => {
    const openTasks = store.tasks.filter((task) => task.client === client.clientName && task.status !== "Done").length;
    const openInvoices = store.invoices.filter((invoice) => invoice.client === client.clientName && invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
    const risk = clientRisk(client);
    return `
      <article class="journey-card ${risk.toLowerCase()}">
        <header>
          <div>
            <span class="badge">${escapeHtml(risk)}</span>
            <h3>${escapeHtml(client.clientName)}</h3>
            <p>${escapeHtml(client.businessType || "Business")} | ${escapeHtml(client.currentProject || "No current project")}</p>
          </div>
          <strong>${escapeHtml(packageForClient(client))}</strong>
        </header>
        <div class="journey-controls">
          <label>Phase<select data-client-phase-index="${index}">${phases.map((phase) => `<option ${phase === client.currentPhase ? "selected" : ""}>${escapeHtml(phase)}</option>`).join("")}</select></label>
          <label>Status<select data-client-status-index="${index}">${statuses.map((status) => `<option ${status === client.status ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}</select></label>
          <label>Next Action<input data-client-next-index="${index}" value="${escapeHtml(client.nextAction || "")}" placeholder="Set next action"></label>
        </div>
        <dl>
          <div><dt>Open Work</dt><dd>${openTasks} tasks</dd></div>
          <div><dt>Open AR</dt><dd>${money(openInvoices)}</dd></div>
          <div><dt>Last Contact</dt><dd>${escapeHtml(client.lastContact || "Not set")}</dd></div>
        </dl>
      </article>
    `;
  }).join("");
}

function renderWorkbench() {
  if (!workbenchNotes) return;
  const workbench = store.workbench;
  if (document.activeElement !== workbenchNotes) workbenchNotes.value = workbench.notes || "";
  const target = document.querySelector("[data-workbench-prompts]");
  if (!target) return;
  target.innerHTML = [
    "What client is closest to a paid proposal this week?",
    "Which active client has no next action?",
    "What invoice needs follow-up before month-end?",
    "What one SOP would remove the most owner bottleneck?",
    "What should Aida and Michael review in the next leadership meeting?"
  ].map((prompt) => `<p>${escapeHtml(prompt)}</p>`).join("");
}

function renderContacts() {
  const query = globalSearch.value.toLowerCase();
  const contacts = store.contacts.filter((contact) => Object.values(contact).join(" ").toLowerCase().includes(query));
  contactsGrid.innerHTML = contacts.length ? contacts.map((contact) => `
    <article class="contact-card">
      <h3>${escapeHtml(contact.name)}</h3>
      <p>${escapeHtml(contact.role || "No role")}<br>${escapeHtml(contact.client)}<br>${escapeHtml(contact.type)}</p>
      <p>${escapeHtml(contact.email || "No email")}<br>${escapeHtml(contact.phone || "No phone")}</p>
    </article>
  `).join("") : `<p class="muted-card">No contacts added yet.</p>`;
}

function renderKpis() {
  const query = globalSearch.value.toLowerCase();
  const kpis = store.kpis.filter((kpi) => Object.values(kpi).join(" ").toLowerCase().includes(query));
  if (!kpis.length) {
    kpiGrid.innerHTML = `<p class="muted-card">No KPIs added yet.</p>`;
    return;
  }
  kpiGrid.innerHTML = kpis.map((kpi) => {
    const statusClass = kpi.status.toLowerCase().replaceAll(" ", "-");
    return `
      <article class="kpi-card">
        <div>
          <span class="kpi-status ${statusClass}">${escapeHtml(kpi.status)}</span>
          <h3>${escapeHtml(kpi.metric)}</h3>
          <p>${escapeHtml(kpi.client)} | Owner: ${escapeHtml(kpi.owner || "Unassigned")}</p>
        </div>
        <dl>
          <div><dt>Target</dt><dd>${escapeHtml(kpi.target || "Not set")}</dd></div>
          <div><dt>Current</dt><dd>${escapeHtml(kpi.current || "No update")}</dd></div>
        </dl>
      </article>
    `;
  }).join("");
}

function renderInvoices() {
  if (!invoiceList) return;
  const invoices = store.invoices;
  const totalByStatus = (status) => invoices.filter((invoice) => invoice.status === status).reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  document.querySelector("[data-invoice-draft]").textContent = money(totalByStatus("Draft"));
  document.querySelector("[data-invoice-sent]").textContent = money(totalByStatus("Sent"));
  document.querySelector("[data-invoice-paid]").textContent = money(totalByStatus("Paid"));
  document.querySelector("[data-invoice-overdue]").textContent = money(totalByStatus("Overdue"));
  renderAccountingOps();

  if (!invoices.length) {
    invoiceList.innerHTML = `<p class="muted-card">No invoices created yet.</p>`;
    return;
  }
  invoiceList.innerHTML = invoices.slice().reverse().map((invoice) => {
    const total = invoiceTotal(invoice);
    return `
      <article class="invoice-card">
        <div>
          <span class="badge">${escapeHtml(invoice.status)}</span>
          <h3>${escapeHtml(invoice.invoiceNumber)} | ${escapeHtml(invoice.client)}</h3>
          <p>${escapeHtml(invoice.service)}</p>
        </div>
        <dl>
          <div><dt>Billable Hours</dt><dd>${Number(invoice.hours || 0).toFixed(2)}</dd></div>
          <div><dt>Rate</dt><dd>${money(invoice.rate)}</dd></div>
          <div><dt>Flat Fee</dt><dd>${money(invoice.flatFee)}</dd></div>
          <div><dt>Invoice Date</dt><dd>${escapeHtml(invoice.invoiceDate || "Not set")}</dd></div>
          <div><dt>Due Date</dt><dd>${escapeHtml(invoice.dueDate || "Not set")}</dd></div>
        </dl>
        <strong class="invoice-total">${money(total)}</strong>
      </article>
    `;
  }).join("");
}

const automationChannels = ["Email", "CRM Task", "Portal Notice", "Invoice Reminder"];
const automationStatuses = ["Ready", "Live", "Planned", "Needs Backend", "Paused", "Needs Review"];
let automationDragIndex = null;

function optionMarkup(options, selected) {
  return options.map((option) => `<option${option === selected ? " selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function updateAutomation(index, field, value) {
  const automations = store.automations;
  const automation = automations[index];
  if (!automation || automation[field] === value) return;
  automation[field] = value;
  automations[index] = automation;
  store.automations = automations;
  store.auditEvents = [{
    date: today(),
    user: "Admin",
    action: `${automation.workflow || "Automation"} ${field} updated`,
    area: "Automation"
  }, ...store.auditEvents];
  showToast("Automation control saved.");
  renderAll();
}

function bindAutomationDragEvents() {
  const grid = document.querySelector("[data-automation-grid]");
  if (!grid) return;

  grid.querySelectorAll("[data-automation-card]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      automationDragIndex = Number(card.dataset.automationCard);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => {
      automationDragIndex = null;
      card.classList.remove("is-dragging");
    });
    card.addEventListener("dragover", (event) => event.preventDefault());
    card.addEventListener("drop", (event) => {
      event.preventDefault();
      const targetIndex = Number(card.dataset.automationCard);
      if (automationDragIndex === null || automationDragIndex === targetIndex) return;
      const automations = [...store.automations];
      const [moved] = automations.splice(automationDragIndex, 1);
      automations.splice(targetIndex, 0, moved);
      store.automations = automations;
      showToast("Automation priority reordered.");
      renderAutomations();
    });
  });
}

function renderAutomations() {
  const grid = document.querySelector("[data-automation-grid]");
  const queue = document.querySelector("[data-email-queue]");
  if (!grid || !queue) return;
  grid.innerHTML = store.automations.map((automation, index) => `
    <article class="system-card workflow-card" draggable="true" data-automation-card="${index}">
      <span class="status-dot ${escapeHtml((automation.status || "Ready").toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(automation.status || "Ready")}</span>
      <div class="workflow-edit-grid">
        <label>Workflow
          <input data-automation-index="${index}" data-automation-field="workflow" value="${escapeHtml(automation.workflow || "")}" placeholder="Workflow name">
        </label>
        <label>Trigger
          <input data-automation-index="${index}" data-automation-field="trigger" value="${escapeHtml(automation.trigger || "")}" placeholder="Trigger">
        </label>
        <label>Owner
          <input data-automation-index="${index}" data-automation-field="owner" value="${escapeHtml(automation.owner || "")}" placeholder="Owner">
        </label>
        <label>Channel
          <select data-automation-index="${index}" data-automation-field="channel">${optionMarkup(automationChannels, automation.channel || "CRM Task")}</select>
        </label>
        <label>Status
          <select data-automation-index="${index}" data-automation-field="status">${optionMarkup(automationStatuses, automation.status || "Ready")}</select>
        </label>
      </div>
      <p class="workflow-control-note">Drag this card to change priority. Edit, pause, or reroute before production hookup.</p>
    </article>
  `).join("");
  bindAutomationDragEvents();

  const openInvoices = store.invoices.filter((invoice) => invoice.status !== "Paid");
  const dueTasks = store.tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate <= today());
  const queueItems = [
    { to: "Aida + Michael", subject: "New consultation request", source: "Schedule Consultation form" },
    { to: "Michael", subject: "Future investor intake received", source: "Future Investors form" },
    ...openInvoices.slice(0, 2).map((invoice) => ({ to: invoice.client, subject: `${invoice.invoiceNumber} payment reminder`, source: "Accounting" })),
    ...dueTasks.slice(0, 2).map((task) => ({ to: task.client, subject: `Task follow-up: ${task.task}`, source: "Tasks" }))
  ];
  queue.innerHTML = queueItems.map((item) => `
    <p><strong>${escapeHtml(item.subject)}</strong><br>To: ${escapeHtml(item.to)} | Source: ${escapeHtml(item.source)}</p>
  `).join("");
}

function renderNotificationHistory() {
  const panel = document.querySelector("[data-notification-history]");
  if (!panel) return;
  const rows = store.notificationHistory.slice().sort((a, b) => String(b.timestamp || "").localeCompare(String(a.timestamp || ""))).slice(0, 18);
  if (!rows.length) {
    panel.innerHTML = `<p class="muted-card">No notifications sent yet.</p>`;
    return;
  }
  panel.innerHTML = rows.map((item) => `
    <article class="notification-row">
      <span class="status-dot ${escapeHtml(String(item.status || "Queued").toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(item.status || "Queued")}</span>
      <div>
        <strong>${escapeHtml(item.eventType || "notification")}</strong>
        <p>${escapeHtml(item.client || "Unknown client")} | ${escapeHtml(item.appointmentDate || "")} ${escapeHtml(item.appointmentTime || "")}</p>
      </div>
      <div>
        <strong>${escapeHtml(item.recipient || "No recipient")}</strong>
        <p>${escapeHtml(item.detail || item.source || "Notification event")}</p>
      </div>
      <div>
        <strong>${escapeHtml(item.attempts || 0)} attempts</strong>
        <p>${escapeHtml(formatDateTime(item.timestamp || today()))}</p>
      </div>
    </article>
  `).join("");
}

function renderSecurity() {
  const grid = document.querySelector("[data-security-grid]");
  const audit = document.querySelector("[data-security-audit]");
  if (!grid || !audit) return;
  grid.innerHTML = [...crmReadinessChecks(), ...securityChecks()].map((check) => `
    <article class="system-card">
      <span class="status-dot ${escapeHtml(check.status.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(check.status)}</span>
      <h3>${escapeHtml(check.name)}</h3>
      <p>${escapeHtml(check.detail)}</p>
    </article>
  `).join("");
  audit.innerHTML = store.auditEvents.length ? store.auditEvents.slice().reverse().map((event) => `
    <p><strong>${escapeHtml(event.area)}</strong> | ${escapeHtml(event.action)}<br>${escapeHtml(event.user)} | ${escapeHtml(event.date)}</p>
  `).join("") : `<p>No audit events recorded yet.</p>`;
}

function renderIntegrations() {
  const grid = document.querySelector("[data-integration-grid]");
  if (!grid) return;
  grid.innerHTML = store.integrations.map((integration) => `
    <article class="system-card integration-card">
      <span class="status-dot ${escapeHtml(integration.status.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(integration.status)}</span>
      <h3>${escapeHtml(integration.name)}</h3>
      <p><strong>${escapeHtml(integration.category)}</strong></p>
      <p>${escapeHtml(integration.detail)}</p>
    </article>
  `).join("");
}

function renderProductionModules() {
  const grid = document.querySelector("[data-production-grid]");
  const score = document.querySelector("[data-production-score]");
  const roadmap = document.querySelector("[data-production-roadmap]");
  if (!grid || !score || !roadmap) return;
  const modules = productionModules();
  const ready = modules.filter((module) => ["Ready", "Live", "Active"].includes(module.status)).length;
  score.textContent = `${ready}/${modules.length}`;
  grid.innerHTML = modules.map((module) => `
    <article class="production-card">
      <header>
        <span class="status-dot ${escapeHtml(module.status.toLowerCase())}">${escapeHtml(module.status)}</span>
        <small>${escapeHtml(module.phase)}</small>
      </header>
      <h3>${escapeHtml(module.title)}</h3>
      <p>${escapeHtml(module.detail)}</p>
      <div class="production-meta">
        <span>Owner</span>
        <strong>${escapeHtml(module.owner)}</strong>
      </div>
      <div class="production-next">
        <span>Next backend step</span>
        <p>${escapeHtml(module.nextStep)}</p>
      </div>
    </article>
  `).join("");

  roadmap.innerHTML = [
    ["1", "Authenticate", "Turn on Entra ID login and role claims."],
    ["2", "Connect", "Wire email, DocuSign, payments, QuickBooks, and storage APIs."],
    ["3", "Protect", "Move sensitive data to Azure database/storage with access rules."],
    ["4", "Measure", "Stream GA4, CRM, portal, invoice, and conversion events into reports."]
  ].map(([number, title, detail]) => `
    <article>
      <strong>${escapeHtml(number)}</strong>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(detail)}</p>
    </article>
  `).join("");
}

function renderAccountingOps() {
  const paymentRails = document.querySelector("[data-payment-rails]");
  const accountingSync = document.querySelector("[data-accounting-sync]");
  if (!paymentRails || !accountingSync) return;
  const rails = [
    ["Stripe Checkout", "Cards, Apple Pay, Google Pay, hosted invoices"],
    ["PayPal / Venmo", "PayPal wallet, Venmo, client-friendly payment links"],
    ["Square", "Card payments, in-person payment option, receipts"],
    ["Plaid", "Bank verification and permissioned finance workflows"]
  ];
  paymentRails.innerHTML = rails.map(([label, detail]) => `
    <div class="ops-row">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(detail)}</p>
    </div>
  `).join("") + `<p class="ops-note">Silverback HQ should store provider IDs and payment status only, not raw card or bank credentials.</p>`;

  const sent = store.invoices.filter((invoice) => ["Sent", "Overdue"].includes(invoice.status)).length;
  const paid = store.invoices.filter((invoice) => invoice.status === "Paid").length;
  accountingSync.innerHTML = [
    ["Customer records", `${store.clients.length} CRM clients ready to map`],
    ["Open invoices", `${sent} invoices can sync to QuickBooks receivables`],
    ["Paid invoices", `${paid} payments ready for reconciliation`],
    ["Billable hours", `${store.invoices.reduce((sum, invoice) => sum + Number(invoice.hours || 0), 0).toFixed(2)} tracked hours`]
  ].map(([label, detail]) => `
    <div class="ops-row">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(detail)}</p>
    </div>
  `).join("");
}

function renderDocumentVault() {
  const vault = document.querySelector("[data-document-vault]");
  if (!vault) return;
  vault.innerHTML = documentVaultItems().map((item) => `
    <article class="vault-card">
      <span class="status-dot ${escapeHtml(item.status.toLowerCase())}">${escapeHtml(item.status)}</span>
      <h3>${escapeHtml(item.name)}</h3>
      <p><strong>Access:</strong> ${escapeHtml(item.access)}</p>
      <p><strong>System:</strong> ${escapeHtml(item.system)}</p>
    </article>
  `).join("");
}

function renderActivities() {
  activityTimeline.innerHTML = store.activities.slice().reverse().map((activity) => `
    <article class="activity-item">
      <header><span>${escapeHtml(activity.type)} | ${escapeHtml(activity.client)}</span><span>${escapeHtml(activity.date)}</span></header>
      <p>${escapeHtml(activity.summary)}</p>
      <p><strong>Next:</strong> ${escapeHtml(activity.nextStep || "No next step")}</p>
    </article>
  `).join("");
}

function renderReports() {
  report("[data-status-report]", countBy(store.clients, "status"));
  report("[data-stage-report]", countBy(store.opportunities, "stage"));
  report("[data-category-report]", countBy(store.tasks, "category"));
  renderEnterpriseReport();
  renderAnalyticsReport();
}

function renderEnterpriseReport() {
  const target = document.querySelector("[data-enterprise-report]");
  if (!target) return;
  const rows = [
    ["Backend security", "Ready for Azure Auth / Entra ID"],
    ["Enterprise reporting", "Forecast, pipeline, tasks, client risk, invoices"],
    ["Email automation", `${store.automations.filter((item) => ["Ready", "Live"].includes(item.status)).length} workflows ready`],
    ["Integrations", `${store.integrations.filter((item) => ["Live", "Ready"].includes(item.status)).length} live or ready`],
    ["Permission controls", "Role map defined for production enforcement"],
    ["Production reliability", "Azure hosting, GitHub deployment, export backups"]
  ];
  target.innerHTML = rows.map(([label, value]) => `
    <div class="readiness-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");
}

function renderAnalyticsReport() {
  const target = document.querySelector("[data-analytics-report]");
  if (!target) return;
  const activeClients = store.clients.filter((client) => client.status === "Active").length;
  const leadClients = store.clients.filter((client) => client.status === "Lead").length;
  const openPipeline = store.opportunities.filter((opportunity) => !["Won", "Lost"].includes(opportunity.stage)).length;
  const doneTasks = store.tasks.filter((task) => task.status === "Done").length;
  const taskCompletion = store.tasks.length ? Math.round((doneTasks / store.tasks.length) * 100) : 0;
  const conversion = activeClients + leadClients ? Math.round((activeClients / (activeClients + leadClients)) * 100) : 0;
  const rows = [
    ["Website traffic", "GA4 ready; replace measurement ID to activate live sessions"],
    ["Lead-to-active conversion", `${conversion}% from CRM client status data`],
    ["Open pipeline", `${openPipeline} active opportunities to monitor`],
    ["Task completion", `${taskCompletion}% of tracked tasks marked done`],
    ["Portal engagement", "Ready to stream login, document, invoice, and message events"]
  ];
  target.innerHTML = rows.map(([label, value]) => `
    <div class="readiness-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");
}

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key]] = (acc[row[key]] || 0) + 1;
    return acc;
  }, {});
}

function report(selector, data) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, value]) => value), 1);
  document.querySelector(selector).innerHTML = entries.map(([label, value]) => `
    <div class="report-row">
      <span>${escapeHtml(label)}</span>
      <div class="bar"><span style="width:${(value / max) * 100}%"></span></div>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
    toast.hidden = true;
  }, 3200);
}

function addAuditEvent(user, action, area) {
  store.auditEvents = [{
    date: today(),
    user,
    action,
    area
  }, ...store.auditEvents].slice(0, 60);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeCeoCard(title, lane = "today", priority = "Medium", type = "Operations", source = "Manual") {
  return {
    id: `ceo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    lane,
    priority,
    type,
    source
  };
}

function normalizeCeoBoard(value = store.daily) {
  const board = value.board ? clone(value.board) : null;
  const normalized = board || clone(starterCeoBoard);
  ["today", "week", "month", "done"].forEach((lane) => {
    normalized[lane] = Array.isArray(normalized[lane]) ? normalized[lane] : [];
  });

  if (!value.board) {
    const legacyMap = {
      priorities: "today",
      clients: "week",
      money: "week",
      content: "month",
      done: "done"
    };
    Object.entries(legacyMap).forEach(([key, lane]) => {
      String(value[key] || "").split("\n").map((item) => item.trim()).filter(Boolean).forEach((title) => {
        normalized[lane].push(makeCeoCard(title, lane, key === "priorities" || key === "money" ? "High" : "Medium", key === "money" ? "Money" : "Operations", "Imported"));
      });
    });
    store.daily = { board: normalized };
  }
  return normalized;
}

function ceoSuggestions() {
  const suggestions = [];
  store.tasks
    .filter((task) => task.status !== "Done")
    .filter((task) => task.priority === "High" || (task.dueDate && task.dueDate <= addDays(today(), 3)))
    .slice(0, 4)
    .forEach((task) => {
      suggestions.push(makeCeoCard(`${task.task} (${task.client})`, task.dueDate && task.dueDate <= today() ? "today" : "week", task.priority || "Medium", task.category || "Operations", "Task Intelligence"));
    });

  store.clients
    .filter((client) => client.status === "Active" && clientRisk(client) !== "Healthy")
    .slice(0, 3)
    .forEach((client) => {
      suggestions.push(makeCeoCard(`Check on ${client.clientName}: ${client.nextAction || "set next action"}`, "today", clientRisk(client) === "High" ? "High" : "Medium", "Client", "Risk Intelligence"));
    });

  const openInvoiceTotal = store.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  if (openInvoiceTotal > 0) {
    suggestions.push(makeCeoCard(`Follow up on ${money(openInvoiceTotal)} in open invoices`, "today", "High", "Money", "Accounting Intelligence"));
  }

  store.opportunities
    .filter((opportunity) => ["Proposal", "Negotiation"].includes(opportunity.stage))
    .slice(0, 2)
    .forEach((opportunity) => {
      suggestions.push(makeCeoCard(`Advance ${opportunity.name} toward close`, "week", "High", "Sales", "Pipeline Intelligence"));
    });

  store.kpis
    .filter((kpi) => ["Watch", "Off Track"].includes(kpi.status))
    .slice(0, 3)
    .forEach((kpi) => {
      suggestions.push(makeCeoCard(`Review KPI: ${kpi.metric} for ${kpi.client}`, "week", kpi.status === "Off Track" ? "High" : "Medium", "Leadership", "KPI Intelligence"));
    });

  const seen = new Set();
  return suggestions.filter((suggestion) => {
    const key = suggestion.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);
}

function updateCeoMetrics() {
  const dueToday = store.tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate <= today()).length;
  const revenueFocus = store.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoiceTotal(invoice), 0)
    + store.opportunities.filter((opportunity) => !["Lost", "Won"].includes(opportunity.stage)).reduce((sum, opportunity) => sum + (Number(opportunity.value || 0) * stageWeight(opportunity.stage)), 0);
  const riskFlags = store.clients.filter((client) => clientRisk(client) !== "Healthy").length
    + store.kpis.filter((kpi) => kpi.status === "Off Track").length;
  document.querySelector("[data-ceo-due]").textContent = dueToday;
  document.querySelector("[data-ceo-revenue]").textContent = money(revenueFocus);
  document.querySelector("[data-ceo-risk]").textContent = riskFlags;
}

function renderCeoSuggestions() {
  const target = document.querySelector("[data-ai-suggestions]");
  if (!target) return;
  const currentTitles = Object.values(normalizeCeoBoard()).flat().map((card) => card.title.toLowerCase());
  const suggestions = ceoSuggestions().filter((card) => !currentTitles.includes(card.title.toLowerCase()));
  target.innerHTML = suggestions.length ? suggestions.map((card) => `
    <button type="button" class="ai-suggestion" data-add-ceo-suggestion="${escapeHtml(card.id)}" data-title="${escapeHtml(card.title)}" data-lane="${escapeHtml(card.lane)}" data-priority="${escapeHtml(card.priority)}" data-type="${escapeHtml(card.type)}">
      <span>${escapeHtml(card.type)}</span>
      <strong>${escapeHtml(card.title)}</strong>
    </button>
  `).join("") : `<p class="muted-copy">No urgent gaps detected. The board is clean.</p>`;
}

function persistCeoBoard(board) {
  store.daily = { ...store.daily, board };
}

function updateCeoCard(cardId, patch) {
  const board = normalizeCeoBoard();
  Object.keys(board).forEach((lane) => {
    board[lane] = board[lane].map((card) => card.id === cardId ? { ...card, ...patch } : card);
  });
  persistCeoBoard(board);
}

function moveCeoCard(cardId, targetLane) {
  const board = normalizeCeoBoard();
  let movingCard;
  Object.keys(board).forEach((lane) => {
    board[lane] = board[lane].filter((card) => {
      if (card.id === cardId) {
        movingCard = { ...card, lane: targetLane };
        return false;
      }
      return true;
    });
  });
  if (movingCard) {
    board[targetLane].push(movingCard);
    persistCeoBoard(board);
    renderDaily();
  }
}

function renderCeoBoard() {
  const target = document.querySelector("[data-ceo-board]");
  if (!target) return;
  const board = normalizeCeoBoard();
  const lanes = [
    ["today", "Today", "Immediate CEO focus"],
    ["week", "This Week", "Move the business forward"],
    ["month", "This Month", "Strategic buildout"],
    ["done", "Done", "Completed wins"]
  ];
  target.innerHTML = lanes.map(([lane, label, helper]) => {
    const cards = board[lane].map((card) => `
      <article class="ceo-card priority-${escapeHtml(card.priority || "Medium").toLowerCase()}" draggable="true" data-ceo-card-id="${escapeHtml(card.id)}">
        <header>
          <span>${escapeHtml(card.priority || "Medium")}</span>
          <small>${escapeHtml(card.type || "Operations")}</small>
        </header>
        <p class="ceo-card-title" contenteditable="true" spellcheck="true" data-ceo-title="${escapeHtml(card.id)}">${escapeHtml(card.title)}</p>
        <footer>
          <span>${escapeHtml(card.source || "Manual")}</span>
          <button type="button" data-ceo-delete="${escapeHtml(card.id)}">Remove</button>
        </footer>
      </article>
    `).join("");
    return `
      <section class="ceo-lane" data-ceo-lane="${lane}">
        <header>
          <div>
            <h3>${label}</h3>
            <p>${helper}</p>
          </div>
          <strong>${board[lane].length}</strong>
        </header>
        <div class="ceo-dropzone" data-ceo-dropzone="${lane}">
          ${cards || `<div class="ceo-empty">Drop cards here or add a new priority.</div>`}
        </div>
      </section>
    `;
  }).join("");
}

function bindCeoBoardEvents() {
  const board = document.querySelector("[data-ceo-board]");
  if (!board) return;
  board.querySelectorAll("[data-ceo-title]").forEach((title) => {
    title.addEventListener("input", () => {
      updateCeoCard(title.dataset.ceoTitle, { title: title.textContent.trim() });
    });
  });
  board.querySelectorAll("[data-ceo-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = normalizeCeoBoard();
      Object.keys(current).forEach((lane) => {
        current[lane] = current[lane].filter((card) => card.id !== button.dataset.ceoDelete);
      });
      persistCeoBoard(current);
      renderDaily();
    });
  });
  board.querySelectorAll("[data-ceo-card-id]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      card.classList.add("is-dragging");
      event.dataTransfer.setData("text/plain", card.dataset.ceoCardId);
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });
  board.querySelectorAll("[data-ceo-dropzone]").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");
      moveCeoCard(event.dataTransfer.getData("text/plain"), zone.dataset.ceoDropzone);
    });
  });
}

function generateCeoPlan() {
  const board = normalizeCeoBoard();
  const titles = new Set(Object.values(board).flat().map((card) => card.title.toLowerCase()));
  ceoSuggestions().forEach((card) => {
    if (!titles.has(card.title.toLowerCase())) {
      board[card.lane || "week"].push(card);
      titles.add(card.title.toLowerCase());
    }
  });
  persistCeoBoard(board);
  showToast("CEO plan refreshed from CRM intelligence.");
  renderDaily();
}

function renderDaily() {
  updateCeoMetrics();
  renderCeoSuggestions();
  renderCeoBoard();
  bindCeoBoardEvents();
}

function renderAll() {
  renderSummary();
  renderIntelligence();
  renderSelectors();
  renderRevenueBuilder();
  renderClientJourney();
  renderLifecycleOs();
  renderIntakeBuilder();
  renderTemplateLibrary();
  renderSignatures();
  renderOnboarding();
  renderProjects();
  renderAdminConfig();
  renderWorkbench();
  renderDaily();
  renderClients();
  renderPipeline();
  renderTasks();
  renderContacts();
  renderKpis();
  renderInvoices();
  renderAutomations();
  renderNotificationHistory();
  renderSecurity();
  renderIntegrations();
  renderProductionModules();
  renderDocumentVault();
  renderActivities();
  renderAssessment();
  renderReports();
}

function addFromForm(form, collection, transform = (data) => data) {
  const data = transform(Object.fromEntries(new FormData(form)));
  store[collection] = [...store[collection], data];
  form.reset();
  renderAll();
}

clientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(clientForm));
  const client = { ...data, assessment: "" };
  store.clients = [...store.clients, client];
  clientForm.reset();
  clientView.value = "phase";
  showToast(`${client.clientName} added. Drag the card into the right phase.`);
  renderAll();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addFromForm(taskForm, "tasks");
});

opportunityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addFromForm(opportunityForm, "opportunities");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addFromForm(contactForm, "contacts");
});

kpiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addFromForm(kpiForm, "kpis");
  showToast("KPI added to Silverback HQ.");
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addFromForm(activityForm, "activities");
});

invoiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(invoiceForm));
  const invoice = {
    ...data,
    invoiceNumber: data.invoiceNumber || `SB-${String(Date.now()).slice(-6)}`,
    invoiceDate: data.invoiceDate || today(),
    dueDate: data.dueDate || addDays(today(), 15),
    hours: Number(data.hours || 0),
    rate: Number(data.rate || 0),
    flatFee: Number(data.flatFee || 0)
  };
  store.invoices = [...store.invoices, invoice];
  store.activities = [{
    client: invoice.client,
    type: "Invoice",
    date: today(),
    summary: `${invoice.invoiceNumber} created for ${money(invoiceTotal(invoice))}.`,
    nextStep: invoice.status === "Paid" ? "Confirm payment reconciliation." : `Follow up by ${invoice.dueDate}.`
  }, ...store.activities];
  invoiceForm.reset();
  showToast(`${invoice.invoiceNumber} created for ${money(invoiceTotal(invoice))}.`);
  renderAll();
});

revenueBuilderForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(revenueBuilderForm));
  const selectedPackage = servicePackages().find((item) => item.name === data.packageName) || servicePackages()[0];
  const selectedMaintenance = maintenancePlans().find((item) => item.name === data.maintenanceName) || maintenancePlans()[0];
  const estimatedValue = Number(data.estimatedValue || selectedPackage.value || 0);
  const upfrontPayment = Number(data.upfrontPayment || selectedPackage.deposit || 0);
  const nextStep = data.nextStep || `Schedule proposal review for ${selectedPackage.name}.`;
  const plan = {
    id: `rev-${Date.now()}`,
    client: data.client,
    packageName: selectedPackage.name,
    maintenanceName: selectedMaintenance.name,
    estimatedValue,
    upfrontPayment,
    owner: data.owner,
    nextStep,
    status: "Draft",
    createdAt: today()
  };

  store.revenuePlans = [...store.revenuePlans, plan];
  store.opportunities = [...store.opportunities, {
    name: `${selectedPackage.name} - ${data.client}`,
    client: data.client,
    stage: "Proposal",
    value: estimatedValue,
    closeDate: addDays(today(), 14)
  }];
  store.tasks = [...store.tasks, {
    task: nextStep,
    client: data.client,
    priority: "High",
    status: "Not Started",
    dueDate: addDays(today(), 2),
    cadence: "One-Time",
    category: "Sales",
    notes: `Revenue plan: ${selectedPackage.name}. ${selectedMaintenance.detail}`
  }];
  if (upfrontPayment > 0) {
    store.invoices = [...store.invoices, {
      invoiceNumber: `SB-${String(Date.now()).slice(-6)}`,
      client: data.client,
      service: `Deposit - ${selectedPackage.name}`,
      hours: 0,
      rate: 0,
      flatFee: upfrontPayment,
      invoiceDate: today(),
      dueDate: addDays(today(), 7),
      status: "Draft"
    }];
  }
  store.activities = [{
    client: data.client,
    type: "Revenue Plan",
    date: today(),
    summary: `${selectedPackage.name} revenue plan created for ${money(estimatedValue)}.`,
    nextStep
  }, ...store.activities];
  revenueBuilderForm.reset();
  showToast(`Revenue plan created for ${data.client}.`);
  renderAll();
});

packageSelect?.addEventListener("change", renderRevenueBuilder);
maintenanceSelect?.addEventListener("change", renderRevenueBuilder);
document.querySelector("[data-client-options-revenue]")?.addEventListener("change", renderRevenueBuilder);

workbenchNotes?.addEventListener("input", () => {
  store.workbench = { notes: workbenchNotes.value, updatedAt: today() };
});

automationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const automation = Object.fromEntries(new FormData(automationForm));
  store.automations = [...store.automations, automation];
  store.auditEvents = [{
    date: today(),
    user: "Admin",
    action: `${automation.workflow} automation added`,
    area: "Automation"
  }, ...store.auditEvents];
  automationForm.reset();
  showToast("Automation added to Silverback HQ.");
  renderAll();
});

document.querySelector("[data-lifecycle-stage-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  store.lifecycleStages = [...store.lifecycleStages, {
    id: `stage-${Date.now()}`,
    name: data.name,
    owner: data.owner || "Silverback Team",
    requiredAction: data.requiredAction || "Confirm requirement before advancing.",
    active: true
  }];
  addAuditEvent("Admin", `Added workflow stage ${data.name}`, "Lifecycle");
  event.currentTarget.reset();
  showToast("Lifecycle stage added.");
  renderAll();
});

document.querySelector("[data-intake-form-builder]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  store.intakeForms = [...store.intakeForms, {
    id: `intake-${Date.now()}`,
    name: data.name,
    service: data.service,
    required: data.required === "true",
    fields: []
  }];
  addAuditEvent("Admin", `Created intake form ${data.name}`, "Intake");
  event.currentTarget.reset();
  showToast("Intake form created.");
  renderAll();
});

document.querySelector("[data-intake-field-builder]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const forms = store.intakeForms;
  const form = forms.find((item) => item.id === data.formId);
  if (!form) return;
  form.fields = [...form.fields, {
    id: `field-${Date.now()}`,
    label: data.label,
    type: data.type,
    required: false,
    options: data.options ? data.options.split(",").map((option) => option.trim()).filter(Boolean) : []
  }];
  store.intakeForms = forms;
  addAuditEvent("Admin", `Added intake field to ${form.name}`, "Intake");
  event.currentTarget.reset();
  showToast("Intake field added.");
  renderAll();
});

document.querySelector("[data-template-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  store.documentTemplates = [...store.documentTemplates, {
    id: `template-${Date.now()}`,
    name: data.name,
    type: data.type,
    service: data.service,
    version: data.version || "1.0",
    status: "Active",
    updatedAt: today()
  }];
  addAuditEvent("Admin", `Added document template ${data.name}`, "Documents");
  event.currentTarget.reset();
  showToast("Document template added.");
  renderAll();
});

document.querySelector("[data-signature-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  store.signaturePackets = [...store.signaturePackets, {
    id: `sig-${Date.now()}`,
    client: data.client,
    templateId: data.templateId,
    provider: data.provider,
    status: data.status,
    sentAt: today(),
    signedAt: ["Signed", "Completed"].includes(data.status) ? today() : "",
    verification: ["Signed", "Completed"].includes(data.status) ? "Provider verification ready" : "Awaiting provider event",
    audit: `${data.provider} envelope created from HQ.`
  }];
  addAuditEvent("Admin", `Sent ${templateName(data.templateId)} to ${data.client}`, "E-Signature");
  event.currentTarget.reset();
  showToast("Signature packet added.");
  renderAll();
});

document.querySelector("[data-project-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  store.projects = [...store.projects, {
    id: `project-${Date.now()}`,
    client: data.client,
    name: data.name,
    consultant: data.consultant,
    status: data.status,
    nextMilestone: data.nextMilestone || "Confirm first milestone",
    workspace: `${data.client} Workspace`,
    createdAt: today(),
    progress: data.status === "Project Completed" ? 100 : data.status === "Project In Progress" ? 45 : 10
  }];
  addAuditEvent("Admin", `Created project for ${data.client}`, "Projects");
  event.currentTarget.reset();
  showToast("Project created.");
  renderAll();
});

document.querySelector("[data-admin-config-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const split = (value) => String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  store.onboardingConfig = {
    notificationRecipients: split(data.notificationRecipients),
    requiredDocuments: split(data.requiredDocuments),
    requiredForms: split(data.requiredForms),
    reminderSchedule: split(data.reminderSchedule),
    paymentRequiresSignedDocs: data.paymentRequiresSignedDocs === "true",
    welcomeEmail: data.welcomeEmail,
    paymentReminderEmail: data.paymentReminderEmail
  };
  addAuditEvent("Admin", "Updated onboarding and notification configuration", "Admin Config");
  showToast("Admin configuration saved.");
  renderAll();
});

document.querySelector("[data-onboarding-client]")?.addEventListener("change", renderOnboarding);

document.querySelector("[data-run-onboarding-automation]")?.addEventListener("click", () => {
  const selected = document.querySelector("[data-onboarding-client]")?.value;
  const client = clientRecord(selected);
  if (!client) return;
  const status = onboardingStatus(client);
  if (!status.readyForProject) {
    showToast("Onboarding is not ready yet. Complete signatures and intake first.");
    return;
  }
  const existing = store.projects.some((project) => project.client === client.clientName);
  if (!existing) {
    store.projects = [...store.projects, {
      id: `project-${Date.now()}`,
      client: client.clientName,
      name: `${client.clientName} Silverback Engagement`,
      consultant: client.consultant || "Silverback Team",
      status: "Project Created",
      nextMilestone: "Launch kickoff workspace",
      workspace: `${client.clientName} Workspace`,
      createdAt: today(),
      progress: 10
    }];
  }
  store.clients = store.clients.map((item) => item.clientName === client.clientName ? { ...item, status: "Active", lifecycleStage: "Project Created", nextAction: "Begin project kickoff" } : item);
  store.activities = [{
    client: client.clientName,
    type: "Onboarding Automation",
    date: today(),
    summary: "Onboarding automation created project workspace and activated client.",
    nextStep: "Begin project kickoff."
  }, ...store.activities];
  addAuditEvent("System", `Ran onboarding automation for ${client.clientName}`, "Onboarding");
  showToast("Project automation completed.");
  renderAll();
});

ceoTaskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(ceoTaskForm));
  const board = normalizeCeoBoard();
  board[data.lane || "today"].push(makeCeoCard(data.title, data.lane || "today", data.priority || "Medium", data.type || "Operations", "Manual"));
  persistCeoBoard(board);
  ceoTaskForm.reset();
  showToast("CEO priority added.");
  renderDaily();
});

generateCeoPlanButton?.addEventListener("click", generateCeoPlan);

document.addEventListener("click", (event) => {
  const suggestion = event.target.closest("[data-add-ceo-suggestion]");
  if (suggestion) {
    const board = normalizeCeoBoard();
    const card = makeCeoCard(
      suggestion.dataset.title,
      suggestion.dataset.lane || "week",
      suggestion.dataset.priority || "Medium",
      suggestion.dataset.type || "Operations",
      "AI Accepted"
    );
    board[card.lane].push(card);
    persistCeoBoard(board);
    showToast("AI suggestion added to the CEO board.");
    renderDaily();
    return;
  }

  const lifecycleMove = event.target.closest("[data-lifecycle-move]");
  if (lifecycleMove) {
    const index = Number(lifecycleMove.dataset.lifecycleMove);
    const direction = Number(lifecycleMove.dataset.direction);
    const stages = [...store.lifecycleStages];
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= stages.length) return;
    const [moved] = stages.splice(index, 1);
    stages.splice(nextIndex, 0, moved);
    store.lifecycleStages = stages;
    addAuditEvent("Admin", `Moved workflow stage ${moved.name}`, "Lifecycle");
    showToast("Workflow stage reordered.");
    renderAll();
    return;
  }

  const lifecycleRemove = event.target.closest("[data-lifecycle-remove]");
  if (lifecycleRemove) {
    const index = Number(lifecycleRemove.dataset.lifecycleRemove);
    const stages = [...store.lifecycleStages];
    const stage = stages[index];
    if (!stage) return;
    stages[index] = { ...stage, active: false };
    store.lifecycleStages = stages;
    addAuditEvent("Admin", `Archived workflow stage ${stage.name}`, "Lifecycle");
    showToast("Workflow stage archived.");
    renderAll();
    return;
  }

  const templateArchive = event.target.closest("[data-template-archive]");
  if (templateArchive) {
    const id = templateArchive.dataset.templateArchive;
    store.documentTemplates = store.documentTemplates.map((template) => template.id === id ? { ...template, status: template.status === "Archived" ? "Active" : "Archived", updatedAt: today() } : template);
    addAuditEvent("Admin", "Updated document template status", "Documents");
    showToast("Template status updated.");
    renderAll();
    return;
  }

  const templateGenerate = event.target.closest("[data-template-generate]");
  if (templateGenerate) {
    const id = templateGenerate.dataset.templateGenerate;
    const template = store.documentTemplates.find((item) => item.id === id);
    const client = store.clients[0];
    if (!template || !client) return;
    store.signaturePackets = [...store.signaturePackets, {
      id: `sig-${Date.now()}`,
      client: client.clientName,
      templateId: id,
      provider: "DocuSign",
      status: "Pending",
      sentAt: today(),
      signedAt: "",
      verification: "Generated from stored client profile",
      audit: `${template.name} generated using ${client.clientName} CRM data.`
    }];
    addAuditEvent("Admin", `Generated ${template.name} for ${client.clientName}`, "Documents");
    showToast("Client-specific document packet generated.");
    renderAll();
  }
});

document.addEventListener("change", (event) => {
  const automationControl = event.target.closest("[data-automation-field]");
  if (automationControl) {
    updateAutomation(Number(automationControl.dataset.automationIndex), automationControl.dataset.automationField, automationControl.value);
    return;
  }

  const lifecycleEdit = event.target.closest("[data-lifecycle-edit]");
  if (lifecycleEdit) {
    const index = Number(lifecycleEdit.dataset.lifecycleEdit);
    const field = lifecycleEdit.dataset.field;
    const stages = [...store.lifecycleStages];
    if (!stages[index] || !field) return;
    stages[index] = { ...stages[index], [field]: lifecycleEdit.value };
    store.lifecycleStages = stages;
    addAuditEvent("Admin", `Edited workflow stage ${stages[index].name}`, "Lifecycle");
    showToast("Workflow stage saved.");
    renderAll();
    return;
  }

  const signatureStatus = event.target.closest("[data-signature-status]");
  if (signatureStatus) {
    const index = Number(signatureStatus.dataset.signatureStatus);
    const packets = [...store.signaturePackets];
    if (!packets[index]) return;
    packets[index] = {
      ...packets[index],
      status: signatureStatus.value,
      signedAt: ["Signed", "Completed"].includes(signatureStatus.value) ? today() : packets[index].signedAt,
      verification: ["Signed", "Completed"].includes(signatureStatus.value) ? "Provider verification captured" : packets[index].verification,
      audit: `${signatureStatus.value} status captured in HQ on ${today()}.`
    };
    store.signaturePackets = packets;
    addAuditEvent("Admin", `Updated e-signature status for ${packets[index].client}`, "E-Signature");
    showToast("Signature status updated.");
    renderAll();
    return;
  }

  const phaseControl = event.target.closest("[data-client-phase-index]");
  const statusControl = event.target.closest("[data-client-status-index]");
  if (!phaseControl && !statusControl) return;

  const control = phaseControl || statusControl;
  const index = Number(phaseControl ? control.dataset.clientPhaseIndex : control.dataset.clientStatusIndex);
  const clients = store.clients;
  const client = clients[index];
  if (!client) return;
  const field = phaseControl ? "currentPhase" : "status";
  const label = phaseControl ? "phase" : "status";
  const oldValue = client[field];
  client[field] = event.target.value;
  client.lastContact = today();
  clients[index] = client;
  store.clients = clients;
  store.activities = [{
    client: client.clientName,
    type: "Client Update",
    date: today(),
    summary: `${client.clientName} ${label} changed from ${oldValue} to ${event.target.value}.`,
    nextStep: client.nextAction || "Confirm next client milestone."
  }, ...store.activities];
  showToast(`${client.clientName} ${label} updated.`);
  renderAll();
});

document.addEventListener("blur", (event) => {
  const automationControl = event.target.closest("[data-automation-field]");
  if (automationControl && automationControl.matches("input")) {
    updateAutomation(Number(automationControl.dataset.automationIndex), automationControl.dataset.automationField, automationControl.value.trim());
    return;
  }

  const input = event.target.closest("[data-client-next-index]");
  if (!input) return;
  const index = Number(input.dataset.clientNextIndex);
  const clients = store.clients;
  const client = clients[index];
  if (!client || client.nextAction === input.value) return;
  client.nextAction = input.value;
  client.lastContact = today();
  clients[index] = client;
  store.clients = clients;
  showToast(`${client.clientName} next action saved.`);
  renderAll();
}, true);

clientView.addEventListener("change", renderClients);
clientSearch.addEventListener("input", renderClients);
globalSearch.addEventListener("input", () => {
  renderClients();
  renderContacts();
  renderKpis();
});

assessmentClient?.addEventListener("change", renderAssessment);

assessmentForm?.addEventListener("input", () => {
  const client = selectedAssessmentClient();
  const assessment = collectAssessmentFromForm(getAssessment(client));
  assessment.status = "Draft";
  saveAssessment(client, assessment);
  refreshAssessmentSummary(getAssessment(client));
});

assessmentForm?.addEventListener("change", () => {
  const client = selectedAssessmentClient();
  const assessment = collectAssessmentFromForm(getAssessment(client));
  assessment.status = "Draft";
  saveAssessment(client, assessment);
  refreshAssessmentSummary(getAssessment(client));
});

assessmentSave?.addEventListener("click", () => persistAssessmentDraft("Assessment draft saved."));
assessmentResume?.addEventListener("click", () => persistAssessmentDraft("Assessment saved. It will resume from this point."));
assessmentSubmit?.addEventListener("click", submitAssessment);
assessmentExport?.addEventListener("click", exportAssessmentPdf);

document.querySelector("[data-export-clients]").addEventListener("click", () => exportCsv("silverback-clients.csv", store.clients));
document.querySelector("[data-export-all]").addEventListener("click", () => {
  const data = JSON.stringify({
    clients: store.clients,
    contacts: store.contacts,
    opportunities: store.opportunities,
    tasks: store.tasks,
    kpis: store.kpis,
    invoices: store.invoices,
    automations: store.automations,
    integrations: store.integrations,
    assessments: store.assessments,
    lifecycleStages: store.lifecycleStages,
    intakeForms: store.intakeForms,
    intakeResponses: store.intakeResponses,
    documentTemplates: store.documentTemplates,
    signaturePackets: store.signaturePackets,
    onboardingConfig: store.onboardingConfig,
    projects: store.projects,
    appointments: store.appointments,
    productionPlan: productionModules(),
    documentVault: documentVaultItems(),
    auditEvents: store.auditEvents,
    daily: store.daily,
    security: {
      score: securityScore(),
      checks: securityChecks()
    },
    activities: store.activities,
    exportedAt: new Date().toISOString(),
    analytics: {
      provider: "Google Analytics 4",
      measurementId: "Production GA4 measurement ID required",
      note: "Create the Silverback GA4 web data stream before enabling live traffic reporting."
    }
  }, null, 2);
  download("silverback-hq-data.json", data, "application/json");
});

function exportCsv(filename, rows) {
  const headers = Object.keys(rows[0]).filter((key) => key !== "assessment");
  const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => `"${String(row[key] || "").replaceAll('"', '""')}"`).join(","))].join("\n");
  download(filename, csv, "text/csv");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

renderAll();
