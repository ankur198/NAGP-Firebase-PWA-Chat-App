<template>
    <div v-if="user !== undefined">
        <form @submit.prevent="onSubmit" :disabled="isDisabled">
            <input placeholder="Write message" v-model="message" />
            <input ref="inputField" type="submit" :disabled="isDisabled" />
        </form>
    </div>
    <div v-else>
        Sign in to join the conversation
    </div>
</template>
<script setup lang="ts">
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const inputField = ref<HTMLInputElement>()
const user = ref<User>()
const message = ref<string>()
const isDisabled = ref(false)
onAuthStateChanged(getAuth(), observer => user.value = observer ?? undefined)
const addMessage = httpsCallable(getFunctions(), 'addMessage')
const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
    if (isDisabled.value) {
        return
    }

    isDisabled.value = true
    try {
        const data = {
            message: message.value
        }
        message.value = ''
        await addMessage(data)
    } catch (error) {
        alert('Failed to add message')
        console.error(error)
    }
    isDisabled.value = false
    inputField.value?.focus()
}

watch([route.path, user], () => {
    if (user !== undefined && route.path === '/hello') {
        message.value = 'hello'
        onSubmit()
        router.replace('/')
    }
})
</script>
<style scoped lang="scss">
form {
    display: grid;
    grid-template-columns: 1fr 100px;
}

input {
    border: 0;
    padding: 10px;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    background-color: rgb(69, 69, 69);

    &:focus {
        outline: none;
    }
}
</style>