// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SignatureVerification {
    // Fungsi untuk memverifikasi tanda tangan
    function verify(
        address _signer,
        bytes32 _messageHash,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public pure returns (bool) {
        // Memulihkan alamat penandatangan dari hash dan tanda tangan
        address recoveredAddress = ecrecover(_messageHash, _v, _r, _s);

        // Membandingkan alamat yang dipulihkan dengan alamat yang diklaim
        return recoveredAddress == _signer;
    }

    // Fungsi untuk menghasilkan hash pesan
    function getMessageHash(string memory _message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    // Fungsi untuk menghasilkan hash pesan yang diformat untuk tanda tangan Ethereum
    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }
}