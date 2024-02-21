import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 100%;
  color: #000;
  background: #fff;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const GitLogo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const Navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      // await signInWithRedirect(auth, provider); // 다이렉트
      await signInWithPopup(auth, provider); // 팝업창
      Navigate("/"); // 로그인이 잘 되었으면 사용자를 Home 화면으로 리디렉션
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <GitLogo src="/img/github-logo.svg" />
      Continue with Github
    </Button>
  );
}
