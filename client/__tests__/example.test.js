const puppeteer = require('puppeteer');

const timeout = 15000;
beforeAll(async () => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
});
describe('Test', () => {
    test('should be titled "DSS"', async () => {
        const title = await page.title();
        expect(title).toBe('DSS');
    }, timeout);
});

describe('Login Form Test', () => {

    it('should fill in the login form, submit it and read the alert response of No response from the server',  async () => {
        await page.goto('http://localhost:3000/login');
        await page.type('#login-email','bingus@gmail.com');
        await page.type('#login-password','bingbong');
        await page.click('Button[type="submit"]');
        await page.waitForSelector('#error-result', {timeout: 30000});
        let element = await page.$('#error-result')
        let value = await page.evaluate(el => el.textContent, element)
        expect(value).toBe("No response from the server.");

    })
})