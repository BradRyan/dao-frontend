import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import styled from "styled-components";
import axios from "axios";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";

// TODO: Remove?
import styles from "../styles/Home.module.css";

// import KiftVans from "../config/KiftVans.json";
import Navbar from "../components/Navbar";
import Link from "next/link";

const KIFT_VANS_CONTRACT_ADDRESS = "0xbaa1763C83063fe8571Ff8A8D8AD903CF1DA94d9";

const rpcEndpoint = "https://rpc-mumbai.matic.today";

// const getImageData = (tokenId) => {
//   const CONTENT_ID = "QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt";

//   const metadataURI = `https://gateway.pinata.cloud/ipfs/${CONTENT_ID}/${tokenId}.json`;
//   const imageURI = `https://gateway.pinata.cloud/ipfs/${CONTENT_ID}/${tokenId}.png`;
//   return { metadataURI, imageURI };
// };

const StyledSection = styled.section`
  display: flex;
  padding: 3rem;
  width: 100%;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kift NFT Sale</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <StyledSection>
          <div>
            <Image src="/vans/1.png" alt="me" width="64" height="64" />
            <Image src="/vans/2.png" alt="me" width="64" height="64" />
            <Image src="/vans/3.png" alt="me" width="64" height="64" />
            <Image src="/vans/4.png" alt="me" width="64" height="64" />
          </div>

          <div>
            <h2>A Collection of 10,000 Livables</h2>
            <Link href="/gallery">
              <button>Browse Vans</button>
            </Link>
          </div>
        </StyledSection>

        <StyledSection>
          <h2>Roadmap / Utility</h2>
        </StyledSection>
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

// TODO: Ignore content below, I need to refactor this into a new component:

// function App() {
//   const [balance, setBalance] = useState();

//   async function getBalance() {
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);

//     const [account] = await connection.request({
//       method: "eth_requestAccounts",
//     });

//     const balance = await provider.getBalance(account);
//     setBalance(ethers.utils.formatEther(balance));
//   }

//   async function getNfts() {
//     // provider is the blockchain
//     const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

//     // get the smart contract
//     const contract = new ethers.Contract(
//       KIFT_VANS_CONTRACT_ADDRESS,
//       KiftVans.abi,
//       provider
//     );
//     const count = await contract.count();

//     console.warn({ contract, count: parseInt(count) });
//   }

//   useEffect(() => {
//     getNfts();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h5>Your Balance: {balance}</h5>
//         <button onClick={() => getBalance()}>Show My Balance</button>
//         {/* <button onClick={() => mintNft()}>Mint a van!</button> */}
//       </div>

//       <p className={styles.description}>Get started by minting a van!</p>

//       <div className={styles.grid}>
//         {Array(10)
//           .fill(0)
//           .map((_, i) => (
//             <div key={i} className={styles.card}>
//               <NFTImage tokenId={i + 1} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// const getMintedStatus = async (metadataURI) => {
//   const web3Modal = new Web3Modal();
//   const connection = await web3Modal.connect();
//   const provider = new ethers.providers.Web3Provider(connection);
//   // const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
//   const contract = new ethers.Contract(
//     KIFT_VANS_CONTRACT_ADDRESS,
//     KiftVans.abi,
//     provider
//   );

//   const isMinted = await contract.isContentOwned(metadataURI);
//   if (isMinted) console.warn({ isMinted, metadataURI });
//   return isMinted;
// };

// async function mintNFT(metadataURI) {
//   const web3Modal = new Web3Modal();
//   const connection = await web3Modal.connect({
//     // cacheProvider: false,
//   });
//   const provider = new ethers.providers.Web3Provider(connection);
//   const signer = provider.getSigner();

//   const contract = new ethers.Contract(
//     KIFT_VANS_CONTRACT_ADDRESS,
//     KiftVans.abi,
//     signer
//   );

//   // TODO: should payToMint should use msg.sender vs take the address as an argument
//   const signerAddress = await signer.getAddress();
//   const result = await contract.payToMint(signerAddress, metadataURI, {
//     value: ethers.utils.parseEther("0.05"),
//   });

//   console.warn({ result });
//   return result;
// }

// function NFTImage({ tokenId }) {
//   const [isMinted, setIsMinted] = useState(false);
//   const [meta, setMeta] = useState({});
//   const { metadataURI, imageURI } = getImageData(tokenId);

//   useEffect(() => {
//     if (!metadataURI) return;

//     getMintedStatus(metadataURI).then((data) => {
//       // debugger;
//       setIsMinted(data);
//     });
//   }, [metadataURI]);

//   useEffect(() => {
//     if (!metadataURI) return;

//     axios.get(metadataURI).then(({ data }) => {
//       setMeta(data);
//     });
//   }, [metadataURI]);

//   return (
//     <div className="card">
//       <img src={imageURI} style={{ width: "100%" }} />

//       <div className="card-body">
//         <h5 className="card-title">ID #{tokenId}</h5>
//         <h5>{meta.name}</h5>
//         <div>{meta.description}</div>
//         {isMinted ? (
//           <div>Minted!</div>
//         ) : (
//           <button
//             onClick={() => mintNFT(metadataURI).then(() => setIsMinted(true))}
//           >
//             Mint
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
