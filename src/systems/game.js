import updateSystem from './update.js';
import drawSystem from './draw.js';
import resizeSystem from './resize.js';
import pointerSystem from './pointer.js';
import dataSystem from './data.js';

if (document.monetization) {
    document.monetization.addEventListener(
        'monetizationstart',
        _ => {
            dataSystem.save('payed', true);
        }
    );
}

let setup = (entities) => {
    let game = entities.game;
    let ctx;
    let canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    let parent = document.querySelector(
        game.canvas.parentSelector
    );
    resizeSystem.resize(game, canvas);
    parent.appendChild(canvas);
    pointerSystem.add(game, canvas);
    let timer = 0;
    let delta = 0;
    let onF = time => {
        delta = time - timer;
        timer = time;
        //console.log(delta);

        resizeSystem.resize(game, canvas);

        let wasPointing = game.pointer.pointing;
        game.pointer.pointing = false;

        let updates = [];
        let draws = [];

        game.statemachine.active.forEach(id => {
            let entity = entities[id];
            if (entity.state === undefined) {
                return;
            }
            updates = [...updates, ...entity.state.updates];
            draws = [...draws, ...entity.state.draws];
        });

        updateSystem.process(entities, updates, time, delta);

        // reset pointer
        game.pointer.justDown = false;
        game.pointer.justUp = false;

        if (wasPointing && !game.pointer.pointing) {
            canvas.style.cursor = 'default';
        } else if (!wasPointing && game.pointer.pointing) {
            canvas.style.cursor = 'pointer';
        }

        // clear canvas
        ctx.clearRect(0, 0, game.canvas.w, game.canvas.h);

        // draw stuff
        drawSystem.process(entities, draws, ctx, time, delta);

        // request next frame
        requestAnimationFrame(onF);
    };
    onF(0);
    return;
};

export default Object.freeze({
    setup
});
