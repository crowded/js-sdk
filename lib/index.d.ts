declare class Embed {
    frame: HTMLIFrameElement;
    callbacks: {
        [index: string]: Function[];
    };
    state: {
        location: {
            pathname: string;
        };
        state?: string;
    };
    constructor(iframe: HTMLIFrameElement);
    to(path: string): void;
    on(event: string, callback: Function): void;
    CapturePostMessages: () => void;
    Call: (method: string, value?: any) => void;
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
