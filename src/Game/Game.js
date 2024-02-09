async function Game(mediator){
    const gameScreen = document.getElementById("canvas");
    gameScreen.width = 800;
    canvas.height = 450;
    const gameScene = new GameScene(gameScreen,"gameScene",mediator);
    await gameScene.preload();
    gameScene.create();
    let hash = {};
    mediator.get('ADD_EVENT', {
        event: () => gameScene.update(),
        delay: 0,
        interval: 30
    });
}