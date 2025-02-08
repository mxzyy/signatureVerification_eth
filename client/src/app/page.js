"use client"
import Head from "next/head";
import Image from "next/image";
import Account from "./components/account";
import Form, { getDataHash } from "./components/form";
import Navbar from "./components/navbar";
import React, { useState, useEffect } from "react";
import { getHashMessage, requestAccount } from "./utils/contractServices";
import Result from "./components/result";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState('');
  const [hash, setHash ] = useState('');

  const processData = (data) => {
    const processedData = data;
    console.log(`proddata : ${data}`)
    setResult(processedData);
  };

  useEffect(() => {
    const fetchHash = async () => {
      if (result) {  // Pastikan result tidak kosong sebelum diproses
        try {
          console.log("call fetchHash");
          const hash = await getHashMessage(result);
          setHash(hash);
        } catch (error) {
          console.error("❌ Error:", error);
        }
      }
    };

    fetchHash();
  }, [result]);  

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
        <title>Signature Verification Tool's</title>
        <meta name="author" content="mxzyy" />
        <meta name="description" content="Test Client dApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="https://ethereum.org/images/favicon.png" />
      </Head>
      <Navbar />
      <Account setAccount={setAccount} accountAddr={account}/>
      <Form setInputData={setInputData} processData={processData} />
      <Result result={hash} />
    </>
  );
}
