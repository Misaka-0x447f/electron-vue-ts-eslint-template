<template>
  <div v-if="messages"
       v-html="messages"
  />
  <div v-else>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { onMounted, ref } from 'vue'
import ipc from '../ipc'

export default {
  name: 'IndexPage',
  components: {
    HelloWorld
  },
  setup () {
    const messages = ref<string>('')
    onMounted(async () => {
      messages.value = await ipc.fetchHomePage.request()
    })
    return {
      messages
    }
  }
}
</script>
