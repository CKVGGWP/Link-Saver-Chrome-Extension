let myLeads = [];
const inputBTN = document.getElementById("input-btn");
const saveTab = document.getElementById("save-tab");
const deleteBTN = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const uLeads = document.getElementById("myLeads");
const leadsfromLocalStrorage = JSON.parse(localStorage.getItem("myLeads"));

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li> 
        <a target = '_blank' href = '${leads[i]}'> ${leads[i]}</a> 
        </li>`;
  }
  uLeads.innerHTML = listItems;
}

if (leadsfromLocalStrorage) {
  myLeads = leadsfromLocalStrorage;
  render(myLeads);
}

inputBTN.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
});

saveTab.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
  });
});

deleteBTN.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];

  render(myLeads);
});
