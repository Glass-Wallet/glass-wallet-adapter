// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import "./App.css";
import { useMemo } from "react";
import {
  Wallet,
  WalletAdapter,
  WalletProvider,
} from "@mysten/wallet-adapter-react";
import MainScreen from "./MainScreen";
import { GlassWalletAdapter } from "@glass-wallet/glass-wallet-adapter";

const glassAdapter = new GlassWalletAdapter();

function App() {
  const adapters = useMemo(() => {
    return [
      {
        adapter: glassAdapter,
      } as Wallet,
    ];
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <WalletProvider supportedWallets={adapters}>
          <MainScreen />
        </WalletProvider>
      </header>
    </div>
  );
}

export default App;
