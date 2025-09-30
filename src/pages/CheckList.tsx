import { Chat } from "@/components/Chat";

const CheckList = () => {
    return (
        <div>
            <div>
                <p className="font-bold">YOUR TO-DO-LIST</p>
                <p>
                    Your to-do list is shown below. You can add new tasks, mark them as completed, or delete them as needed.
                    Remember, your list is private and secure, accessible only to you unless you make it public. There is also a chat but obey the rules!
                    No bad language, vulgarity, political or sexual topics are allowed here. If you want to delete a message, press shift and click on the message. 
                    Only the host can delete any message, users can only delete their own messages.
                    <br />Happy organizing!
                </p>
            </div>

            <div className="flex justify-between mt-5">
                <div>// TODO Add todo component</div>

                <div className="outline max-w-lg mb-2 min-w-md">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default CheckList;