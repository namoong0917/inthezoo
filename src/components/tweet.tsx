import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrap = styled.li`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 30px 20px;
  background: #f3f0ea;
  & + & {
    border-top: 1px solid #864622;
  }
`;

const Column = styled.div`
  width: 100%;
`;

const Username = styled.strong`
  border: 1.2px solid #864622;
  padding: 0 15px;
  line-height: 38px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.8rem;
  display: inline-block;
  margin-bottom: 20px;
`;

const Payload = styled.p`
  color: #000;
  margin: 20px 0;
  font-size: 1.8rem;
`;

const Photo = styled.img`
  /* width: 100%; */
  max-height: 500px;
`;

const DeleteButton = styled.button`
  background: #d62a0c;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  padding: 5px 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
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
      //
    }
  };

  return (
    <Wrap>
      <Column>
        <Username>{username}</Username>
        <Column>{photo ? <Photo src={photo} /> : null}</Column>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>delete</DeleteButton>
        ) : null}
      </Column>
    </Wrap>
  );
}
