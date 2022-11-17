import { useWallet } from "@mysten/wallet-adapter-react";
import { useState } from "react";

export function WalletConnect() {
  const {
    select,
    wallet,
    wallets,
    connected,
    connecting,
    disconnect,
    getAccounts,
  } = useWallet();
  const [modalIsOpen, setIsOpen] = useState(false);

  console.log(wallet);

  return (
    <>
      <button
        className="bg-gradient-to-r from-[#F53168] via-[#FB5B4F] to-[#F57C3E] w-60 mx-3 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Connect Wallet
      </button>
      {modalIsOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-80">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <div className="text-bolder font-bold text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#F53168] via-[#FB5B4F] to-[#F57C3E]">
                    Connect Wallet
                  </div>
                  <div className="text-bolder mb-5 text-sm text-pink-500">
                    Detected {wallets.length} wallet
                  </div>
                  {wallets.map((wallet) => {
                    return (
                      <div
                        key={wallet.name}
                        className="flex flex-center text-center my-2 px-3 py-3 rounded-md hover:bg-gray-100 cursor-pointer text-stone-900"
                        onClick={() => {
                          console.log("wallet", wallet);
                          select(wallet.name);
                        }}
                      >
                        <div className="">
                          <img
                            src={
                              wallet.name !== "Sui Wallet"
                                ? wallet.icon
                                : "https://lh3.googleusercontent.com/SSC3XbDl5y058Dw5lxRqDSoehs26WQqe3cfmBO8hbNOuU8cIxKwT3CM7VD1nGdgbnNbJU7NUq2nGL13mElALRZYC=w128-h128-e365-rj-sc0x00ffffff"
                            }
                            className={`w-8`}
                          />
                        </div>
                        <div className="text-bold text-lg ml-3">
                          {wallet.name}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <button
                      className="bg-gradient-to-r from-[#F53168] via-[#FB5B4F] to-[#F57C3E] w-60 mx-3 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

import React from "react";
