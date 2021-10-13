import React from "react";
import {Group, Image, Rect, Text} from "react-konva";
import useImage from "use-image";
import {mainWidth, mainHeight} from "../../functions/Consts";
import * as Flashcards from "../../add/Flashcards";
import * as Test from "../../add/Test";
import * as Textquest from "../../add/Textquest";

function Templates(props) {
    const [imageTextquest] = useImage('../../../static/frontend/siteImages/textquest.png');
    const [imageFlashcards] = useImage("../../../static/frontend/siteImages/flashcards.png");
    const [imageTest] = useImage("../../../static/frontend/siteImages/test.png");

    return (
        <React.Fragment>
            <Group
                x={mainWidth * 0.9}
                y={mainHeight * 0.525}
                width={mainWidth * 0.1}
                height={mainHeight * 0.475}
            >
                <Rect
                    fill={"#182430"}
                    width={mainWidth * 0.1}
                    height={mainHeight * 0.475}
                    stroke={"#182430"}
                />
                <Text
                    width={mainWidth * 0.1}
                    height={76}
                    fontFamily={"Montserrat"}
                    text={"Шаблоны"}
                    fill={"white"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />

                <Image
                    x={45}
                    y={65}
                    width={100}
                    height={115}
                    image={imageTextquest}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={(e) => {
                        Textquest.textquestTemplate1(props);
                    }}
                />

                <Image
                    x={45}
                    y={195}
                    width={100}
                    height={115}
                    image={imageFlashcards}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={(e) => {
                        Flashcards.flashcardsTemplate1(props);
                    }}
                />

                <Image
                    x={45}
                    y={325}
                    width={100}
                    height={115}
                    image={imageTest}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        Test.testTemplate1(props);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default Templates;