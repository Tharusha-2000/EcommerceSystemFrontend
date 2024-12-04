const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Helper function to introduce delays between typing
async function typeWithDelay(element, text, delayMs) {
  for (const char of text) {
    await element.sendKeys(char); // Type each character
    await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait before the next character
  }
}

(async function TestContactFormAndSocialMediaLinks() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    await driver.get("http://localhost:5173/");
    await driver.wait(until.urlContains(""), 20000);
    console.log("Navigated to home page.");
    await driver.get("http://localhost:5173/contact");
    console.log("Navigated to contact page.");
    await driver.wait(until.urlContains("/contact"), 20000);

    // Add delays and simulate typing for each text field
    console.log("Filling out the contact form...");

    // Typing into the name field
    const nameField = await driver.wait(
      until.elementLocated(By.xpath("//input[@placeholder='Your Name']")),
      20000
    );
    console.log("Typing into the name field...");
    await typeWithDelay(nameField, "John Doe", 20); // 20ms delay per character

    // Typing into the email field
    const emailField = await driver.wait(
      until.elementLocated(By.xpath("//input[@placeholder='Your Email']")),
      20000
    );
    console.log("Typing into the email field...");
    await typeWithDelay(emailField, "johndoe@example.com", 20); // 20ms delay per character

    // Typing into the message field
    const messageField = await driver.wait(
      until.elementLocated(By.xpath("//textarea[@placeholder='Message']")),
      20000
    );
    console.log("Typing into the message field...");
    await typeWithDelay(messageField, "This is a test message.", 20); // 20ms delay per character

    console.log("Submitting the contact form...");
    const sendButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Send')]")),
      20000
    );
    await sendButton.click();

    // Handle the alert popup
    console.log("Handling alert popup...");
    await driver.wait(until.alertIsPresent(), 10000); // Wait for the alert
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log(`Alert text: ${alertText}`);
    await alert.accept();

    // Validate alert text
    if (alertText === "Your message has been sent successfully!") {
      console.log("Contact form submitted successfully!");
    } else {
      console.error("Unexpected alert text:", alertText);
    }

    // Test social media links
    console.log("Testing social media links...");

    // Test Facebook link
    const facebookIcon = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@href, 'facebook.com')]")),
      20000
    );
    
    // Scroll to the Facebook icon and click
    await driver.executeScript("arguments[0].scrollIntoView(true);", facebookIcon);
    await driver.wait(until.elementIsVisible(facebookIcon), 10000);
    await facebookIcon.click();
    await driver.wait(until.urlContains("facebook.com"), 10000);
    console.log("Navigated to Facebook page.");

    // Go back to the contact page
    await driver.navigate().back();
    await driver.wait(until.urlContains("/contact"), 10000);
    console.log("Returned to contact page.");

    // Test Twitter link
    const twitterIcon = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@href, 'twitter.com')]")),
      20000
    );
    
    // Scroll to the Twitter icon and click
    await driver.executeScript("arguments[0].scrollIntoView(true);", twitterIcon);
    await driver.wait(until.elementIsVisible(twitterIcon), 10000);
    await twitterIcon.click();
    await driver.wait(until.urlContains("twitter.com"), 10000);
    console.log("Navigated to Twitter page.");

    // Go back to the contact page
    await driver.navigate().back();
    await driver.wait(until.urlContains("/contact"), 10000);
    console.log("Returned to contact page.");

    // Test Instagram link
    const instagramIcon = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(@href, 'instagram.com')]")),
      20000
    );

    // Scroll to the Instagram icon and click
    await driver.executeScript("arguments[0].scrollIntoView(true);", instagramIcon);
    await driver.wait(until.elementIsVisible(instagramIcon), 10000);
    await instagramIcon.click();
    await driver.wait(until.urlContains("instagram.com"), 10000);
    console.log("Navigated to Instagram page.");

    // Go back to the contact page
    await driver.navigate().back();
    await driver.wait(until.urlContains("/contact"), 10000);
    console.log("Returned to contact page.");
    await driver.wait(until.urlContains("/contact"), 20000);

  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
