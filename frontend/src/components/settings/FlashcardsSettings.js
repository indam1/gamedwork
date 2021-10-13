import React, {useRef} from "react";
import {Circle, Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editColorSettings, editTextSettings} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import HeaderText from "./common/HeaderText";
import TextAndList from "./common/TextAndList";

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
                y={50}
                width={mainWidth * 0.1 - 16}
            >
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
                    y={10}
                    text={"Цвет фона:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"fill"}
                    attr={selectedShape.fill}
                />
                <TextAndTextarea
                    y={10 + 50 * 1}
                    text={"Радиус углов:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"cornerRadius"}
                    attr={selectedShape.cornerRadius}
                />
                <HeaderText
                    text={"Тема:"}
                    y={10 + 50 * 2}
                />
                <TextAndTextarea
                    y={10 + 50 * 3}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"theme:fontSize"}
                    attr={selectedShape.theme.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 4}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"theme:fontFamily"}
                    attr={selectedShape.theme.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 5}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"theme:fill"}
                    attr={selectedShape.theme.fill}
                />
                <HeaderText
                    text={"Слово:"}
                    y={10 + 50 * 6}
                />
                <TextAndTextarea
                    y={10 + 50 * 7}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"word:fontSize"}
                    attr={selectedShape.word.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 8}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"word:fontFamily"}
                    attr={selectedShape.word.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 9}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"word:fill"}
                    attr={selectedShape.word.fill}
                />
                <HeaderText
                    text={"Значение:"}
                    y={10 + 50 * 10}
                />
                <TextAndTextarea
                    y={10 + 50 * 11}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"meaning:fontSize"}
                    attr={selectedShape.meaning.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 12}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"meaning:fontFamily"}
                    attr={selectedShape.meaning.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 13}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"meaning:fill"}
                    attr={selectedShape.meaning.fill}
                />
                <HeaderText
                    text={"Кнопка:"}
                    y={10 + 50 * 14}
                />
                <TextAndTextarea
                    y={10 + 50 * 15}
                    text={"Ширина:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:width"}
                    attr={selectedShape.button.width}
                />
                <TextAndTextarea
                    y={10 + 50 * 16}
                    text={"Высота:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:height"}
                    attr={selectedShape.button.height}
                />
                <TextAndTextarea
                    y={10 + 50 * 17}
                    text={"Радиус углов:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:cornerRadius"}
                    attr={selectedShape.button.cornerRadius}
                />
                <TextAndColor
                    y={10 + 50 * 18}
                    text={"Цвет фона:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:backgroundFill"}
                    attr={selectedShape.button.backgroundFill}
                />
                <TextAndTextarea
                    y={10 + 50 * 19}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:fontSize"}
                    attr={selectedShape.button.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 20}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:fontFamily"}
                    attr={selectedShape.button.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 21}
                    text={"Цвет шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"button:textFill"}
                    attr={selectedShape.button.textFill}
                />
                <HeaderText
                    text={"Результат:"}
                    y={10 + 50 * 22}
                />
                <TextAndTextarea
                    y={10 + 50 * 23}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"result:fontSize"}
                    attr={selectedShape.result.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 24}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"result:fontFamily"}
                    attr={selectedShape.result.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 25}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={flashcards}
                    setElems={setFlashcards}
                    attrName={"result:fill"}
                    attr={selectedShape.result.fill}
                />
            </Group>
        </React.Fragment>
    );
}

export default FlashcardsSettings;