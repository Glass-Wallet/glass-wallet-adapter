// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
  MoveCallTransaction,
  SuiAddress,
  SuiTransactionResponse,
} from "@mysten/sui.js";
import { WalletAdapter } from "@mysten/wallet-adapter-base";

const ALL_PERMISSION_TYPES = ["viewAccount", "suggestTransactions"] as const;
type AllPermissionsType = typeof ALL_PERMISSION_TYPES;
type PermissionType = AllPermissionsType[number];

interface GlassWallet {
  hasPermissions(permissions: readonly PermissionType[]): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  getAccounts(): Promise<SuiAddress[]>;
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
  signAndExecuteTransaction: (
    transaction: any
  ) => Promise<SuiTransactionResponse>;
}

interface GlassWalletWindow {
  glassWallet: GlassWallet;
}

declare const window: GlassWalletWindow;

/**
 * @deprecated This wallet adapter has been replaced by the `WalletStandardAdapterProvider`.
 */
export class GlassWalletAdapter implements WalletAdapter {
  connecting: boolean;
  connected: boolean;

  getAccounts(): Promise<string[]> {
    return window.glassWallet.getAccounts();
  }
  executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> {
    return window.glassWallet.executeMoveCall(transaction);
  }
  executeSerializedMoveCall(
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> {
    return window.glassWallet.executeSerializedMoveCall(transactionBytes);
  }
  signAndExecuteTransaction(transaction: any): Promise<SuiTransactionResponse> {
    return window.glassWallet.signAndExecuteTransaction(transaction);
  }

  name = "Glass Wallet";

  async connect(): Promise<void> {
    this.connecting = true;
    if (window.glassWallet) {
      const wallet = window.glassWallet;
      try {
        let given = await wallet.requestPermissions();
        const newLocal: readonly PermissionType[] = ALL_PERMISSION_TYPES;
        let perms = await wallet.hasPermissions(newLocal);
        this.connected = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.connecting = false;
      }
    }
  }

  // Come back to this later
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
