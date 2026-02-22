export type RangeNumber = {
  $gte?: number;
  $lte?: number;
};

export type UserFilter = {
  gender?: 'm' | 'f';
  fullName?: RegExp;
  age?: number | RangeNumber;
};
