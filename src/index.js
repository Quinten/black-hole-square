import gameSystem from './systems/game.js';
import dataSystem from './systems/data.js';

import entities from './entities.json';

let current = dataSystem.load('current');

if (current !== undefined) {
    entities.game.levels.current = current;
    let sequence = (
        dataSystem.load('payed')
    ) ? entities.game.levels.wm : entities.game.levels.sequence;
    let puzzleId = sequence[current];
    entities.level.state.updates = [puzzleId];
}

gameSystem.setup(entities);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', e => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            //console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            //console.log('ServiceWorker registration failed: ', err);
        });
    });
}
