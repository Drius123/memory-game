import { createElement } from "./createElement.js";

export function createModal() {
  const overlay = createElement("div", "modal");
  const dialog = createElement("div", "modal__window");

  overlay.hidden = true;
  dialog.setAttribute("aria-modal", "true");
  overlay.append(dialog);

  function open() {
    overlay.hidden = false;
    document.body.classList.add("is-modal-open");
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("is-modal-open");
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      close();
    }
  });

  return { overlay, dialog, open, close };
}
