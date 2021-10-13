import {Circle, Group, Text} from "react-konva";
import {settingsWidth} from "../../functions/Consts";
import {editColorSettings} from "../../functions/Functions";
import React, {useRef} from "react";

function TextAndColor(props) {
    const colorRef = useRef();

    return (
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={settingsWidth / 2}
                y={props.y}
                height={60}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
            <Group
                width={settingsWidth / 2}
                height={60}
                x={settingsWidth / 2}
                y={props.y}
            >
                <Circle
                    fill={props.attr}

                    ref={colorRef}

                    stroke={"white"}
                    strokeWidth={3}

                    x={settingsWidth / 4}
                    y={25}
                    radius={15}

                    onClick={() => {
                        editColorSettings(colorRef.current, props.stage, props.selectedShape, props.elems, props.setElems, props.attrName);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default TextAndColor;