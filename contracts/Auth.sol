
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    mapping(address => bool) public registeredUsers;
    event UserRegistered(address indexed user);

    function registerUser() public {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function isRegistered(address _user) public view returns (bool) {
        return registeredUsers[_user];
    }
}
