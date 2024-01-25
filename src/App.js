async function App(){
    const mediator = new Mediator({}, {ADD_EVENT: "ADD_EVENT"});
    
    mediator.set(mediator.getTriggersNames().ADD_EVENT,(data) => timer.add(data.event, data.delay, data.interval));
    //Game(mediator);
    const game = new Game({
        canvas: "canvas",
        width: 1920,
        height: 1080
    });

    game.addScene(new GameScene("main"));
    game.run();
}