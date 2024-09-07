// Assuming Web3.js is included in the project
document.addEventListener('DOMContentLoaded', async () => {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = []; // Add the ABI of your contract here

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Please install MetaMask!');
        return;
    }

    const votingContract = new window.web3.eth.Contract(contractABI, contractAddress);
    const candidatesDropdown = document.getElementById('candidates');
    const voteForm = document.getElementById('voting-form');
    const voteStatus = document.getElementById('vote-status');
    let accounts = await window.web3.eth.getAccounts();

    // Fetch candidates and populate dropdown
    async function loadCandidates() {
        const candidates = await votingContract.methods.candidateList().call();
        candidates.forEach(candidate => {
            let option = document.createElement('option');
            option.value = candidate;
            option.innerText = candidate;
            candidatesDropdown.appendChild(option);
        });
    }

    voteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectedCandidate = candidatesDropdown.value;

        try {
            await votingContract.methods.vote(selectedCandidate).send({ from: accounts[0] });
            voteStatus.innerText = 'Vote successfully recorded!';
        } catch (error) {
            voteStatus.innerText = 'Failed to cast vote. Please try again.';
            console.error(error);
        }
    });

    loadCandidates();
});
