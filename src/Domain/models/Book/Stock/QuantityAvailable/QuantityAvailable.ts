import { ValueObject } from 'Domain/models/shared/ValueObject';

type QuantityAvailableValue = number;
export class QuantityAvailable extends ValueObject<
  QuantityAvailableValue,
  'QuantityAvailable'
> {
  static readonly MAX: number = 1000000;
  static readonly MIN: number = 0;

  constructor(value: QuantityAvailableValue) {
    super(value);
  }

  protected validate(value: QuantityAvailableValue): void {
    if (value < QuantityAvailable.MIN || value > QuantityAvailable.MAX) {
      throw new Error(
        `在庫数は${QuantityAvailable.MIN}から${QuantityAvailable.MAX}の間でなければなりません。`
      );
    }
  }

  increment(amount: number): QuantityAvailable {
    const newValue = this._value + amount;

    return new QuantityAvailable(newValue);
  }

  decrement(amount: number): QuantityAvailable {
    const newValue = this._value - amount;

    return new QuantityAvailable(newValue);
  }
}
