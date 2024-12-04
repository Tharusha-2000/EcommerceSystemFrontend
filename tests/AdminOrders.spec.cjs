
// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// (async function AdminOrders() {
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
//           By.xpath("//a[contains(@href, '/admin/orders')]")
//         ),
//         40000
//       );
//       console.log("Post-login element found:", await postLoginElement.getText());
  
//       console.log("Navigating to Admin Orders page...");
//       await driver.get("http://localhost:5173/admin/orders");
//       await driver.wait(until.urlContains("/admin/orders"), 40000);
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
  

const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

(async function AdminOrders() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get("http://localhost:5173/");
    console.log("Navigated to home page.");

    // Logging in
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

    // Navigating to Admin Orders page
    console.log("Navigating to Admin Orders page...");
    await driver.get("http://localhost:5173/admin/orders");
    await driver.wait(until.urlContains("/admin/orders"), 10000);
    console.log("Navigated to Admin Orders page.");

    // Step 1: Testing Edit Functionality
    console.log("Testing Edit functionality...");
    const editButtonSelector = By.xpath(
      "//tr[td[text()='3']]//button[contains(@class, 'edit-icon')]"
    ); // Adjust XPath based on your table structure
    const editButton = await driver.wait(
      until.elementLocated(editButtonSelector),
      5000
    );
    await driver.wait(until.elementIsVisible(editButton), 5000);
    await editButton.click();
    console.log("Edit button clicked.");

    // Assuming the edit opens a form or modal:
    const statusField = await driver.wait(
      until.elementLocated(By.name("status")), // Replace with actual field name or locator
      5000
    );
    await statusField.clear(); // Clear existing value
    await statusField.sendKeys("Completed");
    console.log("Updated status to 'Completed'.");

    const saveButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Save']")), // Adjust based on your UI
      5000
    );
    await saveButton.click();
    console.log("Save button clicked. Changes saved.");

    // Verify the changes
    const updatedStatus = await driver.wait(
      until.elementLocated(
        By.xpath("//tr[td[text()='3']]//td[contains(@class, 'status-cell')]")
      ), // Adjust for your table structure
      5000
    );
    const statusText = await updatedStatus.getText();
    if (statusText === "Completed") {
      console.log("Edit functionality verified successfully.");
    } else {
      console.error("Edit functionality verification failed.");
    }

    // Step 2: Testing Visibility Functionality
    console.log("Testing Visibility functionality...");
    const viewButtonSelector = By.xpath(
      "//tr[td[text()='3']]//button[contains(@class, 'view-icon')]"
    ); // Adjust XPath for view icon
    const viewButton = await driver.wait(
      until.elementLocated(viewButtonSelector),
      5000
    );
    await driver.wait(until.elementIsVisible(viewButton), 5000);
    await viewButton.click();
    console.log("View button clicked.");

    // Assuming visibility shows details in a modal or new page
    const detailsModal = await driver.wait(
      until.elementLocated(By.className("details-modal")), // Adjust for your modal
      5000
    );
    const modalText = await detailsModal.getText();
    console.log("Order Details:", modalText);

    // Close the modal (if applicable)
    const closeButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Close']")),
      5000
    );
    await closeButton.click();
    console.log("Details modal closed. Visibility functionality verified.");

  } catch (error) {
    console.error("Test failed:", error.message);
    // Take a screenshot in case of failure
    await driver.takeScreenshot().then((data) => {
      fs.writeFileSync("error_screenshot.png", data, "base64");
    });
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
