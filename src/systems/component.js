let components = {};
let importComponents = (r) => {
    r.keys().forEach((k) => {
        let name = k.replace(/\.\/(.+)\.json$/, '$1');
        components[name] = r(k);
    });
};
importComponents(
    require.context(
        '../components/',
        false,
        /\.(json)$/
    )
);

let add = (entity, component) => {
    entity[component] = JSON.parse(
        JSON.stringify(
            components[component]
        )
    );
    return entity;
};

export default Object.freeze({
    add
});
