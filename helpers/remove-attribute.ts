import { Page } from "@playwright/test";

export const removeAttributeUsingClassName = async (
  page: Page,
  selector: string,
  attributeName: string
): Promise<void> => {
  await page.evaluate(
    ({ selector, attribute }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.removeAttribute(attribute);
      }
    },
    { selector: selector, attribute: attributeName }
  );
};
