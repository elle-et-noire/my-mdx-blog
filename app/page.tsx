import { GetAllPosts } from "@/libs/post";
import PostCard from "@/components/post-card";
import Copy from "@/components/my-code";

export default function Home() {
  const posts = GetAllPosts();
  return (
    <main className="min-h-screen min-w-max m-0 pb-12 bg-[#a0bac8]">
      <div className="
        z-0 fixed top-0 left-0 right-0
        pt-4 pb-2 w-full
        bg-[#fefefe] shadow-[0_1px_1px_1px_rgba(0,0,0,0.3)]
        text-center text-[#112b45] text-2xl font-system
        underline underline-offset-[12px] decoration-4 decoration-yellow-300"
      >
        記事一覧
      </div>
      <div className="
        pb-16 pt-20 px-16 mx-auto
        w-full md:w-[48rem]
        flex flex-col gap-3 items-center"
      >
        <Copy />
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
