/* tslint:disable */
/* eslint-disable */
/**
 * Convert bytes to hex string.
 * TODO: this is a function for convenience, it is going to be deleted after all interfaces are
 * finalized (simplicity related)
 */
export function bytesToHex(bytes: Uint8Array): string;
/**
 * Get the x-only public key for a given derivation path from a signer.
 * TODO: move to the Signer structure
 */
export function simplicityDeriveXonlyPubkey(signer: Signer, derivation_path: string): XOnlyPublicKey;
/**
 * Compute the Taproot control block for Simplicity script-path spending.
 */
export function simplicityControlBlock(cmr: Cmr, internal_key: XOnlyPublicKey): ControlBlock;
/**
 * Convert the given string to a QR code image uri
 *
 * The image format is monocromatic bitmap, returned as an encoded in base64 uri.
 *
 * Without `pixel_per_module` the default is no border, and 1 pixel per module, to be used
 * for example in html: `style="image-rendering: pixelated; border: 20px solid white;"`
 */
export function stringToQr(str: string, pixel_per_module?: number | null): string;
export function searchLedgerDevice(): Promise<HIDDevice>;
/**
 * Generate the asset entropy from the issuance prevout and the contract hash.
 */
export function generateAssetEntropy(outpoint: OutPoint, contract_hash: ContractHash): ContractHash;
/**
 * Compute the asset ID from an issuance outpoint and contract hash.
 */
export function assetIdFromIssuance(outpoint: OutPoint, contract_hash: ContractHash): AssetId;
/**
 * Compute the reissuance token ID from an issuance outpoint and contract hash.
 */
export function reissuanceTokenFromIssuance(outpoint: OutPoint, contract_hash: ContractHash, is_confidential: boolean): AssetId;
/**
 * Wallet chain
 */
export enum Chain {
  /**
   * External address, shown when asked for a payment.
   * Wallet having a single descriptor are considered External
   */
  External = 0,
  /**
   * Internal address, used for the change
   */
  Internal = 1,
}
/**
 * Log level for Simplicity program execution tracing.
 */
export enum SimplicityLogLevel {
  /**
   * No output during execution.
   */
  None = 0,
  /**
   * Print debug information.
   */
  Debug = 1,
  /**
   * Print debug and warning information.
   */
  Warning = 2,
  /**
   * Print debug, warning, and jet execution trace.
   */
  Trace = 3,
}
/**
 * An Elements (Liquid) address
 */
export class Address {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `Address`
   *
   * If you know the network, you can use `parse()` to validate that the network is consistent.
   */
  constructor(s: string);
  /**
   * Parses an `Address` ensuring is for the right network
   */
  static parse(s: string, network: Network): Address;
  /**
   * Return the script pubkey of the address.
   */
  scriptPubkey(): Script;
  /**
   * Return true if the address is blinded, in other words, if it has a blinding key.
   */
  isBlinded(): boolean;
  /**
   * Return true if the address is for mainnet.
   */
  isMainnet(): boolean;
  /**
   * Return the unconfidential address, in other words, the address without the blinding key.
   */
  toUnconfidential(): Address;
  /**
   * Return the string representation of the address.
   * This representation can be used to recreate the address via `new()`
   */
  toString(): string;
  /**
   * Returns a string encoding an image in a uri
   *
   * The string can be open in the browser or be used as `src` field in `img` in HTML
   *
   * For max efficiency we suggest to pass `None` to `pixel_per_module`, get a very small image
   * and use styling to scale up the image in the browser. eg
   * `style="image-rendering: pixelated; border: 20px solid white;"`
   */
  QRCodeUri(pixel_per_module?: number | null): string;
  /**
   * Returns a string of the QR code printable in a terminal environment
   */
  QRCodeText(): string;
}
/**
 * Value returned from asking an address to the wallet.
 * Containing the confidential address and its
 * derivation index (the last element in the derivation path)
 */
export class AddressResult {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the address.
   */
  address(): Address;
  /**
   * Return the derivation index of the address.
   */
  index(): number;
}
/**
 * Context for actions related to an AMP0 (sub)account
 *
 * <div class="warning">
 * <b>WARNING:</b>
 *
 * AMP0 is based on a legacy system, and some things do not fit precisely the way LWK allows to do
 * things.
 *
 * Callers must be careful with the following:
 * * <b>Addresses: </b>
 *   to get addresses use [`Amp0::address()`]. This ensures
 *   that all addresses used are correctly monitored by the AMP0 server.
 * * <b>Syncing: </b>
 *   to sync the AMP0 [`crate::Wollet`], use [`Amp0::last_index()`] and [`crate::clients::blocking::BlockchainBackend::full_scan_to_index()`]. This ensures that all utxos are synced, even if there are gaps between higher than the GAP LIMIT.
 *
 * <i>
 * Failing to do the above might lead to inconsistent states, where funds are not shown or they
 * cannot be spent!
 * </i>
 * </div>
 */
export class Amp0 {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new AMP0 context for the specified network
   */
  static newWithNetwork(network: Network, username: string, password: string, amp_id: string): Promise<Amp0>;
  /**
   * Create a new AMP0 context for testnet
   */
  static newTestnet(username: string, password: string, amp_id: string): Promise<Amp0>;
  /**
   * Create a new AMP0 context for mainnet
   */
  static newMainnet(username: string, password: string, amp_id: string): Promise<Amp0>;
  /**
   * Index of the last returned address
   *
   * Use this and [`crate::EsploraClient::full_scan_to_index()`] to sync the `Wollet`
   */
  lastIndex(): number;
  /**
   * AMP ID
   */
  ampId(): string;
  /**
   * Get an address
   *
   * If `index` is None, a new address is returned.
   */
  address(index?: number | null): Promise<AddressResult>;
  /**
   * The LWK watch-only wallet corresponding to the AMP0 (sub)account.
   */
  wollet(): Wollet;
  /**
   * Ask AMP0 server to cosign
   */
  sign(amp0pset: Amp0Pset): Promise<Transaction>;
}
/**
 * Session connecting to AMP0
 */
export class Amp0Connected {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Connect and register to AMP0.
   */
  static connect(network: Network, signer_data: Amp0SignerData): Promise<Amp0Connected>;
  /**
   * Obtain a login challenge
   *
   * This must be signed with [`amp0_sign_challenge()`].
   */
  getChallenge(): Promise<string>;
  /**
   * Log in
   *
   * `sig` must be obtained from [`amp0_sign_challenge()`] called with the value returned
   * by [`Amp0Connected::get_challenge()`]
   */
  login(sig: string): Promise<Amp0LoggedIn>;
}
/**
 * Session logged in AMP0
 */
export class Amp0LoggedIn {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * List of AMP IDs.
   */
  getAmpIds(): string[];
  /**
   * Get the next account for AMP0 account creation
   *
   * This must be given to [`amp0_account_xpub()`] to obtain the xpub to pass to
   * [`Amp0LoggedIn::create_amp0_account()`]
   */
  nextAccount(): number;
  /**
   * Create a new AMP0 account
   *
   * `account_xpub` must be obtained from [`amp0_account_xpub()`] called with the value obtained from
   * [`Amp0LoggedIn::next_account()`]
   */
  createAmp0Account(pointer: number, account_xpub: string): Promise<string>;
  /**
   * Create a new Watch-Only entry for this wallet
   */
  createWatchOnly(username: string, password: string): Promise<void>;
}
/**
 * A PSET to use with AMP0
 *
 * When asking AMP0 to cosign, the caller must pass some extra data that does not belong to the
 * PSET. This struct holds and manage the necessary data.
 *
 * If you're not dealing with AMP0, do not use this struct.
 */
export class Amp0Pset {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Amp0Pset`
   */
  constructor(pset: Pset, blinding_nonces: string[]);
  /**
   * Get the PSET
   */
  pset(): Pset;
  /**
   * Get the blinding nonces
   */
  blindingNonces(): string[];
}
export class Amp0SignerData {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
}
/**
 * Context for actions interacting with Asset Management Platform version 2
 */
export class Amp2 {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new AMP2 client
   *
   *  * `server_key` - The keyorigin xpub of the AMP2 server key
   *  * `url` - The URL of the AMP2 server
   */
  static new(server_key: string, url: string): Amp2;
  /**
   * Create a new AMP2 client with the default url and server key for the testnet network.
   */
  static newTestnet(): Amp2;
  /**
   * Get an AMP2 wallet descriptor from the keyorigin xpub string obtained from a signer
   */
  descriptorFromStr(keyorigin_xpub: string, descriptor_blinding_key: string): Amp2Descriptor;
  /**
   * Register an AMP2 wallet with the AMP2 server
   */
  register(desc: Amp2Descriptor): Promise<string>;
  /**
   * Ask the AMP2 server to cosign a PSET
   */
  cosign(pset: Pset): Promise<Pset>;
}
/**
 * An Asset Management Platform version 2 descriptor
 */
export class Amp2Descriptor {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the descriptor as a `WolletDescriptor`
   */
  descriptor(): WolletDescriptor;
  /**
   * Return the string representation of the descriptor.
   */
  toString(): string;
}
/**
 * An asset identifier and an amount in satoshi units
 */
export class AssetAmount {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  amount(): bigint;
  asset(): AssetId;
}
/**
 * A blinding factor for asset commitments.
 */
export class AssetBlindingFactor {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `AssetBlindingFactor` from a string.
   */
  static fromString(s: string): AssetBlindingFactor;
  /**
   * Creates an `AssetBlindingFactor` from a byte slice.
   */
  static fromBytes(bytes: Uint8Array): AssetBlindingFactor;
  /**
   * Returns a zero asset blinding factor.
   */
  static zero(): AssetBlindingFactor;
  /**
   * Returns the bytes (32 bytes) in little-endian byte order.
   *
   * This is the internal representation used by secp256k1. The byte order is
   * reversed compared to the hex string representation (which uses big-endian,
   * following Bitcoin display conventions).
   */
  toBytes(): Uint8Array;
  /**
   * Returns string representation of the ABF
   */
  toString(): string;
}
/**
 * A valid asset identifier.
 *
 * 32 bytes encoded as hex string.
 */
export class AssetId {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `AssetId`
   *
   * Deprecated: use `from_string()` instead
   */
  constructor(asset_id: string);
  /**
   * Creates an `AssetId` from hex string
   */
  static fromString(s: string): AssetId;
  /**
   * Creates an `AssetId` from a bytes.
   */
  static fromBytes(bytes: Uint8Array): AssetId;
  /**
   * Returns the `AssetId` bytes in little-endian byte order.
   */
  toBytes(): Uint8Array;
  /**
   * Return the string representation of the asset identifier (64 hex characters).
   * This representation can be used to recreate the asset identifier via `fromString()`
   */
  toString(): string;
}
/**
 * An ordered collection of asset identifiers.
 */
export class AssetIds {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return an empty list of asset identifiers.
   */
  static empty(): AssetIds;
  /**
   * Return the string representation of this list of asset identifiers.
   */
  toString(): string;
}
/**
 * Data related to an asset in the registry:
 * - contract: the contract of the asset
 * - tx: the issuance transaction of the asset
 */
export class AssetMeta {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the contract of the asset.
   */
  contract(): Contract;
  /**
   * Return the issuance transaction of the asset.
   */
  tx(): Transaction;
}
/**
 * A signed balance of assets, to represent a balance with negative values such
 * as the results of a transaction from the perspective of a wallet.
 */
export class Balance {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Convert the balance to a JsValue for serialization
   *
   * Note: the amounts are strings since `JSON.stringify` cannot handle `BigInt`s.
   * Use `entries()` to get the raw data.
   */
  toJSON(): any;
  /**
   * Returns the balance as an array of [key, value] pairs.
   */
  entries(): any;
  /**
   * Return the string representation of the balance.
   */
  toString(): string;
}
/**
 * The bip variant for a descriptor like specified in the bips (49, 84, 87)
 */
export class Bip {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a bip49 variant
   */
  static bip49(): Bip;
  /**
   * Creates a bip84 variant
   */
  static bip84(): Bip;
  /**
   * Creates a bip87 variant
   */
  static bip87(): Bip;
  /**
   * Return the string representation of the bip variant, such as "bip49", "bip84" or "bip87"
   */
  toString(): string;
}
/**
 * A Liquid block header
 */
export class BlockHeader {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the block hash as a hex string
   */
  blockHash(): string;
  /**
   * Get the previous block hash as a hex string
   */
  prevBlockhash(): string;
  /**
   * Get the merkle root as a hex string
   */
  merkleRoot(): string;
  /**
   * Get the block timestamp
   */
  time(): number;
  /**
   * Get the block version
   */
  version(): number;
  /**
   * Get the block height
   */
  height(): number;
}
/**
 * Wrapper over [`lwk_boltz::BoltzSession`]
 */
export class BoltzSession {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the rescue file
   */
  rescueFile(): string;
  /**
   * Prepare a lightning invoice payment
   */
  preparePay(lightning_payment: LightningPayment, refund_address: Address): Promise<PreparePayResponse>;
  /**
   * Fetch a BOLT12 invoice without creating or starting a swap
   */
  fetchBolt12Invoice(lightning_payment: LightningPayment): Promise<Invoice>;
  /**
   * Create a lightning invoice for receiving payment
   */
  invoice(amount: bigint, description: string | null | undefined, claim_address: Address): Promise<InvoiceResponse>;
  /**
   * Restore a swap from its serialized data
   */
  restorePreparePay(data: string): Promise<PreparePayResponse>;
  /**
   * Restore a swap from its serialized data
   */
  restoreInvoice(data: string): Promise<InvoiceResponse>;
}
/**
 * Wrapper over [`lwk_boltz::BoltzSessionBuilder`]
 */
export class BoltzSessionBuilder {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new BoltzSessionBuilder with the given network
   *
   * This creates a builder with default Esplora client for the network.
   */
  constructor(network: Network, esplora_client: EsploraClient);
  /**
   * Set the timeout for creating swaps
   *
   * If not set, the default timeout of 10 seconds is used.
   */
  createSwapTimeout(timeout_seconds: bigint): BoltzSessionBuilder;
  /**
   * Set the timeout for the advance call
   *
   * If not set, the default timeout of 3 minutes is used.
   */
  timeoutAdvance(timeout_seconds: bigint): BoltzSessionBuilder;
  /**
   * Set the mnemonic for deriving swap keys
   *
   * If not set, a new random mnemonic will be generated.
   */
  mnemonic(mnemonic: Mnemonic): BoltzSessionBuilder;
  /**
   * Set the polling flag
   *
   * If true, the advance call will not await on the websocket connection returning immediately
   * even if there is no update, thus requiring the caller to poll for updates.
   *
   * If true, the timeout_advance will be ignored even if set.
   */
  polling(polling: boolean): BoltzSessionBuilder;
  /**
   * Set the next index to use for deriving keypairs
   *
   * Avoid a call to the boltz API to recover this information.
   *
   * When the mnemonic is not set, this is ignored.
   */
  nextIndexToUse(next_index_to_use: number): BoltzSessionBuilder;
  /**
   * Set the referral id for the BoltzSession
   */
  referralId(referral_id: string): BoltzSessionBuilder;
  /**
   * Set the Boltz API base URL
   *
   * The caller is responsible for ensuring the provider behind this URL matches the session
   * network passed to the builder.
   *
   * If this is used together with a persistent store on the Rust side, the caller must use a
   * different store per provider. Persisted swap data is not namespaced by provider, so
   * reusing the same store across different `apiUrl` values can mix swaps from different
   * providers.
   */
  apiUrl(api_url: string): BoltzSessionBuilder;
  /**
   * Set the url of the bitcoin electrum client
   */
  bitcoinElectrumClient(bitcoin_electrum_client: string): BoltzSessionBuilder;
  /**
   * Set the random preimages flag
   *
   * The default is false, the preimages will be deterministic and the rescue file will be
   * compatible with the Boltz web app.
   * If true, the preimages will be random potentially allowing concurrent sessions with the same
   * mnemonic, but completing the swap will be possible only with the preimage data. For example
   * the boltz web app will be able only to refund the swap, not to bring it to completion.
   * If true, when serializing the swap data, the preimage will be saved in the data.
   */
  randomPreimages(random_preimages: boolean): BoltzSessionBuilder;
  /**
   * Build the BoltzSession
   */
  build(): Promise<BoltzSession>;
}
/**
 * Commitment Merkle root
 *
 * A Merkle root that commits to a node's combinator and recursively its children.
 */
export class Cmr {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a CMR from bytes (32 bytes).
   */
  static fromBytes(bytes: Uint8Array): Cmr;
  /**
   * Create a CMR from a string.
   */
  static fromString(s: string): Cmr;
  /**
   * Return the raw CMR bytes (32 bytes).
   */
  toBytes(): Uint8Array;
  /**
   * Return the string representation.
   */
  toString(): string;
}
/**
 * A contract defining metadata of an asset such the name and the ticker
 */
export class Contract {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Contract`
   */
  constructor(domain: string, issuer_pubkey: string, name: string, precision: number, ticker: string, version: number);
  /**
   * Return the string representation of the contract.
   */
  toString(): string;
  /**
   * Return the domain of the issuer of the contract.
   */
  domain(): string;
  /**
   * Make a copy of the contract.
   *
   * This is needed to pass it to a function that requires a `Contract` (without borrowing)
   * but you need the same contract after that call.
   */
  clone(): Contract;
}
/**
 * The hash of an asset contract.
 */
export class ContractHash {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `ContractHash` from a string.
   */
  static fromString(s: string): ContractHash;
  /**
   * Creates a `ContractHash` from a byte slice.
   */
  static fromBytes(bytes: Uint8Array): ContractHash;
  /**
   * Returns the bytes (32 bytes).
   */
  toBytes(): Uint8Array;
  /**
   * Returns the string representation.
   */
  toString(): string;
}
/**
 * A control block for Taproot script-path spending.
 */
export class ControlBlock {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Parse a control block from serialized bytes.
   */
  static fromBytes(bytes: Uint8Array): ControlBlock;
  /**
   * Serialize the control block to bytes.
   */
  toBytes(): Uint8Array;
  /**
   * Get the leaf version of the control block.
   */
  readonly leafVersion: number;
  /**
   * Get the internal key of the control block.
   */
  readonly internalKey: XOnlyPublicKey;
  /**
   * Get the output key parity (0 for even, 1 for odd).
   */
  readonly outputKeyParity: number;
  /**
   * Get the size of the control block in bytes.
   */
  readonly size: number;
}
export class CurrencyCode {
  free(): void;
  [Symbol.dispose](): void;
  constructor(code: string);
  name(): string;
  alpha3(): string;
  exp(): number;
}
/**
 * A blockchain backend implementation based on the
 * [esplora HTTP API](https://github.com/blockstream/esplora/blob/master/API.md).
 * But can also use the [waterfalls](https://github.com/RCasatta/waterfalls)
 * endpoint to speed up the scan if supported by the server.
 */
export class EsploraClient {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an Esplora client with the given options
   */
  constructor(network: Network, url: string, waterfalls: boolean, concurrency: number, utxo_only: boolean);
  /**
   * Scan the blockchain for the scripts generated by a watch-only wallet
   *
   * This method scans both external and internal address chains, stopping after finding
   * 20 consecutive unused addresses (the gap limit) as recommended by
   * [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#address-gap-limit).
   *
   * Returns `Some(Update)` if any changes were found during scanning, or `None` if no changes
   * were detected.
   *
   * To scan beyond the gap limit use `full_scan_to_index()` instead.
   */
  fullScan(wollet: Wollet): Promise<Update | undefined>;
  /**
   * Scan the blockchain for the scripts generated by a watch-only wallet up to a specified derivation index
   *
   * While `full_scan()` stops after finding 20 consecutive unused addresses (the gap limit),
   * this method will scan at least up to the given derivation index. This is useful to prevent
   * missing funds in cases where outputs exist beyond the gap limit.
   *
   * Will scan both external and internal address chains up to the given index for maximum safety,
   * even though internal addresses may not need such deep scanning.
   *
   * If transactions are found beyond the gap limit during this scan, subsequent calls to
   * `full_scan()` will automatically scan up to the highest used index, preventing any
   * previously-found transactions from being missed.
   *
   * See `full_scan_to_index()` for a blocking version of this method.
   */
  fullScanToIndex(wollet: Wollet, index: number): Promise<Update | undefined>;
  /**
   * Broadcast a transaction to the network so that a miner can include it in a block.
   */
  broadcastTx(tx: Transaction): Promise<Txid>;
  /**
   * Broadcast a PSET by extracting the transaction from the PSET and broadcasting it.
   */
  broadcast(pset: Pset): Promise<Txid>;
  /**
   * Set the waterfalls server recipient key. This is used to encrypt the descriptor when calling the waterfalls endpoint.
   */
  setWaterfallsServerRecipient(recipient: string): Promise<void>;
  /**
   * Query the last used derivation index for a wallet's descriptor from the waterfalls server.
   *
   * This method queries the waterfalls `/v1/last_used_index` endpoint to get the last used
   * derivation index for both external and internal chains of the wallet's descriptor.
   *
   * Returns `LastUsedIndexResponse` containing the last used indexes and the tip block hash.
   *
   * # Errors
   *
   * Returns an error if this client was not configured with waterfalls support,
   * if the descriptor does not contain a wildcard,
   * or if the descriptor uses ELIP151 blinding.
   */
  lastUsedIndex(descriptor: WolletDescriptor): Promise<LastUsedIndexResponse>;
}
/**
 * Multiple exchange rates against BTC provided from various sources
 */
export class ExchangeRates {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the median exchange rate
   */
  median(): number;
  /**
   * Get the individual exchange rates as a JSON array
   *
   * Each rate contains: rate, currency, source, and timestamp
   */
  results(): any;
  /**
   * Get the number of sources that provided rates
   */
  resultsCount(): number;
  /**
   * Serialize the entire response to JSON string
   */
  serialize(): string;
}
/**
 * An external UTXO, owned by another wallet.
 */
export class ExternalUtxo {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Construct an ExternalUtxo
   */
  constructor(vout: number, tx: Transaction, unblinded: TxOutSecrets, max_weight_to_satisfy: number, is_segwit: boolean);
}
/**
 * Wrapper over [`lwk_boltz::Invoice`]
 */
export class Invoice {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return a string representation of the invoice
   */
  toString(): string;
  /**
   * Return the invoice amount in whole satoshis
   */
  amountSats(): bigint;
  /**
   * Return true if this is a BOLT11 invoice
   */
  isBolt11(): boolean;
  /**
   * Return true if this is a BOLT12 invoice
   */
  isBolt12(): boolean;
  /**
   * Return the BOLT11 invoice string if this is a BOLT11 invoice
   */
  bolt11Invoice(): string | undefined;
  /**
   * Return the BOLT12 invoice string if this is a BOLT12 invoice
   */
  bolt12Invoice(): string | undefined;
}
/**
 * Wrapper over [`lwk_boltz::InvoiceResponse`]
 */
export class InvoiceResponse {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Serialize the response to JSON string for JS interop
   */
  serialize(): string;
  /**
   * Return the bolt11 invoice string
   */
  bolt11Invoice(): string;
  swapId(): string;
  /**
   * The fee of the swap provider
   *
   * It is equal to the amount of the invoice minus the amount of the onchain transaction.
   * Does not include the fee of the onchain transaction.
   */
  fee(): bigint | undefined;
  /**
   * Complete the payment by advancing through the swap states until completion or failure
   * Consumes self as the inner method does
   */
  completePay(): Promise<boolean>;
}
/**
 * The details of an issuance or reissuance.
 */
export class Issuance {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the asset id or None if it's a null issuance
   */
  asset(): AssetId | undefined;
  /**
   * Return the token id or None if it's a null issuance
   */
  token(): AssetId | undefined;
  /**
   * Return the previous output index or None if it's a null issuance
   */
  prevVout(): number | undefined;
  /**
   * Return the previous transaction id or None if it's a null issuance
   */
  prevTxid(): Txid | undefined;
  /**
   * Return true if this is effectively an issuance
   */
  isIssuance(): boolean;
  /**
   * Return true if this is effectively a reissuance
   */
  isReissuance(): boolean;
}
/**
 * A recipient of newly issued asset units.
 */
export class IssuanceRecipient {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create an issuance recipient using the next wallet external address.
   */
  static wallet(satoshi: bigint): IssuanceRecipient;
  /**
   * Create an issuance recipient from an address.
   */
  static fromAddress(satoshi: bigint, address: Address): IssuanceRecipient;
}
/**
 * A Jade hardware wallet usable via Web Serial
 */
export class Jade {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a Jade from Web Serial for the given network.
   *
   * When filter is true, it will filter available serial with Blockstream released chips, use
   * false if you don't see your DYI jade
   */
  static fromSerial(network: Network, filter: boolean): Promise<Jade>;
  getVersion(): Promise<any>;
  getMasterXpub(): Promise<Xpub>;
  /**
   * Return a single sig address with the given `variant` and `path` derivation
   */
  getReceiveAddressSingle(variant: Singlesig, path: Uint32Array): Promise<string>;
  /**
   * Return a multisig address of a registered `multisig_name` wallet
   *
   * This method accept `path` and `path_n` in place of a single `Vec<Vec<u32>>` because the
   * latter is not supported by wasm_bindgen (and neither `(u32, Vec<u32>)`). `path` and `path_n`
   * are converted internally to a `Vec<Vec<u32>>` with the caveat all the paths are the same,
   * which is almost always the case.
   */
  getReceiveAddressMulti(multisig_name: string, path: Uint32Array): Promise<string>;
  /**
   * Sign and consume the given PSET, returning the signed one
   */
  sign(pset: Pset): Promise<Pset>;
  wpkh(): Promise<WolletDescriptor>;
  shWpkh(): Promise<WolletDescriptor>;
  multi(name: string): Promise<WolletDescriptor>;
  getRegisteredMultisigs(): Promise<any>;
  keyoriginXpub(bip: Bip): Promise<string>;
  /**
   * Logs out of the Jade session and releases the Web Serial port so it can be
   * reopened without reloading the page.
   *
   * The logout is best-effort: if the device is unreachable (e.g. already
   * unplugged) we still release the port, since that's the part that must
   * succeed for a subsequent `fromSerial()` to work.
   *
   * `SerialPort.close()` rejects while its `readable`/`writable` streams are still
   * locked by our reader/writer, so those locks must be released first. Call this
   * before dropping/`free()`-ing the `Jade` instance.
   */
  disconnect(): Promise<void>;
  registerDescriptor(name: string, desc: WolletDescriptor): Promise<boolean>;
}
/**
 * WebSocket-based `Jade` useful for testing in the browser with the Jade emulator.
 */
export class JadeWebSocket {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a Jade from WebSocket for the given network
   *
   * The url should point to your WebSocket bridge that connects to the Docker Jade emulator
   */
  static fromWebSocket(network: Network, url: string): Promise<JadeWebSocket>;
  getVersion(): Promise<any>;
  getMasterXpub(): Promise<Xpub>;
  /**
   * Return a single sig address with the given `variant` and `path` derivation
   */
  getReceiveAddressSingle(variant: Singlesig, path: Uint32Array): Promise<string>;
  /**
   * Return a multisig address of a registered `multisig_name` wallet
   *
   * This method accept `path` and `path_n` in place of a single `Vec<Vec<u32>>` because the
   * latter is not supported by wasm_bindgen (and neither `(u32, Vec<u32>)`). `path` and `path_n`
   * are converted internally to a `Vec<Vec<u32>>` with the caveat all the paths are the same,
   * which is almost always the case.
   */
  getReceiveAddressMulti(multisig_name: string, path: Uint32Array): Promise<string>;
  /**
   * Sign and consume the given PSET, returning the signed one
   */
  sign(pset: Pset): Promise<Pset>;
  wpkh(): Promise<WolletDescriptor>;
  shWpkh(): Promise<WolletDescriptor>;
  multi(name: string): Promise<WolletDescriptor>;
  getRegisteredMultisigs(): Promise<any>;
  keyoriginXpub(bip: Bip): Promise<string>;
  registerDescriptor(name: string, desc: WolletDescriptor): Promise<boolean>;
}
/**
 * A bridge that connects a [`JsStorage`] to [`lwk_common::Store`].
 */
export class JsStoreLink {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new `JsStoreLink` from a JavaScript storage object.
   *
   * The JS object must have `get(key)`, `put(key, value)`, `remove(key)`,
   * and `isPersisted()` methods.
   */
  constructor(storage: any);
}
/**
 * Test helper to verify Rust can read/write through a JS store.
 */
export class JsTestStore {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new test helper wrapping the given JS storage.
   */
  constructor(storage: any);
  /**
   * Write a key-value pair to the store.
   */
  write(key: string, value: Uint8Array): void;
  /**
   * Read a value from the store.
   */
  read(key: string): Uint8Array | undefined;
  /**
   * Remove a key from the store.
   */
  remove(key: string): void;
}
/**
 * A secp256k1 keypair
 */
export class Keypair {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Keypair` from a 32-byte secret key
   */
  static fromSecretBytes(secret_bytes: Uint8Array): Keypair;
  /**
   * Creates a `Keypair` from a `SecretKey`
   */
  static fromSecretKey(sk: SecretKey): Keypair;
  /**
   * Generates a new random keypair
   */
  static generate(): Keypair;
  /**
   * Signs a 32-byte message hash using Schnorr signature
   *
   * Takes the message as a hex string (64 hex chars = 32 bytes)
   * Returns the signature as a hex string (128 hex chars = 64 bytes)
   */
  signSchnorr(msg_hex: string): string;
  /**
   * Returns the secret key bytes (32 bytes)
   */
  readonly secretBytes: Uint8Array;
  /**
   * Returns the `SecretKey`
   */
  readonly secretKey: SecretKey;
  /**
   * Returns the `PublicKey`
   */
  readonly publicKey: PublicKey;
  /**
   * Returns the x-only public key
   */
  readonly xOnlyPublicKey: XOnlyPublicKey;
}
/**
 * Response from the last_used_index endpoint
 *
 * Returns the highest derivation index that has been used (has transaction history)
 * for both external and internal chains. This is useful for quickly determining
 * the next unused address without downloading full transaction history.
 */
export class LastUsedIndexResponse {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Last used index on the external (receive) chain, or undefined if no addresses have been used.
   */
  readonly external: number | undefined;
  /**
   * Last used index on the internal (change) chain, or undefined if no addresses have been used.
   */
  readonly internal: number | undefined;
  /**
   * Current blockchain tip hash for reference.
   */
  readonly tip: string | undefined;
}
export class LedgerWeb {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * hid_device must be already opened
   */
  constructor(hid_device: HIDDevice, network: Network);
  getVersion(): Promise<string>;
  deriveXpub(path: string): Promise<string>;
  slip77MasterBlindingKey(): Promise<string>;
  fingerprint(): Promise<string>;
  /**
   * TODO Should use Signer::wpkh_slip77_descriptor
   */
  wpkhSlip77Descriptor(): Promise<WolletDescriptor>;
  /**
   * Sign and consume the given PSET, returning the signed one
   */
  sign(pset: Pset): Promise<Pset>;
  /**
   * Return a single sig address with the given `variant` and `index`
   */
  getReceiveAddressSingle(index: number): Promise<string>;
}
/**
 * Wrapper over [`lwk_boltz::LightningPayment`]
 */
export class LightningPayment {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a LightningPayment from a bolt11 invoice string or a bolt12 offer
   */
  constructor(invoice: string);
  /**
   * Return a string representation of the LightningPayment
   */
  toString(): string;
  /**
   * Return a QR code image uri for the LightningPayment
   */
  toUriQr(pixel_per_module?: number | null): string;
}
/**
 * Transaction lock time.
 */
export class LockTime {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a LockTime from a consensus u32 value.
   */
  constructor(value: number);
  /**
   * Create a LockTime from a block height.
   */
  static from_height(height: number): LockTime;
  /**
   * Create a LockTime from a Unix timestamp.
   */
  static from_time(time: number): LockTime;
  /**
   * Create a LockTime with value zero (no lock time).
   */
  static zero(): LockTime;
  /**
   * Return the consensus u32 value.
   */
  toConsensusU32(): number;
  /**
   * Return true if this lock time represents a block height.
   */
  isBlockHeight(): boolean;
  /**
   * Return true if this lock time represents a Unix timestamp.
   */
  isBlockTime(): boolean;
  /**
   * Return the string representation.
   */
  toString(): string;
}
/**
 * A struct representing a magic routing hint, with details on how to pay directly without using Boltz
 */
export class MagicRoutingHint {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * The address to pay directly to
   */
  address(): string;
  /**
   * The amount to pay directly to
   */
  amount(): bigint;
  /**
   * The URI to pay directly to
   */
  uri(): string;
}
/**
 * A mnemonic secret code used as a master secret for a bip39 wallet.
 *
 * Supported number of words are 12, 15, 18, 21, and 24.
 */
export class Mnemonic {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a Mnemonic
   */
  constructor(s: string);
  /**
   * Return the string representation of the Mnemonic.
   * This representation can be used to recreate the Mnemonic via `new()`
   *
   * Note this is secret information, do not log it.
   */
  toString(): string;
  /**
   * Creates a Mnemonic from entropy, at least 16 bytes are needed.
   */
  static fromEntropy(b: Uint8Array): Mnemonic;
  /**
   * Creates a random Mnemonic of given words (12,15,18,21,24)
   */
  static fromRandom(word_count: number): Mnemonic;
}
/**
 * The network of the elements blockchain such as mainnet, testnet or regtest.
 */
export class Network {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a mainnet `Network``
   */
  static mainnet(): Network;
  /**
   * Creates a testnet `Network``
   */
  static testnet(): Network;
  /**
   * Creates a regtest `Network``
   */
  static regtest(policy_asset: AssetId): Network;
  /**
   * Creates the default regtest `Network` with the policy asset `5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225`
   */
  static regtestDefault(): Network;
  /**
   * Return the default esplora client for this network
   */
  defaultEsploraClient(): EsploraClient;
  /**
   * Return true if the network is a mainnet network
   */
  isMainnet(): boolean;
  /**
   * Return true if the network is a testnet network
   */
  isTestnet(): boolean;
  /**
   * Return true if the network is a regtest network
   */
  isRegtest(): boolean;
  /**
   * Return a string representation of the network, like "liquid", "liquid-testnet" or "liquid-regtest"
   */
  toString(): string;
  /**
   * Return the policy asset for this network
   */
  policyAsset(): AssetId;
  /**
   * Return the genesis block hash for this network as hex string.
   */
  genesisBlockHash(): string;
  /**
   * Return the transaction builder for this network
   */
  txBuilder(): TxBuilder;
  /**
   * Return the default explorer URL for this network
   */
  defaultExplorerUrl(): string;
}
/**
 * An optional wallet transaction output. Could be None when it's not possible to unblind.
 * It seems required by wasm_bindgen because we can't return `Vec<Option<WalletTxOut>>`
 */
export class OptionWalletTxOut {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return a copy of the WalletTxOut if it exists, otherwise None
   */
  get(): WalletTxOut | undefined;
}
/**
 * A reference to a transaction output
 */
export class OutPoint {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `OutPoint` from a string representation.
   */
  constructor(s: string);
  /**
   * Creates an `OutPoint` from a transaction ID and output index.
   */
  static fromParts(txid: Txid, vout: number): OutPoint;
  /**
   * Return the transaction identifier.
   */
  txid(): Txid;
  /**
   * Return the output index.
   */
  vout(): number;
}
/**
 * POS (Point of Sale) configuration for encoding/decoding
 */
export class PosConfig {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new POS configuration
   */
  constructor(descriptor: WolletDescriptor, currency: CurrencyCode);
  /**
   * Create a POS configuration with all options
   */
  static withOptions(descriptor: WolletDescriptor, currency: CurrencyCode, show_gear?: boolean | null, show_description?: boolean | null): PosConfig;
  /**
   * Decode a POS configuration from a URL-safe base64 encoded string
   */
  static decode(encoded: string): PosConfig;
  /**
   * Encode the POS configuration to a URL-safe base64 string
   */
  encode(): string;
  /**
   * Return a string representation of the POS configuration
   */
  toString(): string;
  /**
   * Get the wallet descriptor
   */
  readonly descriptor: WolletDescriptor;
  /**
   * Get the currency code
   */
  readonly currency: CurrencyCode;
  /**
   * Get whether to show the gear/settings button
   */
  readonly showGear: boolean | undefined;
  /**
   * Get whether to show the description/note field
   */
  readonly showDescription: boolean | undefined;
}
/**
 * Helper to convert satoshi values of an asset to the value with the given precision and viceversa.
 *
 * For example 100 satoshi with precision 2 is "1.00"
 */
export class Precision {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new Precision, useful to encode e decode values for assets with precision.
   * erroring if the given precision is greater than the allowed maximum (8)
   */
  constructor(precision: number);
  /**
   * Convert the given satoshi value to the formatted value according to our precision
   *
   * For example 100 satoshi with precision 2 is "1.00"
   */
  satsToString(sats: bigint): string;
  /**
   * Convert the given string with precision to satoshi units.
   *
   * For example the string "1.00" of an asset with precision 2 is 100 satoshi.
   */
  stringToSats(sats: string): bigint;
}
export class PreparePayResponse {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Serialize the response to JSON string for JS interop
   */
  serialize(): string;
  swapId(): string;
  uri(): string;
  uriAddress(): Address;
  uriAmount(): bigint;
  /**
   * The fee of the swap provider
   *
   * It is equal to the amount requested onchain minus the amount of the bolt11 invoice
   * Does not include the fee of the onchain transaction.
   */
  fee(): bigint | undefined;
  completePay(): Promise<boolean>;
}
/**
 * Wrapper over [`lwk_wollet::PricesFetcher`]
 */
export class PricesFetcher {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new PricesFetcher with default settings
   */
  constructor();
  /**
   * Fetch exchange rates for the given currency (e.g., "USD", "EUR", "CHF")
   *
   * Returns an ExchangeRates object containing rates from multiple sources and the median
   */
  rates(currency: CurrencyCode): Promise<ExchangeRates>;
}
/**
 * Wrapper over [`lwk_wollet::PricesFetcherBuilder`]
 */
export class PricesFetcherBuilder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
}
/**
 * Partially Signed Elements Transaction
 */
export class Pset {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Pset` from its base64 string representation.
   */
  constructor(base64: string);
  /**
   * Return a base64 string representation of the Pset.
   * The string can be used to re-create the Pset via `new()`
   */
  toString(): string;
  /**
   * Extract the Transaction from a Pset by filling in
   * the available signature information in place.
   */
  extractTx(): Transaction;
  /**
   * Get the unique id of the PSET as defined by [BIP-370](https://github.com/bitcoin/bips/blob/master/bip-0370.mediawiki#unique-identification)
   *
   * The unique id is the txid of the PSET with sequence numbers of inputs set to 0
   */
  uniqueId(): Txid;
  /**
   * Attempt to merge with another `Pset`.
   */
  combine(other: Pset): void;
  /**
   * Return a copy of the inputs of this PSET
   */
  inputs(): PsetInput[];
  /**
   * Return a copy of the outputs of this PSET
   */
  outputs(): PsetOutput[];
  /**
   * Add wallet details to this PSET in place
   */
  addDetails(wollet: Wollet): void;
  /**
   * Finalize and extract the PSET
   */
  finalize(): Transaction;
}
/**
 * The details regarding balance and amounts in a PSET:
 *
 * - The fee of the transaction in the PSET
 * - The net balance of the assets in the PSET from the point of view of the wallet
 * - The outputs going out of the wallet
 */
export class PsetBalance {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  fee(): bigint;
  /**
   * The net balance for every asset with respect of the wallet asking the pset details
   */
  balances(): Balance;
  recipients(): Recipient[];
}
/**
 * Builder for constructing a PSET from scratch
 */
export class PsetBuilder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new PSET v2 builder
   */
  static newV2(): PsetBuilder;
  /**
   * Add an input to this PSET
   */
  addInput(input: PsetInput): PsetBuilder;
  /**
   * Add an output to this PSET
   */
  addOutput(output: PsetOutput): PsetBuilder;
  /**
   * Set the fallback locktime on the PSET global tx_data
   */
  setFallbackLocktime(locktime: LockTime): PsetBuilder;
  /**
   * Blind the last output using the provided input secrets.
   *
   * `inp_txout_sec` is a map from input index to TxOutSecrets, represented as
   * parallel arrays where `input_indices[i]` corresponds to `secrets[i]`.
   *
   * NOTE: The secrets object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  blindLast(input_indices: Uint32Array, secrets: TxOutSecrets[]): PsetBuilder;
  /**
   * Build the Pset, consuming the builder
   */
  build(): Pset;
}
/**
 * The details of a Partially Signed Elements Transaction:
 *
 * - the net balance from the point of view of the wallet
 * - the available and missing signatures for each input
 * - for issuances and reissuances transactions contains the issuance or reissuance details
 */
export class PsetDetails {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the balance of the PSET from the point of view of the wallet
   * that generated this via `psetDetails()`
   */
  balance(): PsetBalance;
  /**
   * For each input existing or missing signatures
   */
  signatures(): PsetSignatures[];
  /**
   * Set of fingerprints for which the PSET is missing a signature
   */
  fingerprintsMissing(): string[];
  /**
   * List of fingerprints for which the PSET has a signature
   */
  fingerprintsHas(): string[];
  /**
   * Return an element for every input that could possibly be a issuance or a reissuance
   */
  inputsIssuances(): Issuance[];
}
/**
 * PSET input
 */
export class PsetInput {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Prevout TXID of the input
   */
  previousTxid(): Txid;
  /**
   * Prevout vout of the input
   */
  previousVout(): number;
  /**
   * Prevout scriptpubkey of the input
   */
  previousScriptPubkey(): Script | undefined;
  /**
   * Redeem script of the input
   */
  redeemScript(): Script | undefined;
  /**
   * If the input has an issuance, the asset id
   */
  issuanceAsset(): AssetId | undefined;
  /**
   * If the input has an issuance, the token id
   */
  issuanceToken(): AssetId | undefined;
  /**
   * If the input has a (re)issuance, the issuance object
   */
  issuance(): Issuance | undefined;
  /**
   * Input sighash
   */
  sighash(): number;
  /**
   * If the input has an issuance, returns [asset_id, token_id].
   * Returns undefined if the input has no issuance.
   */
  issuanceIds(): AssetId[] | undefined;
}
/**
 * Builder for PSET inputs
 */
export class PsetInputBuilder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Construct a PsetInputBuilder from an outpoint.
   */
  static fromPrevout(outpoint: OutPoint): PsetInputBuilder;
  /**
   * Set the witness UTXO.
   */
  witnessUtxo(utxo: TxOut): PsetInputBuilder;
  /**
   * Set the sequence number.
   */
  sequence(sequence: TxSequence): PsetInputBuilder;
  /**
   * Set the issuance value amount.
   */
  issuanceValueAmount(amount: bigint): PsetInputBuilder;
  /**
   * Set the issuance inflation keys.
   */
  issuanceInflationKeys(amount: bigint): PsetInputBuilder;
  /**
   * Set the issuance asset entropy.
   */
  issuanceAssetEntropy(contract_hash: ContractHash): PsetInputBuilder;
  /**
   * Set the blinded issuance flag.
   */
  blindedIssuance(flag: boolean): PsetInputBuilder;
  /**
   * Set the issuance blinding nonce.
   */
  issuanceBlindingNonce(nonce: Tweak): PsetInputBuilder;
  /**
   * Build the PsetInput, consuming the builder.
   */
  build(): PsetInput;
}
/**
 * PSET output
 */
export class PsetOutput {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the script pubkey
   */
  scriptPubkey(): Script;
  /**
   * Get the explicit amount, if set
   */
  amount(): bigint | undefined;
  /**
   * Get the explicit asset ID, if set
   */
  asset(): AssetId | undefined;
  /**
   * Get the blinder index, if set
   */
  blinderIndex(): number | undefined;
}
/**
 * Builder for PSET outputs
 */
export class PsetOutputBuilder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Construct a PsetOutputBuilder with explicit asset and value.
   */
  static newExplicit(script_pubkey: Script, satoshi: bigint, asset: AssetId): PsetOutputBuilder;
  /**
   * Set the blinding public key.
   */
  blindingPubkey(blinding_key: PublicKey): PsetOutputBuilder;
  /**
   * Set the script pubkey.
   */
  scriptPubkey(script_pubkey: Script): PsetOutputBuilder;
  /**
   * Set the explicit amount.
   */
  satoshi(satoshi: bigint): PsetOutputBuilder;
  /**
   * Set the explicit asset ID.
   */
  asset(asset: AssetId): PsetOutputBuilder;
  /**
   * Set the blinder index.
   */
  blinderIndex(index: number): PsetOutputBuilder;
  /**
   * Build the PsetOutput, consuming the builder.
   */
  build(): PsetOutput;
}
/**
 * The details of the signatures in a PSET, divided in available and missing signatures.
 */
export class PsetSignatures {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Returns `Vec<(PublicKey, KeySource)>`
   */
  hasSignature(): any;
  missingSignature(): any;
}
/**
 * A Bitcoin ECDSA public key
 */
export class PublicKey {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `PublicKey` from a string.
   */
  static fromString(s: string): PublicKey;
  /**
   * Creates a `PublicKey` from a byte array (33 or 65 bytes)
   */
  static fromBytes(bytes: Uint8Array): PublicKey;
  /**
   * Derives a compressed `PublicKey` from a `SecretKey`
   */
  static fromSecretKey(sk: SecretKey): PublicKey;
  /**
   * Serializes the public key to bytes
   */
  toBytes(): Uint8Array;
  /**
   * Returns whether this public key is compressed (33 bytes) or uncompressed (65 bytes)
   */
  isCompressed(): boolean;
  /**
   * Converts to an x-only public key
   */
  toXOnlyPublicKey(): XOnlyPublicKey;
  /**
   * Returns the string representation.
   */
  toString(): string;
}
/**
 * Recipient of a PSET, in other words outputs that doesn't belong to the wallet
 */
export class Recipient {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  asset(): AssetId | undefined;
  value(): bigint | undefined;
  address(): Address | undefined;
  vout(): number;
}
/**
 * A Registry, a repository to store and retrieve asset metadata, like the name or the ticker of an asset.
 */
export class Registry {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new registry cache specifying the URL of the registry,
   * fetch the assets metadata identified by the given asset ids and cache them for later local retrieval.
   * Use `default_for_network()` to get the default registry for the given network.
   */
  static new(url: string, asset_ids: AssetIds): Promise<Registry>;
  /**
   * Return the default registry for the given network,
   * fetch the assets metadata identified by the given asset ids and cache them for later local retrieval.
   * Use `new()` to specify a custom URL
   */
  static defaultForNetwork(network: Network, asset_ids: AssetIds): Promise<Registry>;
  /**
   * Create a new registry cache, using only the hardcoded assets.
   *
   * Hardcoded assets are the policy assets (LBTC, tLBTC, rLBTC) and the USDT asset on mainnet.
   */
  static defaultHardcodedForNetwork(network: Network): Registry;
  /**
   * Fetch the contract and the issuance transaction of the given asset id from the registry
   */
  fetchWithTx(asset_id: AssetId, client: EsploraClient): Promise<AssetMeta>;
  /**
   * Post a contract to the registry for registration.
   */
  post(data: RegistryPost): Promise<void>;
  /**
   * Return the asset metadata related to the given asset id if it exists in this registry.
   */
  get(asset_id: AssetId): RegistryData | undefined;
  /**
   * Return the asset metadata related to the given token id,
   * in other words `token_id` is the reissuance token of the returned asset
   */
  getAssetOfToken(token_id: AssetId): RegistryData | undefined;
  /**
   * Add the contracts information of the assets used in the Pset
   * if available in this registry.
   * Without the contract information, the partially signed transaction
   * is valid but will not show asset information when signed with an hardware wallet.
   */
  addContracts(pset: Pset): Pset;
}
export class RegistryData {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  precision(): number;
  ticker(): string;
  name(): string;
  domain(): string;
}
/**
 * The data to post to the registry to publish a contract for an asset id
 */
export class RegistryPost {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new registry post object to be used to publish a contract for an asset id in the registry.
   */
  constructor(contract: Contract, asset_id: AssetId);
  /**
   * Return a string representation of the registry post (mostly for debugging).
   */
  toString(): string;
}
/**
 * An Elements (Liquid) script
 */
export class Script {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Script` from its hex string representation.
   */
  constructor(s: string);
  /**
   * Creates an empty `Script`.
   */
  static empty(): Script;
  /**
   * Return the consensus encoded bytes of the script.
   */
  bytes(): Uint8Array;
  /**
   * Returns SHA256 of the script's consensus bytes.
   *
   * Returns an equivalent value to the `jet::input_script_hash(index)`/`jet::output_script_hash(index)`.
   */
  jet_sha256_hex(): string;
  /**
   * Return the string of the script showing op codes and their arguments.
   *
   * For example: "OP_DUP OP_HASH160 OP_PUSHBYTES_20 088ac47276d105b91cf9aa27a00112421dd5f23c OP_EQUALVERIFY OP_CHECKSIG"
   */
  asm(): string;
  /**
   * Creates an OP_RETURN script with the given data.
   */
  static newOpReturn(data: Uint8Array): Script;
  /**
   * Returns true if the script is provably unspendable.
   *
   * A script is provably unspendable if it starts with OP_RETURN or is larger
   * than the maximum script size.
   */
  isProvablyUnspendable(): boolean;
  /**
   * Returns true if this script_pubkey is provably SegWit.
   *
   * This checks if the script_pubkey is provably SegWit based on the
   * script_pubkey itself and an optional redeem_script.
   */
  isProvablySegwit(redeem_script?: Script | null): boolean;
  /**
   * Return the string representation of the script (hex encoding of its consensus encoded bytes).
   * This representation can be used to recreate the script via `new()`
   */
  toString(): string;
}
/**
 * A secret key
 */
export class SecretKey {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `SecretKey` from a 32-byte array
   */
  static fromBytes(bytes: Uint8Array): SecretKey;
  /**
   * Creates a `SecretKey` from a WIF (Wallet Import Format) string
   */
  static fromWif(wif: string): SecretKey;
  /**
   * Returns the bytes of the secret key (32 bytes)
   */
  to_bytes(): Uint8Array;
  /**
   * Sign the given `pset`
   */
  sign(pset: Pset): Pset;
}
/**
 * A Software signer.
 */
export class Signer {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * AMP0 signer data for login
   */
  amp0SignerData(): Amp0SignerData;
  /**
   * AMP0 sign login challenge
   */
  amp0SignChallenge(challenge: string): string;
  /**
   * AMP0 account xpub
   */
  amp0AccountXpub(account: number): string;
  /**
   * Creates a `Signer`
   */
  constructor(mnemonic: Mnemonic, network: Network);
  /**
   * Sign and consume the given PSET, returning the signed one
   */
  sign(pset: Pset): Pset;
  /**
   * Sign a message with the master key, return the signature as a base64 string
   */
  signMessage(message: string): string;
  /**
   * Return the witness public key hash, slip77 descriptor of this signer
   */
  wpkhSlip77Descriptor(): WolletDescriptor;
  /**
   * Return the extended public key of the signer
   */
  getMasterXpub(): Xpub;
  /**
   * Return keyorigin and xpub, like "[73c5da0a/84h/1h/0h]tpub..."
   */
  keyoriginXpub(bip: Bip): string;
  /**
   * Return the signer fingerprint
   */
  fingerprint(): string;
  /**
   * Return the mnemonic of the signer
   */
  mnemonic(): Mnemonic;
  /**
   * Return the derived BIP85 mnemonic
   */
  derive_bip85_mnemonic(index: number, word_count: number): Mnemonic;
}
/**
 * Builder for Simplicity program arguments.
 */
export class SimplicityArguments {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new empty arguments builder.
   */
  constructor();
  /**
   * Add a typed Simplicity value. Returns the builder with the value added.
   */
  addValue(name: string, value: SimplicityTypedValue): SimplicityArguments;
}
/**
 * A compiled Simplicity program ready for use in transactions.
 */
export class SimplicityProgram {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Load and compile a Simplicity program from source.
   */
  static load(source: string, _arguments: SimplicityArguments): SimplicityProgram;
  /**
   * Create a P2TR address for this Simplicity program.
   */
  createP2trAddress(internal_key: XOnlyPublicKey, network: Network): Address;
  /**
   * Get the taproot control block for script-path spending.
   */
  controlBlock(internal_key: XOnlyPublicKey): ControlBlock;
  /**
   * Get the sighash_all message for signing a Simplicity program input.
   *
   * NOTE: The utxos object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  getSighashAll(tx: Transaction, program_public_key: XOnlyPublicKey, utxos: TxOut[], input_index: number, network: Network): string;
  /**
   * Finalize a transaction with a Simplicity witness for the specified input.
   *
   * NOTE: The utxos object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  finalizeTransaction(tx: Transaction, program_public_key: XOnlyPublicKey, utxos: TxOut[], input_index: number, witness_values: SimplicityWitnessValues, network: Network, log_level: SimplicityLogLevel): Transaction;
  /**
   * Create a Schnorr signature for a P2PK Simplicity program input.
   */
  createP2pkSignature(signer: Signer, derivation_path: string, tx: Transaction, utxos: TxOut[], input_index: number, network: Network): string;
  /**
   * Finalize a transaction with a storage-aware taproot spend info for the specified input.
   *
   * NOTE: The utxos object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  finalizeTransactionWithSpendInfo(tx: Transaction, spend_info: StateTaprootSpendInfo, utxos: TxOut[], input_index: number, witness_values: SimplicityWitnessValues, network: Network, log_level: SimplicityLogLevel): Transaction;
  /**
   * Satisfy and execute this program in a transaction environment.
   *
   * NOTE: The utxos object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  run(tx: Transaction, program_public_key: XOnlyPublicKey, utxos: TxOut[], input_index: number, witness_values: SimplicityWitnessValues, network: Network, log_level: SimplicityLogLevel): SimplicityRunResult;
  /**
   * Get the Commitment Merkle Root of the program.
   */
  readonly cmr: Cmr;
}
/**
 * The result of running a Simplicity program.
 */
export class SimplicityRunResult {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the serialized program bytes.
   */
  readonly programBytes: Uint8Array;
  /**
   * Get the serialized witness bytes.
   */
  readonly witnessBytes: Uint8Array;
  /**
   * Get the Commitment Merkle Root of the pruned program.
   */
  readonly cmr: Cmr;
  /**
   * Get the resulting value as a string representation.
   */
  readonly value: string;
}
/**
 * Simplicity type descriptor.
 */
export class SimplicityType {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create the `u1` type.
   */
  static u1(): SimplicityType;
  /**
   * Create the `u8` type.
   */
  static u8(): SimplicityType;
  /**
   * Create the `u16` type.
   */
  static u16(): SimplicityType;
  /**
   * Create the `u32` type.
   */
  static u32(): SimplicityType;
  /**
   * Create the `u64` type.
   */
  static u64(): SimplicityType;
  /**
   * Create the `u128` type.
   */
  static u128(): SimplicityType;
  /**
   * Create the `u256` type.
   */
  static u256(): SimplicityType;
  /**
   * Create the `bool` type.
   */
  static boolean(): SimplicityType;
  /**
   * Create an `Either<left, right>` type.
   */
  static either(left: SimplicityType, right: SimplicityType): SimplicityType;
  /**
   * Create an `Option<inner>` type.
   */
  static option(inner: SimplicityType): SimplicityType;
  /**
   * Create a tuple type from elements.
   *
   * NOTE: The elements object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  static fromElements(elements: SimplicityType[]): SimplicityType;
  /**
   * Parse a type from a string.
   */
  static fromString(type_str: string): SimplicityType;
  /**
   * Return the canonical string representation of the type.
   */
  toString(): string;
}
/**
 * Typed Simplicity value.
 */
export class SimplicityTypedValue {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a `u8` value.
   */
  static fromU8(value: number): SimplicityTypedValue;
  /**
   * Create a `u16` value.
   */
  static fromU16(value: number): SimplicityTypedValue;
  /**
   * Create a `u32` value.
   */
  static fromU32(value: number): SimplicityTypedValue;
  /**
   * Create a `u64` value.
   */
  static fromU64(value: bigint): SimplicityTypedValue;
  /**
   * Create a `u128` value from hex (32 hex characters = 16 bytes).
   */
  static fromU128Hex(hex: string): SimplicityTypedValue;
  /**
   * Create a `u256` value from hex (64 hex characters = 32 bytes).
   */
  static fromU256Hex(hex: string): SimplicityTypedValue;
  /**
   * Create a `bool` value.
   */
  static fromBoolean(value: boolean): SimplicityTypedValue;
  /**
   * Create a `Left` value.
   */
  static left(value: SimplicityTypedValue, right_type: SimplicityType): SimplicityTypedValue;
  /**
   * Create a `Right` value.
   */
  static right(left_type: SimplicityType, value: SimplicityTypedValue): SimplicityTypedValue;
  /**
   * Create a tuple value from elements.
   *
   * NOTE: The elements object is destroyed during the execution of the function, so the argument that was
   * passed in the JS code cannot be reused.
   */
  static fromElements(elements: SimplicityTypedValue[]): SimplicityTypedValue;
  /**
   * Create a `None` value.
   */
  static none(inner_type: SimplicityType): SimplicityTypedValue;
  /**
   * Create a `Some` value.
   */
  static some(value: SimplicityTypedValue): SimplicityTypedValue;
  /**
   * Create a byte array value from hex.
   */
  static fromByteArrayHex(hex: string): SimplicityTypedValue;
  /**
   * Parse a value from a string with a given type.
   */
  static parse(value_str: string, ty: SimplicityType): SimplicityTypedValue;
}
/**
 * Builder for Simplicity witness values.
 */
export class SimplicityWitnessValues {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new empty witness values builder.
   */
  constructor();
  /**
   * Add a typed Simplicity value. Returns the builder with the value added.
   */
  addValue(name: string, value: SimplicityTypedValue): SimplicityWitnessValues;
}
export class Singlesig {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static from(variant: string): Singlesig;
}
/**
 * Taproot builder for Simplicity-related functionality.
 *
 * This builder is tailored for state-management trees that combine a Simplicity
 * leaf with hidden TapData leaves, but it can also be used for generic trees.
 */
export class StateTaprootBuilder {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new builder.
   */
  constructor();
  /**
   * Add a Simplicity leaf at `depth`.
   */
  addSimplicityLeaf(depth: number, cmr: Cmr): StateTaprootBuilder;
  /**
   * Add a TapData hidden leaf at `depth`.
   */
  addDataLeaf(depth: number, data: Uint8Array): StateTaprootBuilder;
  /**
   * Add a precomputed hidden hash at `depth`.
   */
  addHiddenHash(depth: number, hash: Uint8Array): StateTaprootBuilder;
  /**
   * Finalize and produce Taproot spend info.
   */
  finalize(internal_key: XOnlyPublicKey): StateTaprootSpendInfo;
}
/**
 * Taproot spending information.
 */
export class StateTaprootSpendInfo {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the control block for a script identified by CMR.
   */
  controlBlock(cmr: Cmr): ControlBlock;
  /**
   * Get the tweaked Taproot output key.
   */
  readonly outputKey: XOnlyPublicKey;
  /**
   * Get output key parity (0 for even, 1 for odd).
   */
  readonly outputKeyParity: number;
  /**
   * Get the internal key.
   */
  readonly internalKey: XOnlyPublicKey;
  /**
   * Get the Taproot script tree merkle root bytes, if present.
   */
  readonly merkleRoot: Uint8Array | undefined;
  /**
   * Get script pubkey as v1 P2TR output script for the tweaked output key.
   */
  readonly scriptPubkey: Script;
}
/**
 * Blockchain tip, the highest valid block in the blockchain
 */
export class Tip {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  height(): number;
  hash(): string;
  timestamp(): number | undefined;
}
/**
 * A Liquid transaction
 *
 * See `WalletTx` for the transaction as seen from the perspective of the wallet
 * where you can actually see unblinded amounts and tx net-balance.
 */
export class Transaction {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Transaction`
   *
   * Deprecated: use `fromString()` instead.
   */
  constructor(tx_hex: string);
  /**
   * Creates a `Transaction` from hex-encoded consensus bytes.
   */
  static fromString(s: string): Transaction;
  /**
   * Creates a `Transaction` from consensus-encoded bytes.
   */
  static fromBytes(bytes: Uint8Array): Transaction;
  /**
   * Return the transaction identifier.
   */
  txid(): Txid;
  /**
   * Return the consensus encoded bytes of the transaction.
   */
  toBytes(): Uint8Array;
  /**
   * Return the consensus encoded bytes of the transaction.
   *
   * Deprecated: use `toBytes()` instead.
   */
  bytes(): Uint8Array;
  /**
   * Return the fee of the transaction in the given asset.
   * At the moment the only asset that can be used as fee is the policy asset (LBTC for mainnet).
   */
  fee(policy_asset: AssetId): bigint;
  /**
   * Return the hex representation of the transaction. More precisely, they are the consensus encoded bytes of the transaction converted in hex.
   */
  toString(): string;
  /**
   * Return a clone of the inputs of this transaction
   */
  readonly inputs: TxIn[];
  /**
   * Return a clone of the outputs of this transaction
   */
  readonly outputs: TxOut[];
}
/**
 * Editor for modifying transactions.
 */
export class TransactionEditor {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create an editor from an existing transaction.
   */
  static fromTransaction(tx: Transaction): TransactionEditor;
  /**
   * Set the witness for a specific input.
   */
  setInputWitness(input_index: number, witness: TxInWitness): TransactionEditor;
  /**
   * Build the transaction, consuming the editor.
   */
  build(): Transaction;
}
/**
 * Represents a blinding factor/Tweak on secp256k1 curve.
 */
export class Tweak {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a Tweak from a 32-byte slice.
   */
  static fromBytes(bytes: Uint8Array): Tweak;
  /**
   * Create a Tweak from a string.
   */
  static fromString(s: string): Tweak;
  /**
   * Create the zero tweak.
   */
  static zero(): Tweak;
  /**
   * Return the bytes of the tweak (32 bytes).
   */
  toBytes(): Uint8Array;
  /**
   * Returns the string representation.
   */
  toString(): string;
}
/**
 * A transaction builder
 */
export class TxBuilder {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a transaction builder
   */
  constructor(network: Network);
  /**
   * Build the transaction, applying any per-input sequence overrides set via
   * `setInputSequence`.
   */
  finish(wollet: Wollet): Pset;
  /**
   * Override the nSequence for a specific input identified by its outpoint.
   *
   * Must be called **after** all other builder methods, because those methods go through
   * `From<lwk_wollet::TxBuilder>` which resets the per-input sequence list to empty.
   *
   * Pass `0xFFFFFFFE` (ENABLE_LOCKTIME_NO_RBF) to enable absolute locktime without RBF —
   * required by Simplicity's `check_lock_height` jet (returns 0 when all inputs are final).
   */
  setInputSequence(outpoint: OutPoint, sequence: number): TxBuilder;
  /**
   * Build the transaction for AMP0
   */
  finishForAmp0(wollet: Wollet): Amp0Pset;
  /**
   * Set the fee rate
   */
  feeRate(fee_rate?: number | null): TxBuilder;
  /**
   * Select all available L-BTC inputs
   */
  drainLbtcWallet(): TxBuilder;
  /**
   * Sets the address to drain excess L-BTC to
   */
  drainLbtcTo(address: Address): TxBuilder;
  /**
   * Add a recipient receiving L-BTC
   *
   * Errors if address's network is incompatible
   */
  addLbtcRecipient(address: Address, satoshi: bigint): TxBuilder;
  /**
   * Add a recipient receiving the given asset
   *
   * Errors if address's network is incompatible
   */
  addRecipient(address: Address, satoshi: bigint, asset: AssetId): TxBuilder;
  /**
   * Burn satoshi units of the given asset
   */
  addBurn(satoshi: bigint, asset: AssetId): TxBuilder;
  /**
   * Add explicit recipient
   */
  addExplicitRecipient(address: Address, satoshi: bigint, asset: AssetId): TxBuilder;
  /**
   * Add an unblinded output with an arbitrary script pubkey to the post-issuance output list.
   */
  addPostIssuanceScriptOutput(script_pubkey: Script, satoshi: bigint, asset: AssetId): TxBuilder;
  /**
   * Add an address-based output to the post-issuance output list.
   *
   * Like `addPostIssuanceScriptOutput`, outputs are appended after all asset and issuance
   * outputs but before L-BTC change and fee, enabling precise vout ordering for covenant
   * transactions that depend on output indexes.
   *
   * Unlike `addPostIssuanceScriptOutput`, a confidential `address` produces a blinded
   * output visible to the wallet; an unconfidential address produces an explicit one.
   */
  addPostIssuanceRecipient(address: Address, satoshi: bigint, asset: AssetId): TxBuilder;
  /**
   * Issue an asset
   *
   * There will be `asset_sats` units of this asset that will be received by
   * `asset_receiver` if it's set, otherwise to an address of the wallet generating the issuance.
   *
   * There will be `token_sats` reissuance tokens that allow token holder to reissue the created
   * asset. Reissuance token will be received by `token_receiver` if it's some, or to an
   * address of the wallet generating the issuance if none.
   *
   * If a `contract` is provided, it's metadata will be committed in the generated asset id.
   *
   * Can't be used if `reissue_asset` has been called
   */
  issueAsset(asset_sats: bigint, asset_receiver: Address | null | undefined, token_sats: bigint, token_receiver?: Address | null, contract?: Contract | null): TxBuilder;
  /**
   * Issue an asset and send issued units to recipients.
   *
   * Recipient amounts are summed to determine the issued asset amount.
   */
  issueAssetToRecipients(asset_recipients: IssuanceRecipient[], token_sats: bigint, token_receiver?: Address | null, contract?: Contract | null, input_outpoint?: OutPoint | null): TxBuilder;
  /**
   * Reissue an asset
   *
   * reissue the asset defined by `asset_to_reissue`, provided the reissuance token is owned
   * by the wallet generating te reissuance.
   *
   * Generated transaction will create `satoshi_to_reissue` new asset units, and they will be
   * sent to the provided `asset_receiver` address if some, or to an address from the wallet
   * generating the reissuance transaction if none.
   *
   * If the issuance transaction does not involve this wallet,
   * pass the issuance transaction in `issuance_tx`.
   */
  reissueAsset(asset_to_reissue: AssetId, satoshi_to_reissue: bigint, asset_receiver?: Address | null, issuance_tx?: Transaction | null): TxBuilder;
  /**
   * Switch to manual coin selection by giving a list of internal UTXOs to use.
   *
   * All passed UTXOs are added to the transaction.
   * No other wallet UTXO is added to the transaction, caller is supposed to add enough UTXOs to
   * cover for all recipients and fees.
   *
   * This method never fails, any error will be raised in [`TxBuilder::finish`].
   *
   * Possible errors:
   * * OutPoint doesn't belong to the wallet
   * * Insufficient funds (remember to include L-BTC utxos for fees)
   */
  setWalletUtxos(outpoints: OutPoint[]): TxBuilder;
  /**
   * Set the exact order in which selected wallet and external inputs are added.
   */
  setInputOrder(outpoints: OutPoint[]): TxBuilder;
  /**
   * Adds external UTXOs
   *
   * Note: unblinded UTXOs with the same scriptpubkeys as the wallet, are considered external.
   */
  addExternalUtxos(utxos: ExternalUtxo[]): TxBuilder;
  /**
   * Return a string representation of the transaction builder (mostly for debugging)
   */
  toString(): string;
  /**
   * Set data to create a PSET from which you
   * can create a LiquiDEX proposal
   */
  liquidexMake(utxo: OutPoint, address: Address, satoshi: bigint, asset_id: AssetId): TxBuilder;
  /**
   * Set data to take LiquiDEX proposals
   */
  liquidexTake(proposals: ValidatedLiquidexProposal[]): TxBuilder;
  /**
   * Add input rangeproofs
   */
  addInputRangeproofs(add_rangeproofs: boolean): TxBuilder;
  /**
   * Set the fallback locktime on the transaction as a block height.
   */
  setFallbackLocktimeHeight(height: number): TxBuilder;
}
/**
 * Transaction details
 */
export class TxDetails {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Transaction
   */
  tx(): Transaction | undefined;
  /**
   * Txid
   */
  txid(): Txid;
  /**
   * Blockchain height
   */
  height(): number | undefined;
  /**
   * Timestamp
   *
   * A reasonable timestamp, that however can be inaccurate.
   * If you need a precise timestamp, do not use this value.
   */
  timestamp(): number | undefined;
  /**
   * Transaction type
   *
   * A tentative description of the transaction type, which
   * however might be inaccurate. Use this if you want a simple
   * description of what this transaction is doing, but do
   * not rely on the value returned.
   */
  txType(): string;
  /**
   * Balance
   *
   * Net balance from the `Wollet` perspective
   */
  balance(): Balance;
  /**
   * Asset fees
   */
  feesAsset(asset: AssetId): bigint;
  /**
   * Unblinded URL
   */
  unblindedUrl(explorer_url: string): string;
  /**
   * Inputs
   */
  inputs(): TxOutDetails[];
  /**
   * Outputs
   */
  outputs(): TxOutDetails[];
}
/**
 * A transaction input.
 */
export class TxIn {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Get the outpoint (previous output) for this input.
   */
  outpoint(): OutPoint;
  /**
   * Get the witness for this input.
   */
  witness(): TxInWitness;
  /**
   * Get the sequence number for this input.
   */
  sequence(): TxSequence;
}
/**
 * A transaction input witness.
 */
export class TxInWitness {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create an empty witness.
   */
  static empty(): TxInWitness;
  /**
   * Create a witness from script witness elements.
   *
   * Takes an array of hex strings representing the witness stack.
   *
   * NOTE: The script_witness object is destroyed during the execution of the function,
   * so the argument that was passed in the JS code cannot be reused.
   */
  static fromScriptWitness(script_witness: string[]): TxInWitness;
  /**
   * Check if the witness is empty.
   */
  isEmpty(): boolean;
  /**
   * Get the script witness elements.
   *
   * Returns an array of hex strings.
   */
  readonly scriptWitness: string[];
  /**
   * Get the peg-in witness elements.
   *
   * Returns an array of hex strings.
   */
  readonly peginWitness: string[];
}
/**
 * Builder for creating a TxInWitness.
 */
export class TxInWitnessBuilder {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a new witness builder.
   */
  constructor();
  /**
   * Set the script witness elements.
   *
   * Takes an array of hex strings representing the witness stack.
   */
  scriptWitness(witness: string[]): TxInWitnessBuilder;
  /**
   * Set the peg-in witness elements.
   *
   * Takes an array of hex strings representing the peg-in witness stack.
   */
  peginWitness(witness: string[]): TxInWitnessBuilder;
  /**
   * Set the amount rangeproof from serialized bytes.
   */
  amountRangeproof(proof: Uint8Array): TxInWitnessBuilder;
  /**
   * Set the inflation keys rangeproof from serialized bytes.
   */
  inflationKeysRangeproof(proof: Uint8Array): TxInWitnessBuilder;
  /**
   * Build the TxInWitness.
   */
  build(): TxInWitness;
}
/**
 * Options for transaction details
 */
export class TxOpt {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static default(): TxOpt;
}
/**
 * A transaction output
 */
export class TxOut {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a TxOut with explicit asset and value from script pubkey and asset ID.
   *
   * This is useful for constructing UTXOs for Simplicity transaction signing.
   */
  static fromExplicit(script_pubkey: Script, asset_id: AssetId, satoshi: bigint): TxOut;
  /**
   * Get the scriptpubkey
   */
  scriptPubkey(): Script;
  /**
   * Whether or not this output is a fee output
   */
  isFee(): boolean;
  /**
   * Returns if at least some part of this output is blinded
   */
  isPartiallyBlinded(): boolean;
  /**
   * If explicit returns the asset, if confidential returns undefined
   */
  asset(): AssetId | undefined;
  /**
   * If explicit returns the value, if confidential returns undefined
   */
  value(): bigint | undefined;
  /**
   * Get the unconfidential address for this output
   */
  unconfidentialAddress(network: Network): Address | undefined;
  /**
   * Unblind the output using the given secret key
   */
  unblind(secret_key: SecretKey): TxOutSecrets;
}
/**
 * Transaction output details
 */
export class TxOutDetails {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Outpoint
   */
  outpoint(): OutPoint;
  /**
   * Scriptpubkey
   */
  script_pubkey(): Script | undefined;
  /**
   * Height
   */
  height(): number | undefined;
  /**
   * Address
   */
  address(): Address | undefined;
  /**
   * Unblinded values (asset, amount, blinders)
   */
  unblinded(): TxOutSecrets | undefined;
  /**
   * Whether the transaction output is explicit
   */
  is_explicit(): boolean;
  /**
   * Whether the output is spent by a previously downloaded transaction
   *
   * Note: this value might be inaccurate. We compute this from downloaded
   * transactions, however we only download transactions relevant for the
   * wallet (i.e. if they include inputs or outputs that belong to the
   * wallet), thus for non-wallet outputs we might set this value
   * incorrectly. For wallet outputs, it can be outdated.
   */
  is_spent(): boolean;
}
/**
 * Contains unblinded information such as the asset and the value of a transaction output
 */
export class TxOutSecrets {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a new `TxOutSecrets` with the given asset, blinding factors, and value.
   */
  constructor(asset_id: AssetId, asset_bf: AssetBlindingFactor, value: bigint, value_bf: ValueBlindingFactor);
  /**
   * Creates a new `TxOutSecrets` for an explicit (unblinded) output.
   *
   * The blinding factors are set to zero.
   */
  static fromExplicit(asset_id: AssetId, value: bigint): TxOutSecrets;
  /**
   * Return the asset of the output.
   */
  asset(): AssetId;
  /**
   * Return the asset blinding factor as a typed object.
   */
  assetBlindingFactor(): AssetBlindingFactor;
  /**
   * Return the value of the output.
   */
  value(): bigint;
  /**
   * Return the value blinding factor as a typed object.
   */
  valueBlindingFactor(): ValueBlindingFactor;
  /**
   * Return true if the output is explicit (no blinding factors).
   */
  isExplicit(): boolean;
  /**
   * Get the asset commitment
   *
   * If the output is explicit, returns the empty string
   */
  assetCommitment(): string;
  /**
   * Get the value commitment
   *
   * If the output is explicit, returns the empty string
   */
  valueCommitment(): string;
}
/**
 * Transaction input sequence number.
 */
export class TxSequence {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a sequence from a u32 value.
   */
  constructor(value: number);
  /**
   * Zero value sequence.
   *
   * This sequence number enables replace-by-fee and lock-time.
   */
  static zero(): TxSequence;
  /**
   * The maximum allowable sequence number.
   *
   * This sequence number disables lock-time and replace-by-fee.
   */
  static max(): TxSequence;
  /**
   * The sequence number that enables replace-by-fee and absolute lock-time but
   * disables relative lock-time.
   */
  static enableRbfNoLocktime(): TxSequence;
  /**
   * The sequence number that enables absolute lock-time but disables replace-by-fee
   * and relative lock-time.
   */
  static enableLocktimeNoRbf(): TxSequence;
  /**
   * Create a relative lock-time using block height.
   */
  static fromHeight(height: number): TxSequence;
  /**
   * Create a relative lock-time using time intervals where each interval is equivalent
   * to 512 seconds.
   */
  static from512SecondIntervals(intervals: number): TxSequence;
  /**
   * Create a relative lock-time from seconds, converting the seconds into 512 second
   * interval with floor division.
   */
  static fromSecondsFloor(seconds: number): TxSequence;
  /**
   * Create a relative lock-time from seconds, converting the seconds into 512 second
   * interval with ceiling division.
   */
  static fromSecondsCeil(seconds: number): TxSequence;
  /**
   * Returns the inner 32bit integer value of Sequence.
   */
  toConsensusU32(): number;
  /**
   * Returns `true` if the sequence number indicates that the transaction is finalised.
   */
  isFinal(): boolean;
  /**
   * Returns true if the transaction opted-in to BIP125 replace-by-fee.
   */
  isRbf(): boolean;
  /**
   * Returns `true` if the sequence has a relative lock-time.
   */
  isRelativeLockTime(): boolean;
  /**
   * Returns `true` if the sequence number encodes a block based relative lock-time.
   */
  isHeightLocked(): boolean;
  /**
   * Returns `true` if the sequene number encodes a time interval based relative lock-time.
   */
  isTimeLocked(): boolean;
  /**
   * Returns `true` if the sequence number enables absolute lock-time.
   */
  enablesAbsoluteLockTime(): boolean;
}
/**
 * A valid transaction identifier.
 *
 * 32 bytes encoded as hex string.
 */
export class Txid {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `Txid` from its hex string representation (64 characters).
   */
  constructor(tx_id: string);
  /**
   * Return the string representation of the transaction identifier as shown in the explorer.
   * This representation can be used to recreate the transaction identifier via `new()`
   */
  toString(): string;
}
/**
 * Options for transaction details
 */
export class TxsOpt {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static default(): TxsOpt;
  static withPagination(offset: number, limit: number): TxsOpt;
}
/**
 * LiquiDEX swap proposal
 *
 * A LiquiDEX swap proposal is a transaction with one input and one output created by the "maker".
 * The transaction "swaps" the input for the output, meaning that the "maker" sends the input and
 * receives the output.
 * However the transaction is incomplete (unbalanced and without a fee output), thus it cannot be
 * broadcast.
 * The "taker" can "complete" the transaction (using [`crate::TxBuilder::liquidex_take()`]) by
 * adding more inputs and more outputs to balance the amounts, meaning that the "taker" sends the
 * output and receives the input.
 */
export class UnvalidatedLiquidexProposal {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static new(s: string): UnvalidatedLiquidexProposal;
  static fromPset(pset: Pset): UnvalidatedLiquidexProposal;
  insecureValidate(): ValidatedLiquidexProposal;
  validate(tx: Transaction): ValidatedLiquidexProposal;
  toString(): string;
}
/**
 * An Update contains the delta of information to be applied to the wallet to reach the latest status.
 * It's created passing a reference to the wallet to the blockchain client
 */
export class Update {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `Update`
   */
  constructor(bytes: Uint8Array);
  /**
   * Serialize an update to a byte array
   */
  serialize(): Uint8Array;
  /**
   * Serialize an update to a base64 encoded string,
   * encrypted with a key derived from the descriptor.
   * Decrypt using `deserialize_decrypted_base64()`
   */
  serializeEncryptedBase64(desc: WolletDescriptor): string;
  /**
   * Deserialize an update from a base64 encoded string,
   * decrypted with a key derived from the descriptor.
   * Create the base64 using `serialize_encrypted_base64()`
   */
  static deserializeDecryptedBase64(base64: string, desc: WolletDescriptor): Update;
  /**
   * Whether this update only changes the tip
   */
  onlyTip(): boolean;
  /**
   * Prune the update, removing unneeded data from transactions.
   */
  prune(wollet: Wollet): void;
}
/**
 * Created by validating `UnvalidatedLiquidexProposal` via `validate()` or `insecure_validate()`
 */
export class ValidatedLiquidexProposal {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  input(): AssetAmount;
  output(): AssetAmount;
  toString(): string;
}
/**
 * A blinding factor for value commitments.
 */
export class ValueBlindingFactor {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `ValueBlindingFactor` from a string.
   */
  static fromString(s: string): ValueBlindingFactor;
  /**
   * Creates a `ValueBlindingFactor` from a byte slice.
   */
  static fromBytes(bytes: Uint8Array): ValueBlindingFactor;
  /**
   * Returns a zero value blinding factor.
   */
  static zero(): ValueBlindingFactor;
  /**
   * Returns the bytes (32 bytes) in little-endian byte order.
   *
   * This is the internal representation used by secp256k1. The byte order is
   * reversed compared to the hex string representation (which uses big-endian,
   * following Bitcoin display conventions).
   */
  toBytes(): Uint8Array;
  /**
   * Returns string representation of the VBF
   */
  toString(): string;
}
/**
 * Value returned by asking transactions to the wallet. Contains details about a transaction
 * from the perspective of the wallet, for example the net-balance of the transaction for the
 * wallet.
 */
export class WalletTx {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return a copy of the transaction.
   */
  tx(): Transaction;
  /**
   * Return the height of the block containing the transaction if it's confirmed.
   */
  height(): number | undefined;
  /**
   * Return the net balance of the transaction for the wallet.
   */
  balance(): Balance;
  /**
   * Return the transaction identifier.
   */
  txid(): Txid;
  /**
   * Return the fee of the transaction.
   */
  fee(): bigint;
  /**
   * Return the type of the transaction. Can be "issuance", "reissuance", "burn", "redeposit", "incoming", "outgoing" or "unknown".
   */
  txType(): string;
  /**
   * Return the timestamp of the block containing the transaction if it's confirmed.
   */
  timestamp(): number | undefined;
  /**
   * Return a list with the same number of elements as the inputs of the transaction.
   * The element in the list is a `WalletTxOut` (the output spent to create the input)
   * if it belongs to the wallet, while it is None for inputs owned by others
   */
  inputs(): OptionWalletTxOut[];
  /**
   * Return a list with the same number of elements as the outputs of the transaction.
   * The element in the list is a `WalletTxOut` if it belongs to the wallet,
   * while it is None for inputs owned by others
   */
  outputs(): OptionWalletTxOut[];
  /**
   * Return the URL to the transaction on the given explorer including the information
   * needed to unblind the transaction in the explorer UI.
   */
  unblindedUrl(explorer_url: string): string;
}
/**
 * Details of a wallet transaction output used in `WalletTx`
 */
export class WalletTxOut {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Return the outpoint (txid and vout) of this `WalletTxOut`.
   */
  outpoint(): OutPoint;
  /**
   * Return the script pubkey of the address of this `WalletTxOut`.
   */
  scriptPubkey(): Script;
  /**
   * Return the height of the block containing this output if it's confirmed.
   */
  height(): number | undefined;
  /**
   * Return the unblinded values of this `WalletTxOut`.
   */
  unblinded(): TxOutSecrets;
  /**
   * Return the wildcard index used to derive the address of this `WalletTxOut`.
   */
  wildcardIndex(): number;
  /**
   * Return the chain of this `WalletTxOut`. Can be "Chain::External" or "Chain::Internal" (change).
   */
  extInt(): Chain;
  /**
   * Return the address of this `WalletTxOut`.
   */
  address(): Address;
}
/**
 * A watch-only wallet defined by a CT descriptor.
 */
export class Wollet {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a `Wollet`
   */
  constructor(network: Network, descriptor: WolletDescriptor);
  /**
   * Get a wallet address with the correspondong derivation index
   *
   * If Some return the address at the given index,
   * otherwise the last unused address.
   */
  address(index?: number | null): AddressResult;
  /**
   * Return the [ELIP152](https://github.com/ElementsProject/ELIPs/blob/main/elip-0152.mediawiki) deterministic wallet identifier.
   */
  dwid(): string;
  /**
   * Get the full derivation path for an address
   *
   * Note: will be removed once we add the full path to lwk_wollet::AddressResult
   */
  addressFullPath(index: number): Uint32Array;
  /**
   * Apply an update containing blockchain data
   *
   * To update the wallet you need to first obtain the blockchain data relevant for the wallet.
   * This can be done using a `full_scan()`, which
   * returns an `Update` that contains new transaction and other data relevant for the
   * wallet.
   * The update must then be applied to the `Wollet` so that wollet methods such as
   * `balance()` or `transactions()` include the new data.
   *
   * However getting blockchain data involves network calls, so between the full scan start and
   * when the update is applied it might elapse a significant amount of time.
   * In that interval, applying any update, or any transaction using `apply_transaction()`,
   * will cause this function to return a `Error::UpdateOnDifferentStatus`.
   * Callers should either avoid applying updates and transactions, or they can catch the error
   * and wait for a new full scan to be completed and applied.
   */
  applyUpdate(update: Update): void;
  /**
   * Apply a transaction to the wallet state
   *
   * Wallet transactions are normally obtained using a `full_scan()`
   * and applying the result with `apply_update()`. However a
   * full scan involves network calls and it can take a significant amount of time.
   *
   * If the caller does not want to wait for a full scan containing the transaction, it can
   * apply the transaction to the wallet state using this function.
   *
   * Note: if this transaction is *not* returned by a next full scan, after `apply_update()` it will disappear from the
   * transactions list, will not be included in balance computations, and by the remaining
   * wollet methods.
   *
   * Calling this method, might cause `apply_update()` to fail with a
   * `Error::UpdateOnDifferentStatus`, make sure to either avoid it or handle the error properly.
   */
  applyTransaction(tx: Transaction): Balance;
  /**
   * Get the wallet balance for each assets
   */
  balance(): Balance;
  /**
   * Get the asset identifiers owned by the wallet
   */
  assetsOwned(): AssetIds;
  /**
   * Get the wallet transactions, sorted by height descending, then txid descending with unconfirmed first
   */
  transactions(): WalletTx[];
  /**
   * Get the wallet transactions with pagination sorted by height descending, then txid descending with unconfirmed first
   */
  transactionsPaginated(offset: number, limit: number): WalletTx[];
  /**
   * Get the unspent transaction outputs of the wallet
   */
  utxos(): WalletTxOut[];
  /**
   * Get all the transaction outputs of the wallet, both spent and unspent
   */
  txos(): WalletTxOut[];
  /**
   * Finalize and consume the given PSET, returning the finalized one
   */
  finalize(pset: Pset): Pset;
  /**
   * Get the PSET details with respect to the wallet
   */
  psetDetails(pset: Pset): PsetDetails;
  /**
   * Get a copy of the wallet descriptor of this wallet.
   */
  descriptor(): WolletDescriptor;
  /**
   * A deterministic value derived from the descriptor, the config and the content of this wollet,
   * including what's in the wallet store (transactions etc)
   *
   * In this case, we don't need cryptographic assurance guaranteed by the std default hasher (siphash)
   * And we can use a much faster hasher, which is used also in the rust compiler.
   * ([source](https://nnethercote.github.io/2021/12/08/a-brutally-effective-hash-function-in-rust.html))
   */
  status(): bigint;
  /**
   * Get the blockchain tip at the time of the last update of this wollet.
   */
  tip(): Tip;
  /**
   * Returns true if this wollet has never received an updated applyed to it
   */
  neverScanned(): boolean;
  /**
   * Whether the wallet is AMP0
   */
  isAmp0(): boolean;
  /**
   * Get the transaction list
   *
   * **Experimental**: This API may change without notice.
   */
  txs(opt: TxsOpt): TxDetails[];
  /**
   * Number of transactions
   */
  numTxs(): number;
  /**
   * Get the details of a transaction
   *
   * **Experimental**: This API may change without notice.
   */
  txDetails(txid: Txid, opt: TxOpt): TxDetails | undefined;
}
/**
 * A builder for constructing [`Wollet`] instances.
 */
export class WolletBuilder {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Create a builder for a watch-only wallet.
   */
  constructor(network: Network, descriptor: WolletDescriptor);
  /**
   * Set the threshold used to merge persisted updates during build.
   *
   * **Experimental**: This API may change without notice.
   *
   * `None` disables merging (default behavior).
   */
  withMergeThreshold(merge_threshold?: number | null): WolletBuilder;
  /**
   * Set the wallet as "utxo only".
   *
   * **Experimental**: This API may change without notice.
   */
  utxoOnly(utxo_only: boolean): WolletBuilder;
  /**
   * Persist wallet updates in the given JavaScript storage object.
   *
   * **Experimental**: This API may change without notice.
   *
   * Wallet data is persisted in clear.
   *
   * The JS object must have `get(key)`, `put(key, value)`, and `remove(key)` methods.
   */
  withExperimentalStore(storage: any): WolletBuilder;
  /**
   * Persist wallet transactions in the given JavaScript
   * storage object.
   *
   * **Experimental**: This API may change without notice.
   *
   * The JS object must have `get(key)`, `put(key, value)`, and `remove(key)` methods.
   */
  withTxsStore(storage: any): WolletBuilder;
  /**
   * Set encryption for the transactions store.
   *
   * **Experimental**: This API may change without notice.
   *
   * Default: encrypted if the store is persisted.
   */
  setEncryptionTxsStore(encrypt: boolean): WolletBuilder;
  /**
   * Build the wallet from this builder.
   */
  build(): Wollet;
}
/**
 * A wrapper that contains only the subset of CT descriptors handled by wollet
 */
export class WolletDescriptor {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a `WolletDescriptor`
   */
  constructor(descriptor: string);
  /**
   * Return the string representation of the descriptor, including the checksum.
   * This representation can be used to recreate the descriptor via `new()`
   */
  toString(): string;
  /**
   * Create a new multisig descriptor, where each participant is a keyorigin_xpub and it requires at least threshold signatures to spend.
   * Errors if the threshold is 0 or greater than the number of participants.
   * Uses slip77 for the blinding key.
   */
  static newMultiWshSlip77(threshold: number, participants: string[]): WolletDescriptor;
  /**
   * Whether the descriptor is for mainnet
   */
  isMainnet(): boolean;
  /**
   * Whether the descriptor is AMP0
   */
  isAmp0(): boolean;
}
/**
 * An x-only public key, used for verification of Taproot signatures and serialized according to BIP-340.
 */
export class XOnlyPublicKey {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates an `XOnlyPublicKey` from a string.
   */
  static fromString(s: string): XOnlyPublicKey;
  /**
   * Creates an `XOnlyPublicKey` from raw bytes (32 bytes).
   */
  static fromBytes(bytes: Uint8Array): XOnlyPublicKey;
  /**
   * Serializes the x-only public key to bytes (32 bytes).
   */
  toBytes(): Uint8Array;
  /**
   * Returns the string representation.
   */
  toString(): string;
}
/**
 * An extended public key
 */
export class Xpub {
  free(): void;
  [Symbol.dispose](): void;
  /**
   * Creates a Xpub
   */
  constructor(s: string);
  /**
   * Return the string representation of the Xpub.
   * This representation can be used to recreate the Xpub via `new()`
   */
  toString(): string;
  /**
   * Return the identifier of the Xpub.
   * This is a 40 hex characters string (20 bytes).
   */
  identifier(): string;
  /**
   * Return the first four bytes of the identifier as hex string
   * This is a 8 hex characters string (4 bytes).
   */
  fingerprint(): string;
  /**
   * Returns true if the passed string is a valid xpub with a valid keyorigin if present.
   * For example: "[73c5da0a/84h/1h/0h]tpub..."
   */
  static isValidWithKeyOrigin(s: string): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_balance_free: (a: number, b: number) => void;
  readonly balance_toJSON: (a: number) => [number, number, number];
  readonly balance_entries: (a: number) => [number, number, number];
  readonly balance_toString: (a: number) => [number, number];
  readonly __wbg_address_free: (a: number, b: number) => void;
  readonly address_new: (a: number, b: number) => [number, number, number];
  readonly address_parse: (a: number, b: number, c: number) => [number, number, number];
  readonly address_scriptPubkey: (a: number) => number;
  readonly address_isBlinded: (a: number) => number;
  readonly address_isMainnet: (a: number) => number;
  readonly address_toUnconfidential: (a: number) => number;
  readonly address_toString: (a: number) => [number, number];
  readonly address_QRCodeUri: (a: number, b: number) => [number, number, number, number];
  readonly address_QRCodeText: (a: number) => [number, number, number, number];
  readonly __wbg_addressresult_free: (a: number, b: number) => void;
  readonly addressresult_address: (a: number) => number;
  readonly addressresult_index: (a: number) => number;
  readonly __wbg_contracthash_free: (a: number, b: number) => void;
  readonly contracthash_fromString: (a: number, b: number) => [number, number, number];
  readonly contracthash_fromBytes: (a: number, b: number) => [number, number, number];
  readonly contracthash_toBytes: (a: number) => [number, number];
  readonly contracthash_toString: (a: number) => [number, number];
  readonly __wbg_txoutsecrets_free: (a: number, b: number) => void;
  readonly txoutsecrets_new: (a: number, b: number, c: bigint, d: number) => number;
  readonly txoutsecrets_fromExplicit: (a: number, b: bigint) => number;
  readonly txoutsecrets_asset: (a: number) => number;
  readonly txoutsecrets_assetBlindingFactor: (a: number) => number;
  readonly txoutsecrets_value: (a: number) => bigint;
  readonly txoutsecrets_valueBlindingFactor: (a: number) => number;
  readonly txoutsecrets_isExplicit: (a: number) => number;
  readonly txoutsecrets_assetCommitment: (a: number) => [number, number];
  readonly txoutsecrets_valueCommitment: (a: number) => [number, number];
  readonly __wbg_lastusedindexresponse_free: (a: number, b: number) => void;
  readonly lastusedindexresponse_external: (a: number) => number;
  readonly lastusedindexresponse_internal: (a: number) => number;
  readonly lastusedindexresponse_tip: (a: number) => [number, number];
  readonly __wbg_esploraclient_free: (a: number, b: number) => void;
  readonly esploraclient_new: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number];
  readonly esploraclient_fullScan: (a: number, b: number) => any;
  readonly esploraclient_fullScanToIndex: (a: number, b: number, c: number) => any;
  readonly esploraclient_broadcastTx: (a: number, b: number) => any;
  readonly esploraclient_broadcast: (a: number, b: number) => any;
  readonly esploraclient_setWaterfallsServerRecipient: (a: number, b: number, c: number) => any;
  readonly esploraclient_lastUsedIndex: (a: number, b: number) => any;
  readonly __wbg_posconfig_free: (a: number, b: number) => void;
  readonly posconfig_new: (a: number, b: number) => number;
  readonly posconfig_withOptions: (a: number, b: number, c: number, d: number) => number;
  readonly posconfig_decode: (a: number, b: number) => [number, number, number];
  readonly posconfig_encode: (a: number) => [number, number, number, number];
  readonly posconfig_descriptor: (a: number) => number;
  readonly posconfig_currency: (a: number) => number;
  readonly posconfig_show_gear: (a: number) => number;
  readonly posconfig_show_description: (a: number) => number;
  readonly posconfig_toString: (a: number) => [number, number];
  readonly __wbg_issuancerecipient_free: (a: number, b: number) => void;
  readonly issuancerecipient_wallet: (a: bigint) => number;
  readonly issuancerecipient_fromAddress: (a: bigint, b: number) => number;
  readonly __wbg_txbuilder_free: (a: number, b: number) => void;
  readonly txbuilder_new: (a: number) => number;
  readonly txbuilder_finish: (a: number, b: number) => [number, number, number];
  readonly txbuilder_setInputSequence: (a: number, b: number, c: number) => number;
  readonly txbuilder_finishForAmp0: (a: number, b: number) => [number, number, number];
  readonly txbuilder_feeRate: (a: number, b: number) => number;
  readonly txbuilder_drainLbtcWallet: (a: number) => number;
  readonly txbuilder_drainLbtcTo: (a: number, b: number) => number;
  readonly txbuilder_addLbtcRecipient: (a: number, b: number, c: bigint) => [number, number, number];
  readonly txbuilder_addRecipient: (a: number, b: number, c: bigint, d: number) => [number, number, number];
  readonly txbuilder_addBurn: (a: number, b: bigint, c: number) => number;
  readonly txbuilder_addExplicitRecipient: (a: number, b: number, c: bigint, d: number) => [number, number, number];
  readonly txbuilder_addPostIssuanceScriptOutput: (a: number, b: number, c: bigint, d: number) => number;
  readonly txbuilder_addPostIssuanceRecipient: (a: number, b: number, c: bigint, d: number) => number;
  readonly txbuilder_issueAsset: (a: number, b: bigint, c: number, d: bigint, e: number, f: number) => [number, number, number];
  readonly txbuilder_issueAssetToRecipients: (a: number, b: number, c: number, d: bigint, e: number, f: number, g: number) => [number, number, number];
  readonly txbuilder_reissueAsset: (a: number, b: number, c: bigint, d: number, e: number) => [number, number, number];
  readonly txbuilder_setWalletUtxos: (a: number, b: number, c: number) => number;
  readonly txbuilder_setInputOrder: (a: number, b: number, c: number) => number;
  readonly txbuilder_addExternalUtxos: (a: number, b: number, c: number) => [number, number, number];
  readonly txbuilder_toString: (a: number) => [number, number];
  readonly txbuilder_liquidexMake: (a: number, b: number, c: number, d: bigint, e: number) => [number, number, number];
  readonly txbuilder_liquidexTake: (a: number, b: number, c: number) => [number, number, number];
  readonly txbuilder_addInputRangeproofs: (a: number, b: number) => number;
  readonly txbuilder_setFallbackLocktimeHeight: (a: number, b: number) => [number, number, number];
  readonly __wbg_update_free: (a: number, b: number) => void;
  readonly update_new: (a: number, b: number) => [number, number, number];
  readonly update_serialize: (a: number) => [number, number, number, number];
  readonly update_serializeEncryptedBase64: (a: number, b: number) => [number, number, number, number];
  readonly update_deserializeDecryptedBase64: (a: number, b: number, c: number) => [number, number, number];
  readonly update_onlyTip: (a: number) => number;
  readonly update_prune: (a: number, b: number) => void;
  readonly __wbg_wollet_free: (a: number, b: number) => void;
  readonly wollet_new: (a: number, b: number) => [number, number, number];
  readonly wollet_address: (a: number, b: number) => [number, number, number];
  readonly wollet_dwid: (a: number) => [number, number, number, number];
  readonly wollet_addressFullPath: (a: number, b: number) => [number, number, number, number];
  readonly wollet_applyUpdate: (a: number, b: number) => [number, number];
  readonly wollet_applyTransaction: (a: number, b: number) => [number, number, number];
  readonly wollet_balance: (a: number) => [number, number, number];
  readonly wollet_assetsOwned: (a: number) => [number, number, number];
  readonly wollet_transactions: (a: number) => [number, number, number, number];
  readonly wollet_transactionsPaginated: (a: number, b: number, c: number) => [number, number, number, number];
  readonly wollet_utxos: (a: number) => [number, number, number, number];
  readonly wollet_txos: (a: number) => [number, number, number, number];
  readonly wollet_finalize: (a: number, b: number) => [number, number, number];
  readonly wollet_psetDetails: (a: number, b: number) => [number, number, number];
  readonly wollet_descriptor: (a: number) => [number, number, number];
  readonly wollet_status: (a: number) => bigint;
  readonly wollet_tip: (a: number) => number;
  readonly wollet_neverScanned: (a: number) => number;
  readonly wollet_isAmp0: (a: number) => number;
  readonly __wbg_tip_free: (a: number, b: number) => void;
  readonly tip_height: (a: number) => number;
  readonly tip_hash: (a: number) => [number, number];
  readonly tip_timestamp: (a: number) => number;
  readonly __wbg_unvalidatedliquidexproposal_free: (a: number, b: number) => void;
  readonly __wbg_assetamount_free: (a: number, b: number) => void;
  readonly unvalidatedliquidexproposal_new: (a: number, b: number) => [number, number, number];
  readonly unvalidatedliquidexproposal_fromPset: (a: number) => [number, number, number];
  readonly unvalidatedliquidexproposal_insecureValidate: (a: number) => [number, number, number];
  readonly unvalidatedliquidexproposal_validate: (a: number, b: number) => [number, number, number];
  readonly unvalidatedliquidexproposal_toString: (a: number) => [number, number];
  readonly assetamount_amount: (a: number) => bigint;
  readonly assetamount_asset: (a: number) => number;
  readonly validatedliquidexproposal_input: (a: number) => number;
  readonly validatedliquidexproposal_output: (a: number) => number;
  readonly validatedliquidexproposal_toString: (a: number) => [number, number];
  readonly __wbg_simplicityarguments_free: (a: number, b: number) => void;
  readonly simplicityarguments_new: () => number;
  readonly simplicityarguments_addValue: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_simplicityprogram_free: (a: number, b: number) => void;
  readonly simplicityprogram_load: (a: number, b: number, c: number) => [number, number, number];
  readonly simplicityprogram_cmr: (a: number) => number;
  readonly simplicityprogram_createP2trAddress: (a: number, b: number, c: number) => [number, number, number];
  readonly simplicityprogram_controlBlock: (a: number, b: number) => [number, number, number];
  readonly simplicityprogram_getSighashAll: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number, number];
  readonly simplicityprogram_finalizeTransaction: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
  readonly simplicityprogram_createP2pkSignature: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number, number];
  readonly simplicityprogram_finalizeTransactionWithSpendInfo: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
  readonly simplicityprogram_run: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => [number, number, number];
  readonly __wbg_simplicityrunresult_free: (a: number, b: number) => void;
  readonly simplicityrunresult_program_bytes: (a: number) => [number, number];
  readonly simplicityrunresult_witness_bytes: (a: number) => [number, number];
  readonly simplicityrunresult_cmr: (a: number) => number;
  readonly simplicityrunresult_value: (a: number) => [number, number];
  readonly __wbg_statetaprootbuilder_free: (a: number, b: number) => void;
  readonly statetaprootbuilder_new: () => number;
  readonly statetaprootbuilder_addSimplicityLeaf: (a: number, b: number, c: number) => [number, number, number];
  readonly statetaprootbuilder_addDataLeaf: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly statetaprootbuilder_addHiddenHash: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly statetaprootbuilder_finalize: (a: number, b: number) => [number, number, number];
  readonly __wbg_statetaprootspendinfo_free: (a: number, b: number) => void;
  readonly statetaprootspendinfo_output_key: (a: number) => number;
  readonly statetaprootspendinfo_output_key_parity: (a: number) => number;
  readonly statetaprootspendinfo_internal_key: (a: number) => number;
  readonly statetaprootspendinfo_merkle_root: (a: number) => [number, number];
  readonly statetaprootspendinfo_controlBlock: (a: number, b: number) => [number, number, number];
  readonly statetaprootspendinfo_script_pubkey: (a: number) => number;
  readonly bytesToHex: (a: number, b: number) => [number, number];
  readonly simplicityDeriveXonlyPubkey: (a: number, b: number, c: number) => [number, number, number];
  readonly simplicityControlBlock: (a: number, b: number) => [number, number, number];
  readonly simplicitywitnessvalues_new: () => number;
  readonly __wbg_simplicitywitnessvalues_free: (a: number, b: number) => void;
  readonly __wbg_validatedliquidexproposal_free: (a: number, b: number) => void;
  readonly simplicitywitnessvalues_addValue: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_bip_free: (a: number, b: number) => void;
  readonly bip_bip49: () => number;
  readonly bip_bip84: () => number;
  readonly bip_bip87: () => number;
  readonly bip_toString: (a: number) => [number, number];
  readonly __wbg_txsequence_free: (a: number, b: number) => void;
  readonly txsequence_zero: () => number;
  readonly txsequence_max: () => number;
  readonly txsequence_enableRbfNoLocktime: () => number;
  readonly txsequence_enableLocktimeNoRbf: () => number;
  readonly txsequence_fromHeight: (a: number) => number;
  readonly txsequence_from512SecondIntervals: (a: number) => number;
  readonly txsequence_fromSecondsFloor: (a: number) => [number, number, number];
  readonly txsequence_fromSecondsCeil: (a: number) => [number, number, number];
  readonly txsequence_toConsensusU32: (a: number) => number;
  readonly txsequence_isFinal: (a: number) => number;
  readonly txsequence_isRbf: (a: number) => number;
  readonly txsequence_isRelativeLockTime: (a: number) => number;
  readonly txsequence_isHeightLocked: (a: number) => number;
  readonly txsequence_isTimeLocked: (a: number) => number;
  readonly txsequence_enablesAbsoluteLockTime: (a: number) => number;
  readonly __wbg_wallettx_free: (a: number, b: number) => void;
  readonly wallettx_tx: (a: number) => number;
  readonly wallettx_height: (a: number) => number;
  readonly wallettx_balance: (a: number) => number;
  readonly wallettx_txid: (a: number) => number;
  readonly wallettx_fee: (a: number) => bigint;
  readonly wallettx_txType: (a: number) => [number, number];
  readonly wallettx_timestamp: (a: number) => number;
  readonly wallettx_inputs: (a: number) => [number, number];
  readonly wallettx_outputs: (a: number) => [number, number];
  readonly wallettx_unblindedUrl: (a: number, b: number, c: number) => [number, number];
  readonly __wbg_wallettxout_free: (a: number, b: number) => void;
  readonly wallettxout_outpoint: (a: number) => number;
  readonly wallettxout_scriptPubkey: (a: number) => number;
  readonly wallettxout_unblinded: (a: number) => number;
  readonly wallettxout_wildcardIndex: (a: number) => number;
  readonly wallettxout_extInt: (a: number) => number;
  readonly wallettxout_address: (a: number) => number;
  readonly __wbg_optionwallettxout_free: (a: number, b: number) => void;
  readonly optionwallettxout_get: (a: number) => number;
  readonly __wbg_controlblock_free: (a: number, b: number) => void;
  readonly controlblock_fromBytes: (a: number, b: number) => [number, number, number];
  readonly controlblock_toBytes: (a: number) => [number, number];
  readonly controlblock_leaf_version: (a: number) => number;
  readonly controlblock_internal_key: (a: number) => number;
  readonly controlblock_output_key_parity: (a: number) => number;
  readonly controlblock_size: (a: number) => number;
  readonly __wbg_jade_free: (a: number, b: number) => void;
  readonly jade_new: (a: number, b: number) => any;
  readonly jade_fromSerial: (a: number, b: number) => any;
  readonly jade_getVersion: (a: number) => any;
  readonly jade_getMasterXpub: (a: number) => any;
  readonly jade_getReceiveAddressSingle: (a: number, b: number, c: number, d: number) => any;
  readonly jade_getReceiveAddressMulti: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly jade_sign: (a: number, b: number) => any;
  readonly jade_wpkh: (a: number) => any;
  readonly jade_shWpkh: (a: number) => any;
  readonly jade_multi: (a: number, b: number, c: number) => any;
  readonly jade_getRegisteredMultisigs: (a: number) => any;
  readonly jade_keyoriginXpub: (a: number, b: number) => any;
  readonly jade_disconnect: (a: number) => any;
  readonly jade_registerDescriptor: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_singlesig_free: (a: number, b: number) => void;
  readonly singlesig_from: (a: number, b: number) => [number, number, number];
  readonly __wbg_jadewebsocket_free: (a: number, b: number) => void;
  readonly jadewebsocket_new: (a: number, b: number, c: number) => any;
  readonly jadewebsocket_fromWebSocket: (a: number, b: number, c: number) => any;
  readonly jadewebsocket_getVersion: (a: number) => any;
  readonly jadewebsocket_getMasterXpub: (a: number) => any;
  readonly jadewebsocket_getReceiveAddressSingle: (a: number, b: number, c: number, d: number) => any;
  readonly jadewebsocket_getReceiveAddressMulti: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly jadewebsocket_sign: (a: number, b: number) => any;
  readonly jadewebsocket_wpkh: (a: number) => any;
  readonly jadewebsocket_shWpkh: (a: number) => any;
  readonly jadewebsocket_multi: (a: number, b: number, c: number) => any;
  readonly jadewebsocket_getRegisteredMultisigs: (a: number) => any;
  readonly jadewebsocket_keyoriginXpub: (a: number, b: number) => any;
  readonly jadewebsocket_registerDescriptor: (a: number, b: number, c: number, d: number) => any;
  readonly __wbg_keypair_free: (a: number, b: number) => void;
  readonly keypair_fromSecretBytes: (a: number, b: number) => [number, number, number];
  readonly keypair_fromSecretKey: (a: number) => number;
  readonly keypair_generate: () => number;
  readonly keypair_secret_bytes: (a: number) => [number, number];
  readonly keypair_secret_key: (a: number) => number;
  readonly keypair_public_key: (a: number) => number;
  readonly keypair_x_only_public_key: (a: number) => number;
  readonly keypair_signSchnorr: (a: number, b: number, c: number) => [number, number, number, number];
  readonly __wbg_precision_free: (a: number, b: number) => void;
  readonly precision_new: (a: number) => [number, number, number];
  readonly precision_satsToString: (a: number, b: bigint) => [number, number];
  readonly precision_stringToSats: (a: number, b: number, c: number) => [bigint, number, number];
  readonly __wbg_pricesfetcher_free: (a: number, b: number) => void;
  readonly __wbg_pricesfetcherbuilder_free: (a: number, b: number) => void;
  readonly pricesfetcher_new: () => [number, number, number];
  readonly pricesfetcher_rates: (a: number, b: number) => any;
  readonly __wbg_currencycode_free: (a: number, b: number) => void;
  readonly currencycode_new: (a: number, b: number) => [number, number, number];
  readonly currencycode_name: (a: number) => [number, number];
  readonly currencycode_alpha3: (a: number) => [number, number];
  readonly currencycode_exp: (a: number) => number;
  readonly __wbg_exchangerates_free: (a: number, b: number) => void;
  readonly exchangerates_median: (a: number) => number;
  readonly exchangerates_results: (a: number) => [number, number, number];
  readonly exchangerates_resultsCount: (a: number) => number;
  readonly exchangerates_serialize: (a: number) => [number, number, number, number];
  readonly __wbg_jsstorelink_free: (a: number, b: number) => void;
  readonly jsstorelink_new: (a: any) => number;
  readonly __wbg_jsteststore_free: (a: number, b: number) => void;
  readonly jsteststore_write: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly jsteststore_read: (a: number, b: number, c: number) => [number, number, number, number];
  readonly jsteststore_remove: (a: number, b: number, c: number) => [number, number];
  readonly stringToQr: (a: number, b: number, c: number) => [number, number, number, number];
  readonly wallettxout_height: (a: number) => number;
  readonly txsequence_from_consensus: (a: number) => number;
  readonly jsteststore_new: (a: any) => number;
  readonly __wbg_simplicitytype_free: (a: number, b: number) => void;
  readonly simplicitytype_u1: () => number;
  readonly simplicitytype_u8: () => number;
  readonly simplicitytype_u16: () => number;
  readonly simplicitytype_u32: () => number;
  readonly simplicitytype_u64: () => number;
  readonly simplicitytype_u128: () => number;
  readonly simplicitytype_u256: () => number;
  readonly simplicitytype_boolean: () => number;
  readonly simplicitytype_either: (a: number, b: number) => number;
  readonly simplicitytype_option: (a: number) => number;
  readonly simplicitytype_fromElements: (a: number, b: number) => number;
  readonly simplicitytype_fromString: (a: number, b: number) => [number, number, number];
  readonly simplicitytype_toString: (a: number) => [number, number];
  readonly __wbg_simplicitytypedvalue_free: (a: number, b: number) => void;
  readonly simplicitytypedvalue_fromU8: (a: number) => number;
  readonly simplicitytypedvalue_fromU16: (a: number) => number;
  readonly simplicitytypedvalue_fromU32: (a: number) => number;
  readonly simplicitytypedvalue_fromU64: (a: bigint) => number;
  readonly simplicitytypedvalue_fromU128Hex: (a: number, b: number) => [number, number, number];
  readonly simplicitytypedvalue_fromU256Hex: (a: number, b: number) => [number, number, number];
  readonly simplicitytypedvalue_fromBoolean: (a: number) => number;
  readonly simplicitytypedvalue_left: (a: number, b: number) => number;
  readonly simplicitytypedvalue_right: (a: number, b: number) => number;
  readonly simplicitytypedvalue_fromElements: (a: number, b: number) => number;
  readonly simplicitytypedvalue_none: (a: number) => number;
  readonly simplicitytypedvalue_some: (a: number) => number;
  readonly simplicitytypedvalue_fromByteArrayHex: (a: number, b: number) => [number, number, number];
  readonly simplicitytypedvalue_parse: (a: number, b: number, c: number) => [number, number, number];
  readonly __wbg_blockheader_free: (a: number, b: number) => void;
  readonly blockheader_blockHash: (a: number) => [number, number];
  readonly blockheader_prevBlockhash: (a: number) => [number, number];
  readonly blockheader_merkleRoot: (a: number) => [number, number];
  readonly blockheader_time: (a: number) => number;
  readonly blockheader_version: (a: number) => number;
  readonly blockheader_height: (a: number) => number;
  readonly __wbg_locktime_free: (a: number, b: number) => void;
  readonly locktime_from_consensus: (a: number) => number;
  readonly locktime_from_height: (a: number) => [number, number, number];
  readonly locktime_from_time: (a: number) => [number, number, number];
  readonly locktime_zero: () => number;
  readonly locktime_toConsensusU32: (a: number) => number;
  readonly locktime_isBlockHeight: (a: number) => number;
  readonly locktime_isBlockTime: (a: number) => number;
  readonly locktime_toString: (a: number) => [number, number];
  readonly __wbg_network_free: (a: number, b: number) => void;
  readonly network_mainnet: () => number;
  readonly network_testnet: () => number;
  readonly network_regtest: (a: number) => number;
  readonly network_regtestDefault: () => number;
  readonly network_defaultEsploraClient: (a: number) => number;
  readonly network_isMainnet: (a: number) => number;
  readonly network_isTestnet: (a: number) => number;
  readonly network_isRegtest: (a: number) => number;
  readonly network_toString: (a: number) => [number, number];
  readonly network_policyAsset: (a: number) => number;
  readonly network_genesisBlockHash: (a: number) => [number, number];
  readonly network_txBuilder: (a: number) => number;
  readonly network_defaultExplorerUrl: (a: number) => [number, number];
  readonly __wbg_tweak_free: (a: number, b: number) => void;
  readonly tweak_fromBytes: (a: number, b: number) => [number, number, number];
  readonly tweak_fromString: (a: number, b: number) => [number, number, number];
  readonly tweak_zero: () => number;
  readonly tweak_toBytes: (a: number) => [number, number];
  readonly tweak_toString: (a: number) => [number, number];
  readonly __wbg_xonlypublickey_free: (a: number, b: number) => void;
  readonly xonlypublickey_fromString: (a: number, b: number) => [number, number, number];
  readonly xonlypublickey_fromBytes: (a: number, b: number) => [number, number, number];
  readonly xonlypublickey_toBytes: (a: number) => [number, number];
  readonly xonlypublickey_toString: (a: number) => [number, number];
  readonly __wbg_xpub_free: (a: number, b: number) => void;
  readonly xpub_new: (a: number, b: number) => [number, number, number];
  readonly xpub_toString: (a: number) => [number, number];
  readonly xpub_identifier: (a: number) => [number, number];
  readonly xpub_fingerprint: (a: number) => [number, number];
  readonly xpub_isValidWithKeyOrigin: (a: number, b: number) => number;
  readonly __wbg_amp2_free: (a: number, b: number) => void;
  readonly __wbg_amp2descriptor_free: (a: number, b: number) => void;
  readonly amp2descriptor_descriptor: (a: number) => number;
  readonly amp2descriptor_toString: (a: number) => [number, number];
  readonly amp2_new: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly amp2_newTestnet: () => number;
  readonly amp2_descriptorFromStr: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly amp2_register: (a: number, b: number) => any;
  readonly amp2_cosign: (a: number, b: number) => any;
  readonly __wbg_contract_free: (a: number, b: number) => void;
  readonly contract_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number, number];
  readonly contract_toString: (a: number) => [number, number];
  readonly contract_domain: (a: number) => [number, number];
  readonly contract_clone: (a: number) => number;
  readonly __wbg_wolletdescriptor_free: (a: number, b: number) => void;
  readonly wolletdescriptor_new: (a: number, b: number) => [number, number, number];
  readonly wolletdescriptor_toString: (a: number) => [number, number];
  readonly wolletdescriptor_newMultiWshSlip77: (a: number, b: number, c: number) => [number, number, number];
  readonly wolletdescriptor_isMainnet: (a: number) => number;
  readonly wolletdescriptor_isAmp0: (a: number) => number;
  readonly __wbg_magicroutinghint_free: (a: number, b: number) => void;
  readonly magicroutinghint_address: (a: number) => [number, number];
  readonly magicroutinghint_amount: (a: number) => bigint;
  readonly magicroutinghint_uri: (a: number) => [number, number];
  readonly __wbg_externalutxo_free: (a: number, b: number) => void;
  readonly externalutxo_new: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly __wbg_pset_free: (a: number, b: number) => void;
  readonly pset_new: (a: number, b: number) => [number, number, number];
  readonly pset_toString: (a: number) => [number, number];
  readonly pset_extractTx: (a: number) => [number, number, number];
  readonly pset_uniqueId: (a: number) => [number, number, number];
  readonly pset_combine: (a: number, b: number) => [number, number];
  readonly pset_inputs: (a: number) => [number, number];
  readonly pset_outputs: (a: number) => [number, number];
  readonly pset_addDetails: (a: number, b: number) => [number, number];
  readonly pset_finalize: (a: number) => [number, number, number];
  readonly __wbg_psetinput_free: (a: number, b: number) => void;
  readonly psetinput_previousTxid: (a: number) => number;
  readonly psetinput_previousVout: (a: number) => number;
  readonly psetinput_previousScriptPubkey: (a: number) => number;
  readonly psetinput_redeemScript: (a: number) => number;
  readonly psetinput_issuanceAsset: (a: number) => number;
  readonly psetinput_issuanceToken: (a: number) => number;
  readonly psetinput_issuance: (a: number) => number;
  readonly psetinput_sighash: (a: number) => number;
  readonly psetinput_issuanceIds: (a: number) => [number, number];
  readonly __wbg_psetinputbuilder_free: (a: number, b: number) => void;
  readonly psetinputbuilder_fromPrevout: (a: number) => number;
  readonly psetinputbuilder_witnessUtxo: (a: number, b: number) => number;
  readonly psetinputbuilder_sequence: (a: number, b: number) => number;
  readonly psetinputbuilder_issuanceValueAmount: (a: number, b: bigint) => number;
  readonly psetinputbuilder_issuanceInflationKeys: (a: number, b: bigint) => number;
  readonly psetinputbuilder_issuanceAssetEntropy: (a: number, b: number) => number;
  readonly psetinputbuilder_blindedIssuance: (a: number, b: number) => number;
  readonly psetinputbuilder_issuanceBlindingNonce: (a: number, b: number) => number;
  readonly psetinputbuilder_build: (a: number) => number;
  readonly __wbg_psetoutput_free: (a: number, b: number) => void;
  readonly psetoutput_scriptPubkey: (a: number) => number;
  readonly psetoutput_amount: (a: number) => [number, bigint];
  readonly psetoutput_asset: (a: number) => number;
  readonly psetoutput_blinderIndex: (a: number) => number;
  readonly __wbg_psetoutputbuilder_free: (a: number, b: number) => void;
  readonly psetoutputbuilder_newExplicit: (a: number, b: bigint, c: number) => number;
  readonly psetoutputbuilder_blindingPubkey: (a: number, b: number) => number;
  readonly psetoutputbuilder_scriptPubkey: (a: number, b: number) => number;
  readonly psetoutputbuilder_satoshi: (a: number, b: bigint) => number;
  readonly psetoutputbuilder_asset: (a: number, b: number) => number;
  readonly psetoutputbuilder_blinderIndex: (a: number, b: number) => number;
  readonly psetoutputbuilder_build: (a: number) => number;
  readonly __wbg_psetbuilder_free: (a: number, b: number) => void;
  readonly psetbuilder_newV2: () => number;
  readonly psetbuilder_addInput: (a: number, b: number) => number;
  readonly psetbuilder_addOutput: (a: number, b: number) => number;
  readonly psetbuilder_setFallbackLocktime: (a: number, b: number) => number;
  readonly psetbuilder_blindLast: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
  readonly psetbuilder_build: (a: number) => number;
  readonly __wbg_amp0_free: (a: number, b: number) => void;
  readonly amp0_newWithNetwork: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly amp0_newTestnet: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly amp0_newMainnet: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly amp0_lastIndex: (a: number) => number;
  readonly amp0_ampId: (a: number) => [number, number];
  readonly amp0_address: (a: number, b: number) => any;
  readonly amp0_wollet: (a: number) => [number, number, number];
  readonly amp0_sign: (a: number, b: number) => any;
  readonly __wbg_amp0pset_free: (a: number, b: number) => void;
  readonly amp0pset_new: (a: number, b: number, c: number) => [number, number, number];
  readonly amp0pset_pset: (a: number) => number;
  readonly amp0pset_blindingNonces: (a: number) => [number, number];
  readonly __wbg_amp0signerdata_free: (a: number, b: number) => void;
  readonly signer_amp0SignerData: (a: number) => [number, number, number];
  readonly signer_amp0SignChallenge: (a: number, b: number, c: number) => [number, number, number, number];
  readonly signer_amp0AccountXpub: (a: number, b: number) => [number, number, number, number];
  readonly __wbg_amp0connected_free: (a: number, b: number) => void;
  readonly amp0connected_new: (a: number, b: number) => any;
  readonly amp0connected_connect: (a: number, b: number) => any;
  readonly amp0connected_getChallenge: (a: number) => any;
  readonly amp0connected_login: (a: number, b: number, c: number) => any;
  readonly __wbg_amp0loggedin_free: (a: number, b: number) => void;
  readonly amp0loggedin_getAmpIds: (a: number) => [number, number, number, number];
  readonly amp0loggedin_nextAccount: (a: number) => [number, number, number];
  readonly amp0loggedin_createAmp0Account: (a: number, b: number, c: number, d: number) => any;
  readonly amp0loggedin_createWatchOnly: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly __wbg_assetblindingfactor_free: (a: number, b: number) => void;
  readonly assetblindingfactor_fromString: (a: number, b: number) => [number, number, number];
  readonly assetblindingfactor_fromBytes: (a: number, b: number) => [number, number, number];
  readonly assetblindingfactor_zero: () => number;
  readonly assetblindingfactor_toBytes: (a: number) => [number, number];
  readonly assetblindingfactor_toString: (a: number) => [number, number];
  readonly __wbg_valueblindingfactor_free: (a: number, b: number) => void;
  readonly valueblindingfactor_fromString: (a: number, b: number) => [number, number, number];
  readonly valueblindingfactor_fromBytes: (a: number, b: number) => [number, number, number];
  readonly valueblindingfactor_toBytes: (a: number) => [number, number];
  readonly valueblindingfactor_toString: (a: number) => [number, number];
  readonly __wbg_boltzsessionbuilder_free: (a: number, b: number) => void;
  readonly __wbg_boltzsession_free: (a: number, b: number) => void;
  readonly boltzsessionbuilder_new: (a: number, b: number) => [number, number, number];
  readonly boltzsessionbuilder_createSwapTimeout: (a: number, b: bigint) => number;
  readonly boltzsessionbuilder_timeoutAdvance: (a: number, b: bigint) => number;
  readonly boltzsessionbuilder_mnemonic: (a: number, b: number) => number;
  readonly boltzsessionbuilder_polling: (a: number, b: number) => number;
  readonly boltzsessionbuilder_nextIndexToUse: (a: number, b: number) => number;
  readonly boltzsessionbuilder_referralId: (a: number, b: number, c: number) => number;
  readonly boltzsessionbuilder_apiUrl: (a: number, b: number, c: number) => number;
  readonly boltzsessionbuilder_bitcoinElectrumClient: (a: number, b: number, c: number) => [number, number, number];
  readonly boltzsessionbuilder_randomPreimages: (a: number, b: number) => number;
  readonly boltzsessionbuilder_build: (a: number) => any;
  readonly __wbg_preparepayresponse_free: (a: number, b: number) => void;
  readonly preparepayresponse_serialize: (a: number) => [number, number, number, number];
  readonly preparepayresponse_swapId: (a: number) => [number, number];
  readonly preparepayresponse_uri: (a: number) => [number, number];
  readonly preparepayresponse_uriAddress: (a: number) => [number, number, number];
  readonly preparepayresponse_uriAmount: (a: number) => bigint;
  readonly preparepayresponse_completePay: (a: number) => any;
  readonly __wbg_invoice_free: (a: number, b: number) => void;
  readonly invoice_toString: (a: number) => [number, number];
  readonly invoice_amountSats: (a: number) => [bigint, number, number];
  readonly invoice_isBolt11: (a: number) => number;
  readonly invoice_isBolt12: (a: number) => number;
  readonly invoice_bolt11Invoice: (a: number) => [number, number];
  readonly invoice_bolt12Invoice: (a: number) => [number, number];
  readonly __wbg_invoiceresponse_free: (a: number, b: number) => void;
  readonly invoiceresponse_serialize: (a: number) => [number, number, number, number];
  readonly invoiceresponse_bolt11Invoice: (a: number) => [number, number];
  readonly invoiceresponse_swapId: (a: number) => [number, number];
  readonly invoiceresponse_fee: (a: number) => [number, bigint];
  readonly invoiceresponse_completePay: (a: number) => any;
  readonly boltzsession_rescueFile: (a: number) => [number, number, number, number];
  readonly boltzsession_preparePay: (a: number, b: number, c: number) => any;
  readonly boltzsession_fetchBolt12Invoice: (a: number, b: number) => any;
  readonly boltzsession_invoice: (a: number, b: bigint, c: number, d: number, e: number) => any;
  readonly boltzsession_restorePreparePay: (a: number, b: number, c: number) => any;
  readonly boltzsession_restoreInvoice: (a: number, b: number, c: number) => any;
  readonly __wbg_lightningpayment_free: (a: number, b: number) => void;
  readonly lightningpayment_new: (a: number, b: number) => [number, number, number];
  readonly lightningpayment_toString: (a: number) => [number, number];
  readonly lightningpayment_toUriQr: (a: number, b: number) => [number, number, number, number];
  readonly __wbg_ledgerweb_free: (a: number, b: number) => void;
  readonly ledgerweb_new: (a: any, b: number) => number;
  readonly ledgerweb_getVersion: (a: number) => any;
  readonly ledgerweb_deriveXpub: (a: number, b: number, c: number) => any;
  readonly ledgerweb_slip77MasterBlindingKey: (a: number) => any;
  readonly ledgerweb_fingerprint: (a: number) => any;
  readonly ledgerweb_wpkhSlip77Descriptor: (a: number) => any;
  readonly ledgerweb_sign: (a: number, b: number) => any;
  readonly ledgerweb_getReceiveAddressSingle: (a: number, b: number) => any;
  readonly searchLedgerDevice: () => any;
  readonly __wbg_publickey_free: (a: number, b: number) => void;
  readonly publickey_fromString: (a: number, b: number) => [number, number, number];
  readonly publickey_fromBytes: (a: number, b: number) => [number, number, number];
  readonly publickey_fromSecretKey: (a: number) => number;
  readonly publickey_toBytes: (a: number) => [number, number];
  readonly publickey_isCompressed: (a: number) => number;
  readonly publickey_toXOnlyPublicKey: (a: number) => number;
  readonly publickey_toString: (a: number) => [number, number];
  readonly __wbg_secretkey_free: (a: number, b: number) => void;
  readonly secretkey_fromBytes: (a: number, b: number) => [number, number, number];
  readonly secretkey_fromWif: (a: number, b: number) => [number, number, number];
  readonly secretkey_to_bytes: (a: number) => [number, number];
  readonly secretkey_sign: (a: number, b: number) => [number, number, number];
  readonly __wbg_signer_free: (a: number, b: number) => void;
  readonly signer_new: (a: number, b: number) => [number, number, number];
  readonly signer_sign: (a: number, b: number) => [number, number, number];
  readonly signer_signMessage: (a: number, b: number, c: number) => [number, number, number, number];
  readonly signer_wpkhSlip77Descriptor: (a: number) => [number, number, number];
  readonly signer_getMasterXpub: (a: number) => [number, number, number];
  readonly signer_keyoriginXpub: (a: number, b: number) => [number, number, number, number];
  readonly signer_fingerprint: (a: number) => [number, number, number, number];
  readonly signer_mnemonic: (a: number) => number;
  readonly signer_derive_bip85_mnemonic: (a: number, b: number, c: number) => [number, number, number];
  readonly __wbg_wolletbuilder_free: (a: number, b: number) => void;
  readonly wolletbuilder_new: (a: number, b: number) => number;
  readonly wolletbuilder_withMergeThreshold: (a: number, b: number) => number;
  readonly wolletbuilder_utxoOnly: (a: number, b: number) => number;
  readonly wolletbuilder_withExperimentalStore: (a: number, b: any) => number;
  readonly wolletbuilder_withTxsStore: (a: number, b: any) => number;
  readonly wolletbuilder_setEncryptionTxsStore: (a: number, b: number) => number;
  readonly wolletbuilder_build: (a: number) => [number, number, number];
  readonly __wbg_cmr_free: (a: number, b: number) => void;
  readonly cmr_fromBytes: (a: number, b: number) => [number, number, number];
  readonly cmr_fromString: (a: number, b: number) => [number, number, number];
  readonly cmr_toBytes: (a: number) => [number, number];
  readonly cmr_toString: (a: number) => [number, number];
  readonly preparepayresponse_fee: (a: number) => [number, bigint];
  readonly valueblindingfactor_zero: () => number;
  readonly __wbg_assetid_free: (a: number, b: number) => void;
  readonly __wbg_assetids_free: (a: number, b: number) => void;
  readonly assetid_fromString: (a: number, b: number) => [number, number, number];
  readonly assetid_fromBytes: (a: number, b: number) => [number, number, number];
  readonly assetid_toBytes: (a: number) => [number, number];
  readonly assetid_toString: (a: number) => [number, number];
  readonly generateAssetEntropy: (a: number, b: number) => [number, number, number];
  readonly assetIdFromIssuance: (a: number, b: number) => number;
  readonly reissuanceTokenFromIssuance: (a: number, b: number, c: number) => number;
  readonly assetids_empty: () => [number, number, number];
  readonly assetids_toString: (a: number) => [number, number];
  readonly __wbg_outpoint_free: (a: number, b: number) => void;
  readonly outpoint_new: (a: number, b: number) => [number, number, number];
  readonly outpoint_fromParts: (a: number, b: number) => number;
  readonly outpoint_txid: (a: number) => number;
  readonly outpoint_vout: (a: number) => number;
  readonly __wbg_script_free: (a: number, b: number) => void;
  readonly script_new: (a: number, b: number) => [number, number, number];
  readonly script_empty: () => number;
  readonly script_bytes: (a: number) => [number, number];
  readonly script_jet_sha256_hex: (a: number) => [number, number];
  readonly script_asm: (a: number) => [number, number];
  readonly script_newOpReturn: (a: number, b: number) => number;
  readonly script_isProvablyUnspendable: (a: number) => number;
  readonly script_isProvablySegwit: (a: number, b: number) => number;
  readonly script_toString: (a: number) => [number, number];
  readonly __wbg_transaction_free: (a: number, b: number) => void;
  readonly transaction_new: (a: number, b: number) => [number, number, number];
  readonly transaction_fromString: (a: number, b: number) => [number, number, number];
  readonly transaction_fromBytes: (a: number, b: number) => [number, number, number];
  readonly transaction_txid: (a: number) => number;
  readonly transaction_bytes: (a: number) => [number, number];
  readonly transaction_fee: (a: number, b: number) => bigint;
  readonly transaction_toString: (a: number) => [number, number];
  readonly transaction_inputs: (a: number) => [number, number];
  readonly transaction_outputs: (a: number) => [number, number];
  readonly __wbg_txid_free: (a: number, b: number) => void;
  readonly txid_new: (a: number, b: number) => [number, number, number];
  readonly txid_toString: (a: number) => [number, number];
  readonly __wbg_transactioneditor_free: (a: number, b: number) => void;
  readonly transactioneditor_fromTransaction: (a: number) => number;
  readonly transactioneditor_setInputWitness: (a: number, b: number, c: number) => [number, number, number];
  readonly transactioneditor_build: (a: number) => number;
  readonly __wbg_txin_free: (a: number, b: number) => void;
  readonly txin_outpoint: (a: number) => number;
  readonly txin_witness: (a: number) => number;
  readonly txin_sequence: (a: number) => number;
  readonly __wbg_txinwitness_free: (a: number, b: number) => void;
  readonly txinwitness_empty: () => number;
  readonly txinwitness_fromScriptWitness: (a: number, b: number) => [number, number, number];
  readonly txinwitness_script_witness: (a: number) => [number, number];
  readonly txinwitness_pegin_witness: (a: number) => [number, number];
  readonly txinwitness_isEmpty: (a: number) => number;
  readonly __wbg_txinwitnessbuilder_free: (a: number, b: number) => void;
  readonly txinwitnessbuilder_scriptWitness: (a: number, b: number, c: number) => [number, number, number];
  readonly txinwitnessbuilder_peginWitness: (a: number, b: number, c: number) => [number, number, number];
  readonly txinwitnessbuilder_amountRangeproof: (a: number, b: number, c: number) => [number, number, number];
  readonly txinwitnessbuilder_inflationKeysRangeproof: (a: number, b: number, c: number) => [number, number, number];
  readonly txinwitnessbuilder_build: (a: number) => number;
  readonly __wbg_txout_free: (a: number, b: number) => void;
  readonly txout_fromExplicit: (a: number, b: number, c: bigint) => number;
  readonly txout_scriptPubkey: (a: number) => number;
  readonly txout_isFee: (a: number) => number;
  readonly txout_isPartiallyBlinded: (a: number) => number;
  readonly txout_asset: (a: number) => number;
  readonly txout_value: (a: number) => [number, bigint];
  readonly txout_unconfidentialAddress: (a: number, b: number) => number;
  readonly txout_unblind: (a: number, b: number) => [number, number, number];
  readonly __wbg_mnemonic_free: (a: number, b: number) => void;
  readonly mnemonic_new: (a: number, b: number) => [number, number, number];
  readonly mnemonic_toString: (a: number) => [number, number];
  readonly mnemonic_fromEntropy: (a: number, b: number) => [number, number, number];
  readonly mnemonic_fromRandom: (a: number) => [number, number, number];
  readonly __wbg_psetdetails_free: (a: number, b: number) => void;
  readonly __wbg_psetbalance_free: (a: number, b: number) => void;
  readonly __wbg_psetsignatures_free: (a: number, b: number) => void;
  readonly __wbg_issuance_free: (a: number, b: number) => void;
  readonly __wbg_recipient_free: (a: number, b: number) => void;
  readonly psetdetails_balance: (a: number) => number;
  readonly psetdetails_signatures: (a: number) => [number, number];
  readonly psetdetails_fingerprintsMissing: (a: number) => [number, number];
  readonly psetdetails_fingerprintsHas: (a: number) => [number, number];
  readonly psetdetails_inputsIssuances: (a: number) => [number, number];
  readonly psetbalance_fee: (a: number) => bigint;
  readonly psetbalance_balances: (a: number) => number;
  readonly psetbalance_recipients: (a: number) => [number, number];
  readonly psetsignatures_hasSignature: (a: number) => any;
  readonly psetsignatures_missingSignature: (a: number) => any;
  readonly issuance_asset: (a: number) => number;
  readonly issuance_token: (a: number) => number;
  readonly issuance_prevVout: (a: number) => number;
  readonly issuance_prevTxid: (a: number) => number;
  readonly issuance_isIssuance: (a: number) => number;
  readonly issuance_isReissuance: (a: number) => number;
  readonly recipient_asset: (a: number) => number;
  readonly recipient_value: (a: number) => [number, bigint];
  readonly recipient_address: (a: number) => number;
  readonly recipient_vout: (a: number) => number;
  readonly __wbg_registry_free: (a: number, b: number) => void;
  readonly __wbg_registrydata_free: (a: number, b: number) => void;
  readonly __wbg_assetmeta_free: (a: number, b: number) => void;
  readonly __wbg_registrypost_free: (a: number, b: number) => void;
  readonly assetmeta_contract: (a: number) => number;
  readonly assetmeta_tx: (a: number) => number;
  readonly registrypost_new: (a: number, b: number) => number;
  readonly registrypost_toString: (a: number) => [number, number];
  readonly registry_new: (a: number, b: number, c: number) => any;
  readonly registry_defaultForNetwork: (a: number, b: number) => any;
  readonly registry_defaultHardcodedForNetwork: (a: number) => [number, number, number];
  readonly registry_fetchWithTx: (a: number, b: number, c: number) => any;
  readonly registry_post: (a: number, b: number) => any;
  readonly registry_get: (a: number, b: number) => number;
  readonly registry_getAssetOfToken: (a: number, b: number) => number;
  readonly registry_addContracts: (a: number, b: number) => [number, number, number];
  readonly registrydata_precision: (a: number) => number;
  readonly registrydata_ticker: (a: number) => [number, number];
  readonly registrydata_name: (a: number) => [number, number];
  readonly registrydata_domain: (a: number) => [number, number];
  readonly __wbg_txdetails_free: (a: number, b: number) => void;
  readonly txdetails_tx: (a: number) => number;
  readonly txdetails_txid: (a: number) => number;
  readonly txdetails_height: (a: number) => number;
  readonly txdetails_timestamp: (a: number) => number;
  readonly txdetails_txType: (a: number) => [number, number];
  readonly txdetails_balance: (a: number) => number;
  readonly txdetails_feesAsset: (a: number, b: number) => bigint;
  readonly txdetails_unblindedUrl: (a: number, b: number, c: number) => [number, number];
  readonly txdetails_inputs: (a: number) => [number, number];
  readonly txdetails_outputs: (a: number) => [number, number];
  readonly __wbg_txoutdetails_free: (a: number, b: number) => void;
  readonly txoutdetails_outpoint: (a: number) => number;
  readonly txoutdetails_script_pubkey: (a: number) => number;
  readonly txoutdetails_height: (a: number) => number;
  readonly txoutdetails_address: (a: number) => number;
  readonly txoutdetails_unblinded: (a: number) => number;
  readonly txoutdetails_is_explicit: (a: number) => number;
  readonly txoutdetails_is_spent: (a: number) => number;
  readonly __wbg_txsopt_free: (a: number, b: number) => void;
  readonly txsopt_default: () => number;
  readonly txsopt_withPagination: (a: number, b: number) => number;
  readonly __wbg_txopt_free: (a: number, b: number) => void;
  readonly txopt_default: () => number;
  readonly wollet_txs: (a: number, b: number) => [number, number, number, number];
  readonly wollet_numTxs: (a: number) => [number, number, number];
  readonly wollet_txDetails: (a: number, b: number, c: number) => [number, number, number];
  readonly transaction_toBytes: (a: number) => [number, number];
  readonly txinwitnessbuilder_new: () => number;
  readonly assetid_new: (a: number, b: number) => [number, number, number];
  readonly rust_0_7_malloc: (a: number) => number;
  readonly rust_0_7_calloc: (a: number, b: number) => number;
  readonly rust_0_7_free: (a: number) => void;
  readonly rustsecp256k1_v0_12_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_12_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_12_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_12_default_error_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1zkp_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1zkp_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_10_0_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_10_0_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_10_0_default_error_callback_fn: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly closure490_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure3027_externref_shim: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__hd5b0d606127cac00: (a: number, b: number) => void;
  readonly closure3867_externref_shim: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h34dad98c3d3cf6df: (a: number, b: number) => void;
  readonly closure4741_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
