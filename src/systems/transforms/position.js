let transform = (entities, entity, ctx) => {

    let offsetX = 0;
    let offsetY = 0;

    if (entity.position.origin === 'game') {
        let canvas = entities.game.canvas;
        offsetX = (canvas.gW - canvas.tW) / 2;
        offsetY = (canvas.gH - canvas.tH) / 2;
    }

    ctx.translate(
        entity.position.x + offsetX,
        entity.position.y + offsetY
    );
};

export default Object.freeze({
    transform
});
