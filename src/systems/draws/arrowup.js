import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
//    let w = entity.size.w;
//    let h = entity.size.h;
//    ctx.fillStyle = 'white';
//    ctx.fillRect(0, 0, w, h);
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M22.507 11.397l-.035.021-.028.017-.032.019-.032.02-.031.021-.031.02-.031.022-.031.021-.03.022-.03.023-.03.023-.03.023-.03.024-.029.024-.029.025-.029.025-.028.025-.029.026-.028.027-.028.026-.027.028-12 12a3 3 0 004.242 4.242L24 18.243l9.879 9.878a3 3 0 004.242-4.242l-12-12a3.002 3.002 0 00-3.614-.482z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
