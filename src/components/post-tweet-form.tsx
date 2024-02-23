import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: 2px solid #866e60;
  border-radius: 20px;
  color: #000;
  width: 100%;
  resize: none;
  transition: 0.5s;
  &::placeholder {
    color: #666;
    font-size: 1.4rem;
    font-weight: 600;
  }
  &:focus {
    background: #fffaf5;
    outline: none;
    border: 2px solid #864622;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0;
  color: #864622;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #864622;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-weight: 700;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background: #864622;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  return (
    <Form>
      <TextArea
        rows={5}
        maxLength={300}
        onChange={onChange}
        value={tweet}
        placeholder="나의 사랑스러운 반려동물을 자랑해 보세요!"
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✅" : "ADD photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      {/* label의 htmlFor 값, input의 id 값
			둘이 같으면 label을 눌렀을 때 file 버튼을 클릭하는 것과 같게 동작한다. */}
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
