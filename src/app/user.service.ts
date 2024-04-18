import { Injectable } from '@angular/core';
import { UserDto } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async getById(id: number | string): Promise<UserDto> {
    const user =
      Number(id) === 1
        ? {
            id: 1,
            firstName: 'Jimi',
            lastName: 'Hendrix',
            address: { place: '1100 E 9th St, Cleveland, OH 44114' },
          }
        : {
            id: 2,

            firstName: 'Eric',
            lastName: 'Clapton',
            address: { place: '1100 E 9th St, Cleveland, OH 44114' },
          };
    return new Promise((resolve) => setTimeout(() => resolve(user), 2_000));
  }
}
