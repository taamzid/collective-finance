import "./Tokens.css";
import NFTAll from "../AllNft/AllNft";
import { useEffect, useState } from "react";
import axios from "axios";

const Tokens = () => {
  const [nfts, setNFTs] = useState<any[]>([]); 

  useEffect(() => {
    axios
      .get("https://chat-backends-d0a914c9d2e6.herokuapp.com/wallet/getNft")
      .then((response) => {
        const data = response.data;
        console.log(data.data, "data");
        setNFTs(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="token-page">
      <h1>
        Tokens
        {/* <span>Last updated a minute ago</span> */}
      </h1>
      <div className="bottom-token">
        <br />
        {nfts.length === 0 ? (
          <h2>We haven't found any tokens in this wallet.</h2>
        ) : (
          <NFTAll />
        )}
      </div>
    </div>
  );
};

export default Tokens;
