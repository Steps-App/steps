export const PATIENT = 'patient';
export const THERAPIST = 'therapist';
export const PATIENT_ROUTES = [
  '/plan',
  '/dashboard',
  '/messages'
]
export const THERAPIST_ROUTES = [
  '/patients',
  '/exercises',
  '/messages'
]
export const PATIENT_REGEX = /plan\/\S*/g
export const THERAPIST_REGEX = /patients\/\S*/g
export const VALID_ROUTES = [...PATIENT_ROUTES, ...THERAPIST_ROUTES]

export const PLACEHOLDER = '\xa0'  // to hold uniform height in notifications display
