import componentSystem from './component.js';

let add = (entities, id, ...comps) => {
    let entity = {};
    comps.forEach(comp => {
        componentSystem.add(entity, comp);
    });
    entities[id] = entity;
    return entity;
};

export default Object.freeze({
    add
});
