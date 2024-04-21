import FollowAnaylyticsIcon from "@/atoms/ANAYLYTICS/FollowAnaylyticsIcon";
import styled from "styled-components";

const FollowAnaylyticsBox = styled.section`
  & span {
    margin-left: 2px;
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
