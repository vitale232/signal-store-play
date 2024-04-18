import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserDto } from './user.model';
import { UserService } from './user.service';

type NullableUserState = {
  user: UserDto | null;
  token: string | null;
};

export const NullableUserStore = signalStore(
  withState<NullableUserState>({
    user: null,
    token: null,
  }),
  withMethods((store, userService = inject(UserService)) => ({
    async get(id: string | number) {
      const user = await userService.getById(id);
      patchState(store, { user });
    },
  })),
  withHooks({
    onInit(store) {
      store.get(1);
    },
  }),
);

const initialState: UserDto = {
  id: 0,
  firstName: '',
  lastName: '',
  address: { place: '' },
};
type NonNullableUserState = {
  user: UserDto;
  token: string;
};

export const NonNullableUserStore = signalStore(
  withState<NonNullableUserState>({ user: initialState, token: '' }),
  withMethods((store, userService = inject(UserService)) => ({
    async get(id: string | number) {
      const user = await userService.getById(id);
      patchState(store, { user });
    },
  })),
  withHooks({
    onInit(store) {
      store.get(2);
    },
  }),
);
