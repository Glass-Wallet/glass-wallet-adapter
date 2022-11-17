<a href="https://glasswallet.app"><p align="center">
<img width="480" src="./assets/logo.svg"/>
</a>

# Glass Wallet Adapter

## Integrate your DApp with Glass Wallet.

With this adapter, your DApp can easily connect with the Glass Wallet.
Demo: https://glass-wallet-integrate-demo.vercel.app/

## 🚀 Get Started
### Installation

```bash
npm install @glass-wallet/glass-wallet-adapter
# or
yarn add install @glass-wallet/glass-wallet-adapter
```

### Setup

#### With WalletStandardAdapterProvider
```jsx
// App.js
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
```
<br/>

#### With GlassWalletAdapter
```jsx
// App.js
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

```
<br/>


#### @Reference: [MystenLabs/sui](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/packages/adapters/sui-wallet)
