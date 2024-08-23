export const fieldMustBeSupply = (field: string) =>
  `A value for ${field} must be supply.`;

export const raiseDuplicateEntryError = (table: string, field: string) =>
  `A ${table} with this ${field} has already been created. Try another ${field}.`;

export const maximumAllowedLength = (field: string, length: number) =>
  `The provided ${field} exceeds the maximum allowed length of ${length} characters.`;

export const maximumAllowedLengthList = (field: string, length: number) =>
  `The provided ${field} exceeds the maximum allowed length of ${length}.`;

export const notFound = (data: string) => `${data} not found`;
