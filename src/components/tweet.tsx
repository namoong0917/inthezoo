import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useRef, useState, MouseEvent } from "react";

const Wrap = styled.li`
  padding: 30px 20px;
  background: #f3f0ea;
  & + & {
    border-top: 1px solid #864622;
  }
`;

const Column = styled.div`
  width: 100%;
`;
const PotoColumn = styled.div`
  margin: 30px 0;
`;

const UtilWrap = styled.div`
  position: relative;
`;

const UtilBtn = styled.button`
  position: absolute;
  right: -22px;
  top: -8px;
  width: 50px;
  height: 38px;
  background: none;
  &:hover {
    opacity: 0.7;
  }
`;
const Util = styled.ul`
  position: absolute;
  top: 0px;
  right: 18px;
  width: 100px;
  background: #fff6df;
  border: 1px solid #864622;
  border-radius: 8px;
`;
const UtilList = styled.li`
  text-align: center;

  &:last-child:hover {
    transition: 0.2s;
  }
`;

const CopyButton = styled.button`
  width: 100%;
  height: 34px;
  background: none;

  &:hover {
    background: #333;
    border-radius: 8px;
    svg {
      stroke: #fff;
    }
  }

  svg {
    width: 22px;
    stroke: #864622;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  height: 34px;
  color: #333;
  background: none;
  font-weight: 700;
  font-size: 1.2rem;
  transition: 0.2s;

  &:hover {
    background: #d62a0c;
    border-radius: 8px 8px;
    color: #fff;
    opacity: 0.9;
    transition: 0.2s;
  }
`;

const Username = styled.strong`
  font-size: 1.5rem;
  color: #fff;
  background: #333;
  padding: 0 15px;
  line-height: 34px;
  border-radius: 20px;
  font-weight: 700;
  display: inline-block;
`;

const UserId = styled.p`
  display: inline-block;
  margin-left: 10px;
  font-weight: 700;
  color: #5b5b5b;
`;

const Payload = styled.p`
  color: #000;
  margin: 20px 0 0;
  font-size: 1.8rem;
`;

const Photo = styled.img`
  max-height: 500px;
  display: block;
  margin: 0 auto;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  const [utilVisible, setUtilVisible] = useState(false);
  const utilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (utilRef.current && !utilRef.current.contains(event.target as Node)) {
        setUtilVisible(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside as unknown as EventListener
    );

    return () => {
      document.addEventListener(
        "click",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  const toggleUtil = () => {
    setUtilVisible(!utilVisible);
  };

  const onDelete = async () => {
    const ok = confirm("정말 삭제 하시겠습니까?");

    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUtilVisible(false);
    }
  };

  // 유저아이디 5글자까지보이게
  const uidLength = user?.uid?.substring(0, 5);

  return (
    <Wrap>
      <Column>
        <UtilWrap ref={utilRef}>
          <Username>{username}</Username>
          <UserId>@_{uidLength}</UserId>
          <UtilBtn onClick={toggleUtil}>
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
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </UtilBtn>
          <Util style={{ display: utilVisible ? "block" : "none" }}>
            <UtilList>
              <CopyButton aria-label="링크 복사">
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
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </CopyButton>
            </UtilList>
            <UtilList>
              {user?.uid === userId ? (
                <DeleteButton aria-label="게시글 삭제" onClick={onDelete}>
                  삭제
                </DeleteButton>
              ) : null}
            </UtilList>
          </Util>
        </UtilWrap>
        <PotoColumn>{photo ? <Photo src={photo} /> : null}</PotoColumn>
        <Payload>{tweet}</Payload>
      </Column>
    </Wrap>
  );
}
