const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function TestPaymentWindow() {
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        console.log("Launching browser...");
        await driver.get("http://localhost:5173");
        console.log("Launching browser...");
        await driver.get("http://localhost:5173/cart"); // Replace with the correct payment page URL

        // Step 1: Fill Card Number
        console.log("Filling Card Number...");
        const cardNumberField = await driver.findElement(By.xpath("//input[@placeholder='Card Number']"));
        await cardNumberField.sendKeys("4111111111111111"); // Example valid card number

        // Step 2: Fill Expiry Date
        console.log("Filling Expiry Date...");
        const expiryDateField = await driver.findElement(By.xpath("//input[@placeholder='Expiry Date']"));
        await expiryDateField.sendKeys("12/25");

        // Step 3: Fill CVV
        console.log("Filling CVV...");
        const cvvField = await driver.findElement(By.xpath("//input[@placeholder='CVV']"));
        await cvvField.sendKeys("123");

        // Step 4: Fill Card Holder Name
        console.log("Filling Card Holder Name...");
        const cardHolderNameField = await driver.findElement(By.xpath("//input[@placeholder='Card Holder Name']"));
        await cardHolderNameField.sendKeys("John Doe");

        // Step 5: Test Submit Button
        console.log("Testing Submit Button...");
        const submitButton = await driver.findElement(By.xpath("//button[text()='SUBMIT']"));
        await submitButton.click();

        // Step 6: Verify Submission Success
        console.log("Verifying success message...");
        await driver.wait(
            until.elementLocated(By.xpath("//div[contains(text(), 'Payment Successful')]")), 
            5000
        );
        console.log("Payment submission verified successfully!");

        // Step 7: Test Cancel Button (optional)
        console.log("Testing Cancel Button...");
        const cancelButton = await driver.findElement(By.xpath("//button[text()='CANCEL']"));
        await cancelButton.click();

        // Verify that the payment window closes or resets
        console.log("Verifying cancel button functionality...");
        const resetCardNumberField = await driver.findElement(By.xpath("//input[@placeholder='Card Number']"));
        const resetValue = await resetCardNumberField.getAttribute("value");
        if (resetValue === "") {
            console.log("Cancel button functionality verified: fields cleared.");
        } else {
            console.error("Cancel button functionality failed: fields not cleared.");
        }

    } catch (error) {
        console.error("Test failed:", error.message);
    } finally {
        console.log("Closing browser...");
        await driver.quit();
    }
})();
