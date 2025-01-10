import { z } from "zod";
import { Action } from "../types/action";
import { SolanaAgentKit } from "../agent";
import { tradeBanger } from "../tools";

const tradeBangerAction: Action = {
  name: "TRADE_BANGER_ACTION",
  similes: [
    "buy bangers",
    "sell bangers",
    "trade bangers",
    "buy tweets",
    "sell tweets",
  ],
  description: `Trade tweets tokens on Banger.
  You have to provide the tweet id and the type of trade (buy or sell). Provide amountInSOL for buying and amountInTokens for selling.
  The slippage is optional and defaults to 5%.
  `,
  examples: [
    [
      {
        input: {
          type: "buy",
          tweetId: "20",
          amountInSOL: 0.01,
        },
        output: {
          status: "success",
          message: "Succesfully traded Bangers",
        },
        explanation: "Bought 0.01 SOL for Tweet ID, 20",
      },
    ],
    [
      {
        input: {
          type: "sell",
          tweetId: "20",
          amountInTokens: 10000,
          slippageBps: 10,
        },
        output: {
          status: "success",
          message: "Succesfully traded Bangers",
        },
        explanation: "Sold 10000 tokens for Tweet ID, 20",
      },
    ]
  ],
  schema: z.object({
    type: z.enum(["buy", "sell"]),
    amountInSOL: z.number().optional().default(0),
    amountInTokens: z.number().optional().default(0),
    slippage: z.number().optional().default(5),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    const result = await tradeBanger(
      agent,
      input.type,
      input.tweetId,
      input.amountInTokens,
      input.amountInSOL,
      input.slippage,
    );
    console.log(result);
    return {
      status: "success",
      message: "Succesfully traded Bangers",
    };
  },
};

export default tradeBangerAction;