import entitySystem from '../entity.js';

/*
 * keys
 *
 * 0 = nothing
 * 1 = black hole
 * 2 = blank square (moves with other, but not clickable)
 * 3 = X squares (moves with others, disappears on click)
 * 4 = arrow up (pushes others up on click)
 * 5 = arrow right (pushes others right on click)
 * 6 = arrow down (pushes others down on click)
 * 7 = arrow left (pushes others left on click)
 * 8 = worm hole -if time left in scope-
 */

let pieces = [
    ['position', 'size', 'home'],
    ['position', 'size', 'home', 'blackhole'],
    ['position', 'size', 'home', 'blanksquare'],
    ['position', 'size', 'home', 'xsquare'],
    ['position', 'size', 'home', 'arrowup'],
    ['position', 'size', 'home', 'arrowright'],
    ['position', 'size', 'home', 'arrowdown'],
    ['position', 'size', 'home', 'arrowleft'],
    ['position', 'size', 'home', 'fillrect']
];

let update = (entities, entity, time, delta) => {
    if (entity.puzzle.init === true) {
        entity.puzzle.init = false;
        let state = entities.level.state;
        entity.puzzle.grid.forEach((p, i) => {
            let x = i % 6;
            let y = (i / 6) | 0;
            let id = 'piece' + i;
            let entity = entitySystem.add(
                entities,
                id,
                ...pieces[p]
            );
            entity.position.x = entity.home.x = 16 + x * 48;
            entity.position.y = entity.home.y = 64 + y * 48;
            state.draws.push(id);
            state.updates.push(id);
            let topid = 'top' + i;
            let topentity = entitySystem.add(
                entities,
                topid,
                ...pieces[0]
            );
            topentity.position.x = topentity.home.x = 16 + x * 48;
            topentity.position.y = topentity.home.y = 64 + y * 48;
            state.draws.push(topid);
            state.updates.push(topid);
        });
        console.log(entities);
    }
    if (entities.game.pointer.justUp === true) {
        let x = entities.game.pointer.x
            - 16 - (entities.game.canvas.gW - entities.game.canvas.tW) / 2;
        let y = entities.game.pointer.y
            - 64 - (entities.game.canvas.gH - entities.game.canvas.tH) / 2;
        if (x < 0 || x > 288 || y < 0 || y > 288) {
            return;
        }
        x =  (x / 48) | 0;
        y = (y / 48) | 0;
        let i = x + y * 6;
        //console.log('klik', i);
        let moves = {
            arrowup: _ => {
                shiftPieces(
                    -6,
                    35,
                    0
                );
            },
            arrowright: _ => {
                shiftPieces(
                    1,
                    i + (5 - (i % 6)),
                    i - (i % 6)
                );
            },
            arrowdown: _ => {
                shiftPieces(
                    6,
                    35,
                    0
                );
            },
            arrowleft: _ => {
                shiftPieces(
                    -1,
                    i + (5 - (i % 6)),
                    i - (i % 6)
                );
            },
            xsquare: _ => {
                // remove square
                // TODO proper disappear animation
                // TODO store for undo
                delete entities['piece' + i].xsquare;
            }
        };
        let shiftPieces = (search, max, min) => {
            //console.log('push stuff down');
            let next = entities['piece' + i];
            let j = i;
            let changes = [];
            let stop = false;
            while (!stop) {
                next = entities['piece' + j];
                if ([
                    'blanksquare',
                    'xsquare',
                    'arrowup',
                    'arrowright',
                    'arrowdown',
                    'arrowleft'
                ].some(prop => next[prop] !== undefined)) {
                    changes.unshift('top' + j);
                    changes.push('piece' + j);
                } else {
                    if (next.blackhole !== undefined) {
                        changes.unshift('top' + j);
                    } else {
                        changes.unshift('top' + j);
                        changes.push('piece' + j);
                    }
                    stop = true;
                    break;
                }
                j = j + search;
                if (j > max || j < min) {
                    changes = [];
                    stop = true;
                }
            }
            if (changes.length < 1) {
                return;
            }
            //console.log(changes);
            let firstId = changes.shift();
            let prev = entities[firstId];
            let firstHome = prev.home;
            let nextHome;
            let nextE;
            changes.forEach(id => {
                nextE = entities[id];
                nextHome = nextE.home;
                entities[id] = prev;
                entities[id].home = nextHome;
                prev = nextE;
            });
            entities[firstId] = prev;
            // remove square
            // TODO proper disappear animation
            // TODO store for undo
            entities[firstId].home = firstHome;
            entities[firstId].home.suck = true;
/*
            [
                'blanksquare',
                'xsquare',
                'arrowup',
                'arrowright',
                'arrowdown',
                'arrowleft'
            ].forEach(prop => {
                delete entities[firstId][prop];
            });
            */
        };
        let clicked = entities['piece' + i];
        Object.keys(moves).forEach(move => {
            if (clicked[move]) {
                moves[move]();

                // check puzzle complete
                if (!entity.puzzle.grid.some((e, i) => [
                        'blanksquare',
                        'xsquare',
                        'arrowup',
                        'arrowright',
                        'arrowdown',
                        'arrowleft'
                    ].some(prop => entities['piece' + i][prop] !== undefined)
                )) {
                    let levels = entities.game.levels;
                    levels.current = (levels.current + 1)
                        % levels.sequence.length;
                    let puzzleId = levels.sequence[levels.current];
                    entities[puzzleId].puzzle.init = true;
                    let state = entities.level.state;
                    state.updates = [puzzleId];
                    state.draws = [];

                // check for game over based on no clickables left
                } else if (!entity.puzzle.grid.some((e, i) => [
                        'xsquare',
                        'arrowup',
                        'arrowright',
                        'arrowdown',
                        'arrowleft'
                    ].some(prop => entities['piece' + i][prop] !== undefined)
                )) {
                    //console.log('No clickables left, but blank squares left!');
                    let levels = entities.game.levels;
                    let puzzleId = levels.sequence[levels.current];
                    entities[puzzleId].puzzle.init = true;
                    let state = entities.level.state;
                    state.updates = [puzzleId];
                    state.draws = [];
                }
            }
        });
    }
};

export default Object.freeze({
    update
});
