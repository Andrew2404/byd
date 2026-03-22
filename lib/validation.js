export function validateLeadPayload(payload) {
  const errors = {};

  if (!payload.name?.trim()) errors.name = 'Name is required';
  if (!payload.phone?.trim()) errors.phone = 'Phone is required';
  if (!payload.email?.trim() || !/\S+@\S+\.\S+/.test(payload.email)) errors.email = 'Valid email is required';
  if (!payload.consent) errors.consent = 'Consent is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
