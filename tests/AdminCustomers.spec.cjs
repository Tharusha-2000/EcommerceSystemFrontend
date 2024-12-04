
// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// (async function AdminCustomers() {
//     const { Builder, By, until } = require("selenium-webdriver");
//     const chrome = require("selenium-webdriver/chrome");
//     const fs = require("fs");
  
//     let driver = new Builder()
//       .forBrowser("chrome")
//       .setChromeOptions(new chrome.Options())
//       .build();
  
//     try {
//       console.log("Launching browser...");
//       await driver.get("http://localhost:5173/");
//       console.log("Navigated to home page.");
  
//       console.log("Logging in...");
//       const homeSignInButton = await driver.wait(
//         until.elementLocated(By.className("sc-blHHSb Rsved")),
//         10000
//       );
//       await homeSignInButton.click();
  
//       const emailField = await driver.wait(
//         until.elementLocated(By.className("sc-eMwmJz pOMuW")),
//         10000
//       );
//       await emailField.sendKeys("shanukalakshan922@gmail.com");
  
//       const passwordField = await driver.wait(
//         until.elementLocated(By.xpath("//input[@type='password']")),
//         10000
//       );
//       await passwordField.sendKeys("shanuka21");
  
//       const loginButton = await driver.wait(
//         until.elementLocated(By.className("sc-blHHSb eseLmy")),
//         10000
//       );
//       await loginButton.click();
//       console.log("Clicked login button.");
  
//       console.log("Waiting for post-login indicator...");
//       const postLoginElement = await driver.wait(
//         until.elementLocated(
//           By.xpath("//a[contains(@href, '/admin/customers')]")
//         ),
//         40000
//       );
//       console.log("Post-login element found:", await postLoginElement.getText());
  
//       console.log("Navigating to Admin Customer page...");
//       await driver.get("http://localhost:5173/admin/customers");
//       await driver.wait(until.urlContains("/admin/customers"), 40000);
//       console.log("Navigated to Admin Orders.");
  
//       // Stay on the products page for 1 minute
//       console.log("Staying on the Admin Orders page for 1 minute...");
//       await new Promise((resolve) => setTimeout(resolve, 10000)); 
  
//     } catch (error) {
//       console.error("Test failed:", error.message);
//       await driver.takeScreenshot().then((data) => {
//         fs.writeFileSync("error_screenshot.png", data, "base64");
//       });
//     } finally {
//       console.log("Closing browser...");
//       await driver.quit();
//     }
//   })();
  

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async function AdminCustomers() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get("http://localhost:5173/");

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
    await passwordField.sendKeys("shanuka21");

    const loginButton = await driver.wait(
      until.elementLocated(By.className("sc-blHHSb eseLmy")),
      10000
    );
    await loginButton.click();
    console.log("Clicked login button.");

    console.log("Waiting for post-login indicator...");
    const postLoginElement = await driver.wait(
      until.elementLocated(
        By.xpath("//a[contains(@href, '/admin/customers')]")
      ),
      40000
    );
    console.log("Post-login element found:", await postLoginElement.getText());

    console.log("Navigating to Admin Customers page...");
    await driver.get("http://localhost:5173/admin/customers");
    await driver.wait(until.urlContains("/admin/customers"), 40000);
    console.log("Navigated to Admin Customers page.");

    console.log("Testing delete button functionality...");
    
    // Locate the delete button for the specific row (adjust the XPath to match the delete button class)
    const deleteButton = await driver.wait(
        By.css("tr td:contains('shanuka lakshan') ~ td .delete-icon")

    );

    // Click the delete button
    await deleteButton.click();
    console.log("Delete button clicked.");

    // Handle confirmation dialog or modal (if applicable)
    try {
      console.log("Handling confirmation dialog...");
      const confirmDialog = await driver.wait(until.alertIsPresent(), 5000);
      await confirmDialog.accept(); // Accept the confirmation alert
      console.log("Deletion confirmed.");
    } catch (err) {
      console.log("No confirmation dialog present.");
    }

    console.log("Verifying customer deletion...");
    // Wait for the page to refresh or update
    await driver.sleep(2000);

    // Verify the row is no longer present
    const deletedRow = await driver.findElements(
      By.xpath("//tr[td[contains(text(), 'shanuka lakshan')]]")
    );
    if (deletedRow.length === 0) {
      console.log("Customer successfully deleted.");
    } else {
      console.error("Customer deletion failed.");
    }

  } catch (error) {
    console.error("Test failed:", error.message);
    await driver.takeScreenshot().then((data) => {
      fs.writeFileSync("delete_error_screenshot.png", data, "base64");
    });
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
