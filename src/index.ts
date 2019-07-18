class Embed {
    frame: HTMLIFrameElement;
    callbacks: {
        [index: string]: Function[];
    } = {};
    state: {
        location: {
            pathname: string;
        };
        state?: string;
    } = {
            location: {
                pathname: ""
            }
        };

    constructor(iframe: HTMLIFrameElement) {
        if (!Crowded.config.domain)
            throw new Error(
                "Missing Crowded configuration. Make sure set Crowded.config = { ... } before initializing an Embed"
            );

        if (iframe.nodeName != "IFRAME")
            throw new TypeError(
                "Parameter of new Crowded.Embed(...) must be Iframe DOM Element"
            );

        this.frame = iframe;

        this.frame.onload = () => this.Call("Connect");

        this.on("transition", (state: any) => (this.state = state));
        this.CapturePostMessages();

        this.to("");
    }

    /* public methods */
    to(path: string) {
        if (path[0] != "/") path = "/" + path;
        if (path != this.state.location.pathname)
            this.state.state
                ? this.Call("Navigate", path)
                : (this.frame.src =
                    Crowded.config.domain + path + "?iframe=true");
    }

    on(event: string, callback: Function) {
        if (typeof callback != "function")
            throw new TypeError(
                "Second parameter of Crowded.Embed.on() must be a function"
            );
        this.callbacks[event]
            ? this.callbacks[event].push(callback)
            : (this.callbacks[event] = [callback]);
    }

    CapturePostMessages = () => {
        window.addEventListener("message", e => {
            if (e.origin !== Crowded.config.domain) return;
            var message = e.data ? JSON.parse(e.data) : {};
            if (message.crowdedEvent && this.callbacks[message.crowdedEvent]) {
                this.callbacks[message.crowdedEvent].forEach(fun =>
                    fun(message.data)
                );
            }
        });
    };

    Call = (method: string, value?: any) => {
        if (this.frame.contentWindow)
            this.frame.contentWindow.postMessage(
                JSON.stringify({ method: method, value }),
                Crowded.config.domain
            );
    };
}

interface Config {
    domain: string;
}

export default class Crowded {
    private static _config: Config;
    static Embed = Embed;

    constructor(c: Config) {
        Crowded.config = c
    }

    static set config(c: Config) {
        this._config = c
    }
    static get config() { return this._config }
}