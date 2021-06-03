import { Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await getRepository(Post)
      .createQueryBuilder("post")
      .getMany();
    return posts;
  }
}
