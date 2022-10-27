import Player from "./game/components/Player";
import BaseNode from "./game/core/BaseNode";

let node = new BaseNode();
console.warn(node.uuid);

// console.warn(node.);

node.addChild(new BaseNode('a'));
node.addChild(new BaseNode('b'));
node.addChild(new BaseNode('c'));
console.warn(node.children.map(el => el.name));
node.removeChild('b');
console.warn(node.children.map(el => el.name));
