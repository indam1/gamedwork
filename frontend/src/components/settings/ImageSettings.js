import React, {useRef} from "react";
import {Group, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {style} from "./common/style";
import {mainWidth, settingsWidth} from "../functions/Consts";
import {editTextSettings} from "../functions/Functions";

function ImageSettings(props) {

    const selectedShape = props.getGlob.get('selectedShape');
    const images = props.getElem.get('image');
    const setImages = props.setElem.get('image');

    const linkRef = useRef();

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
                {/*            <p style={{*/}
                {/*                fontFamily: "Montserrat",*/}
                {/*                fontStyle: "normal",*/}
                {/*                fontSize: 14,*/}
                {/*                color: "white",*/}
                {/*            }}>Ссылка:</p>*/}
                {/*        </div>*/}

                {/*        <div style={style.half}>*/}
                {/*            <textarea style={style.textarea} onChange={(e) => {*/}
                {/*                const newAttrs = selectedShape;*/}
                {/*                newAttrs.src = e.target.value;*/}
                {/*                const imgs = images.slice();*/}
                {/*                imgs[imgs.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;*/}
                {/*                setImages(imgs);*/}
                {/*            }} value={selectedShape?.src}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Html>*/}
                <Text
                    text={"Ссылка:"}
                    fontFamily={"Verdana"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    y={10}
                    height={60}
                    fill={"white"}

                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Text
                    text={selectedShape?.src}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={settingsWidth / 2}
                    height={60}
                    y={10}
                    x={settingsWidth / 2}
                    ref={linkRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        editTextSettings(linkRef.current, props.stage, selectedShape, images, setImages, "src");
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default ImageSettings;