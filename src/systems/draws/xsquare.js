let draw = (entities, entity, ctx) => {
    let w = entity.size.w;
    let h = entity.size.h;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(6, 6);
    ctx.lineTo(42, 42);
    ctx.moveTo(6, 42);
    ctx.lineTo(42, 6);
    ctx.stroke();
};

export default Object.freeze({
    draw
});
