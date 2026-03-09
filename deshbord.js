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
   div.className = `bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer ${borderColor}`;
    div.innerHTML = `
      <div class="flex justify-between items-center mb-2">

<span class="text-xs font-bold px-3 py-1 rounded-full
${issue.priority === "high" ? "bg-red-100 text-red-500" : ""}
${issue.priority === "medium" ? "bg-yellow-100 text-yellow-600" : ""}
${issue.priority === "low" ? "bg-gray-200 text-gray-600" : ""}">
${issue.priority.toUpperCase()}
</span>
</div>
<h2 class="font-semibold text-md mb-2">${issue.title}</h2>
<p class="text-gray-500 text-sm mb-3">${issue.description.slice(0,80)}...</p>
<div class="flex gap-2 mb-3">
<span class="text-xs px-2 py-1 rounded bg-red-100 text-red-500">BUG</span>
<span class="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-600">HELP WANTED</span>
</div>
<p class="text-xs text-gray-400">#${issue.id} by ${issue.author}</p>
<p class="text-xs text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
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
function setActiveTab(tabId){

const tabs = ["allTab","openTab","closedTab"];

tabs.forEach(id=>{
const tab = document.getElementById(id);
tab.classList.remove("btn-primary");
});

document.getElementById(tabId).classList.add("btn-primary");

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