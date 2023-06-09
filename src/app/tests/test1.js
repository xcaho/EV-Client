import {t, Selector} from 'testcafe';
import createEvent from "./pageObjects/createEvent";
import availabilityAdd from "./pageObjects/availability";

const createEventPage = createEvent();
const availabilityPage = availabilityAdd();

fixture('Getting Started')
  .page('http://localhost:4200/');

test('My first test', async () => {
  await t.click(Selector("#id1"));
  await createEventPage.fillForm(
    {
      nameValue: "Spotkanie dotyczące makiet",
      surveyDurationValue: "01:30",
      surveyBreakTimeValue: "30",
      endDateValue: "2023-06-08",
      maxUsersValue: "5",
      researchStartDateValue: "2023-06-08",
      researchEndDateValue: "2023-06-11"
    });
  await createEventPage.submit();

  await availabilityPage.fillForm({
      index: 0,
      startHourVal: "08:00",
      endHourVal: "15:00"
    }
  );
  await availabilityPage.fillForm({
      index: 1,
      startHourVal: "08:00",
      endHourVal: "13:00"
  }
    );
  await availabilityPage.fillForm({
      index: 1,
      startHourVal: "14:00",
      endHourVal: "16:00"
    }
  );
  await availabilityPage.fillForm({
      index: 2,
      startHourVal: "08:00",
      endHourVal: "16:00"
    }
  );
  await availabilityPage.submit()

  await t.debug();
});
