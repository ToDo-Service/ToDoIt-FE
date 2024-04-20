import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { mutate } from "swr";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, jwtToken } from "@/reocoil";
import { ColorData } from "@/data/Color";

interface ProjectData {
  title: string;
  description: string;
  color: string;
  id: number;
}

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

const SelectPickRound = styled.p`
  width: 3px;
  height: 3px;
  background-color: black;
  border-radius: 50%;
`;

const SelectPickBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 15px;
  height: 3px;
  margin: 0;
  padding: 0;
  z-index: 1;
  cursor: pointer;
`;

const Projectbox = ({ title, description, color, id }: ProjectData) => {
  const SelectedColor = ColorData.find((item) => item.color === color);
  const JwtToken = useRecoilValue(jwtToken);
  const modal = useRecoilValue(Modal);
  const setModal = useSetRecoilState(Modal);

  console.log(modal);

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

      <SelectPickBox onClick={() => setModal({ toggle: !modal.toggle })}>
        <SelectPickRound />
        <SelectPickRound />
        <SelectPickRound />
      </SelectPickBox>
      {modal.toggle && <div>팝업창</div>}
    </ProjectboxMainbox>
  );
};

export default Projectbox;
