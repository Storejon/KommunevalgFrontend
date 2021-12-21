
async function fetching(){
    await getAllParty();
}
fetching().then(printResultParty);

const container = document.querySelector(".get-container");

function printResultParty() {
    for (let key of partyMap.keys()) {
        let partyKey = partyMap.get(key);

        let makeDivTag = document.createElement('div');
        makeDivTag.setAttribute("class", "parties");
        container.appendChild(makeDivTag);

        const partyName = document.createElement("h4");
        partyName.innerHTML = partyKey.partyName;

        const voteProcent = document.createElement("p");
        voteProcent.innerHTML = "Stemmeprocent: "

        const result = document.createElement("p");
        result.innerHTML = Math.floor(Math.random()*30) + " %";

        makeDivTag.appendChild(partyName);
        makeDivTag.appendChild(voteProcent);
        makeDivTag.appendChild(result);

    }
}