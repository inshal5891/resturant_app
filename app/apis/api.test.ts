import { describe, it, expect } from 'vitest';
import { formatDetail } from './api';

describe('formatDetail', () => {
  it('returns string details unchanged', () => {
    expect(formatDetail('Simple error')).toBe('Simple error');
  });

  it('formats array validation errors with loc and msg', () => {
    const detail = [
      { loc: ['body', 'items', 0, 'name'], msg: 'Field required', input: { name: '' } },
      { loc: ['body', 'phone'], msg: 'Invalid format', input: '123' },
    ];

    const out = formatDetail(detail);
    expect(out).toContain('body.items.0.name: Field required');
    expect(out).toContain('body.phone: Invalid format');
  });

  it('stringifies object details', () => {
    const obj = { error: 'bad_request', code: 123 };
    expect(formatDetail(obj)).toBe(JSON.stringify(obj));
  });
});
