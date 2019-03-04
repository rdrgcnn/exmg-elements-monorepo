import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import '@polymer/paper-radio-button/paper-radio-button.js';
import {exmgRadioGroupItemStyles} from './exmg-radio-group-item-styles';

enum ItemType {
  BUTTON = 'button',
  BLOCK = 'block',
}

@customElement('exmg-radio-group-item')
export class ExmgRadioGroupItem extends LitElement {
  @property({type: String})
  name: string = '';

  @property({type: String})
  type: string = ItemType.BUTTON;

  static styles = [
    exmgRadioGroupItemStyles,
  ];

  private getTemplate(): TemplateResult|undefined {
    switch (this.type) {
      case ItemType.BUTTON:
        return html`
          <paper-radio-button name="${this.name}">
            <slot></slot>
          </paper-radio-button>
        `;

      case ItemType.BLOCK:
        return html`
          <paper-radio-button name="${this.name}">
            <div class="label">
              <slot class="title" name="title"></slot>
              <slot name="body"></slot>
            </div>                
          </paper-radio-button>
        `;

      default:
        return undefined;
    }
  }

  render() {
    return html`
      <div class="item" style="max-width:400px">
        ${this.getTemplate()}
      </div>
    `;
  }
}
