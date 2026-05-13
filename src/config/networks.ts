export enum NetworkNames {
  PUBLIC = 'Public Global Stellar Network ; September 2015',
  TESTNET = 'Test SDF Network ; September 2015',
  FUTURENET = 'Test SDF Future Network ; October 2022',
}

export interface NetworkConfig {
  rpcUrl: string;
  networkPassphrase: string;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    rpcUrl: 'https://soroban-rpc.mainnet.stellar.org',
    networkPassphrase: NetworkNames.PUBLIC,
  },
  testnet: {
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: NetworkNames.TESTNET,
  },
  futurenet: {
    rpcUrl: 'https://rpc-futurenet.stellar.org',
    networkPassphrase: NetworkNames.FUTURENET,
  },
};
