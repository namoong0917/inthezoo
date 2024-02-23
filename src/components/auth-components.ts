import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;

  @media (max-width: 1016px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const LeftImgWrap = styled.h1`
  width: 50%;
  @media (max-width: 1016px) {
    width: 50%;
    margin-bottom: 30px;
  }
`;
export const Logo = styled.img``;
export const LightWrap = styled.div`
  width: 30%;
  @media (max-width: 1016px) {
    width: 90%;
    margin-bottom: 100px;
  }
`;

export const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Title = styled.h2`
  color: #864622;
  text-align: center;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &:nth-child(2n) {
    margin: 5px 0;
  }
  &[type="submit"] {
    background: #cf8e56;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  font-size: 1rem;
`;

export const Switcher = styled.span`
  margin: 20px 0;
  display: block;
  text-align: center;
  a {
    color: #1d9bf0;
  }
`;
