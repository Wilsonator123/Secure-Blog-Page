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