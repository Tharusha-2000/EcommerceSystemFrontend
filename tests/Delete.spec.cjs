const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function DeleteTest() {
  let driver;

  try {
    // Step 1: Launch the browser
    console.log("Launching browser...");
    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();

    // Step 2: Navigate directly to the cart page
    await driver.get('http://localhost:5173/cart');
    console.log("Successfully navigated to cart page.");

    // Step 3: Wait for the cart page to fully load
    const cartPageIndicator = By.id('root'); // Replace with an actual indicator unique to the cart page
    await driver.wait(until.elementIsVisible(driver.findElement(cartPageIndicator)), 15000);
    console.log("Cart page loaded.");

    // Step 4: Check if the browser window is still open
    const windows = await driver.getAllWindowHandles();
    if (windows.length === 0) {
      console.error("No browser window is open.");
      return;
    }

    // Step 5: Click the delete icon
    console.log("Clicking delete icon...");
    const deleteButtonSelector = By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[5]/*[name()='svg'][1]");
    const deleteButton = await driver.wait(until.elementLocated(deleteButtonSelector), 5000);
    await driver.wait(until.elementIsVisible(deleteButton), 5000); // Wait for visibility
    await deleteButton.click();
    console.log("Delete icon clicked.");

    // Step 6: Wait for the empty cart message to appear
    console.log("Waiting for empty cart message...");
    const emptyCartMessageSelector = By.className('sc-iRLAEC bgvyo');
    await driver.wait(until.elementLocated(emptyCartMessageSelector), 5000);
    const emptyCartMessageElement = await driver.findElement(emptyCartMessageSelector);

    // Step 7: Verify the message content
    const messageText = await emptyCartMessageElement.getText();
    if (messageText.includes("Your Shopping Cart") && messageText.includes("Cart is empty")) {
      console.log("Empty cart message displayed correctly.");
    } else {
      console.error("Empty cart message not displayed as expected.");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    // Close the browser if it's still open
    try {
      if (driver) {
        console.log("Closing browser...");
        await driver.quit();
      }
    } catch (closeError) {
      console.error("Error while closing browser:", closeError.message);
    }
  }
})();
