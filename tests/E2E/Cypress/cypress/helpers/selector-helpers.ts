import { selectors } from './selectors';

/**
 * Type-safe helper utilities for accessing selectors without type assertions
 */

/**
 * Contact page field names that have input selectors
 */
export type ContactFieldName = 'Forename' | 'Email' | 'Message' | 'Surname' | 'Telephone';

/**
 * Contact page field names that have error field selectors
 */
export type ContactErrorFieldName = 'Forename' | 'Email' | 'Message';

/**
 * Map of contact field names to their selectors
 */
const CONTACT_FIELD_SELECTORS: Record<ContactFieldName, string> = {
  Forename: selectors.ContactPage.Forename,
  Email: selectors.ContactPage.Email,
  Message: selectors.ContactPage.Message,
  Surname: selectors.ContactPage.Surname,
  Telephone: selectors.ContactPage.Telephone
};

/**
 * Map of contact field names to their error field selectors
 */
const CONTACT_ERROR_FIELD_SELECTORS: Record<ContactErrorFieldName, string> = {
  Forename: selectors.ContactPage.ForenameErrorField,
  Email: selectors.ContactPage.EmailErrorField,
  Message: selectors.ContactPage.MessageErrorField
};

/**
 * Gets the input field selector for a contact form field
 * @param fieldName - The name of the contact form field
 * @returns The CSS selector for the input field
 * @throws Error if the field name is invalid
 */
export function getContactFieldSelector(fieldName: string): string {
  if (!isValidContactField(fieldName)) {
    throw new Error(
      `Invalid contact field name: "${fieldName}". Valid fields are: ${Object.keys(CONTACT_FIELD_SELECTORS).join(', ')}`
    );
  }
  return CONTACT_FIELD_SELECTORS[fieldName];
}

/**
 * Gets the error field selector for a contact form field
 * @param fieldName - The name of the contact form field
 * @returns The CSS selector for the error field
 * @throws Error if the field name is invalid or has no error field
 */
export function getContactErrorFieldSelector(fieldName: string): string {
  if (!isValidContactErrorField(fieldName)) {
    const validFields = Object.keys(CONTACT_ERROR_FIELD_SELECTORS).join(', ');
    throw new Error(
      `Invalid contact error field name: "${fieldName}". Valid fields with error indicators are: ${validFields}`
    );
  }
  return CONTACT_ERROR_FIELD_SELECTORS[fieldName];
}

/**
 * Type guard to check if a string is a valid contact field name
 * @param fieldName - The field name to validate
 * @returns True if the field name is valid
 */
export function isValidContactField(fieldName: string): fieldName is ContactFieldName {
  return fieldName in CONTACT_FIELD_SELECTORS;
}

/**
 * Type guard to check if a string is a valid contact error field name
 * @param fieldName - The field name to validate
 * @returns True if the field name has an error field
 */
export function isValidContactErrorField(fieldName: string): fieldName is ContactErrorFieldName {
  return fieldName in CONTACT_ERROR_FIELD_SELECTORS;
}
