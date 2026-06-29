const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const serviceCards = document.querySelectorAll("[data-service]");
const serviceSelect = document.querySelector("[data-service-select]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const investorForm = document.querySelector("[data-investor-form]");
const investorStatus = document.querySelector("[data-investor-status]");
const investorSection = document.querySelector("#future-investors");
const investorLinks = document.querySelectorAll('a[href="#future-investors"]');
const investorClose = document.querySelector("[data-investor-close]");
const scheduleSection = document.querySelector("#schedule-consultation");
const scheduleLinks = document.querySelectorAll('a[href="#schedule-consultation"]');
const scheduleClose = document.querySelector("[data-schedule-close]");
const scheduleForm = document.querySelector("[data-schedule-form]");
const scheduleStatus = document.querySelector("[data-schedule-status]");
const scheduleDate = scheduleForm?.querySelector('input[name="meetingDate"]');
let lastModalTrigger = null;

const notificationEmails = ["michaelcocom@yahoo.com", "aidamorales2014@gmail.com"];

const crmKeys = {
  clients: "silverbackClientsV2",
  contacts: "silverbackContactsV2",
  opportunities: "silverbackOpportunitiesV2",
  tasks: "silverbackTasksV2",
  activities: "silverbackActivitiesV2",
  notificationHistory: "silverbackNotificationHistoryV1"
};

const defaultCrmClients = [];
const defaultCrmTasks = [];
const defaultCrmOpportunities = [];
const defaultCrmContacts = [];
const defaultCrmActivities = [];

const defaultCrmData = {
  [crmKeys.clients]: defaultCrmClients,
  [crmKeys.tasks]: defaultCrmTasks,
  [crmKeys.opportunities]: defaultCrmOpportunities,
  [crmKeys.contacts]: defaultCrmContacts,
  [crmKeys.activities]: defaultCrmActivities
};

if (scheduleDate) {
  scheduleDate.min = new Date().toISOString().slice(0, 10);
}

function readCrmList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    writeCrmList(key, []);
    return [];
  }
}

function writeCrmList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function sendNotificationEmail(subject, lines) {
  const body = [
    "Silverback Consulting Website Notification",
    "",
    ...lines,
    "",
    "This notification was generated from the Silverback website.",
    "Automated delivery is handled through the configured Azure notification service."
  ].join("\n");
  const mailto = `mailto:${notificationEmails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function appendNotificationHistory(records) {
  const current = readCrmList(crmKeys.notificationHistory);
  writeCrmList(crmKeys.notificationHistory, [...records, ...current].slice(0, 250));
}

function appointmentPayload(eventType, appointment) {
  return {
    eventId: `appt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    eventType,
    appointmentId: appointment.appointmentId,
    clientName: appointment.clientName,
    contactName: appointment.name,
    contactEmail: appointment.email,
    contactPhone: appointment.phone,
    date: appointment.date,
    time: appointment.time,
    notes: appointment.notes,
    recipients: notificationEmails,
    requestedAt: new Date().toISOString(),
    source: "Silverback website consultation form"
  };
}

function localNotificationRows(payload, status, detail = "") {
  return payload.recipients.map((recipient) => ({
    id: `${payload.eventId}-${recipient}-${payload.eventType}`,
    eventId: payload.eventId,
    eventType: payload.eventType,
    recipient,
    client: payload.clientName,
    contact: payload.contactName,
    appointmentId: payload.appointmentId,
    appointmentDate: payload.date,
    appointmentTime: payload.time,
    status,
    attempts: status === "Retry Scheduled" ? 1 : 0,
    timestamp: new Date().toISOString(),
    detail,
    source: payload.source
  }));
}

async function queueAppointmentNotification(eventType, appointment) {
  const payload = appointmentPayload(eventType, appointment);
  appendNotificationHistory(localNotificationRows(payload, "Queued", "Waiting for Azure email queue pickup."));
  try {
    const response = await fetch("/api/appointments/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Azure notification endpoint returned ${response.status}`);
    appendNotificationHistory(localNotificationRows(payload, "Sent", "Accepted by Azure notification queue."));
    return { queued: true, cloud: true };
  } catch (error) {
    appendNotificationHistory(localNotificationRows(payload, "Queued Locally", "Azure endpoint is not active in local preview; event stored for HQ visibility."));
    console.info("Silverback notification queued locally:", error.message);
    return { queued: true, cloud: false };
  }
}

function ensureClient(clientName, details = {}) {
  const clients = readCrmList(crmKeys.clients);
  const exists = clients.some((client) => client.clientName === clientName);
  if (!exists) {
    clients.push({
      clientName,
      businessType: details.businessType || "Investor / Prospect",
      currentPhase: details.currentPhase || "Foundation",
      status: details.status || "Lead",
      monthlyRevenue: "",
      monthlyProfit: "",
      biggestProblem: details.biggestProblem || "",
      currentProject: details.currentProject || "",
      nextAction: details.nextAction || "Follow up",
      lastContact: today(),
      googleDriveLink: "",
      assessment: ""
    });
    writeCrmList(crmKeys.clients, clients);
  }
}

function addCrmRecord(key, record) {
  writeCrmList(key, [...readCrmList(key), record]);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }
});

function openModal(section, trigger) {
  if (!section) return;
  closeChat(false);
  lastModalTrigger = trigger;
  section.hidden = false;
  section.setAttribute("aria-hidden", "false");
  section.classList.add("is-open");
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => section.querySelector("form input, form select, form textarea")?.focus());
}

function closeModal(section) {
  if (!section) return;
  section.classList.remove("is-open");
  section.hidden = true;
  section.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastModalTrigger?.focus();
  lastModalTrigger = null;
}

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    serviceCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");

    if (serviceSelect) {
      serviceSelect.value = card.dataset.service;
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name") || "there";
  const service = formData.get("service") || "consulting";

  sendNotificationEmail("New Silverback Website Request", [
    `Name: ${name}`,
    `Service Interest: ${service}`,
    "Source: Website contact form"
  ]);

  formStatus.textContent = `Thanks, ${name}. Your request has been captured for ${service}. An email notification has been prepared for Michael and Aida.`;
  contactForm.reset();
});

investorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(investorForm);
  const name = formData.get("investorName") || "there";
  const interest = formData.get("investmentInterest") || "future investment opportunities";
  const email = formData.get("investorEmail") || "";
  const phone = formData.get("investorPhone") || "";
  const range = formData.get("investmentRange") || "";
  const timeline = formData.get("timeline") || "";
  const investorType = formData.get("investorType") || "Investor";
  const clientName = `Investor Lead - ${name}`;

  ensureClient(clientName, {
    businessType: investorType,
    currentProject: interest,
    nextAction: `Investor follow-up: ${timeline}`,
    biggestProblem: `Investment range: ${range}`
  });
  addCrmRecord(crmKeys.contacts, { name, client: clientName, role: investorType, email, phone, type: "Investor" });
  addCrmRecord(crmKeys.opportunities, { name: `${interest} - ${name}`, client: clientName, stage: "New Lead", value: "", closeDate: "" });
  addCrmRecord(crmKeys.activities, {
    client: clientName,
    type: "Investor Intake",
    date: today(),
    summary: `${name} submitted investor interest for ${interest}. Range: ${range}.`,
    nextStep: "Review intake and schedule investor follow-up."
  });
  addCrmRecord(crmKeys.tasks, {
    task: `Follow up with investor ${name}`,
    client: clientName,
    priority: "High",
    status: "Not Started",
    dueDate: today(),
    category: "Sales",
    notes: `Preferred follow-up: ${formData.get("followUp") || "Email"}`
  });

  sendNotificationEmail("New Future Investor Intake", [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Investor Type: ${investorType}`,
    `Investment Interest: ${interest}`,
    `Investment Range: ${range}`,
    `Timeline: ${timeline}`,
    `Preferred Follow-Up: ${formData.get("followUp") || "Email"}`,
    `Goals: ${formData.get("investorGoals") || "Not provided"}`
  ]);

  investorStatus.textContent = `Thanks, ${name}. Your investor intake for ${interest} has been captured in Silverback HQ and an email notification has been prepared.`;
  investorForm.reset();
});

investorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(investorSection, link);
  });
});

investorClose?.addEventListener("click", () => {
  closeModal(investorSection);
});

investorSection?.addEventListener("click", (event) => {
  if (event.target === investorSection) {
    closeModal(investorSection);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && investorSection && !investorSection.hidden) {
    closeModal(investorSection);
  }

  if (event.key === "Escape" && scheduleSection && !scheduleSection.hidden) {
    closeModal(scheduleSection);
  }
});

scheduleLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(scheduleSection, link);
  });
});

scheduleClose?.addEventListener("click", () => {
  closeModal(scheduleSection);
});

scheduleSection?.addEventListener("click", (event) => {
  if (event.target === scheduleSection) {
    closeModal(scheduleSection);
  }
});

scheduleForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(scheduleForm);
  const name = formData.get("scheduleName") || "there";
  const date = formData.get("meetingDate");
  const time = formData.get("meetingTime");
  const email = formData.get("scheduleEmail") || "";
  const phone = formData.get("schedulePhone") || "";
  const notes = formData.get("meetingNotes") || "";
  const clientName = `Consultation Lead - ${name}`;
  const appointmentId = `appt-${Date.now()}`;

  ensureClient(clientName, {
    businessType: "Consultation Prospect",
    currentProject: "Initial consultation",
    nextAction: `Consultation requested for ${date} at ${time}`,
    biggestProblem: notes
  });
  addCrmRecord(crmKeys.contacts, { name, client: clientName, role: "Consultation Request", email, phone, type: "Decision Maker" });
  addCrmRecord(crmKeys.activities, {
    client: clientName,
    type: "Meeting",
    date,
    summary: `${name} requested a one-hour consultation at ${time}. ${notes}`,
    nextStep: "Confirm meeting and send calendar invite."
  });
  addCrmRecord(crmKeys.tasks, {
    task: `Confirm consultation with ${name}`,
    client: clientName,
    priority: "High",
    status: "Not Started",
    dueDate: date,
    category: "Sales",
    notes: `Requested time: ${time}`
  });

  const appointment = { appointmentId, clientName, name, email, phone, date, time, notes };
  const bookingResult = await queueAppointmentNotification("appointment.booked", appointment);
  await queueAppointmentNotification("appointment.reminder.scheduled", appointment);

  scheduleStatus.textContent = bookingResult.cloud
    ? `Thanks, ${name}. Your consultation request for ${date} at ${time} has been captured and queued for Aida and Michael.`
    : `Thanks, ${name}. Your consultation request for ${date} at ${time} has been captured. The Azure email queue is not active in local preview, so the event is stored in HQ notification history.`;
  scheduleForm.reset();
});

const revealItems = document.querySelectorAll(
  ".focus-grid article, .results-grid article, .industries-grid span, .leader-card, .card-grid article, .closing-cta > div"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("reveal-ready"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const chatWidget = document.querySelector("[data-chat-widget]");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatClose = document.querySelector("[data-chat-close]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = chatForm?.querySelector("input");
const chatPrompts = document.querySelectorAll("[data-chat-prompt]");
const chatHistoryKey = "silverbackAssistantHistoryV1";

const chatLeadFlow = {
  active: false,
  step: 0,
  data: {},
  fields: [
    { key: "name", question: "Perfect. What is your full name?" },
    { key: "email", question: "What email should the Silverback team use for follow-up?" },
    { key: "phone", question: "What phone number should they use if a call is better?" },
    { key: "company", question: "What company or organization are you with?" },
    { key: "need", question: "What do you need help with most: starting the business, organizing operations, understanding the numbers, marketing, growth, leadership, or investing?" },
    { key: "timeline", question: "What timeline are you working with?" }
  ]
};

function getStoredChat() {
  try {
    return JSON.parse(localStorage.getItem(chatHistoryKey)) || [];
  } catch {
    localStorage.removeItem(chatHistoryKey);
    return [];
  }
}

function storeChatMessage(role, text) {
  const history = [...getStoredChat(), { role, text, date: new Date().toISOString() }].slice(-18);
  localStorage.setItem(chatHistoryKey, JSON.stringify(history));
}

function addChatMessage(role, text, shouldStore = true) {
  if (!chatMessages) return;
  const message = document.createElement("div");
  message.className = `ai-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (shouldStore) {
    storeChatMessage(role, text);
  }
}

function openChat() {
  if (!chatPanel) return;
  chatPanel.hidden = false;
  chatToggle?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => chatInput?.focus());
}

function closeChat(restoreFocus = true) {
  if (!chatPanel) return;
  chatPanel.hidden = true;
  chatToggle?.setAttribute("aria-expanded", "false");
  if (restoreFocus) {
    chatToggle?.focus();
  }
}

function startLeadFlow() {
  chatLeadFlow.active = true;
  chatLeadFlow.step = 0;
  chatLeadFlow.data = {};
  addChatMessage("bot", "I can capture your info and place it into Silverback HQ as a new lead.");
  addChatMessage("bot", chatLeadFlow.fields[0].question);
}

function finishLeadFlow() {
  const lead = chatLeadFlow.data;
  const clientName = `Chat Lead - ${lead.name || "Website Visitor"}`;
  const email = lead.email || "";
  const phone = lead.phone || "";

  ensureClient(clientName, {
    businessType: lead.company || "Website Lead",
    currentProject: lead.need || "Discovery conversation",
    nextAction: `Follow up from AI chat. Timeline: ${lead.timeline || "Not specified"}`,
    biggestProblem: lead.need || ""
  });
  addCrmRecord(crmKeys.contacts, {
    name: lead.name || "Website Visitor",
    client: clientName,
    role: "AI Chat Lead",
    email,
    phone,
    type: "Prospect"
  });
  addCrmRecord(crmKeys.activities, {
    client: clientName,
    type: "AI Chat",
    date: today(),
    summary: `${lead.name || "A visitor"} used the AI assistant. Need: ${lead.need || "Not specified"}. Company: ${lead.company || "Not specified"}.`,
    nextStep: "Review chat lead and respond with recommended next step."
  });
  addCrmRecord(crmKeys.tasks, {
    task: `Follow up with AI chat lead ${lead.name || "Website Visitor"}`,
    client: clientName,
    priority: "High",
    status: "Not Started",
    dueDate: today(),
    category: "Sales",
    notes: `Email: ${email}. Phone: ${phone}. Timeline: ${lead.timeline || "Not specified"}.`
  });

  sendNotificationEmail("New AI Website Lead", [
    `Name: ${lead.name || "Website Visitor"}`,
    `Email: ${lead.email || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Company: ${lead.company || "Not provided"}`,
    `Need: ${lead.need || "Not specified"}`,
    `Timeline: ${lead.timeline || "Not specified"}`,
    "Source: Silverback AI chat"
  ]);

  chatLeadFlow.active = false;
  addChatMessage("bot", `Thanks, ${lead.name || "there"}. I captured this in Silverback HQ as a new lead and prepared an email notification for Michael and Aida.`);
}

function handleLeadAnswer(text) {
  const currentField = chatLeadFlow.fields[chatLeadFlow.step];
  chatLeadFlow.data[currentField.key] = text;
  chatLeadFlow.step += 1;

  if (chatLeadFlow.step >= chatLeadFlow.fields.length) {
    finishLeadFlow();
    return;
  }

  addChatMessage("bot", chatLeadFlow.fields[chatLeadFlow.step].question);
}

function answerChat(text) {
  const normalized = text.toLowerCase();

  if (chatLeadFlow.active) {
    handleLeadAnswer(text);
    return;
  }

  if (normalized.includes("lead") || normalized.includes("capture") || normalized.includes("contact me") || normalized.includes("my info")) {
    startLeadFlow();
    return;
  }

  if (normalized.includes("invest")) {
    addChatMessage("bot", "For future investors, I can open the investor intake form and the submission will be saved into Silverback HQ.");
    openModal(investorSection, chatToggle);
    return;
  }

  if (normalized.includes("schedule") || normalized.includes("consult") || normalized.includes("meeting") || normalized.includes("appointment")) {
    addChatMessage("bot", "I opened the consultation form. Pick a date and a one-hour slot between 10:00 AM and 4:00 PM, and it will be logged inside Silverback HQ.");
    openModal(scheduleSection, chatToggle);
    return;
  }

  if (normalized.includes("service") || normalized.includes("offer") || normalized.includes("do you do")) {
    addChatMessage("bot", "Silverback services fit into three core categories: Foundation, Growth, and Scale. Foundation covers startup setup like LLC, EIN, permits, business structure, banking guidance, and launch roadmaps. Growth covers marketing, brand development, customer retention, referrals, sales process, pricing, and revenue planning. Scale covers SOPs, operations, financial organization, KPIs, leadership accountability, and systems for more consistent execution.");
    return;
  }

  if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("fee")) {
    addChatMessage("bot", "Pricing depends on whether the business needs Foundation, Growth, Scale, or a combination of support areas. The best next step is a consultation so the team can understand the business stage, biggest problem, and recommended roadmap.");
    return;
  }

  if (normalized.includes("crm") || normalized.includes("hq") || normalized.includes("dashboard")) {
    addChatMessage("bot", "Silverback HQ is the internal operating CRM. It tracks clients, leads, tasks, activities, assessments, SOPs, marketing work, and pipeline information from this website.");
    return;
  }

  if (normalized.includes("portal") || normalized.includes("client dashboard") || normalized.includes("invoice") || normalized.includes("payment") || normalized.includes("docusign") || normalized.includes("document") || normalized.includes("plaid") || normalized.includes("bank")) {
    addChatMessage("bot", "The Silverback Client Portal lets clients view their current phase, next actions, messages, documents, e-signature items, invoices, statements, payment options, and Plaid-style bank connection status. In production, this would connect to Azure login, DocuSign, Stripe or PayPal, Plaid, and Silverback HQ.");
    return;
  }

  if (normalized.includes("industry") || normalized.includes("industries")) {
    addChatMessage("bot", "Silverback is built for new business owners, startups, service businesses, local operators, growing teams, and owners who need more structure, accountability, customers, or financial clarity.");
    return;
  }

  if (normalized.includes("aida") || normalized.includes("michael") || normalized.includes("founder") || normalized.includes("leadership")) {
    addChatMessage("bot", "Silverback is led by Aida Morales, Founder and CEO, and Michael Cocom, Co-Founder and Managing Partner. The leadership section explains their strategy, finance, and execution focus.");
    return;
  }

  addChatMessage("bot", "I can help with Foundation, Growth, Scale, business startup support, operations, financial organization, marketing, leadership, scheduling, investor intake, the client portal, or capturing you as a lead. Try asking: 'What services do you offer?' or 'What is in the client portal?'");
}

if (chatMessages) {
  const existingChat = getStoredChat();
  if (existingChat.length) {
    existingChat.forEach((message) => addChatMessage(message.role, message.text, false));
  } else {
    addChatMessage("bot", "Hi, I am Silverback AI. I can explain Foundation, Growth, and Scale services, guide visitors to the right support area, explain the client portal, open investor or schedule forms, and capture leads into Silverback HQ.", true);
  }
}

chatToggle?.addEventListener("click", () => {
  if (chatPanel?.hidden) {
    openChat();
  } else {
    closeChat();
  }
});

chatClose?.addEventListener("click", closeChat);

chatPrompts.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.chatPrompt || "";
    if (!prompt) return;
    addChatMessage("user", prompt);
    answerChat(prompt);
  });
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage("user", message);
  chatInput.value = "";
  answerChat(message);
});
