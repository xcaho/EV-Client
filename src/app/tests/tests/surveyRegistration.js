import {t, Selector} from "testcafe";
import surveyRegistration from "../pageObjects/surveyRegistration"

const surveyRegistrationPage = surveyRegistration();

fixture('Sign up page')
  .page("http://localhost:4200/event/1")

test
('Correctly register to event', async () => {

  const day = new Date();
  const dayOfWeek = day.toLocaleDateString('pl-PL', {weekday: 'long'});
  const dateFormatted = day.toLocaleDateString('pl-PL', {year: 'numeric', month: 'long', day: 'numeric'});

  const dayChoice = dateFormatted + " - " + dayOfWeek
  const hourChoice = "09:00";
  const code = Selector('#kod1');
  const url = "http://localhost:4200/register/" + await code.innerText

  await t.navigateTo(url)

  await surveyRegistrationPage.chooseDay(dayChoice);

  await surveyRegistrationPage.chooseHour(hourChoice);

  await surveyRegistrationPage.agreeToTerms();

  await surveyRegistrationPage.submit();
})
