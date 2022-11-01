import Cube from './game/core/components/Cube';
import Scene from './game/core/components/Scene';
import Node from './game/core/Node';
import Game from './game/Game'
import './style.scss'


const game = new Game();
game.scene = new Scene('场景1');
game.init('#gameApp');
game.run();

let root = new Node('root');



// game.scene.addChild(npcNode);
// root.scene = game.scene;
game.scene.addChild(root);
root.scene = game.scene;


let npcNode = new Node('npc');
npcNode.addComponent(new Cube('npc 1'));

console.warn(root.scene);

root.addChild(npcNode);

// import Component from "./game/core/Component";
// import Node from "./game/core/Node";
// let depth = 1;

// let rootNode = new Node('root');
// let userNode = new Node('user');
// let npcNode = new Node('npc');

// rootNode.addChild(userNode);
// rootNode.addChild(npcNode);

// npcNode.addComponent(new Component('wq'));
// npcNode.addComponent(new Component('control'));

// let yf = new Component('yf');
// npcNode.addComponent(yf);


// info(rootNode);

// console.warn('====');
// npcNode.removeComponentByName('control');


// info(rootNode);

// function getDept() {
//     return '|' + new Array((depth * 3)).fill('--').join('') + "| ";
// }

// function info(node: Node) {
//     console.warn(`${getDept()}Node.${node.name}`);
//     console.warn(`${getDept()}> components:`, node.components.map(c => c.name));
//     console.warn(`${getDept()}> child:`, node.children.map(c => c.name));
//     if (node.children.length <= 0) depth = 1;
//     node.children.forEach(el => {
//         depth++;
//         info(el);
//     })
// }