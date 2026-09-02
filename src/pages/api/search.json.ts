import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const searchIndex = posts.map((post) => ({
    type: 'post',
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/blog/${post.id}/`,
    date: post.data.pubDate.toISOString().slice(0, 10),
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
