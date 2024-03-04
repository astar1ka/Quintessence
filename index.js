function importScript(scriptPath){
    document.write(`<script src='${scriptPath}'></script>`);
}

importScript('src/App.js');

const scripts = [

    'src/Game/Scenes/GameObjects/Button/Button.js',

    'src/Game/Scenes/GameObjects/Elements/SpriteAtlas.js',
    'src/Game/Scenes/GameObjects/Elements/ActionsSpriteAltas.js',
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
];

scripts.forEach(script => importScript(script));



window.onload = () => {
    App();
}