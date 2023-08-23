import React from "react";
import "./MintNft.css";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
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

const NFTDisplay: React.FC<NFTDisplayProps> = ({ nfts }) => {
  return (
    <div className="nft-container">
      {nfts.map((nft) => (
        <>
          <div key={nft.tokenId} className="nft-card">
            <img
              src={nft.imageSrc}
              alt={`NFT ${nft.tokenId}`}
              className="nft-image"
            />
            <p className="nft-name">{nft.name}</p>
            <p className="nft-token-id">Price: {nft.price}</p>
            <br />
            <CrossmintPayButton
              collectionId="default-polygon"
              projectId="31feedb2-4ae4-4328-9efe-9bc177f9fb24"
              mintConfig={{
                type: "managed-metaplex",
                totalPrice: nft.price,
                quantity: "1",
              }}
              environment="staging"
              mintTo={nft.address}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default NFTDisplay;
