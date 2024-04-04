import { atom } from "recoil";
import { v1 } from "uuid";
import type { RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

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

const { persistAtom } = recoilPersist();

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

export const CheckProject: RecoilState<any> = atom<any>({
  key: `CPoject${v1}`,
  default: {
    id: 0,
    date: "",
  },
});

export const GlobalModal: RecoilState<any> = atom<any>({
  key: `GModal${v1}`,
  default: {
    toggle: null,
  },
});

export const SidebarLayout: RecoilState<any> = atom<any>({
  key: `SModal${v1}`,
  default: {
    sidebartoggle: null,
    HeaderAnimaion: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const NextPlanCalender: RecoilState<any> = atom<{
  id: number;
  date: string;
}>({
  key: `Calender${v1}`,
  default: {
    id: 0,
    date: "",
  },
});
