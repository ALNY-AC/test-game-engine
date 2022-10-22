import Game from './game/Game';

import './style.css'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML 

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game();
game.el = canvas;
game.run();
