let draw = (entities, entity, ctx) => {
    if (entity.text.behind) {
        ctx.globalCompositeOperation = 'destination-over';
    }
    ctx.textAlign = entity.text.align || 'left';
    ctx.textBaseline = entity.text.base ||'top';
    ctx.fillStyle = '#f2f7f6';
    let fontSize = 14;
    ctx.font = fontSize + 'px monospace';
    ctx.fillText(entity.text.text, 0, 0);
};

export default Object.freeze({
    draw
});
