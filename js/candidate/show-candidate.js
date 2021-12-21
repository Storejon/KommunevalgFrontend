async function fetching(){
    await getAllCandidate();
    await getAllParty();
    candidatesInParty();

}

fetching().then(printCandidateList)
const container = document.querySelector(".get-container");

function printCandidateList() {
    for (let key of candidateMap.keys()) {
        let candidateKey = candidateMap.get(key);

        let makeDivTag = document.createElement('div');
        makeDivTag.setAttribute("class", "candidates");
        container.appendChild(makeDivTag);

        const candidates = document.createElement("h3");
        candidates.innerHTML = "Candidate"

        const candidateName = document.createElement("p");
        candidateName.innerHTML = candidateKey.name;

        const party = document.createElement("p");
        party.innerHTML = candidateKey.party.partyName;

        const editButton = document.createElement("input");
        editButton.type = "button";
        editButton.setAttribute("value", "Edit candidate");
        editButton.setAttribute("class", "edit-button");


        makeDivTag.appendChild(candidates);
        makeDivTag.appendChild(candidateName);
        makeDivTag.appendChild(party);
        makeDivTag.appendChild(editButton);

        editButton.onclick = function (){
            console.log("button clicked");

            const editName = document.createElement("input");
            editName.setAttribute('value', candidateKey.name);

            const editParty = document.createElement("select");
            for (let i of partyMap.keys()){
                const option = document.createElement("option");
                option.innerHTML = partyMap.get(i).partyName;
                option.value = partyMap.get(i).partyId;
                editParty.appendChild(option);
            }

            const submitButton = document.createElement('input');
            submitButton.type = 'button';
            submitButton.setAttribute('value', "Submit Changes");
            submitButton.setAttribute('class', 'button');

            const deleteButton = document.createElement('input');
            deleteButton.setAttribute("class", "button");
            deleteButton.type = "button";
            deleteButton.setAttribute("value", "Delete Candidate");

            candidateName.appendChild(editName);
            party.appendChild(editParty);

            makeDivTag.appendChild(submitButton);
            makeDivTag.appendChild(deleteButton);
            
            submitButton.onclick = function(){
                updateCandidate(candidateKey.candidateId, editName.value, editParty.value);
                location.href = "show-candidate.html"
            }

            deleteButton.onclick = function (){
                deleteCandidate(candidateKey.candidateId);
                location.href = "show-candidate.html"

            }

        }
    }
}

function candidatesInParty(){

    for (let p of partyMap.keys()){
        const partyName = document.createElement("h3");
        partyName.innerHTML = partyMap.get(p).partyName;
        const listCandidates = document.createElement("p");
        listCandidates.innerHTML = "Candidates:"


        for (let c of candidateMap.keys()){
            let candidateKey = candidateMap.get(c);
            if (partyMap.get(p).partyId === candidateKey.party.partyId){
                const candidateName = document.createElement("li");
                candidateName.innerHTML = candidateKey.name;
                listCandidates.appendChild(candidateName)
            }
        }
        partyName.appendChild(listCandidates);
        container.appendChild(partyName);
    }
}

/*function printPartyList(){
    switch ()
} */

async function updateCandidate(id, newName, newParty){

    const updateCandidateURL = "http://localhost:8080/candidate/update/" + id;

    const updateCandidateJSON = {
        "candidateId": id,
        "name": newName,
        "party": {partyId: newParty}
    }

    const updateCandidateObj = {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(updateCandidateJSON)
    }
    await fetch(updateCandidateURL, updateCandidateObj);
}


async function deleteCandidate(id){
    const deleteCandidateURL = "http://localhost:8080/candidate/delete/" + id;
    const deleteCandidateObj = {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: ""
    }
    await fetch(deleteCandidateURL, deleteCandidateObj);
}



