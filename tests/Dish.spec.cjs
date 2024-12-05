const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function DishesTest() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // Step 1: Navigate to the "Dishes 4" page directly
    try {
      console.log("Launching browser...");
      await driver.get('http://localhost:5173/dishes/4');
      console.log("Successfully navigated to Dishes 4 page.");
    } catch (error) {
      console.error("Failed to connect. Check if the server is running and accessible.");
      console.error("Error message:", error.message);
      throw error;
    }

    // Step 2: Wait for the page to load
    console.log("Waiting for page to load...");
    const pageLoadedSelector = By.id('root'); // Or use another element that confirms the page is loaded
    await driver.wait(until.elementIsVisible(driver.findElement(pageLoadedSelector)), 15000);
    console.log("Page loaded.");

    // Step 3: Select size "S"
    console.log("Selecting size S...");
    const sizeButtonSelector = By.className('sc-blHHSb jwUDEe');
    await driver.wait(until.elementLocated(sizeButtonSelector), 5000);
    const sizeButton = await driver.findElement(sizeButtonSelector);
    await sizeButton.click();
    console.log("Size S selected.");

    // Step 4: Click the "Add to Cart" button
    console.log("Clicking Add to Cart...");
    const addToCartButtonSelector = By.className('sc-blHHSb kKmDYw'); // Update based on your actual class name
    await driver.wait(until.elementLocated(addToCartButtonSelector), 5000);
    const addToCartButton = await driver.findElement(addToCartButtonSelector);
    await addToCartButton.click();
    console.log("Clicked Add to Cart.");

    // Step 5: Verify navigation to cart page or presence of cart content
    console.log("Verifying navigation to cart page...");
    try {
      await driver.wait(until.urlContains('http://localhost:5173/cart'), 30000); // Increased timeout to 30 seconds
      console.log("Successfully navigated to cart page.");
    } catch (urlError) {
      console.warn("URL did not update. Checking for cart content...");  

    //   // Alternative: Check if a cart-related element exists
      const cartContentSelector = By.className('sc-enMaOJ'); // Replace with actual class or ID of cart content
      await driver.wait(until.elementLocated(cartContentSelector), 10000);
      console.log("Cart content verified. Test passed!");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
