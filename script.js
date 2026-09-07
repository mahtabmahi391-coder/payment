// ========================================
// EDIT YOUR INFORMATION HERE
// ========================================

const siteConfig = {
    name: "Mahtab Hussain Mahi",
    whatsapp: "+8801XXXXXXXXX", // Add your number
    phone: "01XXXXXXXXX",     // Add your number
    email: "mahtab@example.com" // Add your email
};

const accounts = [
    {
        id: "bkash",
        name: "bKash",
        type: "Personal",
        holder: "Mahtab Hussain Mahi",
        number: "01XXXXXXXXX",
        qr: "images/qr/bkash.png" // Ensure this image exists
    },
    {
        id: "nagad",
        name: "Nagad",
        type: "Personal",
        holder: "Mahtab Hussain Mahi",
        number: "01XXXXXXXXX",
        qr: "images/qr/nagad.png" // Ensure this image exists
    },
    {
        id: "bank",
        name: "Dutch-Bangla Bank",
        type: "Savings Account",
        holder: "Mahtab Hussain Mahi",
        number: "123.456.78910",
        branch: "Main Branch, Dhaka",
        qr: "" // Leave empty if no QR
    }
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
