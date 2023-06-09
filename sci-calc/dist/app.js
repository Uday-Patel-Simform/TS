"use strict";
const display = document.querySelector("h1");
const buttons = (document.querySelectorAll(".cal-btn"));
// init memory variables
let memory = 0;
let currentResult = 0;
const mc = document.getElementById("mc");
const mr = document.getElementById("mr");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let value = button.textContent;
        switch (value) {
            case "X":
                display.textContent += "*";
                break;
            case "÷":
                display.textContent += "/";
                break;
            case "−":
                display.textContent += "-";
                break;
            case "=":
                equals(display.textContent);
                break;
            case "xy":
                display.textContent += "^";
                break;
            case "C":
                display.textContent = "";
                break;
            case "⌫":
                back(display.textContent);
                break;
            case "±":
                plusMinusToggle(display.textContent);
                break;
            case "mod":
                display.textContent += "%";
                break;
            case "In":
                display.textContent = displayAns(Math.log(eval(display.textContent)));
                break;
            case "log":
                display.textContent = displayAns(Math.log10(eval(display.textContent)));
                break;
            case "π":
                displayPI(display.textContent);
                break;
            case "10x":
                display.textContent = displayAns(Math.pow(10, eval(display.textContent)));
                break;
            case "√":
                display.textContent = displayAns(Math.sqrt(eval(display.textContent)));
                break;
            case "n!":
                fact(display.textContent);
                break;
            case "x2":
                display.textContent = displayAns(Math.pow(eval(display.textContent), 2));
                break;
            case "1/x":
                display.textContent = displayAns(eval(String(1 / eval(display.textContent))));
                break;
            case "|x|":
                display.textContent = displayAns(Math.abs(eval(display.textContent)));
                break;
            case "exp":
            case "e":
                display.textContent = displayAns(Math.exp(eval(display.textContent)));
                break;
            case "sin":
                display.textContent = displayAns(Math.sin(eval(display.textContent)));
                break;
            case "cos":
                display.textContent = displayAns(Math.cos(eval(display.textContent)));
                break;
            case "tan":
                display.textContent = displayAns(Math.tan(eval(display.textContent)));
                break;
            case "asin":
                display.textContent = displayAns(Math.asin(eval(display.textContent)));
                break;
            case "acos":
                display.textContent = displayAns(Math.acos(eval(display.textContent)));
                break;
            case "atan":
                display.textContent = displayAns(Math.atan(eval(display.textContent)));
                break;
            case "⌈x⌉":
                display.textContent = displayAns(Math.ceil(eval(display.textContent)));
                break;
            case "⌊x⌋":
                display.textContent = displayAns(Math.floor(eval(display.textContent)));
                break;
            case "RAN":
                display.textContent = displayAns(Math.random());
                break;
            case "M+":
                mAdd(eval(display.textContent));
                break;
            case "M-":
                mSub(eval(display.textContent));
                break;
            case "MC":
                mClear();
                break;
            case "MR":
                mRecall();
                break;
            case "MS":
                mStore(eval(display.textContent));
                break;
            case "DEG":
                button.textContent = "RAD";
                display.textContent = String((eval(display.textContent) * 180) / Math.PI);
                break;
            case "RAD":
                button.textContent = "DEG";
                display.textContent = String((Math.PI * eval(display.textContent)) / 180);
                break;
            case "F-E":
                display.textContent = eval(display.textContent).toExponential();
                break;
            case "2x":
                display.textContent = displayAns(Math.pow(2, eval(display.textContent)));
                break;
            case "3x":
                display.textContent = displayAns(Math.pow(3, eval(display.textContent)));
                break;
            case "∛x":
                display.textContent = displayAns(Math.pow(eval(display.textContent), 1 / 3));
                break;
            case "x3":
                display.textContent = displayAns(Math.pow(eval(display.textContent), 3));
                break;
            default:
                if (display.textContent == "0" && value != ".") {
                    console.log(value);
                    display.textContent = value;
                }
                else
                    display.textContent += value;
                break;
        }
    });
});
// handling '=' click and edge cases
const equals = (Content) => {
    if (Content.includes("^")) {
        if (Content.length === 2 || Content.includes("^^")) {
            display.textContent = "Invalid input format!!";
        }
        else {
            const lastIndex = Content.lastIndexOf('^');
            if (!Content.charAt(lastIndex + 1)) {
                display.textContent = "Invalid input format!!";
            }
            else {
                Content = Content.replaceAll('^', '**');
                display.textContent = displayAns(eval(Content));
            }
        }
    }
    else if (Content.includes("%")) {
        const contentLength = Content.length;
        if (contentLength == 2) {
            display.textContent = "Invalid input format!!";
        }
        else {
            const count = Content.match(/%/g)?.length ?? 0;
            if (count > 1) {
                display.textContent = "Invalid input format!!";
            }
            else {
                const n1 = eval(Content.slice(0, Content.indexOf('%')));
                const n2 = eval(Content.slice(Content.indexOf('%') + 1));
                if (!n2) {
                    display.textContent = "Invalid input format!!";
                }
                display.textContent = displayAns(n1 % n2);
            }
        }
    }
    else if (Content.includes("/")) {
        if (Content.length === 2 || Content.includes("//")) {
            display.textContent = "Invalid input format!!";
        }
        else {
            const lastIndex = Content.lastIndexOf('/');
            if (!Content.charAt(lastIndex + 1)) {
                display.textContent = "Invalid input format!!";
            }
            else {
                display.textContent = displayAns(eval(Content));
            }
        }
    }
    else {
        try {
            const res = eval(display.textContent);
            if (isNaN(Number(res))) {
                throw new Error();
            }
            display.textContent = displayAns(eval(Content));
        }
        catch (e) {
            display.textContent = "Invalid input format!!";
        }
    }
};
// displaying answers
const displayAns = (ans) => {
    const decimalCount = countDecimal(ans);
    const isDecimalCountGreaterThan10 = decimalCount > 10;
    if (isDecimalCountGreaterThan10) {
        return Number(ans).toFixed(10);
    }
    else if (display.textContent === "") {
        return "";
    }
    else {
        return String(ans);
    }
};
// trim decimals function
const countDecimal = (ans) => {
    const decimalPart = String(ans).split(".")[1];
    return decimalPart ? decimalPart.length : 0;
};
// handling keyDown events
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(Number(key)) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")" ||
        key === "^" ||
        key === "|" ||
        key === "%") {
        display.textContent += key;
    }
    else if (key === "!") {
        fact(display.textContent);
    }
    else if (key === "Backspace") {
        if (display.textContent.length > 0) {
            display.textContent = display.textContent.slice(0, -1);
        }
        display.textContent = display.textContent;
    }
    else if (key === "Enter") {
        equals(display.textContent);
    }
});
// handling "⌫" operation
const back = (content) => {
    display.textContent = content.slice(0, -1);
};
// handling "+/-" toggle operation
const plusMinusToggle = (content) => {
    const newContent = content.charAt(0) === '-' ? content.slice(1) : `-${content}`;
    display.textContent = newContent;
};
// handling "PI"
const displayPI = (content) => {
    const pi = 3.14159265359;
    const result = Number(content) * Math.PI;
    display.textContent = content === "" ? displayAns(String(pi)) : displayAns(result);
};
// handling factorial function
const fact = (content) => {
    content = eval(content);
    let fact = 1;
    for (let i = 2; i <= Number(content); i++)
        fact *= i;
    display.textContent = `${fact}`;
};
// memory add function
const mAdd = (content) => {
    memory += parseFloat(content);
};
// memory subtract function
const mSub = (content) => {
    memory -= parseFloat(content);
};
// memory store function
const mStore = (content) => {
    memory = parseFloat(content);
    mc.disabled = false;
    mr.disabled = false;
};
// memory clear function
const mClear = () => {
    memory = 0;
    display.textContent = "";
    mc.disabled = true;
    mr.disabled = true;
};
// memory recall function
const mRecall = () => {
    display.textContent = memory.toString();
};
