import { MoveCallTransaction, SuiTransactionResponse } from "@mysten/sui.js";
import { WalletAdapter } from "@mysten/wallet-adapter-base";
/**
 * @deprecated This wallet adapter has been replaced by the `WalletStandardAdapterProvider`.
 */
export declare class GlassWalletAdapter implements WalletAdapter {
    connecting: boolean;
    connected: boolean;
    getAccounts(): Promise<string[]>;
    executeMoveCall(transaction: MoveCallTransaction): Promise<SuiTransactionResponse>;
    executeSerializedMoveCall(transactionBytes: Uint8Array): Promise<SuiTransactionResponse>;
    signAndExecuteTransaction(transaction: any): Promise<SuiTransactionResponse>;
    name: string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    constructor();
}
