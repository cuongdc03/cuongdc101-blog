import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const seriesList = await getCollection('series');

  const seriesMap = new Map(seriesList.map((s) => [s.id, s.data.title]));

  const searchIndex = [
    ...posts.map((post) => ({
      type: 'post',
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      url: `/blog/${post.id}/`,
      date: post.data.pubDate.toISOString().slice(0, 10),
      series: post.data.series
        ? {
            id: post.data.series.id,
            name: seriesMap.get(post.data.series.id) || post.data.series.id,
            order: post.data.series.order,
          }
        : null,
    })),
    ...seriesList.map((s) => ({
      type: 'series',
      title: s.data.title,
      description: s.data.description,
      tags: ['learning-path', 'series'],
      url: `/series/${s.id}/`,
      date: '',
      level: s.data.level,
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
