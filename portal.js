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
  unlocked: "silverbackClientPortalUnlocked",
  activeClient: "silverbackClientPortalActiveClient"
};

const fallbackClients = [
  { clientName: "SB Plum Co", businessType: "Service Business", currentPhase: "Financial Organization", status: "Active", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Financial tracking", currentProject: "Bookkeeping setup", nextAction: "Collect bank statements", lastContact: "", googleDriveLink: "" },
  { clientName: "Avy's Ribs", businessType: "Food Service", currentPhase: "Operations", status: "Lead", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Operations consistency", currentProject: "SOP review", nextAction: "Schedule assessment", lastContact: "", googleDriveLink: "" },
  { clientName: "Felipe's Car Wash", businessType: "Service Business", currentPhase: "Growth", status: "Lead", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Lead flow", currentProject: "Marketing plan", nextAction: "Review pricing", lastContact: "", googleDriveLink: "" }
];

const processSteps = [
  { phase: "Foundation", detail: "Business setup, documents, licenses, bank setup, and launch checklist." },
  { phase: "Financial Organization", detail: "Bookkeeping, reporting, expenses, cash flow, and profit tracking." },
  { phase: "Operations", detail: "SOPs, workflows, roles, checklists, and accountability." },
  { phase: "Growth", detail: "Marketing, sales, customer retention, referrals, and revenue planning." },
  { phase: "Scale", detail: "Leadership, KPIs, hiring plan, expansion planning, and operating rhythm." }
];

const starterDocuments = [
  { id: "engagement", title: "Client Engagement Agreement", status: "Needs Signature", type: "Agreement", due: "Before onboarding" },
  { id: "disclosure", title: "Consulting Disclosure", status: "Needs Signature", type: "Disclosure", due: "Before project start" },
  { id: "scope", title: "Project Scope Confirmation", status: "Ready To Review", type: "Scope", due: "Before first strategy session" }
];

const starterInvoices = [
  { id: "INV-1007", title: "Foundation & Business Assessment", amount: 1500, due: "2026-07-01", status: "Due" },
  { id: "INV-1006", title: "Initial Strategy Consultation", amount: 350, due: "2026-06-15", status: "Paid" }
];

const notificationEmails = ["cocommichael@yahoo.com", "aidamorales2014@yahoo.com"];

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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function sendNotificationEmail(subject, lines) {
  const body = [
    "Silverback Client Portal Notification",
    "",
    ...lines,
    "",
    "This notification was generated from the Silverback client portal demo.",
    "Production version: send automatically through Azure, SendGrid, Microsoft Graph, DocuSign webhooks, Stripe webhooks, or PayPal webhooks."
  ].join("\n");
  const mailto = `mailto:${notificationEmails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function clients() {
  return read(portalKeys.clients, fallbackClients).filter((client) => client.clientName !== "Silverback Consulting");
}

function clientData() {
  return clients().find((client) => client.clientName === activeClientName) || clients()[0] || fallbackClients[0];
}

function clientKey(name = activeClientName) {
  return String(name || "client").replace(/[^a-z0-9]/gi, "-").toLowerCase();
}

function scopedRecords(key, starter) {
  const all = read(key, {});
  const scoped = all[clientKey()];
  if (scoped) return scoped;
  all[clientKey()] = starter;
  write(key, all);
  return starter;
}

function saveScopedRecords(key, records) {
  const all = read(key, {});
  all[clientKey()] = records;
  write(key, all);
}

function messages() {
  return scopedRecords(portalKeys.portalMessages, [
    { from: "Silverback Team", text: "Welcome to your client portal. You can send questions here, review next steps, sign documents, and view invoices.", date: today(), role: "team" },
    { from: activeClientName, text: "Thank you. I will review the documents and next action plan.", date: today(), role: "client" }
  ]);
}

function documents() {
  return scopedRecords(portalKeys.portalDocuments, starterDocuments);
}

function invoices() {
  return scopedRecords(portalKeys.portalInvoices, starterInvoices);
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
  return scopedRecords(portalKeys.portalAudit, [
    { date: today(), text: "Client portal workspace opened for review." }
  ]);
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
  clientSelect.innerHTML = clients().map((client) => `<option>${escapeHtml(client.clientName)}</option>`).join("");
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
  openItems.textContent = unsigned + unpaid;
  homeDocumentCount.textContent = `${unsigned} Pending`;
  homeBalance.textContent = `${currency(balance)} Due`;
}

function renderProcess() {
  const activePhase = clientData().currentPhase || "Foundation";
  const activeIndex = Math.max(0, processSteps.findIndex((step) => step.phase === activePhase));
  processTrack.innerHTML = processSteps.map((step, index) => {
    const className = index < activeIndex ? "complete" : index === activeIndex ? "active" : "";
    return `<article class="process-step ${className}"><h3>${step.phase}</h3><p>${step.detail}</p></article>`;
  }).join("");
}

function renderMessages() {
  messageThread.innerHTML = messages().map((message) => `
    <article class="message ${message.role === "client" ? "client" : "team"}">
      <strong>${escapeHtml(message.from)}</strong>
      <p>${escapeHtml(message.text)}</p>
      <small>${escapeHtml(message.date)}</small>
    </article>
  `).join("");
  messageThread.scrollTop = messageThread.scrollHeight;
}

function renderDocuments() {
  documentGrid.innerHTML = documents().map((document) => `
    <article class="document-card ${document.status === "Signed" ? "signed" : ""}">
      <span>${escapeHtml(document.type)}</span>
      <h3>${escapeHtml(document.title)}</h3>
      <p>Status: <strong>${escapeHtml(document.status)}</strong></p>
      <p>Due: ${escapeHtml(document.due)}</p>
      <button type="button" data-sign-document="${document.id}">${document.status === "Signed" ? "View Signed Copy" : "Review & E-Sign"}</button>
    </article>
  `).join("");
}

function renderInvoices() {
  const items = invoices();
  invoiceList.innerHTML = items.map((invoice) => `
    <article class="invoice-card ${invoice.status === "Paid" ? "paid" : "due"}">
      <span>${escapeHtml(invoice.id)}</span>
      <h3>${escapeHtml(invoice.title)}</h3>
      <p>Amount: <strong>${currency(invoice.amount)}</strong></p>
      <p>Due: ${escapeHtml(invoice.due)}</p>
      <p>Status: ${escapeHtml(invoice.status)}</p>
    </article>
  `).join("");
  invoiceSelect.innerHTML = items.map((invoice) => `<option value="${escapeHtml(invoice.id)}">${escapeHtml(invoice.id)} - ${escapeHtml(invoice.title)} (${escapeHtml(invoice.status)})</option>`).join("");
  const firstDue = items.find((invoice) => invoice.status !== "Paid") || items[0];
  if (firstDue) {
    invoiceSelect.value = firstDue.id;
    paymentForm.amount.value = firstDue.amount;
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
  statementGrid.innerHTML = items.map((invoice) => `
    <article>
      <h3>${escapeHtml(invoice.id)}</h3>
      <p>${escapeHtml(invoice.title)}</p>
      <p>${currency(invoice.amount)} - ${escapeHtml(invoice.status)}</p>
      <p>Statement period: ${escapeHtml(invoice.due.slice(0, 7))}</p>
    </article>
  `).join("");
}

function renderAudit() {
  auditLog.innerHTML = auditItems().map((item) => `<div class="audit-item"><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.text)}</span></div>`).join("");
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  activeClientName = formData.get("clientName");
  const accessCode = String(formData.get("accessCode") || "").trim();
  if (accessCode !== "CLIENT2026") {
    loginError.textContent = "Incorrect access code. Use CLIENT2026 for the demo portal.";
    return;
  }
  loginError.textContent = "";
  unlockPortal();
  showPortalView("overview");
  logActivity("Secure client login completed with demo MFA verification.");
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
  const records = documents().map((document) => {
    if (document.id !== documentId) return document;
    if (document.status === "Signed") return document;
    return { ...document, status: "Signed", signedDate: today() };
  });
  const signed = records.find((document) => document.id === documentId);
  saveScopedRecords(portalKeys.portalDocuments, records);
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
  const connection = { connected: true, bank: "Demo Business Checking ending in 2026", connectedDate: today() };
  savePlaidConnection(connection);
  syncCrmActivity("Client connected bank account through Plaid demo workflow.", "Verify bank connection before ACH payment.");
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
  const formData = new FormData(paymentForm);
  const invoiceId = formData.get("invoice");
  const method = formData.get("method");
  const amount = Number(formData.get("amount"));
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
