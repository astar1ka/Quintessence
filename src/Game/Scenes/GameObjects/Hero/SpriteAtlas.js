const w = 288*4;
const h = 128*4;

const HeroSpriteAtlas = [];
for(i=1; i < 9; i++) HeroSpriteAtlas.push(
    {
        name: "hero.idle_" + i,
        dx: (i-1)*w,
        dy: 0*h,
        width: w,
        height: h
    }
);

for(i=1; i < 12; i++) HeroSpriteAtlas.push(
    {
        name: "hero.atk1_" + i,
        dx: (i-1)*w,
        dy: 7*h,
        width: w,
        height: h
    }
);

for(i=1; i < 11; i++) HeroSpriteAtlas.push(
    {
        name: "hero.atk2_" + i,
        dx: (i-1)*w,
        dy: 8*h,
        width: w,
        height: h
    }
);

for(i=1; i < 12; i++) HeroSpriteAtlas.push(
    {
        name: "hero.atk3_" + i,
        dx: (i-1)*w,
        dy: 9*h,
        width: w,
        height: h
    }
);

for(i=1; i < 19; i++) HeroSpriteAtlas.push(
    {
        name: "hero.skill_" + i,
        dx: (i-1)*w,
        dy: 4*h,
        width: w,
        height: h
    }
);

for(i=1; i < 11; i++) HeroSpriteAtlas.push(
    {
        name: "hero.defend_" + i,
        dx: (i-1)*w,
        dy: 5*h,
        width: w,
        height: h
    }
);

for(i=1; i < 7; i++) HeroSpriteAtlas.push(
    {
        name: "hero.hit_" + i,
        dx: (i-1)*w,
        dy: 6*h,
        width: w,
        height: h
    }
);

for(i=1; i < 14; i++) HeroSpriteAtlas.push(
    {
        name: "hero.dead_" + i,
        dx: (i-1)*w,
        dy: 7*h,
        width: w,
        height: h
    }
);