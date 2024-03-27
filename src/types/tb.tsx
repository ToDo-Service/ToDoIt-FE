export type Color = {
  id: number;
  text: string;
  color: string;
  backgroundColor: string;
};

export type ProejectProps = {
  id: number;
  category: string;
  color: string;
  description: string;
  end_date: string;
  title: string;
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type TodayData = {
  Data: object;
};

export type Header = {
  id: number;
  title: string;
  Icon: string;
  path: string;
};

export type ProejectT = {
  id: number;
  category: string;
  color: string;
  description: string;
  end_date: string;
  title: string;
};
