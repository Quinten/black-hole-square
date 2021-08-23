import gameSystem from './systems/game.js';

import entities from './entities.json';

// after launch add migrations here
// ...

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
