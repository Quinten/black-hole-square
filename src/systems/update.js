let updates = {};
let importUpdates = (r) => {
    r.keys().forEach((k) => {
        let component = k.replace(
            /\.\/([^\/]+)\.js$/,
            '$1'
        );
        updates[component] = r(k).default;
    });
};
importUpdates(
    require.context(
        './updates/',
        false,
        /\.(js)$/
    )
);

let process = (entities, ids, time, delta) => {
    ids.forEach(id => {
        let entity = entities[id];
        Object.keys(entity).forEach(component => {
            if (updates[component] !== undefined) {
                updates[component].update(
                    entities,
                    entity,
                    time,
                    delta
                );
            }
        });
    });
};

export default Object.freeze({
    process
});
