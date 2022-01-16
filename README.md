# Applitools-Wedriverio

## Pre-Requisites
1.  Install ChromeDriver from [here](https://chromedriver.chromium.org/downloads) if you are running on mac, you can also install it using the brew,
   simply run ```brew install chromedriver```
   -   Please check to make sure your google chrome browser is the same version as the chromedriver you install
       1)  Open chrome and navigate to chrome://settings/help
       2)  Check your version!
        ![YourChromeVersion](https://user-images.githubusercontent.com/21107409/96691179-3ecef880-138d-11eb-84a3-cd52106944c6.png)
       1)  Download the compatible chriomeDriver version:  [here](https://chromedriver.chromium.org/downloads)
    
2. Ensure that you have access to your dashboard
3. Ensure you have your Applitools API Key


## Overview
Imagine you wrote tests for the [1st Version of the App (V1)](https://demo.applitools.com/hackathon.html)

Then Next [Version (V2)](https://demo.applitools.com/hackathonV2.html) came along later and has changes. (including bugs) 
Some of these bugs are functional bugs, and some of are visual bugs. 

### Instructions

1) Open the VisualAISuite and set your ApiKey in string 'conf.setApiKey("...")' (or comment the string and set APPLITOOLS_API_KEY environment variable).

2) Run the same test again and see all the differences between the screenshots of the 1st version and the 2nd version of the app.

Note: When you run the tests against V2, you’ll see differences in screenshots because the app is actually different. 
You should see exactly what those differences are (highlighted in pink) in Applitools dashboard. 

## Running the example:
 1. Download the example
    * Option 1: `git clone https://github.com/rivkabeck52/ApplitoolsWebdriverIO.git`
    * Option 2: Download it as a Zip file and extract it
    
 2. Run the Project inside Visual Studio Code
   
### In order to run the tests from commandLine:
   1. Open a commandLine window
   
   2. Navigate to the recently cloned folder Applitools-WDIO-Hackathon.
   
   3.  `npm ci` or `yarn install`

   4. Run one of the following commands from the terminal:
        
    Run the VisualAISuite Test Suite on Version 1
        
        -   npm run VisualAISuiteSolutionV1
        
    Run the VisualAISuite Test Suite on Version 2
            
        -   npm run VisualAISuiteSolutionV2
  
    Run the VisualAISuite Test Suite with the UFG on Version 1
        
        -   npm run VisualAISuiteSolutionV1-UFG
        
    Run the VisualAISuite Test Suite with the UFG on Version 2
            
        -   npm run VisualAISuiteSolutionV2-UFG
