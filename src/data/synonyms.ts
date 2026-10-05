/**
 * Query token expansions for semanticBaseline (PRD §6.4).
 * Tune against PRD §8.4 approximate counts on /dev.
 */
export const QUERY_SYNONYMS: Record<string, string[]> = {
  lake: ['lake', 'water', 'lily pads', 'pond', 'sea', 'harbour', 'harbor', 'waves', 'sun over water'],
  sunset: ['sunset', 'dusk', 'golden hour', 'sun over water', 'evening sky'],
  dog: ['dog', 'puppy', 'poodle', 'terrier', 'canine', 'jack russell'],
  cat: ['cat', 'kitten', 'feline'],
  beach: ['beach', 'sand', 'shore', 'coast', 'surf', 'ocean'],
  diwali: ['diwali', 'sparkler', 'diya', 'marigold', 'garland'],
  receipt: ['receipt', 'invoice', 'hotel'],
  hotel: ['hotel', 'receipt', 'invoice'],
  friends: ['friends', 'group', 'people'],
  portrait: ['portrait', 'headshot'],
  mountain: ['mountain', 'mountains', 'peak', 'alps', 'trek', 'hike'],
  food: ['food', 'meal', 'dish', 'restaurant'],
  temple: ['temple', 'shrine', 'pagoda'],
}
