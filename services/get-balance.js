import puppeteer from "puppeteer";
export async function getCurrentBalance () {
  const browser = await puppeteer.launch({
  headless: false,
  args: [
    '--start-maximized',
    `--disable-blink-features=AutomationControlled`,
    `--disable-web-security`,
    `--allow-running-insecure-content`
  ],
  defaultViewport: null,
  headless: true
});
  const page = await browser.newPage();
 
  await page.goto("https://wss.nbpdcl.co.in/cportal/#/guest/secure/searchbill", {
    waitUntil: 'networkidle2'
});
// const data = await page.evaluate(() => {
    //     return document.querySelector('span').innerText;
    //   });
await page.type('input[formcontrolname=accno]', '400383895'); 
// Source - https://stackoverflow.com/a/55424335
// Posted by Thomas Dondorf, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-11, License - CC BY-SA 4.0

const button =  page.locator("xpath=//button[contains(., 'Search')]");

if (button) {
    await button.click();
}
await page.waitForNetworkIdle()
const getBalanceButton = page.locator("xpath=//button[contains(., 'Get Current Balance')]");
if (getBalanceButton) {
  await getBalanceButton.click();
}
 const response = await page.waitForResponse(response => {
    // Check if the response URL matches your API endpoint
    return response.url().includes('https://wss.nbpdcl.co.in/fgweb/web/json/plugin/com.fluentgrid.cp.api.SpmIntegrationsData/service');
  });

  // Get the JSON data from the response
  const data = await response.json();

  console.log('API Response Data:', data);
  console.log('Current Balance', data[0].data.current_balance);
  await page.waitForNetworkIdle()
  
  await page.screenshot({ path: "test-image.png" });
  // console.log(data);
  await browser.close();
  return data[0].data.current_balance;
};

