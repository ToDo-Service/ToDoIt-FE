import { ColorData } from "@/data/Color";

const FindColor = (color: string) => {
  let ReturnBgColor = ColorData.filter((item) => {
    return item.color === color && item.backgroundColor;
  });

  return ReturnBgColor;
};

export default FindColor;
