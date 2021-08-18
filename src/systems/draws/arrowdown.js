import blanksquare from './blanksquare.js';
let draw = (entities, entity, ctx) => {
//    let w = entity.size.w;
//    let h = entity.size.h;
//    ctx.fillStyle = 'white';
//    ctx.fillRect(0, 0, w, h);
    blanksquare.draw(entities, entity, ctx);
    let p = new Path2D('M24 25.757l-9.879-9.878a3 3 0 00-4.242 4.242l12 12 .027.028a3.003 3.003 0 003.323.588l.034-.015.034-.016.033-.016.033-.017.032-.017.033-.017.032-.018.033-.018.032-.019.031-.019.032-.019.032-.02.031-.021.031-.02.031-.022.031-.021.03-.022.03-.023.03-.023.03-.023.03-.024.029-.024.029-.025.029-.025.028-.025.029-.026.028-.027.028-.026.027-.028 12-12a3 3 0 00-4.242-4.242L24 25.757z');
    ctx.fillStyle = '#878e88';
    ctx.fill(p);
};

export default Object.freeze({
    draw
});
