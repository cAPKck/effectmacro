export default function setup() {
  if (game.system.id !== "dnd5e") return;
  Hooks.on("dnd5e.restCompleted", restCompleted.bind("dnd5e.restCompleted"));
  Hooks.on("dnd5e.rollSavingThrow", rollSavingThrow.bind("dnd5e.rollSavingThrow"));
  Hooks.on("dnd5e.rollAbilityCheck", rollAbilityCheck.bind("dnd5e.rollAbilityCheck"));
  Hooks.on("dnd5e.rollAttack", rollAttack.bind("dnd5e.rollAttack"));
  Hooks.on("dnd5e.rollDamage", rollDamage.bind("dnd5e.rollDamage"));
  Hooks.on("dnd5e.rollDeathSave", rollDeathSave.bind("dnd5e.rollDeathSave"));
  Hooks.on("dnd5e.rollSkill", rollSkill.bind("dnd5e.rollSkill"));
  Hooks.on("dnd5e.rollToolCheck", rollToolCheck.bind("dnd5e.rollToolCheck"));
  // Hooks.on("dnd5e.healActor", healActor.bind("dnd5e.healActor"));
  // Hooks.on("dnd5e.damageActor", damageActor.bind("dnd5e.damageActor"));
  // TODO: Replaced by dnd5e.applyDamage
  // TODO: Maybe add initiative
}

/* -------------------------------------------------- */

/**
 * Utility method to filter and then call applicable effects with a trigger.
 * @param {Actor5e} actor       The actor with the effects.
 * @param {string} hook         The trigger.
 * @param {object} context      Parameters to pass the macro.
 */
async function _filterAndCall(actor, hook, context) {
  const u = effectmacro.utils;
  if (!u.isExecutor(actor)) return;
  for (const e of actor.appliedEffects.filter(e => u.hasMacro(e, hook))) {
    console.log(`EffectMacro | Calling ${hook} macro for effect ${e.name} on actor ${actor.name}`);
    await u.callMacro(e, hook, context);
  }
}

/* -------------------------------------------------- */

function rollAttack(rolls, data) { // https://github.com/foundryvtt/dnd5e/wiki/Hooks
  const actor = data.subject.actor;
  const item = data.subject.item;
  const ammoUpdate = data.ammoUpdate;
  return _filterAndCall(actor, this, { item, rolls, ammoUpdate });
}

/* -------------------------------------------------- */

function rollSavingThrow(rolls, data) {
  const actor = data.subject;
  const ability = data.ability;
  return _filterAndCall(actor, this, { rolls, ability });
}

/* -------------------------------------------------- */

function rollDeathSave(rolls, data) {
  const actor = data.subject;
  const updates = data.updates;
  return _filterAndCall(actor, this, { rolls, updates });
}

/* -------------------------------------------------- */

function rollAbilityCheck(rolls, data) {
  const actor = data.subject;
  const ability = data.ability;
  return _filterAndCall(actor, this, { rolls, ability });
}

/* -------------------------------------------------- */

function rollSkill(rolls, data) {
  const actor = data.subject;
  const skill = data.skill
  return _filterAndCall(actor, this, { rolls, skill });
}

/* -------------------------------------------------- */

function rollDamage(rolls, data) {
  const actor = data.subject.actor;
  const item = data.subject.item;
  return _filterAndCall(actor, this, { item, rolls });
}

/* -------------------------------------------------- */

function rollToolCheck(rolls, data) {
  const actor = data.subject;
  const tool = data.tool;
  return _filterAndCall(actor, this, { rolls, tool });
}

/* -------------------------------------------------- */

function restCompleted(actor, result, config) {
  return _filterAndCall(actor, result.type ? "long" : "short", { result, config });
}

// /* -------------------------------------------------- */

// function healActor(actor, changes, update, userId) {
//   return _filterAndCall(actor, this, { changes, update, userId });
// }

// /* -------------------------------------------------- */

// function damageActor(actor, changes, update, userId) {
//   return _filterAndCall(actor, this, { changes, update, userId });
// }
