const scripts = [
    'engine/Game.js',
    
    'src/Game/Scenes/SceneObjects/SceneObject.js',

    'src/Workers/Mediator/Mediator.js',

    'src/Workers/Timer/Timer.js',

    'src/Game/Scenes/GameObjects/Button/Button.js',

    'src/Game/Scenes/GameObjects/Elements/SpriteAtlas.js',
    'src/Game/Scenes/GameObjects/Elements/SpriteSkillAtlas.js',
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
    'src/Game/Scenes/Screen.js',
    'src/Game/Scenes/GameScene.js',

    'src/App.js'


];

scripts.forEach(script =>
    document.write(`<script src='${script}'></script>`));

window.onload = () => {
    App();
}