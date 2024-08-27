/** Enum of all the different valid values for the "type" prop on the "Input" component. */
export enum DsInputType {
  /**
   * Will yield an email optimized input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   * - Makes keyboard layout aware of content type
   * - [**iOS**] Disables auto-correct
   */
  EMAIL = "EMAIL",
  /**
   * Will yield a name optimized input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   * - Enables pr. word auto-capitalization
   */
  NAME = "NAME",
  /** Will yield a masked password input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   * - Masks the input
   */
  PASSWORD = "PASSWORD",
  /**
   * Will yield a normal text input.
   *
   * **Effects:**
   * - Nothing special is done for this type
   */
  TEXT = "TEXT",
  /**
   * Will yield a number input.
   *
   * **Effects:**
   * - Will use number keypad
   */
  NUMBER = "NUMBER",
  /**
   * Will yield a username optimized input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   * - [**iOS**] Disables auto-correct
   */
  USERNAME = "USERNAME",
  /**
   * Will yield a city optimized input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   */
  CITY = "CITY",
  /**
   * Will yield a country optimized input.
   *
   * **Effects:**
   * - Makes OS aware of content type
   */
  COUNTRY = "COUNTRY",

  SEARCH = "SEARCH",
}
