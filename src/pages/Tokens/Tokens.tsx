import "./Tokens.css";
import NFTAll from "../AllNft/AllNft";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import abi from "./abi.json";
declare global {
  interface Window {
    ethereum?: any; // Adjust the type according to your needs
  }
}
const Tokens = () => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const { ethereum } = window;
  const fetchNFTs = async () => {
    try {
      const apiKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM4ZDJiZTdhLWFhOWYtNDExYy1hYTJmLTM0Yjc1MjQ5YjM3YSIsIm9yZ0lkIjoiMjE3NTg2IiwidXNlcklkIjoiMjE3Mjc2IiwidHlwZUlkIjoiNmRiMTYyMTEtYzQ3Ni00ODE3LWFkODYtNWMyOGIyNzVlNTY5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTEzNTQ2MzksImV4cCI6NDg0NzExNDYzOX0.kv-6FF_aF6ri89N4JRuJ_1maSQYCUqh6KjLSGfcMr_o"; // Replace with your Moralis API key
      const contractAddress = "0xB94d0b3c2d7059f4F56aF2977db4a6110e93d64b"; // Replace with your contract address
      const chain = "mumbai";

      const apiUrl = `https://deep-index.moralis.io/api/v2/nft/0x2E620D11c4934772E92851c9aCD947A7Ab4BA62a?chain=mumbai&format=decimal&disable_total=true&normalizeMetadata=false&media_items=false`;

      const response = await axios.get(apiUrl, {
        headers: {
          accept: "application/json",
          "X-API-Key": apiKey,
        },
      });

      console.log(response);
      if (response.data) {
        console.log(response.data.result);
        setNFTs(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // useEffect(() => {
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

  async function transfer(a: any, b: any) {
    try {
      console.log(a, b, "call");
      const web3 = new Web3("https://rpc-mumbai.maticvigil.com"); // Replace with your Ethereum RPC URL

      const privateKey: any = window.localStorage.getItem("private");
      // console.log(privateKey) // Replace with your private key
      const fromAddress: any = b; // Replace with your public address
      const contractAddress: any = "0x2E620D11c4934772E92851c9aCD947A7Ab4BA62a"; // Replace with your NFT contract address
      const Abi: any = abi;
      const nftContract = new web3.eth.Contract(Abi, contractAddress);
      const tokenId = a; // Replace with the token ID you want to transfer
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const toAddress: any = account.address; // Replace with the recipient's address

      const gasPrice = await web3.eth.getGasPrice();
      const gas = 200000; // Adjust the gas amount as needed

      const txCount = await web3.eth.getTransactionCount(fromAddress);

      const data = nftContract.methods
        .transferFrom(toAddress, fromAddress, tokenId)
        .encodeABI();
      console.log(data);
      const nonce = await web3.eth.getTransactionCount(fromAddress, "pending");

      const tx: any = {
        from: fromAddress,
        to: contractAddress,
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gas),
        data: data,
      };

      const signedTx: any = await web3.eth.accounts.signTransaction(
        tx,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt, signedTx, tx);
      alert("transfer success");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="token-page">
      <h1>
        Tokens
        {/* <span>Last updated a minute ago</span> */}
      </h1>
      <div className="bottom-token">
        <br />
        {nfts &&
          nfts.map((nft, index) => {
            console.log("Current NFT:", nft);
            return (
              <div key={index} className="nftCardToken">
                <img
                  src={nft?.token_uri} // Use the appropriate property from the API response
                  alt={`NFT ${nft?.token_id}`}
                  className="nftImage"
                />
                <p className="nft-name">{nft?.name}</p>
                <p className="nftName">{nft?.minter_address}</p>
                <button
                  className="aqua-btn"
                  onClick={() => transfer(nft?.token_id, nft?.minter_address)}
                >
                  Buy Token
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tokens;
