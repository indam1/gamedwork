import {Text} from "react-konva";
import {settingsWidth} from "../../functions/Consts";
import {editTextSettings} from "../../functions/Functions";
import React, {useRef} from "react";

function TextAndTextarea(props) {
    const fieldRef = useRef();

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
            <Text
                text={props.attr}
                fontFamily={"monospace"}
                fill={"white"}
                fontSize={14}
                width={settingsWidth / 2}
                height={60}
                y={props.y}
                x={settingsWidth / 2}
                ref={fieldRef}

                align={"center"}
                verticalAlign={"middle"}

                onClick={() => {
                    editTextSettings(fieldRef.current, props.stage, props.selectedShape, props.elems, props.setElems, props.attrName);
                }}
            />
        </React.Fragment>)
}

export default TextAndTextarea;