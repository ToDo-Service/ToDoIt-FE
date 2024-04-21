import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

interface Props {
  size: string;
  show: boolean;
  onclick: () => void;
}

const BurgerIcon = ({ size, onclick }: Props) => {
  return (
    <Icon.LayoutSidebar
      size={size}
      role="button"
      onClick={onclick}
      style={{
        zIndex: "99",
        cursor: "pointer",
      }}
    />
  );
};

export default BurgerIcon;
