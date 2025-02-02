const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");



describe("Signature Verification", function () {
    async function deployContract() {

        const provider = ethers.getDefaultProvider("http://localhost:8545/");
        const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        const signer = new ethers.Wallet(privateKey, provider);
        const SV_Contract = await ethers.getContractFactory("SignatureVerification", signer);
        const sv = await SV_Contract.deploy();
        const ca = await sv.getAddress();

        return {sv, SV_Contract, ca};

        // const provider = ethers.getDefaultProvider("http://localhost:8545/");
        // const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        // const wallet = new ethers.Wallet(privateKey, provider);

        // const contractArtifact = require("/home/hilmy/programming/blockchain/signatureVerification_eth/artifacts/contracts/SignatureVerification.sol/SignatureVerification.json"); // Sesuaikan path-nya
        // const abi = contractArtifact.abi;
        // const bytecode = contractArtifact.bytecode;

        // const ContractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
        // console.log("Deploying contract...");
        // const contract = await ContractFactory.deploy();
        // await contract.waitForDeployment();
        
        // const contractAddress = contract.getAddress();
        // console.log("Contract deployed to:", contractAddress);
        // return {ContractFactory, contract, contractAddress};
    }

    describe("Deployment", function () {
        it("Return the SV Contract Address", async function () {
            const { sv, SV_Contract, CA } = await loadFixture(deployContract);
            expect(await sv, SV_Contract).to.exist;
            console.log("    Contract Address : ", CA);
        });


    });

    describe("Testing Function", function () {
        it("Testing getMessageHash() to hash message.", async function () {
            const { sv, _ } = await loadFixture(deployContract);
            const message = "Testing";
            const solHash = await sv.getMessageHash(message);
            const hash = ethers.id(message);
            expect(solHash).to.equal(hash);

        });

        it("Testing getEthSignedMessageHash to parse the hash message.", async function () {
            const { sv, _ } = await loadFixture(deployContract);
            const message = "Testing";
            const solHash = await sv.getMessageHash(message);
            const parseHash = await sv.getEthSignedMessageHash(solHash);
            const parse = await ethers.toUtf8Bytes(solHash);
            expect(parseHash).to.equal(ethers.toUtf8String(parse));
            console.log("    Parsed message : ", parseHash);
        });

        it("Testing verify() to recover signer address.", async function () {
            const provider = ethers.getDefaultProvider("http://localhost:8545/");
            const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
            const signer_address = signer.getAddress();
            const message = "Testing";
            
            const solHash = await ethers.id(message);
            const parseHash = await ethers.toUtf8Bytes(solHash);
            const signedMsg = await signer.signMessage(parseHash);
            
            const verify = ethers.verifyMessage(ethers.id(message), signedMsg);
            console.log("    Recovered Address:", verify);
            
            // const { sv, _ } = await loadFixture(deployContract);
            // const message = "Testing";
            // const solHash = await sv.getMessageHash(message);
            // const parseHash = await sv.getEthSignedMessageHash(solHash);
            // const isRecover = await sv.verify()

        });
    });
});