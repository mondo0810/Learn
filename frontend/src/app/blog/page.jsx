import Link from "next/link";

export const revalidate = 20;

export default async function Page() {
  const data = await fetch("http://localhost:8000/blog.json");
  const posts = await data.json();
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Blog Posts
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition"
          >
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
