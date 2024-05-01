import MyAnaylyticsIcon from "@/atoms/ANAYLYTICS/MyAnaylyticsIcon";
import styled from "styled-components";

const MyAnaylyticsBox = styled.section`
  & span {
    margin-left: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-family: "PretendardVariable";
    font-weight: 350;
  }
`;

const MyAnaylytics = () => {
  return (
    <MyAnaylyticsBox>
      <span>내 통계</span>
    </MyAnaylyticsBox>
  );
};

export default MyAnaylytics;
