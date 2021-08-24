let update = (entities, entity, time, delta) => {
    if (entity.position !== undefined) {
        entity.position.x = entity.position.x
            + (entity.home.x - entity.position.x) / 3 * delta / 17;
        if (
            Math.abs(entity.home.x - entity.position.x)
                < 1 / entities.game.canvas.zoom
        ) {
            entity.position.x = entity.home.x;
        }
        let yHome = entity.home.y;
        if (entity.home.drop) {
            yHome = yHome + 48;
        }
        entity.position.y = entity.position.y
            + (yHome - entity.position.y) / 3 * delta / 17;
        if (
            Math.abs(yHome - entity.position.y)
                < 1 / entities.game.canvas.zoom
        ) {
            entity.position.y = yHome;
            if (entity.home.drop) {
                delete entity.mask;
                [
                    'blanksquare',
                    'xsquare',
                    'arrowup',
                    'arrowright',
                    'arrowdown',
                    'arrowleft',
                    'neutronstar'
                ].forEach(prop => {
                    delete entity[prop];
                });
                entity.home.drop = false;
            }
        }
        if (entity.position.x === entity.home.x && entity.position.y === entity.home.y && entity.home.suck) {
            entity.mask = {};
            entity.home.suck = false;
            entity.home.drop = true;
        }
    }
};

export default Object.freeze({
    update
});
