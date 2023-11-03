import {t, Selector} from 'testcafe'

const selectDay = Selector("#dayChoice")
const selectHour = Selector("#hourChoice")
const signUpBtn = Selector('[type="submit"]')
const dayOption = Selector("#dayChoice option")
const hourOption = Selector("#hourChoice option")
const terms = Selector("#consents")

const surveyRegistration = () => ({

    chooseDay: async (dayChoice) => {
      await t
        .click(selectDay)
        .click(dayOption.withText(dayChoice))
    },

    chooseHour: async (hourChoice) => {
      await t
        .click(selectHour)
        .click(hourOption.withText(hourChoice))
    },

    agreeToTerms: async () => {
      await t
        .click(terms)
    },

    submit: async () => {
      await t
        .wait(2000)
        .click(signUpBtn)
    }
})

export default surveyRegistration;
