import { TRIGGERS } from "../triggers.mjs";

/**
 * Hook function to render elements on core active effect config.
 * @param {foundry.applications.sheets.ActiveEffectConfig} config
 * @param {HTMLElement} html
 * @param {object} data
 */
export default async function renderActiveEffectConfig(config, html, data) {
  if (game.settings.get(effectmacro.id, "restrictPermissions") && !game.user.isGM) return;

  const used = [];
  const options = [];

  for (const { label, options: opts } of TRIGGERS) {
    const group = label ? _loc(label) : undefined;
    for (const w of opts) {
      const hasMacro = effectmacro.utils.hasMacro(config.document, w);
      const option = { group, value: w, label: _loc(`EFFECTMACRO.${w}`) };
      if (hasMacro) used.push(option);
      else options.push(option);
    }
  }

  const template = "modules/effectmacro/templates/effect-sheet.hbs";
  const htmlString = await foundry.applications.handlebars.renderTemplate(template, { used, options });
  const element = foundry.utils.parseHTML(htmlString);

  element.querySelectorAll("[data-action]").forEach(n => {
    switch (n.dataset.action) {
      case "macro-add": n.addEventListener("click", _onClickMacroAdd.bind(config)); break;
      case "macro-edit": n.addEventListener("click", _onClickMacroEdit.bind(config)); break;
      case "macro-delete": n.addEventListener("click", _onClickMacroDelete.bind(config)); break;
    }
  });
  html.querySelector("section[data-tab='details']").insertAdjacentElement("beforeend", element);
}

/* -------------------------------------------------- */

/**
 * Handle clicking the 'delete macro' buttons.
 * @param {PointerEvent} event    The initiating click event.
 */
async function _onClickMacroDelete(event) {
  const key = event.currentTarget.dataset.key;

  const confirm = await foundry.applications.api.DialogV2.confirm({
    window: {
      title: "EFFECTMACRO.DeletePrompt",
      icon: "fa-solid fa-code",
    },
    rejectClose: false,
    modal: true,
  });
  if (!confirm) return;

  await this.submit({ preventClose: true });
  return effectmacro.utils.removeMacro(this.document, key);
}

/* -------------------------------------------------- */

/**
 * Handle clicking the 'edit macro' buttons.
 * @param {PointerEvent} event        The initiating click event.
 * @returns {Promise<MacroConfig>}    The rendered effect macro editor.
 */
function _onClickMacroEdit(event) {
  const key = event.currentTarget.dataset.key;
  return new effectmacro.applications.sheets.MacroConfig({ document: this.document, type: key }).render({ force: true });
}

/* -------------------------------------------------- */

/**
 * Handle clicking the 'add macro' button.
 * @param {PointerEvent} event        The initiating click event.
 * @returns {Promise<MacroConfig>}    The rendered effect macro editor.
 */
function _onClickMacroAdd(event) {
  const key = event.currentTarget.closest(".form-fields").querySelector(".unused-option").value;
  return new effectmacro.applications.sheets.MacroConfig({ document: this.document, type: key }).render({ force: true });
}
