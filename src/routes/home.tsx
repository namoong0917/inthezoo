import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrap = styled.div`
  display: grid;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

export default function Home() {
  return (
    <Wrap>
      <PostTweetForm />
      <Timeline />
    </Wrap>
  );
}
