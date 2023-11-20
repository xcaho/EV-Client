import {t, Selector} from 'testcafe';
import createEvent from "../pageObjects/createEvent";
import availabilityAdd from "../pageObjects/availability";
import {format, addDays} from 'date-fns'
import login from "../pageObjects/login";

const createEventPage = createEvent();
const availabilityPage = availabilityAdd();
const loginPage = login();

fixture('Getting Started')
  .page('http://localhost:4200/')

test
('Correctly create event', async () => {
  const eventDurationDays = 5;
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addDays(new Date(startDate), eventDurationDays - 1), 'yyyy-MM-dd');
  const login = "mail@domena.com"
  const password = "password1"

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
      endDateValue: startDate,
      maxUsersValue: "5",
      researchStartDateValue: startDate,
      researchEndDateValue: endDate
    });
  await createEventPage.submit();

  //const arrayOfHours = [{
  //  start: "08:00",
  //  end: "13:00"
  //}, {
  //  start: "15:00",
  //  end: "20:00"
  //}]

  await availabilityPage.countOfDaysAreEqual(eventDurationDays);

  for (let i = 0; i < eventDurationDays; i++) {
    //const indexOfArray = i % arrayOfHours.length;
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

  // await t.debug();
});

test
('Checking inputs validation', async () => {
  const login = "mail@domena.com"
  const password = "password1"

  await loginPage.typeLogin(login);
  await loginPage.typePassword(password);
  await loginPage.submit()

  await t.wait(1000)
  await t.click(Selector("#id1"))

  await createEventPage.fillForm();

  await createEventPage.submit();

  await createEventPage.validation();

});
