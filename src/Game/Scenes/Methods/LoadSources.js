

function LoadSources(scene){
    const image = new Image(500,500);
    image.src = "./src/assets/backgrounds/MainBackground.png";
    image.onload = () => {
        scene.canvas.getContext("2d").drawImage(image,0,0,image.naturalWidth,image.naturalHeight);
        scene.hash = {};
    };
    setTimeout(() => {
        scene.canvas.getContext("2d").fillStyle = "orange";
        scene.canvas.getContext("2d").fillRect(10,10,200,20);
        scene.hash = {};
    },10000)
}