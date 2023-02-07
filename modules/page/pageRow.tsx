import {
    Module,
    customElements,
    application,
    ControlElement,
    Styles,
    Control,
    VStack,
    observable,
    GridLayout
} from '@ijstech/components';
import { PageSection } from './pageSection';
import './pageRow.css';

import { RowSettingsDialog } from '@page/dialogs';
import { EVENT } from '@page/const';
import { IPageElement, IPageSection, IRowSettings } from '@page/interface';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['ide-row']: PageRowElement;
        }
    }
}

export interface PageRowElement extends ControlElement {
    readonly?: boolean;
}

@customElements('ide-row')
export class PageRow extends Module {
    // private rowSettings: RowSettingsDialog;
    private pnlElements: GridLayout;
    private actionsBar: VStack;
    private dragStack: VStack;

    private rowData: IPageSection;
    private _readonly: boolean;

    @observable()
    private isCloned: boolean = true;
    @observable()
    private isChanged: boolean = true;

    constructor(parent?: any) {
        super(parent);
        this.setData = this.setData.bind(this);
        this.getData = this.getData.bind(this);
    }

    private initEventBus() {
        application.EventBus.register(this, EVENT.ON_RESIZE, this.onResized);
    }

    init() {
        this._readonly = this.getAttribute('readonly', true, false);
        super.init();
        this.initEventBus();
    }

    private async createNewElement(i: number) {
        const sectionData = this.rowData.elements[i];
        const pageSection = (
            <ide-section
                readonly={this._readonly}
            ></ide-section>
        ) as PageSection;
        this.pnlElements.appendChild(pageSection);
        await pageSection.setData(sectionData);
        return pageSection;
    }

    private appendColumnsLayout(col: number) {
        const length = this.pnlElements.children.length;
        for (let i = 0; i < col; i++) {
            const el = <i-vstack id={`dropzone-tmp-${length + i}`} opacity={0} class="dropzone"></i-vstack>;
            this.pnlElements.appendChild(el);
        }
    }

    async setData(rowData: IPageSection) {
        console.log('rowData: ', rowData);
        this.pnlElements.clearInnerHTML();
        this.rowData = rowData;
        const { id, row, image, elements, backgroundColor } = this.rowData;
        // if (this.rowData.config.width)
        //     this.width = this.rowData.config.width;

        // if (this.rowData.config.height)
        //     this.minHeight = this.rowData.config.height;

        this.id = `row-${id}`;
        this.setAttribute('row', `${row}`);
        // Background
        if(image) {
            this.background.image = image;
        }
        else if(backgroundColor) {
            this.background.color = backgroundColor;
        }

        this.isCloned = this.parentElement.nodeName !== 'BUILDER-HEADER';
        this.isChanged = this.parentElement.nodeName !== 'BUILDER-HEADER';

        const unitWidth = Number(this.pnlElements.offsetWidth) / 12;
        if (elements && elements.length > 0) {
            if (elements.length === 1 && elements[0]?.properties?.width === '100%') {
                await this.createNewElement(0);
                this.pnlElements.templateColumns = ['repeat(1, 1fr)'];
            } else {
                const columns = elements.length;
                const configColumns = columns > 12 ? 12 : columns;
                let missingCols = 12 - configColumns;
                for (let i = 0; i < elements.length; i++) {
                    const pageSection = await this.createNewElement(i);
                    const ratio = Math.ceil(Number(pageSection.width) / unitWidth);
                    missingCols -= (ratio - 1);
                }
                for (let i = 0; i < missingCols; i++) {
                    const el = <i-vstack id={`dropzone${i}`} opacity={0} class="dropzone"></i-vstack>;
                    this.pnlElements.appendChild(el);
                }
                this.pnlElements.templateColumns = ['minmax(auto, 100%)', `repeat(${missingCols + configColumns - 1}, ${unitWidth}px)`];
            }
        }
        this.actionsBar.minHeight = '100%';
    }

    async getData() {
        const sections = this.pnlElements.querySelectorAll('ide-section');
        const sectionDataList: IPageElement[] = [];
        for (const section of sections) {
            const sectionData = await (section as PageSection).getData();
            if (!sectionData) continue;
            sectionDataList.push(sectionData);
        }
        this.rowData.elements = sectionDataList;
        return this.rowData;
    }

    onOpenRowSettingsDialog() {
        // this.rowSettings.setConfig(this.rowData.config);
        // this.rowSettings.show();
    }

    private onClone() {
        // TODO: move to pageRow
        const rowData = this.getData();
        if (!rowData) return;
        application.EventBus.dispatch(EVENT.ON_CLONE, { rowData, id: this.id });
    }

    private onResized(data: any) {
        const unitWidth = Number(this.pnlElements.offsetWidth) / 12;
        const { newWidth, oldWidth } = data;
        let list = Array.from(this.pnlElements.children);
        if (newWidth > oldWidth) {
            let ratio = Math.ceil(newWidth / unitWidth);
            for (let i = list.length - 1; i >= 0 && ratio !== 1; i--) {
                const node = list[i] as Control;
                if (node.nodeName !== 'IDE-SECTION') {
                    this.pnlElements.removeChild(node);
                    ratio--;
                }
            }
        } else {
            let ratio = Math.ceil((oldWidth - newWidth) / unitWidth);
            this.appendColumnsLayout(ratio - 1);
        }
        let templateColumns = [];
        list = Array.from(this.pnlElements.children);
        for (let i = 0; i < list.length; i++) {
            const node = list[i] as Control;
            templateColumns.push(node.nodeName === 'IDE-SECTION' ? 'minmax(auto, 100%)' : `${unitWidth}px`);
        }
        this.pnlElements.templateColumns = templateColumns;
    }

    async handleSectionSettingSave(config: IRowSettings) {
        // if(config.width && config.width != this.rowData.config.width) {
        //     this.rowData.config.width = config.width;
        //     this.width = config.width;
        // }
        // if(config.height && config.height != this.rowData.config.height) {
        //     this.rowData.config.height = config.height;
        //     this.height = config.height;
        // }
        // if (config.columnsSettings) {
        //     this.rowData.config.columnsSettings = config.columnsSettings;
        // }
        // // Background
        // if(config.backgroundImageUrl) {
        //     this.background.image = config.backgroundImageUrl;
        // }
        // else if(config.backgroundColor) {
        //     this.background.color = config.backgroundColor;
        // }
        // this.rowData.config.backgroundImageUrl = config.backgroundImageUrl;
        // this.rowData.config.backgroundColor = config.backgroundColor;

        // const columnsSettings = config.columnsSettings || {};
        // if(config.columns) {
        //     const sections = this.pnlElements.querySelectorAll('ide-section');
        //     if (sections) {
        //         let pageSections = [];
        //         for (let i = 0; i < config.columns; i++) {
        //             const colSettings = columnsSettings[i];
        //             const section = (sections[i] as PageSection);
        //             if (section && section.component) {
        //                 section.maxWidth = colSettings?.width || '100%';
        //                 section.size = colSettings?.size || {};
        //                 pageSections.push(section);
        //                 continue;
        //             };
        //             pageSections.push(<ide-section maxWidth={colSettings?.width || ''} containerSize={colSettings?.size || {}} readonly={this._readonly}></ide-section>);
        //         }
        //         this.pnlElements.clearInnerHTML();
        //         this.pnlElements.append(...pageSections);
        //     }
        //     else {
        //         const sections = this.pnlElements.querySelectorAll('ide-section');
        //         const delNum = this.rowData.config.columns - config.columns;
        //         let delCount = 0;
        //         if (sections) {
        //             for(let section of sections) {
        //                 if(delCount >= delNum) break;
        //                 if (section && (section as PageSection).component) continue;
        //                 else {
        //                     section.remove();
        //                     delCount++;
        //                 }
        //             }
        //             if(delCount < delNum) {
        //                 const sections2 = this.pnlElements.querySelectorAll('ide-section');
        //                 if(sections2) {
        //                     for (let i = 0; i < delNum - delCount; i++) {
        //                         if(sections2[sections2.length - 1])
        //                             sections2[sections2.length - 1].remove();
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     this.rowData.config.columns = config.columns;
        // }

        // application.EventBus.dispatch(EVENT.ON_UPDATE_SECTIONS, null)
    }

    async onDeleteRow(control: Control) {
        this.remove();
        application.EventBus.dispatch(EVENT.ON_UPDATE_SECTIONS);
    }

    onMoveUp() {
        this.actionsBar.classList.add('hidden');
        this.dragStack.classList.add('hidden');
        this.background = {color: '#f2f2f2'};
    }
    onMoveDown() {
        this.actionsBar.classList.remove('hidden');
        this.dragStack.classList.remove('hidden');
        this.background = {color: 'initial'};
    }

    async render() {
        return (
            <i-panel class={'page-row'}  width="100%" height="100%">
                <i-vstack
                    id={'actionsBar'}
                    class="row-actions-bar"
                    verticalAlignment="center"
                >
                    <i-panel
                        background={{color: '#fff'}}
                        border={{radius: '20px'}}
                        maxWidth="100%"
                        maxHeight="100%"
                    >
                        <i-panel
                            id="btnSetting"
                            class="actions"
                            tooltip={{content: 'Section section', placement: 'right'}}
                            visible={this.isChanged}
                            onClick={this.onOpenRowSettingsDialog}
                        >
                            <i-icon name="palette"></i-icon>
                        </i-panel>
                        <i-panel
                            id="btnClone"
                            class="actions"
                            tooltip={{content: 'Duplicate section', placement: 'right'}}
                            visible={this.isCloned}
                            onClick={this.onClone}
                        >
                            <i-icon name="clone"></i-icon>
                        </i-panel>
                        <i-panel
                            id="btnDelete"
                            class="actions delete"
                            tooltip={{content: 'Delete section', placement: 'right'}}
                            onClick={this.onDeleteRow}
                        >
                            <i-icon name="trash"></i-icon>
                        </i-panel>
                    </i-panel>
                </i-vstack>
                <i-vstack
                    id="dragStack"
                    height="100%"
                    verticalAlignment="center"
                    position="absolute"
                    left={0} top={0}
                    class="drag-stack"
                >
                    <i-grid-layout
                        verticalAlignment="center"
                        autoFillInHoles={true}
                        columnsPerRow={2}
                        class="main-drag"
                    >
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                        <i-icon name="circle" width={3} height={3}></i-icon>
                    </i-grid-layout>
                </i-vstack>
                <i-panel width="100%" height="100%" maxWidth="100%" padding={{left: '3rem', right: '3rem'}}>
                    <i-grid-layout
                        id={'pnlElements'}
                        maxWidth="100%"
                        width="100%" height="100%"
                        gap={{column: 15}}
                        templateColumns={['repeat(12, 1fr)']}
                    ></i-grid-layout>
                </i-panel>
                <scpage-row-settings-dialog
                    id={'rowSettings'}
                    onSave={this.handleSectionSettingSave}
                ></scpage-row-settings-dialog>
            </i-panel>
        );
    }
}
