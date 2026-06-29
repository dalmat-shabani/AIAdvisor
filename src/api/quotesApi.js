const QUOTES_API = 'https://api.quotable.io/quotes';
const TAGS = 'success|wisdom|inspirational';

const FALLBACK_QUOTES = [
  {
    id: 'fallback-1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    id: 'fallback-2',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
  },
  {
    id: 'fallback-3',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  },
  {
    id: 'fallback-4',
    text: 'Believe you can and you’re halfway there.',
    author: 'Theodore Roosevelt',
  },
  {
    id: 'fallback-5',
    text: 'With the new day comes new strength and new thoughts.',
    author: 'Eleanor Roosevelt',
  },
  {
    id: 'fallback-6',
    text: 'Do not wait to strike till the iron is hot; but make it hot by striking.',
    author: 'William Butler Yeats',
  },
  {
    id: 'fallback-7',
    text: 'What you do today can improve all your tomorrows.',
    author: 'Ralph Marston',
  },
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function fetchInspirationalQuotes(limit = 8) {
  const url = new URL(QUOTES_API);
  url.searchParams.set('tags', TAGS);
  url.searchParams.set('limit', limit);
  url.searchParams.set('page', Math.floor(Math.random() * 20) + 1);
  url.searchParams.set('cacheBust', Date.now().toString());

  try {
    const response = await fetch(url.toString(), { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const quotes = data.results && data.results.length ? data.results : FALLBACK_QUOTES;
    return shuffle(quotes)
      .slice(0, limit)
      .map((quote) => ({
        id: quote._id || quote.id,
        text: quote.content || quote.text,
        author: quote.author,
        tags: quote.tags,
      }));
  } catch (error) {
    return shuffle(FALLBACK_QUOTES).slice(0, limit);
  }
}

export async function fetchRandomQuote() {
  const url = new URL('https://api.quotable.io/random');
  url.searchParams.set('tags', 'motivational|success');
  url.searchParams.set('cacheBust', Date.now().toString());

  const response = await fetch(url.toString(), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const quote = await response.json();

  return {
    id: quote._id,
    text: quote.content,
    author: quote.author,
  };
}
