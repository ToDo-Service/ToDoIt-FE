import styled from "styled-components";

export const LoadingSpinner = () => {
  return (
    <>
      <Spinner>
        <div className="spinner" />
      </Spinner>
    </>
  );
};

const Spinner = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & .spinner {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 6px solid transparent;
    border-top-color: #f1ebf9;
    border-bottom-color: #f1ebf9;
    animation: spinner 0.8s ease infinite;
  }
`;
