import { chatAdress, sendPromptsToChat } from "../utils";

const robotSite = "https://xyz.ag3nts.org/"

const getQuestion = async () => {
    const regex = /<p id="human-question">.*?<br\s*\/>(.*?)<\/p>/;
    const html = await (await fetch(robotSite)).text()
    const match = html.match(regex);
    if(match){
        const question = match[1].trim();
        return question
    }
}

getQuestion().then(q => {
    const messages = [
        `Odpowiedz na pytanie znajdujące się w nawaisach. 
        Twoją odpowiedzią powinna być jedynie liczba, nic poza tym. 
        (${q})`
    ]
    sendPromptsToChat(messages, chatAdress).then(res => {
    const post_response = fetch("https://xyz.ag3nts.org/", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
        },
        "body": "username=tester&password=574e112a&answer=" + res[0],
        "method": "POST",
    }).then((r) => {
        r.text().then(e => {
            console.log(e)
        }) 
    })
})
})




