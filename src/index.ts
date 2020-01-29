interface Dictionary<T> {
    [key: string]: T;
}

type State = {
    location: {
        pathname: string
    };
    name?: string
    fromParent?: boolean
}

type onScrollCallback = {
    (scoll: { top: boolean, bottom: boolean, y: number }): void
}

type onTransitionCallback = {
    (state: State): void
}

type embedConfig = {
    footerSpacing?: number,
    debug?: boolean
}

type method = [string, any?]
class Embed {
    frame: HTMLIFrameElement
    ready = false
    callbacks: Dictionary<Function[]> = {}

    state: State = {
        location: {
            pathname: ""
        }
    }

    pendingMethods: method[] = []
    watchers: Dictionary<string> = {
        transition: "WatchTransitions",
        scroll: "WatchScrollPosition"
    }

    constructor(iframe: HTMLIFrameElement, config?: embedConfig) {
        if (!Crowded.config.domain)
            throw new Error(
                "Missing Crowded configuration. Make sure set Crowded.config = { ... } before initializing an Embed"
            );

        if (iframe.nodeName != "IFRAME")
            throw new TypeError(
                "Parameter of new Crowded.Embed(...) must be Iframe DOM Element"
            );
        this.frame = iframe;

        // this.on("transition", (state: any) => (this.state = state));

        this.Call(["Connect", config])

        this.onTransition((state) => (this.state = state))

        this.on("initialized", () => {
            this.ready = true
            this.pendingMethods.forEach(m => this.Call(m))
        });

        this.CapturePostMessages();

        this.to("");
    }

    private CapturePostMessages = () => {
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

    private Call = (m: method) => {
        let [method, value] = m;

        if (this.ready && this.frame.contentWindow)
            this.frame.contentWindow.postMessage(
                JSON.stringify({ method, value }),
                Crowded.config.domain
            );
        else this.pendingMethods.push(m)
    };

    /* public methods */
    to(path: string) {
        if (path[0] != "/") path = "/" + path;
        if (path != this.state.location.pathname)
            this.state.name
                ? this.Call(["Navigate", path])
                : (this.frame.src =
                    Crowded.config.domain + path);
    }

    configure(config: embedConfig) {
        this.Call(["Configure", config])
    }

    on(event: string, callback: Function, options?: any) {
        if (typeof callback != "function")
            throw new TypeError(
                "Second parameter of Crowded.Embed.on() must be a function"
            );

        /* if this is the first event handler for this type, 
           see if we need to add a watcher in the frontend */
        if (!this.callbacks[event]) {
            this.callbacks[event] = []
            let watcher = Object.keys(this.watchers).includes(event) ? this.watchers[event] : false
            if (watcher) this.Call([watcher, options])
        }

        this.callbacks[event].push(callback)
    }

    onScroll(callback: onScrollCallback) {
        this.on('scroll', callback)
    }

    onTransition(callback: onTransitionCallback) {
        this.on('transition', callback)
    }
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