import { MockSpectralClient } from '../src';

async function main() {
  const client = new MockSpectralClient();
  const vaults = await client.listVaults();

  console.log('Available Vaults:');
  vaults.forEach((v) => {
    console.log(`- ${v.config.name} (${v.id})`);
    console.log(`  Manager: ${v.config.manager}`);
    console.log(`  Total Shares: ${v.formattedTotalShares}`);
  });
}

main().catch(console.error);
