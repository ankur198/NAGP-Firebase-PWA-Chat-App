<template>
    <div ref="list" class="message-list">
        <button v-if="recentMessages.messages.length > 0" @click="loadMoreMessage">Load More Messages</button>
        <div v-for="message in recentMessages.messages" :key="message.messageId" class="message"
            :class="user !== null && user?.email === message.from.email ? 'self' : ''">
            <img :src="message.from.profilePicture" :alt="message.from.email"
                :title="`${message.from.name} (${message.from.email})`">
            <div class="chat-bubble">
                {{ message.content }}
            </div>
            <div class="timestamp">
                {{ getTime(message.timestamp) }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RecentMessages, Message } from '../types';
import { onSnapshot, doc, getFirestore, DocumentReference, Timestamp, collection, query, orderBy, startAt, limit, getDocs, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as _ from 'lodash'
dayjs.extend(relativeTime)
const firestore = getFirestore()

const list = ref<HTMLDivElement>()
const recentMessages = ref<RecentMessages>({ messages: [] })

const getTime = (timestamp: Timestamp) => {
    return dayjs(timestamp.toDate()).fromNow()
}

const loadMoreMessage = async () => {
    const messageCollectionRef = collection(firestore, 'messages')
    const messageCollectionQuery = query(
        messageCollectionRef,
        where('timestamp', '<', recentMessages.value.messages[0].timestamp),
        orderBy('timestamp', 'desc'),
        limit(5)
    )
    const messagesSnapshots = await getDocs(messageCollectionQuery)
    const newRecentMessages = [...recentMessages.value.messages]
    await messagesSnapshots.docs.map(async (messageSnapshot) => {
        const message = await messageSnapshot.data() as Message
        newRecentMessages.push({ ...message, messageId: messageSnapshot.id })
    })
    recentMessages.value.messages = _.orderBy(newRecentMessages, x => x.timestamp.toDate(), 'asc')
}
onSnapshot(doc(firestore, 'messages/recent') as DocumentReference<RecentMessages>, snapshot => {
    if (snapshot.exists()) {
        const messages = snapshot.data()
        const existingMessageId = recentMessages.value.messages.map(x => x.messageId)
        const newMessages = messages.messages.filter(message => !existingMessageId.includes(message.messageId))
        recentMessages.value.messages = [...recentMessages.value.messages, ...newMessages]
        list.value?.scrollTo(0, list.value.scrollHeight)
    }
})
const user = ref<User>()
onAuthStateChanged(getAuth(), observer => user.value = observer ?? undefined)

</script>
<style scoped lang="scss">
.message-list {
    height: 500px;
    overflow-y: auto;
    margin-bottom: 50px;
}

.message {
    text-align: left;
    width: 100%;
    display: flex;
    gap: 5px;
    margin-bottom: 10px;


    img {
        align-self: flex-end;
        border-radius: 50%;
        height: 35px;
        margin-right: 10px;
    }

    .chat-bubble {
        max-width: 50%;
        border-radius: 20px;
        border: 1px solid transparent;
        padding: 0.6em 3em 1em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #2d2c2c;
        cursor: pointer;
        transition: border-color 0.25s;

        &:hover {
            border-color: #646cff;
        }
    }

    .timestamp {
        color: rgb(199, 199, 199);
        font-size: 0.75em;
        align-self: flex-end;
    }
}

.self {
    .chat-bubble {
        padding: 0.6em 1.2em 1em 3em;
    }

    justify-self: flex-end;
    flex-direction: row-reverse;
}
</style>