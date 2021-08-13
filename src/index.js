import gameSystem from './systems/game.js';

import entities from './entities.json';

console.log(entities);

gameSystem.setup(entities);
