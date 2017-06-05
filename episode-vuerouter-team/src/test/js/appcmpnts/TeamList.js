import {
  By
} from 'selenium-webdriver';

export default class TeamList {
  constructor(driver) {
    this.driver = driver;
    this.teamList = By.css("section[section-test-id='team-list']");
    this.teamListItems = By.css('a');
  }
  async navToTeamDetail(teamListItem) {
    await this.getTeamListItemFor(teamListItem)
      .click();
  }
  async getTeamListItemFor(teamListItem) {
    return await this.driver
      .findElement(this.teamList)
      .findElement(this._getTeamListItemByCSSFor(teamListItem));
  }
  _getTeamListItemByCSSFor(teamListItem) {
    return By.css(`a[href='${TeamListItemEnum.properties[teamListItem].href}']`);
  }
  async getNumberOfTeamListItems() {
    let teamListElements = await this.driver
      .findElement(this.teamList)
      .findElements(this.teamListItems);
    return teamListElements.length;
  }
}

export let TeamListItemEnum = {
  ABERDEEN: 1,
  MOTHERWELL: 2,
  STJOHNSTONE: 3,
  properties: {
    1: {
      name: 'Aberdeen',
      href: '/teams/aberdeen'
    },
    2: {
      name: 'Motherwell',
      href: '/teams/motherwell'
    },
    3: {
      name: 'St Johnstone',
      href: '/teams/stj'
    }
  }

};
