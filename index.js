const scripts = [

    'engine/Managers/ResourceManager/ResourceManager.js',
    'engine/Managers/RenderManager/RenderArea/RenderArea.js',
    'engine/Canvas/Canvas.js',
    'engine/Scene/Scene.js',
    
    'src/Game/Scenes/SceneObjects/SceneObject.js',

    'src/Workers/Mediator/Mediator.js',

    'src/Workers/Timer/Timer.js',

    'src/Game/Scenes/GameObjects/Elements/SpriteAtlas.js',
    'src/Game/Scenes/GameObjects/Elements/Element.js',
    'src/Game/Scenes/GameObjects/Hero/SpriteAtlas.js',
    'src/Game/Scenes/GameObjects/Hero/Animations.js',
    'src/Game/Scenes/GameObjects/Hero/Hero.js',
    'src/Game/Scenes/GameObjects/Goblin/SpriteAtlas.js',
    'src/Game/Scenes/GameObjects/Goblin/Animations.js',
    'src/Game/Scenes/GameObjects/Goblin/Goblin.js',
    'src/Game/Scenes/GameObjects/Player/Player.js',
    'src/Game/Scenes/GameObjects/Node.js',
    'src/Game/Scenes/GameObjects/BattleGround.js',


    'src/Game/Scenes/Methods/LoadSources.js',
    'src/Game/Scenes/GameScene.js',

    'src/Game/Game.js',

    'src/App.js'


];

scripts.forEach(script =>
    document.write(`<script src='${script}'></script>`));

window.onload = () => {
    App();
}