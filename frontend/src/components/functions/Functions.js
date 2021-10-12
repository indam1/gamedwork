import {mainWidth, mainHeight, leftPaddingSettings, topPaddingSettings} from "./Consts";
import Konva from "konva";

export const dragBoundRef = (pos, ref, shapeProps) => {
    let newX, newY;
    if (pos.x < shapeProps.x + mainWidth * 0.1)
        newX = shapeProps.x + mainWidth * 0.1;
    else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
        newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
    else
        newX = pos.x;

    if (pos.y < shapeProps.y + mainHeight * 0.05)
        newY = shapeProps.y + mainHeight * 0.05;
    else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
        newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
    else
        newY = pos.y;

    return {
        x: newX,
        y: newY,
    }
}

export const dragBoundVar = (pos, ref, shapeProps) => {
    let newX, newY;
    if (pos.x < shapeProps.x + mainWidth * 0.1)
        newX = shapeProps.x + mainWidth * 0.1;
    else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width)
        newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width;
    else
        newX = pos.x;

    if (pos.y < shapeProps.y + mainHeight * 0.05)
        newY = shapeProps.y + mainHeight * 0.05;
    else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height)
        newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height;
    else
        newY = pos.y;

    return {
        x: newX,
        y: newY,
    }
}

export const editTextSettings = (textNode, stage, selectedShape, elems, setElems, attr) => {// hide text node and transformer:
    textNode.hide();

    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    var textPosition = textNode.absolutePosition();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
        x: stage.current.container().offsetLeft + textPosition.x,
        y: stage.current.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + textNode.height()/2 + 'px';
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
    textarea.maxLength = 4;
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
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
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
            const newAttrs = selectedShape;
            newAttrs.setAttribute(attr, textarea.value);
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);

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
            const newAttrs = selectedShape;
            newAttrs.setAttribute(attr, textarea.value);
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);

            textNode.text(textarea.value);
            removeTextarea();
        }
    }

    setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
    });
}

export const editListSettings = (listNode, layer, stage, options, selectedShape, elems, setElems) => {
    var textPosition = listNode.absolutePosition();

    const group1 = new Konva.Group({
        x: stage.current.container().offsetLeft + textPosition.x,
        y: stage.current.container().offsetTop + textPosition.y,
        width: 100,
    })

    for (let i = 0; i < options.length; i++) {
        const group = new Konva.Group({
            y: i * 20,
            width: group1.width(),
            height: 20,
        })

        const rect = new Konva.Rect({
            width: group1.width(),
            height: 20,

            fill: "black",
        })

        const text = new Konva.Text({
            width: group1.width(),
            height: 20,

            text: options[i],
            fill: "white",

            align: "center",
            verticalAlign: "middle",
        })

        group.add(rect);
        group.add(text);

        group.on("click", (e) => {
            const newAttrs = selectedShape;
            newAttrs.fontFamily = e.currentTarget.children[1].text();
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);
            group1.visible(false);
            group1.destroy();
        })

        group.on('mouseover', (e) => {
            e.target.opacity(0.5);
        })
        group.on('mouseleave', (e) => {
            e.target.opacity(1);
        })
        group1.add(group);
        group1.on("mouseleave", () => {
            group1.visible(false);
            group1.destroy();
        })
    }
    layer.current.add(group1);
}

export const editColorSettings = (colorNode, stage, selectedShape, elems, setElems) => {
    colorNode.hide();

    var textPosition = colorNode.absolutePosition();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
        x: stage.current.container().offsetLeft + textPosition.x,
        y: stage.current.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    var colorPicker = document.createElement('input');
    colorPicker.setAttribute("type", "color");
    document.body.appendChild(colorPicker);

    colorPicker.value = colorNode.fill();
    colorPicker.style.position = 'absolute';
    colorPicker.style.top = areaPosition.y + 'px';
    colorPicker.style.left = areaPosition.x + 'px';
    colorPicker.style.width = colorNode.width() + 'px';
    colorPicker.style.height = colorNode.height() + 'px';

    function removeTextarea() {
        colorPicker.parentNode.removeChild(colorPicker);
        window.removeEventListener('click', handleOutsideClick);
        console.log("hey");

        colorNode.show();
    }

    colorPicker.addEventListener('keydown', function (e) {
        // hide on enter
        if (e.keyCode === 13) {
            const newAttrs = selectedShape;
            newAttrs.fill = colorPicker.value;
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);

            colorNode.fill(colorPicker.value);
            removeTextarea();
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
            removeTextarea();
        }
    });


    function handleOutsideClick(e) {
        if (e.target !== colorPicker) {
            const newAttrs = selectedShape;
            newAttrs.fill = colorPicker.value;
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);

            colorNode.fill(colorPicker.value);
            removeTextarea();
        }
    }

    setTimeout(() => {

        window.addEventListener('click', handleOutsideClick);
    });
}