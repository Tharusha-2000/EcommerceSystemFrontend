const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ValidateRegistration() {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--ignore-certificate-errors'); // Disable SSL validation

  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  try {
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Navigate to the signup page
    console.log("Navigating to signup page...");
    const homeSignInButton = await driver.findElement(By.className('sc-blHHSb Rsved'));
    await homeSignInButton.click();

    // Wait for the navigation to complete and locate the signup button
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000);
    const signUpButton = await driver.findElement(By.className('sc-gcfzXs dTsuGC'));
    await signUpButton.click();

    await driver.wait(until.urlContains('http://localhost:5173/'), 10000);
    console.log("On signup page.");

    // Input fields
    const firstnameField = await driver.findElement(By.css('input[placeholder="Enter your first name"]'));
    const lastnameField = await driver.findElement(By.css('input[placeholder="Enter your last name"]'));
    const emailField = await driver.findElement(By.css('input[placeholder="Enter your email address"]'));
    const passwordField = await driver.findElement(By.css('input[placeholder="Enter your password"]'));
    const submitButton = await driver.findElement(By.className('sc-frniUE fKSMoW'));

    // Fill all fields with valid data
    console.log("Filling in all fields with valid data...");
    await firstnameField.clear();
    await firstnameField.sendKeys("Sanugi");

    await lastnameField.clear();
    await lastnameField.sendKeys("Divigalpitiya");

    await emailField.clear();
    await emailField.sendKeys("abc@gmail.com");

    await passwordField.clear();
    await passwordField.sendKeys("Sanugi@123");

    // Click the submit button
    console.log("Clicking the submit button...");
    await submitButton.click();

    // Validate successful registration
    console.log("Validating successful registration...");
    const successMessageSelector = By.css('.MuiSnackbar-root'); // Ensure this matches your success message element
    const successElement = await driver.wait(until.elementLocated(successMessageSelector), 10000); // Wait for success message
    const successMessage = await successElement.getText();

    if (successMessage.includes("Registration successful")) { // Adjust message text if necessary
      console.log("Validation passed: Successful registration message displayed.");
    } else {
      console.error(`Validation failed: Unexpected message displayed: ${successMessage}`);
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
