import {t} from 'testcafe'

export const setInputValue = async (selector, value) => {
  if (value === "") {
    await t
      .click(selector)
      .pressKey("ctrl+a backspace")
  }
  else if (value?.length > 0) {
    await t.typeText(selector, value, {paste: true, replace: true});
  }
  else {
    return
  }
}
