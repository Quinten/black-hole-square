import entitySystem from '../entity.js';
import soundSystem from '../sound.js';

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

let swipedRight = false;
let swipedLeft = false;
let swipeWait = 0;

let solution = [];

let update = (entities, entity, time, delta) => {
    if (entity.puzzle.init === true) {
        entity.puzzle.init = false;
        solution= [];
        entities.tapstext.text.text = '' + entity.puzzle.taps;
        let state = entities.level.state;
        state.draws = [];
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
            entity.position.y = entity.home.y = 62 + y * 48;
            state.draws.push(id);
            state.updates.push(id);
            let topid = 'top' + i;
            let topentity = entitySystem.add(
                entities,
                topid,
                ...pieces[0]
            );
            topentity.position.x = topentity.home.x = 16 + x * 48;
            topentity.position.y = topentity.home.y = 62 + y * 48;
            state.draws.push(topid);
            state.updates.push(topid);
        });
        //console.log(entities);
    }
    let game = entities.game;
    if (game.pointer.isDown === true && solution.length < entity.puzzle.taps) {
        game.canvas.oX = game.canvas.gX
            + (game.pointer.x - game.pointer.downX);
        game.canvas.oY = game.canvas.gY;
    } else {
        let homeX = game.canvas.gX;
        let dir = 1;
        if (swipeWait <= 0 && swipedLeft) {
            homeX = homeX - game.canvas.gW;
        }
        if (swipeWait <= 0 && swipedRight) {
            homeX = homeX + game.canvas.gW;
            dir = -1;
        }
        game.canvas.oX = game.canvas.oX
            + (homeX - game.canvas.oX) / 6 * delta / 17;
        game.canvas.oY = game.canvas.gY;
        if (swipeWait <= 0 && (swipedLeft || swipedRight)) {
            if (
                Math.abs(homeX - game.canvas.oX)
                < 1 / entities.game.canvas.zoom
            ) {
                let levels = entities.game.levels;
                if (swipedLeft || solution.length === 0) {
                    levels.current = (levels.current + dir
                        + levels.sequence.length)
                        % levels.sequence.length;
                    }
                let puzzleId = levels.sequence[levels.current];
                entities[puzzleId].puzzle.init = true;
                let state = entities.level.state;
                state.updates = [puzzleId];
                game.canvas.oX = game.canvas.oX + game.canvas.gW * 2 * dir;
                swipedLeft = false;
                swipedRight = false;
            }
            return;
        } else {
            swipeWait = swipeWait - delta;
        }
    }
    if (entities.game.pointer.justUp === true) {
        let swipeX = game.pointer.x - game.pointer.downX;
        if (swipeX > 48) {
            //console.log('swipe right');
            swipedRight = true;
            swipeWait = 0;
            return;
        }
        if (swipeX < -48) {
            //console.log('swipe left');
            swipedLeft = true;
            swipeWait = 0;
            return;
        }
        let x = entities.game.pointer.x
            - 16 - (entities.game.canvas.gW - entities.game.canvas.tW) / 2;
        let y = entities.game.pointer.y
            - 62 - (entities.game.canvas.gH - entities.game.canvas.tH) / 2;
        if (solution.length >= entity.puzzle.taps) {
            return;
        }
        if (x < 0 || x > 288 || y < 0 || y > 288) {
            return;
        }
        x =  (x / 48) | 0;
        y = (y / 48) | 0;
        let i = x + y * 6;
        //console.log('klik', i);
        let moves = {
            arrowup: _ => {
                return shiftPieces(
                    -6,
                    35,
                    0
                );
            },
            arrowright: _ => {
                return shiftPieces(
                    1,
                    i + (5 - (i % 6)),
                    i - (i % 6)
                );
            },
            arrowdown: _ => {
                return shiftPieces(
                    6,
                    35,
                    0
                );
            },
            arrowleft: _ => {
                return shiftPieces(
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
                return 1;
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
                return 0;
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
            return changes.length;
        };
        let clicked = entities['piece' + i];
        Object.keys(moves).forEach(move => {
            if (clicked[move]) {
                let nChanges = moves[move]();
                if (nChanges > 0) {
                    solution.push(i);
                    let tunes = {
                        xsquare: '2C4',
                        arrowup: '2e4',
                        arrowright: '2a4',
                        arrowdown: '2D4',
                        arrowleft: '2G4'
                    };
                    let melody = [tunes[move]];
                    soundSystem.playSong({melody});
                } else {
                    let tunes = {
                        xsquare: '1C4',
                        arrowup: '1e4',
                        arrowright: '1a4',
                        arrowdown: '1D4',
                        arrowleft: '1G4'
                    };
                    let melody = [tunes[move]];
                    soundSystem.playSong({melody});
                }
                let tapsLeft = entity.puzzle.taps - solution.length;
                entities.tapstext.text.text = '' + tapsLeft;

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
                    swipedLeft = true;
                    swipeWait = 750;
                    let melody = ['4-', '2C4', '2D4', '4G4'];
                    soundSystem.playSong({melody});
                // check game over based on no taps left
                } else if (tapsLeft <= 0) {
                    swipedRight = true;
                    swipeWait = 750;
                    let bass = ['4-', '2e3', '6a2'];
                    soundSystem.playSong({bass});
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
                    swipedRight = true;
                    swipeWait = 750;
                    /*
                    let levels = entities.game.levels;
                    let puzzleId = levels.sequence[levels.current];
                    entities[puzzleId].puzzle.init = true;
                    let state = entities.level.state;
                    state.updates = [puzzleId];
                    */
                    let bass = ['4-', '4e3', '6a2'];
                    soundSystem.playSong({bass});
                }
            }
        });
    }
};

export default Object.freeze({
    update
});