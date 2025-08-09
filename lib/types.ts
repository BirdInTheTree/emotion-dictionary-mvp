export type Item = {
  id: string;
  lemma: string;
  pos: 'noun'|'verb'|'adj'|'adv';
  definition: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  affect_tags: string[];
  sources: string[];
};

export type Pair = {
  id: string;
  left: string;
  right: string;
  rule: string;
  script: string[];
};
