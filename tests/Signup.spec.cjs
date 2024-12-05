const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function NavigateToSignUp() {
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    console.log("Launching browser...");
    // Navigate to the home page
    await driver.get('http://localhost:5173/');
    console.log("Navigated to home page.");

    // Wait for the "Sign In" button on the home page and click it
    console.log("Waiting for sign-in button...");
    const homeSignInButtonSelector = By.className('sc-blHHSb Rsved'); // Adjust based on your button class
    await driver.wait(until.elementLocated(homeSignInButtonSelector), 10000);
    const homeSignInButton = await driver.findElement(homeSignInButtonSelector);
    await driver.wait(until.elementIsVisible(homeSignInButton), 5000); // Ensure visibility
    await homeSignInButton.click();
    console.log("Clicked Sign In button.");

    // Verify navigation to the sign-in page
    console.log("Verifying navigation to sign-in page...");
    await driver.wait(until.urlContains('http://localhost:5173/'), 10000); // Adjust `/signin` based on your app's URL structure
    console.log("Navigation verified! URL contains 'signin'.");

    // Wait for the "Sign Up" button on the sign-in page and click it
    console.log("Waiting for sign-up button...");
    const signUpButtonSelector = By.className('sc-gcfzXs dTsuGC'); // Replace `signupButtonClass` with your button's actual class
    await driver.wait(until.elementLocated(signUpButtonSelector), 10000);
    const signUpButton = await driver.findElement(signUpButtonSelector);
    await driver.wait(until.elementIsVisible(signUpButton), 5000); // Ensure visibility
    await signUpButton.click();
    console.log("Clicked Sign Up button.");

    // Verify navigation to the sign-up page
    console.log("Verifying navigation to sign-up page...");
    const signUpPageSelector = By.className('sc-frniUE fKSMoW');
    await driver.wait(until.elementLocated(signUpPageSelector), 10000);
    const signUpPage = await driver.findElement(signUpPageSelector);
    await driver.wait(until.elementIsVisible(signUpPage), 5000);
    console.log("Test passed.");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
