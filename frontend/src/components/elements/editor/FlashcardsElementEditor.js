import React, {useEffect, useRef} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import {Html} from "react-konva-utils";
import * as Flashcards from "../../change/Flashcards";
import {dragBoundRef} from "../../functions/Functions";

function FlashcardsElementEditor({shapeProps, isSelected, onSelect, onTextEdit, onChange}) {
    const shapeRef = useRef();
    const trRef = useRef();
    const themeRef = useRef();
    const wordRef = useRef();
    const meaningRef = useRef();
    const resultRef = useRef();
    const buttonRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (

        <React.Fragment>
            <Group
                name={"object Flashcards"}
                onMouseDown={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}

                onDragEnd={(e) => {
                    if (e.target.name() === 'object Flashcards') {
                        Flashcards.changePosition(onChange, shapeProps, e);
                    }
                }}

                onTransformEnd={(e) => {
                    Flashcards.changeScale(onChange, shapeProps, e);
                }}
                draggable
            >
                <Rect
                    {...shapeProps}
                    name={"object Flashcards"}
                    x={0}
                    y={0}
                />
                <Text
                    fontFamily={shapeProps.theme.fontFamily}
                    x={shapeProps.theme.x}
                    y={shapeProps.theme.y}
                    draggable
                    name={"object Theme"}
                    listening
                    text={shapeProps.theme.text}
                    fill={shapeProps.theme.fill}
                    fontSize={shapeProps.theme.fontSize}
                    ref={themeRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Theme') {
                            Flashcards.changeThemePosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, themeRef.current, shapeProps);
                    }}

                    onDblClick={() => {
                        const textNode = themeRef.current;
                        const stageRef = onTextEdit;

                        // hide text node and transformer:
                        textNode.visible(false);
                        trRef.current.visible(false);

                        // create textarea over canvas with absolute position
                        // first we need to find position for textarea
                        // how to find it?

                        // at first lets find position of text node relative to the stage:
                        var textPosition = textNode.absolutePosition();

                        // so position of textarea will be the sum of positions above:
                        var areaPosition = {
                            x: stageRef.current.container().offsetLeft + textPosition.x,
                            y: stageRef.current.container().offsetTop + textPosition.y,
                        };

                        // create textarea and style it
                        var textarea = document.createElement('textarea');
                        document.body.appendChild(textarea);

                        // apply many styles to match text on canvas as close as possible
                        // remember that text rendering on canvas and on the textarea can be different
                        // and sometimes it is hard to make it 100% the same. But we will try...
                        textarea.value = textNode.text();
                        textarea.style.position = 'absolute';
                        textarea.style.top = areaPosition.y + 'px';
                        textarea.style.left = areaPosition.x + 'px';
                        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
                        textarea.style.height =
                            textNode.height() - textNode.padding() * 2 + 5 + 'px';
                        textarea.style.fontSize = textNode.fontSize() + 'px';
                        textarea.style.border = 'none';
                        textarea.style.padding = '0px';
                        textarea.style.margin = '0px';
                        textarea.style.overflow = 'hidden';
                        textarea.style.background = 'none';
                        textarea.style.outline = 'none';
                        textarea.style.resize = 'none';
                        textarea.style.lineHeight = textNode.lineHeight();
                        textarea.style.fontFamily = textNode.fontFamily();
                        textarea.style.transformOrigin = 'left top';
                        textarea.style.textAlign = textNode.align();
                        textarea.style.color = textNode.fill();
                        var rotation = textNode.rotation();
                        var transform = '';
                        if (rotation) {
                            transform += 'rotateZ(' + rotation + 'deg)';
                        }

                        var px = 0;
                        // also we need to slightly move textarea on firefox
                        // because it jumps a bit
                        var isFirefox =
                            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                        if (isFirefox) {
                            px += 2 + Math.round(textNode.fontSize() / 20);
                        }
                        transform += 'translateY(-' + px + 'px)';

                        textarea.style.transform = transform;

                        // reset height
                        textarea.style.height = 'auto';
                        // after browsers resized it we can set actual value
                        textarea.style.height = textarea.scrollHeight + 3 + 'px';

                        textarea.focus();

                        function removeTextarea() {
                            onChange({
                                ...shapeProps,
                                theme: {
                                    text: textarea.value,
                                    x: shapeProps.theme.x,
                                    y: shapeProps.theme.y,
                                    fill: shapeProps.theme.fill,
                                    fontSize: shapeProps.theme.fontSize,
                                    fontFamily: shapeProps.theme.fontFamily,
                                },
                            })
                            textarea.parentNode.removeChild(textarea);
                            window.removeEventListener('click', handleOutsideClick);
                            textNode.show();
                            trRef.current.show();
                            trRef.current.forceUpdate();
                        }

                        function setTextareaWidth(newWidth) {
                            if (!newWidth) {
                                // set width for placeholder
                                newWidth = textNode.placeholder.length * textNode.fontSize();
                            }
                            // some extra fixes on different browsers
                            var isSafari = /^((?!chrome|android).)*safari/i.test(
                                navigator.userAgent
                            );
                            var isFirefox =
                                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                            if (isSafari || isFirefox) {
                                newWidth = Math.ceil(newWidth);
                            }

                            var isEdge =
                                document.documentMode || /Edge/.test(navigator.userAgent);
                            if (isEdge) {
                                newWidth += 1;
                            }
                            textarea.style.width = newWidth + 'px';
                        }

                        textarea.addEventListener('keydown', function (e) {
                            // hide on enter
                            // but don't hide on shift + enter
                            if (e.keyCode === 13 && !e.shiftKey) {
                                textNode.text(textarea.value);
                                removeTextarea();
                            }
                            // on esc do not set value back to node
                            if (e.keyCode === 27) {
                                removeTextarea();
                            }
                        });

                        textarea.addEventListener('keydown', function (e) {
                            var scale = textNode.getAbsoluteScale().x;
                            setTextareaWidth(textNode.width() * scale);
                            textarea.style.height = 'auto';
                            textarea.style.height =
                                textarea.scrollHeight + textNode.fontSize() + 'px';
                        });

                        function handleOutsideClick(e) {
                            if (e.target !== textarea) {
                                textNode.text(textarea.value);
                                removeTextarea();
                            }
                        }

                        setTimeout(() => {
                            window.addEventListener('click', handleOutsideClick);
                        });
                    }}
                />
                <Text
                    fontFamily={shapeProps.word.fontFamily}
                    x={shapeProps.word.x}
                    y={shapeProps.word.y}
                    draggable
                    name={"object Word"}
                    listening
                    text={shapeProps.word.text}
                    fill={shapeProps.word.fill}
                    fontSize={shapeProps.word.fontSize}
                    align={shapeProps.word.align}
                    verticalAlign={shapeProps.word.verticalAlign}
                    ref={wordRef}


                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Word') {
                            Flashcards.changeWordPosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, wordRef.current, shapeProps);
                    }}
                />
                <Text
                    fontFamily={shapeProps.meaning.fontFamily}
                    x={shapeProps.meaning.x}
                    y={shapeProps.meaning.y}
                    draggable
                    name={"object Meaning"}
                    listening
                    text={shapeProps.meaning.text}
                    fill={shapeProps.meaning.fill}
                    fontSize={shapeProps.meaning.fontSize}
                    align={shapeProps.meaning.align}
                    verticalAlign={shapeProps.meaning.verticalAlign}
                    ref={meaningRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Meaning') {
                            Flashcards.changeMeaningPosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, meaningRef.current, shapeProps);
                    }}
                />

                <Text
                    fontFamily={shapeProps.result.fontFamily}
                    draggable
                    name={"object Result"}
                    listening
                    x={shapeProps.result.x}
                    y={shapeProps.result.y}
                    text={shapeProps.result.text}
                    fill={shapeProps.result.fill}
                    fontSize={shapeProps.result.fontSize}
                    ref={resultRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Result') {
                            Flashcards.changeResultPosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, resultRef.current, shapeProps);
                    }}
                />
                <Group
                    name={"object Input"}
                    draggable
                    x={shapeProps.input.x}
                    y={shapeProps.input.y}
                    width={shapeProps.input.width}
                    height={shapeProps.input.height + 20}
                    ref={inputRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Input') {
                            Flashcards.changeInputPosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, inputRef.current, shapeProps);
                    }}
                >
                    <Rect
                        name={"object Input"}
                        align={shapeProps.button.align}
                        verticalAlign={shapeProps.button.verticalAlign}
                        width={shapeProps.input.width}
                        height={shapeProps.input.height + 20}
                        fill={shapeProps.fill}
                    />
                    <Html>
                    <textarea style={{
                        overflow: "hidden",
                        borderRadius: 5,
                        border: `1px solid #5653C6`,
                        verticalAlign: "middle",
                        width: shapeProps.input.width,
                        height: shapeProps.input.height,
                        backgroundColor: "white",
                        color: "black",
                        resize: "none",
                        fontSize: shapeProps.input.fontSize,
                        textAlign: "center",
                        outline: "none",
                    }} rows={1}/>
                    </Html>
                </Group>
                <Group
                    name={"object Button"}
                    draggable
                    x={shapeProps.button.x}
                    y={shapeProps.button.y}
                    width={shapeProps.button.width}
                    height={shapeProps.button.height}
                    ref={buttonRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Button') {
                            Flashcards.changeButtonPosition(onChange, shapeProps, e);
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        dragBoundRef(pos, buttonRef.current, shapeProps);
                    }}
                >
                    <Rect
                        name={"object Answer"}
                        width={shapeProps.button.width}
                        height={shapeProps.button.height}
                        fill={shapeProps.button.backgroundFill}
                        cornerRadius={shapeProps.button.cornerRadius}
                    />
                    <Text
                        align={shapeProps.button.align}
                        verticalAlign={shapeProps.button.verticalAlign}
                        fontFamily={shapeProps.button.fontFamily}
                        name={"object Answer"}
                        text={shapeProps.button.text}
                        height={shapeProps.button.height}
                        width={shapeProps.button.width}
                        fontSize={shapeProps.button.fontSize}
                        fill={shapeProps.button.textFill}
                    />
                </Group>
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                />
            )}
        </React.Fragment>
    );
}

export default FlashcardsElementEditor;