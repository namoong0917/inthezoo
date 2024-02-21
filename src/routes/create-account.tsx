import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  LeftImgWrap,
  LightWrap,
  LogoImg,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

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
    setError("");
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
      // console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
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
          {error !== "" ? <Error>{error}</Error> : null}
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
        <Switcher>
          Already have an account? <Link to="/login">Login &rarr;</Link>
        </Switcher>
      </LightWrap>
    </Wrapper>
  );
}
