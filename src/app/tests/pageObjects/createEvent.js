import {t, Selector} from 'testcafe'
import {setInputValue} from '../utils';

const inputName = Selector("#name");
const inputSurveyDuration = Selector("#surveyDuration");
const selectSurveyBreakTime = Selector("#surveyBreakTime");
const inputEndDate = Selector("#endDate");
const inputMaxUsers = Selector("#maxUsers");
const inputResearchStartDate = Selector("#researchStartDate");
const inputResearchEndDate = Selector("#researchEndDate");
const option = Selector("#surveyBreakTime option")
const submitBtn = Selector('[type="submit"]')

const nameError = Selector('[id*="nameError"]')
const durationError = Selector('[id*="surveyDurationError"]')
const breakTimeError = Selector('[id*="surveyBreakTimeError"]')
const endDateError = Selector('[id*="endDateError"]')
const maxUsersError = Selector('[id*="maxUsersError"]')
const researchStartError = Selector('[id*="researchStartDateError"]')
const researchEndError = Selector('[id*="researchEndDateError"]')

const createEvent = () => ({
  fillForm: async ({
                     nameValue,
                     surveyDurationValue,
                     surveyBreakTimeValue,
                     endDateValue,
                     maxUsersValue,
                     researchStartDateValue,
                     researchEndDateValue
                   } = {}) => {
    await setInputValue(inputName, nameValue);
    await setInputValue(inputSurveyDuration, surveyDurationValue);
    await setInputValue(inputEndDate, endDateValue);
    await setInputValue(inputMaxUsers, maxUsersValue);
    await setInputValue(inputResearchStartDate, researchStartDateValue);
    await setInputValue(inputResearchEndDate, researchEndDateValue);
    if (surveyBreakTimeValue) {
      await t
        .click(selectSurveyBreakTime)
        .click(option.withText(surveyBreakTimeValue))
    }
  },

  submit: async () => {
    await t.click(submitBtn)
  },

  validaton: async () => {
    await t
      .expect(nameError.exists).ok()
      .expect(durationError.exists).ok()
      .expect(breakTimeError.exists).ok()
      .expect(endDateError.exists).ok()
      .expect(maxUsersError.exists).ok()
      .expect(researchStartError.exists).ok()
      .expect(researchEndError.exists).ok()
  }
})

export default createEvent;
