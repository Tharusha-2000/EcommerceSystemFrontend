const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ProfileUpdate() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Log in
    console.log("Logging in...");
    await driver.wait(until.elementLocated(By.className('sc-blHHSb Rsved')), 10000).click();
    await driver.findElement(By.className('sc-eMwmJz pOMuW')).sendKeys('dilshanpathegamage@gmail.com');
    await driver.findElement(By.xpath("//input[@type='password']")).sendKeys('Dilshan123');
    await driver.findElement(By.className('sc-blHHSb eseLmy')).click();
    console.log("Logged in successfully!");

    // Navigate to orders page
    console.log("Navigating to the orders page...");
    await driver.get('http://localhost:5173/orders');
    await driver.wait(until.urlContains('/orders'), 10000);
    console.log("Navigated to orders page.");

    // Update profile
    console.log("Updating profile...");
    await driver.wait(until.elementLocated(By.xpath("//button[text()='Update']")), 10000).click();
    console.log("Profile update form opened.");

    const firstNameField = await driver.findElement(By.name('firstName'));
    await firstNameField.clear();
    await firstNameField.sendKeys('UpdatedFirstName');

    const lastNameField = await driver.findElement(By.name('lastName'));
    await lastNameField.clear();
    await lastNameField.sendKeys('UpdatedLastName');

    const phoneNumberField = await driver.findElement(By.name('phoneNumber'));
    await phoneNumberField.clear();
    await phoneNumberField.sendKeys('0771234567');

    const addressField = await driver.findElement(By.name('address'));
    await addressField.clear();
    await addressField.sendKeys('Updated Address, Sri Lanka');

    console.log("Entered profile details.");

    // Click Save
    await driver.wait(until.elementLocated(By.xpath("//button[text()='Save']")), 10000).click();
    console.log("Clicked Save button.");

    // Validate success message
    await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Profile updated successfully')]")), 10000);
    console.log("Profile updated successfully!");

    // Confirm persisted changes
    console.log("Verifying updated profile values...");
    await driver.navigate().refresh();
    const updatedFirstName = await driver.findElement(By.name('firstName')).getAttribute('value');
    const updatedLastName = await driver.findElement(By.name('lastName')).getAttribute('value');
    console.log(`Updated First Name: ${updatedFirstName}`);
    console.log(`Updated Last Name: ${updatedLastName}`);
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
