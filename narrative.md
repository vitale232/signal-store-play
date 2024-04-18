I attended the SignalStore workshop at ng-conf 2024, and I found it to be one of the more useful bits
of my conference experience. It's an exciting technology emerging at an exciting time for Angular.
Contrats!

Our small team has been experimenting with using the SignalStore in one of our applications.
In some of the earlier experiments, we were working with a collection of entities. In that case,
we were able to use the `withEntities` feature of the store, and found an intuitive, maintainable,
and scalable API was exposed for working with our state.

Given that success, we're now experimenting with using `@ngrx/signals` in some other portions of our
application. The page we're experimenting with now is not represented by a collection of entities,
but rather is an entity "detail" page of a rather large object. The data for the page is not
fetched until the user has landed on this detail page.

Given the asynchronous nature of the data, it feels like it would be beneficial to represent
the absence of data in our application's types. When using
an `rxjs` `BehaviorSubject`, we've often defined our type as `BehaviorSubject<Entity | null>(null)`.
The intent is to communicate via the type system that the data is not always present,
so guard your views appropriately. IMO, this is a benefit of strong typing.

When trying to carry that concept over to our signal store usage, we're finding things don't necessarily
meet our expectations. Many of the examples I have encountered that are similar to our situation
tend to use initial state to satisfy strong typing. For example, you may have a type and initial state
like this example:

```typescript
export type UserDto = {
  /** @format int32 */
  id: number;
  firstName: string;
  lastName: string;
  address: {
    place: string;
  };
};
const initialState: UserDto = {
  id: 0,
  firstName: '',
  lastName: '',
  address: { place: '' },
};
```

On the surface, this seems to provide the expected developer experience with the signal
store. However, I feel like the empty strings and meaningful ID of 0 are footguns.
These properties will present as type `string` or `number` in TypeScript, when
arguably `string | null | undefined` is a better representation. This could lead
to an undocumented need for "truthy" checks on our properties.

As another solution, we have experimented with setting up nullable types in our `State`,
like so:

```typescript
type NullableUserState = {
  user: UserDto | null;
  token: string | null;
};
```

While I feel this better models our data flow in the type system, it
has the effect of eliminating the `DeepSignal`-ness of our object. For example:

```typescript
this.nullableUserStore.user()?.address.place;
//                                      ^? string | undefined
// we've lost our `DeepSignal<string>` that I would hope to exist on `address.place`
```

Here's an example repository I've put together. Hopefully it helps to communicate
what we're trying to accomplish with the SignalStore, and some of the pain points we've encountered.

Is the SignalStore even the right technology choice for
a use case like this? What are the emerging practices to represent nullability in the Singal Store?
Is it best to provide an initial state like our `NonNullableUserStore` in the example?
Are my concerns about the misleading types misguded in practice?
