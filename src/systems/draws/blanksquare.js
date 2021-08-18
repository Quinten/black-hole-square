let draw = (entities, entity, ctx) => {
    //let w = entity.size.w;
    //let h = entity.size.h;
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, 0, w, h);
    let p = new Path2D('M44 12c0-3.311-2.689-6-6-6H10c-3.311 0-6 2.689-6 6v28c0 3.311 2.689 6 6 6h28c3.311 0 6-2.689 6-6V12z');
    ctx.fillStyle = '#c3dad5';
    ctx.fill(p);
    p = new Path2D('M44 8c0-3.311-2.689-6-6-6H10C6.689 2 4 4.689 4 8v28c0 3.311 2.689 6 6 6h28c3.311 0 6-2.689 6-6V8z');
    ctx.fillStyle = '#f2f7f6';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
