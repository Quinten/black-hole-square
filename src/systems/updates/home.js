let update = (entities, entity, time, delta) => {
    if (entity.position !== undefined) {
        entity.position.x = entity.position.x
            + (entity.home.x - entity.position.x) / 2 * delta / 17;
        if (
            Math.abs(entity.home.x - entity.position.x)
                < 1 / entities.game.canvas.zoom
        ) {
            entity.position.x = entity.home.x;
        }
        entity.position.y = entity.position.y
            + (entity.home.y - entity.position.y) / 2 * delta / 17;
        if (
            Math.abs(entity.home.y - entity.position.y)
                < 1 / entities.game.canvas.zoom
        ) {
            entity.position.y = entity.home.y;
        }
    }
};

export default Object.freeze({
    update
});
