import {t, Selector} from 'testcafe'

const inputName = Selector("#name");
const inputSurveyDuration = Selector("#surveyDuration");
const selectSurveyBreakTime = Selector("#surveyBreakTime");
const inputEndDate = Selector("#endDate");
const inputMaxUsers = Selector("#maxUsers");
const inputResearchStartDate = Selector("#researchStartDate");
const inputResearchEndDate = Selector("#researchEndDate");
const option = Selector("#surveyBreakTime option")
const submitBtn = Selector('[type="submit"]')

const createEvent = () => ({
  fillForm: async ({
                     nameValue,
                     surveyDurationValue,
                     surveyBreakTimeValue,
                     endDateValue,
                     maxUsersValue,
                     researchStartDateValue,
                     researchEndDateValue
                   }) => {
    await t
      .typeText(inputName, nameValue, {paste: true, replace: true})
      .typeText(inputSurveyDuration, surveyDurationValue, {paste: true, replace: true})
      .typeText(inputEndDate, endDateValue, {paste: true, replace: true})
      .typeText(inputMaxUsers, maxUsersValue, {paste: true, replace: true})
      .typeText(inputResearchStartDate, researchStartDateValue, {paste: true, replace: true})
      .typeText(inputResearchEndDate, researchEndDateValue, {paste: true, replace: true})
      .click(selectSurveyBreakTime)
      .click(option.withText(surveyBreakTimeValue))
  },
  submit: async () => {
    await t.click(submitBtn)
  }
})

export default createEvent;
