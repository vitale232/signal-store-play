import { Injectable, computed, inject } from '@angular/core';
import { UserDto } from './user.model';
import { patchState, signalState } from '@ngrx/signals';
import { UserService } from './user.service';

type UserState = { user: UserDto | null; token: string | null };

@Injectable()
export class UserStateService {
  readonly #userService = inject(UserService);

  readonly userState = signalState<UserState>({ user: null, token: null });
  readonly addressPlace = computed(() => this.userState.user()?.address.place);
  readonly token = this.userState.token();

  async loadUser() {
    const user = await this.#userService.getById(1);
    patchState(this.userState, { user, token: 'abc123' });
    console.log({
      user,
      state: this.userState.user(),
      addressPlace: this.addressPlace,
    });
  }
}
