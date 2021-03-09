import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import axios from 'axios';
import {shuffle} from "lodash";
import BeerCard from './BeerCard';

@Component({
  tag: 'brewdog-widget',
  styleUrl: 'brewdog-widget.scss',
  shadow: true,
})
export class BrewdogWidget {
  @State() status: 'loading' | 'loaded' | 'error';
  @State() beerPool: any[];
  @State() currentIndex: number;

  @Prop() food: string;
  @Watch('food')
 foodChangeHandler(): void {
    this.reset();
    this.fetchBeers();
  }

  connectedCallback() {
    this.reset();
  }

  componentWillLoad() {
    this.fetchBeers();
  }

  reset(){
    this.currentIndex = 0;
    this.beerPool = [];
    this.status = 'loading';
  }

  async nextBeer(){
    if(this.currentIndex === this.beerPool.length - 1){
      this.status = 'loading';
      await this.fetchBeers();
    }
    this.currentIndex++;
  }

  previousBeer(){
    if(this.currentIndex !== 0) this.currentIndex--;
  }

  async fetchBeers() {
    try {
      let response;

      if(this.food && this.beerPool.length === 0){
        response = await axios.get(`https://api.punkapi.com/v2/beers?food=${this.food.split(/\s+/).join('_')}&per_page=80`);
      } else {
        response = await axios.get(`https://api.punkapi.com/v2/beers/random`);
      }
      
      this.beerPool = [...this.beerPool, ...shuffle(response.data)];
      this.status = 'loaded';
    } catch (err) {
      this.status = 'error';
    }
  }

  render() {
    return (
      <Host>
        <section class="bw_container">
          {this.status === 'loading' && <div class="bw_spinner" />}
          {this.status === 'loaded' && <BeerCard beer={this.beerPool[this.currentIndex]} />}
          {this.status === 'error' && <span class="bw_error">An error has occured</span>}
        </section>
        {this.status !== 'error' && <nav class="bw_navigation"><button disabled={this.currentIndex === 0 || this.status === 'loading'} onClick={() => this.previousBeer()}>←</button><button disabled={this.status === 'loading'} onClick={() => this.nextBeer()}>→</button></nav>}
      </Host>
    );
  }
}
