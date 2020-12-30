//random functions
function rndint(x, y) {
    return Math.floor(x + (y - x + 1) * Math.random());
}
function rndfloat(x, y) {
    return x + (y - x) * Math.random();
}

//return default DOM
function DOM_p() {
    let p = document.createElement("p");
    return p;
}
function DOM_i(char, speed) {
    let i = document.createElement("i");
    i.style.display = 'inline-block';
    i.style.opacity = 0;
    i.style.transform = `
        translate(${rndint(-500, 500)}%,${rndint(-500, 500)}%)
        scale(${rndfloat(0, 2)})
        rotate3d(${Math.random()}, ${Math.random()}, ${Math.random()}, ${rndint(-180, 180)}deg)
    `;
    i.innerText = char;

    switch (speed) {
        case 'fast':
            i.style.transition = `${rndint(400, 600)}ms ${rndint(0, 150)}ms`;
            break;
        case 'normal': default:
            i.style.transition = `${rndint(1000, 2000)}ms ${rndint(0, 300)}ms`;
            break;
        case 'slow':
            i.style.transition = `${rndint(2000, 4000)}ms ${rndint(0, 500)}ms`;
    }

    return i;
}



//////////////////////////////////////////////////

// 1. init DOM
let ps = ["元旦快乐", "愿我爱的人", "❤崔佳羽❤", "每一天都", "开开心心", "健健康康", "再寒冷的冬季", "有你的日子", "那便是春天" , "来自一个", "憨憨的独白", "(●'◡'●)"];
let settings = {
    time: 3000,
    size: 2,
    speed: 'normal'
};


//2.animate
//  a.hide p_now  b.p_now++  c.p_now show  d.interval
let p_now = -1;
function animate() {
    //a
    if (p_now != -1 && p_now < ps.length - 1) {
        ps[p_now].map((i) => {
            i.style.transform = `
                translate(${rndint(-500, 500)}%,${rndint(-500, 500)}%)
                scale(${rndfloat(0, 2)})
                rotate3d(${Math.random()}, ${Math.random()}, ${Math.random()}, ${rndint(-180, 180)}deg)
            `;
            i.style.opacity = 0;
        });
    }

    //b
    ++p_now;

    if (ps[p_now]) {
        //c
        ps[p_now].map((i) => {
            i.style.opacity = 1;
            i.style.transform = 'none';
        });

        //背景变色
        // document.body.style.backgroundColor = `hsl(${rndint(0,359)},40%,40%)`;

        //d
        setTimeout(animate, settings.time);
    }
}

function drawText(selector) {
    let DOM_stage = document.getElementById(selector),
        body_width = DOM_stage.width,
        body_height = DOM_stage.height;
    ps = ps.map((str, i) => {
        let p = DOM_p();

        let chars = str.split('');

        chars = chars.map((char) => {
            let dom = DOM_i(char, settings.speed);
            dom.style.fontSize = settings.size + 'rem';

            p.appendChild(dom);
            return dom;
        });

        DOM_stage.appendChild(p);

        return chars;
    });
    animate();
}
