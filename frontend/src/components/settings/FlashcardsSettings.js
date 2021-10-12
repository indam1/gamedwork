import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";

function FlashcardsSettings(props) {

    const selectedShape = props.getGlob.get('selectedShape');
    const flashcards = props.getElem.get('flashcards');
    const setFlashcards = props.setElem.get('flashcards');

    const options = ["Cursive", "Fantasy", "Montserrat", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

    const colorRef = useRef();

    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                {/*<Html>*/}
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет фона:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.fill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flashcards.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Радиус углов:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.cornerRadius = Number(e.target.value);*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.cornerRadius} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Тема:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.theme.fontSize = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.theme?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.theme.fontFamily = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.theme?.fontFamily}>*/}
                {/*                {options.map((eachOption, i) => (*/}
                {/*                    <option key={i} value={eachOption}>{eachOption}</option>*/}
                {/*                ))}*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.theme.fill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.theme?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Слово:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.word.fontSize = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.word?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.word.fontFamily = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.word?.fontFamily}>*/}
                {/*                {options.map((eachOption, i) => (*/}
                {/*                    <option key={i} value={eachOption}>{eachOption}</option>*/}
                {/*                ))}*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.word.fill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.word?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Значение:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.meaning.fontSize = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.meaning?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.meaning.fontFamily = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.meaning?.fontFamily}>*/}
                {/*                {options.map((eachOption, i) => (*/}
                {/*                    <option key={i} value={eachOption}>{eachOption}</option>*/}
                {/*                ))}*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.meaning.fill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.meaning?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Кнопка:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.fontSize = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.button?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.fontFamily = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.button?.fontFamily}>*/}
                {/*                {options.map((eachOption, i) => (*/}
                {/*                    <option key={i} value={eachOption}>{eachOption}</option>*/}
                {/*                ))}*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.textFill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.button?.textFill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет фона:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.backgroundFill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flashcards.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.button?.backgroundFill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Радиус углов:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.cornerRadius = Number(e.target.value);*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.button?.cornerRadius} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Ширина:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.width = Number(e.target.value);*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.button?.width} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Высота:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.button.height = Number(e.target.value);*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.button?.height} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Результат:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.result.fontSize = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.result?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.result.fontFamily = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} value={selectedShape?.result?.fontFamily}>*/}
                {/*                {options.map((eachOption, i) => (*/}
                {/*                    <option key={i} value={eachOption}>{eachOption}</option>*/}
                {/*                ))}*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.result.fill = e.target.value;*/}
                {/*                const flcs = flashcards.slice();*/}
                {/*                flcs[flcs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(flcs);*/}
                {/*            }} type={"color"} value={selectedShape?.result?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Добавить пару:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.pairs = [...newAttrs.pairs, {*/}
                {/*                    word: "",*/}
                {/*                    meaning: "",*/}
                {/*                    size: 30,*/}
                {/*                    textFill: "white",*/}
                {/*                }];*/}
                {/*                const fcds = flashcards.slice();*/}
                {/*                fcds[fcds.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(fcds);*/}
                {/*            }} value={'+'}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    {selectedShape?.pairs?.map((eachPair, i) => (*/}
                {/*        <div key={i} style={{*/}
                {/*            display: "flex",*/}
                {/*            flexDirection: "row",*/}
                {/*            alignItems: 'center',*/}
                {/*            justifyContent: 'center',*/}
                {/*        }}>*/}

                {/*            <div style={style.third}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.pairs[i].word = e.target.value;*/}
                {/*                const fcds = flashcards.slice();*/}
                {/*                fcds[fcds.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(fcds);*/}
                {/*            }} value={selectedShape?.pairs[i]?.word} rows={1}/>*/}
                {/*            </div>*/}

                {/*            <div style={style.third}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.pairs[i].meaning = e.target.value;*/}
                {/*                const fcds = flashcards.slice();*/}
                {/*                fcds[fcds.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setFlashcards(fcds);*/}
                {/*            }} value={selectedShape?.pairs[i]?.meaning} rows={1}/>*/}
                {/*            </div>*/}

                {/*            <div style={style.third}>*/}
                {/*                <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                    const newAttrs = selectedShape;*/}
                {/*                    newAttrs.pairs = newAttrs.pairs.slice(0, newAttrs.pairs.length - 1);*/}
                {/*                    const fcds = flashcards.slice();*/}
                {/*                    fcds[fcds.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                    setFlashcards(fcds);*/}
                {/*                }} value={'-'}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</Html>*/}
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                />
                <Text
                    text={"Цвет фона:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    y={10}
                    height={60}
                    fill={"white"}

                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Group
                    width={settingsWidth / 2}
                    height={60}
                    x={settingsWidth / 2}
                    y={10}
                >
                    <Circle
                        fill={selectedShape?.fill}

                        ref={colorRef}

                        stroke={"white"}
                        strokeWidth={3}

                        x={settingsWidth / 4}
                        y={25}
                        radius={15}

                        onClick={() => {
                            editColorSettings(colorRef.current, props.stage, selectedShape, flashcards, setFlashcards);
                        }}
                    />
                </Group>
                <Text
                    text={"Радиус углов:"}
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
                    text={selectedShape?.radiusX}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10 + 60 * 1}
                    x={settingsWidth / 2}
                    ref={radiusXRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(radiusXRef.current, props.stage, selectedShape, flashcards, setFlashcards);
                    }}
                />
                <Text
                    text={"Вертикальный радиус:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    y={10 + 60 * 2}
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
                    y={10 + 60 * 2}
                    x={settingsWidth / 2}
                    ref={radiusYRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(radiusYRef.current, props.layer, props.stage, selectedShape, flashcards, setFlashcards);
                    }}
                />

            </Group>
        </React.Fragment>
    );
}

export default FlashcardsSettings;