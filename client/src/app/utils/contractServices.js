import ABI from "./ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther, Interface } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";


let provider;
let signer;
let contract;

const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

initialize();

export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};

export const getContractBalanceInETH = async () => {
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceEth = formatEther(balanceWei);
  return balanceEth;
};

export const getHashMessage = async (plaintext) => {
  const hashed_message = await contract.getMessageHash(plaintext);
  const parsed_hash = await contract.getEthSignedMessageHashV2(hashed_message);
  const signed_message = await contract.signMessage(parsed_hash);
  return signed_message;
}