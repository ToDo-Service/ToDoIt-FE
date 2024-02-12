import { atom } from "recoil";

export const kanbanListState = atom<any[]>({
  key: "kanbanState",
  default: [],
});

export const jwtToken = atom<any>({
  key: "JWT",
  default: {
    token: "",
  },
});
