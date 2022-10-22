import Block from './game/components/Block';
import Npc from './game/components/Npc';
import Player from './game/components/Player';
import Scene from './game/components/Scene';
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

let scene = new Scene();
game.addComponent(scene);


// let block = new Block();
// game.addComponent(block);

let player = new Player();
game.addComponent(player);

let npc = new Npc();
game.addComponent(npc);

