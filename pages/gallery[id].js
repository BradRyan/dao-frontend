import React from "react";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const vanNfts = [
    {
      id: 0,
      imageUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/0.png",
      metadataUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/0.json",
      name: "Dirt Bad",
      description: "A drawing of clean dirtbag",
      attributes: [],
    },
    {
      id: 1,
      imageUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/1.png",
      metadataUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/1.json",
      name: "Sassy Steve",
      description: "A drawing of sassy steve",
      attributes: [],
    },
    {
      id: 2,
      imageUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/2.png",
      metadataUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/2.json",
      name: "clean-dirtbad",
      description: "A drawing of clean dirtbag",
      attributes: [],
    },
    {
      id: 3,
      imageUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/3.png",
      metadataUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/3.json",
      name: "sloppy-brakes",
      description: "A drawing of sloppy brakes",
      attributes: [],
    },
    {
      id: 4,
      imageUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/4.png",
      metadataUrl:
        "https://gateway.pinata.cloud/ipfs/QmNbpCqZhXVLhddRSapVtST5jkvxo2VAJ4WtT5U7PyR8pt/4.json",
      name: "buggy-windshield",
      description: "A drawing of buggy windshield",
      attributes: [],
    },
  ];

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { props: { vanNfts } };
}

function Gallery() {
  return <div></div>;
}

export default Gallery;
