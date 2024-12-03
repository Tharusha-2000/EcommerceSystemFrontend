const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ForgotPasswordTest() {
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
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Adjust `/signin` to your app's path
    console.log("Navigation verified! URL contains '/signin'.");

    // Wait for the "Forgot Password" button and click it
    console.log("Waiting for Forgot Password button...");
    const forgotPasswordButtonSelector = By.className('sc-eDHQDy fYwDKk'); // Adjust based on your button class
    await driver.wait(until.elementLocated(forgotPasswordButtonSelector), 10000);
    const forgotPasswordButton = await driver.findElement(forgotPasswordButtonSelector);
    await driver.wait(until.elementIsVisible(forgotPasswordButton), 5000); // Ensure visibility
    await forgotPasswordButton.click();
    console.log("Clicked Forgot Password button.");

    // Verify navigation to the "Forgot Password" page
    console.log("Verifying navigation to Forgot Password page...");
    await driver.wait(until.urlContains('http://localhost:5173/forgetPassword'), 10000); // Adjust `/forgot-password` to your app's path
    console.log("Forgot Password page navigation verified!");

    // Optionally, verify a unique element on the Forgot Password page
    const forgotPasswordPageIndicator = By.className('sc-dwGkES'); // Adjust based on your page structure
    await driver.wait(until.elementLocated(forgotPasswordPageIndicator), 10000);
    console.log("Forgot Password page test passed!");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
