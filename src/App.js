importScript('src/Workers/Mediator/Mediator.js');
importScript('src/Workers/Timer/Timer.js');
importScript('src/Game/Scenes/SceneObjects/SceneObject.js');
importScript('engine/Game.js');
importScript('src/Game/Scenes/NewGame.js');
importScript('src/Game/Scenes/Screen.js');
importScript('src/Game/Scenes/GameScene.js');


async function App(){
    const mediator = new Mediator({}, {ADD_EVENT: "ADD_EVENT"});
    
    mediator.set(mediator.getTriggersNames().ADD_EVENT,(data) => timer.add(data.event, data.delay, data.interval));
    const game = new Game({
        canvas: "canvas",
        width: 1920,
        height: 1080,
        //scenes: [new NewGame("game")]
        scenes: [new Screen("screen"),new GameScene("main")]
    });
    
    game.run();
}