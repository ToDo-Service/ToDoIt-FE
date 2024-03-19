import { atom } from "recoil";

export const jwtToken = atom<any>({
  key: "JWT",
  default: {
    token: "",
  },
});

export const Modal = atom<any>({
  key: "Modal",
  default: {
    id: 0,
    method: "",
    toggle: false,
  },
});

export const UpdateData = atom<any>({
  key: "UData",
  default: {
    id: 0,
    title: "",
    content: "",
    end_date: "",
    status: "",
    priority: "",
    project: null,
  },
});
