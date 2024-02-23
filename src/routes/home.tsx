import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";

const Wrap = styled.div``;

export default function Home() {
  return (
    <Wrap>
      <PostTweetForm />
    </Wrap>
  );
}
