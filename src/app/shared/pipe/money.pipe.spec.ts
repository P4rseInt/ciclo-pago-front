import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  let pipe: MoneyPipe;

  beforeEach(() => {
    pipe = new MoneyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a number into a string formatted as Chilean currency', () => {
    const result = pipe.transform(10000);
    expect(result).toEqual('10.000');
  });

  it('transforms a string into a string formatted as Chilean currency', () => {
    const result = pipe.transform('1512345');
    expect(result).toEqual('1.512.345');
  });

  it('returns an empty string if the input is null', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('returns an empty string if the input is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toEqual('');
  });

  it('returns an empty string if the input is not a valid number', () => {
    const result = pipe.transform('invalid');
    expect(result).toEqual('');
  });
});
