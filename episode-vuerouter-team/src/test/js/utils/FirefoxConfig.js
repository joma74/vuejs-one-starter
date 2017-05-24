import firefox from 'selenium-webdriver/firefox';

export const FIREFOX_SELENIUMUSER_PROFILE = new firefox.Profile(process.cwd() + '/profiles/firefox/SeleniumUser');
