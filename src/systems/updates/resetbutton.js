import dataSystem from '../data.js';

let update = (entities, entity, time, delta) => {
    if (entity.position !== undefined) {
        entity.position.x = entities.game.canvas.gW - 48;
        entity.position.y = 0;
    }
    let pointer = entities.game.pointer;
    if (pointer.justUp) {
        if (pointer.x < entity.position.x || pointer.y > entity.position.y + 48) {
            return;
        }
        let levels = entities.game.levels;
        let sequence = (
            dataSystem.load('payed')
        ) ? levels.coil : levels.sequence;
        let puzzleId = sequence[levels.current];
        entities[puzzleId].puzzle.init = true;
        let state = entities.level.state;
        state.updates = [puzzleId];
    }
};

export default Object.freeze({
    update
});
