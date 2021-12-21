const getCandidateURL = "http://localhost:8080/candidate/get";

let candidateMap = new Map();

async function getCandidate(){
    return fetch(getCandidateURL).then(response => response.json());
}

function createCandidateMap(data){
    data.forEach(candidate => {
        candidateMap.set(candidate.candidateId, candidate)
    })
}

async function callGetCandidate(){
    const promise = getCandidate();
    await promise.then(createCandidateMap);
}

async function getAllCandidate(){
    await callGetCandidate();
}