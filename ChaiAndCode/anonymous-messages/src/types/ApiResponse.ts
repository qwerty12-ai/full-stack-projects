// defintion are usually interfaces inside in ts
import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    /* we made these optional cause for every api 
    we dont need to do for every page of our application
    (like we dont need it for our signup page for
    isAcceptingMessages)
    we make things optional by using ?: syntax 
    */
    isAcceptingMessage?: boolean;
    messages?: Array<Message>
}