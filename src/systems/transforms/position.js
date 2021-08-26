let transform = (entities, entity, ctx) => {

    let offsetX = 0;
    let offsetY = 0;

    if (entity.position.origin === 'game') {
        let canvas = entities.game.canvas;
        offsetX = canvas.oX;
        offsetY = canvas.oY;
    }

    if (entity.position.origin === 'center') {
        let canvas = entities.game.canvas;
        offsetX = canvas.gW / 2;
        offsetY = canvas.gH / 2;
    }

    ctx.translate(
        entity.position.x + offsetX,
        entity.position.y + offsetY
    );
};

export default Object.freeze({
    transform
});
