const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SignatureVerificationModule", (m) => {
  const signatureVerification = m.contract("SignatureVerification");

  return { signatureVerification };
});