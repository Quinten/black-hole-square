let draw = (entities, entity, ctx) => {
    let w = entities.game.canvas.gW;
    let h = entities.game.canvas.gH;
    if (entity.size !== undefined) {
        w = entity.size.w;
        h = entity.size.h;
    }
    ctx.fillStyle = entity.fillrect.fill;
    ctx.fillRect(0, 0, w, h);
};

export default Object.freeze({
    draw
});
