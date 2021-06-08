import { UserInput } from "../inputs/userInput";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from "argon2";
import { UserResponse } from "../errors/userResponse";

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
  @Mutation(() => User)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          { field: "usernameOrEmail", message: "The username does not exists" },
        ],
      };
    }
    const verifyPassword = await argon2.verify(user.password, password);
    if (!verifyPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    return { user };
  }
}
