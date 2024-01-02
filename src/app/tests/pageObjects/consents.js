import {t, Selector} from "testcafe";

const selectConsent = Selector('#consentTemplate')
const consentOption = Selector('#consentTemplate option')
const addConsentBtn = Selector('[type="button"]').withText("Dodaj zgodę")
const isRequired = Selector('#isRequired0')
const saveBtn = Selector('[type="submit"]')

const consents = () => ({

  chooseConsent: async (consentChoice) => {
    await t
      .click(selectConsent)
      .click(consentOption.withText(consentChoice))
  },

  clickBtn: async () => {
    await t
      .wait(1000)
      .click(addConsentBtn)
  },

  setConsentNeeded: async () => {
    await t
      .click(isRequired)
  },

  submit: async () => {
    await t
      .wait(1000)
      .click(saveBtn())
  }
})

export default consents;
