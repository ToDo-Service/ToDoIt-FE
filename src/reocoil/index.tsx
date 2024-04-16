import { atom } from "recoil";
import { v1 } from "uuid";
import type { RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

//왜이러노

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

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "deafult",
  storage: sessionStorage,
});

export const jwtToken = atom<any>({
  key: `JWT${v1}`,
  default: {
    token: "",
  },
});

export const Modal = atom<any>({
  key: `Modal${v1}`,
  default: {
    id: 1,
    method: "",
    toggle: false,
  },
});

export const UpdateData = atom<any>({
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

export const CheckProject = atom<any>({
  key: `CPoject${v1}`,
  default: {
    id: 0,
    date: "",
  },
});

export const GlobalModal = atom<any>({
  key: `GModal${v1}`,
  default: {
    toggle: null,
  },
});

export const SidebarLayout = atom<any>({
  key: `SModal${v1}`,
  default: {
    sidebartoggle: false,
    HeaderAnimaion: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const NextPlanCalender = atom<{
  id: number;
  date: string;
}>({
  key: `Calender${v1}`,
  default: {
    id: 0,
    date: "",
  },
});

export const NextPlanCalenderScrollPosition = atom<{
  position: number | undefined;
}>({
  key: `ScrollPosition${v1}`,
  default: {
    position: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
