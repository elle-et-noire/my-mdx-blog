import { GetAllPosts } from "@/lib/post";
import PostCard from "@/components/post-card";

export default function Home() {
  const posts = GetAllPosts();
  return (
    <div className="
        pb-16 pt-20 px-2 mx-auto
        w-full md:w-[48rem]
        flex flex-col gap-3 items-center"
    >
      {posts.map((post) => (
        <PostCard key={post.slug} slug={post.slug} data={post.data} />
      ))}
    </div>
  );
}
