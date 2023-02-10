import { Timestamp } from 'firebase/firestore'
export type User = {
    email: string,
    name: string,
    profilePicture?: string,
    createdOn: Timestamp
}

export type RecentMessages = {
    messages: (Message & {messageId: string})[]
}

export type Message = {
    content: string,
    from: {
        email: string,
        name: string,
        profilePicture?: string
    },
    timestamp: Timestamp
}
