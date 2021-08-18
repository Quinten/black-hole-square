import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M24 17.757l-9.879-9.878a3 3 0 00-4.242 4.242L19.757 22l-9.878 9.879a3 3 0 004.242 4.242L24 26.243l9.879 9.878a3 3 0 004.242-4.242L28.243 22l9.878-9.879a3 3 0 00-4.242-4.242L24 17.757z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
