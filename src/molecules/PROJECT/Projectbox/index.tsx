import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { mutate } from "swr";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";

const ProjectboxMainbox = styled.div<{
  color: string;
  bgColor: string | undefined;
}>`
  width: 54.8611vw;
  height: 5.3711vh;
  max-width: 790px;
  max-height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  padding-right: 25px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(12, 0, 24, 0.1);
  font-family: "PretendardVariable";
  font-weight: 250;
`;
const ExitBtn = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

interface ProjectData {
  title: string;
  description: string;
  color: string;
  id: number;
}

const ColorData = [
  {
    color: "#EA98AE",
    backgroundColor: "rgba(234, 152, 174, 0.15)",
  },
  {
    color: "#FBD580",
    backgroundColor: "rgba(251, 213, 128, 0.15)",
  },
  {
    color: "#9ECAFB",
    backgroundColor: "rgba(158, 202, 251, 0.15)",
  },
  {
    color: "#CCBAF8",
    backgroundColor: "rgba(204, 186, 248, 0.15)",
  },
  {
    color: "#9F9EA4",
    backgroundColor: "rgba(159, 158, 164, 0.15)",
  },
];

const Projectbox = ({ title, description, color, id }: ProjectData) => {
  const SelectedColor = ColorData.find((item) => item.color === color);
  const JwtToken = useRecoilValue(jwtToken);

  const onDelete = () => {
    axios
      .delete(`https://laoh.site/api/project/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${JwtToken}` },
      })
      .then(() => mutate("https://laoh.site/api/project"))
      .catch((err) => console.log(err));
  };

  return (
    <ProjectboxMainbox color={color} bgColor={SelectedColor?.backgroundColor}>
      <Link
        href={`/main/project/${id}`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <span>{title}</span>
      </Link>
      <ExitBtn src="/Icon/Modal/ModalExit.png" alt="/" onClick={onDelete} />
    </ProjectboxMainbox>
  );
};

export default Projectbox;
