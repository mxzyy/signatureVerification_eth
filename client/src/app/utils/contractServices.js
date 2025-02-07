import ABI from "./ABI.json";
import { Contract, BrowserProvider, BaseContractMethod } from "ethers";
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

      isInitialized = true; // Tandai bahwa kontrak sudah diinisialisasi
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  } else {
    console.log("MetaMask is not installed.");
  }
};

// Panggil initialize untuk menginisialisasi kontrak
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

export const getHashMessage = async (plaintext) => {
  if (!isInitialized) {
    console.log("Contract is not initialized yet. Please wait...");
    return null;
  }

  try {
    // Panggil fungsi getHashMessage di kontrak
    const getHashMessage = contract["getHashMessage(string)"];
    const hashedMessage = await getHashMessage(plaintext);
    console.log(`Hashed message: ${hashedMessage}`);
    return hashedMessage;
  } catch (error) {
    console.error("Error calling getHashMessage:", error);
    return null;
  }
};