// canvas : HTML5의 요소로, 내부의 픽셀을 다룰수 있는 태그
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

// css에서의 canvas 크기와 별도로, 
// 이 canvas에서 다루는 픽셀의 크기가 얼마인지 설정필요
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 배경 색상 하얀색으로 채워줌
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle = INITIAL_COLOR;// 선 색상
ctx.fillStyle = INITIAL_COLOR; // 채우기 색
ctx.lineWidth = 2.5; // 선 굵기


 let painting = false;
 let filling  = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    //clientX, Y 브라우저 위에서의 마우스 위치
    //offset cnavas 위에서의 마우스 위치
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){ // 그린다 false일때 : 캔버스에 마우스 들어옴, 마우스 클릭 안함, 캔버스 마우스 떠남
        // 보이지 않지만 계속해서 선의 시작점을 생성함
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{ // 그린다 true일때 : 캔버스에 마우스 클릭함
        // 선의 시작점부터 x,y까지 선을 그림
        ctx.lineTo(x,y);
        ctx.stroke(); // 선 색상과 굵기를 채움
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    // 채우기 색을 현재의 선색으로 변경
    ctx.fillStyle = color;
}

function handleRangeChage(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveBtnClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input" , handleRangeChage);
}

if(mode){
    mode.addEventListener("click" , handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtnClick);
}