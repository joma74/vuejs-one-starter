import {
  By
} from 'selenium-webdriver';

export default class NavMenuPO {
  constructor(driver) {
    this.driver = driver;
    this.navMenu = By.css("section[section-test-id='navigation']");
    this.navMenuItemTeams = By.css("a[href='/teams']");
  }
  async navToTeams() {
    await this.driver
      .findElement(this.navMenu)
      .findElement(this.navMenuItemTeams)
      .click();
  }
}
