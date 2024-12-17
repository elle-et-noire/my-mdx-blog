import { GetAllPosts } from "@/libs/post";
import PostCard from "@/components/postCard";

export default function Home() {
  const posts = GetAllPosts();
  return (
    <div className="items-center justify-items-center min-h-screen bg-[#a0bac8] font-[family-name:var(--font-noto-sans)]">
      <main className="flex flex-col items-center sm:items-start bg-[#a0bac8] py-16 w-[36rem]">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            widthClass="w-full"
            mainClassName="bg-[#edf1f4] text-[#344a5f] py-6 pl-6 rounded-md shadow-[0_1px_1px_1px_rgba(0,0,0,0.5)] overflow-hidden my-3"
            textSize="text-base md:text-xl"
          />
        ))}
      </main>
    </div>
  );
}
