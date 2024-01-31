function Router(mediator){

    //RESOURCES
    mediator.set('GET_SPRITE', useGetSprite());
    mediator.set('GET_MUSIC', useGetMusic());
    mediator.set('LOAD_SPRITE', useLoadSprite());
    mediator.set('LOAD_SPRITE_MAP', useLoadSpriteMap());
    mediator.set('LOAD_MUSIC', useLoadMusic());

    //ELEMENTS
    mediator.set('GET_ELEMENT', useGetElement());
    mediator.set('CREATE_ELEMENT', useGreateElement());

    //RENDER
    mediator.set('RENDER', useRender());

    //SCENES
    mediator.set('GET_SCENE', useGetScene());
    mediator.set('GET_ACTIVE_SCENE', useGetActiveScene());
    mediator.set('ADD_SCENE', useAddScene());
}