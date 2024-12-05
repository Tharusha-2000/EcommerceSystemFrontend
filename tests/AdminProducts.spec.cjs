
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
(async function AdminProducts() {
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const fs = require("fs");
  
    let driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
  
    try {
      console.log("Launching browser...");
      await driver.get("http://localhost:5173/");
      console.log("Navigated to home page.");
  
      console.log("Logging in...");
      const homeSignInButton = await driver.wait(
        until.elementLocated(By.className("sc-blHHSb Rsved")),
        10000
      );
      await homeSignInButton.click();
  
      const emailField = await driver.wait(
        until.elementLocated(By.className("sc-eMwmJz pOMuW")),
        10000
      );
      await emailField.sendKeys("shanukalakshan922@gmail.com");
  
      const passwordField = await driver.wait(
        until.elementLocated(By.xpath("//input[@type='password']")),
        10000
      );
      await passwordField.sendKeys("shanuka2001");
  
      const loginButton = await driver.wait(
        until.elementLocated(By.className("sc-blHHSb eseLmy")),
        10000
      );
      await loginButton.click();
      console.log("Clicked login button.");
  
      console.log("Waiting for post-login indicator...");
      const postLoginElement = await driver.wait(
        until.elementLocated(
          By.xpath("//a[contains(@href, '/admin/products')]")
        ),
        40000
      );
      console.log("Post-login element found:", await postLoginElement.getText());
  
      console.log("Navigating to Admin Products page...");
      await driver.get("http://localhost:5173/admin/products");
      await driver.wait(until.urlContains("/admin/products"), 40000);
      console.log("Navigated to Admin Products.");
  
      // Stay on the products page for 1 minute
      console.log("Staying on the Admin Products page for 1 minute...");
      await new Promise((resolve) => setTimeout(resolve, 10000)); // 60 seconds
  
    } catch (error) {
      console.error("Test failed:", error.message);
      await driver.takeScreenshot().then((data) => {
        fs.writeFileSync("error_screenshot.png", data, "base64");
      });
    } finally {
      console.log("Closing browser...");
      await driver.quit();
    }
  })();
  