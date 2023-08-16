const art = document.getElementById('asciiArt');
const contract = document.getElementById('contract');
const buttons = document.getElementById('buttons');
const response = document.getElementById('response');

const contractText = `
[Contract – Covert Surveillance]

Objective: Observe & Report

Location: Mansion, Chrome Heights, Nexus-9

Codename: "Eagle's Eye"

Details: Mansion is recognized as a primary target by multiple entities. Vital intel suggests possible heist during upcoming party. The mansion will be holding an elite gathering, ripe for covert operations.

Bounty: To be negotiated upon mission completion.

Terms:
- Sole purpose is to observe and document all potential threats and gather intel on all individuals, particularly those fitting the profile of bounty hunters.
- Must remain inconspicuous at all times.
- No engagement, intervention, or interactions.
- Detailed notes on all observed actions and individuals required for payout.
- If circumstances align, retrieval of the data chip is a secondary objective. However, the priority is observation.

Window of Opportunity:
- Exclusive party with Nexus-9’s elite in attendance.
- This high-profile event will serve as a cover.
- Anticipate multiple agents with ulterior motives.

Recommendations:
- Utilize best-in-class surveillance tech for audio and visual data.
- Take a high vantage point, possibly in a neighboring building or a discreet location within the mansion.
- Familiarize oneself with mansion’s blueprint for possible escape routes and hideouts.
- Prepare for encrypted, secure, and silent communication with the issuer throughout the event.

Contract Issuer: Omnitech CEO, Marcellus Omn

Endorsement:
“Your eyes and ears, Vex, are my most valued assets in these treacherous times. Remember, you’re there to observe, not to engage. But if destiny grants an opening, seize the chip.”

Note: By accepting, Vex acknowledges the delicate nature of this task. Any deviation from the terms will lead to immediate reevaluation of her position and trustworthiness.

Confirmation:
Upon accepting this contract, one's fingerprint and retinal scan will be recorded. Discretion is not just advised, it’s imperative.

Stay vigilant, Vex.`;

const chars = Array.from(contractText);

function showArt() {
    const lines = art.textContent.split('\n');
    art.textContent = '';

    let index = 0;

    function showLine() {
        if (index < lines.length) {
            art.textContent += lines[index] + '\n';
            index++;
            setTimeout(showLine, 5);
        } else {
            setTimeout(() => {
                art.style.display = 'none';
                showContract();
            }, 2000);
        }
    }

    art.style.display = 'block';
    showLine();
}

function showContract() {
    contract.style.display = 'inline';
    
    let index = 0;

    function showChar() {
        if (index < chars.length) {
            contract.textContent += chars[index];
            index++;
            setTimeout(showChar, 10); // Adjust for speed
        } else {
            buttons.style.display = 'block';
        }
    }

    showChar();
}

function animateLoading(nextAction) {
    const periods = ['.', '..', '...'];
    let periodIndex = 0;
    let repeatCount = 0;

    function updatePeriods() {
        if (repeatCount >= 2 && periodIndex >= 2) {
            response.textContent = "CONTRACT ACCEPTED";
            setTimeout(nextAction, 2000);
            return;
        }
        response.textContent = "LOADING" + periods[periodIndex];
        periodIndex = (periodIndex + 1) % periods.length;
        if (periodIndex === 0) {
            repeatCount++;
        }
        setTimeout(updatePeriods, 500);
    }
    updatePeriods();
}

function acceptContract() {
    contract.style.display = 'none';
    buttons.style.display = 'none';

    response.style.display = 'block';
    animateLoading(() => {
        response.textContent = "HAPPY HUNTING";
        setTimeout(() => {
            response.style.display = 'none';
        }, 3000);
    });
}

function declineContract() {
    contract.style.display = 'none';
    buttons.style.display = 'none';

    showResponse("DELETING...", () => {
        document.body.style.backgroundColor = 'black';
    });
}

function showResponse(message, nextAction) {
    response.textContent = message;
    response.style.display = 'block';

    setTimeout(() => {
        response.style.display = 'none';
        if (nextAction) nextAction();
    }, 3000);
}

showArt();
