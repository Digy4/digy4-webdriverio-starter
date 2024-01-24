const { Given, When, Then } = require('@wdio/cucumber-framework');

const clickNA = async () => {
  await $('.region-buttons').$$('a')[0].click();
  await browser.pause(3000);
}

const clickEU = async () => {
  await $('.region-buttons').$$('a')[1].click();
  await browser.pause(3000);
}

const clickAS = async () => {
  await $('.region-buttons').$$('a')[2].click();
  await browser.pause(3000);
}

When(/^I select North America$/, clickNA);

When(/^I select Europe$/, clickEU);

When(/^I select Asia$/, clickAS);