import { useQuery, gql } from "@apollo/client";

interface User {
  id: number;
  name: string;
  jwttoken: string;
  image: string;
}

const GET_USER = gql`
  query Users {
    users {
      id
      name
      jwttoken
      image
    }
  }
`;

const Login = () => {
  return (
    <>
      <button>kakao</button>
      {/* <a href="https://laoh.site/oauth2/authorization/kakao">구글 로그인</a> */}
      <br />
      <button>google</button>
    </>
  );
};

export default Login;
