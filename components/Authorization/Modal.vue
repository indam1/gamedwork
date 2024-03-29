<template>
  <div class="bg-gray-300 grid grid-cols-2 gap-2">
    <template v-if="!user">
      <input
        id="email"
        v-model="email"
        class="col-span-1"
        :disabled="pendingLogIn || statusLogIn === 'success'"
        type="email"
        placeholder="Email"
      >
      <button
        class="col-span-1"
        :disabled="pendingLogIn || statusLogIn === 'success'"
        @click="logIn"
      >
        Log in
      </button>
      <span
        v-if="messageResult"
        class="col-span-2 text-center"
      >{{ messageResult }}</span>
    </template>
    <template v-else>
      <button
        class="col-span-1"
        :disabled="pendingLogOut"
        @click="logOut"
      >
        Log out
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const email = ref('');

const { pendingLogIn, pendingLogOut, logIn, logOut, statusLogIn } = useAuthorization(email);
const messageResult = computed(() => {
  if (statusLogIn.value === 'success') {
    return 'Check your email';
  }

  if (statusLogIn.value === 'error') {
    return 'Failed to send email. Try again';
  }

  return null;
});

function useAuthorization(input: Ref<string>) {
  const email = computed(() => input.value);
  const supabase = useSupabaseClient();
  const pendingLogIn = ref(false);
  const pendingLogOut = ref(false);
  const statusLogIn = ref('idle');

  const logOut = async () => {
    pendingLogOut.value = true;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }

      statusLogIn.value = 'idle';
    } finally {
      pendingLogOut.value = false;
    }
  }

  const logIn = async () => {
    statusLogIn.value = 'pending';
    pendingLogIn.value = true;

    try {
      const { error } = await supabase.auth.signInWithOtp({ email: email.value });
      if (error) {
        statusLogIn.value = 'error';
        console.error(error);
        return;
      }

      statusLogIn.value = 'success';

    } finally {
      pendingLogIn.value = false;
    }
  }

  return { pendingLogIn, pendingLogOut, logIn, logOut, statusLogIn };
}
</script>
