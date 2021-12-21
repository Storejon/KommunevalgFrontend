
async function fetching(){
    await getAllParty();
}
fetching().then(fillDropDown);


const saveCandidateURL = "http://localhost:8080/candidate/new";
const submitBTN = document.querySelector(".submitbtn");
const dropdownBTN = document.getElementById("parties-list");

let postRequestCandidate = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: ""
}

let candidateJson = {
    "candidateId": "",
    "name": "",
    "party": ""
}

function fillDropDown(){
    for (let i of partyMap.keys()){
        const option = document.createElement("option");
        option.innerHTML = partyMap.get(i).partyName;
        option.value = partyMap.get(i).partyId;
        dropdownBTN.appendChild(option);
    }
}

function createCandidate(){
    let input1 = document.getElementById("candidate-name");
    let input2 = document.getElementById("parties-list");


    candidateJson.name = input1.value;
    candidateJson.party = {partyId: input2.value};

    postRequestCandidate.body = JSON.stringify(candidateJson)
    fetch(saveCandidateURL, postRequestCandidate).catch((error) => console.log(error));
}


submitBTN.addEventListener('click', createCandidate);