import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const candidatesRouter = createTRPCRouter({
  getCandidates: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.services.candidatesService.getCandidates();
    } catch (err) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching the candidates",
      });
    }
  }),
});
