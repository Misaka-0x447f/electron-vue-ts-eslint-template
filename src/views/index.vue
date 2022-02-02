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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import events from '../../util/events'

export default {
  name: 'IndexPage',
  components: {
    HelloWorld
  },
  setup () {
    const messages = ref<string>('')
    onMounted(() => {
      events.browserReady.dispatch()
      onBeforeUnmount(events.requestComplete.sub(payload => {
        messages.value = payload
      }))
    })
    return {
      messages
    }
  }
}
</script>
