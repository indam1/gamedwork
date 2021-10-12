import {mainWidth, mainHeight} from "../functions/Consts";

export const mainImage = (props) => {
    props.setElem.get('image')((prevImages) => [
        ...prevImages,
        {
            counter: props.getCount.get('common'),
            x: mainWidth * 0.8 / 2,
            y: mainHeight * 0.7575 / 2,
            width: 25,
            height: 25,
            fill: "#000002",
            id: 'image' + props.getCount.get('image').toString(),
            field: props.getGlob.get('field').toString(),
            name: 'object',
            src: 'enter link',
        }
    ]);
    props.setCount.get('image')(props.getCount.get('image') + 1);
    props.setCount.get('common')(props.getCount.get('common') + 1);
}