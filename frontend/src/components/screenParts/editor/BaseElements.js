import React from "react";
import {Ellipse, Group, Rect, Text} from "react-konva";
import Icon from "../../templates/Icon";
import {mainText} from "../../add/Text";
import {mainEllipse} from "../../add/Ellipse";
import {mainRectangle} from "../../add/Rectangle";
import {mainImage} from "../../add/Image";

function BaseElements(props) {
    const mainWidth = window.innerWidth;
    const mainHeight = window.innerHeight;

    return (
        <React.Fragment>
            <Group // DownLeft
                x={mainWidth * 0.1}
                y={mainHeight * 0.8075}
                width={mainWidth * 0.3}
                height={mainHeight * 0.1925}
            >
                <Rect
                    fill={"#434e99"}
                    width={mainWidth * 0.3}
                    height={mainHeight * 0.1925}
                    stroke={"#434e99"}
                />
                <Text
                    width={mainWidth * 0.3}
                    height={40}
                    fontFamily={"Montserrat"}
                    text={"Базовые элементы"}
                    fill={"white"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={20}
                    y={40}
                    onTap={() => {
                        mainText(props);
                    }}
                    onClick={() => {
                        mainText(props);
                    }}
                >
                    <Icon/>
                    <Text
                        width={50}
                        height={50}
                        align={"center"}
                        verticalAlign={"middle"}
                        fontSize={24}
                        text={'Т'}
                        fill={'white'}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"текст"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={85}
                    y={40}
                    onTap={() => {
                        mainEllipse(props);
                    }}
                    onClick={() => {
                        mainEllipse(props);
                    }}
                >
                    <Icon/>
                    <Ellipse
                        x={25}
                        y={25}
                        radius={{x: 13, y: 13}}
                        fill={"white"}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"эллипс"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={150}
                    y={40}
                    onTap={() => {
                        mainRectangle(props);
                    }}
                    onClick={() => {
                        mainRectangle(props);
                    }}
                >
                    <Icon/>
                    <Rect
                        x={12.5}
                        y={12.5}
                        width={25}
                        height={25}
                        fill={"white"}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"прямоугольник"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={215}
                    y={40}
                    onTap={() => {
                        mainImage(props);
                    }}
                    onClick={() => {
                        mainImage(props);
                    }}
                >
                    <Icon/>
                    <Text
                        fontSize={16}
                        text={'Image'}
                        fill={'white'}
                        x={-16}
                        padding={20}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"изображение"}
                        fill={"white"}
                    />
                </Group>
            </Group>


        </React.Fragment>
    );
}

export default BaseElements;