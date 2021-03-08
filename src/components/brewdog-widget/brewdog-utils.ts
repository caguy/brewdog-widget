export const buildPunkApiRequest = (food?: string): string =>
  food ? `https://api.punkapi.com/v2/beers?food=${food.split(/\s+/).join('_')}` : `https://api.punkapi.com/v2/beers/random`;
