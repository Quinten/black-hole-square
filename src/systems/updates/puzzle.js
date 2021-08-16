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
    ['position', 'size'],
    ['position', 'size', 'blackhole'],
    ['position', 'size', 'blanksquare'],
    ['position', 'size', 'xsquare'],
    ['position', 'size', 'arrowup'],
    ['position', 'size', 'arrowright'],
    ['position', 'size', 'arrowdown'],
    ['position', 'size', 'arrowleft'],
    ['position', 'size', 'fillrect']
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
            entity.position.x = 16 + x * 48;
            entity.position.y = 16 + y * 48;
            state.draws.push(id);
            state.updates.push(id);
        });
    }
};

export default Object.freeze({
    update
});
