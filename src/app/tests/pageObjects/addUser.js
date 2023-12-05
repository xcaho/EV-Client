import {t, Selector} from 'testcafe'

const inputName = Selector('#name')
const inputMail = Selector('#email')
const selectRole = Selector('#role')
const roleOption = Selector('#role option')
const createUserBtn = Selector('[type="submit"]')

const addUser = () => ({

  typeName: async (name) => {
    await t
      .typeText(inputName, name)
  },

  typeMail: async (email) => {
    await t
      .typeText(inputMail, email)
  },

  chooseRole: async (roleChoice) => {
    await t
      .click(selectRole)
      .click(roleOption.withText(roleChoice))
  },

  submit: async () => {
    await t
      .wait(1000)
      .click(createUserBtn())
  }
})

export default addUser;
