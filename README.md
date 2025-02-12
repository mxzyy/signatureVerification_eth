# Signature Verification

![](https://raw.githubusercontent.com/mxzyy/signatureVerification_eth/refs/heads/main/image.png)

This project is implemented from Ethereum Digital Signature Verification mechanism. Using the Keccak-256 Hash algorithm, Private-key signing verification, and many more! (Just personal project)

Running the project:

(Make sure has MetaMask Extension + Connected to Local)
Init Hardhat
```shell
npx hardhat node
npx hardhat test
npx hardhat ignition deploy ignition/modules/deploy.js --network localhost

```

Note : 
```shell
# If got BAD_DATA Exception
rm -rf ignition/deployments
npx hardhat ignition deploy ignition/modules/deploy.js --network localhost

```


Running dApp
```shell
cd client/
npm run dev
```


Sauce : 
* [Ethers.js](https://docs.ethers.org/v6)
* [Hardhat.js](https://hardhat.org/docs)
* [Chai.js](https://www.chaijs.com/api/assert/)
* [MetaMask Devnet](https://docs.metamask.io/wallet/how-to/run-devnet/)


TODO : 
- Web Design ✅
- Connect MetaMask ✅
- Deploy DevNet 
