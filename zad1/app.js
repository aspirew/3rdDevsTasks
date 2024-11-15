var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chatAdress, sendPromptsToChat } from "../utils";
const robotSite = "https://xyz.ag3nts.org/";
const getQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const regex = /<p id="human-question">.*?<br\s*\/>(.*?)<\/p>/;
    const html = yield (yield fetch(robotSite)).text();
    const match = html.match(regex);
    if (match) {
        const question = match[1].trim();
        return question;
    }
});
getQuestion().then(q => {
    const messages = [
        `Odpowiedz na pytanie znajdujące się w nawaisach. 
        Twoją odpowiedzią powinna być jedynie liczba, nic poza tym. 
        (${q})`
    ];
    sendPromptsToChat(messages, chatAdress).then(res => {
        const post_response = fetch("https://xyz.ag3nts.org/", {
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
            },
            "body": "username=tester&password=574e112a&answer=" + res[0],
            "method": "POST",
        }).then((r) => {
            r.text().then(e => {
                console.log(e);
            });
        });
    });
});
