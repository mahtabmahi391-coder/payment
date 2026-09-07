// EDIT YOUR REAL INFO HERE
let siteConfig = {
    name: "Mahtab Hussain Mahi",
    phone: "01765671029",
    email: "mahtabmahi391@gmail.com"
};

let accounts = [
    { id: "bkash", name: "bKash", type: "Personal", holder: "Mahtab Hussain Mahi", number: "01765671029" },
    { id: "nagad", name: "Nagad", type: "Personal", holder: "Mahtab Hussain Mahi", number: "01765671029" }
];

// Load local changes if they exist
const savedConfig = localStorage.getItem('siteConfig');
const savedAccounts = localStorage.getItem('accounts');
if (savedConfig) siteConfig = JSON.parse(savedConfig);
if (savedAccounts) accounts = JSON.parse(savedAccounts);

function renderAll() {
    document.getElementById('display-name').innerText = siteConfig.name;
    const container = document.getElementById('accounts-container');
    container.innerHTML = accounts.map((acc, index) => `
        <div class="card">
            <div class="card-header"><span class="method-name">${acc.name}</span></div>
            <div class="info-group"><span class="label">Number</span><span class="value">${acc.number}</span></div>
            <button class="btn btn-cyan" style="width:100%" onclick="copyText('${acc.number}', this)">Copy Number</button>
        </div>
    `).join('');
}

// THE FUNCTION YOU ARE CALLING
function toggleEditMode() {
    console.log("Admin mode clicked");
    alert("Admin Mode Opening..."); // This proves the button works!
    
    const modal = document.getElementById('edit-modal');
    const fieldsDiv = document.getElementById('edit-fields');
    
    fieldsDiv.innerHTML = `
        <div class="edit-input-group"><label>Name</label><input id="edit-name" value="${siteConfig.name}"></div>
        ${accounts.map((acc, i) => `
            <div class="edit-input-group"><label>${acc.name}</label><input class="acc-input" data-index="${i}" value="${acc.number}"></div>
        `).join('')}
    `;
    modal.style.display = "flex";
}

function saveEdits() {
    siteConfig.name = document.getElementById('edit-name').value;
    document.querySelectorAll('.acc-input').forEach(input => {
        const index = input.getAttribute('data-index');
        accounts[index].number = input.value;
    });
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
    localStorage.setItem('accounts', JSON.stringify(accounts));
    location.reload(); // Refresh the page to show changes
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = "none";
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text);
    btn.innerText = "✓ Copied";
    setTimeout(() => { btn.innerText = "Copy Number"; }, 2000);
}

renderAll();
