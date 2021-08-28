let add = (game, canvas) => {
    if (game.canvas === undefined) {
        return game;
    }
    let resizeTOID = 0;
    let targetRatio = 1;
    let actualRatio = 1;
    let onR = e => {
        clearTimeout(resizeTOID);
        resizeTOID = setTimeout(_ => {
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            game.canvas.w = canvas.width;
            game.canvas.h = canvas.height;
            targetRatio = game.canvas.tW / game.canvas.tH;
            actualRatio = game.canvas.w / game.canvas.h;
            if (targetRatio < actualRatio) {
                game.canvas.zoom = game.canvas.h / game.canvas.tH;
                game.canvas.gH = game.canvas.tH;
                game.canvas.gW = game.canvas.tH * game.canvas.w / game.canvas.h;
            } else {
                game.canvas.zoom = game.canvas.w / game.canvas.tW;
                game.canvas.gW = game.canvas.tW;
                game.canvas.gH = game.canvas.tW * game.canvas.h / game.canvas.w;
            }
            let offsetX = (game.canvas.gW - game.canvas.tW) / 2;
            let offsetY = (game.canvas.gH - game.canvas.tH) / 2;
            game.canvas.gX = offsetX;
            game.canvas.gY = offsetY;
        }, 40);
    };
    onR();
    window.addEventListener('resize', onR);
};

export default Object.freeze({
    add
});
