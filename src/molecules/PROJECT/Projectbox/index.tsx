import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { mutate } from "swr";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, jwtToken } from "@/reocoil";
import { ColorData } from "@/data/Color";
import { useState } from "react";

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
  margin-bottom: 0;
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
  position: relative;

  &:hover .modal {
    display: flex;
  }

  &:active .modal {
    display: flex;
  }
`;

const SelectModal = styled.div<{ display: string }>`
  display: ${(props) => props.display};
  border: 1px solid rgba(12, 0, 24, 0.1);
  background-color: white;
  border-radius: 8px;
  width: 139px;
  height: 65px;
  position: absolute;
  left: 50px;
  top: -25px;

  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 14px;

  & div {
    cursor: pointer;
    color: #8f8f8f;
    font-size: 13px;
  }
  & div:hover {
    color: #4e4e4e;
    transition: 0.5s ease-in-out;
  }
`;

const Projectbox = ({ title, description, color, id }: ProjectData) => {
  const SelectedColor = ColorData.find((item) => item.color === color);
  const JwtToken = useRecoilValue(jwtToken);
  const [modal, setModal] = useState<boolean>(false);

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

      <SelectPickBox onClick={() => setModal(!modal)}>
        <SelectPickRound />
        <SelectPickRound />
        <SelectPickRound />

        <SelectModal className="modal" display={modal ? "flex" : "none"}>
          <div>프로젝트 수정</div>
          <div onClick={() => onDelete()}>프로젝트 삭제</div>
        </SelectModal>
      </SelectPickBox>
    </ProjectboxMainbox>
  );
};

export default Projectbox;
