let update = (entities, entity, time, delta) => {
    if (entity.puzzle.init === true) {
        entity.puzzle.init = false;
        console.log('init puzzle');
    }
};

export default Object.freeze({
    update
});
