import React from "react";
import {Group} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth} from "../functions/Consts";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import HeaderText from "./common/HeaderText";
import TextAndList from "./common/TextAndList";

function TestSettings(props) {

    const selectedShape = props.getGlob.get('selectedShape');
    const tests = props.getElem.get('test');
    const setTests = props.setElem.get('test');

    const options = ["Cursive", "Fantasy", "Montserrat", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} type={"color"} value={selectedShape?.theme?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Вопрос:</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Размер шрифта:</p>*/}
                {/*        </div>*/}
                
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.question.fontSize = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.question?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.question.fontFamily = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.question?.fontFamily}>*/}
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
                {/*                newAttrs.question.fill = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} type={"color"} value={selectedShape?.question?.fill}/>*/}
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
                {/*                newAttrs.answer.fontSize = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.answer?.fontSize} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Семейство шрифта:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <select style={style.select} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.answer.fontFamily = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.answer?.fontFamily}>*/}
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
                {/*                newAttrs.answer.textFill = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} type={"color"} value={selectedShape?.answer?.textFill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Цвет фона:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.color} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.answer.backgroundFill = e.target.value;*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} type={"color"} value={selectedShape?.answer?.backgroundFill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Радиус углов:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.answer.cornerRadius = Number(e.target.value);*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.answer?.cornerRadius} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Ширина:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.answer.width = Number(e.target.value);*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.answer?.width} maxLength={3} rows={1} cols={3}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Высота:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.answer.height = Number(e.target.value);*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={selectedShape?.answer?.height} maxLength={3} rows={1} cols={3}/>*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
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
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} type={"color"} value={selectedShape?.result?.fill}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                
                {/*    {selectedShape?.questions?.map((eachQuestion, i) => (*/}
                {/*        <div>*/}
                {/*            <div key={i} style={style.common}>*/}
                {/*                <div style={style.third}>*/}
                {/*                    <p style={style.text}>{eachQuestion.text}</p>*/}
                {/*                </div>*/}
                
                {/*                <div style={style.third}>*/}
                {/*                    <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                        console.log(i);*/}
                {/*                        const newAttrs = selectedShape;*/}
                {/*                        newAttrs.curQuestion = i;*/}
                {/*                        const tsts = tests.slice();*/}
                {/*                        tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                        setTests(tsts);*/}
                {/*                    }} value={'✓'}/>*/}
                {/*                </div>*/}
                
                {/*                <div style={style.third}>*/}
                {/*                    <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                        const newAttrs = selectedShape;*/}
                {/*                        newAttrs.questions= newAttrs.questions.filter(item => item !== newAttrs.questions[i]);*/}
                {/*                        const tsts = tests.slice();*/}
                {/*                        tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                        setTests(tsts);*/}
                {/*                    }} value={'-'}/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                
                {/*            <div key={i}>*/}
                {/*                {selectedShape?.questions[i].answers?.map((eachAnswer, j) => (*/}
                {/*                    <div key={j} style={style.common}>*/}
                
                {/*                        <div style={style.third}>*/}
                {/*                            <p style={style.text}>{selectedShape?.questions[i].answers[j].text}:</p>*/}
                {/*                        </div>*/}
                
                {/*                        <div style={style.third}>*/}
                {/*                            <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                                const newAttrs = selectedShape;*/}
                {/*                                newAttrs.questions[i].result = newAttrs.questions[i].answers[j];*/}
                {/*                                const tsts = tests.slice();*/}
                {/*                                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                                setTests(tsts);*/}
                {/*                            }} value={'✓'}/>*/}
                {/*                        </div>*/}
                
                {/*                        <div style={style.third}>*/}
                {/*                            <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                                const newAttrs = selectedShape;*/}
                {/*                                newAttrs.questions[i].answers = newAttrs.questions[i].answers.filter(item => item !== newAttrs.questions[i].answers[j]);*/}
                {/*                                const tsts = tests.slice();*/}
                {/*                                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                                setTests(tsts);*/}
                {/*                            }} value={'-'}/>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                {/*            </div>*/}
                
                {/*            <div key={i} style={style.common}>*/}
                {/*                <div style={style.half}>*/}
                {/*                    <p style={style.text}>Добавить ответ:</p>*/}
                {/*                </div>*/}
                {/*                <div style={style.half}>*/}
                {/*                    <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                        const newAttrs = selectedShape;*/}
                {/*                        newAttrs.questions[i].answers = [...newAttrs.questions[i].answers, {*/}
                {/*                            text: "Answer",*/}
                {/*                            x: 0,*/}
                {/*                            y: 0,*/}
                {/*                        }];*/}
                {/*                        const tsts = tests.slice();*/}
                {/*                        tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                        setTests(tsts);*/}
                {/*                    }} value={'+'}/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                
                {/*    <div style={style.common}>*/}
                {/*        <div style={style.half}>*/}
                {/*            <p style={style.text}>Добавить вопрос:</p>*/}
                {/*        </div>*/}
                {/*        <div style={style.half}>*/}
                {/*            <input style={style.button} type={"button"} onClick={() => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.questions = [...newAttrs.questions, {*/}
                {/*                    text: "Question",*/}
                {/*                    answers: [*/}
                {/*                        {*/}
                {/*                            text: "ответ 1",*/}
                {/*                        },*/}
                {/*                        {*/}
                {/*                            text: "ответ 2",*/}
                {/*                        },*/}
                {/*                        {*/}
                {/*                            text: "ответ 3",*/}
                {/*                        },*/}
                {/*                        {*/}
                {/*                            text: "ответ 4",*/}
                {/*                        }],*/}
                {/*                    result: null,*/}
                {/*                }];*/}
                {/*                const tsts = tests.slice();*/}
                {/*                tsts[tsts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setTests(tsts);*/}
                {/*            }} value={'+'}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Html>*/}

                <TextAndColor
                    y={10}
                    text={"Цвет фона:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"fill"}
                    attr={selectedShape.fill}
                />
                <TextAndTextarea
                    y={10 + 50 * 1}
                    text={"Радиус углов:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
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
                    elems={tests}
                    setElems={setTests}
                    attrName={"theme:fontSize"}
                    attr={selectedShape.theme.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 4}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
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
                    elems={tests}
                    setElems={setTests}
                    attrName={"theme:fill"}
                    attr={selectedShape.theme.fill}
                />
                <HeaderText
                    text={"Вопрос:"}
                    y={10 + 50 * 6}
                />
                <TextAndTextarea
                    y={10 + 50 * 7}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"question:fontSize"}
                    attr={selectedShape.question.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 8}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"question:fontFamily"}
                    attr={selectedShape.question.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 9}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"question:fill"}
                    attr={selectedShape.question.fill}
                />
                <HeaderText
                    text={"Ответ:"}
                    y={10 + 50 * 10}
                />
                <TextAndTextarea
                    y={10 + 50 * 11}
                    text={"Ширина:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:width"}
                    attr={selectedShape.answer.width}
                />
                <TextAndTextarea
                    y={10 + 50 * 12}
                    text={"Высота:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:height"}
                    attr={selectedShape.answer.height}
                />
                <TextAndTextarea
                    y={10 + 50 * 13}
                    text={"Радиус углов:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:cornerRadius"}
                    attr={selectedShape.answer.cornerRadius}
                />
                <TextAndColor
                    y={10 + 50 * 14}
                    text={"Цвет фона:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:backgroundFill"}
                    attr={selectedShape.answer.backgroundFill}
                />
                <TextAndTextarea
                    y={10 + 50 * 15}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:fontSize"}
                    attr={selectedShape.answer.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 16}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:fontFamily"}
                    attr={selectedShape.answer.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 17}
                    text={"Цвет шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"answer:textFill"}
                    attr={selectedShape.answer.textFill}
                />
                <HeaderText
                    text={"Кнопка:"}
                    y={10 + 50 * 18}
                />
                <TextAndTextarea
                    y={10 + 50 * 19}
                    text={"Ширина:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:width"}
                    attr={selectedShape.button.width}
                />
                <TextAndTextarea
                    y={10 + 50 * 20}
                    text={"Высота:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:height"}
                    attr={selectedShape.button.height}
                />
                <TextAndTextarea
                    y={10 + 50 * 21}
                    text={"Радиус углов:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:cornerRadius"}
                    attr={selectedShape.button.cornerRadius}
                />
                <TextAndColor
                    y={10 + 50 * 22}
                    text={"Цвет фона:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:backgroundFill"}
                    attr={selectedShape.button.backgroundFill}
                />
                <TextAndTextarea
                    y={10 + 50 * 23}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:fontSize"}
                    attr={selectedShape.button.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 24}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:fontFamily"}
                    attr={selectedShape.button.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 25}
                    text={"Цвет шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"button:textFill"}
                    attr={selectedShape.button.textFill}
                />
                <HeaderText
                    text={"Результат:"}
                    y={10 + 50 * 26}
                />
                <TextAndTextarea
                    y={10 + 50 * 27}
                    text={"Размер шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"result:fontSize"}
                    attr={selectedShape.result.fontSize}
                />
                <TextAndList
                    y={10 + 50 * 28}
                    text={"Семейство шрифта:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"result:fontFamily"}
                    attr={selectedShape.result.fontFamily}
                    options={options}
                    layer={props.layer}
                />
                <TextAndColor
                    y={10 + 50 * 29}
                    text={"Цвет:"}
                    selectedShape={selectedShape}
                    stage={props.stage}
                    elems={tests}
                    setElems={setTests}
                    attrName={"result:fill"}
                    attr={selectedShape.result.fill}
                />
            </Group>
        </React.Fragment>
    );
}

export default TestSettings;