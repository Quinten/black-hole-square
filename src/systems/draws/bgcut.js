let draw = (entities, entity, ctx) => {
    ctx.globalCompositeOperation = 'destination-over';
    let p = new Path2D('M6 288h276c3.311 0 6-2.689 6-6V6c0-3.311-2.689-6-6-6H6C2.689 0 0 2.689 0 6v276c0 3.311 2.689 6 6 6z');
    ctx.fillStyle = entity.bgcut.fill;
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
