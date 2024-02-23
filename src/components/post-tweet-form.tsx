import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrap = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: #f1ede4;
`;

const TopHeader = styled.h2`
  padding: 20px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 3rem;
  border-bottom: 1px solid #c3c3c3;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #864622;
  background: none;
`;

const TextArea = styled.textarea`
  padding: 10px 20px;
  border: none;
  /* border-bottom: 1px solid #c3c3c3; */
  height: 40px;
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
    height: 20vh;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 8px 0;
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 500) return;
    try {
      setLoading(true);
      // 데이터 문서 안에 보여질 필드들
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        // Photo: user.photoURL,
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      // 만약 파일 첨부가 되었다면
      if (file) {
        // 저장 경로 지정 (Storage)
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrap>
      <TopHeader>home</TopHeader>
      <Form onSubmit={onSubmit}>
        <TextArea
          required
          rows={5}
          maxLength={500}
          onChange={onChange}
          value={tweet}
          placeholder="나의 사랑스러운 반려동물을 자랑해 보세요!"
        />
        <BtnWrap>
          <AttachFileButton htmlFor="file">
            {file ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
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
          <SubmitBtn type="submit" value={isLoading ? "✔" : "posting"} />
        </BtnWrap>
      </Form>
    </Wrap>
  );
}
