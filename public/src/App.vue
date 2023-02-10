<script setup lang="ts">
import LoginComponent from './components/LoginComponent.vue';
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
import './firebase.ts'
</script>

<template>
  <LoginComponent />
  <div class="title">
    <h2>Firebase + PWA Chat Demo</h2>
  </div>
  <div class="content">
    <MessageList />
    <MessageInput />
  </div>
</template>

<style scoped lang="scss">
.title {
  h2 {
    font-size: 3rem;
  }
}

.content {
  height: inherit;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  border: solid black 1px;
  padding: 20px;
}
</style>
