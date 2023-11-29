import {t, Selector} from "testcafe";
import surveyRegistration from "../pageObjects/surveyRegistration"
import login from "../pageObjects/login";

const surveyRegistrationPage = surveyRegistration();
const loginPage = login();

fixture('Sign up page')
  .page("http://localhost:4200/")


test
('Correctly register to event', async () => {
  await t
    .maximizeWindow()

  const login = "mail@domena.com"
  const password = "password1"

  await loginPage.typeLogin(login);
  await loginPage.typePassword(password);
  await loginPage.submit()

  await t.wait(1000)

  await t.navigateTo("http://localhost:4200/event/1")

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
