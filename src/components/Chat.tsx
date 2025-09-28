import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import Button from "./ui/Button";

export const Chat: React.FC = () => {
    const { user } = useUser();
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const messages = useQuery(api.chat.getMessages);
    const sendMessage = useMutation(api.chat.sendMessage);

    const isHost = (userId: string) => {
        return userId === import.meta.env.VITE_CREATOR_USER_ID
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
            const matches = trimmedMessage.match(/^\/(\w+)\s*(.*)/);

            if (matches && matches.length > 0) {
                setError("Your message contains inappropriate content and was not sent.");
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

    const getMessageAge = (timestamp: number) => {
        const now = Date.now();
        return (now - timestamp) / 1000 / 60; // in minutes
    }

    const filteredMessages = messages?.filter(msg =>
        getMessageAge(msg._creationTime) < 5) || [];

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
                            <span 
                                className="font-bold" 
                                style={{ color: isHost(msg.userId) ? '#EBC06D' : '#ffffff' }}
                            >
                                {msg.username}: </span>
                            <span>{msg.content}</span>
                        </div>
                    ))}
                </div>
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