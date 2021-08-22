let draw = (entities, entity, ctx) => {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f2f7f6';
    let fontSize = 16;
    ctx.font = fontSize + 'px sans-serif';
    ctx.fillText(entity.text.text, 0, 0);
};

export default Object.freeze({
    draw
});
