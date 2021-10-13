import {mainWidth, mainHeight} from "../functions/Consts";

export const mainFlashcards = (props) => {
    props.setElem.get('flashcards')((prevFlashcards) => [
        ...prevFlashcards,
        {
            counter: props.getCount.get('common'),
            field: props.getGlob.get('field').toString(),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            height: 200,
            width: 200,
            fontSize: 24,
            cornerRadius: 0,
            fill: "#000002",
            theme: {
                text: "Theme",
                x: 0,
                y: 0,
                fontSize: 32,
                fontFamily: "Arial",
                fill: "#FFFFFE",
            },
            word: {
                text: "word",
                x: 0,
                y: 35,
                fontSize: 20,
                fontFamily: "Arial",
                fill: "#FFFFFE",
            },
            meaning: {
                text: "meaning",
                x: 0,
                y: 60,
                fontSize: 20,
                fontFamily: "Arial",
                fill: "#FFFFFE",
            },
            input: {
                x: 0,
                y: 90,
                width: 150,
                height: 25,
                fontSize: 20,
            },
            button: {
                align: 'center',
                verticalAlign: 'middle',
                cornerRadius: 0,
                x: 0,
                y: 130,
                width: 40,
                height: 40,
                fontSize: 16,
                fontFamily: "Arial",
                backgroundFill: "#FFFFFE",
                textFill: "#000002",
                text: "start",
            },
            result: {
                x: 0,
                y: 180,
                fontSize: 14,
                fontFamily: "Arial",
                fill: "#FFFFFE",
                text: "result",
                answer: null,
                visible: false,
            },
            pairs: [],
            id: 'flashcards' + props.getCount.get('flashcards').toString(),
        }
    ]);
    props.setCount.get('flashcards')(props.getCount.get('flashcards') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}


export const flashcardsTemplate1 = (props) => {
    props.setElem.get('flashcards')((prevFlashcards) => [
        ...prevFlashcards,
        {
            counter: props.getCount.get('common'),
            field: props.getGlob.get('field').toString(),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            height: 253,
            width: 215,
            fontSize: 24,
            cornerRadius: 15,
            fill: "#FFFFFE",
            theme: {
                fontFamily: "Montserrat",
                text: "Theme",
                x: 50,
                y: 16,
                fontSize: 32,
                fill: "#5753C9",
            },
            word: {
                align: 'center',
                verticalAlign: 'middle',
                fontFamily: "Montserrat",
                text: "word",
                x: 81,
                y: 56,
                fontSize: 20,
                fill: "#868C92",
            },
            meaning: {
                align: 'center',
                verticalAlign: 'middle',
                fontFamily: "Montserrat",
                text: "meaning",
                x: 61,
                y: 93,
                fontSize: 20,
                fill: "#868C92",
            },
            input: {
                x: 30,
                y: 145,
                width: 158,
                height: 25,
                fontSize: 20,
            },
            button: {
                align: 'center',
                verticalAlign: 'middle',
                fontFamily: "Montserrat",
                cornerRadius: 5,
                x: 29,
                y: 182,
                width: 161,
                height: 34,
                fontSize: 16,
                backgroundFill: "#5753C9",
                textFill: "#FFFFFE",
                text: "start",
            },
            result: {
                fontFamily: "Montserrat",
                x: 90,
                y: 225,
                fontSize: 14,
                fill: "#3DA556",
                text: "result",
                answer: null,
                visible: false,
            },
            pairs: [],
            id: 'flashcards' + props.getCount.get('flashcards').toString(),
        }
    ]);
    props.setCount.get('flashcards')(props.getCount.get('flashcards') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}