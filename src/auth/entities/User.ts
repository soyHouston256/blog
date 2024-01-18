import { AggregateRoot } from '../../common/aggregate-root';

export class User extends AggregateRoot {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly username: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly isAdmin: boolean,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super();
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
