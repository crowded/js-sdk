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
    static config: Config;
    constructor(c: Config);
    Embed: typeof Embed;
}
export {};
