// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import "./App.css";
import { useMemo } from "react";
import { WalletProvider } from "@mysten/wallet-adapter-react";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-all-wallets";
import MainScreen from "./MainScreen";

function App() {
  const adapters = useMemo(() => [new WalletStandardAdapterProvider()], []);

  return (
    <div className="App">
      <header className="App-header">
        <WalletProvider adapters={adapters}>
          <MainScreen />
        </WalletProvider>
      </header>
    </div>
  );
}

export default App;
