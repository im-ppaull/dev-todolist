import { Chat } from "@/components/Chat";

const CheckList = () => {
    return (
        <div>
            <div>
                <p className="font-bold">YOUR TO-DO-LIST</p>
                <p>
                    Your to-do list is shown below. You can add new tasks, mark them as completed, or delete them as needed.
                    Remember, your list is private and secure, accessible only to you unless you make it public. Happy organizing!
                </p>
            </div>

            <div className="flex justify-between">
                <div>// TODO Add todo component</div>

                <div className="outline max-w-lg mb-2 min-w-md">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default CheckList;