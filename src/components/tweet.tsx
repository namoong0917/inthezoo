import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

const DeleteButton = styled.button`
  background: tomato;
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
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>delete</DeleteButton>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrap>
  );
}
