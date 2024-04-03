import MyAnaylyticsIcon from "@/atoms/ANAYLYTICS/MyAnaylyticsIcon";
import styled from "styled-components";

const MyAnaylyticsBox = styled.section`
  & span {
    margin-left: 16px;
  }
`;

const MyAnaylytics = () => {
  return (
    <MyAnaylyticsBox>
      <span>내 평균</span>
    </MyAnaylyticsBox>
  );
};

export default MyAnaylytics;
