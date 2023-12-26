const wg = 300;
const hg = 300;

const GoblinSpriteAtlas = [];
for(i=1; i < 5; i++) GoblinSpriteAtlas.push(
    {
        name: "goblin.idle_" + i,
        dx: 2100-(i-1)*wg,
        dy: 0,
        width: wg,
        height: hg
    }
);

for(i=1; i < 9; i++) GoblinSpriteAtlas.push(
    {
        name: "goblin.atk_" + i,
        dx: 2100-(i-1)*wg,
        dy: hg,
        width: wg,
        height: hg
    }
);

for(i=1; i < 4; i++) GoblinSpriteAtlas.push(
    {
        name: "goblin.hit_" + i,
        dx: 2100-(i-1)*wg,
        dy: 2*hg,
        width: wg,
        height: hg
    }
);

for(i=1; i < 5; i++) GoblinSpriteAtlas.push(
    {
        name: "goblin.dead_" + i,
        dx: 2100-(i-1)*wg,
        dy: 3*hg,
        width: wg,
        height: hg
    }
);