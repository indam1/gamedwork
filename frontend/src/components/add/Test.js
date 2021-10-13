import {mainWidth, mainHeight} from "../functions/Consts";

export const mainTest = (props) => {
    props.setElem.get('test')((prevTests) => [
        ...prevTests,
        {
            id: 'test' + props.getCount.get('test').toString(),
            curQuestion: 0,
            counter: props.getCount.get('common'),
            field: props.getGlob.get('field').toString(),

            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,

            height: 300,
            width: 300,
            fill: "#000002",
            cornerRadius: 0,

            answer: {
                height: 40,
                width: 40,
                backgroundFill: "#FFFFFE",
                textFill: "#000002",
                fontSize: 16,
                cornerRadius: 0,
                fontFamily: "Arial",
                visible: false,
            },
            button: {
                x: 0,
                y: 60,
                text: "старт",
                height: 25,
                width: 50,
                backgroundFill: "#FFFFFE",
                textFill: "#000002",
                fontSize: 16,
                cornerRadius: 0,
                fontFamily: "Arial",
                visible: true,
            },
            theme: {
                text: "Theme",
                x: 0,
                y: 0,
                fontSize: 32,
                fill: "#FFFFFE",
                fontFamily: "Arial",
            },
            question: {
                visible: false,
                x: 0,
                y: 40,
                fontSize: 24,
                fill: "#FFFFFE",
                fontFamily: "Arial",
            },
            questions: [
                {
                    text: "Question1",
                    answers: [
                        {
                            x: 10,
                            y: 100,
                            text: "ответ 1",
                        },
                        {
                            x: 70,
                            y: 100,
                            text: "ответ 2",
                        },
                        {
                            x: 10,
                            y: 200,
                            text: "ответ 3",
                        },
                        {
                            x: 70,
                            y: 200,
                            text: "ответ 4",
                        }
                    ],
                    result: null,
                },
            ],
            result: {
                x: 0,
                y: 160,
                fontSize: 24,
                fill: "#FFFFFE",
                text: "Result",
                visible: false,
                fontFamily: "Arial",
            },
        }
    ]);
    props.setCount.get('test')(props.getCount.get('test') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}

export const testTemplate1 = (props) => {
    props.setElem.get('test')((prevTests) => [
        ...prevTests,
        {
            id: 'test' + props.getCount.get('test').toString(),
            curQuestion: 0,
            counter: props.getCount.get('common'),
            field: props.getGlob.get('field').toString(),

            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,

            height: 280,
            width: 442,
            fill: "#FFFFFE",
            cornerRadius: 15,

            theme: {
                text: "Theme",
                x: 165.5,
                y: 18,
                fontSize: 32,
                fill: "#5753C9",
                fontFamily: "Montserrat",
            },
            button: {
                x: 139,
                y: 207,
                text: "старт",
                height: 34,
                width: 161,
                backgroundFill: "#5753C9",
                textFill: "#FFFFFE",
                fontSize: 16,
                cornerRadius: 5,
                fontFamily: "Montserrat",
                visible: true,
            },
            question: {
                x: 33,
                y: 58,
                fontSize: 20,
                fill: "#868C92",
                fontFamily: "Montserrat",
                visible: false,
            },
            answer: {
                height: 34,
                width: 161,
                backgroundFill: "#5753C9",
                textFill: "#FFFFFE",
                fontSize: 16,
                cornerRadius: 5,
                fontFamily: "Montserrat",
                visible: false,
            },
            questions: [
                {
                    text: "Question1",
                    answers: [
                        {
                            text: "ответ 1",
                            x: 33,
                            y: 105,
                        },
                        {
                            x: 248,
                            y: 105,
                            text: "ответ 2",
                        },
                        {
                            x: 33,
                            y: 158,
                            text: "ответ 3",
                        },
                        {
                            x: 248,
                            y: 158,
                            text: "ответ 4",
                        }
                    ],
                    result: null,
                }
            ],
            result: {
                x: 200,
                y: 255,
                fontSize: 14,
                fill: "green",
                text: "Result",
                visible: false,
                fontFamily: "Montserrat",
            },
        }
    ]);
    props.setCount.get('test')(props.getCount.get('test') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}