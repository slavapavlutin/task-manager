import { Tag } from '@local/types';
import firebase from 'firebase/app';

function updateTag(tag: Tag) {
  firebase
    .database()
    .ref(`/tags/${tag.id}`)
    .set({ name: tag.name });
}

export default updateTag;
