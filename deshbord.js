const container = document.getElementById("issue-container");

const issues = [
{
title:"Login bug",
description:"User cannot login",
status:"open",
author:"Admin"
},
{
title:"Notification problem",
description:"Notification not showing",
status:"closed",
author:"Github"
}
];

function displayIssues(){

container.innerHTML="";

issues.forEach(issue => {

const div = document.createElement("div");

div.classList="bg-white p-4 rounded shadow";

div.innerHTML = `
<h2 class="font-bold text-lg">${issue.title}</h2>
<p class="text-gray-500">${issue.description}</p>
<p>Status: ${issue.status}</p>
<p>Author: ${issue.author}</p>
`;

container.appendChild(div);

});

}

displayIssues();