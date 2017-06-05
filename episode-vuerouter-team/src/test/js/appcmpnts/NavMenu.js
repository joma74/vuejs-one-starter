import {
  By
} from 'selenium-webdriver';
import TeamList from './TeamList';

export default class NavMenu {
  constructor(driver) {
    this.driver = driver;
    this.navMenu = By.css("section[section-test-id='navigation']");
    this.navMenuListItems = By.css('ul li');
    this.teamList = new TeamList(driver);
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
  getTeamList() {
    return this.teamList;
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
