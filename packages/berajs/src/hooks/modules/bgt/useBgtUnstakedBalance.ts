import useSWR from "swr";
import { formatEther } from "viem";
import { usePublicClient } from "wagmi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { bgtTokenAddress } from "@bera/config";
import { BGT_ABI } from "~/abi";

// TODO: REFACTOR ON REDEPLOY
export const useBgtUnstakedBalance = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<string | undefined> => {
  const { account, config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const QUERY_KEY = ["bgtUnstakedBalance", account];

  const swrResponse = useSWR<string | undefined>(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient) return undefined;

      const bgtBalance = await publicClient.readContract({
        address: bgtTokenAddress,
        abi: BGT_ABI,
        functionName: "unboostedBalanceOf",
        args: [account],
      });
      return formatEther(bgtBalance as bigint);
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse.mutate(),
  };
};
