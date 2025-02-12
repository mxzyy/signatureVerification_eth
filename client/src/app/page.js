"use client"
import Head from "next/head";
import Image from "next/image";
import Account from "./components/account";
import Form, { getDataHash } from "./components/form";
import Navbar from "./components/navbar";
import React, { useState, useEffect } from "react";
import { getHashMessage, requestAccount, verifySignature } from "./utils/contractServices";
import Result from "./components/result";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [inputData, setInputData] = useState('');
  const [hashData, setInputHash] = useState('');

  const [result, setResult] = useState('');
  const [resultV, setResultV] = useState('');

  const [hash, setHash] = useState('');
  const [resultverify, setResultVerify] = useState('');

  const [isHash, setBoolHash] = useState(false);
  const [isVerify, setBoolVerify] = useState(false);

  const processData = (data) => {
    const processedData = data;
    console.log(`proddata : ${data}`)
    setResult(processedData);
  };

  const processHash = (hashdata) => {
    console.log(`hashdata page : ${hashdata}`);
    setResultV(hashdata);
  };

  useEffect(() => {
    const fetchHash = async () => {
      if (result) {
        try {
          console.log("call fetchHash");
          const hash = await getHashMessage(result);
          setHash(hash);
          setBoolHash(true);
          setBoolVerify(false);
          setResult('');
        } catch (error) {
          console.error("❌ Error:", error);
        }
      }
    };

    fetchHash();
  }, [result]);

  useEffect(() => {
    const fetchVerify = async () => {
      if (resultV) {
        try {
          console.log("hash Data : ", resultV);
          const parseHashData = JSON.parse(resultV);
          const parsedMsg = parseHashData.parsedMsg;
          const signedMsg = parseHashData.signedMsg;
          console.log(`parsedMsg : ${parsedMsg}`);
          console.log(`signedMsg : ${signedMsg}`);
          const verifyResult = await verifySignature(parsedMsg, signedMsg);
          setResultVerify(verifyResult);
          setBoolVerify(true);
          setBoolHash(false);
          setResultV('');
        } catch (error) {
          console.error("❌ Error:", error);
        }
      }
    };

    fetchVerify();
  }, [resultV]);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });



  return (
    <>
      <Head>
        <meta name="author" content="mxzyy" />
        <meta name="description" content="Test Client dApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="https://ethereum.org/images/favicon.png" />
      </Head>
      <Navbar />
      <Account setAccount={setAccount} accountAddr={account} />
      <Form setInputData={setInputData} processData={processData} setInputHash={setInputHash} processHash={processHash} />
      <Result result={isHash ? hash : ""} verifyResult={isVerify ?resultverify : ""} />
    </>
  );
}
