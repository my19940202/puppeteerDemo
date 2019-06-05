

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
let timeout = function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1);
            } catch (e) {
                reject(0);
            }
        }, delay);
    });
}

let page = null
let btn_position = null
let times = 0 // 执行重新滑动的次数
const distanceError = [-10,2,3,5] // 距离误差

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();

    // 1.打开前端网
    // await page.emulate(iPhone);
    await page.emulate({
        name: 'Desktop 1920x1080',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
        viewport: {
            width: 1920,
            height: 1080
        }
    });
    await page.goto('https://passport.taobao.com/ac/nick_find.htm?spm=a2107.1.0.0.233c11d9Qdjxie&from_site=0&lang=zh_CN&app_name=tbTop');
    await timeout(1000);

    // 4.点击验证
    page.click('#nc_1_canvas');
    await timeout(100);
    // page.click('#nc_1_canvas');
    // await timeout(100);

    // let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arr = [0, 1, 2, 3, 4];
    // page.mouse.down(canvasPos.left + 50, canvasPos.top + 50);
    // page.mouse.up();

    arr.map(async function (item) {
        await drag(item * 10);
        await timeout(item * 100);
    });
}

/**
 * 计算滑块位置
 */
async function getCanvasPosition() {
    const position = await page.evaluate(() => {
        const el = document.querySelector('#nc_1_canvas');
        const {left, top, width, height} = el.getBoundingClientRect();
        return {
            left,
            top,
            width,
            height
        };
    });
    return position;
}

async function drag(moveY) {
    let canvasPos = await getCanvasPosition();
    let distance = 300;
    let radius = 10 / 2;
    await page.mouse.move(
        canvasPos.left,
        canvasPos.top + radius + moveY || 0
    );
    // await page.mouse.down();
    // await page.mouse.up();
    // await timeout(800);
    await page.mouse.down();
    await page.mouse.move(
        canvasPos.left + distance,
        canvasPos.top + radius + moveY || 0,
        {steps: 30}
    );
    await page.mouse.up();
}

run();

