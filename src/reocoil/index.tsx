import { atom } from "recoil";
import { v1 } from "uuid";
import type { RecoilState } from "recoil";

interface ModalTp {
  id: number;
  method: string;
  toggle: boolean;
}

interface UpdateDataTp {
  id: number;
  title: string;
  content: string;
  end_date: string;
  status: string;
  priority: string;
  project: null;
}

interface jwtTp {
  token: string;
}

export const jwtToken: RecoilState<any> = atom<any>({
  key: `JWT${v1}`,
  default: {
    token: "",
  },
});

export const Modal: RecoilState<any> = atom<any>({
  key: `Modal${v1}`,
  default: {
    id: 0,
    method: "",
    toggle: false,
  },
});

export const UpdateData: RecoilState<any> = atom<any>({
  key: `UData${v1}`,
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
