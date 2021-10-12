import React from "react";
import {Group, Rect} from "react-konva";
import EllipseElementEditor from "../../elements/editor/EllipseElementEditor";
import TextElementEditor from "../../elements/editor/TextElementEditor";
import TestElementEditor from "../../elements/editor/TestElementEditor";
import FlashcardsElementEditor from "../../elements/editor/FlashcardsElementEditor";
import RectangleElementEditor from "../../elements/editor/RectangleElementEditor";
import ImageElementEditor from "../../elements/editor/ImageElementEditor";
import TextquestElementEditor from "../../elements/editor/TextquestElementEditor";
import {mainWidth, mainHeight} from "../../functions/Consts";

function CenterScreenEditor(props) {
    const selectShape = props.setGlob.get('selectedShape');
    const setSettings = props.setGlob.get('settings');
    const selectedShape = props.getGlob.get('selectedShape');

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clicked = e.target;
        if (clicked.hasName('field')) {
            setSettings("");
            selectShape(null);
        }
    };

    return (
        <React.Fragment>
            <Group
                x={mainWidth * 0.1}
                y={mainHeight * 0.05}
                width={mainWidth * 0.8}
                height={mainHeight * 0.7575}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Rect
                    name={"field"}
                    fill={"#f2f2f2"}
                    x={0}
                    y={0}
                    width={mainWidth * 0.8}
                    height={mainHeight * 0.7575}
                    stroke={"#f2f2f2"}
                />
                {props.getElem.get('ellipse').map((eachEllipse, i) => (
                    eachEllipse.field === props.getGlob.get('field').toString() && (<EllipseElementEditor
                        key={i}

                        shapeProps={eachEllipse}

                        onSelect={(e) => {
                            selectShape(eachEllipse);
                            setSettings('Ellipse');
                        }}

                        isSelected={eachEllipse.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const circs = props.getElem.get('ellipse').slice();
                            circs[i] = newAttrs;
                            props.setElem.get('ellipse')(circs);
                            selectShape(circs[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('text').map((eachText, i) => (
                    eachText.field === props.getGlob.get('field').toString() && (<TextElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachText}

                        onSelect={() => {
                            selectShape(eachText);
                            setSettings('Text');
                        }}

                        isSelected={eachText.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const txts = props.getElem.get('text').slice();
                            txts[i] = newAttrs;
                            props.setElem.get('text')(txts);
                            selectShape(txts[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('test').map((eachTest, i) => (
                    eachTest.field === props.getGlob.get('field').toString() && (<TestElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachTest}

                        onSelect={() => {
                            selectShape(eachTest);
                            setSettings('Test');
                        }}

                        isSelected={eachTest.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const tsts = props.getElem.get('test').slice();
                            tsts[i] = newAttrs;
                            props.setElem.get('test')(tsts);
                            selectShape(tsts[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('flashcards').map((eachFlashcards, i) => (
                    eachFlashcards.field === props.getGlob.get('field').toString() && (<FlashcardsElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachFlashcards}

                        onSelect={() => {
                            selectShape(eachFlashcards);
                            setSettings('Flashcards');
                        }}

                        isSelected={eachFlashcards.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const flcs = props.getElem.get('flashcards').slice();
                            flcs[i] = newAttrs;
                            props.setElem.get('flashcards')(flcs);
                            selectShape(flcs[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('rectangle').map((eachRectangle, i) => (
                    eachRectangle.field === props.getGlob.get('field').toString() && (<RectangleElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachRectangle}

                        onSelect={() => {
                            selectShape(eachRectangle);
                            setSettings('Rectangle');
                        }}

                        isSelected={eachRectangle.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const rcts = props.getElem.get('rectangle').slice();
                            rcts[i] = newAttrs;
                            props.setElem.get('rectangle')(rcts);
                            selectShape(rcts[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('image').map((eachImage, i) => (
                    eachImage.field === props.getGlob.get('field').toString() && (<ImageElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachImage}

                        onSelect={() => {
                            selectShape(eachImage);
                            setSettings('Image');
                        }}

                        isSelected={eachImage.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const imgs = props.getElem.get('image').slice();
                            imgs[i] = newAttrs;
                            props.setElem.get('image')(imgs);
                            selectShape(imgs[i]);
                        }}
                    />)
                ))}

                {props.getElem.get('textquest').map((eachTextquest, i) => (
                    eachTextquest.field === props.getGlob.get('field').toString() && (<TextquestElementEditor
                        key={i}

                        onTextEdit={props.stage}

                        shapeProps={eachTextquest}

                        onSelect={() => {
                            selectShape(eachTextquest);
                            setSettings('Textquest');
                        }}

                        isSelected={eachTextquest.id === selectedShape?.id}

                        onChange={(newAttrs) => {
                            const tqts = props.getElem.get('textquest').slice();
                            tqts[i] = newAttrs;
                            props.setElem.get('textquest')(tqts);
                            selectShape(tqts[i]);
                        }}
                    />)
                ))}
            </Group>
        </React.Fragment>

    );
}

export default CenterScreenEditor;