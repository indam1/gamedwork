import {mainWidth, mainHeight} from "../functions/Consts";

export const mainEllipse = (props) => {
    props.setElem.get('ellipse')((prevEllipses) => [
        ...prevEllipses,
        {
            counter: props.getCount.get('common'),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            radiusX: 25,
            radiusY: 25,
            fill: "#000002",
            id: 'ellipse' + props.getCount.get('ellipse').toString(),
            field: props.getGlob.get('field').toString(),
            name: 'object',
        }
    ]);
    props.setCount.get('ellipse')(props.getCount.get('ellipse') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}