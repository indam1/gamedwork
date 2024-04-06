<template>
  <div class="py-4 px-2 flex flex-col gap-2 bg-gray-100 rounded-2xl">
    <ul class="list-disc overflow-y-auto h-[200px]">
      <li
        v-for="message in webSocketStore.messages"
        :key="message.text"
        class="text-sm"
      >
        <span class="font-extrabold">{{ message.user }}: </span>
        {{ message.text }}
      </li>
    </ul>
    <div class="w-full">
      <input
        v-model="messageInput"
        type="text"
        placeholder="Type your message..."
        class="w-full text-xs px-1 py-2 bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
        :disabled="!webSocketStore.active"
        @keydown.enter="sendMessage"
      >
    </div>
    <div class="flex justify-between w-full">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs p-2"
        :disabled="!webSocketStore.active"
        @click="sendMessage"
      >
        Send
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs p-2"
        :disabled="!webSocketStore.active"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const courseStore = useCourseStore()
const webSocketStore = useWebSocketStore()
const user = useSupabaseUser()
const { clear, sendEvent, closeInvite } = webSocketStore

const messageInput = ref<string>('')

const sendMessage = () => {
    if (!webSocketStore.active) {
      return
    }

    if (messageInput.value) {
        sendEvent({ event: 1, message: messageInput.value })
    }

    messageInput.value = ''
}

if (route.query.help) {
  closeInvite(route.query.help)
} else if (user.value) {
  sendEvent({event: 8, payload: {initiator: user?.value.id, step_id: courseStore.currentStepId}})
}
</script>
