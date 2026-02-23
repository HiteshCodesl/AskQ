import { User } from "lucide-react";
import { Button } from "./ui/button";

export default function QuestionCard() {
    
  return (
    <div className="w-full flex flex-col gap-4 border rounded-xl p-6  md:w-[60vw]">
        <div className="flex gap-2">
            <span><User /></span>
            <span>UserName</span>
            <span>TimeStamp</span>
        </div>
        <div className="flex flex-col">
            <div className="text-xl font-semibold">
                Title of the question
            </div>
            <div className="line-clamp-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis eum modi dolores illo, sit veritatis ad quod reiciendis minima dignissimos, facere perferendis eius maiores reprehenderit neque? Reprehenderit eaque voluptate rerum!
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant='outline'>Upvote</Button>
            <Button variant='outline'>DownVote</Button>
            <Button variant='outline'>Comment</Button>
            <Button variant='outline'>Share</Button>
        </div> 
    </div>
  )
}

