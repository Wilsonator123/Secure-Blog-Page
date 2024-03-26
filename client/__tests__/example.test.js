const puppeteer = require('puppeteer');

const timeout = 15000;
beforeAll(async () => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
});
describe('Test', () => {
    test('should be titled "DSS"', async () => {
        const title = await page.title();
        expect(title).toBe('DSS');
    }, timeout);
});

describe('Login Form Test', async () => {

    it('should fill in the login form, submit it and read the alert response of No response from the server',  async () => {
        await page.goto('http://localhost:3000/login');
        await page.type('#login-email','bingus@gmail.com');
        await page.type('#login-password','bingbong');
        
        await page.click('Button[type="submit"]');
        await page.waitForSelector('#error-result', {timeout: 30000});
        
        const result = await page.$eval('#error-result', el => el.textContent());
        console.log(result);
        expect(result).toContain("No response from the server.");

    })
})