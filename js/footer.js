import { createElement } from "./createElement.js";

export function createFooter() {
  const footer = createElement("footer", "footer");
  const text = createElement("p", "footer__text", "Найди все пары планет");
  footer.append(text);
  return footer;
}
