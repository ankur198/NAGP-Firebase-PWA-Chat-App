<template>
    <div class="loginComponent">
        <div v-show="user === undefined" id="firebaseAuthUIElement">
        </div>
        <div v-if="user !== undefined" class="userDetails">
            <img :src="user.photoURL ?? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'"
                alt="profile picture">
            <div>{{ user.displayName }}</div>
            <button @click="auth.signOut">Logout</button>
        </div>
    </div>

</template>
<script setup lang="ts">
import { firebaseConfig } from './../firebase'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { onMounted, ref } from 'vue';

const user = ref<firebase.User>()

const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth(app)

auth.onAuthStateChanged(observer => user.value = observer ?? undefined)

const ui = new firebaseui.auth.AuthUI(auth)
onMounted(() => {
    ui.start('#firebaseAuthUIElement', {
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup'
    })
})

</script>

<style scoped lang="scss">
.loginComponent {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    .userDetails{
        display: flex;
        place-items: center;
        gap: 2rem;
        height: 50px;
        img{
            border-radius: 50%;
            height: 100%;
        }
    }
}
</style>