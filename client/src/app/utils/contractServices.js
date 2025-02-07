import ABI from "./ABI.json";
import { Contract, ethers, BrowserProvider, Typed  } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import web3 from 'web3';

let provider;
let signer;
let contract;
let contract_call;

const initialize = async () => {
  //await window.ethereum.enable();
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
    console.log(`ct : ${contract} `);
  } else {
    console.log("err");
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


export const getHashMessage = async (plaintext) => {
  console.log(`gethash : ${await contract}`);
  //const hashed_message = await contract;
  console.log(`hashed_message : ${hashed_message}`);
  return plaintext;
  // const parsed_hash = await contract.getEthSignedMessageHashV2(hashed_message);
  // const signed_message = await contract.signMessage(parsed_hash);
  // return signed_message;
}