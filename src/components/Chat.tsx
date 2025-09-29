import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import Button from "./ui/Button";

const showMaxMessages: number = 25;
const host = import.meta.env.VITE_CREATOR_USER_ID;

export const Chat: React.FC = () => {
    const { user } = useUser();
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [filteredMessages, setFilteredMessages] = useState<any[]>([]);

    const messages = useQuery(api.chat.getMessages);
    const sendMessage = useMutation(api.chat.sendMessage);
    const clearMessages = useMutation(api.chat.clearMessages);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }

        if (messages) {
            setFilteredMessages(messages.slice(0, showMaxMessages));
        }
    }, [messages]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
            timer = setTimeout(() => {
                setError(null);
            }, 3000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [error]);

    const handleSendMessage = async () => {
        if (message.trim() && user) {
            const trimmedMessage = message.trim();

            // /clear command to clear chat messages, only for admin user
            if (trimmedMessage === "/clear" && user.id !== host) {
                setError("You are not authorized to clear messages.");
                setMessage('');
                return;
            } else if (trimmedMessage === "/clear" && user.id === host) {
                await clearMessages({ userId: user.id });
                setMessage('');
                return;
            }

            const username = user.username || user.firstName || user.id.slice(0, 8);
            await sendMessage({
                userId: user.id,
                username,
                content: message.trim()
            });
            setMessage('');
        } else if (!user) {
            setError("You must be signed in to send messages.");
        }
    }

    const showMoreMessages = () => {
        // This function can be implemented to load more messages if needed.
        setFilteredMessages(messages ? messages.slice(0, filteredMessages.length + showMaxMessages) : []);
    }

    return (
        <div className="flex flex-col h-[50vh] p-4">
            <div className="text-lg font-bold mb-2 flex items-center justify-between">
                <p className="text-[#EBC06D]">Chat</p>
                {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            </div>
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto mb-4 flex flex-col-reverse"
            >
                <div>
                    {filteredMessages.slice().reverse().map
                    ((msg, index) => (
                        <div className="mb-2 break-after-all text-sm" key={index}>
                            <span className="font-bold">{msg.username}: </span>
                            <span>{msg.content}</span>
                        </div>
                    ))}
                </div>
                { messages && (filteredMessages.length >= showMaxMessages) && (messages.length > filteredMessages.length) &&
                    <div className="text-sm mx-auto underline cursor-pointer" onClick={() => showMoreMessages()}>Show more messages</div>}         
            </div>

            <div className="flex items-center gap-2">
                <input type="text"
                    placeholder="Type a message..."
                    className="focus:outline-white focus:outline-1 rounded-md px-3 py-2 w-full text-sm"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={(e) => { if (e.key === 'Enter') { handleSendMessage() } }}
                />
                <Button className="hover:bg-emerald-300/50" onClick={() => handleSendMessage()}>Send</Button>
            </div>
        </div>
    )
}