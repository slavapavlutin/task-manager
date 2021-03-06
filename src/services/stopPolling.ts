import firebase from 'firebase/app';

function stopPolling(fn: (params: any) => void) {
  firebase
    .database()
    .ref('/')
    .off('value', fn);
}

export default stopPolling;
