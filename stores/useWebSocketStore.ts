export const useWebSocketStore = defineStore('websocket', () => {
    const user = useSupabaseUser();
    const active = ref(false);
    const messages = ref<Array<{ text: string, user: string }>>([]);
    const invites = ref<Array<{ initiator: string, step_id: string }>>([]);

    const reqUrl = useRequestURL();
    const host = reqUrl.host;
    const protocol = reqUrl.protocol;
    const websocketProtocol = protocol === 'https:' ? 'wss' : 'ws';

    // ToDo probably not necessary to call it on SSR
    const url = computed(() => `${websocketProtocol}://${host}/api/websocket?userId=${user.value?.id}`);
    const { send, close, open } = useWebSocket(url, {
        protocols: ['Authorization', 'your_token_here'],
        immediate: false,
        autoReconnect: {
            retries: 3,
            delay: 5 * 1000,
            onFailed() {
                alert('Failed to connect WebSocket after 3 retries');
            },
        },
        heartbeat: {
            message: JSON.stringify({ event: 2 }),
            interval: 15 * 1000,
            pongTimeout: 1000,
        },
        onMessage(ws, messageEvent) {
            const data = JSON.parse(messageEvent.data);
            if (data.event === 1) {
                const { payload } = data;
                log(payload.sender, payload.message);
                return;
            }

            if (data.event === 2) {
                log('system', 'pong');
                return;
            }

            if (data.event === 6) {
                console.log('YO');
                invites.value.push(data.payload);
                return;
            }

            if (data.event === 8) {
                active.value = true;
                log('system', 'connected');
            }
        },
    });

    watch(user, (val) => {
        if (val) {
            open();
        } else {
            close();
        }
    }, { immediate: true })

    const log = (user: string, ...args: Array<string>) => {
        messages.value.push({ text: args.join(" "), user });
    };

    const clear = () => {
        messages.value = [];
        log('system', 'previous messages cleared');
    };

    const sendEvent = (payload: unknown) => {
        send(JSON.stringify(payload));
    }

    return {
        active,
        sendEvent,
        log,
        clear,
        messages,
        invites
    };
})
