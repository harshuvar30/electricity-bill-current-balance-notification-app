import puppeteer from "puppeteer";
export async function getCurrentBalance() {
  let browser;
  try {
     browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
      defaultViewport: null,
      headless: true,
    });
    const page = await browser.newPage();

    await page.goto(
      "https://wss.nbpdcl.co.in/cportal/#/guest/secure/searchbill",
      {
        waitUntil: "networkidle2",
      }
    );

    await page.type("input[formcontrolname=accno]", "400383895");

    const button = page.locator("xpath=//button[contains(., 'Search')]");

    if (button) {
      await button.click();
    }
    await page.waitForNetworkIdle();
    const getBalanceButton = page.locator(
      "xpath=//button[contains(., 'Get Current Balance')]"
    );
    if (getBalanceButton) {
      await getBalanceButton.click();
    }
    const response = await page.waitForResponse((response) => {
      // Check if the response URL matches your API endpoint
      return response
        .url()
        .includes(
          "https://wss.nbpdcl.co.in/fgweb/web/json/plugin/com.fluentgrid.cp.api.SpmIntegrationsData/service"
        );
    });

    // Get the JSON data from the response
    const data = await response.json();

    console.log("API Response Data:", data);
    console.log("Current Balance", data[0].data.current_balance);
    await page.waitForNetworkIdle();

    const balance = data?.[0]?.data?.current_balance;

    if (balance === undefined) {
      throw new Error("Could not extract current_balance field from API");
    }

    console.log("Current Balance:", balance);

    return balance;
  } catch (err) {
    console.error("❌ Puppeteer Error:", err);
    throw err; 
  } finally {
    if (browser) await browser.close();
  }
}
