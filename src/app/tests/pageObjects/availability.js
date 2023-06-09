import {t, Selector} from 'testcafe'

const availability = Selector('[id*="availability"]')
const startHour = Selector("#startHour");
const endHour = Selector("#endHour");
const saveBtn = Selector("#saveHours");
const submitBtn = Selector('[type="submit"]')

const availabilityAdd = () => ({
  fillForm: async ({
                     index,
                     startHourVal,
                     endHourVal
                   }) => {
    await t
      .click(availability.nth(index))
      .typeText(startHour, startHourVal, {paste: true, replace: true})
      .typeText(endHour, endHourVal, {paste: true, replace: true})
      .click(saveBtn)
  },
  submit: async () => {
    await t.click(submitBtn)
  }
})

export default availabilityAdd;
