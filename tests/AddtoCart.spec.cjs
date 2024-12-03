const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function AddtoCartTest() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // Step 1: Navigate directly to the cart page
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/cart');
    console.log("Successfully navigated to cart page.");

    // // Step 2: Wait for the cart page to fully load
    // const cartPageIndicator = By.id('root'); // Replace with an actual indicator unique to the cart page
    // await driver.wait(until.elementIsVisible(driver.findElement(cartPageIndicator)), 15000);
    // console.log("Cart page loaded.");

    // Step 3: Get the initial subtotal value
    const subtotalSelector = By.className('sc-bCztur bVUDOW'); // Replace with actual selector for the subtotal
    const initialSubtotalElement = await driver.findElement(subtotalSelector);
    const initialSubtotal = parseFloat(await initialSubtotalElement.getText().replace('$', '').trim());
    console.log("Initial subtotal: $" + initialSubtotal);

    // Step 4: Increase the quantity and verify subtotal change
    console.log("Increasing quantity...");
    const increaseQuantityButtonSelector = By.css("div.cursor: pointer; flex: 1 1 0%");; // Update with correct selector
    const increaseButton = await driver.findElement(increaseQuantityButtonSelector);
    await increaseButton.click();

    // Wait for subtotal to update
    await driver.sleep(2000); // Wait for subtotal to reflect the change
    const updatedSubtotalElement = await driver.findElement(subtotalSelector);
    const updatedSubtotal = parseFloat(await updatedSubtotalElement.getText().replace('$', '').trim());
    console.log("Updated subtotal after increasing quantity: $" + updatedSubtotal);

    // Assert that the subtotal has increased correctly
    if (updatedSubtotal > initialSubtotal) {
      console.log("Subtotal increased correctly.");
    } else {
      console.error("Subtotal did not increase correctly.");
    }

    // Step 5: Decrease the quantity and verify subtotal change
    console.log("Decreasing quantity...");
    const decreaseQuantityButtonSelector = By.xpath("//svg//path[contains(@d, 'M19 13h6v6h2v-6H5v-2h6V5h2v6h6z')]"); // Update with correct selector
    const decreaseButton = await driver.findElement(decreaseQuantityButtonSelector);
    await decreaseButton.click();

    // Wait for subtotal to update
    await driver.sleep(2000); // Wait for subtotal to reflect the change
    const finalSubtotalElement = await driver.findElement(subtotalSelector);
    const finalSubtotal = parseFloat(await finalSubtotalElement.getText().replace('$', '').trim());
    console.log("Final subtotal after decreasing quantity: $" + finalSubtotal);

    // Assert that the subtotal has decreased correctly
    if (finalSubtotal < updatedSubtotal) {
      console.log("Subtotal decreased correctly.");
    } else {
      console.error("Subtotal did not decrease correctly.");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
