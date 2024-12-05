const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function VerifyAndLogout() {
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
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Replace with your actual sign-in page URL
    console.log("Navigation verified! URL contains '/signin'.");

    // Wait for the login fields to appear and find by placeholder
    console.log("Waiting for login fields...");
    const emailFieldSelector = await driver.findElement(By.css('input[placeholder="Enter your email address"]'));
    const passwordFieldSelector = await driver.findElement(By.css('input[placeholder="Enter your password"]'));

    console.log("Login fields are visible. Entering credentials...");

    // Enter email and password
    await emailFieldSelector.sendKeys('sanugidivi@gmail.com');
    console.log("Entered email.");
    await passwordFieldSelector.sendKeys('sanugi@123');
    console.log("Entered password.");

    // Wait for and click the "Login" button
    const loginButtonSelector = By.className('sc-blHHSb eseLmy'); // Adjust based on your button class
    console.log("Waiting for login button...");
    await driver.wait(until.elementLocated(loginButtonSelector), 10000);
    const loginButton = await driver.findElement(loginButtonSelector);
    await driver.wait(until.elementIsVisible(loginButton), 5000); // Ensure visibility
    await loginButton.click();
    console.log("Clicked Login button.");

    // Wait for successful login
    console.log("Verifying successful login...");
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Replace with the actual post-login URL

    console.log("Login successful! Now verifying Logout...");

    // Wait for and click the "Logout" button
    console.log("Locating logout button...");
    const logoutButtonSelector = By.className('sc-keTIit hKjIue'); // Replace with your actual logout button's class
    await driver.wait(until.elementLocated(logoutButtonSelector), 10000);
    const logoutButton = await driver.findElement(logoutButtonSelector);
    await driver.wait(until.elementIsVisible(logoutButton), 5000); // Ensure visibility
    await logoutButton.click();
    console.log("Clicked Logout button.");

    // Verify navigation back to the home page
    console.log("Verifying navigation to home page after logout...");
    await driver.wait(until.urlIs('http://localhost:5173/'), 10000); // Replace with your actual home page URL
    console.log("Logout test passed! Successfully navigated to the home page.");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
