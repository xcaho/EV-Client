import {t, Selector} from 'testcafe';
import createEvent from "../pageObjects/createEvent";
import availabilityAdd from "../pageObjects/availability";
import {format, addDays} from 'date-fns'
import login from "../pageObjects/login";
import { getPassword } from "../passwordHelper";
import consents from "../pageObjects/consents";

const createEventPage = createEvent();
const availabilityPage = availabilityAdd();
const loginPage = login();
const consentsPage = consents();

fixture('Events page')
  .page('http://localhost:4200/')

test
('Correctly create event', async () => {
  await t.maximizeWindow()

  const eventDurationDays = 5;
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addDays(new Date(startDate), eventDurationDays - 1), 'yyyy-MM-dd');
  const login = "test1@gmail.com"
  const password = getPassword();
  const consentChoice = "Zgoda na przetwarzanie danych"

  await loginPage.typeLogin(login);
  await loginPage.typePassword(password);
  await loginPage.submit()

  await t.wait(1000)
  await t.click(Selector("#id1"))

  await createEventPage.fillForm(
    {
      nameValue: "Spotkanie dotyczące makiet",
      surveyDurationValue: "01:30",
      surveyBreakTimeValue: "30",
      endDateValue: endDate,
      maxUsersValue: "5",
      researchStartDateValue: startDate,
      researchEndDateValue: endDate
    });
  await createEventPage.submit();

  await availabilityPage.countOfDaysAreEqual(eventDurationDays);

  for (let i = 0; i < eventDurationDays; i++) {
    await availabilityPage.fillForm({
        index: i,
        startHourVal: "08:00",
        endHourVal: "13:00"
      }
    );
    await availabilityPage.fillForm({
        index: i,
        startHourVal: "15:00",
        endHourVal: "20:00"
      }
    );
  }

  await availabilityPage.submit();

  await consentsPage.chooseConsent(consentChoice);
  await consentsPage.clickBtn();
  await consentsPage.setConsentNeeded();
  await consentsPage.submit();
  await t.wait(1000);

  // await t.debug();
});

test
('Checking inputs validation', async () => {
  await t.maximizeWindow()

  const login = "test1@gmail.com"
  const password = getPassword()

  await loginPage.typeLogin(login);
  await loginPage.typePassword(password);
  await loginPage.submit()

  await t.wait(1000)
  await t.click(Selector("#id1"))

  await createEventPage.fillForm();

  await createEventPage.submit();

  await createEventPage.validation();

});
