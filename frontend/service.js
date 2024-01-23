/**
 * Disable Chrome security
 * google-chrome --disable-web-security --allow-file-access-from-files --user-data-dir="/home/yanick/Desktop/chrome"
 */

var xhttp = new XMLHttpRequest();


const backendBaseUrl = "http://localhost:8080/engine-rest"
let backendId = ""
let activityName = "Standby"
let on = false;

// http://localhost:8080/engine-rest/process-instance/afbc585d-b9fb-11ee-a425-0242ac110002/activity-instances
// http://localhost:8080/engine-rest/task


const startBtn = document.querySelector('#start');
const drinkBtn = document.querySelector('#drink')
const saldoLevels = document.querySelector("#saldo-levels");
const display = document.querySelector("#display")
const selector = document.querySelector('#select-coffee')

const fillSaldoBtn = document.querySelector('#fill-saldo')



getProcessInstanceId()

startBtn.addEventListener("click", () => {
    power(on)
})

drinkBtn.addEventListener("click", () => {
    drinkCofee(selector.value)
    //drinkBtn.classList.remove("invisible")
})


fillSaldoBtn.addEventListener("click", () => {
    fill("saldo")
})



let waiter = 6
var intervalID = window.setInterval(standBy, 250);
let test = 0
function standBy() {
    if (test == 0) {
        test++
        getLevels()
    } else if (test == 1) {
        test++
        getDisplay()
    } else if (test == 2) {
        test++
        getActivityName()
    } else {
        test = 0
        const displayText = display.innerText.split(" : ")[1]
        if (displayText === "Bereit") {
            waiter = 6
        } else if (displayText == "Mahlen") {
            disableBtn(fillSaldoBtn)
            disableBtn(drinkBtn)
            waiter--;
            console.log(`Sek: ${waiter}`)
        } 
    }
}

function enableBtn(button) {
    button.classList.remove("disabled")
    button.disabled = false
}

function disableBtn(button) {
    button.classList.add("disabled")
    button.disabled = true
}

function getProcessInstanceId() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            var response = JSON.parse(this.responseText);
            var lastIndex = response.length - 1; // Calculate the last index
            if (lastIndex >= 0) {
                backendId = response[lastIndex].id; // Get the ID of the last process instance
                // Additional code to handle the backendId
            }
        }
    }

    xhttp.open("GET", `${backendBaseUrl}/process-instance`, true)
    xhttp.send()
}
 
function fill(name) {
    xhttp.onreadystatechange = function () {
        if (this.status == 204) {
            getLevels()
        }
    };

    xhttp.open("POST", `${backendBaseUrl}/message`, true)
    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({
        messageName: `fill_${name}`
    }))
}

function drinkCofee(coffeeStr) {
    xhttp.onreadystatechange = function () {
        if (this.status == 204) {
            //drinkBtn.classList.add("invisible")
            getLevels()
            getDisplay()
        }
    };

    xhttp.open("POST", `${backendBaseUrl}/message`, true)
    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({
        messageName: "selection",
        processVariables: {
            type: {
                type: "string",
                value: coffeeStr
            }
        }
    }))
}
function getDisplay() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            display.innerText = `Diplay : ${JSON.parse(this.responseText).value}`
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/variables/display`, true)
    xhttp.send()
}

function getActivityName() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            activityName = JSON.parse(this.responseText).childActivityInstances[0].activityName
            if (activityName == "Standby") {
                on = true
                startBtn.classList.add('on')
                startBtn.innerText = "Power on"
                enableBtn(fillSaldoBtn)
                enableBtn(drinkBtn)
            } else {
                on = false
                startBtn.classList.remove('on')
                startBtn.innerText = "Power off"
                disableBtn(fillSaldoBtn)
                disableBtn(drinkBtn)

            }
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/activity-instances`, true)
    xhttp.send()
}

function getLevels() {
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.responseText) {
            saldoLevels.innerText = `Saldo: ${JSON.parse(this.responseText).value.saldo}`
        }
    };

    xhttp.open("GET", `${backendBaseUrl}/process-instance/${backendId}/variables/levels`, true)
    xhttp.send()
}

function power() {
    xhttp.open("POST", `${backendBaseUrl}/message`, true)

    xhttp.setRequestHeader("Accept", "application/json")
    xhttp.setRequestHeader("Content-Type", "application/json")

    if (!on) {
        xhttp.send(JSON.stringify({
            messageName: "power_on"
        }));
    } else {
        xhttp.send(JSON.stringify({
            messageName: "power_off"
        }));
    }
}
