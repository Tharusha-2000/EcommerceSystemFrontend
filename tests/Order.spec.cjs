const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function Orders() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    // Navigate to the home page
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Wait for the "Sign In" button and log in
    console.log("Logging in...");
    const homeSignInButtonSelector = By.className('sc-blHHSb Rsved');
    await driver.wait(until.elementLocated(homeSignInButtonSelector), 10000);
    const homeSignInButton = await driver.findElement(homeSignInButtonSelector);
    await homeSignInButton.click();

    const emailFieldSelector = By.className('sc-eMwmJz pOMuW');
    await driver.wait(until.elementLocated(emailFieldSelector), 10000);
    const emailField = await driver.findElement(emailFieldSelector);
    await emailField.sendKeys('dilshanpathegamage@gmail.com');

    const passwordFieldSelector = By.xpath("//input[@type='password']");
    await driver.wait(until.elementLocated(passwordFieldSelector), 10000);
    const passwordField = await driver.findElement(passwordFieldSelector);
    await passwordField.sendKeys('Dilshan123');

    const loginButtonSelector = By.className('sc-blHHSb eseLmy');
    const loginButton = await driver.findElement(loginButtonSelector);
    await loginButton.click();
    console.log("Logged in successfully!");

    // Wait for a post-login indicator (e.g., dashboard link or profile icon)
    console.log("Waiting for post-login indicator...");
    await driver.wait(until.elementLocated(By.className('dashboard-link')), 10000); // Replace with an actual element

    // Navigate to the orders page explicitly
    console.log("Navigating to the orders page...");
    await driver.get('http://localhost:5173/orders');

    // Wait for the orders page to load completely
    console.log("Waiting for orders page to load...");
    await driver.wait(until.elementLocated(By.id('orders-list')), 10000); // Adjust the selector for a unique orders page element

    console.log("Navigated to orders page successfully!");

  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
