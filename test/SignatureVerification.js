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

        it("Testing to hash a message!", async function () {
            const {sv, _} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash =  await sv.getMessageHash(message);
            expect(solHash).to.exist;
            console.log("    Hashed message : ",solHash);
        });

        it("Testing to parse the hash message!", async function () {
            const {sv, _} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash =  await sv.getMessageHash(message);
            const parseHash = await sv.getEthSignedMessageHash(solHash);
            expect(parseHash).to.exist;
            console.log("    Parsed message : ", parseHash);
        });
    });
  });