import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import styled from "styled-components";
import axios from "axios";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";

import styles from "../styles/Home.module.css";

import KiftVans from "../config/KiftVans.json";

const KIFT_VANS_CONTRACT_ADDRESS = "0xbaa1763C83063fe8571Ff8A8D8AD903CF1DA94d9";

const rpcEndpoint = "https://rpc-mumbai.matic.today";

const getImageData = (tokenId) => {
  const CONTENT_ID = "QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt";

  const metadataURI = `https://gateway.pinata.cloud/ipfs/${CONTENT_ID}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${CONTENT_ID}/${tokenId}.png`;
  return { metadataURI, imageURI };
};

export default function Home() {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(false);

  useEffect(() => {
    setMetamaskInstalled(!!window?.ethereum);
  }, []);

  // metamask:
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (!window.ethereum) return;

  //       const accounts = await ethereum.request({ method: "eth_accounts" });

  //       if (accounts.length) {
  //         setConnectedWallet(accounts[0]);

  //         // getAllTransactions();
  //       } else {
  //         console.log("No accounts found");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // Web3Modal
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const web3Modal = new Web3Modal();
  //       const connection = await web3Modal.connect();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // const connectWallet = async () => {
  //   // /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  //   const web3Modal = new Web3Modal({
  //     providerOptions: {
  //       // metamak wallet
  //       injected: {
  //         display: {
  //           logo: "data:image/gif;base64,INSERT_BASE64_STRING",
  //           name: "Injected",
  //           description: "Connect with the provider in your Browser",
  //         },
  //       },
  //     },
  //   });
  //   const provider = await web3Modal.connect();
  //   // return window.ethereum.request({ method: "eth_accounts" });
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kift NFT Sale</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="https://nextjs.org">Kift DAO</a>
        </h1>
        {address && <>Wallet: {address}</>}
        {address ? (
          <App />
        ) : (
          <div>
            {!metamaskInstalled && (
              <div>
                Please{" "}
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  without
                  rel="noreferrer"
                >
                  install Metamask
                </a>
              </div>
            )}

            {metamaskInstalled && !address && (
              <div>
                <div>Please connect to Metamask to continue</div>
                <button onClick={() => connectWallet("injected")}>
                  Connect
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

function App() {
  const [balance, setBalance] = useState();
  const [myNfts, setMyNfts] = useState([]);

  async function getBalance() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const [account] = await connection.request({
      method: "eth_requestAccounts",
    });

    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  }

  async function getNfts() {
    // provider is the blockchain
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

    // get the smart contract
    const contract = new ethers.Contract(
      KIFT_VANS_CONTRACT_ADDRESS,
      KiftVans.abi,
      provider
    );
    const count = await contract.count();

    console.warn({ contract, count: parseInt(count) });
  }

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <div>
      <div>
        <h5>Your Balance: {balance}</h5>
        <button onClick={() => getBalance()}>Show My Balance</button>
        {/* <button onClick={() => mintNft()}>Mint a van!</button> */}
      </div>

      <p className={styles.description}>Get started by minting a van!</p>

      <div className={styles.grid}>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={styles.card}>
              <NFTImage tokenId={i + 1} />
            </div>
          ))}
      </div>
    </div>
  );
}

const getMintedStatus = async (metadataURI) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  // const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const contract = new ethers.Contract(
    KIFT_VANS_CONTRACT_ADDRESS,
    KiftVans.abi,
    provider
  );

  const isMinted = await contract.isContentOwned(metadataURI);
  if (isMinted) console.warn({ isMinted, metadataURI });
  return isMinted;
};

async function mintNFT(metadataURI) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect({
    // cacheProvider: false,
  });
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    KIFT_VANS_CONTRACT_ADDRESS,
    KiftVans.abi,
    signer
  );

  // TODO: should payToMint should use msg.sender vs take the address as an argument
  const signerAddress = await signer.getAddress();
  const result = await contract.payToMint(signerAddress, metadataURI, {
    value: ethers.utils.parseEther("0.05"),
  });

  console.warn({ result });
  return result;
}

function NFTImage({ tokenId }) {
  const [isMinted, setIsMinted] = useState(false);
  const [meta, setMeta] = useState({});
  const { metadataURI, imageURI } = getImageData(tokenId);

  useEffect(() => {
    if (!metadataURI) return;

    getMintedStatus(metadataURI).then((data) => {
      // debugger;
      setIsMinted(data);
    });
  }, [metadataURI]);

  useEffect(() => {
    if (!metadataURI) return;

    axios.get(metadataURI).then(({ data }) => {
      setMeta(data);
    });
  }, [metadataURI]);

  return (
    <div className="card">
      <img src={imageURI} style={{ width: "100%" }} />

      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        <h5>{meta.name}</h5>
        <div>{meta.description}</div>
        {isMinted ? (
          <div>Minted!</div>
        ) : (
          <button
            onClick={() => mintNFT(metadataURI).then(() => setIsMinted(true))}
          >
            Mint
          </button>
        )}
      </div>
    </div>
  );
}
