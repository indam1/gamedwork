import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editListSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";

function TextSettings(props) {

    const options = ["Cursive", "Fantasy", "Verdana", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

    const selectedShape = props.getGlob.get('selectedShape');
    const texts = props.getElem.get('text');
    const setTexts = props.setElem.get('text');

    const fontSizeRef = useRef();
    const fontFamilyRef = useRef();
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
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={texts}
                    setElems={setTexts}
                    attrName={"fontSize"}
                    attr={selectedShape.fontSize}
                />

                <Text
                    text={"Семейство шрифта:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10 + 60 * 1}
                    fill={"white"}

                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Text
                    text={selectedShape?.fontFamily}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    x={settingsWidth / 2}
                    y={10 + 60 * 1}
                    ref={fontFamilyRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={(e) => {
                        editListSettings(fontFamilyRef.current, props.layer, props.stage, options, selectedShape, texts, setTexts);
                    }}
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