import { DraftFunction } from "use-immer";
import { UserState } from "../state/user";

export const accountAddress = (endpoint: string, headers: Headers) =>
  (setPeerId: (draft: DraftFunction<UserState>) => void) => {
    return fetch(`${endpoint}/api/v2/account/address`, {
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.info("Fetched User PeerId", data.hoprAddress);
        setPeerId((draft) => {
          draft.myPeerId = data.hoprAddress;
          return draft;
        });
      })
      .catch((err) => {
        console.error(err);
        setPeerId((draft) => {
          draft.myPeerId = undefined;
          draft.error = err;
          return draft;
        });
      });
  };