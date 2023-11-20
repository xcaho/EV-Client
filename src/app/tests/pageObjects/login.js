import {t, Selector} from 'testcafe'
import createEvent from "./createEvent";

const inputLogin = Selector("#login")
const inputPassword = Selector("#password")
const loginBtn = Selector('[type="submit"]')

const login = () => ({

    typeLogin: async (login) => {
      await t
        .typeText(inputLogin, login)
    },

    typePassword: async (password) => {
      await t
        .typeText(inputPassword, password)
    },

  submit: async () => {
    await t
      .wait(1000)
      .click(loginBtn())
  }
})

export default login;
