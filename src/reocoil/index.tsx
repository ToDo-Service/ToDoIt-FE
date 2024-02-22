import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const kanbanListState = atom<any[]>({
  key: "kanbanState",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

export const jwtToken = atom<any>({
  key: "JWT",
  default: {
    token: "",
  },
  // effects_UNSTABLE: [persistAtom],
});
