const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function DishesTest() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // Navigate to the dishes page with error handling
    try {
      console.log("Launching browser...");
      await driver.get('http://localhost:5173/dishes');
      console.log("Successfully navigated to dishes page.");
    } catch (error) {
      console.error("Failed to connect. Check if the server is running and accessible.");
      console.error("Error message:", error.message);
      throw error; // Rethrow to stop further execution
    }

    // Wait for the "Chicken" button and click it
    console.log("Waiting for Chicken button...");
    const chickenButtonSelector = By.className('sc-bAEjGW iorDzi');
    await driver.wait(until.elementLocated(chickenButtonSelector), 10000);
    const chickenButton = await driver.findElement(chickenButtonSelector);
    await driver.wait(until.elementIsVisible(chickenButton), 5000); // Ensure visibility
    await chickenButton.click();
    console.log("Clicked Chicken button.");

    // Verify chicken pizzas are displayed
    console.log("Checking if chicken pizzas are displayed...");
    const chickenPizzaSelector = By.className('sc-iuUfFv czHlqO');
    await driver.wait(until.elementLocated(chickenPizzaSelector), 10000);
    const chickenPizzas = await driver.findElements(chickenPizzaSelector);

    if (chickenPizzas.length > 0) {
      console.log("Chicken pizzas are displayed. Test passed!");
    } else {
      throw new Error("Chicken pizzas are not displayed.");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
