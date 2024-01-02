import {t, Selector} from "testcafe";
import login from "../pageObjects/login";
import addUser from "../pageObjects/addUser";
import {getPassword, setPassword} from "../passwordHelper";

const loginPage = login();
const addUserPage = addUser()

fixture('User accounts')
  .page('http://localhost:4200/')

test
('Correctly create recruiter account', async () => {
  await t.maximizeWindow()

  const login = "admin@gmail.com"
  const adminPassword = "admin1234"
  const name = "test1"
  const email = "test1@gmail.com"
  const roleChoice = "Badacz"

  await loginPage.typeLogin(login);
  await loginPage.typePassword(adminPassword);
  await loginPage.submit()

  await t.wait(1000)
  await t.click(Selector('header a').withText('Panel administratora'))

  await t.wait(1000)
  await t.click(Selector('#id1'))

  await addUserPage.typeName(name)
  await addUserPage.typeMail(email)
  await addUserPage.chooseRole(roleChoice)
  await addUserPage.submit()

  await t.click(Selector('main button').withText('Pokaż hasło'))
  await t.wait(1000)
  const password = Selector('#password')
  setPassword(await password.value)
  console.log(getPassword())
})
