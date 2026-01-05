const scechy = document.querySelector("#scechy");
const scechyPad = scechy.querySelector("#pad");
const padControls = scechy.querySelector("#padControls");
const palette = padControls.querySelector("#palette");

const colors = ["#000000", "#1D2B53", "#7E2553", "#008751", "#AB5236", 
    "#5F574F", "#C2C3C7", "#FFF1E8", "#FF004D", "#FFA300", "#FFEC27",
    "#00E436", "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"]

function clearPad(){
    while(scechyPad.firstChild){
        scechyPad.removeChild(scechyPad.firstChild);
    }
}
function createPixel(){
    let pix = document.createElement("div");
    pix.classList.add("pixel");
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
        swatch.style.width = swatchSize + "%";
        swatch.style.height = swatchSize + "%";
        palette.appendChild(swatch);
    })
}


fillPalette();

scechyPad.addEventListener("mouseover", (e) => {
    if(e.target.classList.contains("pixel")){
        e.target.style.backgroundColor = "#000";
    }
})

fillPad(16);