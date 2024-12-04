// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');

// (async function AdminDashboard() {
//   let driver = new Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(new chrome.Options())
//     .build();

//   try {
//     console.log("Launching browser...");
//     // Navigate to the home page
//     await driver.get('http://localhost:5173/');
//     console.log("Navigated to home page.");

//     // Log in
//     console.log("Logging in...");
//     const homeSignInButtonSelector = By.className('sc-blHHSb Rsved');
//     await driver.wait(until.elementLocated(homeSignInButtonSelector), 10000);
//     const homeSignInButton = await driver.findElement(homeSignInButtonSelector);
//     await homeSignInButton.click();

//     const emailFieldSelector = By.className('sc-eMwmJz pOMuW');
//     await driver.wait(until.elementLocated(emailFieldSelector), 10000);
//     const emailField = await driver.findElement(emailFieldSelector);
//     await emailField.sendKeys('shanukalakshan922@gmail.com');

//     const passwordFieldSelector = By.xpath("//input[@type='password']");
//     await driver.wait(until.elementLocated(passwordFieldSelector), 10000);
//     const passwordField = await driver.findElement(passwordFieldSelector);
//     await passwordField.sendKeys('shanuka21');

//     const loginButtonSelector = By.className('sc-blHHSb eseLmy');
//     const loginButton = await driver.findElement(loginButtonSelector);
//     await loginButton.click();
//     console.log("Logged in successfully!");

//     // Wait for post-login element
//     console.log("Waiting for post-login indicator...");
//     await driver.wait(until.elementLocated(By.className('dashboard-link')), 10000); // Adjust this selector

//     // Navigate to the Admin page explicitly
//     console.log("Navigating to the Admin page...");
//     await driver.get('http://localhost:5173/admin/dashboard');
//     await driver.wait(until.urlContains('/admin/dashboard'), 10000); // Wait for the dashboard to load
//     console.log("Navigated to Admin Dashboard page.");
//     await driver.wait(until.urlContains('/admin/dashboard'), 10000); // Wait for the dashboard to load

//   } catch (error) {
//     console.error("Test failed:", error.message);
//   } finally {
//     console.log("Closing browser...");
//     await driver.quit();
//   }
// })();


const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function AdminDashboard() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    console.log("Logging in...");
    const homeSignInButton = await driver.wait(until.elementLocated(By.className('sc-blHHSb Rsved')), 10000);
    await homeSignInButton.click();

    const emailField = await driver.wait(until.elementLocated(By.className('sc-eMwmJz pOMuW')), 10000);
    await emailField.sendKeys('shanukalakshan922@gmail.com');

    const passwordField = await driver.wait(until.elementLocated(By.xpath("//input[@type='password']")), 10000);
    await passwordField.sendKeys('shanuka2001');

    const loginButton = await driver.wait(until.elementLocated(By.className('sc-blHHSb eseLmy')), 10000);
    await loginButton.click();
    console.log("Clicked login button.");

    console.log("Waiting for post-login indicator...");
    await driver.wait(until.elementLocated(By.className('dashboard-link')), 20000); // Adjust selector as needed

    console.log("Navigating to the Admin page...");
    await driver.get('http://localhost:5173/admin/dashboard');
    console.log("Navigated to Admin Dashboard.");
  } catch (error) {
    console.error("Test failed:", error.message);
    await driver.takeScreenshot().then((data) => {
      require('fs').writeFileSync('error_screenshot.png', data, 'base64');
    });
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
