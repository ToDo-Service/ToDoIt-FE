import { atom } from "recoil";

export const kanbanListState = atom<any[]>({
  key: "kanbanState",
  default: [],
});
