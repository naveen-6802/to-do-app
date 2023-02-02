
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

let currentURL = window.location.href;
let checkChromeInstallation = currentURL.includes("chrome");


inputEl.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    inputBtn.click();
  }
});

function remove(item) {
  	myLeads.splice(item,1);
	localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads()
}

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `<li>${myLeads[i]} <span id='delete' onclick='remove(${myLeads.indexOf(myLeads[i])})'><i class="fa fa-trash"></i></span></li>`;
    }
    ulEl.innerHTML = listItems
}


if (checkChromeInstallation) {
    document.querySelector(".tooltiptext").textContent = "You cannot delete items one-by-one on extension because of Content Security Policy";
    document.querySelector(".tooltiptext").style.fontSize = "10px";
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    renderLeads()
})

inputBtn.addEventListener("click", function() {
	if(inputEl.value === "") {

	}
	else {
		myLeads.push(inputEl.value)	
	}
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads()
})