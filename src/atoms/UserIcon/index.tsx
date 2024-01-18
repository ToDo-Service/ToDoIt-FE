import Image from "next/image";

import styled from "styled-components";

const U_Icon = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-left: 10%;
`;

export const UserIcon = ({ Img }: any) => {
  console.log(Img);

  return <U_Icon src={`${Img}`} alt="유저 아이콘" />;
};
