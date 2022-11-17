import {
  MoveCallTransaction,
  SignableTransaction,
  SuiAddress,
  SuiTransactionResponse,
} from "@mysten/sui.js";
import { GlassIcon } from "./GlassIcon";

const ALL_PERMISSION_TYPES = ["viewAccount", "suggestTransactions"] as const;
type AllPermissionsType = typeof ALL_PERMISSION_TYPES;
type PermissionType = AllPermissionsType[number];

interface GlassWallet {
  hasPermissions(permissions: readonly PermissionType[]): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  getAccounts(): Promise<SuiAddress[]>;
  executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse>;
  executeSerializedMoveCall(
    transactionBytes: string | Uint8Array
  ): Promise<SuiTransactionResponse>;
  signAndExecuteTransaction(
    transaction: SignableTransaction
  ): Promise<SuiTransactionResponse>;
}

interface GlassWalletWindow {
  glassWallet: GlassWallet;
}

declare const window: GlassWalletWindow;

export class GlassWalletAdapter {
  connecting: boolean;
  connected: boolean;
  name = "Glass Wallet";
  icon = GlassIcon;

  getAccounts(): Promise<string[]> {
    return window.glassWallet.getAccounts();
  }

  signAndExecuteTransaction(
    transaction: SignableTransaction
  ): Promise<SuiTransactionResponse> {
    return window.glassWallet.signAndExecuteTransaction(transaction);
  }

  executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> {
    return window.glassWallet.executeMoveCall(transaction);
  }
  executeSerializedMoveCall(
    transactionBytes: string | Uint8Array
  ): Promise<SuiTransactionResponse> {
    return window.glassWallet.executeSerializedMoveCall(transactionBytes);
  }

  async connect(): Promise<void> {
    this.connecting = true;
    if (window.glassWallet) {
      const wallet = window.glassWallet;
      try {
        await wallet.requestPermissions();
        const newLocal: readonly PermissionType[] = ALL_PERMISSION_TYPES;
        await wallet.hasPermissions(newLocal);
        this.connected = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.connecting = false;
      }
    } else {
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected == true) {
      this.connected = false;
    }
  }

  constructor() {
    this.connected = false;
    this.connecting = false;
  }
}
