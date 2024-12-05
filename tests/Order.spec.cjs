const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function Orders() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    console.log("Logging in...");
    const homeSignInButton = await driver.wait(
      until.elementLocated(By.className('sc-blHHSb Rsved')), // Ensure this class is correct
      10000
    );
    await homeSignInButton.click();

    const emailField = await driver.wait(
      until.elementLocated(By.className('sc-eMwmJz pOMuW')), // Ensure this class is correct
      10000
    );
    await emailField.sendKeys('dilshanpathegamage@gmail.com');

    const passwordField = await driver.wait(
      until.elementLocated(By.xpath("//input[@type='password']")),
      10000
    );
    await passwordField.sendKeys('Dilshan123');

    const loginButton = await driver.wait(
      until.elementLocated(By.className('sc-blHHSb eseLmy')), // Ensure this class is correct
      10000
    );
    await loginButton.click();
    console.log("Logged in successfully!");

    console.log("Waiting for post-login confirmation...");
    const postLoginIndicator = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@href, '/orders')]")), // Update this to match a reliable post-login element
      15000
    );
    console.log("Post-login indicator found:", await postLoginIndicator.getText());

    console.log("Navigating to the orders page...");
    await driver.get('http://localhost:5173/orders');

    console.log("Waiting for orders page to load...");
    const ordersPageElement = await driver.wait(
      until.elementLocated(By.className('sc-enMaOJ')), // Replace with a stable selector for orders page
      120000
    );
    console.log("Orders page loaded successfully!");
    console.log("Successfull!");

    // Additional actions can be added here if required
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
