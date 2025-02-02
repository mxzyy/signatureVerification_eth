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

        return {sv, SV_Contract, ca, signer};

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
            const parseHash = await sv.getEthSignedMessageHashV2(solHash);
            const parse = await ethers.toUtf8Bytes(solHash);
            expect(parseHash).to.exist;
            expect(parseHash).to.equal(ethers.hashMessage(parse));
            console.log("    Parsed message : ", parseHash);
        });

        it("Testing verify() to recover signer address.", async function () {
            const provider1 = ethers.getDefaultProvider("http://localhost:8545/");
            const signer1 = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider1);
            // const signer_address1 = signer.getAddress();
            const message1 = "Testing";
            
            const solHash1 = await ethers.id(message1);
            const parseHash1 = await ethers.toUtf8Bytes(solHash1);
            const signedMsg1 = await signer1.signMessage(parseHash1);
            
            const verify1 = ethers.verifyMessage(ethers.id(message1), signedMsg1);
            //console.log("    Signed msg: ", signedMsg1);
            //console.log("    recover         : ", verify1);
            
            const { sv, _, __, signer} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash = await sv.getMessageHash(message);
            const parseHash = await sv.getEthSignedMessageHashV2(solHash); // double hash getEthSignedMessageHashV2 sama verifyMessage
            const signedMsg = await signer.signMessage(solHash);
            const v = ethers.Signature.from(signedMsg).v;
            const r = ethers.Signature.from(signedMsg).r;
            const s = ethers.Signature.from(signedMsg).s;
            const verify = await sv.verify(parseHash, v, r, s);
            const signerAddress = await signer.getAddress();
            //expect(signedMsg).to.exist;
            //console.log("    Actual   : ", signedMsg);
            console.log("    recover Actual  : ", verify);
            expect(verify).to.equal(signerAddress);
            // console.log("    v : ", ethers.Signature.from(signedMsg).v);
            // console.log("    r : ", ethers.Signature.from(signedMsg).r);
            // console.log("    s : ", ethers.Signature.from(signedMsg).s);

        });
    });
});