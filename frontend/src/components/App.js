import {Layer, Stage} from "react-konva";
import React, {useRef, useState} from "react";
import SlideStructure from "./screenParts/editor/SlideStructure";
import LessonStructure from "./screenParts/editor/LessonStructure";
import Templates from "./screenParts/editor/Templates";
import UpScreenEditor from "./screenParts/UpScreenEditor";
import GameElements from "./screenParts/editor/GameElements";
import BaseElements from "./screenParts/editor/BaseElements";
import ElementSettings from "./screenParts/editor/ElementSettings";
import CenterScreenEditor from "./screenParts/editor/CenterScreenEditor";
import DownScreenUser from "./screenParts/user/DownScreenUser";
import LeftScreenUser from "./screenParts/user/LeftScreenUser";
import RightScreenUser from "./screenParts/user/RightScreenUser";
import CenterScreenUser from "./screenParts/user/CenterScreenUser";
import Konva from "konva";

function App() {
    const [ellipses, setEllipses] = useState([]);
    const [texts, setTexts] = useState([]);
    const [tests, setTests] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [images, setImages] = useState([]);
    const [textquests, setTextquests] = useState([]);

    const [counterCommon, setCounterCommon] = useState(1);
    const [counterEllipse, setCounterEllipse] = useState(1);
    const [counterText, setCounterText] = useState(1);
    const [counterRectangle, setCounterRectangle] = useState(1);
    const [counterImage, setCounterImage] = useState(1);
    const [counterTest, setCounterTest] = useState(1);
    const [counterFlashcards, setCounterFlashcards] = useState(1);
    const [counterTextquest, setCounterTextquest] = useState(1);


    const [selectedShape, selectShape] = useState(null);
    const [settings, setSettings] = useState("");
    const [field, setField] = useState(1);
    const [numFields, setNumFields] = useState([1, 2, 3]);
    const [isEditorMode, setEditorMode] = useState(true);

    const getElements = new Map([
        ['text', texts],
        ['ellipse', ellipses],
        ['test', tests],
        ['flashcards', flashcards],
        ['rectangle', rectangles],
        ['image', images],
        ['textquest', textquests],
    ]);

    const setElements = new Map([
        ['text', setTexts],
        ['ellipse', setEllipses],
        ['test', setTests],
        ['flashcards', setFlashcards],
        ['rectangle', setRectangles],
        ['image', setImages],
        ['textquest', setTextquests],
    ]);

    const getGlobal = new Map([
        ['settings', settings],
        ['selectedShape', selectedShape],
        ['editor', isEditorMode],
        ['field', field],
        ['numFields', numFields],
    ]);

    const setGlobal = new Map([
        ['settings', setSettings],
        ['selectedShape', selectShape],
        ['editor', setEditorMode],
        ['field', setField],
        ['numFields', setNumFields],
    ]);

    const getCounter = new Map([
        ['text', counterText],
        ['ellipse', counterEllipse],
        ['test', counterTest],
        ['flashcards', counterFlashcards],
        ['rectangle', counterRectangle],
        ['image', counterImage],
        ['textquest', counterTextquest],
        ['common', counterCommon],
    ]);

    const setCounter = new Map([
        ['text', setCounterText],
        ['ellipse', setCounterEllipse],
        ['test', setCounterTest],
        ['flashcards', setCounterFlashcards],
        ['rectangle', setCounterRectangle],
        ['image', setCounterImage],
        ['textquest', setCounterTextquest],
        ['common', setCounterCommon],
    ]);

    const mainWidth = window.innerWidth;
    const mainHeight = window.innerHeight;

    const stageRef = useRef(null);
    const layerRef = useRef(null);

    const checkRemove = (e) => {
        console.log(e.keyCode);

        const stage = stageRef.current;

        if (selectedShape?.id != null && e.keyCode === 46) {
            const element = selectedShape?.id.replace(/[0-9]/g, '');
            setElements.get(element)(getElements.get(element).filter(item => selectedShape?.id !== item.id));

            setSettings("");
            selectShape(null);
        }
    };

    function getLineGuideStops(skipShape) {
        // we can snap to stage borders and the center of the stage
        const vertical = [mainWidth * 0.1 + 1, mainWidth * 0.5, mainWidth * 0.9 - 1];
        const horizontal = [mainHeight * 0.05 + 1, mainHeight * 0.42875, mainHeight * 0.8075 - 1];

        // and we snap over edges and center of each object on the canvas
        stageRef.current.find('.object').forEach((guideItem) => {
            if (guideItem === skipShape) {
                return;
            }
            const box = guideItem.getClientRect();
            // and we can snap to all edges of shapes
            vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
            horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
        });
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    }

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    function getObjectSnappingEdges(node) {
        const box = node.getClientRect();
        const absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    }

    // find all snapping possibilities
    function getGuides(lineGuideStops, itemBounds) {
        const resultV = [];
        const resultH = [];

        lineGuideStops.vertical.forEach((lineGuide) => {
            itemBounds.vertical.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < 5) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide) => {
            itemBounds.horizontal.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < 5) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        const guides = [];

        // find closest snap
        const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    }

    function drawGuides(guides) {
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                const line = new Konva.Line({
                    points: [mainWidth * 0.1 + 1, 0, mainWidth * 0.9 - 1, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 2,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layerRef.current.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                const line = new Konva.Line({
                    points: [0, mainHeight * 0.05 + 1, 0, mainHeight * 0.8075 - 1],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 2,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layerRef.current.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }

    return (
        <div tabIndex={1} onKeyDown={checkRemove}>
            <Stage
                x={0}
                y={0}
                width={mainWidth}
                height={mainHeight}
                ref={stageRef}
            >
                <Layer
                    ref={layerRef}
                    onDragMove={(e) => {
                        // clear all previous lines on the screen
                        layerRef.current.find('.guid-line').forEach((l) => l.destroy());

                        // find possible snapping lines
                        const lineGuideStops = getLineGuideStops(e.target);
                        // find snapping points of current object
                        const itemBounds = getObjectSnappingEdges(e.target);

                        // now find where can we snap current object
                        const guides = getGuides(lineGuideStops, itemBounds);

                        // do nothing of no snapping
                        if (!guides.length) {
                            return;
                        }

                        drawGuides(guides);

                        const absPos = e.target.absolutePosition();
                        // now force object position
                        guides.forEach((lg) => {
                            switch (lg.snap) {
                                case 'start': {
                                    switch (lg.orientation) {
                                        case 'V': {
                                            absPos.x = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        case 'H': {
                                            absPos.y = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                    break;
                                }
                                case 'center': {
                                    switch (lg.orientation) {
                                        case 'V': {
                                            absPos.x = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        case 'H': {
                                            absPos.y = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                    break;
                                }
                                case 'end': {
                                    switch (lg.orientation) {
                                        case 'V': {
                                            absPos.x = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        case 'H': {
                                            absPos.y = lg.lineGuide + lg.offset;
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        });
                        e.target.absolutePosition(absPos);
                    }}

                    onDragEnd={(e) => {
                        // clear all previous lines on the screen
                        layerRef.current.find('.guid-line').forEach((l) => l.destroy());
                    }}
                >
                    {isEditorMode && (
                        <CenterScreenEditor
                            stage={stageRef}
                            getElem={getElements}
                            setElem={setElements}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <BaseElements
                            setElem={setElements}
                            getElem={getElements}
                            setCount={setCounter}
                            getCount={getCounter}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <GameElements
                            getElem={getElements}
                            setElem={setElements}
                            setCount={setCounter}
                            getCount={getCounter}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <SlideStructure
                            stage={stageRef}
                            getElem={getElements}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <LessonStructure
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <ElementSettings
                            layer={layerRef}
                            stage={stageRef}
                            getElem={getElements}
                            setElem={setElements}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {isEditorMode && (
                        <Templates
                            getElem={getElements}
                            setElem={setElements}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                            setCount={setCounter}
                            getCount={getCounter}
                        />
                    )}

                    {!isEditorMode && (
                        <CenterScreenUser
                            getElem={getElements}
                            setElem={setElements}
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {!isEditorMode && (
                        <DownScreenUser
                            getGlob={getGlobal}
                            setGlob={setGlobal}
                        />
                    )}

                    {!isEditorMode && (
                        <LeftScreenUser/>
                    )}

                    {!isEditorMode && (
                        <RightScreenUser/>
                    )}

                    <UpScreenEditor
                        getElem={getElements}
                        setElem={setElements}
                        getCount={getCounter}
                        setCount={setCounter}
                        getGlob={getGlobal}
                        setGlob={setGlobal}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default App;
