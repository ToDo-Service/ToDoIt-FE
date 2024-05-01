import FollowAnaylyticsIcon from "@/atoms/ANAYLYTICS/FollowAnaylyticsIcon";
import styled from "styled-components";

const FollowAnaylyticsBox = styled.section`
  & span {
    margin-left: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-family: "PretendardVariable";
    font-weight: 350;
  }
`;

const FollowAnaylytics = () => {
  return (
    <FollowAnaylyticsBox>
      <span>RANK</span>
    </FollowAnaylyticsBox>
  );
};

export default FollowAnaylytics;
