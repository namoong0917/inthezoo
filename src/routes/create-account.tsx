import { useState } from "react";
import { styled } from "styled-components";
import Logo from "../assets/img/logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;

  @media (max-width: 1016px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const LeftImgWrap = styled.h1`
  width: 50%;
  @media (max-width: 1016px) {
    width: 50%;
    margin-bottom: 30px;
  }
`;
const LogoImg = styled.img`
  width: 100%;
`;
const LightWrap = styled.div`
  width: 30%;
  @media (max-width: 1016px) {
    width: 90%;
    margin-bottom: 100px;
  }
`;

const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Title = styled.h2`
  font-size: 1.6rem;
  color: #864622;
  text-align: center;
`;
const Input = styled.input`
  margin: 5px 0;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    background: #cf8e56;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email == "" || password === "") return;
    try {
      setLoading(true);
      // create an account
      // set the name of the user.
      // redirect to the home page
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      // setError
      // credentials 성공하지 못했을경우 일로 / 해당 이메일로 이미 계정이 있거나 비밀번호가 유효하지 않은 경우
    } finally {
      setLoading(false);
    }

    // console.log(name, email, password);
  };

  return (
    <Wrapper>
      <LeftImgWrap>
        <LogoImg src={Logo} alt="in the zoo" />
      </LeftImgWrap>
      <LightWrap>
        <Title>Let’s Join ‘in the zoo’</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
      </LightWrap>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
