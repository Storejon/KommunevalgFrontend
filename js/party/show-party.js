async function fetching(){
    await getAllParty();

}

fetching().then(printPartyList);
const container = document.querySelector(".get-container");
function printPartyList(){

    for (let key of partyMap.keys()){
        let partyKey = partyMap.get(key);

        let makeDivTag = document.createElement('div');
        makeDivTag.setAttribute("class", "parties");
        container.appendChild(makeDivTag);

        const partyName = document.createElement("h1");
        partyName.innerHTML = partyKey.partyName;

        makeDivTag.appendChild(partyName);

        const editButton = document.createElement("input");
        editButton.type = "button";
        editButton.setAttribute("value", "Edit party");
        editButton.setAttribute("class", "edit-button");

        makeDivTag.appendChild(editButton);

        editButton.onclick = function (){
            console.log("Button Clicked");

            const editPartyName = document.createElement("input");
            editPartyName.setAttribute('value', partyKey.partyName);

            const submitButton = document.createElement('input');
            submitButton.type = 'button';
            submitButton.setAttribute('value', "Submit Changes");
            submitButton.setAttribute('class', 'button');

            partyName.appendChild(editPartyName);
            makeDivTag.appendChild(submitButton);

            submitButton.onclick = function (){
                updateParty(partyKey.partyId, editPartyName.value);
                location.href = "show-party.html"
            }

        }
    }
}

async function updateParty(id, newPartyName){

    const updatePartyURL = "http://localhost:8080/party/update/" + id;

    const updatePartyJSON = {
        "partyId": id,
        "partyName": newPartyName
    }

    const updatePartyObject = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatePartyJSON)
    }
    await fetch(updatePartyURL, updatePartyObject);
}

async function deleteParty(id){
    const deletePartyURL = "http://localhost:8080/party/delete/" + id;
    const deletePartyObj = {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: ""
    }
    await fetch(deletePartyURL, deletePartyObj);
}


