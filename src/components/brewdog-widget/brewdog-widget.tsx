import { Component, Host, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'brewdog-widget',
  styleUrl: 'brewdog-widget.scss',
  shadow: true,
})
export class BrewdogWidget {
  @State() status: 'loading' | 'loaded' | 'error';
  @State() beers: any[];

  async fetchBeers() {
    try {
      const beers = await axios.get('https://api.punkapi.com/v2/beers/random');
      this.status = 'loaded';
      this.beers = beers.data;
    } catch (err) {
      this.status = 'error';
    }
  }

  connectedCallback() {
    this.status = 'loading';
  }

  componentWillLoad() {
    this.fetchBeers();
  }

  render() {
    return (
      <Host>
        <h1>Random beer :</h1>
        {this.status === 'loading' && <span>Loading...</span>}
        {this.status === 'loaded' && <span>{this.beers[0]?.name}</span>}
        {this.status === 'error' && <span>An error has occured</span>}
      </Host>
    );
  }
}
