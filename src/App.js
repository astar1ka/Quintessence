function App(){
    const mediator = new Mediator({}, {ADD_EVENT: "ADD_EVENT"});
    const timer = new Timer;
    mediator.set(mediator.getTriggersNames().ADD_EVENT,(data) => timer.add(data.event, data.delay, data.interval));
    Game(mediator);
}