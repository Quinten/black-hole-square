import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
//    let w = entity.size.w;
//    let h = entity.size.h;
//    ctx.fillStyle = 'white';
//    ctx.fillRect(0, 0, w, h);
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M27.757 22l-9.878 9.879a3 3 0 004.242 4.242l12-12a3 3 0 00.364-3.802l-.022-.032-.021-.031-.022-.03-.023-.03-.023-.03-.023-.03-.024-.03-.024-.029-.025-.029-.025-.029-.025-.028-.026-.029-.027-.028-.026-.028-.028-.027-12-12a3 3 0 00-4.242 4.242L27.757 22z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
