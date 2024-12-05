const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function DeleteTest() {
  let driver;

  try {
    // Step 1: Launch the browser
    console.log("Launching browser...");
    const chromeOptions = new chrome.Options();
    // chromeOptions.headless(); // Uncomment for headless mode if needed.
    chromeOptions.addArguments('--disable-dev-shm-usage'); // Avoid shared memory issues
    chromeOptions.addArguments('--no-sandbox'); // Add sandboxing for CI environments

    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    console.log("Browser launched successfully.");

    // Step 2: Navigate directly to the cart page
    await driver.get('http://localhost:5173/cart');
    console.log("Successfully navigated to cart page.");

    // Step 3: Verify the browser session is still active
    const windows = await driver.getAllWindowHandles();
    if (windows.length === 0) {
      throw new Error("No browser window is open.");
    }

    // Step 4: Click the delete icon
    console.log("Clicking delete icon...");
    const deleteButtonSelector = By.className('sc-fIfZzT fpTEVI');

    try {
      const deleteButton = await driver.wait(until.elementLocated(deleteButtonSelector), 5000);
      await driver.wait(until.elementIsVisible(deleteButton), 5000); // Wait for visibility
      await deleteButton.click();
      console.log("Delete icon clicked.");
    } catch (error) {
      throw new Error(`Failed to locate or click the delete icon: ${error.message}`);
    }

    // Step 5: Wait for the empty cart message to appear
    console.log("Waiting for empty cart message...");
    const emptyCartMessageSelector = By.className('sc-hGZxvd hgdBya');

    try {
      await driver.wait(until.elementLocated(emptyCartMessageSelector), 5000);
      const emptyCartMessageElement = await driver.findElement(emptyCartMessageSelector);

      // Step 6: Verify the message content
      const messageText = await emptyCartMessageElement.getText();
      if (messageText.includes("Your Shopping Cart") && messageText.includes("Cart is empty")) {
        console.log("Empty cart message displayed correctly.");
      } else {
        console.error("Empty cart message not displayed as expected.");
      }
    } catch (error) {
      throw new Error(`Failed to verify empty cart message: ${error.message}`);
    }
  } catch (error) {
    console.error("Test failed:", error.message);

    if (error.message.includes("no such window")) {
      console.error("Browser window was unexpectedly closed. Please ensure the browser remains open during the test.");
    } else if (error.message.includes("web view not found")) {
      console.error("Check ChromeDriver and browser versions for compatibility.");
    }
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