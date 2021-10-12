import React, {useState} from "react";
import {Group, Image, Rect, RegularPolygon, Text} from "react-konva";
import useImage from "use-image";

function UpScreenEditor(props) {
    const mainWidth = window.innerWidth;
    const mainHeight = window.innerHeight;

    const isEditorMode = props.getGlob.get('editor');
    const setEditorMode = props.setGlob.get('editor');

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

    const [numFields, setNumFields] = useState([1, 2, 3]);

    const [logoImage] = useImage("../../../static/frontend/logos/logo.png");
    const [persCabImage] = useImage("../../../static/frontend/siteImages/perscab.png");
    const [downloadImage] = useImage("../../../static/frontend/siteImages/download.png");
    const [shareImage] = useImage("../../../static/frontend/siteImages/share.png");

    return (
        <React.Fragment>
            <Group // Up
                x={0}
                y={0}
                width={mainWidth}
                height={mainHeight * 0.05}
            >
                <Rect
                    fill={"#000000"}
                    x={0}
                    y={0}
                    width={mainWidth}
                    height={mainHeight * 0.05}
                    stroke={"black"}
                />

                {isEditorMode && (
                    <RegularPolygon
                        onMouseOver={(e) => {
                            e.currentTarget.opacity(0.5);
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.opacity(1);
                        }}
                        rotation={90}
                        sides={3}
                        radius={20}
                        x={mainWidth / 2}
                        y={mainHeight * 0.05 / 2}
                        fill={'green'}
                        onTap={() => {
                            setEditorMode(!isEditorMode);
                        }}
                        onClick={() => {
                            setEditorMode(!isEditorMode);
                        }}
                    />
                )}

                {!isEditorMode && (
                    <RegularPolygon
                        onMouseOver={(e) => {
                            e.currentTarget.opacity(0.5);
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.opacity(1);
                        }}
                        rotation={45}
                        sides={4}
                        radius={20}
                        x={mainWidth / 2}
                        y={mainHeight * 0.05 / 2}
                        fill={'red'}
                        onTap={() => {
                            setEditorMode(!isEditorMode);
                        }}
                        onClick={() => {
                            setEditorMode(!isEditorMode);
                        }}
                    />
                )}
                <Image
                    image={logoImage}
                    width={30}
                    height={35}
                    x={mainWidth * 0.04}
                    y={5}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Главная"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.12}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Все курсы"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.24}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Мои курсы"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.36}
                />
                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        window.location.href="http://127.0.0.1:8000/accounts/logout"
                    }}
                    image={persCabImage}
                    width={42}
                    height={41}
                    y={2}
                    x={mainWidth * 0.94}
                />

                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        props.setGlob.get('settings')("");
                        props.setGlob.get("selectedShape")(null);
                        props.setGlob.get("numFields")(numFields);

                        props.setElem.get('ellipse')(ellipses);
                        props.setElem.get('text')(texts);
                        props.setElem.get('test')(tests);
                        props.setElem.get('flashcards')(flashcards);
                        props.setElem.get('rectangle')(rectangles);
                        props.setElem.get('image')(images);
                        props.setElem.get('textquest')(textquests);

                        props.setCount.get('common')(counterCommon);
                        props.setCount.get('ellipse')(counterEllipse);
                        props.setCount.get('text')(counterText);
                        props.setCount.get('rectangle')(counterRectangle);
                        props.setCount.get('image')(counterImage);
                        props.setCount.get('test')(counterTest);
                        props.setCount.get('flashcards')(counterFlashcards);
                        props.setCount.get('textquest')(counterTextquest);
                    }}
                    image={shareImage}
                    y={5}
                    x={mainWidth * 0.8}
                />
                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        setNumFields(props.getGlob.get("numFields"));

                        setEllipses(props.getElem.get("ellipse"));
                        setTexts(props.getElem.get("text"));
                        setTests(props.getElem.get("test"));
                        setFlashcards(props.getElem.get("flashcards"));
                        setRectangles(props.getElem.get("rectangle"));
                        setImages(props.getElem.get("image"));
                        setTextquests(props.getElem.get("textquest"));

                        setCounterCommon(props.getCount.get("common"));
                        setCounterEllipse(props.getCount.get("ellipse"));
                        setCounterText(props.getCount.get("text"));
                        setCounterRectangle(props.getCount.get("rectangle"));
                        setCounterImage(props.getCount.get("image"));
                        setCounterTest(props.getCount.get("test"));
                        setCounterFlashcards(props.getCount.get("flashcards"));
                        setCounterTextquest(props.getCount.get("textquest"));
                    }}
                    image={downloadImage}
                    y={5}
                    x={mainWidth * 0.7}
                />
            </Group>
        </React.Fragment>
    );
}



export default UpScreenEditor;