// ========================================
// DEFAULT DATA
// ========================================
let siteConfig = {
    name: "Mahtab Hussain Mahi",
    whatsapp: "+8801765671029",
    phone: "01765671029",
    email: "mahtabmahi391@gmail.com"
};

let accounts = [
    {
        id: "bkash",
        name: "bKash",
        type: "Personal",
        holder: "Mahtab Hussain Mahi",
        number: "01765671029",
        qr: "images/qr/bkash.png"
    },
    {
        id: "nagad",
        name: "Nagad",
        type: "Personal",
        holder: "Mahtab Hussain Mahi",
        number: "01765671029",
        qr: "images/qr/nagad.png"
    }
];

// ========================================
// CORE LOGIC
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Load data from phone memory if it exists
    const savedConfig = localStorage.getItem('siteConfig');
    const savedAccounts = localStorage.getItem('accounts');
    
    if (savedConfig) siteConfig = JSON.parse(savedConfig);
    if (savedAccounts) accounts = JSON.parse(savedAccounts);

    renderAll();
});

function renderAll() {
    document.getElementById('display-name').innerText = siteConfig.name;
    renderAccounts();
    renderContact();
}

function renderAccounts() {
    const container = document.getElementById('accounts-container');
    container.innerHTML = accounts.map(acc => `
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
            <div class="button-grid">
                <button class="btn btn-cyan" onclick="copyText('${acc.number}', this)">Copy Number</button>
                <button class="btn btn-outline" onclick="copyDetails('${acc.id}')">Copy Details</button>
                ${acc.qr ? `<button class="btn btn-outline" style="grid-column: span 2;" onclick="openQR('${acc.qr}', '${acc.name}')">Show QR Code</button>` : ''}
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const contactBox = document.getElementById('contact-info');
    contactBox.innerHTML = `
        <h2>Need help?</h2>
        <a href="tel:${siteConfig.phone}" class="contact-item"><span>Phone:</span> ${siteConfig.phone}</a>
        <a href="mailto:${siteConfig.email}" class="contact-item"><span>Email:</span> ${siteConfig.email}</a>
    `;
}

// ========================================
// EDIT MODE FUNCTIONS
// ========================================

function toggleEditMode() {
    const modal = document.getElementById('edit-modal');
    const fieldsDiv = document.getElementById('edit-fields');
    
    // Create inputs for the Config
    let html = `<h3>Profile</h3>`;
    html += `<div class="edit-input-group"><label>Your Name</label><input id="edit-name" value="${siteConfig.name}"></div>`;
    
    // Create inputs for each Account
    html += `<h3>Accounts</h3>`;
    accounts.forEach((acc, index) => {
        html += `
            <div style="border:1px solid #eee; padding:10px; border-radius:10px; margin-bottom:10px;">
                <div class="edit-input-group"><label>${acc.name} Number</label>
                <input class="acc-num-input" data-index="${index}" value="${acc.number}"></div>
            </div>
        `;
    });

    fieldsDiv.innerHTML = html;
    modal.style.display = "flex";
}

function saveEdits() {
    // Get new name
    siteConfig.name = document.getElementById('edit-name').value;
    
    // Get new numbers
    const numInputs = document.querySelectorAll('.acc-num-input');
    numInputs.forEach(input => {
        const index = input.getAttribute('data-index');
        accounts[index].number = input.value;
    });

    // Save to device memory (LocalStorage)
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
    localStorage.setItem('accounts', JSON.stringify(accounts));

    renderAll();
    closeEditModal();
    showToast("Saved to your device!");
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = "none";
}

// ========================================
// UTILS (Copy, Toast, QR)
// ========================================

window.copyText = (text, btn) => {
    navigator.clipboard.writeText(text).then(() => {
        const oldText = btn.innerText;
        btn.innerText = "✓ Copied";
        showToast();
        setTimeout(() => { btn.innerText = oldText; }, 2000);
    });
};

window.copyDetails = (id) => {
    const acc = accounts.find(a => a.id === id);
    const text = `${acc.holder}\n${acc.name}\nNumber: ${acc.number}`;
    navigator.clipboard.writeText(text).then(() => showToast("Details Copied"));
};

function showToast(msg = "Copied to clipboard") {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = "toast"; }, 3000);
}

window.openQR = (img, name) => {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-img').src = img;
    document.getElementById('qr-modal').style.display = "flex";
};

// Share Link
document.getElementById('share-btn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({ title: siteConfig.name, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast("Link Copied");
    }
});    }
];

// ========================================
// DO NOT EDIT BELOW THIS LINE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderAccounts();
    renderContact();
    setupEventListeners();
    registerServiceWorker();
});

function renderAccounts() {
    const container = document.getElementById('accounts-container');
    container.innerHTML = accounts.map(acc => `
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

            ${acc.branch ? `
            <div class="info-group">
                <span class="label">Branch</span>
                <span class="value">${acc.branch}</span>
            </div>` : ''}

            <div class="button-grid">
                <button class="btn btn-cyan" onclick="copyText('${acc.number}', this)">
                    Copy Number
                </button>
                <button class="btn btn-outline" onclick="copyDetails('${acc.id}')">
                    Copy Details
                </button>
                ${acc.qr ? `
                <button class="btn btn-outline" style="grid-column: span 2;" onclick="openQR('${acc.qr}', '${acc.name}')">
                    Show QR Code
                </button>` : ''}
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const contactBox = document.getElementById('contact-info');
    let html = `<h2>Need help?</h2>`;
    if (siteConfig.whatsapp) html += `<a href="https://wa.me/${siteConfig.whatsapp.replace(/\D/g,'')}" class="contact-item"><span>WhatsApp:</span> ${siteConfig.whatsapp}</a>`;
    if (siteConfig.phone) html += `<a href="tel:${siteConfig.phone}" class="contact-item"><span>Phone:</span> ${siteConfig.phone}</a>`;
    if (siteConfig.email) html += `<a href="mailto:${siteConfig.email}" class="contact-item"><span>Email:</span> ${siteConfig.email}</a>`;
    contactBox.innerHTML = html;
}

// Copy simple number
window.copyText = (text, btn) => {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "✓ Copied";
        showToast();
        setTimeout(() => { btn.innerText = originalText; }, 2000);
    }).catch(err => {
        fallbackCopyText(text);
    });
};

// Copy full details for messaging
window.copyDetails = (id) => {
    const acc = accounts.find(a => a.id === id);
    const text = `${acc.holder}\n${acc.name} — ${acc.type}\nNumber: ${acc.number}${acc.branch ? `\nBranch: ${acc.branch}` : ''}`;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Details Copied");
    });
};

function showToast(msg = "Copied to clipboard") {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Share API
function setupEventListeners() {
    document.getElementById('share-btn').addEventListener('click', async () => {
        const shareData = {
            title: 'Mahtab Hussain Mahi — Payment Accounts',
            text: 'You can find my payment information here:',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Link copied to clipboard");
            }
        } catch (err) {
            console.log("Error sharing", err);
        }
    });

    // Modal Close
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('qr-modal').style.display = "none";
    };
    window.onclick = (event) => {
        if (event.target == document.getElementById('qr-modal')) {
            document.getElementById('qr-modal').style.display = "none";
        }
    };
}

window.openQR = (imgUrl, name) => {
    document.getElementById('modal-title').innerText = name + " QR Code";
    document.getElementById('modal-img').src = imgUrl;
    document.getElementById('qr-modal').style.display = "flex";
};

// PWA Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker failed', err));
        });
    }
}
