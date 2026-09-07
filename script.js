// DEFAULT DATA
let siteConfig = {
    name: "Mahtab Hussain Mahi",
    phone: "01765671029"
};

let accounts = [
    { id: "bkash", name: "bKash", type: "Personal", holder: "Mahtab Hussain Mahi", number: "01765671029" },
    { id: "nagad", name: "Nagad", type: "Personal", holder: "Mahtab Hussain Mahi", number: "01765671029" }
];

// 1. Try to load saved data from the phone's memory
try {
    const savedConfig = localStorage.getItem('siteConfig');
    const savedAccounts = localStorage.getItem('accounts');
    if (savedConfig) siteConfig = JSON.parse(savedConfig);
    if (savedAccounts) accounts = JSON.parse(savedAccounts);
} catch (e) {
    console.log("Memory empty, using defaults");
}

// 2. Function to show the cards on the screen
function renderAll() {
    // Set the name
    document.getElementById('display-name').innerText = siteConfig.name;
    
    // Set the cards
    const container = document.getElementById('accounts-container');
    if (container) {
        container.innerHTML = accounts.map((acc, index) => `
            <div class="card">
                <div class="card-header">
                    <span class="method-name">${acc.name}</span>
                    <span class="method-type">${acc.type}</span>
                </div>
                <div class="info-group">
                    <span class="label">Account Name</span>
                    <span class="value">${acc.holder}</span>
                </div>
                <div class="info-group">
                    <span class="label">Number</span>
                    <span class="value">${acc.number}</span>
                </div>
                <button class="btn btn-cyan" style="width:100%" onclick="copyText('${acc.number}', this)">
                    Copy Number
                </button>
            </div>
        `).join('');
    }
}

// 3. Admin Mode Logic
function toggleEditMode() {
    const modal = document.getElementById('edit-modal');
    const fieldsDiv = document.getElementById('edit-fields');
    
    fieldsDiv.innerHTML = `
        <div class="edit-input-group">
            <label>Display Name</label>
            <input id="edit-name" value="${siteConfig.name}">
        </div>
        ${accounts.map((acc, i) => `
            <div class="edit-input-group" style="border-top:1px solid #eee; padding-top:10px;">
                <label>${acc.name} Number</label>
                <input class="acc-input" data-index="${i}" value="${acc.number}">
            </div>
        `).join('')}
    `;
    modal.style.display = "flex";
}

function saveEdits() {
    siteConfig.name = document.getElementById('edit-name').value;
    const inputs = document.querySelectorAll('.acc-input');
    inputs.forEach(input => {
        const idx = input.getAttribute('data-index');
        accounts[idx].number = input.value;
    });

    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    alert("Saved! Refreshing...");
    location.reload();
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = "none";
}

// 4. Utility Functions
function copyText(text, btn) {
    navigator.clipboard.writeText(text);
    const old = btn.innerText;
    btn.innerText = "✓ Copied";
    setTimeout(() => { btn.innerText = old; }, 2000);
}

// START THE APP
renderAll();

// Share Button Logic
document.getElementById('share-btn').onclick = () => {
    if (navigator.share) {
        navigator.share({ title: siteConfig.name, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }
};    const fieldsDiv = document.getElementById('edit-fields');
    
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
