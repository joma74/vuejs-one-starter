import {
  until
} from 'selenium-webdriver';
import NavMenu from './NavMenu';

const PAGE_TITLE = 'vue-routing-team';

export default class LandingPage {
  constructor(driver, pageUrl) {
    this.driver = driver;
    this.pageUrl = pageUrl;
    this.navMenu = new NavMenu(driver);
  }
  async view(toMS) {
    await this.driver.get(this.pageUrl);
    await this.driver.wait(until.titleIs(PAGE_TITLE), toMS);
    return this;
  }
  getNavMenu() {
    return this.navMenu;
  }
  getBaseUrl() {
    return this.pageUrl;
  }
};

export { NavMenuItemEnum } from './NavMenu';
