let transform = (entities, entity, ctx) => {
    if (entity.position !== undefined) {
        ctx.translate(
            entity.position.x,
            entity.position.y
        );
    }
};

export default Object.freeze({
    transform
});
