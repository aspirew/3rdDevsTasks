export type ChatMessage = {
    message: {
        role: string,
        content: string
    }
}

export type ChatResponse = {
    choices: [
        {
            index: number,
            message: {
                role: string,
                content: string,
                refusal: unknown | null
            },
            finish_reason: string,
        }
    ]
}