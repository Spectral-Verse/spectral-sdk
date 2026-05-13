import { MockSpectraClient, MOCK_VAULT_ID, MOCK_USER } from '../src';

async function main() {
  const client = new MockSpectraClient();
  const position = await client.getUserPosition(MOCK_VAULT_ID, MOCK_USER);

  console.log(`Position for ${MOCK_USER} in ${MOCK_VAULT_ID}:`);
  console.log(`- Shares: ${position.formattedShares}`);
  console.log(`- Share Percentage: ${position.sharePercentage}%`);
}

main().catch(console.error);
