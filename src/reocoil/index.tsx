import { atom } from "recoil";

export const jwtToken = atom<any>({
  key: "JWT",
  default: {
    token: "",
  },
});
