const organizations = [
  {
    id: "ORG-3221",
    name: "Helping Hands Initiative",
    submitted: {
      "Organization Name": "Helping Hands Initiative",
      Address: "18 Idowu Taylor Street, Victoria Island, Lagos",
      "CAC Reg Number": "RC-902144",
      "Contact Email": "compliance@helpinghands.ng",
    },
    cac: {
      "Registered Name": "Helping Hands Initiative",
      "Registered Address": "18 Idowu Taylor Street, Victoria Island, Lagos",
      "CAC Number": "RC-902144",
      "Date of Registration": "2021-03-11",
    },
    status: "pending",
  },
  {
    id: "ORG-3215",
    name: "Clean Earth Foundation",
    submitted: {
      "Organization Name": "Clean Earth Foundation",
      Address: "5 Murtala Muhammed Way, Kano",
      "CAC Reg Number": "RC-773018",
      "Contact Email": "admin@cleanearth.org",
    },
    cac: {
      "Registered Name": "Clean Earth Foundation",
      "Registered Address": "5 Murtala Muhammed Way, Kano",
      "CAC Number": "RC-773018",
      "Date of Registration": "2019-08-22",
    },
    status: "approved",
  },
  {
    id: "ORG-3209",
    name: "Future Skills Trust",
    submitted: {
      "Organization Name": "Future Skills Trust",
      Address: "41 Circular Road, Port Harcourt",
      "CAC Reg Number": "RC-667145",
      "Contact Email": "ops@futureskills.org",
    },
    cac: {
      "Registered Name": "Future Skillz Trust",
      "Registered Address": "41 Circular Road, Port Harcourt",
      "CAC Number": "RC-667145",
      "Date of Registration": "2018-01-05",
    },
    status: "flagged",
  },
];

const state = { selectedId: organizations[0].id };

const list = document.getElementById("organization-list");
const submittedInfo = document.getElementById("submitted-info");
const cacInfo = document.getElementById("cac-info");
const orgName = document.getElementById("org-name");
const orgStatus = document.getElementById("org-status");
const notes = document.getElementById("review-notes");

function toStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function renderInfo(container, data) {
  container.innerHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = value;
    container.append(dt, dd);
  });
}

function renderList() {
  list.innerHTML = "";
  organizations.forEach((org) => {
    const li = document.createElement("li");
    li.className = `org-item${org.id === state.selectedId ? " active" : ""}`;
    li.innerHTML = `<strong>${org.name}</strong><small>${org.id} · ${toStatusLabel(org.status)}</small>`;
    li.addEventListener("click", () => {
      state.selectedId = org.id;
      render();
    });
    list.appendChild(li);
  });
}

function renderDetails() {
  const activeOrg = organizations.find((org) => org.id === state.selectedId);
  if (!activeOrg) {
    return;
  }

  orgName.textContent = activeOrg.name;
  orgStatus.textContent = toStatusLabel(activeOrg.status);
  orgStatus.className = `status ${activeOrg.status === "pending" ? "status--pending" : "status--" + activeOrg.status}`;
  renderInfo(submittedInfo, activeOrg.submitted);
  renderInfo(cacInfo, activeOrg.cac);
}

function updateStatus(status) {
  const activeOrg = organizations.find((org) => org.id === state.selectedId);
  if (!activeOrg) {
    return;
  }
  activeOrg.status = status;
  const current = notes.value.trim();
  if (current) {
    notes.value = `${new Date().toLocaleDateString()} · ${toStatusLabel(status)}\n${current}`;
  }
  render();
}

document.getElementById("approve-btn").addEventListener("click", () => updateStatus("approved"));
document.getElementById("flag-btn").addEventListener("click", () => updateStatus("flagged"));

function render() {
  renderList();
  renderDetails();
}

render();
