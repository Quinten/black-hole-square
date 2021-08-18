import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
//    let w = entity.size.w;
//    let h = entity.size.h;
//    ctx.fillStyle = 'white';
//    ctx.fillRect(0, 0, w, h);
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M13.879 19.879l-.028.027a3.003 3.003 0 00-.49 3.521l.018.033.018.033.019.032.019.031.019.032.02.032.021.031.02.031.022.031.021.031.022.03.023.03.023.03.023.03.024.03.024.029.025.029.025.029.025.028.026.029.027.028.026.028.028.027 12 12a3 3 0 004.242-4.242L20.243 22l9.878-9.879a3 3 0 00-4.242-4.242l-12 12z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
