import * as HTTP from 'node:http';
import RSS from 'rss';
import { dataSource } from './data-source';
import { Container } from './entitites/Container';

const feed = new RSS({
  title: 'CoiB',
  description: 'CoiB RSS Feed',
  feed_url: 'http://localhost:3000/feed',
  site_url: 'http://localhost:3000',
});

async function handleRSSFeed(req: HTTP.IncomingMessage, res: HTTP.ServerResponse) {
  let containers = await dataSource.getRepository(Container).find();
  // sort in decreasing order by views and select first 10
  containers = containers.sort((a, b) => b.views - a.views).slice(0, 10);

  for (const container of containers) {
    feed.item({
      title: container.name,
      description: `<div>
        <h3>Views: ${container.views}</h3>
        <p>${container.description}</p>
        <img src="${container.imageUrl}" alt="${container.name}" />
      </div>`,
      url: `http://localhost:8765/Frontend/containers.html?id=${container.id}`,
      date: new Date(),
    });
  }

  res.statusCode = 200;
  res.setHeader('content-type', 'application/xml');
  res.write(feed.xml());
  res.end();
}

export { handleRSSFeed };
