import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M39 14.5c0-4.14-3.36-7.5-7.5-7.5h-15C12.36 7 9 10.36 9 14.5v15c0 4.14 3.36 7.5 7.5 7.5h15c4.14 0 7.5-3.36 7.5-7.5v-15z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
