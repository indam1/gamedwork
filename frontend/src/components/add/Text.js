import {mainWidth, mainHeight} from "../functions/Consts";

export const mainText = (props) => {
    props.setElem.get('text')((prevTexts) => [
        ...prevTexts,
        {
            counter: props.getCount.get('common'),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            fontSize: 24,
            text: "Something",
            fill: "#000002",
            id: 'text' + props.getCount.get('text').toString(),
            field: props.getGlob.get('field').toString(),
            name: 'object',
            fontFamily: "Arial",
        }
    ]);
    props.setCount.get('text')(props.getCount.get('text') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}