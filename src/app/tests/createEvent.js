import {t, Selector} from 'testcafe';
import createEvent from "./pageObjects/createEvent";
import availabilityAdd from "./pageObjects/availability";
import {format, addDays} from 'date-fns'

const createEventPage = createEvent();
const availabilityPage = availabilityAdd();

fixture('Getting Started')
  .page('http://localhost:4200/')
  .beforeEach(async () => {
    await t.click(Selector("#id1"));
  });

test('Correctly create event', async () => {
  const eventDurationDays = 5;
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addDays(new Date(startDate), eventDurationDays - 1), 'yyyy-MM-dd');

  await createEventPage.fillForm(
    {
      nameValue: "Spotkanie dotyczące makiet",
      surveyDurationValue: "01:30",
      surveyBreakTimeValue: "30",
      endDateValue: "2023-06-08",
      maxUsersValue: "5",
      researchStartDateValue: startDate,
      researchEndDateValue: endDate
    });
  await createEventPage.submit();

  const arrayOfHours = [{
    start: "08:00",
    end: "13:00"
  }, {
    start: "12:00",
    end: "18:00"
  }]

  await availabilityPage.countOfDaysAreEqual(eventDurationDays);

  for (let i = 0; i < eventDurationDays; i++) {
    const indexOfArray = i % arrayOfHours.length;
    await availabilityPage.fillForm({
        index: i,
        startHourVal: arrayOfHours[indexOfArray].start,
        endHourVal: arrayOfHours[indexOfArray].end
      }
    );
  }

  await availabilityPage.submit();

  // await t.debug();
});

test('Checking inputs validation', async () => {

  await createEventPage.fillForm();

  await createEventPage.submit();

  await createEventPage.validaton();

});
