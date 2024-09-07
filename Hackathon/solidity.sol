// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public votesReceived;
    string[] public candidateList;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        candidateList = candidateNames;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(validCandidate(candidate), "Not a valid candidate.");

        votesReceived[candidate] += 1;
        hasVoted[msg.sender] = true;
    }

    function validCandidate(string memory candidate) private view returns (bool) {
        for (uint i = 0; i < candidateList.length; i++) {
            if (keccak256(bytes(candidateList[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        require(validCandidate(candidate), "Not a valid candidate.");
        return votesReceived[candidate];
    }
}
