import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrap = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  & + & {
    border-top: 1px solid;
  }
`;

const Column = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const Username = styled.strong`
  font-weight: 700;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 1.8rem;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
`;

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Wrap>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrap>
  );
}
