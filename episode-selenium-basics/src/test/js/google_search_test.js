// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example test that may be run using Mocha.
 *
 * Usage:
 *
 *     mocha -t 10000 selenium-webdriver/example/google_search_test.js
 *
 * You can change which browser is started with the SELENIUM_BROWSER environment
 * variable:
 *
 *     SELENIUM_BROWSER=chrome \
 *         mocha -t 10000 selenium-webdriver/example/google_search_test.js
 */

const {
    Builder,
    By,
    until,
    logging,
    promise,
    Capabilities
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const test = require('selenium-webdriver/testing');

const offShowTranslate_PX = +2560;

// see https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/CHANGES.md#v330
promise.USE_PROMISE_MANAGER = false;
logging.installConsoleHandler();
logging.getLogger('promise.ControlFlow').setLevel(logging.Level.WARNING);
// logging.getLogger('webdriver.http').setLevel(logging.Level.ALL); // very verbose

// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging.html
// The remote logging API allows you to retrieve logs from a remote WebDriver server(or the browser).
let prefs = new logging.Preferences();
prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

test.describe('Google Search', function() {
    let driver;

    test.before(function*() {
        var caps = Capabilities.chrome();
        caps.setLoggingPrefs(prefs);
        var chromeOptions = new chrome.Options();
        chromeOptions.addArguments("--window-position=5020,0");
        driver = yield new Builder()
            .forBrowser('chrome')
            .withCapabilities(caps)
            .setChromeOptions(chromeOptions)
            .build();
    });

    // You can write tests either using traditional promises.
    test.it('works with promises', function() {
        return driver.get('https://www.google.com/ncr')
            // driver.manage().window().setPosition(offShowTranslate_PX, offShowTranslate_PX)
            // .then(_ => driver.manage().window().setSize(956, 1049))
            // .then(_ => driver.get('https://www.google.com/ncr'))
            .then(_ => driver.findElement(By.name('q')).sendKeys('webdriver'))
            .then(_ => driver.findElement(By.name('btnG')).click())
            .then(_ => driver.executeScript("console.info('Hellö from the browsör')"))
            .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000));
    });

    // Or you can define the test as a generator function. The test will wait for
    // any yielded promises to resolve before invoking the next step in the
    // generator.
    test.it('works with generators', function*() {
        // yield driver.manage().window().setPosition(offShowTranslate_PX, offShowTranslate_PX);
        // yield driver.manage().window().setSize(956, 1049);
        yield driver.get('https://www.google.com/ncr');
        yield driver.findElement(By.name('q')).sendKeys('webdriver');
        yield driver.findElement(By.name('btnG')).click();
        yield driver.executeScript("console.info('This is a log message from the browser')");
        yield driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    });

    test.after(() => {
        return driver.manage().logs().get(logging.Type.BROWSER)
            .then(function(entries) {
                entries.forEach(function(entry) {
                    console.info('[%s] %s', entry.level.name, entry.message);
                });
            }).then(() => driver.quit());

    });
});
