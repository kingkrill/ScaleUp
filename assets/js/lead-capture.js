/**
 * ScaleUp CoWork — Live Lead Capture & Google Sheets Integration
 * 
 * Automatically transmits all visit requests, booking inquiries,
 * and calculator quotes directly to your Google Sheet in real-time,
 * while backing up all submissions locally in browser storage.
 */

// =========================================================================
// 1. CONFIGURATION: Live Deployed Google Apps Script Web App URL
// =========================================================================
let GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxAbodyhrRipO9x53zfGaG04ZRoiVrzi0F34DtprB9UFjriXE0oMRezvhJ_RgrpgRIM/exec";

// Check if user has saved custom Webhook URL in localStorage
const savedWebhook = localStorage.getItem("scaleup_sheet_webhook");
if (savedWebhook && savedWebhook.startsWith("https://script.google.com")) {
    GOOGLE_SHEET_WEBAPP_URL = savedWebhook;
}

/**
 * Sends lead data to Google Sheets & saves to local backup
 */
async function sendLeadToGoogleSheet(leadData) {
    // 1. Enrich data with timestamp, source, and device info
    const enrichedLead = {
        timestamp: new Date().toLocaleString("en-IN", { 
            timeZone: "Asia/Kolkata", 
            dateStyle: "medium", 
            timeStyle: "short" 
        }),
        name: leadData.name || "Anonymous",
        phone: leadData.phone || "Not provided",
        workspace: leadData.workspace || "General Workspace Inquiry",
        visitDate: leadData.visitDate || "Flexible",
        source: leadData.source || document.title || window.location.pathname,
        pageUrl: window.location.href,
        id: "LEAD-" + Date.now()
    };

    // 2. Save to localStorage backup (Never lose a lead)
    try {
        const existingLeads = JSON.parse(localStorage.getItem("scaleup_leads_log") || "[]");
        existingLeads.unshift(enrichedLead);
        localStorage.setItem("scaleup_leads_log", JSON.stringify(existingLeads));
    } catch (e) {
        console.warn("Local lead storage failed:", e);
    }

    // 3. Dispatch to Google Sheets Web App if configured
    if (GOOGLE_SHEET_WEBAPP_URL && !GOOGLE_SHEET_WEBAPP_URL.includes("placeholder-url")) {
        try {
            await fetch(GOOGLE_SHEET_WEBAPP_URL, {
                method: "POST",
                mode: "no-cors", // Required for Google Apps Script cross-origin requests
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(enrichedLead)
            });
            console.log("Lead dispatched to Google Sheets:", enrichedLead);
        } catch (error) {
            console.error("Google Sheets dispatch error:", error);
        }
    } else {
        console.log("Lead saved locally (Google Apps Script URL pending deployment):", enrichedLead);
    }

    return enrichedLead;
}

/**
 * Universal Form Handler for #scheduleForm (Schedule Visit Modal)
 */
async function handleQuickSubmit(event) {
    if (event) event.preventDefault();

    const btn = document.getElementById('submitLeadBtn');
    const nameInput = document.getElementById('leadName');
    const phoneInput = document.getElementById('leadPhone');
    const workspaceInput = document.getElementById('leadWorkspace');
    const dateInput = document.getElementById('visitDate');

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const workspace = workspaceInput ? workspaceInput.value : "Deccan Hub Center Visit";
    const visitDate = (dateInput && dateInput.value) ? dateInput.value : "Flexible";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Saving & Connecting...';
    }

    // Send to Google Sheets and local log
    await sendLeadToGoogleSheet({
        name: name,
        phone: phone,
        workspace: workspace,
        visitDate: visitDate,
        source: "Schedule Visit Button - " + (document.title.split("—")[0].trim())
    });

    // Render high-conversion confirmation inside modal
    setTimeout(() => {
        const modalBody = document.querySelector('#bookingModal .modal-body');
        if (modalBody) {
            const waMessage = encodeURIComponent(
                `Hi ScaleUp! I just submitted a visit request:\n• Name: ${name}\n• Phone: ${phone}\n• Plan: ${workspace}\n• Preferred Date: ${visitDate}`
            );

            modalBody.innerHTML = `
                <div class="text-center py-4">
                    <div class="mb-3">
                        <span class="badge bg-success bg-opacity-25 text-success border border-success px-3 py-2 rounded-pill fs-6">
                            <i class="fas fa-check-circle me-1"></i> Visit Request Logged Live
                        </span>
                    </div>
                    <h4 class="text-white fw-bold">Thank you, ${name}!</h4>
                    <p class="text-light opacity-75 mb-4">
                        Your request has been saved to our live booking sheet. Our Deccan Hub community manager will call you at <strong class="text-white">${phone}</strong> shortly to confirm your visit for <strong class="text-primary">${workspace}</strong>.
                    </p>
                    <div class="d-grid gap-2">
                        <a href="https://wa.me/919822268333?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="btn btn-success rounded-pill py-2 fw-bold shadow">
                            <i class="fab fa-whatsapp me-2"></i> Instant Confirmation via WhatsApp
                        </a>
                        <a href="tel:+919822268333" class="btn btn-outline-primary rounded-pill py-2 fw-bold">
                            <i class="fas fa-phone-alt me-2"></i> Direct Call: 9822268333
                        </a>
                    </div>
                </div>
            `;
        }
    }, 600);
}

// Auto-bind on DOM ready
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("scheduleForm");
    if (form && !form.getAttribute("onsubmit")) {
        form.addEventListener("submit", handleQuickSubmit);
    }
});
