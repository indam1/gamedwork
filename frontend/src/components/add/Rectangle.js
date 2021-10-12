import {mainWidth, mainHeight} from "../functions/Consts";

export const mainRectangle = (props) => {
    props.setElem.get('rectangle')((prevRectangles) => [
        ...prevRectangles,
        {
            counter: props.getCount.get('common'),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            width: 25,
            height: 25,
            fill: "#000002",
            id: 'rectangle' + props.getCount.get('rectangle').toString(),
            field: props.getGlob.get('field').toString(),
            name: 'object',
        }
    ]);
    props.setCount.get('rectangle')(props.getCount.get('rectangle') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}