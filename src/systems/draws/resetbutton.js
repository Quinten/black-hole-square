let draw = (entities, entity, ctx) => {
    let p = new Path2D('M5 24H4a3 3 0 00-2.121 5.121l4 4a2.998 2.998 0 004.242 0l4-4A3 3 0 0012 24h-1c0-7.175 5.825-13 13-13s13 5.825 13 13-5.825 13-13 13a3.001 3.001 0 000 6c10.486 0 19-8.514 19-19S34.486 5 24 5 5 13.514 5 24z');
    ctx.fillStyle = '#f2f7f6';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
