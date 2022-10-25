import Block from './game/components/Block';
import Camera from './game/components/Camera';
import Npc from './game/components/Npc';
import Player from './game/components/Player';
import Scene from './game/components/Scene';
import Tag from './game/components/Tag';
import Game from './game/Game';
import Ai from './game/script/Ai';

import './style.scss'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML 

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 700;
canvas.height = 700;

const game = new Game();
game.addComponent(new Camera('Camera'));

game.el = canvas;

let map = [
    [0, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 1, 1, 1],
];
map.forEach((a, i) => {
    a.forEach((b, j) => {
        if (b == 1) {
            let block = new Block();
            block.color = '#555'
            block.x = (j * 2) * 20;
            block.y = (i * 2) * 20;
            game.addComponent(block);
        }


    })
})

let scene = new Scene();
game.addComponent(scene);


// let block = new Block();
// game.addComponent(block);

let player = new Player('player');
game.addComponent(player);


for (let i = 0; i < 1; i++) {
    game.addComponent(new Npc('npc'));
}



game.addComponent(new Tag());



game.addComponent(new Ai());




game.run();
