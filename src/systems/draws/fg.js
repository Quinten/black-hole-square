let draw = (entities, entity, ctx) => {
    let p = new Path2D('M0 282v2006h288V160v122c0 3.311-2.689 6-6 6H6c-3.311 0-6-2.689-6-6z');
    ctx.fillStyle = '#16272C';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
