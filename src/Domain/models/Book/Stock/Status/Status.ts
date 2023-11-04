import { ValueObject } from 'Domain/models/shared/ValueObject';

export enum StatusEnum {
  PreSale = 'PreSale',
  OnSale = 'OnSale',
  Discontinued = 'Discontinued',
}
export type StatusLabel = '販売前' | '販売中' | '販売停止';

type StatusValue = StatusEnum;
export class Status extends ValueObject<StatusValue, 'Status'> {
  constructor(value: StatusValue) {
    super(value);
  }

  protected validate(value: StatusValue): void {
    if (!Object.values(StatusEnum).includes(value)) {
      throw new Error('無効なステータスです。');
    }
  }

  toLabel(): StatusLabel {
    switch (this._value) {
      case StatusEnum.PreSale:
        return '販売前';
      case StatusEnum.OnSale:
        return '販売中';
      case StatusEnum.Discontinued:
        return '販売停止';
    }
  }
}
