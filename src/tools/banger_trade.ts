import { SolanaAgentKit } from "../index";

/**
 * Get the balance of SOL or an SPL token for the agent's wallet
 * @param agent - SolanaAgentKit instance
 * @param type - "buy" or "sell"
 * @param tweetId - The tweet id to trade
 * @param amountInTokens - The amount of tokens to trade if type is sell (optional)
 * @param amountInSOL - The amount of SOL to trade if type is buy (optional)
 * @param slippageBps - The slippage in basis points (optional, defaults to 5)
 *
 * @returns Promise resolving to the result of the trade
 */
export async function tradeBanger(
  agent: SolanaAgentKit,
  type: string,
  tweetId: string,
  amountInTokens?: number,
  amountInSOL?: number,
  slippageBps?: number,
) {
  try {
    if (!amountInTokens && !amountInSOL) {
      throw new Error("Amount is required");
    }

    const response = await fetch(
      `https://banger.lol/api/v1/markets/${tweetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          tweetId,
          publicKey: agent.wallet_address.toBase58(),
          amountInTokens,
          amountInSOL,
          slippageBps,
        }),
      },
    );
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(`Error fetching Banger trade: ${error.message}`);
  }
}