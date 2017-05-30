import {
  By
} from 'selenium-webdriver';

export default class NavMenuPO {
  constructor(driver) {
    this.driver = driver;
    this.navMenu = By.css("section[section-test-id='navigation']");
    this.navMenuListItems = By.css('ul li');
  }
  async navToTeams() {
    await this.driver
      .findElement(this.navMenu)
      .findElement(this._getNavItemByCSSFor(NavMenuItemEnum.TEAMS))
      .click();
  }
  async getNavItemFor(navMenuItemNumber) {
    return await this.driver
      .findElement(this.navMenu)
      .findElement(this._getNavItemByCSSFor(navMenuItemNumber));
  }
  _getNavItemByCSSFor(navMenuItemNumber){
    return By.css(`a[href='${NavMenuItemEnum.properties[navMenuItemNumber].href}']`);
  }
  async getNumberOfNavItems() {
    let menuListElement = await this.driver
      .findElement(this.navMenu)
      .findElements(this.navMenuListItems);
    return menuListElement.length;
  }
}

export let NavMenuItemEnum = {
  HOME: 1,
  TEAMS: 2,
  ABOUT: 3,
  properties: {
    1: {
      name: 'Home',
      href: '/'
    },
    2: {
      name: 'Teams',
      href: '/teams'
    },
    3: {
      name: 'About',
      href: '/about'
    }
  }

};
