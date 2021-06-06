import { UserInput } from "../inputs/userInput";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User> {
    const password = await argon2.hash(input.password);
    return User.create({
      username: input.username,
      email: input.email,
      password,
    }).save();
  }
}
