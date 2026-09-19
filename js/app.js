
هذه العلامات دخلت إلى ملف JavaScript نفسه، ولذلك المتصفح يتوقف عن تنفيذ `app.js` بسبب **Syntax Error**. :contentReference[oaicite:0]{index=0}

### الحل — لا نغير أي شيء آخر

افتح:

`js` → `app.js` → **Edit ✏️**

ثم احذف **كل محتوى الملف** وضع هذا الكود بدلًا منه:

```javascript
const typeButtons = document.querySelectorAll(".type-btn");

const targetInput = document.getElementById("targetInput");
const targetLabel = document.getElementById("targetLabel");
const clearBtn = document.getElementById("clearBtn");
const startButton = document.getElementById("startInvestigation");

const processingPanel = document.getElementById("processingPanel");
const resultsPanel = document.getElementById("resultsPanel");
const processingStatus = document.getElementById("processingStatus");

const investigatedTarget = document.getElementById("investigatedTarget");
const confidenceScore = document.getElementById("confidenceScore");

const locationResult = document.getElementById("locationResult");
const locationConfidence = document.getElementById("locationConfidence");

const identityResults = document.getElementById("identityResults");
const socialResults = document.getElementById("socialResults");

const sourceCount = document.getElementById("sourceCount");
const exposureCount = document.getElementById("exposureCount");
const riskValue = document.getElementById("riskValue");
const riskLevel = document.getElementById("riskLevel");

const sourcesResults = document.getElementById("sourcesResults");

const newInvestigation = document.getElementById("newInvestigation");
const generateReport = document.getElementById("generateReport");

let selectedType = "phone";

const investigationConfig = {
    phone: {
        label: "PHONE NUMBER",
        placeholder: "+970 59 XXX XXXX"
    },

    email: {
        label: "EMAIL ADDRESS",
        placeholder: "example@email.com"
    },

    username: {
        label: "USERNAME",
        placeholder: "example_username"
    },

    domain: {
        label: "DOMAIN",
        placeholder: "example.com"
    }
};


/* =========================
   INVESTIGATION TYPE
========================= */

typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        typeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedType = button.dataset.type;

        const config = investigationConfig[selectedType];

        targetLabel.textContent = config.label;
        targetInput.placeholder = config.placeholder;
        targetInput.value = "";

        resultsPanel.classList.add("hidden");
        processingPanel.classList.add("hidden");
    });

});


/* =========================
   CLEAR INPUT
========================= */

clearBtn.addEventListener("click", () => {

    targetInput.value = "";
    targetInput.focus();

});


/* =========================
   START INVESTIGATION
========================= */

startButton.addEventListener("click", startInvestigation);

targetInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        startInvestigation();
    }

});


async function startInvestigation() {

    const target = targetInput.value.trim();

    if (!target) {

        targetInput.focus();

        targetInput.style.borderColor = "#ff647c";

        setTimeout(() => {
            targetInput.style.borderColor = "";
        }, 1200);

        return;
    }

    resultsPanel.classList.add("hidden");
    processingPanel.classList.remove("hidden");

    startButton.disabled = true;

    await runInvestigationPipeline(target);

    startButton.disabled = false;
}


/* =========================
   INVESTIGATION PIPELINE
========================= */

async function runInvestigationPipeline(target) {

    const steps = [
        "Collecting publicly available information...",
        "Correlating digital identity indicators...",
        "Analyzing geographic indicators...",
        "Checking digital exposure indicators...",
        "Calculating confidence level...",
        "Generating intelligence report..."
    ];

    const pipelineSteps =
        document.querySelectorAll(".pipeline-step");

    pipelineSteps.forEach(step => {
        step.classList.remove("active");
    });

    for (let i = 0; i < steps.length; i++) {

        processingStatus.textContent = steps[i];

        pipelineSteps.forEach((step, index) => {

            step.classList.toggle(
                "active",
                index <= i
            );

        });

        await wait(650);
    }

    showDemoResults(target);
}


/* =========================
   DEMO RESULTS
========================= */

function showDemoResults(target) {

    investigatedTarget.textContent =
        `${formatType(selectedType)} investigation: ${target}`;

    const demoConfidence =
        calculateDemoConfidence(target);

    confidenceScore.textContent =
        `${demoConfidence}%`;


    /* Geographic */

    locationResult.textContent =
        "Awaiting verified public indicators";

    locationConfidence.textContent =
        "NO VERIFIED LOCATION";


    /* Identity */

    identityResults.innerHTML = `
        <div class="empty-result">
            Identity correlation will be performed
            by the backend intelligence engine.
        </div>
    `;


    /* Social */

    socialResults.innerHTML = `
        <div class="empty-result">
            Public profile discovery will be connected
            to the OSINT engine.
        </div>
    `;


    /* Exposure */

    sourceCount.textContent = "0";
    exposureCount.textContent = "0";

    riskValue.textContent = "PENDING";
    riskLevel.textContent = "PENDING";


    /* Sources */

    sourcesResults.innerHTML = `
        <div class="empty-result">
            No live intelligence sources have been queried yet.
        </div>
    `;


    processingPanel.classList.add("hidden");
    resultsPanel.classList.remove("hidden");

    window.scrollTo({
        top: resultsPanel.offsetTop - 30,
        behavior: "smooth"
    });
}


/* =========================
   DEMO CONFIDENCE
========================= */

function calculateDemoConfidence(target) {

    let hash = 0;

    for (let i = 0; i < target.length; i++) {
        hash += target.charCodeAt(i) * (i + 1);
    }

    return 55 + (hash % 31);
}


/* =========================
   NEW INVESTIGATION
========================= */

newInvestigation.addEventListener("click", () => {

    targetInput.value = "";

    resultsPanel.classList.add("hidden");
    processingPanel.classList.add("hidden");

    targetInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   GENERATE REPORT
========================= */

generateReport.addEventListener("click", () => {

    alert(
        "Report generation will be connected to the CyberTrace AI reporting engine in the next development stage."
    );

});


/* =========================
   HELPERS
========================= */

function formatType(type) {

    const names = {
        phone: "Phone",
        email: "Email",
        username: "Username",
        domain: "Domain"
    };

    return names[type] || "Digital Identity";
}


function wait(milliseconds) {

    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}
