interface Dictionary<T> {
    [key: string]: T;
}
declare type State = {
    location: {
        pathname: string;
    };
    name?: string;
    fromParent?: boolean;
};
declare type onScrollCallback = {
    (scoll: {
        top: boolean;
        bottom: boolean;
        y: number;
    }): void;
};
declare type onTransitionCallback = {
    (state: State): void;
};
declare type embedConfig = {
    footerSpacing?: number;
    debug?: boolean;
};
declare type method = [string, any?];
declare class Embed {
    frame: HTMLIFrameElement;
    ready: boolean;
    callbacks: Dictionary<Function[]>;
    state: State;
    pendingMethods: method[];
    watchers: Dictionary<string>;
    constructor(iframe: HTMLIFrameElement, config?: embedConfig);
    private CapturePostMessages;
    private Call;
    to(path: string): void;
    configure(config: embedConfig): void;
    on(event: string, callback: Function, options?: any): void;
    onScroll(callback: onScrollCallback): void;
    onTransition(callback: onTransitionCallback): void;
}
interface Config {
    domain: string;
}
export default class Crowded {
    private static _config;
    static Embed: typeof Embed;
    constructor(c: Config);
    static config: Config;
}
export {};
