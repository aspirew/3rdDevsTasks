import { ChatMessage, ChatResponse } from "./types"

export const chatAdress = "http://localhost:3000/api/chat"

export const sendPromptsToChat = async (prompts: string[], chatAdress: string) => {
    const responses: string[] = []
    for(const query of prompts){
        const message: ChatMessage = {
            message: {
                role: "user",
                content: query
            }
        }
        
        responses.push((await (await fetch(chatAdress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        })).json() as ChatResponse).choices[0].message.content)
    }
    return responses
}