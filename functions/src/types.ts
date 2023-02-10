import * as admin from "firebase-admin";
export type User = {
    email: string,
    name: string,
    profilePicture?: string,
    createdOn: admin.firestore.FieldValue
}

export type RecentMessages = {
    messages: admin.firestore.FieldValue | (Message & {messageId: string})[]
}

export type Message = {
    content: string,
    from: {
        email: string,
        name: string,
        profilePicture?: string
    },
    timestamp: admin.firestore.FieldValue
}
