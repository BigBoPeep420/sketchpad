//Setup Global Variables
const scechy = document.querySelector("#scechy");
const scechyPad = scechy.querySelector("#pad");
const padControls = scechy.querySelector("#padControls");
const palette = padControls.querySelector("#palette");
const resizeModal = document.querySelector("#resizeModal");
const resizeGridDisplay = resizeModal.querySelector("#gridSize");
let isDrawing = false;
let gridSize = 16;
const colors = ["#000000", "#1D2B53", "#7E2553", "#008751", "#AB5236", 
    "#5F574F", "#C2C3C7", "#FFF1E8", "#FF004D", "#FFA300", "#FFEC27",
    "#00E436", "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"]

//Setup Palette & Default Canvas -- Do Not Move
fillPalette();
let selectedColor = palette.firstChild;
selectedColor.classList.toggle("selectedSwatch");
fillPad(gridSize);
//End Palette & Default Canvas -- Do Not Move

//Event Listeners
scechyPad.addEventListener("dragstart", (e) => {
    e.preventDefault();
})
document.body.addEventListener("mousedown", (e) => {
    isDrawing = true;
})
document.body.addEventListener("mouseup", (e) => {
    isDrawing = false;
})
scechyPad.addEventListener("mouseover", (e) => {
    if(isDrawing && e.target.classList.contains("pixel")){
        e.target.style.backgroundColor = selectedColor.dataset.color;
        let opCur = parseFloat(e.target.dataset.opacity);
        let opNew = Math.min(Math.max(opCur + 0.1, 0), 1);
        e.target.style.opacity = opNew;
        e.target.dataset.opacity = opNew;
    }
})
scechyPad.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if(e.target.classList.contains("pixel")){
        e.target.style.backgroundColor = selectedColor.dataset.color;
        let opCur = parseFloat(e.target.dataset.opacity);
        let opNew = Math.min(Math.max(opCur + 0.1, 0), 1);
        e.target.style.opacity = opNew;
        e.target.dataset.opacity = opNew;
    }
})
palette.addEventListener("click", (e) => {
    if(e.target.classList.contains("swatch")){
        selectedColor.classList.toggle("selectedSwatch");
        selectedColor = e.target;
        selectedColor.classList.toggle("selectedSwatch");
    }
})

//Button Logic
padControls.querySelector("#resize").onclick = () => {
    resizeModal.style.display = "block";
}
resizeModal.querySelector("#close").onclick = () => {
    resizeModal.style.display = "none";
}
resizeModal.querySelector("#submit").onclick = () => {
    gridSize = resizeModal.querySelector("#sizeSlider").value;
    clearPad();
    fillPad(gridSize);
    resizeModal.style.display = "none";
}
window.onclick = (e) => {
    if(e.target == resizeModal){
        resizeModal.style.display = "none";
    }
}
padControls.querySelector("#clear").onclick = () => {
    clearPad();
    fillPad(gridSize);
}
resizeModal.querySelector("#sizeSlider").oninput = () => {
    let size = resizeModal.querySelector("#sizeSlider").value;
    resizeGridDisplay.textContent = size + " x " + size;
}


//Functions
function clearPad(){
    while(scechyPad.firstChild){
        scechyPad.removeChild(scechyPad.firstChild);
    }
}
function createPixel(){
    let pix = document.createElement("div");
    pix.classList.add("pixel");
    pix.dataset.opacity = 0;
    return pix;
}
function fillPad(gridSize){
    clearPad();
    const pixWidth = 100 / gridSize;
    for(let i = 0; i < (gridSize * gridSize); i++){
        const pix = createPixel();
        pix.style.width = pixWidth + "%";
        pix.style.height = pixWidth + "%";
        scechyPad.appendChild(pix);
    }
}
function fillPalette(){
    palette.replaceChildren();
    const swatchSize = 100 / 16
    colors.forEach((hexColor) => {
        const swatch = document.createElement("div");
        swatch.classList.add("swatch");
        swatch.dataset.color = hexColor;
        swatch.style.backgroundColor = hexColor;
        swatch.style.width = "50px";
        swatch.style.height = "50px";
        palette.appendChild(swatch);
    })
}