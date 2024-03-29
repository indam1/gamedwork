<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <div class="w-52 h-52 fixed bg-emerald-950 right-0 bottom-0">
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
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const webSocketStore = useWebSocketStore();
const { sendEvent } = webSocketStore;
const { stepInfoById } = useSupabaseFetching();

const pending = ref(false);
const acceptHelp = async (invite) => {
  pending.value = true;
  const { courseId, lessonId, stepId } = await stepInfoById(invite.step_id);
  sendEvent({ event: 8, payload: { initiator: invite.initiator, step_id: invite.step_id } });
  return navigateTo(buildCourseLink(courseId, lessonId, stepId));
}
</script>

<style lang="postcss">
body {
  font-family: "Verdana", sans-serif;
  font-size: 16px;
  font-weight: 400;
}

body {
  @apply bg-neutral-200 text-neutral-800
}
</style>
