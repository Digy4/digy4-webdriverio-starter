# webdriverio-starter
Starter repo for Webdriver.io with DigyRunner

# How to run
- Check the integration document here https://help.digy4.com/docs/digy-dashboard/digyrunner-integration/webdriverio/
- Clone this repo
- Run `npm install'
- Run this command to execute the test: `npm run test`
- Results should appear at https://dashboard.digy4.com
- Run against different browsers as below:
  - ```npm run test:chrome```
  - ```npm run test:firefox```
  - ```npm run test:edge```

# Running in Parallel - Scenario Level
```
npm run test --parallel=true
```

