const inputButton = document.getElementById("input-button");
var myLeads = [];
const input = document.getElementById("input");
const list = document.getElementById("list");
const deleteButton = document.getElementById("delete-button");
const saveTabButton = document.getElementById("save-tab-button");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

saveTabButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

inputButton.addEventListener("click", function() {
    myLeads.push(input.value)
    input.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
})

deleteButton.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

function renderLeads(leads) {

    let listItems = ""
    for(let i = 0; i<leads.length; i++) {
        
        //listItems+= "<li><a target = '_blank' href = '"+ myLeads[i] + "'>" + myLeads[i] +"</a></li>"
        listItems+= `<li><a target = '_blank' href = '${leads[i]}'>${leads[i]}</a></li>`
    }
    
    list.innerHTML = listItems
}



