let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.getElementById('tool').offsetHeight;
let sceneWidth = window.innerWidth;
let sceneHeight = window.innerHeight - document.getElementById('tool').offsetHeight;
document.body.appendChild(canvas);
let aiPathPoint = [

];
if (typeof localStorage.aiPathPoint != 'undefined') {
    aiPathPoint = JSON.parse(localStorage.aiPathPoint);
}
const renders = [];
const updates = [];
let clickPoint = [];
let w = 20;
let h = 20;
let isFire = false;
let isDarwLine = false;
let aiToModel = 'path'
const keys = {};
const polled = {};

const mouse = {
    x: 0,
    y: 0,
    isDown: false,
    clickX: 0,
    clickY: 0,
}
function darwLine(e) {
    isDarwLine = e.checked;
}
function clearLine() {
    aiPathPoint = [];
    localStorage.removeItem('aiPathPoint');
    aiIndex = 0;
}
function aiToPath() {
    aiToModel = 'path'
}
function aiToPlayer() {
    aiToModel = 'player'
}
function poll() {
    Object.keys(keys).forEach(k => {
        if (!polled[k]) polled[k] = 0;
        if (keys[k]) {
            polled[k]++;
        } else {
            polled[k] = 0;
        }
    })
}
let ctx = canvas
ctx = ctx.getContext("2d")
//CSS颜色,渐变,或图案,默认设置是#000000（黑色）
//x-横坐标 y-纵坐标 w-宽 h-高

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});

canvas.addEventListener('mousedown', (e) => {
    let dx = Math.floor(e.offsetX / w) * w;//e.offsetX 
    let dy = Math.floor(e.offsetY / h) * h;//e.offsetY 
    if (isDarwLine) {
        aiPathPoint.push([dx, dy]);
        localStorage.aiPathPoint = JSON.stringify(aiPathPoint);
    }
    mouse.isDown = true;
    clickPoint = [];
    clickPoint.push([dx, dy]);
});

canvas.addEventListener('mouseup', (e) => {
    mouse.isDown = false;
});

window.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true;
    // console.warn(e.keyCode);
})

window.addEventListener('keyup', (e) => {
    keys[e.keyCode] = false;
})


let npc = {
    x: 0,
    y: 0,
    angle: 0,
    color: '#00ff00',
    name: 'npc'
};
let user = {
    x: 0,
    y: 0,
    angle: 0,
    color: '#ffffff',
    speed: 500,
    name: 'user'
}
let aiIndex = 0;

function update(dt) {
    poll();
    updates.forEach(el => {
        el(dt);
    })
}

let zd = [];

updates.push(dt => {
    // user
    const speed = user.speed * dt;
    const easing = 0.05;

    if (keys[87]) {
        user.y -= speed;
    }
    if (keys[83]) {
        user.y += speed;
    }
    if (keys[65]) {
        user.x -= speed;
    }
    if (keys[68]) {
        user.x += speed;
    }
    if (keys[32]) {
        isFire = true;
    } else {
        isFire = false;
    }

    // if (clickPoint.length > 0) {
    //     let target;
    //     target = clickPoint[0];

    //     let dx = target[0];
    //     let dy = target[1];

    //     user.dx = (dx - user.x) * easing;
    //     user.dy = (dy - user.y) * easing;
    //     user.dist = Math.sqrt(user.dx * user.dx + user.dy * user.dy);
    //     user.x += user.dx;
    //     user.y += user.dy;
    // }
    user.dx = mouse.x - user.x;
    user.dy = mouse.y - user.y;

    // user.dist = Math.sqrt(user.dx * user.dx + user.dy * user.dy);
    user.angle = Math.atan2(user.dy, user.dx);
    if (isFire) {
        zd.push({
            x: user.x,
            y: user.y,
            angle: user.angle,
        });
    }

    zd.forEach(el => {
        let speed = 1000 * dt;
        // 与目标点的距离
        // 速度分量
        el.vx = Math.cos(el.angle) * speed;
        el.vy = Math.sin(el.angle) * speed;
        el.x += el.vx;
        el.y += el.vy;
    })


    zd = zd.filter(el => (el.x > 0 && el.x < sceneWidth) && (el.y > 0 && el.y < sceneHeight));

})

// NPC
updates.push(dt => {
    const angle = Math.PI / 2;
    const speed = 100 * dt;
    const angleSpeed = 10 * dt;
    const easing = 0.1;
    let target;

    if (aiToModel == 'player') {
        target = [user.x, user.y];
    }
    if (aiToModel == 'path') {
        if (aiPathPoint.length > 0) {
            target = aiPathPoint[aiIndex];
        } else {
            target = [user.x, user.y];
        }
    }


    // 目标点
    let dx = target[0]// Math.floor(target[0] / w) * w;
    let dy = target[1]// Math.floor(target[1] / h) * h;
    // 与目标点的距离
    npc.dx = (dx - npc.x) * easing * speed;
    npc.dy = (dy - npc.y) * easing * speed;
    npc.dist = Math.sqrt(npc.dx * npc.dx + npc.dy * npc.dy);
    npc.targetAngle = Math.atan2(npc.dy, npc.dx);

    // 速度分量
    npc.vx = (Math.cos(npc.targetAngle) * speed);
    npc.vy = (Math.sin(npc.targetAngle) * speed);
    // if(npc.angle>=){}

    // npc.angle += (npc.targetAngle - npc.angle) * angleSpeed;
    npc.angle = npc.targetAngle;


    if (npc.dist > speed) {
        npc.x += npc.dx;
        npc.y += npc.dy;

    } else {
        // 当前时刻的位置加上速度后超过了当前目标点
        // 物体下一时刻将处于当前目标点的位置
        npc.x = dx;
        npc.y = dy;

        if (aiIndex + 1 < aiPathPoint.length) {
            aiIndex++;
        } else {
            aiIndex = 0;
        }
    }



})

// user
renders.push(dt => {
    ctx.fillStyle = user.color;
    // let dx = user.x// Math.floor((x) / w) * w;
    // let dy = user.y// Math.floor((y) / h) * h;
    // ctx.fillRect(dx, dy, w, h);

    ctx.translate(user.x + w / 2, user.y + h / 2);
    ctx.rotate(user.angle);
    ctx.translate(-user.x - w / 2, -user.y - h / 2);

    ctx.fillRect(user.x, user.y, w, h);

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(user.x + w, user.y + w / 2 - (h * 0.2) / 2, 20, h * 0.2);


    ctx.translate(user.x + w / 2, user.y + h / 2);
    ctx.rotate(-user.angle);
    ctx.translate(-user.x - w / 2, -user.y - h / 2);

    ctx.fillStyle = "#ffff00";
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillText(user.name, user.x + w / 2, user.y - 10);

})

renders.push(dt => {
    zd.forEach(el => {
        let size = 2;
        ctx.fillStyle = '#ffffff';
        ctx.translate(el.x + size / 2, el.y + size / 2);
        ctx.rotate(el.angle);
        ctx.translate(-el.x - size / 2, -el.y - size / 2);

        ctx.fillRect(el.x, el.y, size * 5, size);

        ctx.translate(el.x + size / 2, el.y + size / 2);
        ctx.rotate(-el.angle);
        ctx.translate(-el.x - size / 2, -el.y - size / 2);
    })
})

// NPC
renders.push(dt => {

    // ctx.save();
    ctx.fillStyle = npc.color;
    ctx.translate(npc.x + w / 2, npc.y + h / 2);
    ctx.rotate(npc.angle);
    ctx.translate(-npc.x - w / 2, -npc.y - h / 2);

    ctx.fillRect(npc.x, npc.y, w, h);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(npc.x + w, npc.y + w / 2 - (h * 0.2) / 2, 20, h * 0.2);


    ctx.translate(npc.x + w / 2, npc.y + h / 2);
    ctx.rotate(-npc.angle);
    ctx.translate(-npc.x - w / 2, -npc.y - h / 2);


    ctx.fillStyle = "#ffff00";
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillText(npc.name, npc.x + w / 2, npc.y - 10);
})

// AI Point
renders.push(dt => {
    aiPathPoint.forEach((point, i) => {
        ctx.lineWidth = 1
        ctx.strokeStyle = "#aaa"
        if (i + 1 < aiPathPoint.length) {
            ctx.beginPath();
            ctx.moveTo(point[0] + w / 2, point[1] + h / 2);
            ctx.lineTo(aiPathPoint[i + 1][0] + w / 2, aiPathPoint[i + 1][1] + h / 2);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.fillStyle = "#ffffff";
        let pointW = w * 0.3;
        let pointH = h * 0.3;
        ctx.fillRect((point[0] - pointW / 2) + w / 2, (point[1] - pointH / 2) + h / 2, pointW, pointH);
    })

})

renders.push(dt => {
    if (isDarwLine) {
        ctx.fillStyle = "#ffffffaa";
        let dx = Math.floor((mouse.x) / w) * w;
        let dy = Math.floor((mouse.y) / h) * h;
        ctx.fillRect(dx, dy, w, h);
    }
})


let dt = 0;
let a = 0;
function animate(b = 0) {
    dt = b - a;
    dt = dt / 1000;
    a = b;
    update(dt);
    requestAnimationFrame(animate);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.lineWidth = 1
    for (let i = 0; i < window.innerWidth / w; i++) {
        ctx.strokeStyle = "#333333"
        ctx.beginPath();
        //定义开始坐标 startX-横坐标 startY-纵坐标 (必填)
        ctx.moveTo(i * w, 0);
        //定义开始坐标 endX-横坐标 endY-纵坐标 (必填)
        ctx.lineTo(i * w, window.innerHeight);
        //绘制线条(必填)
        ctx.stroke();
        //文字对齐方式 start、end、center、left、right(选填)wssw
        // ctx.textAlign = "start"
        //设置字体和尺寸 (必填)

        //填充文字 x-横坐标 y-纵坐标 (必填)
        ctx.fillStyle = "#666666";
        ctx.font = "12px";
        ctx.fillText(i * w, i * h, 14);
        ctx.closePath();
    }

    for (let i = 0; i < window.innerHeight / h; i++) {
        ctx.strokeStyle = "#333333"
        ctx.beginPath();
        //定义开始坐标 startX-横坐标 startY-纵坐标 (必填)
        ctx.moveTo(0, i * h);
        //定义开始坐标 endX-横坐标 endY-纵坐标 (必填)
        ctx.lineTo(window.innerWidth, i * h);
        //绘制线条(必填)
        ctx.stroke();

        //填充文字 x-横坐标 y-纵坐标 (必填)
        ctx.fillStyle = "#666666";
        ctx.font = "12px";
        ctx.fillText(i * w, 0, i * h);
        ctx.closePath();
    }


    renders.forEach(el => {
        ctx.save();
        el(dt);
        ctx.restore();
    })

};

animate();
