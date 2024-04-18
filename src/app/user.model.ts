export type UserDto = {
  /** @format int32 */
  id: number;
  firstName: string;
  lastName: string;
  address: {
    place: string;
  };
};
