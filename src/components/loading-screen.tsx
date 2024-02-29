import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <img src="img/loading.gif" alt="로딩중..." />
    </Wrapper>
  );
}
