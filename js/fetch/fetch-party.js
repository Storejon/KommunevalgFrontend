const getBookingURL = "http://localhost:8080/party/get";

let partyMap = new Map();

async function getParty(){
    return fetch(getBookingURL).then(response => response.json());
}

function createPartyMap(data){
    data.forEach(party => {
        partyMap.set(party.partyId, party)
    })
}

async function callGetParty(){
    const promise = getParty();
    await promise.then(createPartyMap);
}

async function getAllParty(){
    await callGetParty();
}
