import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrap = styled.main`
  border-left: 1px solid #864622;
  border-right: 1px solid #864622;
  overflow-y: scroll;
`;

const TitleWrap = styled.div`
  border-bottom: 1px solid #864622;
  position: sticky;
  top: 0;
  background: #f1ede4;
  z-index: 9999;
`;

const Title = styled.h2`
  padding: 20px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 3rem;
  border-bottom: 1px solid #864622;

  @media (max-width: 1016px) {
    font-size: 1.6rem;
  }
`;

const EditWrap = styled.div`
  padding: 10px 20px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 1016px) {
    flex-direction: column;
  }
`;

const AvatarUpload = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #864622;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
    }
  }
`;

const AvatarImg = styled.img``;

const AvatarInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
  text-align: center;
  width: 100%;
  max-width: 200px;
  padding: 0 8px;
  font-size: 1.8rem;
  outline: 2px solid #eee;
  border: none;
  border-radius: 8px;
  line-height: 30px;
  background: #fff;
  transition: outline-color 0.4s;
  &:focus {
    outline: 2px solid #864622;
    transition: outline-color 0.4s;
  }
`;
const EditNameBtn = styled.button`
  width: 100px;
  padding: 5px 0;
  font-weight: 700;
  border-radius: 20px;
  color: #864622;
  border: 1.5px solid #864622;
  transition: all.2s;
  &:hover {
    color: #fff;
    background: #864622;
    border: 1.5px solid #864622;
    transition: all.2s;
  }
`;

const Name = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default function Profile() {
  // 유저 이미지
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  // tweets 들 state로 만들기
  const [tweets, setTweets] = useState<ITweet[]>([]);
  // 이름 수정
  const [name, setName] = useState(user?.displayName ?? "Anonymous");
  const [editMode, setEditMode] = useState(false);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      // 파일명 - 유저 아이디
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      // 유저 프로필 업데이트
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const onChangeNameClick = async () => {
    if (!user) return;
    setEditMode((prev) => !prev);
    if (!editMode) return;
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
    }
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    // document 가져오기
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrap>
      <TitleWrap>
        <Title>Profile</Title>
        <EditWrap>
          <AvatarUpload htmlFor="avatar">
            {avatar ? (
              <AvatarImg src={avatar} />
            ) : (
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </AvatarUpload>
          <AvatarInput
            onChange={onAvatarChange}
            id="avatar"
            type="file"
            accept="image/*"
          />
          {editMode ? (
            <NameInput
              maxLength={10}
              onChange={onNameChange}
              type="text"
              value={name}
            />
          ) : (
            <Name>{name ?? "Anonymous"}</Name>
          )}
          <EditNameBtn
            aria-label="내 이름 편집하기"
            onClick={onChangeNameClick}
          >
            {editMode ? "저장" : "편집"}
          </EditNameBtn>
        </EditWrap>
      </TitleWrap>

      {/* tweets 컨테이너 */}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrap>
  );
}
