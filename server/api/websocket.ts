import {Peer, WSRequest} from 'crossws';
import { getQuery } from "ufo";
import { parse } from "cookie-es";

// 0 - open connection
// 1 - message
// 2 - ping
// 3 - leave room
// 4 - close room
// 5 - join room
// 6 - subscribe to help
// 7 - send help
// 8 - open room

const users = new Map<string, { online: boolean, roomId: string | null }>();
const rooms = new Map<string, Set<string>>();
const mainRoom = 'main';

export default defineWebSocketHandler({
    open(peer) {
        const userId = getUserId(peer);
        users.set(userId, { online: true, roomId: null });
        peer.subscribe(mainRoom);
    },
    async message(peer, message) {
        const userId = getUserId(peer);
        const data = JSON.parse(message.text());

        if (data.event === 1) {
            const _message = {
                event: 1,
                payload: {
                    sender: userId,
                    message: data.message
                }
            };

            const userInfo = users.get(userId);
            if (!userInfo) {
                throw new Error('No user info');
            }

            const { roomId } = userInfo;
            peer.send(_message); // echo back
            if (roomId) {
                peer.publish(roomId, _message);
            }
            await addMessage(userId, message.text());
            return;
        }

        if (data.event === 2) {
            peer.send({ event: 2 });
            return;
        }

        if (data.event === 8) {
            const { initiator, step_id } = data.payload;
            const isUserInitiator = userId === initiator;
            const initiatorUser = users.get(initiator);
            const initiatorUserInfo = users.get(userId);
            if (!initiatorUserInfo) {
                throw new Error('No user info');
            }

            let { roomId } = initiatorUserInfo;
            if (!roomId) {
                roomId = `${initiator}:${step_id}`;
                rooms.set(roomId, new Set([initiator]));
            }

            const user = isUserInitiator ? initiatorUser : users.get(userId);
            if (!user) {
                throw new Error('No user');
            }

            user.roomId = roomId;
            peer.send({ event: 8 })
            peer.subscribe(roomId);
            if (isUserInitiator) {
                peer.publish(mainRoom, {event: 6, payload: {initiator, step_id}});
            }
            return;
        }
    },

    close(peer) {
        const userId = getUserId(peer);
        users.set(userId, { online: false, roomId: null });
    },


    error(peer, error) {
        console.log(`[ws] error ${peer}`, error);
    },

    async upgrade(req) {
        await authenticate(req);
        return {
            headers: {
                "x-powered-by": "cross-ws",
            },
        };
    },
});

// ToDo make authentication
async function authenticate(req: WSRequest) {
    const query = getQuery(req.url);
    const cookie = parse(req.headers.cookie);
    if (!cookie['sb-access-token'] || !cookie['sb-refresh-token'] || !query.userId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }
}

function getUserId(peer: Peer) {
    const query = getQuery(peer.url);
    return query.userId as string;
}
