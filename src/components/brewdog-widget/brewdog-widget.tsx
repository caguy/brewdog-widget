import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'brewdog-widget',
  styleUrl: 'brewdog-widget.scss',
  shadow: true,
})
export class BrewdogWidget {
  render() {
    return <Host></Host>;
  }
}
