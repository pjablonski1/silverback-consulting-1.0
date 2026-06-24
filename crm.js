const assessmentTemplate = `BUSINESS ASSESSMENT

Current Phase:
Main Goal:
Biggest Problem:
Revenue Goal:

1. LEGAL FOUNDATION
LLC:
EIN:
Business License:
Seller's Permit:
Insurance:
Contracts:

Score: /10

2. FINANCIAL ORGANIZATION
Business Bank Account:
Bookkeeping:
QuickBooks:
P&L:
Balance Sheet:
Expense Tracking:
Profit Tracking:

Score: /10

3. OPERATIONS
SOPs:
Employee Roles:
Training:
Daily Checklists:
Customer Service Process:
Owner Responsibilities:

Score: /10

4. MARKETING
Website:
Google Business Profile:
Instagram:
Reviews:
Promotions:
Branding:

Score: /10

5. SALES
Lead Tracking:
Follow-Up System:
Pricing:
Customer Retention:
Referral System:

Score: /10

6. GROWTH
Revenue Target:
Expansion Plan:
Hiring Plan:
KPIs:
Next 30-Day Plan:

Score: /10`;

const starterClients = [
  { clientName: "Silverback Consulting", businessType: "Consulting", currentPhase: "Foundation", status: "Active", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "CRM and operating systems", currentProject: "Website and HQ setup", nextAction: "Finalize CRM", lastContact: "", googleDriveLink: "", assessment: assessmentTemplate },
  { clientName: "SB Plum Co", businessType: "Service Business", currentPhase: "Financial Organization", status: "Active", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Financial tracking", currentProject: "Bookkeeping setup", nextAction: "Collect bank statements", lastContact: "", googleDriveLink: "", assessment: assessmentTemplate },
  { clientName: "Avy's Ribs", businessType: "Food Service", currentPhase: "Operations", status: "Lead", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Operations consistency", currentProject: "SOP review", nextAction: "Schedule assessment", lastContact: "", googleDriveLink: "", assessment: assessmentTemplate },
  { clientName: "Felipe's Car Wash", businessType: "Service Business", currentPhase: "Growth", status: "Lead", monthlyRevenue: 0, monthlyProfit: 0, biggestProblem: "Lead flow", currentProject: "Marketing plan", nextAction: "Review pricing", lastContact: "", googleDriveLink: "", assessment: assessmentTemplate }
];

const starterTasks = [
  ["File LLC organization checklist", "Silverback Consulting", "High", "In Progress", "Legal"],
  ["Set up operating dashboard", "Silverback Consulting", "High", "In Progress", "Operations"],
  ["Build client intake workflow", "Silverback Consulting", "High", "Not Started", "Sales"],
  ["Create investor follow-up process", "Silverback Consulting", "Medium", "Not Started", "Admin"],
  ["Prepare launch marketing list", "Silverback Consulting", "Medium", "Not Started", "Marketing"],
  ["Collect financial documents", "SB Plum Co", "High", "Not Started", "Financial"],
  ["Create P&L tracking sheet", "SB Plum Co", "High", "Not Started", "Financial"],
  ["Document customer service SOP", "SB Plum Co", "Medium", "Not Started", "Operations"],
  ["Review pricing model", "SB Plum Co", "Medium", "Waiting", "Sales"],
  ["Schedule weekly review", "SB Plum Co", "Low", "Not Started", "Admin"]
].map(([task, client, priority, status, category]) => ({ task, client, priority, status, dueDate: "", category, notes: "" }));

const starterOpportunities = [
  { name: "Silverback Launch Advisory", client: "Silverback Consulting", stage: "Proposal", value: 25000, closeDate: "" },
  { name: "SB Plum Financial Cleanup", client: "SB Plum Co", stage: "Discovery", value: 12000, closeDate: "" },
  { name: "Avy's Ribs Operations Package", client: "Avy's Ribs", stage: "New Lead", value: 8000, closeDate: "" },
  { name: "Felipe's Car Wash Growth Plan", client: "Felipe's Car Wash", stage: "Discovery", value: 10000, closeDate: "" }
];

const starterContacts = [
  { name: "Aida Morales", client: "Silverback Consulting", role: "Founder & CEO", email: "", phone: "", type: "Decision Maker" },
  { name: "Michael Cocom", client: "Silverback Consulting", role: "Co-Founder & Managing Partner", email: "", phone: "", type: "Decision Maker" }
];

const starterActivities = [
  { client: "Silverback Consulting", type: "Meeting", date: today(), summary: "Reviewed HQ CRM requirements and website direction.", nextStep: "Confirm final CRM workflow." }
];

const starterKpis = [
  { client: "Silverback Consulting", metric: "Client Portal Readiness", target: "Demo ready", current: "In review", status: "On Track", owner: "Silverback HQ" },
  { client: "SB Plum Co", metric: "Monthly Close", target: "5th of each month", current: "Collecting statements", status: "Watch", owner: "Finance" },
  { client: "Avy's Ribs", metric: "SOP Completion", target: "10 core SOPs", current: "3 drafted", status: "Watch", owner: "Operations" },
  { client: "Felipe's Car Wash", metric: "Lead Follow-Up Time", target: "Within 24 hours", current: "48 hours", status: "Off Track", owner: "Sales" }
];

const keys = {
  clients: "silverbackClientsV2",
  tasks: "silverbackTasksV2",
  opportunities: "silverbackOpportunitiesV2",
  contacts: "silverbackContactsV2",
  activities: "silverbackActivitiesV2",
  kpis: "silverbackKpisV1",
  daily: "silverbackDailyV2",
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

function today() {
  return new Date().toISOString().slice(0, 10);
}

function money(value) {
  const number = Number(value);
  return number ? number.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "$0";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

const loginScreen = document.querySelector("[data-login-screen]");
const appShell = document.querySelector("[data-app-shell]");
const loginForm = document.querySelector("[data-login-form]");
const loginError = document.querySelector("[data-login-error]");
const sessionStatus = document.querySelector("[data-session-status]");
let idleTimer;

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
  } else {
    loginError.textContent = "Incorrect access code.";
  }
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
const taskBoard = document.querySelector("[data-task-board]");
const pipelineBoard = document.querySelector("[data-pipeline-board]");
const phaseBoard = document.querySelector("[data-phase-board]");
const kpiGrid = document.querySelector("[data-kpi-grid]");
const clientView = document.querySelector("[data-client-view]");
const clientSearch = document.querySelector("[data-client-search]");
const globalSearch = document.querySelector("[data-global-search]");
const assessmentClient = document.querySelector("[data-assessment-client]");
const assessmentText = document.querySelector("[data-assessment-text]");
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
  return store.clients.map((client) => `<option>${escapeHtml(client.clientName)}</option>`).join("");
}

function renderSummary() {
  const clients = store.clients;
  const tasks = store.tasks;
  const opportunities = store.opportunities;
  const due = tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate <= today()).length;
  document.querySelector("[data-total-clients]").textContent = clients.length;
  document.querySelector("[data-active-clients]").textContent = clients.filter((client) => client.status === "Active").length;
  document.querySelector("[data-open-tasks]").textContent = tasks.filter((task) => task.status !== "Done").length;
  document.querySelector("[data-followups-due]").textContent = due;
  document.querySelector("[data-lead-count]").textContent = clients.filter((client) => client.status === "Lead").length;
  document.querySelector("[data-pipeline-value]").textContent = money(opportunities.filter((opportunity) => !["Lost", "Won"].includes(opportunity.stage)).reduce((sum, opportunity) => sum + Number(opportunity.value || 0), 0));
}

function renderClients() {
  const clients = filteredClients();
  clientTable.innerHTML = clients.map((client) => `
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
  `).join("");

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
  document.querySelectorAll("[data-client-options], [data-client-options-opportunities], [data-client-options-contacts], [data-client-options-activity], [data-client-options-kpis]").forEach((select) => {
    select.innerHTML = clientOptions();
  });
  assessmentClient.innerHTML = store.clients.map((client, index) => `<option value="${index}">${escapeHtml(client.clientName)}</option>`).join("");
  assessmentText.value = store.clients[Number(assessmentClient.value || 0)]?.assessment || assessmentTemplate;
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
      <div class="mini-card">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.client)}</span>
        <span>${money(item.value)} | ${escapeHtml(item.closeDate || "No close date")}</span>
      </div>
    `).join("");
    return `<section class="pipeline-column"><h3>${stage}</h3><span class="badge">${money(total)}</span>${cards}</section>`;
  }).join("");
}

function renderTasks() {
  const statuses = ["Not Started", "In Progress", "Waiting", "Done"];
  taskBoard.innerHTML = statuses.map((status) => {
    const cards = store.tasks.filter((task) => task.status === status).map((task) => `
      <div class="mini-card">
        <strong>${escapeHtml(task.task)}</strong>
        <span>${escapeHtml(task.client)}</span>
        <span>${escapeHtml(task.priority)} priority | ${escapeHtml(task.category)}</span>
        <span>${escapeHtml(task.dueDate || "No due date")}</span>
      </div>
    `).join("");
    return `<section class="kanban-column"><h3>${status}</h3>${cards}</section>`;
  }).join("");
}

function renderContacts() {
  const query = globalSearch.value.toLowerCase();
  contactsGrid.innerHTML = store.contacts.filter((contact) => Object.values(contact).join(" ").toLowerCase().includes(query)).map((contact) => `
    <article class="contact-card">
      <h3>${escapeHtml(contact.name)}</h3>
      <p>${escapeHtml(contact.role || "No role")}<br>${escapeHtml(contact.client)}<br>${escapeHtml(contact.type)}</p>
      <p>${escapeHtml(contact.email || "No email")}<br>${escapeHtml(contact.phone || "No phone")}</p>
    </article>
  `).join("");
}

function renderKpis() {
  const query = globalSearch.value.toLowerCase();
  kpiGrid.innerHTML = store.kpis.filter((kpi) => Object.values(kpi).join(" ").toLowerCase().includes(query)).map((kpi) => {
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

function renderDaily() {
  const daily = store.daily;
  document.querySelectorAll("[data-daily]").forEach((field) => {
    field.value = daily[field.dataset.daily] || "";
    field.addEventListener("input", () => {
      store.daily = { ...store.daily, [field.dataset.daily]: field.value };
    });
  });
}

function renderAll() {
  renderSummary();
  renderSelectors();
  renderClients();
  renderPipeline();
  renderTasks();
  renderContacts();
  renderKpis();
  renderActivities();
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
  const client = { ...data, assessment: assessmentTemplate };
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

clientView.addEventListener("change", renderClients);
clientSearch.addEventListener("input", renderClients);
globalSearch.addEventListener("input", () => {
  renderClients();
  renderContacts();
  renderKpis();
});

assessmentClient.addEventListener("change", () => {
  assessmentText.value = store.clients[Number(assessmentClient.value)]?.assessment || assessmentTemplate;
});

assessmentText.addEventListener("input", () => {
  const clients = store.clients;
  const index = Number(assessmentClient.value);
  clients[index].assessment = assessmentText.value;
  store.clients = clients;
});

document.querySelector("[data-export-clients]").addEventListener("click", () => exportCsv("silverback-clients.csv", store.clients));
document.querySelector("[data-export-all]").addEventListener("click", () => {
  const data = JSON.stringify({
    clients: store.clients,
    contacts: store.contacts,
    opportunities: store.opportunities,
    tasks: store.tasks,
    kpis: store.kpis,
    activities: store.activities
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

renderDaily();
renderAll();
