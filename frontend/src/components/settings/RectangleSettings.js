import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";

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
                <Text
                    text={"Ширина:"}
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
                    text={selectedShape?.width}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10}
                    x={settingsWidth / 2}
                    ref={widthRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(widthRef.current, props.stage, selectedShape, rectangles, setRectangles, "width");
                    }}
                />
                <Text
                    text={"Высота:"}
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
                    text={selectedShape?.height}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10 + 60 * 1}
                    x={settingsWidth / 2}
                    ref={heightRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(heightRef.current, props.layer, props.stage, selectedShape, rectangles, setRectangles, "height");
                    }}
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