const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.darksidebooks.com.br/autores?O=OrderByNameASC');

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.vitrine ul img')
    const imgArray = [...nodeList]

    const imgList = imgArray.map(({ src }) => ({
      src
    }))

    return imgList
  });

  fs.writeFile('autores.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('deu ruim')

    console.log("Deu bom Familia!!!")
  });


  await browser.close();
})();