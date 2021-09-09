import entitySystem from '../entity.js';
import soundSystem from '../sound.js';
import dataSystem from '../data.js';

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
 * 8 = neutronstar (pushable, but truns into blackhole, when clicked)
 * 9 = worm hole -if time left in scope-
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
    ['position', 'size', 'home', 'neutronstar']
];

let clickables = [
    'xsquare',
    'arrowup',
    'arrowright',
    'arrowdown',
    'arrowleft',
    'neutronstar'
];

let pushables = [
    'blanksquare',
    'xsquare',
    'arrowup',
    'arrowright',
    'arrowdown',
    'arrowleft',
    'neutronstar'
];

let failSound = {bass: ['4-', '2e3', '6a2']};
let victorySound = {melody: ['4-', '2C3', '2D3', '4G3']};
let notes = ['C3', 'e3', 'a3', 'D3', 'G3', 'b3'];
let tapSounds = {};
let dabSounds = {};
clickables.forEach((name, i) => {
    tapSounds[name] = {melody: ['2' + notes[i]]};
    dabSounds[name] = {melody: ['1' + notes[i]]};
});

let swipedRight = false;
let swipedLeft = false;
let swipeWait = 0;
let swiped = false;
let wheelLeft = false;
let wheelRight = false;

window.addEventListener('wheel', e => {
    if (swiped) {
        return;
    }
    if (e.deltaX <= -1) {
        wheelRight = true;
    } else if (e.deltaX >= 1) {
        wheelLeft = true;
    }
});

let solution = [];

let solved = dataSystem.load('solved') || [];
let solutions = dataSystem.load('solutions') || {};

let update = (entities, entity, time, delta) => {
    if (entity.puzzle.init === true) {
        entity.puzzle.init = false;
        solution= [];
        entities.tapstext.text.text = (entity.puzzle.taps)
            ? entity.puzzle.taps + ' moves'
            : '';
        let sequence = (
            dataSystem.load('payed')
        ) ? entities.game.levels.wm : entities.game.levels.sequence;
        let puzzleId = sequence[entities.game.levels.current];
        entities.titletext.text.text = (entity.puzzle.taps)
            ? 'The ' + puzzleId
            : '';
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
        if (entity.puzzle.text !== undefined) {
            entity.puzzle.text.forEach((t, i, a) => {
                let id = 'text' + i;
                let entity = entitySystem.add(
                    entities,
                    id,
                    'position',
                    'text'
                );
                entity.position.x = 160;
                entity.position.y = 208 - a.length * 12 + i * 24;
                entity.text.text = t;
                entity.text.align = 'center';
                state.draws.push(id);
                state.updates.push(id);
                let topid = 'top' + i;
                let topentity = entitySystem.add(
                    entities,
                    topid,
                    ...pieces[0]
                );
            });
        }
        if (entity.puzzle.noBoard === true) {
            entities.controls.state.draws = [
                'tunnel',
                'maintitle'
            ];
            entities.controls.state.updates = [];
        } else if (entity.puzzle.text !== undefined) {
            entities.controls.state.draws = [
                'bgcut',
                'bgout',
                'feedback',
                'tunnel'
            ];
            entities.controls.state.updates = [];
        } else {
            entities.controls.state.draws = [
                'bgcut',
                'bgout',
                'feedback',
                'tunnel',
                'tapstext',
                'titletext',
                'progress'
            ];
            entities.controls.state.updates = [
                'progress'
            ];
        }
    }
    let game = entities.game;
    if (wheelRight) {
        if (entity.puzzle.lT) {
            entities.feedback.text.text = entity.puzzle.lT;
        } else if (solution.length === 0) {
            entities.feedback.text.text = 'Back';
        } else {
            entities.feedback.text.text = 'Reset';
        }
        swipedRight = true;
        swipeWait = 0;
        swiped = true;
        wheelRight = false;
        return;
    }
    if (wheelLeft) {
        if (entity.puzzle.rT) {
            entities.feedback.text.text = entity.puzzle.rT;
        } else {
            entities.feedback.text.text = 'Skip';
        }
        swipedLeft = true;
        swipeWait = 0;
        swiped = true;
        wheelLeft = false;
        return;
    }
    if (!swiped && game.pointer.isDown === true && (solution.length < entity.puzzle.taps || entity.puzzle.text)) {
        let swipeX = game.pointer.x - game.pointer.downX;
        game.canvas.oX = game.canvas.gX + swipeX;
        game.canvas.oY = game.canvas.gY;
        if (swipeX > 48) {
            if (entity.puzzle.lT) {
                entities.feedback.text.text = entity.puzzle.lT;
            } else if (solution.length === 0) {
                entities.feedback.text.text = 'Back';
            } else {
                entities.feedback.text.text = 'Reset';
            }
        }
        if (swipeX < -48) {
            if (entity.puzzle.rT) {
                entities.feedback.text.text = entity.puzzle.rT;
            } else {
                entities.feedback.text.text = 'Skip';
            }
        }
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
            + (homeX - game.canvas.oX) / 7 * delta / 17;
        game.canvas.oY = game.canvas.gY;
        if (swipeWait <= 0 && (swipedLeft || swipedRight)) {
            if (
                Math.abs(homeX - game.canvas.oX)
                < 1 / entities.game.canvas.zoom
            ) {
                let levels = entities.game.levels;
                let sequence = (
                    dataSystem.load('payed')
                ) ? entities.game.levels.wm : entities.game.levels.sequence;
                if (swipedLeft || solution.length === 0) {
                    let oldLevel = levels.current;
                    levels.current = Math.min(
                        Math.max(levels.current + dir, 0),
                        sequence.length - 1
                    );
                    dataSystem.save('current', levels.current);
                    if (oldLevel === levels.current) {
                        dir = -dir;
                    }
                }
                let puzzleId = sequence[levels.current];
                entities[puzzleId].puzzle.init = true;
                let state = entities.level.state;
                state.updates = [puzzleId];
                game.canvas.oX = game.canvas.oX + game.canvas.gW * 2 * dir;
                swipedLeft = false;
                swipedRight = false;
            }
            return;
        } else if (swipeWait > 0) {
            swipeWait = swipeWait - delta;
        } else if (
            Math.abs(homeX - game.canvas.oX)
                < 1 / entities.game.canvas.zoom
        ) {
            swiped = false;
        }
    }
    if (entities.game.pointer.justUp === true) {
        let swipeX = game.pointer.x - game.pointer.downX;
        if (swipeX > 48) {
            //console.log('swipe right');
            swipedRight = true;
            swipeWait = 0;
            swiped = true;
            return;
        }
        if (swipeX < -48) {
            //console.log('swipe left');
            swipedLeft = true;
            swipeWait = 0;
            swiped = true;
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
            arrowup: a => {
                return shiftPieces(
                    -6,
                    35,
                    0,
                    a
                );
            },
            arrowright: a => {
                return shiftPieces(
                    1,
                    i + (5 - (i % 6)),
                    i - (i % 6),
                    a
                );
            },
            arrowdown: a => {
                return shiftPieces(
                    6,
                    35,
                    0,
                    a
                );
            },
            arrowleft: a => {
                return shiftPieces(
                    -1,
                    i + (5 - (i % 6)),
                    i - (i % 6),
                    a
                );
            },
            xsquare: a => {
                // remove square
                if (a) {
                    delete entities['piece' + i].xsquare;
                }
                return 1;
            },
            neutronstar: a => {
                // remove square
                if (a) {
                    delete entities['piece' + i].neutronstar;
                    entities['piece' + i].blackhole = {};
                    entities['top' + i].neutronstar = {};
                    entities['top' + i].home.suck = true;
                }
                return 1;
            }
        };
        let shiftPieces = (search, max, min, applyChanges = true) => {
            //console.log('push stuff down');
            let next = entities['piece' + i];
            let j = i;
            let changes = [];
            let stop = false;
            while (!stop) {
                next = entities['piece' + j];
                if (pushables.some(prop => next[prop] !== undefined)) {
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
            if (!applyChanges) {
                return changes.length;
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
            entities[firstId].home = firstHome;
            entities[firstId].home.suck = true;
            return changes.length;
        };
        let clicked = entities['piece' + i];
        Object.keys(moves).forEach(move => {
            if (clicked[move]) {
                clicked.clicked = 16;
                let nChanges = moves[move](true);
                if (nChanges > 0) {
                    solution.push(i);
                    soundSystem.playSong(tapSounds[move]);
                } else {
                    soundSystem.playSong(dabSounds[move]);
                }
                let tapsLeft = entity.puzzle.taps - solution.length;
                entities.tapstext.text.text = tapsLeft + ' moves';

                // check puzzle complete
                if (!entity.puzzle.grid.some((e, i) => pushables.some(
                    prop => entities['piece' + i][prop] !== undefined
                ))) {
                    swipedLeft = true;
                    swipeWait = 750;
                    swiped = true;
                    soundSystem.playSong(victorySound);
                    entities.feedback.text.text = 'Clean!';
                    let levels = entities.game.levels;
                    let sequence = (
                        dataSystem.load('payed')
                    ) ? levels.wm : levels.sequence;
                    let puzzleId = sequence[levels.current];
                    if (solved.indexOf(puzzleId) < 0) {
                        solved.push(puzzleId);
                        dataSystem.save('solved', solved);
                    }
                    if (solutions[puzzleId] === undefined) {
                        solutions[puzzleId] = [];
                    }
                    let jsonSolution = JSON.stringify(solution);
                    if (solutions[puzzleId].indexOf(jsonSolution) === -1) {
                        solutions[puzzleId].push(jsonSolution);
                        dataSystem.save('solutions', solutions);
                    }
                // check game over based on no taps left
                } else if (tapsLeft <= 0) {
                    swipedRight = true;
                    swipeWait = 750;
                    swiped = true;
                    soundSystem.playSong(failSound);
                    entities.feedback.text.text = 'Out of moves!';
                // check for game over based on no clickables left
                } else if (!entity.puzzle.grid.some((e, i) => clickables.some(
                    prop => entities['piece' + i][prop] !== undefined
                ))) {
                    //console.log('No clickables left, but blank squares left!');
                    swipedRight = true;
                    swipeWait = 750;
                    swiped = true;
                    soundSystem.playSong(failSound);
                    entities.feedback.text.text = 'Not clean...';
                // check for game over based on stuck
                } else {
                    i = 0;
                    let stuck = true;
                    while (i < 36 && stuck) {
                        let tested = entities['piece' + i];
                        Object.keys(moves).forEach(move => {
                            if (tested[move]) {
                                let nChanges = moves[move](false);
                                if (nChanges > 0) {
                                    stuck = false;
                                }
                            }
                        });
                        i = i + 1;
                    }
                    if (stuck) {
                        swipedRight = true;
                        swipeWait = 750;
                        swiped = true;
                        soundSystem.playSong(failSound);
                        entities.feedback.text.text = 'Stuck';
                    }
                }
            }
        });
    } else if (!entities.game.pointer.isDown) {
        let x = entities.game.pointer.x
            - 16 - (entities.game.canvas.gW - entities.game.canvas.tW) / 2;
        let y = entities.game.pointer.y
            - 62 - (entities.game.canvas.gH - entities.game.canvas.tH) / 2;
        if (x < 0 || x > 288 || y < 0 || y > 288) {
            return;
        }
        x =  (x / 48) | 0;
        y = (y / 48) | 0;
        let i = x + y * 6;
        if (
            entities['piece'+i] !== undefined
            && clickables.some(prop => entities['piece'+i][prop] !== undefined)
        ) {
           entities.game.pointer.pointing = true;
           entities['piece'+i].clicked = 1;
        }
    }
};

export default Object.freeze({
    update
});
