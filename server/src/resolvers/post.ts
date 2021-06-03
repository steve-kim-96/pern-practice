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
  @Mutation(() => Boolean)
  async updatePost(
    @Arg("input") input: PostInput,
    @Arg("id") id: number
  ): Promise<boolean> {
    await getRepository(Post).update(id, { ...input });
    return true;
  }
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await getRepository(Post).delete(id);
    return true;
  }
}
