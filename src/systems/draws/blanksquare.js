let draw = (entities, entity, ctx) => {
    let bgColor = (entity.clicked) ? '#AECBD6' : '#c3dad5';
    let fgColor = (entity.clicked) ? '#C9DDE4' : '#f2f7f6';
    let p = new Path2D('M44 12c0-3.311-2.689-6-6-6H10c-3.311 0-6 2.689-6 6v28c0 3.311 2.689 6 6 6h28c3.311 0 6-2.689 6-6V12z');
    ctx.fillStyle = bgColor;
    ctx.fill(p);
    p = new Path2D('M44 8c0-3.311-2.689-6-6-6H10C6.689 2 4 4.689 4 8v28c0 3.311 2.689 6 6 6h28c3.311 0 6-2.689 6-6V8z');
    ctx.fillStyle = fgColor;
    ctx.fill(p);
    if (entity.clicked) {
        entity.clicked = entity.clicked - 1;
    }
};

export default Object.freeze({
    draw
});
