<template>
  <aside class="w-52 h-52 fixed bg-emerald-950 right-0 bottom-24 opacity-50">
    <ul>
      <li
        v-for="invite in webSocketStore.invites"
        :key="invite.initiator"
        class="text-gray-50 text-sm"
      >
        {{ invite.initiator }}:{{ invite.step_id }}
        <button
          class="bg-green-400 p-2 rounded-xl"
          :disabled="pending"
          @click="acceptHelp(invite)"
        >
          Accept
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import type {WebSocketRoomInvite} from '~/stores/useWebSocketStore'

const webSocketStore = useWebSocketStore()
const { sendEvent } = webSocketStore
const { stepInfoById } = useSupabaseFetching()

const pending = ref(false)
const acceptHelp = async (invite: WebSocketRoomInvite) => {
  pending.value = true
  const { courseId, lessonId, stepId } = await stepInfoById(invite.step_id)
  sendEvent({ event: 8, payload: { initiator: invite.initiator, step_id: invite.step_id } })
  return navigateTo(`${buildCourseLink(courseId, lessonId, stepId)}?help=${invite.initiator}`)
}
</script>
