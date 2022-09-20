import type { Settings } from "../state";

export const getUrlParams = (loc: Location): Partial<Settings> => {
    const params = new URLSearchParams(loc.search);
    return {
      apiEndpoint: params.get("apiEndpoint") || undefined,
      apiToken: params.get("apiToken") || undefined,
    };
  };