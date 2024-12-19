import { GetAllPosts } from "@/libs/post";
import PostCard from "@/components/postCard";

export default function Home() {
  const posts = GetAllPosts();
  return (
    <div className="min-h-screen bg-[#a0bac8] font-[family-name:var(--font-noto-sans)]">
      <main>
        <div className="sticky top-0 w-full text-center text-[#112b45] underline underline-offset-[12px] decoration-4 decoration-yellow-300 bg-[#fefefe] text-2xl font-system pt-4 pb-2 shadow-[0_1px_1px_1px_rgba(0,0,0,0.3)]">
          記事一覧
        </div>
        <div className="flex flex-col gap-3 items-center pb-16 pt-8 md:w-[48rem] w-full mx-auto px-16">
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
    </div>
  );
}
