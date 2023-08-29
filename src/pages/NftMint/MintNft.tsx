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
  const mintTo = window.localStorage.getItem('address') || ''; // Provide an empty string as a fallback
  return (
    <div className="nft-container">
      {nfts.map((nft) => (
        <>
          <div key={nft.tokenId} className="nftCard">
            <img
              src={nft.imageSrc}
              alt={`NFT ${nft.tokenId}`}
              className="nft-image"
            />
            <div className="flexButton">
              <div>
                <p className="nft-name">{nft.name}</p>
                <p className="nft-token-id">${nft.price}</p>
                <p>{nft.address}</p>
              </div>
              <div>
                <CrossmintPayButton
                  className="xmint-btn"
                  collectionId="23007daf-c3eb-4553-81c8-fabb0af9bc97"
                  projectId="31feedb2-4ae4-4328-9efe-9bc177f9fb24"
                  mintConfig={{
                    type: "erc-721",
                    totalPrice: "0.001",
                    _tokenURI: nft.imageSrc,
                    quantity: "1",
                  }}
                  environment="staging"
                  mintTo={mintTo}
                />
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default NFTDisplay;
