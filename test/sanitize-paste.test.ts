import { describe, expect, test } from '@jest/globals';

import {
  FIREFOX_AUTOFILL,
  VALID_PASSWORDS_SIMPLE
} from './test-mocks';

// direct path for testing
import sanitizeUserPaste from '../src/utils/sanitizeUserPaste';

describe('Sanitizing User Paste', () => {
  const singleControlCharacter = [
    [`\n`, 'n'],
    [`\r`, 'r'],
    [`\f`, 'f'],
    [`\t`, 't'],
    [`\b`, 'b'],
  ];

  const multipleOfSameType = [
    ['\n\n\n', 'nnn'],
    ['\r\r\r', 'rrr'],
    ['\f\f\f', 'fff'],
    ['\t\t\t', 'ttt'],
    ['\b\b\b', 'bbb'],
  ];

  const multipleOfDifferentTypes = [
    ['\n\r\f\t\b', 'nrftb'],
    ['\n\n\n\r\r\r\f\f\f\t\t\t\b\b\b', 'nnnrrrffftttbbb'],
  ];

  const multipleOfDifferentTypesWithText = [
    ["\t\n\/Pn$3\n\f\b", `tnPn$3nfb`]
  ];

  const singleSpace = [
    [' '],
    ['  '],
    ['   '],
    ['    '],
  ];

  const multipleSpaces = [
    ['     '],
    ['      '],
    ['       '],
    ['        '],
  ];

  const multipleSpacesWithText = [
    ['     Pn$3     '],
    ['      Pn$3      '],
    ['       Pn$3       '],
    ['        Pn$3        '],
  ];

  const singleCharacter = [
    ['P'],
    ['n'],
    ['$'],
    ['3'],
  ];
  
  const multipleCharacters = [
    ['Pn$3'],
    ['Pn$3Pn$3'],
    ['Pn$3Pn$3Pn$3'],
    ['Pn$3Pn$3Pn$3Pn$3'],
  ];
  
  const multipleCharactersWithText = [
    ['Pn$3Pn$3Pn$3Pn$3Pn$3'],
    ['Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3'],
    ['Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3'],
    ['Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3Pn$3'],
  ];

  const allottedLength = 20;
  
  test('Should remove single control character', () => {
    singleControlCharacter.forEach(([input, output]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe(output);
    });
  });

  test('Should remove multiple of same type', () => {
    multipleOfSameType.forEach(([input, output]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe(output);
    });
  });

  test('Should remove multiple of different types', () => {
    multipleOfDifferentTypes.forEach(([input, output]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe(output);
    });
  });

  test('Should remove multiple of different types with text', () => {
    multipleOfDifferentTypesWithText.forEach(([input, output]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe(output);
    });
  });

  test('Should allow valid passwords', () => {
    VALID_PASSWORDS_SIMPLE.forEach((pwd) => {
      expect(sanitizeUserPaste(pwd, '', 100)).toBe(pwd);
    });

    FIREFOX_AUTOFILL.forEach((pwd) => {
      expect(sanitizeUserPaste(pwd, '', 100)).toBe(pwd);
    });
  });


  test('Should remove single space', () => {
    singleSpace.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe('');
    });
  });

  test('Should remove multiple spaces', () => {
    multipleSpaces.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe('');
    });
  });

  test('Should remove multiple spaces with text', () => {
    multipleSpacesWithText.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', 100)).toBe('Pn$3');
    });
  });

  test('Should allow single character', () => {
    singleCharacter.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', allottedLength)).toBe(input);
    });
  });

  test('Should allow multiple characters', () => {
    multipleCharacters.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', allottedLength)).toBe(input);
    });
  });

  test('Should allow multiple characters with text', () => {
    multipleCharactersWithText.forEach(([input]) => {
      expect(sanitizeUserPaste(input, '', allottedLength)).toBe(input.slice(0, allottedLength));
    });
  });
});
