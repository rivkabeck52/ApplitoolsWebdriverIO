const {before, beforeEach, describe, it, after, afterEach} = require('mocha');
const {Eyes, Target, VisualGridRunner, BrowserType, RectangleSize, BatchInfo, Configuration, ClassicRunner, DeviceName, ScreenOrientation, RunnerOptions} = require('@applitools/eyes-webdriverio')
const originalAppURL = "https://demo.applitools.com/hackathon.html";
const newAppURL = "https://demo.applitools.com/hackathonV2.html";
const apiKey = process.env.APPLITOOLS_API_KEY;
const runnerOptions = new RunnerOptions().testConcurrency(5);

let runner;

describe('Visual Tests', async function() {

    before(async() => {
        // initialize the batch
        batchInfo = new BatchInfo("WDIO Visual AI TESTS");
        // initialize the runner
        if (process.env.useUFG==='true') {
            runner = new VisualGridRunner(runnerOptions)
        } else {
            runner = new ClassicRunner();
        }

    });
   
   
    beforeEach( async function() {
        const appName = "Login Page Demo";
        const testName = await this.currentTest.title;

        if(process.env.IsOriginalAppUrl==='true'){
            await browser.url(originalAppURL);
        }
        else{
            await browser.url(newAppURL);
        }
        eyes = new Eyes(runner);

        let conf = eyes.getConfiguration();
        conf.setBatch(batchInfo);
        conf.setApiKey(apiKey);

        conf.setAppName(appName);
        conf.setTestName(testName);

        if (process.env.useUFG==='true') {
            conf.addBrowser(1024, 768, BrowserType.CHROME);
            conf.addBrowser(1024, 768, BrowserType.FIREFOX);
            conf.addBrowser(1024, 768, BrowserType.IE_11);
            conf.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
            conf.addBrowser(1024, 768, BrowserType.SAFARI);
        }
        
        eyes.setConfiguration(conf);   
        
        // eyes.setServerUrl('YOUR_DEDICATED_CLOUD_URL')
        await eyes.open(browser, new RectangleSize(800, 600));
    })
    
    afterEach( async function() {
        try {
            // end the eyes test
            await eyes.closeAsync();
        } finally {
            // if tests were aborted before eyes.closeAsync() was called, this ends the test as aborted, if the test had been successfuly closed, this has no effect
            await eyes.abortAsync()
        }

    })
    it('Page View', async () => {
        // Add visual here replacing all 21 assertions in the following tests:
            // validateLabels
            // validateImages
            // validateCheckBox
        await eyes.check("Login Page", Target.window().fully()); 
        
    })

    it('Username and password not present', async () => {
        let login = await $('#log-in')
        // submit the form
        
        await login.click();
        await eyes.check("Username and password must be present", Target.window().fully());
    })

    it('Username must be present', async () => {
        let login = await $('#log-in')
        let username = await $('#username')
        await username.setValue("John Smith")
        // submit the form
        await login.click();
        await eyes.check("Username must be present", Target.window().fully());
    })
    
    it('Password must be present', async () => {
        let login = await $('#log-in')
        let password = await $('#password')
        await password.setValue("ABC$1@");
        // submit the form
        await login.click();
        await eyes.check("Password must be present", Target.window().fully());
    })

    it('Successful Login', async () => {
        let login = await $('#log-in')
        let username = await $('#username')
        let password = await $('#password')
        await username.setValue("John Smith");
        await password.setValue("ABC$1@");
        // submit the form
        await login.click();

        //capture a viewport screenshot
        await eyes.check("Successful Login Viewport", Target.window());

        //capture a full page screenshot
        await eyes.check("Successful Login Full Page", Target.window().fully());

        let balance = await $('#totalBalance > div.balance-value')
        let credit = await $('#creditAvailable > div.balance-value')
        let due = await $('body > div > div.layout-w > div.content-w > div > div > div.element-wrapper.compact.pt-4 > div.element-box-tp > div > div > div > div:nth-child(5) > div.balance-value.danger')

        //capture a full page screenshot with layout regions
        await eyes.check("Successful Login Full Page with Layout Regions", Target.window().fully().layoutRegions(balance, credit, due));

        //capture a screenshot of a region
        let recentTransactions = await $('body > div > div.layout-w > div.content-w > div > div > div:nth-child(2)')
        await eyes.check('Recent Transactions Element', Target.region(recentTransactions).fully())

    })
    after(async () => {
        const results = await eyes.getRunner().getAllTestResults(false);
        console.log(results);
        console.log(results.getAllResults());
        
    })
   
})

