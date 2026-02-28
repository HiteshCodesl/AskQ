import { CircleArrowDown, CircleArrowUp, MessageCircle, User, Vote } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface question {
    questions_id: number,
    questions_title: string,
    questions_description: string,
    questions_created_at: string,
    questions_score: number,
    users_id: number,
    users_name: string,
    users_vote: number
    questionvote_userid : number,
}
export default function QuestionCard() {

    const [questions, setQuestions] = useState<question[]>([]);

    useEffect(() => {
        const getAllQuestions = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/question/allQuestion`);

            if (response.data.success === true) {
                setQuestions(response.data.questions)
            }
        }
        getAllQuestions();
    }, [])

    const upvoteQuestion = async (questionId: number, newVote: number) => {

        const oldVote = questions.find(q => q.questions_id == questionId)?.users_vote || 0;

        if(!oldVote){ 
            return;
        }        
        const delta = newVote - oldVote;
        
        setQuestions(prev => prev.map(q => q.questions_id === questionId ? {...q, questions_score : q.questions_score + delta, users_vote : newVote }: q))

        console.log("Frontend State Updated");

        console.log("Request send")
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vote/questionVote/${questionId}`, { voteType: newVote}, {
            headers : {
                'Authorization': localStorage.getItem('token')
            }
        })
        console.log("Response", response.data);
        if (response.data.success === true) {
           console.log("Vote Changed successFully")
        } else {
         toast("Failed to Vote")
        setQuestions(prev => prev.map(q => q.questions_id === questionId ? {...q, questions_score : q.questions_score - delta, users_vote : oldVote }: q))
        }
    }

    return (
        <div className="">
            {questions.map((question) => (

                <div key={question.questions_id} className="w-full flex flex-col hover:cursor-pointer border rounded-xl p-6 mb-3 md:w-[60vw]">

                    <div className="flex gap-2 mb-2">
                        <span><User /></span>
                        <span>{question.users_name}</span>
                        <span>{moment(question.questions_created_at).fromNow()}</span>
                    </div>
                    <div className="flex flex-col">

                        <Link to={`/dashboard/question/${question.questions_id}`} className="text-xl font-semibold">
                            {question.questions_title}
                        </Link>

                        <div className="line-clamp-2">
                            {question.questions_description}
                        </div>

                    </div>
                    <div className="flex gap-1 mt-2 items-center">
                        <div className="bg-gray-300 items-center flex rounded-md">
                            <Button 
                            className="hover:bg-gray-500" 
                            onClick={() => upvoteQuestion(question.questions_id, 1)} 
                            variant={'ghost'}>
                            <CircleArrowUp className="size-5" />
                            </Button>

                            <span 
                            className=" rounded-full">
                            {question.questions_score}
                            </span>

                            <Button 
                            className="hover:bg-gray-500" 
                            onClick={() => upvoteQuestion(question.questions_id, -1)} 
                            variant={'ghost'}><CircleArrowDown 
                            className="size-5 hover:bg-green-500" />
                            </Button>

                        </div>
                        <div className="flex gap-3">
                            <Button className="" variant='outline'><MessageCircle />Reply</Button>
                            <Button variant='outline'>Share</Button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

