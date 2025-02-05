'use client'
import Head from "next/head";
import Image from "next/image";
import Account from "./components/account";
import Form from "./components/form";
import Navbar from "./components/navbar";
import React, { useState, useEffect } from "react";
import { requestAccount } from "./utils/contractServices";
import Result from "./components/result";

export default function Home() {
  const [account, setAccount] = useState(null);
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
      <Form />
      <Result />
    </>
  );
}
