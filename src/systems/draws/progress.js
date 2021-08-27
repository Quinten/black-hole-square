import dataSystem from '../data.js';

let drawSquare = [
    (ctx, x) => [
        ctx.strokeStyle = '#4B8495',
        ctx.strokeRect(x + .5, .5, 7, 7)
    ],
    (ctx, x) => [
        ctx.fillStyle = '#4B8495',
        ctx.fillRect(x, 0, 8, 8)
    ],
    (ctx, x) => [
        ctx.strokeStyle = '#F2F7F6',
        ctx.strokeRect(x + .5, .5, 7, 7)
    ],
    (ctx, x) => [
        ctx.fillStyle = '#F2F7F6',
        ctx.fillRect(x, 0, 8, 8)
    ]
];

let draw = (entities, entity, ctx) => {
    let solved = dataSystem.load('solved') || [];
    let sequence = entities.game.levels.sequence;
    let current = entities.game.levels.current;
    let currentPuzzleId = sequence[current];
    let dots = [];
    sequence.forEach(puzzleId => {
        let puzzle = entities[puzzleId].puzzle;
        if (puzzle.grid.length) {
            let dot = 0;
            if (solved.indexOf(puzzleId) > -1) {
                dot = dot + 1;
            }
            if (puzzleId === currentPuzzleId) {
                dot = dot + 2;
            }
            dots.push(dot);
        }
    });
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
