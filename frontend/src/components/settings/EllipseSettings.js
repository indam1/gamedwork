import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editListSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";

function EllipseSettings(props) {

    const selectedShape = props.getGlob.get('selectedShape');
    const ellipses = props.getElem.get('ellipse');
    const setEllipses = props.setElem.get('ellipse');

    const radiusXRef = useRef();
    const radiusYRef = useRef();
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
                    text={"Вертикальный радиус:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={ellipses}
                    setElems={setEllipses}
                    attrName={"radiusX"}
                    attr={selectedShape.radiusX}
                />
                <TextAndTextarea
                    y={10 + 60 * 1}
                    text={"Горизонтальный радиус:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={ellipses}
                    setElems={setEllipses}
                    attrName={"radiusY"}
                    attr={selectedShape.radiusY}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={ellipses}
                    setElems={setEllipses}
                />
            </Group>
        </React.Fragment>
    );
}

export default EllipseSettings;