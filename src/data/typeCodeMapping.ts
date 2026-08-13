export const LOCAL_TYPE_TO_TYPECODE: Record<string, string> = {
  idealist: "passionate-challenger",
  romantic: "free-spirited-romantic",
  fantasist: "refreshing-explorer",
  straightforward: "grounded-realist",
  realist: "steadfast-principlist",
  stable: "quiet-supporter",
  analyst: "sensitive-perfectionist",
  peacemaker: "easygoing-optimist",
  critic: "meticulous-critic",
  cautious: "emotional-thinker",
  passionate: "explosive-adventurer",
  egalitarian: "balanced-mediator",
};

export const TYPECODE_TO_LOCAL_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(LOCAL_TYPE_TO_TYPECODE).map(([localId, typeCode]) => [typeCode, localId]),
);
