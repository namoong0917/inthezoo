import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-bottom: 1.5px solid #c3c3c3;
  border-radius: 20px 20px 0 0;
  height: 70px;
  color: #333;
  resize: none;
  transition: 0.5s;
  &::placeholder {
    color: #888;
    font-size: 1.4rem;
    font-weight: 600;
  }
  &:focus {
    background: #fffaf5;
    outline: none;
    border-bottom: 1.5px solid #864622;
    height: 200px;
  }
`;

const AttachFileButton = styled.label`
  color: #864622;
  border: 1.5px solid #864622;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  &:hover {
    opacity: 0.7;
  }
  .imgBtn {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 22px;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  text-transform: uppercase;
  width: 100px;
  /* background: #864622; */
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  background: none;
  color: #864622;
  border: 1.5px solid #864622;
  transition: all.2s;
  cursor: pointer;
  &:hover,
  &:active {
    background: #864622;
    color: #fff;
    transition: all.2s;
    opacity: 0.9;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
        maxLength={500}
        onChange={onChange}
        value={tweet}
        placeholder="나의 사랑스러운 반려동물을 자랑해 보세요!"
      />
      <BtnWrap>
        <AttachFileButton htmlFor="file">
          {file ? (
            "Photo added ✅"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 imgBtn"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          )}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        {/* label의 htmlFor 값, input의 id 값
			둘이 같으면 label을 눌렀을 때 file 버튼을 클릭하는 것과 같게 동작한다. */}
        <SubmitBtn type="submit" value={isLoading ? "posting..." : "posting"} />
      </BtnWrap>
    </Form>
  );
}
