const scechy = document.querySelector("#scechy");
const scechyPad = scechy.querySelector("#pad");

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

scechyPad.addEventListener("mouseover", (e) => {
    if(e.target.classList.contains("pixel")){
        e.target.style.backgroundColor = "#000";
    }
})

fillPad(16);