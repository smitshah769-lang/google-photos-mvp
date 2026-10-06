import type { LlmRequest } from '../src/lib/schemas.ts'

const JSON_ONLY = `Return a single JSON object only. No markdown, no code fences, no text outside JSON.`

const CLASSIFY_SYSTEM = `You are an AI photo-retrieval assistant. The user vaguely remembers a photo but cannot describe it precisely.

Do not treat the query literally. Infer their photo-search intent and pre-fill structured fields when stated or strongly implied.

Rules:
- Extract explicit clues; infer implicit ones only when reasonable.
- Do not invent locations, dates, people, or objects not supported by the query.
- Leave fields null or empty when uncertain.

Classification:
- Pet or animal only (dog, cat, "my cat"): class "people" and fill extracted.animals.
- Person plus pet or scene ("me and my dog", "friends at the beach"): class "both" when appropriate.
- Documents (receipt, passport, invoice, ticket, notes, slides): class "text".

${JSON_ONLY}`

const NEXT_QUESTION_SYSTEM = `You are an AI photo-retrieval assistant. The user vaguely remembers a photo; your job is to jog their memory with one short multiple-choice question.

Principle: ask what is most useful to help them remember next to distinguish the photo—not what metadata you have not collected yet.

Rules:
- Use profile and query as what is already known. Do not ask about attributes already filled in profile unless a more specific follow-up on the same attribute would clearly narrow candidates.
- allowedAttributes usually contains one attribute—the app already picked the gap; output that attribute with question + options (do not swap to a different attribute).
- Wording must fit the user's query and searchIntentProfile, not generic catalog labels.
- libraryStatistics is for MCQ option values only. Do NOT copy city, country, landmark, or location names from statistics into the question text unless that exact place is in userInput or searchIntentProfile.location.
- Example: userInput "lake" → "What stood out in your lake photo?" NOT "What stood out at Lake Tuz?" (the user never said Lake Tuz).
- Question: one short sentence that jogs memory (what stood out, who was there, indoors/outdoors, what you were doing)—not generic jargon.
- options: 3–6 items; each option.value MUST be an exact value from attributeStats for the chosen attribute. Do not invent values.
- allowTyping: true. Do not add "Not sure", "Can't remember", or "Type your own" in options—the UI adds those.

${JSON_ONLY}`

const INTERPRET_TYPED_SYSTEM = `You are an AI photo-retrieval assistant. The user typed a free-text answer instead of tapping a multiple-choice option.

Convert their text into structured search signals for the current question context.

Rules:
- Map text to profile updates using knownValues for closed attribute sets; values must match knownValues exactly where provided.
- Fragments that do not map to a closed value go to keywords (for search), not invented attributes.
- pillLabel: short human summary of what you understood.
- Do not invent facts about the photo.

${JSON_ONLY}`

/** @deprecated Use buildSystemPrompt(req) */
export const SYSTEM_PROMPT = NEXT_QUESTION_SYSTEM

export function buildSystemPrompt(req: LlmRequest): string {
  switch (req.type) {
    case 'classify':
      return CLASSIFY_SYSTEM
    case 'nextQuestion':
      return NEXT_QUESTION_SYSTEM
    case 'interpretTyped':
      return INTERPRET_TYPED_SYSTEM
  }
}

export function buildUserPrompt(req: LlmRequest): string {
  switch (req.type) {
    case 'classify':
      return JSON.stringify({
        task: 'classify',
        userInput: req.query,
        guidance: [
          'Build initial search intent from the query only.',
          'Set class and extracted fields; use null when unknown.',
        ],
        outputSchema: {
          class: 'people | nonPeople | both | text',
          extracted: {
            timeline: 'last_week | last_month | last_3_months | this_year | last_year | older | null',
            location: 'string | null',
            objects: 'string[]',
            animals: 'string[]',
            photoType: 'selfie | portrait | group | candid | null',
            docType: 'receipt | id | ticket | note | screenshot | slides | null',
          },
        },
      })
    case 'nextQuestion': {
      const attributeFixed = req.allowedAttributes.length === 1
      return JSON.stringify({
        task: 'nextQuestion',
        searchIntentProfile: req.profile,
        userInput: req.query,
        queryClass: req.queryClass,
        candidateCount: req.candidateCount,
        libraryStatistics: req.attributeStats,
        allowedAttributes: req.allowedAttributes,
        level: req.level,
        loopBack: req.loopBack ?? false,
        previouslyAskedAttributes: req.previouslyAskedAttributes ?? [],
        guidance: [
          ...(req.loopBack
            ? [
                'This is a loop-back: the user did not find their photo. Ask a fresh angle; attributes in previouslyAskedAttributes were already used.',
              ]
            : []),
          attributeFixed
            ? 'Output the single allowed attribute with a contextual question and grounded options.'
            : 'Pick one allowed attribute; prefer the one that best splits libraryStatistics.',
          'Options must use only values present in libraryStatistics for that attribute.',
          'Question must anchor on userInput words only; never name a specific place from libraryStatistics unless the user already said it.',
        ],
        outputSchema: {
          attribute: 'one of allowedAttributes',
          question: 'string',
          options: [{ label: 'string', value: 'library value' }],
          allowTyping: true,
        },
      })
    }
    case 'interpretTyped':
      return JSON.stringify({
        task: 'interpretTyped',
        userInput: req.text,
        currentAttribute: req.currentAttribute,
        searchIntentProfile: req.profile,
        allowedAttributes: req.allowedAttributes,
        knownValues: req.knownValues,
        guidance: [
          'Update search intent from userInput in the context of currentAttribute.',
          'Unmapped fragments go to keywords.',
        ],
        outputSchema: {
          updates: [{ attribute: 'string', value: 'string' }],
          keywords: ['string'],
          pillLabel: 'string',
        },
      })
  }
}
