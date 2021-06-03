import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Post } from "../entities/Post";
import { PostInput } from "../inputs/postInput";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await getRepository(Post)
      .createQueryBuilder("post")
      .getMany();
    return posts;
  }
  @Mutation(() => Post)
  async createPost(@Arg("input") input: PostInput): Promise<Post> {
    return Post.create({
      ...input,
    }).save();
  }
}
