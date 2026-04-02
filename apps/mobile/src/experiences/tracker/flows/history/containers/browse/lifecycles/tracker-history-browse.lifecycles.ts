import { useRefetchOnFocus } from "@/shared/hooks/use-refetch-on-focus";

export const useTrackerHistoryBrowseLifecycle = (refetch: () => void) => {
  useRefetchOnFocus(refetch);
};
