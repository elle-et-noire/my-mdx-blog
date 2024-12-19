import { GetAllPosts } from "@/libs/post";
import PostCard from "@/components/post-card";

export default function Home() {
  const posts = GetAllPosts();
  return (
    <main className="min-h-screen min-w-max m-0 pb-12 bg-[#a0bac8]">
      <div className="z-0 fixed top-0 w-full p-0 top-0 left-0 right-0 text-center text-[#112b45] underline underline-offset-[12px] decoration-4 decoration-yellow-300 bg-[#fefefe] text-2xl font-system pt-4 pb-2 shadow-[0_1px_1px_1px_rgba(0,0,0,0.3)]">
        記事一覧
      </div>
      <div className="flex flex-col gap-3 items-center pb-16 pt-20 md:w-[48rem] w-full mx-auto px-16">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            widthClass="w-full"
            mainClassName="bg-[#fefefe] text-[#324e73] rounded-md shadow-[0_1px_0px_2px_rgba(128,167,180,1)] overflow-hidden"
            textSize="text-lg md:text-xl"
          />
        ))}
      </div>
    </main>
  );
}
