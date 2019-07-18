# Crowded JS SDK

Simple API to set up a connection with Crowded and load a community inside an iframe.

### Requirements

-   A Crowded Community domain that is set-up to accept cros origin iframe requests

## API

### Configuration

```js
{
    domain: "https://yourcommmunity.com";
}
```

### Connect

```js
new Crowded(config);
```

### Load Community in iframe

```js
var frame = document.createElement("iframe");
var embed = new Crowded.Embed(frame);
```

### Navigate iframe to a page in the community

```js
embed.to("posts/some-post");
```

### Set Watcher

```js
embed.on("debug", data => console.log(data));
```

Supported Watcher:

-   transition Returns a state object containing the new window.location of the frame
-   debug Returns debug messages
