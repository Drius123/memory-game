export function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

export function createButton(className, text) {
  const button = createElement("button", className, text);
  button.type = "button";
  return button;
}
