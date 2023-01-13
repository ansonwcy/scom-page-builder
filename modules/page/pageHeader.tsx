import {
    Module,
    customElements,
    ControlElement,
    Image,
    Styles,
    HStack,
    Panel
  } from '@ijstech/components';
  import './pageHeader.css';
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        ['ide-header']: PageHeaderElement;
      }
    }
  }
  
  const Theme = Styles.Theme.ThemeVars;
  
  export interface PageHeaderElement extends ControlElement {}
  
  @customElements('ide-header')
  export class PageHeader extends Module {
    private iconList: any[] = [];
    private toolbars: HStack;
    private publishDropdown: Panel;
  
    private imgLogo: Image;
    private _logo: string;
  
    constructor(parent?: any) {
      super(parent);
      this.initEventBus();
    }
  
    initEventBus() {}
  
    set logo(data: string) {
      this._logo = data;
      this.imgLogo.url = data;
    }
  
    get logo(): string {
      return this._logo;
    }
  
    hideLogo(hide?: boolean) {
      this.imgLogo.visible = !hide;
    }
  
    private renderIconList() {
      this.toolbars.clearInnerHTML();
      this.iconList.forEach((icon) => {
        this.toolbars.appendChild(
          <i-button
            padding={{left: '12px', right: '12px', top: '12px', bottom: '12px'}}
            width={48} height={48}
            border={{radius: '50%'}}
            caption={`<i-icon name="${icon.name}" width=${20} height=${20} fill="${Theme.text.primary}"></i-icon>`}
            background={{color: 'transparent'}}
            class="toolbar"
          ></i-button>
        );
      })
    }
  
    private renderDropdown() {
      this.publishDropdown.clearInnerHTML();
      const modalElm = (
        <i-modal
          maxWidth='200px'
          minWidth='200px'
          showBackdrop={false}
          height='auto'
          popupPlacement='bottomRight'
        >
          <i-vstack gap="0.5rem">
            <i-button
              caption="Publish settings"
              width='100%'
              height='auto'
              background={{color: 'transparent'}}
              border={{width: '0px'}}
              padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }}
            ></i-button>
          </i-vstack>
        </i-modal>
      )
      this.publishDropdown.append(
        <i-button
          caption="Publish"
          padding={{ top: 10, bottom: 10, left: '1rem', right: '1rem' }}
          background={{color: Theme.colors.primary.main}}
          font={{color: Theme.colors.primary.contrastText, weight: 600}}
          rightIcon={{name: 'caret-down', width: 14, height: 14, fill: Theme.colors.primary.contrastText}}
          onClick={() => modalElm.visible = !modalElm.visible}
        ></i-button>,
        modalElm
      )
    }
  
    async init() {
      super.init();
      this.iconList = [
        {
          name: 'undo',
          onClick: () => {}
        },
        {
          name: 'redo',
          onClick: () => {}
        },
        {
          name: 'tablet',
          onClick: () => {}
        },
        {
          name: 'link',
          onClick: () => {}
        },
        {
          name: 'user-plus',
          onClick: () => {}
        },
        {
          name: 'cog',
          onClick: () => {}
        },
        {
          name: 'ellipsis-v',
          onClick: () => {}
        }
      ];
      this.renderIconList();
      this.renderDropdown();
    }
  
    render() {
      return (
        <i-hstack
          height={64}
          justifyContent={'space-between'}
          verticalAlignment="center"
          alignItems={'center'}
          padding={{ left: 10, right: 10 }}
          class={'ide-header'}
        >
          <i-panel width={200}>
            <i-image id={'imgLogo'} height={40} width={'auto'}></i-image>
          </i-panel>
          <i-hstack class="page-menu-bar" gap="1rem" verticalAlignment="center">
            <i-hstack id="toolbars" gap="1rem" verticalAlignment="center"></i-hstack>
            <i-panel id="publishDropdown" position='relative'></i-panel>
          </i-hstack>
        </i-hstack>
      );
    }
  }
  