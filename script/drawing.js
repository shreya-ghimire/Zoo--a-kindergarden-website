const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const colorBtns = document.querySelectorAll(".options.color .option");
const brushSlider = document.getElementById("slider");
const clearBtn = document.querySelector(".drawing-div button:nth-child(1)");
const saveBtn = document.querySelector(".drawing-div button:nth-child(2)");
ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY,
    isDrawing = false,
    brushWidth = 5,
    selectedTool = "brush",  
    selectedColor = "#000",  
    snapshot;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushWidth;
});


const drawRect = (e) => {
    ctx.beginPath();
    let width = e.offsetX - prevMouseX;
    let height = e.offsetY - prevMouseY;
    ctx.strokeRect(prevMouseX, prevMouseY, width, height);
    ctx.closePath();
};


const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow(e.offsetX - prevMouseX, 2) + Math.pow(e.offsetY - prevMouseY, 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
};


const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX - (e.offsetX - prevMouseX), e.offsetY);
    ctx.closePath();
    ctx.stroke();
};


const brushDraw = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};


const erase = (e) => {
    ctx.strokeStyle = "#fff"; 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};


const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.moveTo(prevMouseX, prevMouseY);

  
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};


const drawing = (e) => {
    if (!isDrawing) return;

  
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === "brush") {
        brushDraw(e);
    } else if (selectedTool === "eraser") {
        erase(e);
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "triangle") {
        drawTriangle(e);
    }
};


const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
};

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".option.active")?.classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;  
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor; 
        console.log("Selected tool:", selectedTool);
    });
});

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options.color .active")?.classList.remove("active");
        btn.classList.add("active");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
        ctx.strokeStyle = selectedColor;
    });
});


brushSlider.addEventListener("input", (e) => {
    brushWidth = e.target.value;
    ctx.lineWidth = brushWidth;
});


clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


saveBtn.addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});

canvas.addEventListener("mousedown", (e) => {
    startDraw(e);
});
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
