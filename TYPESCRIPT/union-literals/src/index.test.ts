import { describe, it, expect } from '@jest/globals';
import { validateUsername } from './index';

describe('validateUsername', () => {
  it('should return true for valid usernames', () => {
    expect(validateUsername('Matt1234')).toBe(true);
  });

  it('should return false for invalid usernames', () => {
    expect(validateUsername('Alice')).toBe(false);
    expect(validateUsername('Bob')).toBe(false);
  });
});