export const TRIGGERS = {
  agnostic: [
    {
      label: "EFFECTMACRO.EffectTriggers",
      triggers: [
        "onCreate",
        "onDelete",
        "onToggle",
        "onEnable",
        "onDisable",
      ],
    },
    {
      label: "EFFECTMACRO.CombatTriggers",
      triggers: [
        "onTurnStart",
        "onTurnEnd",
        "onEachTurn",
        "onRoundStart",
        "onRoundEnd",
        "onCombatStart",
        "onCombatEnd",
        "onCombatantDefeated",
      ],
    },
    {
      label: "EFFECTMACRO.OtherTriggers",
      triggers: [
        "never",
      ],
    },
  ],
  dnd5e: [
    "dnd5e.rollAttack",
    "dnd5e.rollDamage",
    "dnd5e.rollSavingThrow",
    "dnd5e.rollDeathSave",
    "dnd5e.rollAbilityCheck",
    "dnd5e.rollSkill",
    "dnd5e.rollToolCheck",
    "dnd5e.restCompleted",
    // "dnd5e.healActor",
    // "dnd5e.damageActor",
    // See dnd5e.js for changes
  ],
};
