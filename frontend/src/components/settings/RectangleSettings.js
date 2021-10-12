import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";

function RectangleSettings(props) {

    const selectedShape = props.getGlob.get('selectedShape');
    const rectangles = props.getElem.get('rectangle');
    const setRectangles = props.setElem.get('rectangle');

    const heightRef = useRef();
    const widthRef = useRef();
    const colorRef = useRef();

    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndTextarea
                    y={10}
                    text={"Ширина:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={rectangles}
                    setElems={setRectangles}
                    attrName={"width"}
                    attr={selectedShape.width}
                />
                <TextAndTextarea
                    y={10 + 60 * 1}
                    text={"Высота:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={rectangles}
                    setElems={setRectangles}
                    attrName={"height"}
                    attr={selectedShape.height}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={rectangles}
                    setElems={setRectangles}
                />
            </Group>
        </React.Fragment>
    );
}

export default RectangleSettings;