import React from "react";
import {Group} from "react-konva";
import {mainWidth} from "../functions/Consts";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import TextAndList from "./common/TextAndList";

function TextSettings(props) {

    const options = ["Cursive", "Fantasy", "Verdana", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

    const selectedShape = props.getGlob.get('selectedShape');
    const texts = props.getElem.get('text');
    const setTexts = props.setElem.get('text');

    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndTextarea
                    y={10}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={texts}
                    setElems={setTexts}
                    attrName={"fontSize"}
                    attr={selectedShape.fontSize}
                />
                <TextAndList
                    y={10 + 60 * 1}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={texts}
                    setElems={setTexts}
                    attrName={"fontFamily"}
                    attr={selectedShape.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={texts}
                    setElems={setTexts}
                />

            </Group>
        </React.Fragment>
    );
}

export default TextSettings;