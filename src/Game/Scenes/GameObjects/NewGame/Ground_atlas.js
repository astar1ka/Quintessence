const gw = 576;
const gh = 256;

const GroundSpriteAtlas = [];
for(i=1; i < 7; i++) GroundSpriteAtlas.push(
    {
        name: "ground_hero.idle_" + i,
        dx: (i-1)*gw,
        dy: 0,
        width: gw,
        height: gh
    }
);

for(i=1; i < 9; i++) GroundSpriteAtlas.push(
    {
        name: "ground_hero.walk_" + i,
        dx: (i-1)*gw,
        dy: gh,
        width: gw,
        height: gh
    }
);

for(i=1; i < 7; i++) GroundSpriteAtlas.push(
    {
        name: "ground_hero.atk1_" + i,
        dx: (i-1)*gw,
        dy: 5*gh,
        width: gw,
        height: gh
    }
);

for(i=1; i < 13; i++) GroundSpriteAtlas.push(
    {
        name: "ground_hero.atk2_" + i,
        dx: (i-1)*gw,
        dy: 6*gh,
        width: gw,
        height: gh
    }
);

for(i=1; i < 24; i++) GroundSpriteAtlas.push(
    {
        name: "ground_hero.atk3_" + i,
        dx: (i-1)*gw,
        dy: 4*gh,
        width: gw,
        height: gh
    }
);

/*for(i=1; i < 11; i++) GroundSpriteAtlas.push(
    {
        name: "hero.defend_" + i,
        dx: (i-1)*w,
        dy: 5*h,
        width: w,
        height: h
    }
);

for(i=1; i < 7; i++) GroundSpriteAtlas.push(
    {
        name: "hero.hit_" + i,
        dx: (i-1)*w,
        dy: 6*h,
        width: w,
        height: h
    }
);

for(i=1; i < 14; i++) GroundSpriteAtlas.push(
    {
        name: "hero.dead_" + i,
        dx: (i-1)*w,
        dy: 7*h,
        width: w,
        height: h
    }
);*/