import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@exmg/exmg-paper-combobox';
import '@polymer/paper-item';
import '@material/mwc-icon-button';

@customElement('exmg-grid-base-toolbar-demo')
export class ExmgGridBaseToolbarDemo extends LitElement {
  @property({type: Object})
  private actions: any[] = [
    {
      id: 'export',
      text: '',
      tooltip: 'Export',
      icon: 'get_app',
    },
    {
      id: 'merge',
      text: '',
      tooltip: 'Merge',
      icon: 'merge_type',
    },
    {
      id: 'delete',
      text: '',
      tooltip: 'Delete',
      icon: 'delete',
    },
  ];

  private description: string = 'Table 1';

  private filters: any[] = [
    {
      id: 'status',
      name: 'Status',
      config: {
        data: [
          {
            id: 'active',
            title: 'Active',
          },
          {
            id: 'inactive',
            title: 'Inactive',
          },
          {
            id: 'archived',
            title: 'Archived',
          },
        ],
      },
      selected: 'active',
    },
  ];

  private onActionExecuted(action: any) {
    return (event: Event) => {
      console.log('onActionExecuted', action, event);
    };
  }

  private onFilterChanged(filter: any) {
    return (event: Event) => {
      console.log('onFilterChanged', filter, event);
    };
  }

  private removeOneAction() {
    this.actions.shift();
    this.actions = [...this.actions];
  }

  render() {
    return html`
      <style>
        :host {
          --mdc-theme-primary: #0071dc;
          padding: 10px;
          display: block;
          background-color: #f6f6f6;
        }
      </style>
      <h1>With actions</h1>
      <button @click=${this.removeOneAction}>Remove one action</button>
      <hr />
      <exmg-grid-base-toolbar>
        <div slot="actions">
          ${repeat(this.actions, action => {
            return html`
              <mwc-icon-button
                class="action"
                icon="${action.icon}"
                label="${action.text}"
                title="${action.tooltip}"
                @click="${this.onActionExecuted(action)}"
              ></mwc-icon-button>
            `;
          })}
        </div>
        <div slot="description">${this.description}</div>
        <div slot="filters">
          ${repeat(this.filters, filter => {
            return html`
              <exmg-paper-combobox
                id="pageSizeOptions"
                attr-for-selected="data-id"
                selected="${filter.selected}"
                @exmg-combobox-select="${this.onFilterChanged(filter)}"
              >
                ${repeat(
                  filter.config.data,
                  (item: any) => item,
                  item =>
                    html`
                      <paper-item data-id="${item.id}">${filter.name}: ${item.title}</paper-item>
                    `,
                )}
              </exmg-paper-combobox>
            `;
          })}
        </div>
      </exmg-grid-base-toolbar>
    `;
  }
}
