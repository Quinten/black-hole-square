let drawSquare = [
    (ctx, x) => [
        ctx.fillStyle = '#4B8495',
        ctx.fillRect(x, 0, 8, 8)
    ],
    (ctx, x) => [
        ctx.strokeStyle = '#4B8495',
        ctx.strokeRect(x + .5, .5, 7, 7)
    ],
    (ctx, x) => [
        ctx.fillStyle = '#F2F7F6',
        ctx.fillRect(x, 0, 8, 8)
    ],
    (ctx, x) => [
        ctx.strokeStyle = '#F2F7F6',
        ctx.strokeRect(x + .5, .5, 7, 7)
    ]
];

let draw = (entities, entity, ctx) => {
    let dots = entity.progress.dots;
    dots.forEach((dot, i) => {
        drawSquare[dot](
            ctx,
            i * 12 - dots.length * 6
        );
    });
};

export default Object.freeze({
    draw
});
