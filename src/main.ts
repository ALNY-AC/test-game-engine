import Game from './game/Game'
import './style.scss'


const game = new Game();
game.init('#gameApp');


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