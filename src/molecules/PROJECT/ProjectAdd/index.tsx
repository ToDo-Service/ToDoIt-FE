import styled from "styled-components";
import { media } from "@/styles/media";

const ProjectboxAddMainbox = styled("div")<{
  width: string;
  maxwidth: string;
  minwidth: string;
}>`
  width: ${(props) => props.width};
  height: 5.3711vh;
  max-width: ${(props) => props.maxwidth};
  min-width: ${(props) => props.minwidth};
  max-height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
  background-color: rgba(12, 0, 24, 0.04);
  cursor: pointer;
  font-family: "PretendardVariable";
  font-weight: 300;

  & span {
    color: rgba(37, 37, 48, 0.6);
    font-size: 15px;
  }

  ${media.phone`
  width:270px;
  min-width: 270px;
  
  `}
`;

interface Props {
  comment: string;
  width: string;
}

const ProjectAdd = (props: any) => {
  return (
    <ProjectboxAddMainbox
      width={props.width}
      onClick={props.onclick}
      maxwidth={props.maxwidth}
      minwidth={props.minwidth}
    >
      <span>{props.comment}</span>
    </ProjectboxAddMainbox>
  );
};

export default ProjectAdd;
