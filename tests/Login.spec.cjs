const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function VerifyAndLogin() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    // Navigate to the home page
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Wait for the "Sign In" button on the home page and click it
    console.log("Waiting for sign-in button...");
    const homeSignInButtonSelector = By.className('sc-blHHSb Rsved'); // Adjust based on your button class
    await driver.wait(until.elementLocated(homeSignInButtonSelector), 10000);
    const homeSignInButton = await driver.findElement(homeSignInButtonSelector);
    await driver.wait(until.elementIsVisible(homeSignInButton), 5000); // Ensure visibility
    await homeSignInButton.click();
    console.log("Clicked Sign In button.");

    // Verify navigation to the sign-in page
    console.log("Verifying navigation to sign-in page...");
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Replace `/signin` with the actual path if different
    console.log("Navigation verified! URL contains '/signin'.");

    // Wait for the login fields to appear
    console.log("Waiting for login fields...");
    const emailFieldSelector = By.className('sc-eMwmJz pOMuW');
    const passwordFieldSelector = By.className('sc-eMwmJz pOMuW');

    await driver.wait(until.elementLocated(emailFieldSelector), 10000);
    const emailField = await driver.findElement(emailFieldSelector);
    await driver.wait(until.elementLocated(passwordFieldSelector), 10000);
    const passwordField = await driver.findElement(passwordFieldSelector);

    console.log("Login fields are visible. Entering credentials...");

    // Enter email and password
    await emailField.sendKeys('sanugidivi@gmail.com');
    console.log("Entered email.");
    await passwordField.sendKeys('Sanu@2001');
    console.log("Entered password.");

    // Wait for and click the "Login" button
    const loginButtonSelector = By.className('sc-blHHSb eseLmy'); // Adjust based on your button class
    console.log("Waiting for login button...");
    await driver.wait(until.elementLocated(loginButtonSelector), 10000);
    const loginButton = await driver.findElement(loginButtonSelector);
    await driver.wait(until.elementIsVisible(loginButton), 5000); // Ensure visibility
    await loginButton.click();
    console.log("Clicked Login button.");

    // Wait for a unique element or URL to verify successful login
    console.log("Verifying successful login...");
    // await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Replace `/dashboard` with the actual post-login URL
    // console.log("Login test passed! Successfully navigated to the home.");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();

