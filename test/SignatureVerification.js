const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");



describe("Signature Verification", function () {
    async function deployContract() {
        const provider = ethers.getDefaultProvider("http://localhost:8545/");
        const privateKey = "3ab684ebe79ad0742622d091f20eded9869867660599537575e866f4624fc779";
        const signer = new ethers.Wallet(privateKey, provider);
        console.log("signed :", signer);
        const SV_Contract = await ethers.getContractFactory("SignatureVerification", signer);
        const sv = await SV_Contract.deploy();
        const ca = await sv.getAddress();

        return {sv, SV_Contract, ca, signer};
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
            const { sv, _, __, signer} = await loadFixture(deployContract);
            const message = "Testing";
            const solHash = await sv.getMessageHash(message);
            const parseHash = await sv.getEthSignedMessageHashV2(solHash);
            console.log(typeof parseHash);
            const signedMsg = await signer.signMessage(solHash);
            console.log("    Signed message : ", signedMsg);
            const v = ethers.Signature.from(signedMsg).v;
            console.log("    v : ", v);
            const r = ethers.Signature.from(signedMsg).r;
            console.log("    r : ", r);
            const s = ethers.Signature.from(signedMsg).s;
            console.log("    s : ", s);
            const verify = await sv.verify(parseHash, v, r, s);
            const signerAddress = await signer.getAddress();
            console.log("    recover Actual  : ", verify);
            expect(verify).to.equal(signerAddress);
        });
    });
});