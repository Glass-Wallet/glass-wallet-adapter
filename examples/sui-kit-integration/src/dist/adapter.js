import { GlassIcon } from "./GlassIcon";
const ALL_PERMISSION_TYPES = ["viewAccount", "suggestTransactions"];
export class GlassWalletAdapter {
    connecting;
    connected;
    name = "Glass Wallet";
    icon = GlassIcon;
    getAccounts() {
        return window.glassWallet.getAccounts();
    }
    signAndExecuteTransaction(transaction) {
        return window.glassWallet.signAndExecuteTransaction(transaction);
    }
    executeMoveCall(transaction) {
        return window.glassWallet.executeMoveCall(transaction);
    }
    executeSerializedMoveCall(transactionBytes) {
        return window.glassWallet.executeSerializedMoveCall(transactionBytes);
    }
    async connect() {
        this.connecting = true;
        if (window.glassWallet) {
            const wallet = window.glassWallet;
            try {
                await wallet.requestPermissions();
                const newLocal = ALL_PERMISSION_TYPES;
                await wallet.hasPermissions(newLocal);
                this.connected = true;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                this.connecting = false;
            }
        }
        else {
        }
    }
    async disconnect() {
        if (this.connected == true) {
            this.connected = false;
        }
    }
    constructor() {
        this.connected = false;
        this.connecting = false;
    }
}
