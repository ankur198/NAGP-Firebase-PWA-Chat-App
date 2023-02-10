/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as types from "./types";

admin.initializeApp();
const firestore = admin.firestore;

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const updateLastModified = functions.firestore.document("/test/{doc}")
    .onUpdate(async (change)=>{
      const beforeData = await change.before.data();
      const afterData = await change.after.data();
      if (beforeData.changeTimestamp === afterData.changeTimestamp) {
        change.after.ref.update({
          changeTimestamp: firestore.FieldValue.serverTimestamp(),
        });
      }
    });

// functions required for chat app
export const onUserCreate = functions.auth.user().onCreate(async (user)=>{
  const userRef = firestore().collection("users").doc(user.uid) as admin.firestore.DocumentReference<types.User>;
  await userRef.set({
    email: user.email ?? user.uid,
    name: user.displayName ?? user.uid,
    profilePicture: user.photoURL,
    createdOn: firestore.FieldValue.serverTimestamp(),
  });
});

export const addDeviceToFCM = functions.https.onCall(async (data: {token: string})=>{
  const messaging = admin.messaging();
  await messaging.subscribeToTopic(data.token, "allDevices");
});

export const addMessage = functions.https.onCall(async (data:{message: string}, context) => {
  if (context.auth !== null) {
    const userDocRef = firestore().doc(`users/${context.auth?.uid}`) as admin.firestore.DocumentReference<types.User>;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userDoc = (await userDocRef.get()).data()!;

    const message: types.Message = {
      content: data.message,
      from: {email: userDoc.email, name: userDoc.name, profilePicture: userDoc.profilePicture},
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
    const newMessageDoc = await firestore().collection("messages").add(message) as admin.firestore.DocumentReference<types.Message>;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newMessageData = await (await newMessageDoc.get()).data()!;

    await admin.messaging().sendToTopic("allDevices", {
      data: {
        title: `New Message from ${newMessageData.from.name}`,
        body: newMessageData.content,
      },
    });

    const recentMessagesRef = firestore().doc("messages/recent") as admin.firestore.DocumentReference<types.RecentMessages>;
    if ((await recentMessagesRef.get()).exists) {
      await recentMessagesRef.update({
        messages: firestore.FieldValue.arrayUnion({...newMessageData, messageId: newMessageDoc.id}),
      });
    } else {
      await recentMessagesRef.set({
        messages: [{...newMessageData, messageId: newMessageDoc.id}],
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const recentMessages = (await recentMessagesRef.get()).data()!;
    const elementsToDelete = [...(recentMessages.messages as types.Message[]).slice(0, -5)];
    if (elementsToDelete.length>0) {
      await recentMessagesRef.update({
        messages: firestore.FieldValue.arrayRemove(...elementsToDelete),
      });
    }
  }
});
