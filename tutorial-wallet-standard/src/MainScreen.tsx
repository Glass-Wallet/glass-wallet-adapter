import { useWallet } from "@mysten/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { WalletConnect } from "./WalletConnect";
import logo from "../logo.png";

export default function MainScreen() {
  const {
    wallet,
    connected,
    disconnect,
    getAccounts,
    signAndExecuteTransaction,
  } = useWallet();

  const [account, setAccount] = useState("");

  useEffect(() => {
    if (wallet && connected) {
      getAccounts().then((accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, [wallet]);

  async function handleExecuteMoveCall() {
    try {
      const data = {
        packageObjectId: "0x2",
        module: "devnet_nft",
        function: "mint",
        typeArguments: [],
        arguments: [
          "Glass",
          "Glass Icon",
          "https://bafybeihddf4cxc4h33npwbm2ovllcjformron75ioogoqagwien6ithsba.ipfs.w3s.link/logo2.svg",
        ],
        gasBudget: 10000,
      };
      const resData = await signAndExecuteTransaction({
        kind: "moveCall",
        data,
      });
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  return (
    <div>
      <div className="flex flex-center flex-col mb-10">
        <div className="mx-auto mb-9">
          <img src={logo} className="w-40" />
        </div>
        <div className="text-5xl text-bold">Glass Wallet Adapter Example</div>
      </div>
      {!wallet ? (
        <WalletConnect />
      ) : (
        <div className="flex flex-col">
          <div className="text-[16px] mb-3">Current wallet: {wallet.name}</div>
          <div className="text-[16px] mb-3">Account: {account}</div>
          <div className="">
            <button
              className="bg-gradient-to-r from-[#F53168] via-[#FB5B4F] to-[#F57C3E] w-60 mx-3 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleExecuteMoveCall()}
            >
              Mint Demo NFT
            </button>
            <button
              className="bg-gradient-to-r from-[#F53168] via-[#FB5B4F] to-[#F57C3E] w-60 mx-3 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
