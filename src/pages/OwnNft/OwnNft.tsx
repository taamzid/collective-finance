import React,{useEffect,useState} from "react";
import { CrossmintNFTCollectionView } from "@crossmint/client-sdk-react-ui";
import axios from "axios";
import "./OwnNft.css";
interface Wallet {
  chain: string;
  publicKey: string;
}
interface NFT {
  token_id: number;
  name: string;
  token_uri: string;
  address: string;
  price: string;
}

const wallets: Wallet[] = [
  {
    chain: "ethereum",
    publicKey: '"0x93315Fa4AA9b9964c2958C2904635727590807f0"',
  },
];

interface NFTDisplayProps {
  nfts: NFT[];
}


const NFTOWN: React.FC  = () => {
  const [nfts, setNFTs] = useState<any[]>([]);

  const fetchNFTs = async () => {
    try {
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRiMzk4OTlmLTVkOWUtNDI5YS05ZTVlLWMzNDAxMDM4MDVjZiIsIm9yZ0lkIjoiMTUzNDM5IiwidXNlcklkIjoiMTUzMDgzIiwidHlwZUlkIjoiODk3YjM2MzYtMmJlYi00ODdiLWFmYWEtOTZmN2U5ZGVmNjMzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI5NDE5MTcsImV4cCI6NDgzODcwMTkxN30.Zrnq7Ow5WI9lCSKnPbsMmymww2KGPaiBloHxqvNWhQA'; // Replace with your Moralis API key
      const contractAddress = '0xB94d0b3c2d7059f4F56aF2977db4a6110e93d64b'; // Replace with your contract address
      const chain = 'mumbai';


      const apiUrl = `https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal&disable_total=true&normalizeMetadata=false&media_items=false&exclude_spam=false`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'accept': 'application/json',
          'X-API-Key': apiKey,
        },
      });
      
   
        console.log(response)
       if(response.data){
        console.log(response.data.result)
        setNFTs(response.data.result)
       }
     
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);
  return (
    <div className="nft-container">
    {nfts && nfts.map((nft, index) => {
    console.log("Current NFT:", nft);
    return (
      <div key={index} className="nftCard">
        <img
          src={nft?.token_uri} // Use the appropriate property from the API response
          alt={`NFT ${nft?.token_id}`}
          className="nft-image"
        />
        <p className="nft-name">
          {nft?.name} (#{nft?.token_id})
        </p>
        {/* <p className="nft-name">{nft?.token_id}</p> */}
      </div>
    );
})}

  </div>
  );
};

export default NFTOWN;
