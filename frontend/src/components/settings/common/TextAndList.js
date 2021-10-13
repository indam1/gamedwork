import {Text} from "react-konva";
import {settingsWidth} from "../../functions/Consts";
import {editListSettings} from "../../functions/Functions";
import React, {useRef} from "react";

function TextAndList(props) {
    const fieldRef = useRef();

    return (
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={settingsWidth / 2}
                height={60}
                y={props.y}
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
                x={settingsWidth / 2}
                y={props.y}
                ref={fieldRef}

                align={"center"}
                verticalAlign={"middle"}

                onClick={(e) => {
                    editListSettings(fieldRef.current, props.layer, props.stage, props.options, props.selectedShape, props.elems, props.setElems, props.attrName);
                }}
            />
        </React.Fragment>
    )
}

export default TextAndList;