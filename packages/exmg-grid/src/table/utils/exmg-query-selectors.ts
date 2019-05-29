export class ExmgQuerySelectors {
  constructor(
    private table: HTMLTableElement,
    private tableBody: HTMLTableSectionElement,
  ) {}

  getTable(): HTMLTableElement {
    if (!this.table) {
      throw new Error(`Element table not found. Slot hast to define <table>`);
    }
    return this.table!;
  }

  getTableBody(): HTMLTableSectionElement {
    if (!this.tableBody) {
      throw new Error(`Element tbody not found. Slot hast to define <tbody class="grid-data">`);
    }

    return this.tableBody!;
  }

  getColumns(selector: string = 'th'): NodeListOf<HTMLTableHeaderCellElement> {
    return this.getTable().querySelectorAll<HTMLTableHeaderCellElement>(`.grid-columns ${selector}`);
  }

  getColumn<T extends HTMLElement = HTMLTableHeaderCellElement>(selector: string = 'th'): T | undefined {
    return this.getTable().querySelector<T>(`.grid-columns ${selector}`) || undefined;
  }

  getBodyRowSelector(selector = ''): string {
    return `tr:not(.grid-row-detail)${selector}`;
  }

  getBodyRows(): NodeListOf<HTMLTableRowElement> {
    return this.getTableBody().querySelectorAll<HTMLTableRowElement>(this.getBodyRowSelector());
  }

  getBodyRowsNotInitialized(): NodeListOf<HTMLTableRowElement> {
    return this.getTableBody().querySelectorAll<HTMLTableRowElement>(this.getBodyRowSelector(':not([data-initialized])'));
  }
}
