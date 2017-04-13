# episode-selenium-basics
What do i show

## Build Setup

```bash
# runs all tests under src/test/js with mocha with node's harmony async flag enabled
npm run test
```

## NOTES

### Distraction-free selenium browser tests

Running selenium tests uses a browser, which is a good thing. A browser needs a window to render their content into, which is also okay with me. But if the window is not actively renderable, a browser(or maybe it is the OS) does not render it's content and selenium tests will fail for a not-so understandable reason.

Is-not-renderable implies that selenium tests will error. This occurs under the following situations (non-exhaustive)

- the browser window is minimized
- the browser window is hidden by another window
- the HTML element under test is not within the browsers viewport

Is-renderable implies that selenium test may fail or succeed. This occurs under the following - quite unexpectedly -  situations (non-exhaustive)
- the browser window is visible on-screen
- the browser window is off-screen
- the browser window is in another workspace

These last two options are of interest if you do want to run your selenium tests on your desktop without distraction. Else for option one, the browser window keeps popping on/off your screen while your selenium tests are running. So they overlay your ide or whatever you are working on right between the tests.

#### The browser window is off-screen
The first option can be achieved with the selenium command
```js
driver.manage().window().setPosition(offShowTranslate_PX, 0)
```
Together the coordinates specify the upper left corner where the browser window should be. `offShowTranslate_PX` must be a positive integer in pixels that is greater than your screen's X display size. Effectively this makes the browser window move off-screen.
*P.S. negative values for `offShowTranslate_PX` did not result in any reposition.*

The downside of this option is that the browser window is initially opened before moved, so you get some annoying flicker. An attempt against this downside was specifying the position as a chrome browser option.
```js
var chromeOptions = new chrome.Options();
chromeOptions.addArguments(`--window-position=${offShowTranslate_PX},0`);
...
driver = yield new Builder()
...
.setChromeOptions(chromeOptions)
.build();
```
Unfortunately chrome did not honor this setting - it opened at the rightmost on-screen position fully visible regarding it's dimension.

#### The browser window is in another workspace
This solution works-for-me on Unity on Ubuntu 14.04 LTS with multi-workspace support. But may be useable on other flavors and distributions as well.

Unity has a so-called compiz configuration settings manager executing by the name of `ccsm`. `ccsm` enables you to fixate, on which workspace a window by a given window class name is placed. Remarkably workspaces are there named `Viewports`, so my second workspace is configured by `X Viewport Positions=2` and `Y Viewport Positions=1` found under the `Place Windows -> Windows with fixed viewport` menu.

The only downside of this option was: i am using the `Atom IDE` with the package `platformio-ide-terminal` where i start the selenium tests via npm run test. Unfortunately `platformio-ide-terminal` 'steals' the focus whenever a new browser window opens. The solution to this downside was to add `nohup` and `tee` to the mix.
```js
"test": "nohup mocha -t 5000 -R xunit-file --harmony_async_await src/test/js/*_test.js </dev/null 2>&1 | tee $npm_package_config_mocha_out_file"
```
The following screencast shows an `Atom IDE` before starting `npm run test` in the terminal. This will run two suites with tests, both of which are copied from the `Selenium Webdriver` javascript examples. The console outputs the suite and test names currently executed. Activating the `Workspace Switcher` shows an overview of all workspaces. In the upper right workspace where i have fixed the chrome-browser window  into, you can see the chrome browser window popping on/off as being driven by the selenium tests.

## Current dependencies

```shell
episode-selenium-basics@1.0.0 /home/joma/entwicklung/nodews/vuejs-laracasts/episode-selenium-basics
├── mocha@3.2.0
└── selenium-webdriver@3.3.0
```

## Patches

## Build result
