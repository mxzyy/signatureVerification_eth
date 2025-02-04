import Head from "next/head";
import Image from "next/image";
import Account from "./components/account";
import Form from "./components/form";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Signature Verification Tool's</title>
        <meta name="author" content="mxzyy" />
        <meta name="description" content="Test Client dApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="https://ethereum.org/images/favicon.png"/>
      </Head>
      <Navbar/>
      <Account/>
      <Form/>
    </>
  );
}
