import fs from 'fs';

export default class Screenshotter {
  constructor(driver, fileUnderDir) {
      this.driver = driver;
      this.fileUnderDir = fileUnderDir;
  }
  async take(fileUnderTestName){
    let self = this;
    return this.driver.takeScreenshot().then(function(data) {
      let file = self.fileUnderDir + self.normalizeTestName(fileUnderTestName) + '.png';
      fs.writeFileSync(file, data, 'base64');
    });
  }
  normalizeTestName(testName){
    return testName.replace(/\s+/g, '-').toLowerCase();
  }
}
