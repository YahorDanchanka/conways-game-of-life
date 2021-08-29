export default class LocalStorage {
  /**
   * @param {string} key
   */
  static getItem(key) {
    if (window.localStorage) {
      return localStorage.getItem(key)
    }
    return null
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  static setItem(key, value) {
    if (window.localStorage) {
      localStorage.setItem(key, value)
    }
  }
}
