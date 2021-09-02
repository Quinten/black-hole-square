import soundSystem from './sound.js';

let add = (game, canvas) => {
    let pointer = game.pointer;
    let viewportOffset;
    let left;
    let top;
    let adjust;
    let pointerX;
    let pointerY;
    let mouseEntered = false;

    let handlePointerDown = (x, y) => {
        pointer.x = x;
        pointer.y = y;
        pointer.downX = x;
        pointer.downY = y;
        pointer.justDown = true;
        pointer.isDown = true;
        mouseEntered = false;
    };

    let handlePointerMove = (x, y) => {
        pointer.x = x;
        pointer.y = y;
    };

    let handlePointerUp = (x, y) => {
        if (mouseEntered) {
            mouseEntered = false;
            return;
        }
        pointer.x = x;
        pointer.y = y;
        pointer.justUp = true;
        pointer.isDown = false;
    };

    canvas.addEventListener('mousedown', e => {
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = (e.clientX - left) / adjust;
        pointerY = (e.clientY - top) / adjust;
        handlePointerDown(pointerX, pointerY);
    });

    canvas.addEventListener('touchstart', e => {
        e.preventDefault(); // this prevents the mousedown from firing
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = (e.changedTouches[0].clientX - left) / adjust;
        pointerY = (e.changedTouches[0].clientY - top) / adjust;
        handlePointerDown(pointerX, pointerY);
        // get around ios sound limitations
        soundSystem.playSong({melody: ['8-']});
    });

    canvas.addEventListener('mousemove', e => {
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = (e.clientX - left) / adjust;
        pointerY = (e.clientY - top) / adjust;
        handlePointerMove(pointerX, pointerY);
    });

    canvas.addEventListener('touchmove', e => {
        e.preventDefault(); // this prevents the mousemove from firing
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = (e.changedTouches[0].clientX - left) / adjust;
        pointerY = (e.changedTouches[0].clientY - top) / adjust;
        handlePointerMove(pointerX, pointerY);
    });

    canvas.addEventListener('mouseup', e => {
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = (e.clientX - left) / adjust;
        pointerY = (e.clientY - top) / adjust;
        handlePointerUp(pointerX, pointerY);
    });

    canvas.addEventListener('touchend', e => {
        e.preventDefault(); // this prevents the mouseup from firing
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = game.canvas.zoom / window.devicePixelRatio;
        pointerX = e.changedTouches[0].clientX / adjust;
        pointerY = e.changedTouches[0].clientY / adjust;
        handlePointerUp(pointerX, pointerY);
    });

    canvas.addEventListener('mouseout', e => {
        if (pointer.isDown) {
            pointer.justUp = true;
            pointer.isDown = false;
        }
    });

    canvas.addEventListener('mouseenter', e => {
        mouseEntered = true;
    });
};

export default Object.freeze({
    add
});
