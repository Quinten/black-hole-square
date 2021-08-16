let draw = (entities, entity, ctx) => {
    let w = entity.size.w;
    let h = entity.size.h;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(24, 6);
    ctx.lineTo(6, 24);
    ctx.lineTo(24, 42);
    ctx.stroke();
};

export default Object.freeze({
    draw
});
