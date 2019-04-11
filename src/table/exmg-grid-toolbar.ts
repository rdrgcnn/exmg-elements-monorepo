import {customElement, html, LitElement, property} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import '@material/mwc-icon';
import '@exmg/exmg-paper-combobox';
import '@polymer/paper-item';
import './exmg-grid-base-toolbar';
import './exmg-grid-setting';

import {
  Action,
  BaseFilterConfig,
  Filter,
  FilterConfigType,
  FilterSingleSelectConfig,
  Setting,
} from './types/exmg-grid-toolbar-types';

@customElement('exmg-grid-toolbar')
export class ExmgGridToolbar extends LitElement {
  @property({type: String})
  description: string = '';

  @property({type: Object})
  actions: Action[] = [];

  @property({type: Object})
  filters: Filter[] = [];

  @property({type: Object})
  settings: Setting[] = [];

  private emitActionExecutedEvent(action: Action) {
    return () => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-action-executed',
          {
            detail: {
              id: action.id,
            },
            composed: true,
            bubbles: true,
          }
        )
      );
    };
  }

  private emitFilterChangedEvent(filter: Filter) {
    return (event: CustomEvent) => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-filter-changed',
          {
            detail: {
              id: filter.id,
              value: event.detail.value,
            },
            composed: true,
            bubbles: true,
          }
        )
      );
    };
  }

  private emitSettingChangedEvent(setting: Setting) {
    return (event: CustomEvent) => {
      this.dispatchEvent(
        new CustomEvent(
          'exmg-grid-toolbar-setting-changed',
          {
            detail: {
              id: setting.id,
              value: event.detail.value,
            },
            composed: true,
            bubbles: true,
          }
        )
      );
    };
  }

  private renderActions() {
    return repeat(
      this.actions,
      (action) => html`
        <mwc-button
          class="action"
          title="${action.tooltip}"
          @click="${this.emitActionExecutedEvent(action)}"
        >
          <mwc-icon>${action.icon}</mwc-icon>
          ${action.text}
        </mwc-button>
      `
    );
  }

  private renderDescription() {
    return html`${this.description}`;
  }

  private renderFilters() {
    return repeat(
      this.filters,
      filter => this.renderFilter(filter)
    );
  }

  private renderFilter(filter: Filter) {
    if (this.isFilterSingleSelectConfig(filter)) {
      return this.renderSingleSelectFilter(filter);
    }

    return undefined;
  }

  private isFilterSingleSelectConfig(filter: Filter<BaseFilterConfig>): filter is Filter<FilterSingleSelectConfig> {
    return filter.config.type === FilterConfigType.SingleSelect;
  }

  private renderSingleSelectFilter(filter: Filter<FilterSingleSelectConfig>) {
    return html`
      <exmg-paper-combobox
        class="filter"
        attr-for-selected="data-id"
        no-float-label
        ?disabled="${!!filter.disabled}"
        label="${filter.name}"
        @exmg-combobox-select="${this.emitFilterChangedEvent(filter)}"
      >
        ${repeat(
          filter.config.data,
          (item: any) => item,
      item => html`<paper-item data-id="${item.id}">${filter.name}: ${item.title}</paper-item>`
        )}
      </exmg-paper-combobox>
    `;
  }

  private renderSettings() {
    console.log(this.settings);
    return repeat(
      this.settings,
      (setting) => html`
        <exmg-grid-setting
          class="setting"
          text="${setting.text}"
          tooltip="${setting.tooltip}"
          icon="${setting.icon}"
          @click="${this.emitSettingChangedEvent(setting)}"
        >
          zzz
        </exmg-grid-setting>
      `
    );
  }

  render() {
    return html`
      <style>
        :host {
          --paper-item-focused: {
            background-color: var(--exmg-filter-background-color, var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface)));
          };
          --paper-item-selected: {
            background-color: var(--exmg-filter-background-color, var(--exmg-theme-table-on-surface-low, var(--mdc-theme-surface)));
          }
          --paper-button-ink-color: var(--exmg-filter-background-color, var(--mdc-theme-surface));
          --paper-input-container-color: var(--exmg-grid-toolbar-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(--exmg-grid-toolbar-color, var(--mdc-theme-primary));

          --exmg-paper-combobox-selected-item-color: var(--exmg-grid-toolbar-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-selected-item-bg-color: var(--exmg-grid-toolbar-bg-color, transparent);
          --exmg-paper-combobox-dropdown-button-color: var(--exmg-grid-toolbar-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-button-bg-color: var(--exmg-grid-toolbar-bg-color, transparent);
          --exmg-paper-combobox-dropdown-list-color: var(--exmg-grid-toolbar-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-list-bg-color: var(--exmg-grid-toolbar-bg-color, var(--mdc-theme-surface));
        }
        :host exmg-grid-base-toolbar[active] {
          --paper-item-focused: {
            background-color: var(--exmg-filter-background-active-color, var(--mdc-theme-surface-medium, var(--mdc-theme-surface)));
          };
          --paper-item-selected: {
            background-color: var(--exmg-filter-background-active-color, var(--mdc-theme-surface-medium, var(--mdc-theme-surface)));
          }
          --paper-button-ink-color: var(--exmg-filter-background-active-color, var(--mdc-theme-surface));
          --paper-input-container-color: var(--exmg-grid-toolbar-active-color, var(--mdc-theme-on-surface));
          --paper-input-container-focus-color: var(--exmg-grid-toolbar-active-color, var(--mdc-theme-primary));

          --exmg-paper-combobox-selected-item-color: var(--exmg-grid-toolbar-active-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-selected-item-bg-color: var(--exmg-grid-toolbar-bg-active-color, transparent);
          --exmg-paper-combobox-dropdown-button-color: var(--exmg-grid-toolbar-active-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-button-bg-color: var(--exmg-grid-toolbar-bg-active-color, transparent);
          --exmg-paper-combobox-dropdown-list-color: var(--exmg-grid-toolbar-active-color, var(--mdc-theme-on-surface));
          --exmg-paper-combobox-dropdown-list-bg-color: var(--exmg-grid-toolbar-bg-active-color, var(--mdc-theme-surface));
        }
      </style>
      <exmg-grid-base-toolbar>
        <div slot="actions">
          ${this.renderActions()}
        </div>
        <div slot="description">
          ${this.renderDescription()}
        </div>
        <div slot="filters">
          ${this.renderFilters()}
        </div>
        <div slot="settings">
          ${this.renderSettings()}
        </div>
      </exmg-grid-base-toolbar>
    `;
  }
}
