import { z } from 'zod'

export const queryClassSchema = z.enum(['people', 'nonPeople', 'both', 'text'])

const timelineBucketSchema = z.enum([
  'last_week',
  'last_month',
  'last_3_months',
  'this_year',
  'last_year',
  'older',
])

export const timelineExtractSchema = z
  .union([timelineBucketSchema, z.string().regex(/^year:\d{4}$/)])
  .nullable()
  .optional()

export const photoTypeSchema = z.enum(['selfie', 'portrait', 'group', 'candid']).nullable().optional()

export const docTypeSchema = z
  .enum(['receipt', 'id', 'ticket', 'note', 'screenshot', 'slides'])
  .nullable()
  .optional()

export const extractedSchema = z
  .object({
    timeline: timelineExtractSchema,
    location: z.string().nullable().optional(),
    objects: z.array(z.string()).optional().default([]),
    animals: z.array(z.string()).optional().default([]),
    photoType: photoTypeSchema,
    docType: docTypeSchema,
  })
  .strip()

export const classifyResponseSchema = z
  .object({
    class: queryClassSchema,
    extracted: extractedSchema,
  })
  .strip()

export type ClassifyResponse = z.infer<typeof classifyResponseSchema>

export const attrSchema = z.enum([
  'timeline',
  'location',
  'object',
  'photoType',
  'docType',
  'peopleCount',
  'pose',
  'timeOfDay',
  'sky',
  'clothingColor',
  'background',
  'dominantColor',
  'activity',
  'language',
  'textContent',
  'layout',
  'pageColor',
])

export const questionOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export const nextQuestionResponseSchema = z
  .object({
    attribute: attrSchema,
    question: z.string(),
    options: z.array(questionOptionSchema).optional().default([]),
    allowTyping: z.boolean().optional().default(true),
  })
  .strip()

export type NextQuestionResponse = z.infer<typeof nextQuestionResponseSchema>

export const profileUpdateSchema = z.object({
  attribute: attrSchema,
  value: z.string(),
})

export const interpretTypedResponseSchema = z
  .object({
    updates: z.array(profileUpdateSchema).optional().default([]),
    keywords: z.array(z.string()).optional().default([]),
    pillLabel: z.string().optional().default(''),
  })
  .strip()

export type InterpretTypedResponse = z.infer<typeof interpretTypedResponseSchema>

export const classifyRequestSchema = z.object({
  type: z.literal('classify'),
  query: z.string(),
})

export const nextQuestionRequestSchema = z.object({
  type: z.literal('nextQuestion'),
  queryClass: queryClassSchema,
  query: z.string(),
  profile: z.record(z.string(), z.union([z.string(), z.literal('any')])).optional().default({}),
  candidateCount: z.number(),
  attributeStats: z.record(z.string(), z.unknown()),
  allowedAttributes: z.array(attrSchema),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  loopBack: z.boolean().optional(),
  previouslyAskedAttributes: z.array(attrSchema).optional(),
})

export const interpretTypedRequestSchema = z.object({
  type: z.literal('interpretTyped'),
  text: z.string(),
  currentAttribute: attrSchema,
  profile: z.record(z.string(), z.union([z.string(), z.literal('any')])).optional().default({}),
  allowedAttributes: z.array(attrSchema),
  knownValues: z.record(z.string(), z.array(z.string())).optional().default({}),
})

export const llmRequestSchema = z.discriminatedUnion('type', [
  classifyRequestSchema,
  nextQuestionRequestSchema,
  interpretTypedRequestSchema,
])

export type LlmRequest = z.infer<typeof llmRequestSchema>
