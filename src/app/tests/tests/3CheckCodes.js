import {ClientFunction, t, Selector} from "testcafe";
import login from "../pageObjects/login";

const loginPage = login();

fixture('Codes')
  .page("http://localhost:4200/")
  .beforeEach(async t => {
    await t.maximizeWindow()
    const login = "mail@domena.com"
    const password = "password1"
    await loginPage.typeLogin(login);
    await loginPage.typePassword(password);
    await loginPage.submit()
    await t.wait(1000)
    await t.navigateTo("http://localhost:4200/event/1")
  });

test
('Register to already used code', async () => {
  await t
    .maximizeWindow()

  const code = Selector('#kod1');
  const url = "http://localhost:4200/register/" + await code.innerText
  await t.navigateTo(url)

  const getLocation = ClientFunction(() => document.location.href);

  await t.expect(getLocation()).contains(url + "/invalid-code");
})

test
('Register to closed code', async () => {
  await t
    .maximizeWindow()

  const code = Selector('#kod2');
  const url = "http://localhost:4200/register/" + await code.innerText
  await t.click(Selector('main .btn.btn-icon.btn-list').nth(3))
  await t.wait(1000)

  await t.click(Selector('button').withText('Generuj kod'))
  await t.wait(1000)

  await t.navigateTo(url)

  const getLocation = ClientFunction(() => document.location.href);

  await t.expect(getLocation()).contains(url + "/invalid-code");
})

test
('Register to non existing code', async () => {
  await t
    .maximizeWindow()

  const url = "http://localhost:4200/register/aaaaaaaaaaaa"
  await t.navigateTo(url)

  const getLocation = ClientFunction(() => document.location.href);

  await t.expect(getLocation()).contains("http://localhost:4200/404");
})
