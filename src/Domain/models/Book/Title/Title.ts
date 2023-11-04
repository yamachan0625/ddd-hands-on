import { ValueObject } from 'Domain/models/shared/ValueObject';

type TitleValue = string;
export class Title extends ValueObject<TitleValue, 'Title'> {
  static readonly MAX_LENGTH = 1000;
  static readonly MIN_LENGTH = 1;

  constructor(value: TitleValue) {
    super(value);
  }

  protected validate(value: TitleValue): void {
    if (value.length < Title.MIN_LENGTH || value.length > Title.MAX_LENGTH) {
      throw new Error(
        `タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`
      );
    }
  }
}
