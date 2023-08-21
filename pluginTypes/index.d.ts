/// <amd-module name="@scom/scom-page-builder/assets.ts" />
declare module "@scom/scom-page-builder/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        icons: {
            logo: string;
            logoMobile: string;
            validocs: string;
        };
        img: {
            network: {
                bsc: string;
                eth: string;
                amio: string;
                avax: string;
                ftm: string;
                polygon: string;
            };
            wallet: {
                metamask: string;
                trustwallet: string;
                binanceChainWallet: string;
                walletconnect: string;
            };
            layout: {
                emptySection: string;
                title: string;
                titleWithText: string;
                titleWithButton: string;
                titleWithBulletPoint: string;
                titleWithTaskList: string;
                accentLeft: string;
                accentRight: string;
                twoImageColumn: string;
                threeImageColumn: string;
            };
        };
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-page-builder/const/textbox.ts" />
declare module "@scom/scom-page-builder/const/textbox.ts" {
    export const textStyles: {
        title: string;
    }[];
}
/// <amd-module name="@scom/scom-page-builder/const/index.ts" />
declare module "@scom/scom-page-builder/const/index.ts" {
    export const EVENT: {
        ON_LOAD: string;
        ON_SAVE: string;
        ON_CONFIG_SAVE: string;
        ON_CONFIG_CHANGE: string;
        ON_PAGING_UPDATE: string;
        ON_SWITCH_PAGE: string;
        ON_TOGGLE_PAGE_VISIBILITY: string;
        ON_UPDATE_SECTIONS: string;
        ON_HASH_CHANGE: string;
        ON_PREVIEW: string;
        ON_ADD_ELEMENT: string;
        ON_CLONE: string;
        ON_RESIZE: string;
        ON_UPDATE_FOOTER: string;
        ON_SHOW_BOTTOM_BLOCK: string;
        ON_UPDATE_TOOLBAR: string;
        ON_SET_ACTION_BLOCK: string;
        ON_SET_DRAG_ELEMENT: string;
        ON_SET_DRAG_TOOLBAR: string;
        ON_ADD_SECTION: string;
        ON_TOGGLE_SEARCH_MODAL: string;
        ON_FETCH_COMPONENTS: string;
        ON_UPDATE_SIDEBAR: string;
        ON_UPDATE_PAGE_BG: string;
        ON_CLOSE_BUILDER: string;
        ON_UPDATE_MENU: string;
        ON_UPDATE_PAGE_CONFIG: string;
        ON_SHOW_SECTION: string;
        ON_SELECT_SECTION: string;
    };
    export const DEFAULT_BOXED_LAYOUT_WIDTH = "1200px";
    export const DEFAULT_SCROLLBAR_WIDTH = 17;
    export const DEFAULT_SIDEBAR_MENU_WIDTH = 350;
    export const DEFAULT_FOOTER_HEIGHT = 50;
    export const IPFS_UPLOAD_END_POINT = "https://ipfs-gateway.scom.dev/api/1.0/sync/data";
    export const IPFS_GATEWAY_IJS = "https://ipfs.scom.dev/ipfs/";
    export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
    export * from "@scom/scom-page-builder/const/textbox.ts";
}
/// <amd-module name="@scom/scom-page-builder/utility/pathToRegexp.ts" />
declare module "@scom/scom-page-builder/utility/pathToRegexp.ts" {
    export interface ParseOptions {
        /**
         * Set the default delimiter for repeat parameters. (default: `'/'`)
         */
        delimiter?: string;
        /**
         * List of characters to automatically consider prefixes when parsing.
         */
        prefixes?: string;
    }
    /**
     * Parse a string for the raw tokens.
     */
    export function parse(str: string, options?: ParseOptions): Token[];
    export interface TokensToFunctionOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * Function for encoding input strings for output.
         */
        encode?: (value: string, token: Key) => string;
        /**
         * When `false` the function can produce an invalid (unmatched) path. (default: `true`)
         */
        validate?: boolean;
    }
    /**
     * Compile a string to a template function for the path.
     */
    export function compile<P extends object = object>(str: string, options?: ParseOptions & TokensToFunctionOptions): PathFunction<P>;
    export type PathFunction<P extends object = object> = (data?: P) => string;
    /**
     * Expose a method for transforming tokens into the path function.
     */
    export function tokensToFunction<P extends object = object>(tokens: Token[], options?: TokensToFunctionOptions): PathFunction<P>;
    export interface RegexpToFunctionOptions {
        /**
         * Function for decoding strings for params.
         */
        decode?: (value: string, token: Key) => string;
    }
    /**
     * A match result contains data about the path match.
     */
    export interface MatchResult<P extends object = object> {
        path: string;
        index: number;
        params: P;
    }
    /**
     * A match is either `false` (no match) or a match result.
     */
    export type Match<P extends object = object> = false | MatchResult<P>;
    /**
     * The match function takes a string and returns whether it matched the path.
     */
    export type MatchFunction<P extends object = object> = (path: string) => Match<P>;
    /**
     * Create path match function from `path-to-regexp` spec.
     */
    export function match<P extends object = object>(str: Path, options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Create a path match function from `path-to-regexp` output.
     */
    export function regexpToFunction<P extends object = object>(re: RegExp, keys: Key[], options?: RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Metadata about a key.
     */
    export interface Key {
        name: string | number;
        prefix: string;
        suffix: string;
        pattern: string;
        modifier: string;
    }
    /**
     * A token is a string (nothing special) or key metadata (capture group).
     */
    export type Token = string | Key;
    export interface TokensToRegexpOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * When `true` the regexp won't allow an optional trailing delimiter to match. (default: `false`)
         */
        strict?: boolean;
        /**
         * When `true` the regexp will match to the end of the string. (default: `true`)
         */
        end?: boolean;
        /**
         * When `true` the regexp will match from the beginning of the string. (default: `true`)
         */
        start?: boolean;
        /**
         * Sets the final character for non-ending optimistic matches. (default: `/`)
         */
        delimiter?: string;
        /**
         * List of characters that can also be "end" characters.
         */
        endsWith?: string;
        /**
         * Encode path tokens for use in the `RegExp`.
         */
        encode?: (value: string) => string;
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */
    export function tokensToRegexp(tokens: Token[], keys?: Key[], options?: TokensToRegexpOptions): RegExp;
    /**
     * Supported `path-to-regexp` input types.
     */
    export type Path = string | RegExp | Array<string | RegExp>;
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */
    export function pathToRegexp(path: Path, keys?: Key[], options?: TokensToRegexpOptions & ParseOptions): RegExp;
}
/// <amd-module name="@scom/scom-page-builder/utility/index.ts" />
declare module "@scom/scom-page-builder/utility/index.ts" {
    import { match, MatchFunction, compile } from "@scom/scom-page-builder/utility/pathToRegexp.ts";
    const assignAttr: (module: any) => void;
    const uploadToIPFS: (data: any) => Promise<string>;
    const formatNumber: (value: any, decimals?: number) => string;
    const formatNumberWithSeparators: (value: number, precision?: number) => string;
    const isCID: (cid: string) => boolean;
    const getCID: () => string;
    const getPagePath: (path?: string) => string;
    const updatePagePath: (pagePath: string) => void;
    const generateUUID: () => string;
    const isEmpty: (value: any) => boolean;
    const fetchScconfigByRootCid: (cid: string) => any;
    export { assignAttr, uploadToIPFS, match, MatchFunction, compile, formatNumber, formatNumberWithSeparators, isCID, getCID, getPagePath, updatePagePath, generateUUID, isEmpty, fetchScconfigByRootCid };
}
/// <amd-module name="@scom/scom-page-builder/interface/core.ts" />
declare module "@scom/scom-page-builder/interface/core.ts" {
    import { MatchFunction } from "@scom/scom-page-builder/utility/index.ts";
    import { Styles } from '@ijstech/components';
    export interface IMenu {
        caption: string;
        url: string;
        module: string;
        params?: any;
        env?: string;
        networks?: number[];
        isToExternal?: boolean;
        img?: string;
        isDisabled?: boolean;
        menus?: IMenu[];
        regex?: MatchFunction;
    }
    export interface ISCConfig {
        env: string;
        moduleDir?: string;
        modules: {
            [name: string]: {
                path: string;
                dependencies: string[];
            };
        };
        dependencies?: {
            [name: string]: string;
        };
        menus: IMenu[];
        routes: IRoute[];
        networks?: INetwork[] | "*";
        copyrightInfo: string;
        version?: string;
        wallet?: string[];
        themes?: ITheme;
        breakpoints?: IBreakpoints;
    }
    export interface INetwork {
        name?: string;
        chainId: number;
        img?: string;
        rpc?: string;
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
    export interface IRoute {
        url: string;
        module: string;
        default?: boolean;
        regex?: MatchFunction;
    }
    export interface ITheme {
        default: string;
        dark?: Styles.Theme.ITheme;
        light?: Styles.Theme.ITheme;
    }
    export interface IBreakpoints {
        mobile: number;
        tablet: number;
        desktop: number;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/pageBlock.ts" />
declare module "@scom/scom-page-builder/interface/pageBlock.ts" {
    import { IDataSchema, IUISchema } from "@ijstech/components";
    export interface IPageBlockData {
        name: string;
        path: string;
        category?: string;
        imgUrl?: string;
        description?: string;
        disableClicked?: boolean;
        shownBackdrop?: boolean;
    }
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name: string;
        icon: string;
        command: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema: IDataSchema;
        userInputUISchema: IUISchema;
        customControls?: any;
        customUI?: any;
        isReplacement?: boolean;
    }
    export interface IPageBlock {
        getActions: (category?: string) => IPageBlockAction[];
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/siteData.ts" />
declare module "@scom/scom-page-builder/interface/siteData.ts" {
    import { IPageBlockData } from "@scom/scom-page-builder/interface/pageBlock.ts";
    export interface IPageData {
        header: IPageHeader;
        sections: IPageSection[];
        footer: IPageFooter;
        config?: IPageConfig;
    }
    export interface IPageConfig {
        backgroundColor?: string;
        backgroundImage?: string;
        backdropColor?: string;
        textColor?: string;
        backdropImage?: string;
        sectionWidth?: number | string;
        plr?: number;
        ptb?: number;
        margin?: {
            x?: number | string;
            y?: number | string;
        };
    }
    export enum HeaderType {
        'COVER' = "cover",
        'LARGE' = "largeBanner",
        'NORMAL' = "banner",
        'TITLE' = "titleOnly"
    }
    export interface IPageHeader {
        headerType: HeaderType;
        image: string;
        elements: IPageElement[];
        config?: IPageSectionConfig;
    }
    export interface IPageSection {
        id: string;
        row: number;
        elements: IPageElement[];
        name?: string;
        config?: IPageSectionConfig;
    }
    export interface IPageFooter {
        image: string;
        elements: IPageElement[];
        config?: IPageSectionConfig;
    }
    export interface IPageElement {
        id: string;
        column: number;
        columnSpan: number;
        tag?: any;
        properties: any;
        module?: IPageBlockData;
        elements?: IPageElement[];
        visibleOn?: string;
        invisibleOn?: string;
    }
    export enum IColumnLayoutType {
        FIXED = "Fixed",
        AUTOMATIC = "Automatic"
    }
    export type AlignType = 'left' | 'center' | 'right';
    export interface IPageSectionConfig extends IPageConfig {
        align?: AlignType;
        image?: string;
        border?: boolean;
        borderColor?: string;
        fullWidth?: boolean;
        pb?: number;
        pl?: number;
        pr?: number;
        pt?: number;
    }
    export interface IOnFetchComponentsOptions {
        category?: string;
        pageNumber?: number;
        pageSize?: number;
        keyword?: string;
    }
    export interface IOnFetchComponentsResult {
        items?: IPageBlockData[];
        total?: number;
    }
    export interface ICategory {
        id: string;
        title: string;
        icon: string;
    }
    export interface IMenuItem {
        rowId: string;
        caption: string;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/jsonSchema.ts" />
declare module "@scom/scom-page-builder/interface/jsonSchema.ts" {
    export interface ValidationResult {
        valid: boolean;
        errors: ValidationError[];
    }
    export interface ValidationError {
        property: string;
        message: string;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/index.ts" />
declare module "@scom/scom-page-builder/interface/index.ts" {
    import { IMenu, INetwork, IRoute, ITheme, ISCConfig, IBreakpoints } from "@scom/scom-page-builder/interface/core.ts";
    import { IPageBlockData } from "@scom/scom-page-builder/interface/pageBlock.ts";
    import { IPageElement } from "@scom/scom-page-builder/interface/siteData.ts";
    export { IMenu, INetwork, IRoute, ITheme, ISCConfig, IBreakpoints };
    export * from "@scom/scom-page-builder/interface/pageBlock.ts";
    export * from "@scom/scom-page-builder/interface/siteData.ts";
    export * from "@scom/scom-page-builder/interface/jsonSchema.ts";
    export enum ELEMENT_NAME {
        TEXTBOX = "Text Box",
        IMAGE = "Image",
        NFT = "NFT Minter Dapp",
        GEM_TOKEN = "Gem Token Dapp",
        RANDOMIZER = "Randomizer",
        VIDEO = "Video",
        CAROUSEL = "Carousel",
        MAP = "Map",
        BANNER = "Banner",
        BLOG = "Blog",
        CONTENT_BLOCK = "Content Block"
    }
    export interface IElementConfig {
        module: IPageBlockData;
        prependId?: string;
        appendId?: string;
        defaultElements?: IPageElement[];
    }
    export const TEXTBOX_PATH = "scom-markdown-editor";
    export const IMAGE_PATH = "scom-image";
    export const GAP_WIDTH = 15;
    export const MAX_COLUMN = 12;
    export const MIN_COLUMN = 2;
    export const INIT_COLUMN_SPAN = 6;
    export const PAGE_SIZE = 6;
    export type ThemeType = 'dark' | 'light';
}
/// <amd-module name="@scom/scom-page-builder/store/index.ts" />
declare module "@scom/scom-page-builder/store/index.ts" {
    import { IPageHeader, IPageSection, IPageFooter, IPageElement, IPageBlockData, IElementConfig, IOnFetchComponentsResult, IOnFetchComponentsOptions, ICategory, ThemeType, IPageConfig } from "@scom/scom-page-builder/interface/index.ts";
    export class PageObject {
        private _header;
        private _sections;
        private _footer;
        private _config;
        set header(value: IPageHeader);
        get header(): IPageHeader;
        set sections(value: IPageSection[]);
        get sections(): IPageSection[];
        set footer(value: IPageFooter);
        get footer(): IPageFooter;
        set config(value: IPageConfig);
        get config(): IPageConfig;
        getNonNullSections(): IPageSection[];
        addSection(value: IPageSection, index?: number): void;
        removeSection(id: string): void;
        getSection(id: string): IPageSection;
        updateSection(id: string, data: any): void;
        getRow(rowId: string): IPageSection | IPageFooter;
        removeRow(id: string): void;
        addRow(data: any, id?: string, index?: number): void;
        setRow(data: any, rowId: string): void;
        private findElement;
        getElement(sectionId: string, elementId: string, getLeafOnly?: boolean): any;
        setElement(sectionId: string, elementId: string, value: any): void;
        private sortFn;
        private removeElementFn;
        removeElement(sectionId: string, elementId: string, removeLeafOnly?: boolean): void;
        addElement(sectionId: string, value: IPageElement, parentElmId?: string, elementIndex?: number): void;
        getRowConfig(sectionId: string): import("@scom/scom-page-builder/interface/siteData.ts").IPageSectionConfig;
        getColumnsNumber(sectionId: string): number;
    }
    export const pageObject: PageObject;
    export const state: {
        pageBlocks: any[];
        rootDir: string;
        dragData: any;
        searchData: IOnFetchComponentsResult;
        searchOptions: IOnFetchComponentsOptions;
        categories: ICategory[];
        theme: ThemeType;
        defaultPageConfig: any;
    };
    export const setPageBlocks: (value: IPageBlockData[]) => void;
    export const getPageBlocks: () => any[];
    export const addPageBlock: (value: IPageBlockData) => void;
    export const setRootDir: (value: string) => void;
    export const getRootDir: () => string;
    export const setDragData: (value: IElementConfig | null) => void;
    export const getDragData: () => any;
    export const setSearchData: (value: IOnFetchComponentsResult) => void;
    export const getSearchData: () => IOnFetchComponentsResult;
    export const setSearchOptions: (value: IOnFetchComponentsOptions) => void;
    export const getSearchOptions: () => IOnFetchComponentsOptions | {
        category: any;
        pageNumber: any;
        pageSize: any;
    };
    export const getCategories: () => ICategory[];
    export const setCategories: (value: ICategory[]) => void;
    export const setTheme: (value: ThemeType) => void;
    export const getTheme: () => ThemeType;
    export const getBackgroundColor: (theme?: ThemeType) => string;
    export const getFontColor: (theme?: ThemeType) => string;
    export const getDivider: (theme?: ThemeType) => string;
    export const setDefaultPageConfig: (value: IPageConfig) => void;
    export const getDefaultPageConfig: () => IPageConfig;
    export const getPageConfig: () => {
        backgroundColor?: string;
        backgroundImage?: string;
        backdropColor?: string;
        textColor?: string;
        backdropImage?: string;
        sectionWidth?: string | number;
        plr?: number;
        ptb?: number;
        margin?: {
            x?: string | number;
            y?: string | number;
        };
    };
    export const getMargin: (margin: {
        x?: number | string;
        y?: number | string;
    }) => {
        top: string | number;
        left: string | number;
        right: string | number;
        bottom: string | number;
    };
}
/// <amd-module name="@scom/scom-page-builder/command/interface.ts" />
declare module "@scom/scom-page-builder/command/interface.ts" {
    export interface ICommand {
        execute(): any;
        undo(): void;
        redo(): void;
    }
    export interface IDataColumn {
        column: number;
        columnSpan: number;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/updateRow.ts" />
declare module "@scom/scom-page-builder/command/updateRow.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class UpdateRowCommand implements ICommand {
        private element;
        private parent;
        private data;
        private rowId;
        private isDeleted;
        private prependId;
        private appendId;
        constructor(element: Control, parent: any, data: any, isDeleted?: boolean, prependId?: string, appendId?: string);
        private addEventBus;
        private removeEventBus;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/updateRowSettings.ts" />
declare module "@scom/scom-page-builder/command/updateRowSettings.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    import { IPageSectionConfig } from "@scom/scom-page-builder/interface/index.ts";
    export class UpdateRowSettingsCommand implements ICommand {
        private element;
        private settings;
        private oldSettings;
        constructor(element: Control, settings: IPageSectionConfig);
        private getChangedValues;
        private updateConfig;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/history.ts" />
declare module "@scom/scom-page-builder/command/history.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class CommandHistory {
        private commands;
        private currentCommandIndex;
        get commandIndex(): number;
        execute(command: ICommand): Promise<void>;
        undo(): void;
        redo(): void;
        reset(): void;
    }
    export const commandHistory: CommandHistory;
}
/// <amd-module name="@scom/scom-page-builder/command/moveRow.ts" />
declare module "@scom/scom-page-builder/command/moveRow.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class MoveElementCommand implements ICommand {
        private element;
        private dropElm;
        private parent;
        private dataList;
        private dragIndex;
        private dropIndex;
        constructor(element: HTMLElement, dropElm: HTMLElement, parent: HTMLElement, data?: any[]);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/resize.ts" />
declare module "@scom/scom-page-builder/command/resize.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class ResizeElementCommand implements ICommand {
        private parent;
        private element;
        private toolbar;
        private initialHeight;
        private finalWidth;
        private finalHeight;
        private oldDataColumn;
        private gapWidth;
        private gridColumnWidth;
        private finalLeft;
        private get maxColumn();
        constructor(element: any, toolbar: any, initialWidth: number, initialHeight: number, finalWidth: number, finalHeight: number);
        private getColumnData;
        private updateElement;
        private updateToolbars;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/columnUtils.ts" />
declare module "@scom/scom-page-builder/command/columnUtils.ts" {
    import { Control } from "@ijstech/components";
    const updateColumnData: (el: Control, rowId: string, column: number, columnSpan: number) => void;
    const getColumn: (el: Control) => number;
    const getColumnSpan: (el: Control) => number;
    const getNextColumn: (el: Control) => number;
    const getPrevColumn: (el: Control) => number;
    const getDropColumnData: (dropElm: Control, sortedSections: HTMLElement[], element?: Control) => {
        column: number;
        columnSpan: number;
    };
    const getAppendColumnData: (grid: Control, dropElm: Control, sortedSections: HTMLElement[], updateData: any, element?: Control, isAppend?: boolean) => {
        column: number;
        columnSpan: number;
    };
    export { updateColumnData, getColumn, getColumnSpan, getNextColumn, getPrevColumn, getDropColumnData, getAppendColumnData };
}
/// <amd-module name="@scom/scom-page-builder/command/dragElement.ts" />
declare module "@scom/scom-page-builder/command/dragElement.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    import { Control } from "@ijstech/components";
    export class DragElementCommand implements ICommand {
        private parent;
        private element;
        private dropElm;
        private dropRow;
        private dropGrid;
        private oldDataColumn;
        private data;
        private oldDataColumnMap;
        private isAppend;
        private isNew;
        constructor(element: any, dropElm: Control, isAppend?: boolean, isNew?: boolean);
        private updateData;
        private getColumnData;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/removeToolbar.ts" />
declare module "@scom/scom-page-builder/command/removeToolbar.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class RemoveToolbarCommand implements ICommand {
        private element;
        private pageRow;
        private data;
        private rowId;
        private elementId;
        private sectionId;
        private elementIndex;
        constructor(element: any);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/groupElement.ts" />
declare module "@scom/scom-page-builder/command/groupElement.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    import { Control } from "@ijstech/components";
    import { IElementConfig } from "@scom/scom-page-builder/interface/index.ts";
    export class GroupElementCommand implements ICommand {
        private element;
        private elementParent;
        private dropParent;
        private data;
        private oldDropData;
        private config;
        private dropSectionId;
        private dropElementIndex;
        private isNew;
        private isAppend;
        constructor(dropElm: Control, element?: any, config?: IElementConfig, isAppend?: boolean);
        private getElements;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/type.ts" />
declare module "@scom/scom-page-builder/command/type.ts" {
    export type IMergeType = "front" | "back" | "top" | "bottom" | "none";
}
/// <amd-module name="@scom/scom-page-builder/utility/ungroup.ts" />
declare module "@scom/scom-page-builder/utility/ungroup.ts" {
    export const getUngroupData: (dropRow: any, nearestDropSection: any, dragSection: any, isFront: boolean, data: any) => {
        newElmdata: any;
        newRowData: any;
    };
    export const findNearestSection: (parent: any, point: number) => {
        isFront: boolean;
        element: any;
    };
}
/// <amd-module name="@scom/scom-page-builder/command/ungroupElement.ts" />
declare module "@scom/scom-page-builder/command/ungroupElement.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    import { Control } from "@ijstech/components";
    import { IMergeType } from "@scom/scom-page-builder/command/type.ts";
    export class UngroupElementCommand implements ICommand {
        private dragToolbarId;
        private dragSectionId;
        private dragRowId;
        private oriDragRowData;
        private dropElm;
        private dropSectionId;
        private dropRowId;
        private oriDropRowData;
        private data;
        private appendElm;
        private config;
        private mergeType;
        private clientX;
        constructor(dragToolbar: Control, dragSection: Control, dropElm: Control, config: any, mergeType: IMergeType, clientX?: number);
        execute(): Promise<void>;
        moveSection(dropRow: any, dragRow: any, nearestDropSection: any, dragSection: any, isFront: boolean): Promise<void>;
        undo(): Promise<void>;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/addElement.ts" />
declare module "@scom/scom-page-builder/command/addElement.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class AddElementCommand implements ICommand {
        private element;
        private parent;
        private dropElm;
        private data;
        private isAppend;
        private isNew;
        private oldDataColumnMap;
        constructor(data: any, isAppend?: boolean, isNew?: boolean, dropElm?: Control, parent?: any);
        private updateData;
        private getColumnData;
        execute(): Promise<void>;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/replaceElement.ts" />
declare module "@scom/scom-page-builder/command/replaceElement.ts" {
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    export class ReplaceElementCommand implements ICommand {
        private element;
        private pageRow;
        private oldReplaceData;
        private currentReplaceData;
        private data;
        constructor(element: any);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/updatePageSetting.ts" />
declare module "@scom/scom-page-builder/command/updatePageSetting.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/command/interface.ts";
    import { IPageConfig } from "@scom/scom-page-builder/interface/index.ts";
    export class UpdatePageSettingsCommand implements ICommand {
        private element;
        private settings;
        private oldSettings;
        private rowsConfig;
        constructor(element: Control, settings: IPageConfig);
        private getChangedValues;
        private updateConfig;
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/command/index.ts" />
declare module "@scom/scom-page-builder/command/index.ts" {
    export { UpdateRowCommand } from "@scom/scom-page-builder/command/updateRow.ts";
    export { UpdateRowSettingsCommand } from "@scom/scom-page-builder/command/updateRowSettings.ts";
    export { CommandHistory, commandHistory } from "@scom/scom-page-builder/command/history.ts";
    export { MoveElementCommand } from "@scom/scom-page-builder/command/moveRow.ts";
    export { ResizeElementCommand } from "@scom/scom-page-builder/command/resize.ts";
    export { DragElementCommand } from "@scom/scom-page-builder/command/dragElement.ts";
    export { RemoveToolbarCommand } from "@scom/scom-page-builder/command/removeToolbar.ts";
    export { GroupElementCommand } from "@scom/scom-page-builder/command/groupElement.ts";
    export { UngroupElementCommand } from "@scom/scom-page-builder/command/ungroupElement.ts";
    export { AddElementCommand } from "@scom/scom-page-builder/command/addElement.ts";
    export { ReplaceElementCommand } from "@scom/scom-page-builder/command/replaceElement.ts";
    export { ICommand, IDataColumn } from "@scom/scom-page-builder/command/interface.ts";
    export { UpdatePageSettingsCommand } from "@scom/scom-page-builder/command/updatePageSetting.ts";
    export { IMergeType } from "@scom/scom-page-builder/command/type.ts";
}
/// <amd-module name="@scom/scom-page-builder/theme/light.theme.ts" />
declare module "@scom/scom-page-builder/theme/light.theme.ts" {
    import { Styles } from '@ijstech/components';
    const Theme: Styles.Theme.ITheme;
    export default Theme;
}
/// <amd-module name="@scom/scom-page-builder/theme/dark.theme.ts" />
declare module "@scom/scom-page-builder/theme/dark.theme.ts" {
    import { Styles } from '@ijstech/components';
    const Theme: Styles.Theme.ITheme;
    export default Theme;
}
/// <amd-module name="@scom/scom-page-builder/theme/index.ts" />
declare module "@scom/scom-page-builder/theme/index.ts" {
    import { Styles } from '@ijstech/components';
    import LightTheme from "@scom/scom-page-builder/theme/light.theme.ts";
    import DarkTheme from "@scom/scom-page-builder/theme/dark.theme.ts";
    const currentTheme: Styles.Theme.ITheme;
    export { currentTheme, LightTheme, DarkTheme };
}
/// <amd-module name="@scom/scom-page-builder/page/pageHeader.css.ts" />
declare module "@scom/scom-page-builder/page/pageHeader.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/confirmDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/confirmDialog.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    export interface ConfirmDialogElement extends ControlElement {
        message: string;
        cancelButtonText?: string;
        confirmButtonText?: string;
        showCancelButton?: boolean;
        showConfirmButton?: boolean;
        onCancel?: () => Promise<void>;
        onConfirm?: () => Promise<void>;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["scpage-confirm-dialog"]: ConfirmDialogElement;
            }
        }
    }
    export class ConfirmDialog extends Module {
        message: string;
        cancelButtonText: string;
        confirmButtonText: string;
        showCancelButton: boolean;
        showConfirmButton: boolean;
        onCancel: () => Promise<void>;
        onConfirm: () => Promise<void>;
        private dialog;
        private lbMessage;
        private btnCancel;
        private btnConfirm;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        confirm(): Promise<void>;
        cancel(): Promise<void>;
        show(): void;
        hide(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/loadingDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/loadingDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/loadingDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/loadingDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/loadingDialog.css.ts";
    export interface LoadingDialogElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-loading-dialog']: LoadingDialogElement;
            }
        }
    }
    export class LoadingDialog extends Module {
        private lbMessage;
        private mdLoading;
        constructor(parent?: any, options?: any);
        init(): Promise<void>;
        show(): void;
        hide(): void;
        updateMessage(message: string): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/searchComponentsDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/searchComponentsDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/searchComponentsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/searchComponentsDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/searchComponentsDialog.css.ts";
    export interface SearchComponentsDialogElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-search-components-dialog']: SearchComponentsDialogElement;
            }
        }
    }
    export class SearchComponentsDialog extends Module {
        private mdSearch;
        private paginationElm;
        private pnlComponents;
        private inputSearch;
        private timer;
        private totalPage;
        private pageNumber;
        init(): void;
        private get components();
        private get total();
        hide(): void;
        show(): void;
        private onSelectIndex;
        private resetPaging;
        renderUI: () => void;
        private onSearch;
        private onFetchData;
        private onSelected;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts";
    import { IPageSectionConfig } from "@scom/scom-page-builder/interface/index.ts";
    export interface RowSettingsDialogElement extends ControlElement {
        onSave: (data: IPageSectionConfig) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-row-settings-dialog']: RowSettingsDialogElement;
            }
        }
    }
    export class RowSettingsDialog extends Module {
        private dialog;
        private formElm;
        private onSave;
        private rowId;
        constructor(parent?: any, options?: any);
        get data(): any;
        init(): void;
        show(id: string): void;
        private getSchema;
        private renderForm;
        close(): void;
        reset(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/pageSettingsDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/pageSettingsDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/pageSettingsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/pageSettingsDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/pageSettingsDialog.css.ts";
    import { IPageConfig } from "@scom/scom-page-builder/interface/index.ts";
    export interface PageSettingsDialogElement extends ControlElement {
        onSave: (data: IPageConfig) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-page-settings-dialog']: PageSettingsDialogElement;
            }
        }
    }
    export class PageSettingsDialog extends Module {
        private settingsDialog;
        private formElm;
        private onSave;
        constructor(parent?: any, options?: any);
        init(): void;
        show(): void;
        private getSchema;
        private renderForm;
        close(): void;
        reset(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/index.ts" />
declare module "@scom/scom-page-builder/dialogs/index.ts" {
    import { ConfirmDialog } from "@scom/scom-page-builder/dialogs/confirmDialog.tsx";
    import { LoadingDialog } from "@scom/scom-page-builder/dialogs/loadingDialog.tsx";
    import { SearchComponentsDialog } from "@scom/scom-page-builder/dialogs/searchComponentsDialog.tsx";
    import { RowSettingsDialog } from "@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx";
    import { PageSettingsDialog } from "@scom/scom-page-builder/dialogs/pageSettingsDialog.tsx";
    export { ConfirmDialog, LoadingDialog, RowSettingsDialog, SearchComponentsDialog, PageSettingsDialog };
}
/// <amd-module name="@scom/scom-page-builder/page/pageHeader.tsx" />
declare module "@scom/scom-page-builder/page/pageHeader.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageHeader.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-header']: PageHeaderElement;
            }
        }
    }
    export interface PageHeaderElement extends ControlElement {
    }
    export class PageHeader extends Module {
        private iconList;
        private toolbars;
        private mdPageSettings;
        private imgLogo;
        private _logo;
        constructor(parent?: any);
        initEventBus(): void;
        set logo(data: string);
        get logo(): string;
        hideLogo(hide?: boolean): void;
        private onSavePageSettings;
        private renderIconList;
        private renderDropdown;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageSection.css.ts" />
declare module "@scom/scom-page-builder/page/pageSection.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/common/toolbar.css.ts" />
declare module "@scom/scom-page-builder/common/toolbar.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageRow.css.ts" />
declare module "@scom/scom-page-builder/page/pageRow.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/utility/type.ts" />
declare module "@scom/scom-page-builder/utility/type.ts" {
    export type IMergeDropSide = "front" | "back" | "top" | "bottom";
    export type DragDropResultDetails = {
        row?: HTMLElement;
        section?: HTMLElement;
        toolbar?: HTMLElement;
        dropSide?: IMergeDropSide;
        rowBlock?: HTMLElement;
        column?: number;
        columnSpan?: number;
        isMouseOn?: boolean;
    };
    export type DragDropResult = {
        canDrop: boolean;
        details?: DragDropResultDetails;
    };
    export interface checkDragDropResultParams {
        dropTarget: HTMLElement;
        dragSection: HTMLElement;
        dragToolbar: HTMLElement;
        clientX: number;
        clientY: number;
        startX: number;
        isUngroup: boolean;
    }
}
/// <amd-module name="@scom/scom-page-builder/utility/dragDrop.ts" />
declare module "@scom/scom-page-builder/utility/dragDrop.ts" {
    import { DragDropResult, checkDragDropResultParams } from "@scom/scom-page-builder/utility/type.ts";
    export function checkDragDropResult(dragDrop: checkDragDropResultParams): DragDropResult;
}
/// <amd-module name="@scom/scom-page-builder/page/pageRow.tsx" />
declare module "@scom/scom-page-builder/page/pageRow.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { PageSection } from "@scom/scom-page-builder/page/pageSection.tsx";
    import "@scom/scom-page-builder/page/pageRow.css.ts";
    import { IPageElement, IPageSection, IPageSectionConfig } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-row']: PageRowElement;
            }
        }
    }
    export interface PageRowElement extends ControlElement {
        readonly?: boolean;
    }
    export class PageRow extends Module {
        private actionsBar;
        private dragStack;
        private pnlRowContainer;
        private pnlRowWrap;
        private pnlRow;
        private mdRowSetting;
        private pnlEmty;
        private pnlLoading;
        private _readonly;
        private isResizing;
        private currentWidth;
        private currentHeight;
        private currentElement;
        private currentToolbar;
        private rowId;
        private rowData;
        private isDragging;
        private _gridColumnWidth;
        private _selectedSection;
        private isCloned;
        private isChanged;
        constructor(parent?: any);
        get data(): any;
        get selectedElement(): PageSection;
        get maxColumn(): number;
        private get align();
        get gridColumnWidth(): number;
        init(): void;
        toggleUI(value: boolean): void;
        private createNewElement;
        private createElementFn;
        addElement(data: IPageElement): Promise<PageSection>;
        private clearData;
        setData(rowData: IPageSection): Promise<void>;
        updateRowConfig(config: IPageSectionConfig): void;
        private onOpenRowSettingsDialog;
        private onSaveRowSettings;
        updateColumn(): void;
        private updateGrid;
        private updateAlign;
        private updateGridColumnWidth;
        private onClone;
        onDeleteRow(): void;
        onMoveUp(): void;
        onMoveDown(): void;
        private renderFixedGrid;
        private updateFixedGrid;
        private updateGridColumn;
        private initEventListeners;
        onPrependRow(pageRow: PageRow): Promise<void>;
        onAppendRow(pageRow: PageRow): Promise<void>;
        onAddRow(): Promise<void>;
        private isUngrouping;
        private initEventBus;
        private getNewElementData;
        private addDottedLines;
        private removeDottedLines;
        private setActive;
        private onAddSection;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/common/toolbar.tsx" />
declare module "@scom/scom-page-builder/common/toolbar.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageBlockData, IPageElement, ThemeType } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/common/toolbar.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-toolbar']: ToolbarElement;
            }
        }
    }
    export interface ToolbarElement extends ControlElement {
        readonly?: boolean;
    }
    export class IDEToolbar extends Module {
        private _toolList;
        private _readonly;
        private currentAction;
        private contentStack;
        private toolsStack;
        private toolbar;
        private _eResizer;
        private _wResizer;
        private _nResizer;
        private _neResizer;
        private _nwResizer;
        private _component;
        private dragStack;
        private pnlForm;
        private pnlFormMsg;
        private mdActions;
        private backdropStack;
        private form;
        private pnlLoading;
        private mainWrapper;
        private _rowId;
        private _elementId;
        private _currentSingleContentBlockId;
        private _currentReplaceData;
        private events;
        constructor(parent?: any);
        get data(): any;
        get currentReplaceData(): IPageElement;
        get module(): any;
        get toolList(): any[];
        set toolList(value: any[]);
        get rowId(): string;
        set rowId(value: string);
        get elementId(): string;
        set elementId(value: string);
        get readonly(): boolean;
        set readonly(value: boolean);
        private adjustCursorByAction;
        private renderToolbars;
        private onShowModal;
        private onCloseModal;
        private renderToolbarAction;
        private onSave;
        private isTexbox;
        private isContentBlock;
        showToolbars(): void;
        hideToolbars(): void;
        private getActions;
        updateToolbar(): void;
        private renderResizeStack;
        private renderResizer;
        fetchModule(data: IPageElement): Promise<void>;
        private setModule;
        private showToolList;
        setData(properties: any, module?: IPageBlockData): Promise<void>;
        setTag(tag: any, init?: boolean): Promise<void>;
        setProperties(data: any): Promise<void>;
        setTheme(value: ThemeType): void;
        private checkToolbar;
        _handleClick(event: MouseEvent): boolean;
        clearComponent(): void;
        updateComponent(data?: any): void;
        private replaceComponent;
        private initEventListener;
        private initEventBus;
        updateUI(data: {
            backgroundColor?: string;
            textColor?: string;
        }): Promise<void>;
        onShow(options?: any): void;
        onHide(): void;
        private unRegisterEvents;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/common/collapse.css.ts" />
declare module "@scom/scom-page-builder/common/collapse.css.ts" {
    export const collapseStyle: string;
}
/// <amd-module name="@scom/scom-page-builder/common/collapse.tsx" />
declare module "@scom/scom-page-builder/common/collapse.tsx" {
    import { Container, ControlElement, Module } from "@ijstech/components";
    export interface CollapseElement extends ControlElement {
        title?: string;
        item?: Container;
        expanded?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-builder-collapse']: CollapseElement;
            }
        }
    }
    export class Collapse extends Module {
        private lblTitle;
        private iconCollapse;
        private pnlContent;
        private _expanded;
        private requestID;
        private _speed;
        constructor(parent?: Container, options?: any);
        get title(): string;
        set title(value: string);
        get item(): Container;
        set item(target: Container);
        get expanded(): boolean;
        set expanded(value: boolean);
        init(): void;
        private handleCollapse;
        onCollapse(): void;
        onShowSearch(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/common/index.ts" />
declare module "@scom/scom-page-builder/common/index.ts" {
    import { IDEToolbar } from "@scom/scom-page-builder/common/toolbar.tsx";
    import { Collapse } from "@scom/scom-page-builder/common/collapse.tsx";
    export { IDEToolbar, Collapse, };
}
/// <amd-module name="@scom/scom-page-builder/page/pageSection.tsx" />
declare module "@scom/scom-page-builder/page/pageSection.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageSection.css.ts";
    import { IPageElement } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-section']: PageSectionElement;
            }
        }
    }
    export interface PageSectionElement extends ControlElement {
        readonly?: boolean;
        containerSize?: {
            width?: string;
            height?: string;
        };
    }
    export class PageSection extends Module {
        private pnlMain;
        private pageElementMap;
        private observerOptions;
        private observer;
        private _readonly;
        private rowId;
        constructor(parent?: Container, options?: any);
        get readonly(): boolean;
        set readonly(value: boolean);
        get data(): any;
        init(): void;
        clear(): void;
        private createToolbar;
        private clearData;
        setData(rowId: string, value: IPageElement): Promise<void>;
        onHide(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageFooter.css.ts" />
declare module "@scom/scom-page-builder/page/pageFooter.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageFooter.tsx" />
declare module "@scom/scom-page-builder/page/pageFooter.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageFooter.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-page-footer']: PageFooterElement;
            }
        }
    }
    export interface PageFooterElement extends ControlElement {
    }
    export class PageFooter extends Module {
        private _footer;
        private _sticky;
        private lbFooter;
        constructor(parent?: any);
        init(): Promise<void>;
        get footer(): string;
        set footer(value: string);
        get sticky(): boolean;
        set sticky(value: boolean);
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageRows.css.ts" />
declare module "@scom/scom-page-builder/page/pageRows.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageRows.tsx" />
declare module "@scom/scom-page-builder/page/pageRows.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageSection } from "@scom/scom-page-builder/interface/index.ts";
    import { PageSection } from "@scom/scom-page-builder/page/pageSection.tsx";
    import { PageRow } from "@scom/scom-page-builder/page/pageRow.tsx";
    import { PageFooter } from "@scom/scom-page-builder/page/pageFooter.tsx";
    import "@scom/scom-page-builder/page/pageRows.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-rows']: PageRowsElement;
            }
        }
    }
    export interface PageRowsElement extends ControlElement {
        readonly?: boolean;
        draggable?: boolean;
    }
    export class PageRows extends Module {
        private pnlRows;
        private pageFooter;
        private currentRow;
        private enteredRow;
        private pnlRowOverlay;
        private currentPosition;
        private _readonly;
        private _draggable;
        private isDragging;
        constructor(parent?: any);
        initEventBus(): void;
        _handleClick(event: MouseEvent): boolean;
        init(): void;
        get draggable(): boolean;
        set draggable(value: boolean);
        private handleDrag;
        private initDragEvent;
        private mouseDownHandler;
        private mouseUpHandler;
        private mouseMoveHandler;
        private getDropzoneCenterPoints;
        private resetCurrentRow;
        private updateCurrentRow;
        getRows(): IPageSection[];
        setRows(rows: IPageSection[]): Promise<void>;
        renderRows(): Promise<void>;
        appendRow(rowData: IPageSection, prependId?: string): Promise<PageRow>;
        onClone(data: {
            rowData: IPageSection;
            id: string;
        }): Promise<void>;
        private onCreateSection;
        clearRows(): void;
        set footerVisible(value: boolean);
        set footerSticky(value: boolean);
        set footerCopyright(value: string);
        render(): any;
    }
    export { PageSection, PageFooter };
}
/// <amd-module name="@scom/scom-page-builder/page/pageSidebar.css.ts" />
declare module "@scom/scom-page-builder/page/pageSidebar.css.ts" {
    export const categoryPanelStyle: string;
    export const categoryButtonStyle: string;
    export const widgetModalStyle: string;
    export const widgetStyle: string;
}
/// <amd-module name="@scom/scom-page-builder/utility/layouts.json.ts" />
declare module "@scom/scom-page-builder/utility/layouts.json.ts" {
    export const layouts: {
        oneWidget: {
            emptySection: any;
            title: any;
            titleWithText: any;
            titleWithBulletPoint: any;
            titleWithTaskList: any;
        };
        twoWidgets: {
            accentLeft: any;
            accentRight: any;
            twoImageColumn: any;
        };
        multipleWidgets: {
            threeImageColumn: any;
        };
    };
}
/// <amd-module name="@scom/scom-page-builder/page/pageMenu.css.ts" />
declare module "@scom/scom-page-builder/page/pageMenu.css.ts" {
    export const menuBtnStyle: string;
    export const menuCardStyle: string;
    export const menuStyle: string;
}
/// <amd-module name="@scom/scom-page-builder/page/pageMenu.tsx" />
declare module "@scom/scom-page-builder/page/pageMenu.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-builder-menu']: ControlElement;
            }
        }
    }
    export class PageMenu extends Module {
        private pnlMenu;
        private draggingSectionId;
        private isEditing;
        private focusRowId;
        init(): void;
        private initEventBus;
        private initEventListener;
        private initMenuCardEventListener;
        private setfocusCard;
        private getActiveDropLineIdx;
        private showDropBox;
        private reorderSection;
        private setActiveDropLine;
        private renderMenu;
        private setCardTitle;
        private onClickRenameBtn;
        private onClickConfirmBtn;
        private onClickCancelBtn;
        private toggleRenameBtn;
        private toggleEditor;
        private goToSection;
        private getTitle;
        private getTitleFn;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageSidebar.tsx" />
declare module "@scom/scom-page-builder/page/pageSidebar.tsx" {
    import { ControlElement, Module, Control } from '@ijstech/components';
    import { ICategory } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-builder-sidebar']: ControlElement;
            }
        }
    }
    export class PageSidebar extends Module {
        private toolbars;
        private pnlWidgetCategory;
        private mdWidget;
        private pnlWidgets;
        private mdPageSettings;
        private get pageBlocks();
        init(): void;
        renderToolbar(): void;
        renderWidgetCategories(): void;
        convertCamelCaseToString(input: string): string;
        renderMenu(): void;
        renderWidgets(category: ICategory): void;
        getLayoutIcon(layoutName: string): string;
        openWidgetModal(target: Control, category: ICategory): void;
        openMenuModal(target: Control): void;
        private initDrag;
        getDefaultElements(layoutCat: string, layout: string): any;
        setUUID(data: any): any;
        setUUIDFn(data: any): any;
        private pnlWidgetsDragStartEvent;
        private onSavePageSettings;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/index.ts" />
declare module "@scom/scom-page-builder/page/index.ts" {
    import { PageHeader } from "@scom/scom-page-builder/page/pageHeader.tsx";
    import { PageSection } from "@scom/scom-page-builder/page/pageSection.tsx";
    import { PageFooter } from "@scom/scom-page-builder/page/pageFooter.tsx";
    import { PageRows } from "@scom/scom-page-builder/page/pageRows.tsx";
    import { PageRow } from "@scom/scom-page-builder/page/pageRow.tsx";
    import { PageSidebar } from "@scom/scom-page-builder/page/pageSidebar.tsx";
    import { PageMenu } from "@scom/scom-page-builder/page/pageMenu.tsx";
    export { PageHeader, PageSection, PageFooter, PageRows, PageRow, PageSidebar, PageMenu };
}
/// <amd-module name="@scom/scom-page-builder/builder/builderHeader.css.ts" />
declare module "@scom/scom-page-builder/builder/builderHeader.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/builder/builderHeader.tsx" />
declare module "@scom/scom-page-builder/builder/builderHeader.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageHeader } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/builder/builderHeader.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['builder-header']: HeaderElement;
            }
        }
    }
    export interface HeaderElement extends ControlElement {
        readonly?: boolean;
    }
    export class BuilderHeader extends Module {
        private pnlHeader;
        private pnlHeaderMain;
        private pnlTitle;
        private pnlConfig;
        private pnlHeaderType;
        private pnlHeaderTypeMain;
        private btnAddLogo;
        private pnlLogo;
        private mdUpload;
        private uploader;
        private nameInput;
        private btnChangeImg;
        private _readonly;
        private _isUpdatingBg;
        private showAddStack;
        constructor(parent?: any);
        initEventBus(): void;
        setData(value: IPageHeader): Promise<void>;
        private get _elements();
        private get _image();
        private get _headerType();
        private updateHeader;
        private addHeader;
        private onShowUpload;
        private onChangedBg;
        private onToggleType;
        private onUpdateImage;
        private onActiveType;
        private updateHeaderType;
        private renderHeaderType;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/builder/builderFooter.css.ts" />
declare module "@scom/scom-page-builder/builder/builderFooter.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/builder/builderFooter.tsx" />
declare module "@scom/scom-page-builder/builder/builderFooter.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageFooter } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/builder/builderFooter.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['builder-footer']: FooterElement;
            }
        }
    }
    export interface FooterElement extends ControlElement {
        readonly?: boolean;
    }
    export class BuilderFooter extends Module {
        private pnlFooter;
        private pnlFooterMain;
        private pnlEditOverlay;
        private pnlOverlay;
        private pnlConfig;
        private mdUpload;
        private uploader;
        private _readonly;
        private showAddStack;
        constructor(parent?: any);
        initEventBus(): void;
        setData(value: IPageFooter): Promise<void>;
        private get _elements();
        private get _image();
        private updateFooter;
        private addFooter;
        private updateOverlay;
        onChangedBg(): void;
        private onUpdateImage;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/builder/index.ts" />
declare module "@scom/scom-page-builder/builder/index.ts" {
    export { BuilderHeader } from "@scom/scom-page-builder/builder/builderHeader.tsx";
    export { BuilderFooter } from "@scom/scom-page-builder/builder/builderFooter.tsx";
}
/// <amd-module name="@scom/scom-page-builder/index.css.ts" />
declare module "@scom/scom-page-builder/index.css.ts" { }
/// <amd-module name="@scom/scom-page-builder" />
declare module "@scom/scom-page-builder" {
    import { Container, ControlElement, Module } from '@ijstech/components';
    import { IPageData, IPageBlockData, IOnFetchComponentsOptions, IOnFetchComponentsResult, ICategory, ThemeType } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/index.css.ts";
    export { IOnFetchComponentsOptions, IOnFetchComponentsResult };
    type onFetchComponentsCallback = (options: IOnFetchComponentsOptions) => Promise<IOnFetchComponentsResult>;
    interface PageBuilderElement extends ControlElement {
        rootDir?: string;
        components?: IPageBlockData[];
        categories?: ICategory[];
        theme?: ThemeType;
        onFetchComponents?: onFetchComponentsCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-page-builder']: PageBuilderElement;
            }
        }
    }
    export default class Editor extends Module {
        private pageRows;
        private builderFooter;
        private pnlWrap;
        private pageSidebar;
        private pageMenu;
        private mdComponentsSearch;
        private pnlEditor;
        private pageContent;
        private events;
        private currentElement;
        private isFirstLoad;
        private _theme;
        private boundHandleKeyUp;
        constructor(parent?: Container, options?: any);
        get rootDir(): string;
        set rootDir(value: string);
        get components(): IPageBlockData[];
        set components(value: IPageBlockData[]);
        get categories(): ICategory[];
        set categories(value: ICategory[]);
        get theme(): ThemeType;
        set theme(value: ThemeType);
        get commandHistoryIndex(): number;
        isChanged(index?: number): boolean;
        reset(): Promise<void>;
        onFetchComponents(options: IOnFetchComponentsOptions): Promise<IOnFetchComponentsResult>;
        private initScrollEvent;
        private initDragEvent;
        private initEventListeners;
        private onKeyUp;
        init(): void;
        setRootDir(value: string): void;
        getData(): {
            sections: import("@scom/scom-page-builder/interface/siteData.ts").IPageSection[];
            footer: import("@scom/scom-page-builder/interface/siteData.ts").IPageFooter;
            config: import("@scom/scom-page-builder/interface/siteData.ts").IPageConfig;
        };
        setData(value: IPageData): Promise<void>;
        private updatePageConfig;
        onHide(): void;
        private initEventBus;
        private onUpdateWrapper;
        private onToggleSearch;
        private onSearch;
        private initData;
        render(): any;
    }
}
