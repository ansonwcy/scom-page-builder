import { ICommand, IDataColumn, MAX_COLUMN, MIN_COLUMN } from "./interface";
import { pageObject } from "../../store/index";
import { Control } from "@ijstech/components";

export class UpdateTypeCommand implements ICommand {
  private element: any;
  private dropElm: HTMLElement;
  private oldDataColumn: IDataColumn;
  private oldDataRow: string;
  private data: any;
  private oldDataColumnMap: any[] = [];

  constructor(element: any, dropElm: HTMLElement) {
    this.element = element;
    this.dropElm = dropElm;
    this.oldDataColumn = {
      column: Number(element.dataset.column),
      columnSpan: Number(element.dataset.columnSpan)
    }
    const pageRow = element.closest('ide-row') as Control;
    this.oldDataRow = (pageRow?.id || '').replace('row-', '');
    this.data = JSON.parse(JSON.stringify(element.data));
  }

  private updateColumnData(el: Control, rowId: string, column?: number, columnSpan?: number) {
    if (!column && !columnSpan) return;
    this.oldDataColumnMap.push({el, rowId, column: this.getColumn(el), columnSpan: this.getColumnSpan(el)});
    const col = column || this.getColumn(el);
    const colSpan = columnSpan || this.getColumnSpan(el);
    const newColumnData: any = {column: col, columnSpan: colSpan};
    pageObject.setElement(rowId, el.id, newColumnData);
    el.setAttribute('data-column', `${col}`);
    el.setAttribute('data-column-span', `${colSpan}`);
    el.style.gridColumn = `${col} / span ${colSpan}`;
  }

  private resetColumnData(el: Control, rowId: string, column: number, columnSpan: number) {
    pageObject.setElement(rowId, el.id, {column, columnSpan});
    el.setAttribute('data-column', `${column}`);
    el.setAttribute('data-column-span', `${columnSpan}`);
    el.style.gridColumn = `${column} / span ${columnSpan}`;
  }


  private getColumn(el: Control) {
    return Number(el.dataset.column);
  }
  private getColumnSpan(el: Control) {
    return Number(el.dataset.columnSpan);
  }
  private getNextColumn(el: Control) {
    return this.getColumn(el) + this.getColumnSpan(el);
  }
  private getPrevColumn(el: Control) {
    return this.getColumn(el) - this.getColumnSpan(el);
  }

  private getColumnData() {
    const grid = this.dropElm.closest('.grid');
    const sections = Array.from(grid?.querySelectorAll('ide-section'));
    const sortedSections = sections.sort((a: HTMLElement, b: HTMLElement) => Number(b.dataset.column) - Number(a.dataset.column));
    const dropElmCol = Number(this.dropElm.getAttribute('data-column'));
    if (!isNaN(dropElmCol)) {
      let columnSpan = this.getColumnSpan(this.element);
      const maxColumn = (MAX_COLUMN - columnSpan) + 1;
      let newColumn = (columnSpan > 1 && dropElmCol > maxColumn) ? maxColumn : dropElmCol;
      let newColumnSpan = columnSpan;
      let prevDropElm = null;
      let afterDropElm = null;
      let currentSpan = 0;
      currentSpan = sortedSections.reduce((result: number, el: Control) => {
        if (!el.contains(this.element)) {
          const elCol = this.getColumn(el);
          result += this.getColumnSpan(el);
          if (this.getColumn(this.dropElm as Control) > elCol && (!prevDropElm || (prevDropElm && this.getColumn(prevDropElm) < elCol))) {
            prevDropElm = el;
          }
          if (this.getColumn(this.dropElm as Control) < elCol && (!afterDropElm || (afterDropElm && this.getColumn(afterDropElm) > elCol))) {
            afterDropElm = el;
          }
        }
        return result;
      }, 0);

      if (prevDropElm) {
        const prevColumn = this.getColumn(prevDropElm);
        const prevColumnSpan = this.getColumnSpan(prevDropElm);
        const columnData = prevColumn + prevColumnSpan;
        if (columnData < 13 && newColumn < columnData)
          newColumn = columnData;
      }
      if (afterDropElm) {
        const afterColumn = this.getColumn(afterDropElm);
        if (newColumn + columnSpan > afterColumn)
          newColumnSpan = afterColumn - newColumn;
      }
      const finalColumnSpan = Math.max(Math.min(newColumnSpan, MAX_COLUMN - currentSpan), 1);
      return { column: newColumn, columnSpan: finalColumnSpan };
    } else {
      const dropSection = this.dropElm.closest('ide-section') as Control;
      if (dropSection) {
        const pageRow = this.dropElm.closest('ide-row') as Control;
        const pageRowId = (pageRow?.id || '').replace('row-', '');
        let newColumn = this.getNextColumn(dropSection);
        if (pageRow.contains(this.element)) {
          const elementIndex = sortedSections.findIndex(el => this.getColumn(el as Control) === this.getColumn(this.element));
          const dropIndex = sortedSections.findIndex(el => this.getColumn(el as Control) === this.getColumn(dropSection));
          if (this.getColumn(this.element) > this.getColumn(dropSection)) {
            for (let j = elementIndex + 1; j < dropIndex; j++) {
              const elm = sortedSections[j] as Control;
              this.updateColumnData(elm, pageRowId, this.getColumn(elm) + this.getColumnSpan(this.element));
            }
          } else if (this.getColumn(this.element) < this.getColumn(dropSection)) {
            for (let j = elementIndex - 1; j >= dropIndex; j--) {
              const elm = sortedSections[j] as Control;
              this.updateColumnData(elm, pageRowId, this.getColumn(elm) - this.getColumnSpan(this.element));
            }
          }
          newColumn = this.getNextColumn(dropSection);
          return {column: newColumn, columnSpan: this.getColumnSpan(this.element)};
        }

        const hasSpace = sortedSections.find((section: Control) => this.getColumnSpan(section) > MIN_COLUMN);
        if (!hasSpace && sortedSections.length >= 6) return null;

        const columnSpan = Math.min(this.getColumnSpan(this.element), MIN_COLUMN);
        for (let i = 0; i < sortedSections.length; i++) {
          const el = sortedSections[i] as Control;
          const prevElm = sortedSections[i - 1] as Control;
          const nextElm = sortedSections[i + 1] as Control;

          if (this.getColumnSpan(el) > columnSpan) {
            const newElColSpan = this.getColumnSpan(el) - columnSpan;
            if (this.getColumn(dropSection) < this.getColumn(el)) {
              const nextPos = this.getColumn(el) - this.getColumnSpan(nextElm);
              if (this.getColumn(nextElm) !== nextPos && nextPos !== this.getNextColumn(dropSection))
                this.updateColumnData(nextElm, pageRowId, nextPos);
              this.updateColumnData(el, pageRowId, this.getColumn(el) + columnSpan, newElColSpan);
              newColumn = this.getNextColumn(dropSection);
            } else if (this.getColumn(dropSection) > this.getColumn(el)) {
              this.updateColumnData(el, pageRowId, this.getColumn(el), newElColSpan);
              if (prevElm) {
                for (let j = i - 1; j >= 0; j--) {
                  const elm = sortedSections[j] as Control;
                  const newElmCol = this.getColumn(elm) - columnSpan;
                  if (newElmCol !== this.getNextColumn(dropSection))
                    this.updateColumnData(elm, pageRowId, newElmCol);
                }
              }
              newColumn = this.getNextColumn(dropSection);
            } else {
              this.updateColumnData(el, pageRowId, this.getColumn(el), newElColSpan);
              newColumn = this.getColumn(el) + newElColSpan;
            }
            break;
          } else {
            if (this.getNextColumn(el) < MAX_COLUMN + 1 && i === 0) {
              this.updateColumnData(el, pageRowId, (MAX_COLUMN + 1) - this.getColumnSpan(el));
            }
            if (nextElm) {
              const canUpdated = this.getNextColumn(nextElm) !== this.getColumn(el) &&
                this.getColumnSpan(nextElm) <= MIN_COLUMN;
              if (canUpdated) {
                if (this.getColumn(dropSection) < this.getColumn(el)) {
                  const pos = this.getColumn(el) - this.getColumnSpan(nextElm);
                  pos !== this.getNextColumn(dropSection) && this.updateColumnData(nextElm, pageRowId, pos);
                } else if (this.getColumn(dropSection) > this.getColumn(el)) {
                  for (let j = i; j >= 0; j--) {
                    const elm = sortedSections[j] as Control;
                    if (this.getPrevColumn(elm) !== this.getNextColumn(dropSection)) {
                      this.updateColumnData(elm, pageRowId, this.getPrevColumn(elm));
                    }
                  }
                } else {
                  this.updateColumnData(el, pageRowId, this.getPrevColumn(dropSection));
                }
              }
            }
            newColumn = this.getNextColumn(dropSection);
          }
        }
        return { column: newColumn, columnSpan };
      }
    }
    return null;
  }

  execute(): void {
    this.dropElm.style.border = "";
    const grid = this.dropElm.closest('.grid') as Control;
    if (!grid) return;
    const newColumnData = this.getColumnData();
    if (!newColumnData) return;

    const isBottomBlock = this.dropElm.classList.contains('bottom-block');
    console.log(newColumnData, isBottomBlock);

    this.element.style.gridRow = '1';
    this.element.style.gridColumn = `${newColumnData.column} / span ${newColumnData.columnSpan}`;
    this.element.setAttribute('data-column', `${newColumnData.column}`);
    this.element.setAttribute('data-column-span', `${newColumnData.columnSpan}`);

    const elementRow = this.element.closest('ide-row') as Control;
    const dropRow = this.dropElm.closest('ide-row') as Control;
    const dropRowId = (dropRow?.id || '').replace('row-', '');
    const elementRowId = (elementRow?.id || '').replace('row-', '');
    pageObject.setElement(elementRowId, this.element.id, {...newColumnData});

    if (!elementRow.isEqualNode(dropRow)) {
      pageObject.addElement(dropRowId, {...this.data, ...newColumnData});
      pageObject.removeElement(elementRowId, this.element.id);
      grid.appendChild(this.element);
      const toolbar = this.element.querySelector('ide-toolbar') as any;
      if (toolbar) toolbar.rowId = dropRowId;
      this.element.rowId = dropRowId;
      this.element.parent = grid;
    }
    const elementSection = pageObject.getRow(elementRowId);
    elementRow.visible = !!elementSection?.elements?.length;
  }

  undo(): void {
    this.element.style.gridRow = '1';
    this.element.style.gridColumn = `${this.oldDataColumn.column} / span ${this.oldDataColumn.columnSpan}`;
    this.element.setAttribute('data-column', `${this.oldDataColumn.column}`);
    this.element.setAttribute('data-column-span', `${this.oldDataColumn.columnSpan}`);

    const elementRow = this.element.closest('ide-row') as Control;
    const elementRowId = (elementRow?.id || '').replace('row-', '');
    pageObject.setElement(elementRowId, this.element.id, {...this.oldDataColumn});

    if (!this.oldDataRow) return;
    const oldElementRow = document.querySelector(`#row-${this.oldDataRow}`) as Control;
    if (oldElementRow && !elementRow.isEqualNode(oldElementRow)) {
      pageObject.addElement(this.oldDataRow, {...this.data, ...this.oldDataColumn});
      pageObject.removeElement(elementRowId, this.element.id);
      const oldGrid = oldElementRow.querySelector('.grid');
      if (oldGrid) {
        oldGrid.appendChild(this.element);
        const toolbar = this.element.querySelector('ide-toolbar') as any;
        if (toolbar) toolbar.rowId = this.oldDataRow;
        this.element.rowId = this.oldDataRow;
        this.element.parent = oldGrid;
      }
    }
    const oldElementSection = pageObject.getRow(this.oldDataRow);
    oldElementRow && (oldElementRow.visible = !!oldElementSection?.elements?.length);

    for (let columnData of this.oldDataColumnMap) {
      const { el, rowId, column, columnSpan } = columnData;
      this.resetColumnData(el, rowId, column, columnSpan);
    }
  }

  redo(): void {}
}
