import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrap = styled.main`
  display: grid;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  border-left: 1px solid #864622;
  border-right: 1px solid #864622;
  position: relative;
`;

export default function Home() {
  return (
    <Wrap>
      <PostTweetForm />
      <Timeline />
    </Wrap>
  );
}
