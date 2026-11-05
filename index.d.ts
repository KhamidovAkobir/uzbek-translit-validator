export interface PINFLParseResult {
  valid: boolean;
  gender?: 'male' | 'female';
  birthDate?: string;
  regionCode?: string;
  serialNumber?: string;
  checksumValid?: boolean;
  error?: string;
}

export function toCyrillic(text: string): string;
export function toLatin(text: string): string;
export function isValidUzbekPhone(phone: string): boolean;
export function getPhoneCarrier(phone: string): string | null;
export function isValidPINFL(pinfl: string, verifyChecksum?: boolean): boolean;
export function parsePINFL(pinfl: string, options?: { verifyChecksum?: boolean }): PINFLParseResult;
export function isValidTIN(tin: string): boolean;
export function detectBankCardType(cardNumber: string): 'UZCARD' | 'HUMO' | 'VISA' | 'MASTERCARD' | 'UNKNOWN' | null;
export function formatUzbekPhone(phone: string): string;
export function maskUzbekPhone(phone: string): string;
export function maskPINFL(pinfl: string): string;
export function formatUZS(amount: number | string): string;
