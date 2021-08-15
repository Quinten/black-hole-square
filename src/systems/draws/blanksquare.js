let draw = (entities, entity, ctx) => {
    let w = entity.size.w;
    let h = entity.size.h;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
};

export default Object.freeze({
    draw
});
