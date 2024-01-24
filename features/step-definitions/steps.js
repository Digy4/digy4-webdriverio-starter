const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^I am on the (\w+) page$/, async (page) => {
    await browser.url(`https://the-internet.herokuapp.com/${page}`);
    await browser.pause(3000);
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await $('#username').setValue(username);
    await $('#password').setValue(password);
    await $('button[type="submit"]').click();
    await browser.pause(3000);
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveTextContaining(message);
    await browser.pause(3000);
});

const assert = require('assert');

Given(/^should search “drag and drop” page/,async (message) => {
    await browser.url('https://webdriver.io');
      const searchInput = $('#search_input_react')
    await searchInput.setValue('drag and drop')
      const searchDropdown = $('.algolia-docsearch-suggestion__main')
    await searchDropdown.click();
    const title = browser.getTitle();
    await assert.equal(title, 'dragAndDrop · WebdriverIO');
    });

Given(/^Search on Google$/, async() => {
    await browser.url('http://google.com')
    await browser.expect.element('body').to.be.present;
    await browser.setValue('input[type=text]', ['nightwatchjs', browser.Keys.ENTER])
    browser.assert.valueContains('input[name="q"]', 'nightwatchjs')
    browser.executeScript('console.info("here")')
});