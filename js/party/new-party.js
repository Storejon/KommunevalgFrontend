const savePartyURL = "http://localhost:8080/party/new";
const submitBTN = document.querySelector(".submitbtn");


let postRequestParty = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: ""
}

let partyJson = {
    "partyId": "",
    "partyName": ""
}



function createParty(){
    let input1 = document.getElementById("party-name");

    partyJson.partyName = input1.value;

    postRequestParty.body = JSON.stringify(partyJson)
    fetch(savePartyURL, postRequestParty).catch((error) => console.log(error));
}

submitBTN.addEventListener('click', createParty);