import { TruncarPipe } from './truncar.pipe';

describe('TruncarPipe', () => {
  let pipe: TruncarPipe;

  beforeEach(() => {
    pipe = new TruncarPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate string if it is longer than maxLength', () => {
    const value = 'Lorem ipsum dolor sit amet';
    const maxLength = 10;
    const result = pipe.transform(value, maxLength);
    expect(result).toEqual('Lorem ipsu...');
  });

  it('should not truncate string if it is shorter than maxLength', () => {
    const value = 'Lorem ipsum';
    const maxLength = 20;
    const result = pipe.transform(value, maxLength);
    expect(result).toEqual('Lorem ipsum');
  });
});
