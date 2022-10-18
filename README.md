<a href="https://glasswallet.app"><p align="center">
<img width="480" src="./assets/logo.svg"/>
</a>

# Glass Wallet Adapter

## Integrate your DApp with Glass Wallet.

With this adapter, your DApp can easily connect with the Glass Wallet.

## 🚀 Get Started
### Installation

1. A React project
2. Install required npm packages

```bash
npm install @mysten/wallet-adapter-react @glass-wallet/glass-wallet-adapter
```

### Setup

```jsx
// main.js
import {WalletProvider} from "@mysten/wallet-adapter-react";
import {GlassWalletAdapter} from "@glass-wallet/glass-wallet-adapter";
import GlassIcon from "@glass-wallet/glass-wallet-adapter/assets/logo.svg";
import GlassRoundIcon from "@glass-wallet/glass-wallet-adapter/assets/logo-round.svg";
import GlassMarkIcon from "glass-wallet-adapter/logo-mark.svg"

const supportedWallets = [
  {adapter: new GlassWalletAdapter()},
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider supportedWallets={supportedWallets}>
      <App/>
    </WalletProvider>
  </React.StrictMode>
);
```
<br/>

#### @Reference: [MystenLabs/sui](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/packages/adapters/sui-wallet)
