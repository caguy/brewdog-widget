import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import axios from 'axios';
import { buildPunkApiRequest } from './brewdog-utils';
import { randomize } from '../../utils/utils';
import BeerCard from './BeerCard';

@Component({
  tag: 'brewdog-widget',
  styleUrl: 'brewdog-widget.scss',
  shadow: true,
})
export class BrewdogWidget {
  @Prop() food: string;
  @Watch('food')
  foodChangeHandler(): void {
    this.status = 'loading';
    this.fetchBeer();
  }

  @State() status: 'loading' | 'loaded' | 'error';
  @State() beer;

  async fetchBeer() {
    try {
      const beers = await axios.get(buildPunkApiRequest(this.food));
      this.status = 'loaded';
      this.beer = beers.data[randomize(beers.data.length)];
    } catch (err) {
      this.status = 'error';
    }
  }

  connectedCallback() {
    this.status = 'loading';
  }

  componentWillLoad() {
    this.fetchBeer();
  }

  render() {
    return (
      <Host>
        <section class="bw_container">
          {this.status === 'loading' && <div class="bw_spinner" />}
          {this.status === 'loaded' && <BeerCard beer={this.beer} />}
          {this.status === 'error' && <span>An error has occured</span>}
        </section>
      </Host>
    );
  }
}
