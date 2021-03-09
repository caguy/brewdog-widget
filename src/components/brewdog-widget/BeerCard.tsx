import { h } from '@stencil/core';

const BeerFigure = ({ label, value }) => (
  <dl class="bw_card-figure">
    <dt class="bw_card-figure-label">{label}</dt>
    <dd class="bw_card-figure-value">{value}</dd>
  </dl>
);

const BeerCard = ({ beer }) => (
  <article id={`bw_${beer.id}`} class="bw_card">
    {beer.image_url && <div class="bw_card-image">
      <img class="bw_card-image-img" src={beer.image_url} alt={`A ${beer.name} bottle`} />
    </div>}
    <div class="bw_card-content">
      <header>
        <p class="bw_card-title">{beer.name}</p>
        <p class="bw_card-tagline">{beer.tagline}</p>
      </header>
      <p class="bw_card-description">{beer.description}</p>
      <div class="bw_card-pairing">
        <div class="bw_card-pairing-title">Food pairing:</div>
        <ul class="bw_ward-pairing-list">
          {beer.food_pairing.map(food => (
            <li class="bw_card-pairing-item">{food}</li>
          ))}
        </ul>
      </div>
      <div class="bw_card-figures">
        {beer.abv && <BeerFigure label="ABV" value={beer.abv} />}
        {beer.ibu && <BeerFigure label="IBU" value={beer.ibu} />}
        {beer.ebc && <BeerFigure label="EBC" value={beer.ebc} />}
        {beer.ph && <BeerFigure label="PH" value={beer.ph} />}
      </div>
    </div>
  </article>
);

export default BeerCard;
