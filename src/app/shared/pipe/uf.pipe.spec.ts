import { UfPipe } from './uf.pipe';

describe('UfPipe', () => {
  let pipe: UfPipe;

  beforeEach(() => {
    pipe = new UfPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a number with dots into a string with commas', () => {
    const result = pipe.transform('10.000');
    expect(result).toEqual('10,000');
  });

  it('transforms a string with dots into a string with commas', () => {
    const result = pipe.transform('15.123,45');
    expect(result).toEqual('15,123,45');
  });

  it('returns an empty string if the input is null', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('returns an empty string if the input is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toEqual('');
  });

  it('returns an empty string if the input is not a string', () => {
    const result = pipe.transform(123);
    expect(result).toEqual('123');
  });

  it('returns the same string if the input has no dots', () => {
    const result = pipe.transform('no dots');
    expect(result).toEqual('no dots');
  });
});
