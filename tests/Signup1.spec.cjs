const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function SignUpValidationTest() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    console.log("Navigating to signup page...");
    const homeSignInButton = await driver.findElement(By.className('sc-blHHSb Rsved'));
    await homeSignInButton.click();

    await driver.wait(until.urlContains('http://localhost:5173/'), 10000);
    const signUpButton = await driver.findElement(By.className('sc-gcfzXs dTsuGC'));
    await signUpButton.click();

    await driver.wait(until.urlContains('http://localhost:5173/'), 10000);
    console.log("On signup page.");

    // Case 1: Empty Fields Validation
    console.log("Testing empty fields...");
    const submitButton = await driver.findElement(By.className('sc-frniUE fKSMoW')); // Replace with your actual class
    await submitButton.click();

    try {
      const emptyFieldsError = await driver
        .wait(until.elementLocated(By.className('MuiSnackbarContent-message css-ozrxnr-MuiSnackbarContent-message')), 5000)
        .getText(); // Replace with actual error class
      if (emptyFieldsError === "All fields are required") {
        console.log("Empty fields validation passed.");
      } else {
        console.error("Empty fields validation failed.");
      }
    } catch (error) {
      console.error("Error message not displayed for empty fields.");
    }

    // Case 2: Successful Registration
    console.log("Testing successful registration...");
    const firstnameField = await driver.findElement(By.css('input[placeholder="Enter your first name"]'));
    const lastnameField = await driver.findElement(By.css('input[placeholder="Enter your last name"]'));
    const emailField = await driver.findElement(By.css('input[placeholder="Enter your email address"]'));
    const passwordField = await driver.findElement(By.css('input[placeholder="Enter your password"]'));
    

    // Fill in the form fields
    await firstnameField.sendKeys('Sanugi');
    await lastnameField.sendKeys('Divigalpitiya');
    await emailField.sendKeys('skkljkl@gmail.com'); // Ensure this email is unique in the database
    await passwordField.sendKeys('Sanugi@123');

    // Submit the form
    await submitButton.click();

    try {
      const successMessage = await driver
        .wait(until.elementLocated(By.className('MuiSnackbarContent-message css-ozrxnr-MuiSnackbarContent-message')), 5000)
        .getText(); // Replace with actual success message class

      if (successMessage === "Registration successful") {
        console.log("Successful registration test passed.");
      } else {
        console.error("Successful registration test failed.");
      }
    } catch (error) {
      console.error("Success message not displayed after registration.");
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
