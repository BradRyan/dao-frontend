import React from "react";

export async function getStaticProps() {
  // TODO: Figure out how to query all of the file system? Or will this have to be server side query?
  const vans = [
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

  return { props: { vans } };
}

function Gallery({ vans }) {
  return (
    <div>
      {vans.map((van) => (
        <div key={van.id}>
          <h2>{van.name}</h2>
          <img src={van.imageUrl} alt={van.name} />
          <p>{van.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
