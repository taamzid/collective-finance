import React, { useState, useEffect } from "react";
import "./AllNft.css";
import axios from "axios";
interface NFT {
  tokenId: number;
  name: string;
  imageSrc: string;
  address: string;
  price: string;
}

interface NFTDisplayProps {
  nfts: NFT[];
}

const NFTAll: React.FC = () => {
  // const [nfts, setNFTs] = useState<any[]>([]); // Use an appropriate type for NFT data

  // useEffect(() => {
  //   // Fetch NFT data from the API
  //   axios
  //     .get("https://chat-backends-d0a914c9d2e6.herokuapp.com/wallet/getNft")
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data.data, "data");
  //       setNFTs(data.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="nft-container">
      {/* {nfts.map((nft) => (
        <>
          <div key={nft.id} className="nft-card">
            <img
              src="https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE"
              alt={`NFT ${nft.id}`}
              className="nft-image"
            />
            <p className="nft-name">{nft.name}</p>
            <p className="nft-token-id">token id: {nft.id}</p>
          </div>
        </>
      ))} */}
    </div>
  );
};

export default NFTAll;
