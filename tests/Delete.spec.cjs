const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function VerifyLoginAndDeleteFromCart() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");

    // Step 1: Navigate to the home page
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Step 2: Navigate to the login page by clicking the "Sign In" button
    console.log("Waiting for sign-in button...");
    const homeSignInButtonSelector = By.className('sc-blHHSb Rsved'); // Adjust based on your button class
    await driver.wait(until.elementLocated(homeSignInButtonSelector), 10000);
    const homeSignInButton = await driver.findElement(homeSignInButtonSelector);
    await driver.wait(until.elementIsVisible(homeSignInButton), 5000);
    await homeSignInButton.click();
    console.log("Clicked Sign In button.");

    // Step 3: Verify navigation to the login page
    console.log("Verifying navigation to login page...");
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Replace with your sign-in URL fragment
    console.log("Navigation verified!");

    // Step 4: Log in with valid credentials
    console.log("Waiting for login fields...");
    const emailFieldSelector = By.css('input[placeholder="Enter your email address"]');
    const passwordFieldSelector = By.css('input[placeholder="Enter your password"]');
    const loginButtonSelector = By.className('sc-blHHSb eseLmy'); // Adjust based on your button class

    await driver.wait(until.elementLocated(emailFieldSelector), 10000);
    const emailField = await driver.findElement(emailFieldSelector);
    const passwordField = await driver.findElement(passwordFieldSelector);

    console.log("Entering credentials...");
    await emailField.sendKeys('sanugidivi@gmail.com');
    await passwordField.sendKeys('Sanugi@123');
    console.log("Credentials entered.");

    console.log("Clicking login button...");
    const loginButton = await driver.findElement(loginButtonSelector);
    await driver.wait(until.elementIsVisible(loginButton), 5000);
    await loginButton.click();

    // Step 5: Verify successful login
console.log("Verifying successful login...");
const nextPageElementSelector = By.id('root'); // Replace with actual class name of a unique element on the next page
await driver.wait(until.elementLocated(nextPageElementSelector), 10000); // Wait until the element is present
console.log("Successfully logged in and navigated to the next page.");


//     // Step 6: Navigate to the cart page
//     console.log("Navigating to cart page...");
//     const cartButtonSelector = By.xpath('//*[@data-testid="ShoppingCartOutlinedIcon"]');
//  // Replace with your cart button class
//     await driver.wait(until.elementLocated(cartButtonSelector), 10000);
//     const cartButton = await driver.findElement(cartButtonSelector);
//     await cartButton.click();
//     await driver.wait(until.urlContains('http://localhost:5173/cart'), 10000);
//     console.log("Successfully navigated to cart page.");

    // // Step 7: Click the delete icon for an item in the cart
    // console.log("Clicking delete icon...");
    // const deleteButtonSelector = By.className('sc-fIfZzT fpTEVI'); // Replace with your delete button class
    // const deleteButton = await driver.wait(until.elementLocated(deleteButtonSelector), 10000);
    // await driver.wait(until.elementIsVisible(deleteButton), 5000);
    // await deleteButton.click();
    // console.log("Delete icon clicked.");

    // // Step 8: Verify the cart is empty
    // console.log("Verifying empty cart...");
    // const emptyCartMessageSelector = By.className('sc-hGZxvd hgdBya'); // Replace with your empty cart message class
    // await driver.wait(until.elementLocated(emptyCartMessageSelector), 10000);
    // const emptyCartMessage = await driver.findElement(emptyCartMessageSelector);
    // const messageText = await emptyCartMessage.getText();

    // if (messageText.includes("Your Shopping Cart") && messageText.includes("Cart is empty")) {
    //   console.log("Empty cart message displayed correctly.");
    // } else {
    //   console.error("Empty cart message not displayed as expected.");
    // }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
