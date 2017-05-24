import fs from 'fs';

const SCREENSHOT_IMAGE_TYPE = 'png';
const FILE_ENCODING_OPTION = 'base64';

export default class Screenshotter {
  constructor(driver, fileUnderDir) {
    this.driver = driver;
    this.fileUnderDir = fileUnderDir;
  }
  async takeAndFileUnder(testName) {
    let screenShot = await this.take();
    screenShot.then(and => and.fileUnder(testName));
  }
  async take() {
    let data = await this.driver.takeScreenshot();
    return Promise.resolve({
      data: data,
      fileUnderDir: this.fileUnderDir,
      fileUnder(testName) {
        let file = this.fileUnderDir + this.normalizeTestName(testName) + '.' + SCREENSHOT_IMAGE_TYPE;
        fs.writeFileSync(file, data, FILE_ENCODING_OPTION);
      },
      normalizeTestName(testName) {
        return testName.replace(/\s+/g, '-').toLowerCase();
      }
    });
  }
}
