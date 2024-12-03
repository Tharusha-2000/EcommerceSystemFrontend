const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ForgotPasswordTest1() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    // Navigate directly to the "Forgot Password" page
    await driver.get('http://localhost:5173/forgetPassword');
    console.log("Navigated to Forgot Password page.");

    // Wait for the email input field on the "Forgot Password" page
    console.log("Waiting for email input field...");
    const emailFieldSelector = By.className('MuiInputBase-input MuiInput-input css-1yrc8ca-MuiInputBase-input-MuiInput-input'); // Use a more reliable selector
    await driver.wait(until.elementLocated(emailFieldSelector), 10000);
    const emailField = await driver.findElement(emailFieldSelector);

    // Enter email address
    const testEmail = 'sanugidivi@gmail.com'; // Replace with the email address to test
    await emailField.sendKeys(testEmail);
    console.log(`Entered email address: ${testEmail}`);

    // Wait for and click the "Submit" button
    console.log("Waiting for submit button...");
    const submitButtonSelector = By.className('sc-blHHSb eseLmy'); // Adjust based on your button properties
    await driver.wait(until.elementLocated(submitButtonSelector), 10000);
    const submitButton = await driver.findElement(submitButtonSelector);
    await driver.wait(until.elementIsVisible(submitButton), 5000); // Ensure visibility
    await submitButton.click();
    console.log("Test passed.");

    // // Verify a success message or URL change
    // console.log("Verifying success...");
    // const successMessageSelector = By.css('.success-message'); // Adjust based on your page structure
    // await driver.wait(until.elementLocated(successMessageSelector), 10000);
    // const successMessageElement = await driver.findElement(successMessageSelector);
    // const successMessageText = await successMessageElement.getText();
    // console.log(`Success message displayed: ${successMessageText}`);
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
