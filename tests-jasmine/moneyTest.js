import { formatCurrency } from "../scripts/utils/money.js";

//Creates a Test Suite
describe('test suite: formatCurrency',() => {
  it('converts cents into dollars',() => { //Helps in creating tests
    expect(formatCurrency(2095)).toEqual('20.95');//lets us compare two values
  }); 

  it('works with 0',() => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});