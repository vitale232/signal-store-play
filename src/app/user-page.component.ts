import { Component, OnInit, inject } from '@angular/core';
import { NonNullableUserStore, NullableUserStore } from './user.store';
import { UserStateService } from './user-state.service';

@Component({
  selector: 'UserPage',
  standalone: true,
  templateUrl: './user-page.component.html',
  providers: [NullableUserStore, NonNullableUserStore, UserStateService],
})
export class UserPageComponent implements OnInit {
  readonly userStateService = inject(UserStateService);
  readonly nullableUserStore = inject(NullableUserStore);
  readonly nonNullableUserStore = inject(NonNullableUserStore);

  ngOnInit(): void {
    this.userStateService.loadUser().catch(console.error);
  }

  onEvent() {
    // Let's say we need to do something with the user.address.place
    // and compare the two stores DX
    this.nullableUserStore.user()?.address.place;
    //                                      ^? string | undefined
    // we've lost our `DeepSignal<string>` that I would hope to exist on `address.place`
    this.nonNullableUserStore.user.address.place();
    //                                      ^? string
    // It seems that adding a possible null means we don't have a DeepSignal<UserDto>

    this.nullableUserStore.token();
    //                         ^? string | null (invoked the getter on the Signal<string | null>)
    this.nonNullableUserStore.token();
    //                          ^? string (invoked the getter on the Signal<string>).

    // When providing initial state, the type system does not represent that the token is essentially null ('')
  }
}
