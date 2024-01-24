const { Given, When, Then } = require('@wdio/cucumber-framework');

const goToUrl = async (urlStr) => {
  await browser.url(urlStr);
  browser.pause(3000);
};

const scrollToElement = async (selector) => {
  await $(`${selector}`).scrollIntoView({block: "center"});
  await browser.pause(3000);
}

const clickElement = async (selector) => {
  await $(`${selector}`).click();
  //await browser.pause(3000);
}

const moveToElement = async (selector) => {
  await $(`${selector}`).moveTo();
  await browser.pause(3000);
}

const selectByValue = async (attrVal, selector) => {
  await $(`${selector}`).selectByAttribute('value', attrVal);
  await browser.pause(3000);
};

const setKeys = async (key, selector) => {
  await $(`${selector}`).setValue(key);
  await browser.pause(3000);
};

const urlContains = async (urlSubstring) => {
  await expect(browser).toHaveUrlContaining(urlSubstring);
  await browser.pause(3000);
};

const urlNotContains = async (urlSubstring) => {
  await expect(browser).not.toHaveUrlContaining(urlSubstring);
  await browser.pause(3000);
};

const expectElement = async (selector, content) => {
  await $(`${selector}=${content}`);
  await browser.pause(3000);
}

const expectElementPartial = async (selector, content) => {
  await $(`${selector}*=${content}`);
  await browser.pause(3000);
}

Given(/^I am in "([^"]*)?"$/, goToUrl);

When(/^I type "([^"]*)?" to input field "([^"]*)?"$/, setKeys);

When(/^I click the button\/link "([^"]*)?"$/, clickElement);

When(/^I select "([^"]*)?" from the dropdown "([^"]*)?"$/, selectByValue);

When(/^I hover over "([^"]*)?"$/, moveToElement);

When(/^I scroll to "([^"]*)?"$/, scrollToElement);

When(/^I go back$/, async () => await browser.back());

When(/^I go to "([^"]*)?"$/, goToUrl);

Then(/^the url should have "([^"]*)?"$/, urlContains);

Then(/^the url should not have "([^"]*)?"$/, urlNotContains);

Then(/^there should be a\/an "([^"]*)?" with content "([^"]*)?"$/, expectElement);

Then(/^there should be a\/an "([^"]*)?" with partial content "([^"]*)?"$/, expectElementPartial);