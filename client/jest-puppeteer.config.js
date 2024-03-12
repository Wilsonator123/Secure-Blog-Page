const ci = {
    launch: {
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox'
        ]
    }
}