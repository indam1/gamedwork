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

function changeAttrFontSize(selectedShape, textarea, elems, setElems) {
    const newAttrs = {...selectedShape, fontSize: textarea.value};
    const elms = elems.slice();
    elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
    setElems(elms);
}

function changeAttrRadiusX(selectedShape, textarea, elems, setElems) {
    const newAttrs = {...selectedShape, radiusX: textarea.value};
    const elms = elems.slice();
    elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
    setElems(elms);
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
    textarea.style.top = areaPosition.y + textNode.height() / 2 + 'px';
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

    function changeAttr() {
        const newAttrs = selectedShape;
        if (attr === "fontSize")
            newAttrs.fontSize = Number(textarea.value);
        else if (attr === "radiusX")
            newAttrs.radiusX = Number(textarea.value);
        else if (attr === "radiusY")
            newAttrs.radiusY = Number(textarea.value);
        else if (attr === "height")
            newAttrs.height = Number(textarea.value);
        else if (attr === "width")
            newAttrs.width = Number(textarea.value);
        else if (attr === "src")
            newAttrs.src = textarea.value;
        else if (attr === "cornerRadius")
            newAttrs.cornerRadius = Number(textarea.value);
        else if (attr === "theme:fontSize")
            newAttrs.theme.fontSize = Number(textarea.value);
        else if (attr === "button:fontSize")
            newAttrs.button.fontSize = Number(textarea.value);
        else if (attr === "answer:fontSize")
            newAttrs.answer.fontSize = Number(textarea.value);
        else if (attr === "word:fontSize")
            newAttrs.word.fontSize = Number(textarea.value);
        else if (attr === "meaning:fontSize")
            newAttrs.meaning.fontSize = Number(textarea.value);
        else if (attr === "result:fontSize")
            newAttrs.result.fontSize = Number(textarea.value);
        else if (attr === "button:width")
            newAttrs.button.width = Number(textarea.value);
        else if (attr === "answer:width")
            newAttrs.answer.width = Number(textarea.value);
        else if (attr === "button:height")
            newAttrs.button.height = Number(textarea.value);
        else if (attr === "answer:height")
            newAttrs.answer.height = Number(textarea.value);
        else if (attr === "button:cornerRadius")
            newAttrs.button.cornerRadius = Number(textarea.value);
        else if (attr === "answer:cornerRadius")
            newAttrs.button.cornerRadius = Number(textarea.value);
        else if (attr === "question:fontSize")
            newAttrs.question.fontSize = Number(textarea.value);
        const elms = elems.slice();
        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
        setElems(elms);
    }

    function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('mousedown', handleOutsideClick);
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
            changeAttr();

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
            changeAttr();

            textNode.text(textarea.value);
            removeTextarea();
        }
    }

    setTimeout(() => {
        window.addEventListener('mousedown', handleOutsideClick);
    });
}

export const editListSettings = (listNode, layer, stage, options, selectedShape, elems, setElems, attr) => {
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

        function changeAttr(e) {
            const newAttrs = selectedShape;
            if (attr === "fontFamily")
                newAttrs.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "theme:fontFamily")
                newAttrs.theme.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "button:fontFamily")
                newAttrs.button.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "word:fontFamily")
                newAttrs.word.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "meaning:fontFamily")
                newAttrs.meaning.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "result:fontFamily")
                newAttrs.result.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "question:fontFamily")
                newAttrs.result.fontFamily = e.currentTarget.children[1].text();
            else if (attr === "answer:fontFamily")
                newAttrs.answer.fontFamily = e.currentTarget.children[1].text();
            const elms = elems.slice();
            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
            setElems(elms);
        }

        group.on("click", (e) => {
            changeAttr(e);

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

export const editColorSettings = (colorNode, stage, selectedShape, elems, setElems, attr) => {
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
        window.removeEventListener('mousedown', handleOutsideClick);

        colorNode.show();
    }

    function changeAttr() {
        const newAttrs = selectedShape;
        if (attr === "fill")
            newAttrs.fill = colorPicker.value;
        else if (attr === "theme:fill")
            newAttrs.theme.fill = colorPicker.value;
        else if (attr === "button:backgroundFill")
            newAttrs.button.backgroundFill = colorPicker.value;
        else if (attr === "button:textFill")
            newAttrs.button.textFill = colorPicker.value;
        else if (attr === "answer:backgroundFill")
            newAttrs.answer.backgroundFill = colorPicker.value;
        else if (attr === "answer:textFill")
            newAttrs.answer.textFill = colorPicker.value;
        else if (attr === "word:fill")
            newAttrs.word.fill = colorPicker.value;
        else if (attr === "meaning:fill")
            newAttrs.meaning.fill = colorPicker.value;
        else if (attr === "result:fill")
            newAttrs.result.fill = colorPicker.value;
        else if (attr === "question:fill")
            newAttrs.question.fill = colorPicker.value;
        const elms = elems.slice();
        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
        setElems(elms);
    }

    colorPicker.addEventListener('keydown', function (e) {
        // hide on enter
        if (e.keyCode === 13) {
            changeAttr();

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
            changeAttr();

            colorNode.fill(colorPicker.value);
            removeTextarea();
        }
    }

    setTimeout(() => {

        window.addEventListener('mousedown', handleOutsideClick);
    });
}