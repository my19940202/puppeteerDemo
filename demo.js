const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6 Plus'];

let timeout = function (delay) {
  return new Promise((resolve, reject) => {   
        setTimeout(() => {   
               try {
                   resolve(1)
               } catch (e) {
                   reject(0)
                }
        }, delay);
  })
}

async function run() {
  // 1.打开百度
  const browser = await puppeteer.launch({
      headless: false //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
  });
  const page = await browser.newPage();

  await page.emulate(iPhone);
  console.log("1.打开百度");
  await page.goto('https://www.baidu.com/');
  await timeout(1000);

  // 2.输入“前端”并且进行搜素
  await page.tap("#index-kw"); //直接操作dom选择器，很方便
  await page.type("#index-kw","前端");
  await page.tap("#index-bn");
  console.log("2.输入“前端”并且进行搜素");

  // browser.close();
}

run();