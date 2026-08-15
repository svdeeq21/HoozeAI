import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { askHooze } from "./hooze-chat.server";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
});

export const hoozeDemoReply = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    try {
      return { text: await askHooze(data.messages) };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "failed";
      return {
        text:
          msg === "busy"
            ? "Sorry, the demo line is a bit busy right now — send that again in a moment."
            : "Something dropped on my end. Could you send that again?",
      };
    }
  });
