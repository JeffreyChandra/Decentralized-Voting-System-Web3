// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is Ownable {

    struct Candidate {
        uint256 id;
        string name;
        uint256 totalVote;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    
    event Voted(address indexed voter, uint256 candidateId);
    event CandidateAdded(uint256 id, string name);

    constructor() Ownable(msg.sender) {}

    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");

        uint256 newId = candidates.length + 1;

        candidates.push(Candidate({
            id: newId,
            name: _name,
            totalVote: 0
        }));

        emit CandidateAdded(newId, _name);
    }
    
    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    function voteCandidate(uint256 _id) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_id > 0 && _id <= candidates.length, "Invalid candidate id");
        hasVoted[msg.sender] = true;
        candidates[_id - 1].totalVote++;

        emit Voted(msg.sender, _id);
    }

    function getCandidate(uint256 _index) public view returns (Candidate memory) {
        require(_index < candidates.length, "Index out of bounds");
        return candidates[_index];
    }
    
    function getAllCandidates() public view returns (Candidate[] memory) {
    return candidates;
    }
}