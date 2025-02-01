const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");



describe("Signature Verification", function() {
    async function deployContract() {

        const [owner, otherAccount] = await ethers.getSigners();
        const SV_Contract = await ethers.getContractFactory("SignatureVerification");
        const sv = await SV_Contract.deploy();

        return {sv, SV_Contract, owner, otherAccount};
    }

    describe("Deployment", function () {
        it("Return the Signature Verfication Contract Address", async function () {
            const {sv, SV_Contract, owner} = await loadFixture(deployContract);
            expect(await sv, SV_Contract).to.exist;
            console.log("    Contract Address : ", owner.address);
        });

        
    });

    describe("Testing Function", function () {
        it("Testing getMessageHash to hash a message.", async function () {
            const {sv, _} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash =  await sv.getMessageHash(message);
            const hash = ethers.id(message);
            expect(solHash).to.equal(hash);
            
        });

        it("Testing getEthSignedMessageHash to parse the hash message.", async function () {
            const {sv, _} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash =  await sv.getMessageHash(message);
            const parseHash = await sv.getEthSignedMessageHash(solHash);
            expect(parseHash).to.exist;
            console.log("    Parsed message : ", parseHash);
        });

        it("Testing verify to verify hashed message.", async function () {
            const {sv, _} = await loadFixture(deployContract);
            const provider = ethers.getDefaultProvider("http://localhost:8545/");
            const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
            const signer_address = signer.getAddress();
            const message = "Testing";

            const solHash =  await ethers.hashMessage(message);
            const parseHash = await ethers.toUtf8Bytes(solHash);
            const signedMsg = await signer.signMessage(parseHash);
            //const sig       = await ethers.Signature.from(signedMsg);

            //const testSignedMsg = await sv.verify( parseHash, sig.v, sig.r, sig.s);    
            //expect(testSignedMsg).to.exist;
            const verify = ethers.verifyMessage(ethers.hashMessage(message), signedMsg);
            console.log("Recovered Address:", verify);
            //console.log("    Signed Message Verification result : ", verify);
            //console.log("signer addy : ", signer_address);
            //console.log(parseHash);
            
        });
    });
  });