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
      throw error; // Stop execution on failure
    }

    // Step 2: Wait for an element that confirms the React page has fully loaded
    console.log("Waiting for page to load...");
    const loadingIndicatorSelector = By.id('root'); // Or use another element that confirms the page is loaded
    await driver.wait(until.elementIsVisible(driver.findElement(loadingIndicatorSelector)), 15000); // Wait up to 15 seconds for the element to be visible
    console.log("Page loaded.");

    // Step 3: Select size "S"
    console.log("Selecting size S...");
    const sizeButtonSelector = By.className('sc-blHHSb jwUDEe');
    await driver.wait(until.elementLocated(sizeButtonSelector), 5000);
    const sizeButton = await driver.findElement(sizeButtonSelector);
    await sizeButton.click();
    console.log("Size S selected.");

    // Step 4: Wait for the SVG to be visible and select quantity by clicking the increase button
    // console.log("Selecting quantity...");
    // const quantityPathSelector = By.xpath("//svg//path[contains(@d, 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z')]");
    // // Updated XPath for partial match

    // // Wait for the path element to appear and be visible before interacting
    // await driver.wait(until.elementIsVisible(driver.findElement(quantityPathSelector)), 10000); // Wait for the path to be visible
    // const increaseButton = await driver.findElement(quantityPathSelector);
    // await increaseButton.click(); // Click the increase button
    // console.log("Quantity selected.");

    // Step 5: Click the "Add to Cart" button
    console.log("Clicking Add to Cart...");
    const addToCartButtonSelector = By.className('sc-blHHSb kKmDYw'); // Update based on your actual class name
    await driver.wait(until.elementLocated(addToCartButtonSelector), 5000);
    const addToCartButton = await driver.findElement(addToCartButtonSelector);
    await addToCartButton.click();
    console.log("Clicked Add to Cart.");

    // Step 6: Verify navigation to the cart page
    console.log("Verifying navigation to cart page...");
    await driver.wait(until.urlContains('http://localhost:5173/cart'), 20000);
    console.log("Successfully navigated to cart page. Test passed!");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
