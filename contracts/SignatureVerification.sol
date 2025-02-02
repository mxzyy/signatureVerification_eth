// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SignatureVerification {
    // Fungsi untuk memverifikasi tanda tangan
    function verify(
        //address _signer,
        bytes32 _messageHash,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public pure returns (address) {
        // Memulihkan alamat penandatangan dari hash dan tanda tangan
        address recoveredAddress = ecrecover(_messageHash, _v, _r, _s);

        // Membandingkan alamat yang dipulihkan dengan alamat yang diklaim
        return recoveredAddress;
    }

    // Fungsi untuk menghasilkan hash pesan
    function getMessageHash(string memory _message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function getEthSignedMessageHashV2(string memory message) public pure returns (bytes32) {
        uint256 messageLength = bytes(message).length;
        return keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n",
            uintToString(messageLength),
            message
        ));
    }

    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint256 length = 0;
        uint256 temp = v;
        while (temp != 0) {
            length++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(length);
        while (v != 0) {
            length -= 1;
            buffer[length] = bytes1(uint8(48 + v % 10));
            v /= 10;
        }
        return string(buffer);
    }
}