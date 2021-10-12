import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editListSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";

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
                <Text
                    text={"Горизонтальный радиус:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    y={10}
                    height={60}
                    fill={"white"}

                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Text
                    text={selectedShape?.radiusX}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10}
                    x={settingsWidth / 2}
                    ref={radiusXRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(radiusXRef.current, props.stage, selectedShape, ellipses, setEllipses, "radiusX");
                    }}
                />
                <Text
                    text={"Вертикальный радиус:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    y={10 + 60 * 1}
                    height={60}
                    fill={"white"}

                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Text
                    text={selectedShape?.radiusY}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10 + 60 * 1}
                    x={settingsWidth / 2}
                    ref={radiusYRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(radiusYRef.current, props.layer, props.stage, selectedShape, ellipses, setEllipses, "radiusY");
                    }}
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