import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaTradeBangerTool extends Tool {
  name = "solana_trade_banger";
  description = `Trades tweet tokens on Banger.
  Inputs (input is a JSON string):
  type: string, the type of trade, "buy" or "sell" (required)
  tweetId: string, the tweet id to trade (required)
  amountInTokens: number, the amount of tokens to trade (optional)
  amountInSOL: number, the amount of SOL to trade (optional)
  slippageBps: number, the slippage in basis points (optional, defaults to 5)
  `;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);
      const result = await this.solanaKit.tradeBanger(
        parsedInput.type,
        parsedInput.tweetId,
        parsedInput.amountInTokens,
        parsedInput.amountInSOL,
        parsedInput.slippageBps,
      );
      return JSON.stringify({
        status: "success",
        message: "Succesfully traded Bangers",
        data: result,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}