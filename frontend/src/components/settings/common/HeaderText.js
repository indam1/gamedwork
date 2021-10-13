import {settingsWidth} from "../../functions/Consts";
import {Text} from "react-konva";
import React from "react";

function HeaderText(props) {
    return(
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={settingsWidth}
                y={props.y}
                height={60}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
        </React.Fragment>
    )
}

export default HeaderText;