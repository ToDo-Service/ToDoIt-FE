import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

interface Props {
  size: string;
  show: boolean | null;
  onclick: () => void;
}

const BurgerIcon = ({ size, show, onclick }: Props) => {
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
