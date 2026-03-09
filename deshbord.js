const container = document.getElementById("issue-container");
let allIssues = [];

// spinner control
function toggleSpinner(show) {
  const spinner = document.getElementById("spinner");
  if (show) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

// load issues from API
async function loadIssues() {
  toggleSpinner(true);
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssues = data.data;
  displayIssues(allIssues);
  toggleSpinner(false);
}

// display issues
function displayIssues(issues) {
  container.innerHTML = "";
  issues.forEach(issue => {
    const div = document.createElement("div");
    let borderColor = "border-t-4 border-green-500";
    if (issue.status === "closed") {
      borderColor = "border-t-4 border-purple-500";
    }
    div.className = `bg-white p-4 rounded shadow cursor-pointer ${borderColor}`;
    div.innerHTML = `
      <h2 class="font-bold text-lg mb-2">${issue.title}</h2>
      <p class="text-gray-500 mb-2">
        ${issue.description}
      </p>
      <p><b>Status:</b> ${issue.status}</p>
      <p><b>Author:</b> ${issue.author}</p>
      <p><b>Priority:</b> ${issue.priority}</p>
      <p><b>Label:</b> ${issue.label}</p>
      <p class="text-sm text-gray-400">
        ${issue.createdAt}
      </p>
    `;

    // modal open
    div.addEventListener("click", () => {
      openModal(issue);
    });
    container.appendChild(div);
  });
}

// modal open
function openModal(issue) {
  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDescription").innerText = issue.description;
  document.getElementById("modalStatus").innerText = "Status: " + issue.status;
  document.getElementById("modalAuthor").innerText = "Author: " + issue.author;
  document.getElementById("modalPriority").innerText = "Priority: " + issue.priority;
  document.getElementById("modalLabel").innerText = "Label: " + issue.label;
  document.getElementById("issueModal").showModal();
}

// active tab
function setActiveTab(tabId) {
  document.getElementById("allTab").classList.remove("tab-active");
  document.getElementById("openTab").classList.remove("tab-active");
  document.getElementById("closedTab").classList.remove("tab-active");
  document.getElementById(tabId).classList.add("tab-active");
}

// tab events
document.getElementById("allTab").addEventListener("click", () => {
  setActiveTab("allTab");
  displayIssues(allIssues);
});

document.getElementById("openTab").addEventListener("click", () => {
  setActiveTab("openTab");
  const openIssues = allIssues.filter(issue => issue.status === "open");
  displayIssues(openIssues);
});

document.getElementById("closedTab").addEventListener("click", () => {
  setActiveTab("closedTab");
  const closedIssues = allIssues.filter(issue => issue.status === "closed");
  displayIssues(closedIssues);
});

// load API on page start
loadIssues();
document.getElementById("searchBtn").addEventListener("click", searchIssues);
async function searchIssues(){
const text = document.getElementById("searchInput").value;
if(text === ""){
displayIssues(allIssues);
return;
}
toggleSpinner(true);

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
const data = await res.json();
displayIssues(data.data);
toggleSpinner(false);
}
document.getElementById("searchInput").addEventListener("keyup", function(event){
  if(event.key === "Enter"){
    searchIssues();
  }
});