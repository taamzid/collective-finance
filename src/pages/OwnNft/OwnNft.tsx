import React from "react";
import { CrossmintNFTCollectionView } from "@crossmint/client-sdk-react-ui";

interface Wallet {
  chain: string;
  publicKey: string;
}

const wallets: Wallet[] = [
  {
    chain: "ethereum",
    publicKey: '"0x93315Fa4AA9b9964c2958C2904635727590807f0"',
  },
];

const NFTOWN: React.FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <CrossmintNFTCollectionView
        wallets={wallets}
        uiConfig={{
          colors: {
            background: "#121429",
            backgroundSecondary: "#001D3D",
            textPrimary: "#FFFFFF",
            textSecondary: "#EEEEEE",
            accent: "#FFC300",
            border: "#FFFFFF",
          },
        }}
      />
    </div>
  );
};

export default NFTOWN;
