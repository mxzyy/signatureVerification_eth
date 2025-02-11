import ABI from "./ABI.json";
import { Contract, BrowserProvider, Signature } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

let provider;
let signer;
let contract;
let isInitialized = false; // Flag untuk menandai apakah kontrak sudah diinisialisasi

const initialize = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      // Inisialisasi provider dan signer
      provider = new BrowserProvider(window.ethereum);
      signer = await provider.getSigner();

      // Buat instance contract
      const baseContract = new Contract(CONTRACT_ADDRESS, ABI, provider);
      contract = baseContract.connect(signer);

      console.log(`Contract initialized: ${await contract.getAddress()}`);
      console.log("🔍 ABI:", ABI);
      console.log("🔍 Contract functions:", contract.interface.fragments.map(f => f.name));
      console.log("🔍 Code :", contract.getDeployedCode());

      isInitialized = true;
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  } else {
    console.log("MetaMask is not installed.");
  }
};

initialize();

export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.log("Error requesting account:", error.message);
    return null;
  }
};

const handleSignMessage = async (message) => {
  try {
    const signature = await signer.signMessage(message);
    console.log("Message signed successfully:", signature);
    return signature;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export const getHashMessage = async (plaintext) => {
  if (!isInitialized) {
    console.log("Contract is not initialized yet. Please wait...");
    return null;
  }

  try {
    const getHashMessageData = await contract["getMessageHash(string)"](plaintext);
    const parseMessageHash = await contract["getEthSignedMessageHashV2(string)"](getHashMessageData);
    const getSignMessage = await handleSignMessage(parseMessageHash);
    const data = {
      parsedMsg: parseMessageHash,
      signedMsg: getSignMessage,
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error calling getHashMessage:", error);
    return null;
  }
};

export const verifySignature = async (parsedMsg, signedMsg) => {
  if (!isInitialized) {
    console.log("Contract is not initialized yet. Please wait...");
    return null;
  }

  try {
    const v = Signature.from(signedMsg).v;
    const r = Signature.from(signedMsg).r;
    const s = Signature.from(signedMsg).s;
    const verify = await contract["verify(bytes32,uint8,bytes32,bytes32)"](parsedMsg, v, r, s);
    return verify;
  } catch (error) {
    console.error("Error calling getHashMessage:", error);
    return null;
  }

};