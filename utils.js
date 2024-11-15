var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const chatAdress = "https://localhost:3000/api/chat";
export const sendPromptsToChat = (prompts, chatAdress) => __awaiter(void 0, void 0, void 0, function* () {
    const responses = [];
    for (const query of prompts) {
        const message = {
            message: {
                role: "user",
                content: query
            }
        };
        responses.push((yield (yield fetch(chatAdress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        })).json()).choices[0].message.content);
    }
    return responses;
});
