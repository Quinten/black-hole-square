let draws = {};
let importDraws = (r) => {
    r.keys().forEach((k) => {
        let component = k.replace(
            /\.\/([^\/]+)\.js$/,
            '$1'
        );
        draws[component] = r(k).default;
    });
};
importDraws(
    require.context(
        './draws/',
        false,
        /\.(js)$/
    )
);

let transforms = {};
let importTransforms = (r) => {
    r.keys().forEach((k) => {
        let component = k.replace(
            /\.\/([^\/]+)\.js$/,
            '$1'
        );
        transforms[component] = r(k).default;
    });
};
importTransforms(
    require.context(
        './transforms/',
        false,
        /\.(js)$/
    )
);

let process = (entities, ids, ctx, time, delta) => {
    ids.forEach(id => {
        let entity = entities[id];
        ctx.save();
        ctx.scale(
            entities.game.canvas.zoom,
            entities.game.canvas.zoom
        );
        Object.keys(entity).forEach(component => {
            if (transforms[component] !== undefined) {
                transforms[component].transform(entities, entity, ctx, time, delta);
            }
        });
        Object.keys(entity).forEach(component => {
            if (draws[component] !== undefined) {
                draws[component].draw(entities, entity, ctx, time, delta);
            }
        });
        ctx.restore();
    });
};

export default Object.freeze({
    process
});
