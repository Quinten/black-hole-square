import updateSystem from './update.js';
import drawSystem from './draw.js';
import resizeSystem from './resize.js';
import pointerSystem from './pointer.js';

/*
if (document.monetization) {
    document.monetization.addEventListener(
        'monetizationstart',
        _ => {
        }
    );
}
*/

let setup = (entities) => {
    let game = entities.game;
    let ctx;
    if (game.canvas !== undefined) {
        let canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        let parent = document.querySelector(
            game.canvas.parentSelector
        );
        if (game.canvas.parentSelector === 'body') {
            resizeSystem.add(game, canvas);
        } else {
            canvas.width = game.canvas.w;
            canvas.height = game.canvas.h;
        }
        parent.appendChild(canvas);
        let loader = document.querySelector('#loading');
        if (loader !== null) {
            loader.remove();
        }
        if (game.pointer !== undefined) {
            pointerSystem.add(game, canvas);
        }
    }
    if (game.statemachine === undefined || ctx === undefined) {
        return;
    }
    let timer = 0;
    let delta = 0;
    let onF = time => {
        delta = time - timer;
        timer = time;
        //console.log(delta);

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
        if (game.pointer !== undefined) {
            game.pointer.justDown = false;
            game.pointer.justUp = false;
        }

        // clear canvas
        ctx.clearRect(0, 0, game.canvas.w, game.canvas.h);

        // draw stuff
        drawSystem.process(entities, draws, ctx);

        // request next frame
        requestAnimationFrame(onF);
    };
    onF(0);
    return;
};

export default Object.freeze({
    setup
});
