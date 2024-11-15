import { chatAdress, sendPromptsToChat } from '../utils.js'
import { writeFile } from 'fs/promises';
import { file } from './file.js';


type Entry = {
    question: string,
    answer: number,
    test?: unknown
}

const jsonFile = file

const fixCalculations = async () => {
    const file = jsonFile['test-data']

    const fixedData : Entry[] = []

    for (const query of file) {
        const [num1, num2] = query.question.split(' + ').map((num: string) => parseInt(num))
        const answer = num1 + num2
        let correctEntry: Entry = {
            "question": query.question,
            "answer": answer
        }
        if(query.test){
            const prompt = `Answer question inside brackets. Don't say anything else. (${query.test.q})`
            const [result] = await sendPromptsToChat([prompt], chatAdress)
            correctEntry = {
                ...correctEntry,
                "test": {
                    "q": query.test.q,
                    "a": result
                }
            }
        }
        fixedData.push(correctEntry)
    }
    return fixedData
}



fixCalculations().then(res => {
    const resultFile = {
        ...jsonFile,
        "test-data": res
    }
    writeFile('correct.json', JSON.stringify(resultFile))
})


