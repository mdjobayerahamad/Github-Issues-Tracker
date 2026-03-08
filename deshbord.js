const container = document.getElementById("issue-container");

async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

displayIssues(data.data);

}

function displayIssues(issues){

container.innerHTML = "";

issues.forEach(issue => {

const div = document.createElement("div");

let borderColor = "border-t-4 border-green-500";

if(issue.status === "closed"){
borderColor = "border-t-4 border-purple-500";
}

div.className = `bg-white p-4 rounded shadow ${borderColor}`;

div.innerHTML = `

<h2 class="font-bold text-lg mb-2">
${issue.title}
</h2>

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

container.appendChild(div);

});

}

loadIssues();