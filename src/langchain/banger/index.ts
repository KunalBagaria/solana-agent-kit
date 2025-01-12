import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaTradeBangerTool extends Tool {
  name = "solana_trade_banger";
  description = `This tool can be used to trade tweet tokens on Banger (banger.xyz).

  Inputs ( input is a JSON string ):
  type: string, eg "buy" or "sell" (required)
  tweetId: string, eg "5", "10", "20" (required)
  amount: number, eg 5, 10, 20 (optional)
  slippageBps: number, eg 5, 10, 20 (optional)`

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      console.log("input", input);
      const parsedInput = JSON.parse(input);
      const result = await this.solanaKit.tradeBanger(
        parsedInput.type,
        parsedInput.tweetId,
        parsedInput.amount,
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