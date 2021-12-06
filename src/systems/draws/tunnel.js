let fl = 400;

let quads = [];
let numQuads = 42;
for (let i = 0; i < numQuads; i++) {
    let start = Math.random() * fl * 7;
    let length = fl + Math.random() * fl * 2;
    let rotation = Math.random() * Math.PI * 2;
    let q = { start, length, rotation };
    quads.push(q);
}

let angleZ = -0.005;

let quad = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
};

let rotate = (a, b, angle, cos = Math.cos(angle), sin = Math.sin(angle)) => [
    cos * a - sin * b,
    sin * a + cos * b
];

let project = (vpX, vpY, fl, x, y, z, scale = 1, p = fl / (fl + z) * scale) => [
    vpX + x * p,
    vpY + y * p
];

let draw = (entities, entity, ctx, time, delta) => {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = entity.tunnel.fill;
    quads.forEach((q) => {
        q.start -= 8 * delta / 17;
        if (q.start < -fl + 2) {
            q.length = fl / 2 + Math.random() * fl / 2;
            q.start = q.start + fl * 8;
            q.rotation = Math.random() * Math.PI * 2;
        }
        q.rotation = q.rotation + angleZ * delta / 17;
        let points = [
            {x: -4, y: 80, z: q.start},
            {x: 4, y: 80, z: q.start},
            {x: 4, y: 80, z: Math.max(q.start - q.length, -fl + 1)},
            {x: -4, y: 80, z: Math.max(q.start - q.length, -fl + 1)}
        ];

        let arg = [];
        points.forEach((p) => {
            let [x, y] = rotate(p.x, p.y, q.rotation);
            arg.push(...project(
                entities.game.canvas.gW/2,
                entities.game.canvas.gH/2,
                fl, x, y, p.z
            ));
        });
        // draw
        quad(ctx, ...arg);
    });
};

export default Object.freeze({
    draw
});
