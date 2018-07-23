import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../exmg-sortable.js';

class SortableDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
      ul, li {
        margin-left: 0;
        padding-left: 0;
      }

      li {
        display: flex;
        padding: 10px 15px;
        border-bottom: 1px solid silver;
      }

      li.clone {
        background: white;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
        opacity: 0.9;
      }

      li.dragged {
        background: #c0c0c0;
        opacity: 0.25;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.5) inset;
      }

      li > strong {
        flex-grow: 1;
      }

      li > span {
        width: 30%;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        padding: 10px 15px;
        border-bottom: 1px solid silver;
      }

      tr.dragged {
        background: #f0f0f0;
      }

      tr.clone {
        opacity: 0;
      }

      td.handle {
        padding: 0;
        vertical-align: middle;
      }
        td.handle span {
          display: block;
          background: gray;
          width: 20px;
          height: 20px;
        }

      .boxes {
          margin-top: 2em;
          overflow: hidden;
      }

      .box {
        float: left;
        width: 150px;
        height: 150px;
        padding: 10px;
        margin: 20px;
        box-sizing: border-box;
        background: #f0f0f0;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
      }

      .box.dragged {
        opacity: 0;
      }

      </style>
      <iron-ajax auto="" url="[[dataUrl]]" handle-as="json" last-response="{{users}}"></iron-ajax>

      <h2>List</h2>
      <exmg-sortable item-selector="li" orientation="vertical" on-dom-order-change="_orderChange">
        <ul>
          <template is="dom-repeat" items="[[users]]">
            <li>
              <strong>[[item.firstName]]</strong>
              <span>[[item.lastName]]</span>
              <span>[[item.email]]</span>
            </li>
          </template>
        </ul>
      </exmg-sortable>

      <h2>Cards</h2>
      <exmg-sortable item-selector="div.box" animation-timing="{ &quot;duration&quot;: 500 }" on-dom-order-change="_orderChange">
        <div class="boxes">
          <template is="dom-repeat" items="[[users]]">
            <div class="box">
              [[item.firstName]]
            </div>
          </template>
        </div>
      </exmg-sortable>

      <h2>Table</h2>
      <exmg-sortable item-selector="tr" handle-selector=".handle span" on-dom-order-change="_orderChange">
        <table>
          <template is="dom-repeat" items="[[users]]">
            <tr>
              <td class="handle"><span></span></td>
              <th>[[item.firstName]]</th>
              <td>[[item.lastName]]</td>
              <td>[[item.email]]</td>
            </tr>
          </template>
        </table>
      </exmg-sortable>

      <h2>Manipulate sorted data</h2>
      <exmg-sortable item-selector="div.box" on-dom-order-change="_usersOrderChange">
        <div class="boxes">
          <template is="dom-repeat" items="[[usersList]]" sort="_sortByIndex">
            <div class="box">
              [[item.firstName]] ([[item.index]])
            </div>
          </template>
        </div>
      </exmg-sortable>
    `;
  }
  static get is() {
    return 'exmg-sortable-demo';
  }
  static get properties() {
    return {
      dataUrl: {
        type: String
      },
      users: {
        type: Array,
        notify: true
      },
      usersList: {
        type: Array,
        computed: '_cloneUsers(users)'
      }
    };
  }
  _cloneUsers(users) {
    return [...users];
  }
  _sortByIndex(a, b) {
    return a.index - b.index;
  }

  /**
   * Simple order update: splices the data array to change physical rendering order.
   */
  _orderChange(event) {
    // prevent event to not let sortable change the dom
    event.preventDefault();

    // splice data and let dom-repeat rerender
    const source = this.splice('users', event.detail.sourceIndex, 1)[0];
    this.splice('users', event.detail.targetIndex, 0, source);
  }

  /**
   * Complex order update: manipulates a dom-repeat sorted data array to make it reflect desired rendering order.
   */
  _usersOrderChange(event) {
    // prevent event to not let sortable change the dom
    event.preventDefault();

    const sortable = event.target;
    const repeater = sortable.querySelector('dom-repeat');

    // get an array of the model in its current order via dom-repeat,
    const sorted = sortable._nodes.map(node => repeater.modelForElement(node));

    // update order with given splices,
    const source = sorted.splice(event.detail.sourceIndex, 1)[0];
    sorted.splice(event.detail.targetIndex, 0, source);

    // and apply a new ascending index in that order. This obviously only works for simple - and known - sorting
    // methods that we can hardcode to, and where item properties may be manipulated to change sorting. If a
    // filter method is used to conditionally display items, this may all horribly fail.

    let index = 1;
    sorted.forEach(model => {
      model.set('item.index', index++);
    });

    // A forced render is required here, or dom-repeat won't redraw properly.
    repeater.render();
  }
}

window.customElements.define(SortableDemo.is, SortableDemo);
