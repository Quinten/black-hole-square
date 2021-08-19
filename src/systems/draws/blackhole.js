let draw = (entities, entity, ctx) => {
    let p = new Path2D('M44 12c0-3.311-2.689-6-6-6H10c-3.311 0-6 2.689-6 6v28c0 3.311 2.689 6 6 6h28c3.311 0 6-2.689 6-6V12z');
    ctx.fillStyle = '#000';
    ctx.fill(p);
    p = new Path2D('M4 16c0-3.311 2.689-6 6-6h28c3.311 0 6 2.689 6 6v-4c0-3.311-2.689-6-6-6H10c-3.311 0-6 2.689-6 6v4z');
    ctx.fillStyle = '#16272C';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
