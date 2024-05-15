import { Button } from "./button";
import MessageSquare from "@/assets/message-square.svg";
import Forward from "@/assets/forward.svg"; 




export default function CtaButtons({numberOfComments}) {
    return (
        <div className="">
            <Button variant="outline" size="icon"
            className="w-20 mr-4 rounded-full bg-primary border-secondary hover:bg-secondary text-gray-400">
                <MessageSquare className="mr-2" fill={'#9ca3af'} />{numberOfComments ?? 0}
                </Button>
            <Button variant="outline" size="icon"
             className="w-20 min-w-max rounded-full bg-primary border-secondary hover:bg-secondary text-gray-400">
                <Forward className=""/> Share</Button>
        </div>
    )
}