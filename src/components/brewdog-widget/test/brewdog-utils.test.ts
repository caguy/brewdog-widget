import { buildPunkApiRequest } from '../brewdog-utils';

describe('buildPunkApiRequest', () => {
  it('should return url to a random beer if no food is provided', () => {
    expect(buildPunkApiRequest()).toBe('https://api.punkapi.com/v2/beers/random');
    expect(buildPunkApiRequest('')).toBe('https://api.punkapi.com/v2/beers/random');
  });

  it('should return url to beers matching provided food if provided', () => {
    expect(buildPunkApiRequest('chicken')).toBe('https://api.punkapi.com/v2/beers?food=chicken');
  });

  it('should replace spaces with _ in the url if multiple food strings are provided', () => {
    expect(buildPunkApiRequest('Shredded chicken    tacos')).toBe('https://api.punkapi.com/v2/beers?food=Shredded_chicken_tacos');
  });
});
