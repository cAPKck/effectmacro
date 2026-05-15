import * as applications from "./code/applications/_module.mjs";
import * as hooks from "./code/hooks/_module.mjs";
import * as utils from "./code/utils/utils.mjs";
import * as triggers from "./code/triggers/_module.mjs";

globalThis.effectmacro = {
  id: "effectmacro",
  applications,
  utils,
};

for (const [hook, fn] of Object.entries(hooks)) Hooks.on(hook, fn);
triggers.combat();
triggers.effect();
for (const sys of Object.values(triggers.systems)) Hooks.once("setup", sys);
