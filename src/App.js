function App(){
    const mediator = new Mediator({}, {ADD_EVENT: "ADD_EVENT"});
    const timer = new Timer;
    const ground = new BattleGround(5);
    mediator.set(mediator.getTriggersNames().ADD_EVENT,(data) => timer.add(data.event, data.delay, data.interval));
    Game(mediator);
}