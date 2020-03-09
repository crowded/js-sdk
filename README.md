# Crowded JS SDK
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcrowded%2Fjs-sdk.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcrowded%2Fjs-sdk?ref=badge_shield)


Simple API to set up a connection with Crowded and load a community inside an iframe.

### Requirements

-   A Crowded Community domain that is set-up to accept cros origin iframe requests

## API

### Connect with Crowded

```js
new Crowded({
    domain: "https://yourcommmunity.com" // hostname of the community
});
```

### Load Community in iframe

```js
let config = {
    debug: true // enable logging
};
// create or select iframe element you want to use
const frame = document.createElement("iframe");

// Create a reference to the embed and load with (optional) config
const embed = new Crowded.Embed(frame, config);
```

### Methods

#### Navigation

You can navigate the iframe to a page in the community by passing a relative path.

```js
embed.to("posts/some-post");
```

### Configuration

You can update the configuration by passing a config.

```js
embed.config({
    debug: true, // show helpfull log messages
    footerSpacing: 500 // amount of pixels to add to end of the page
});
```

### Watchers

The following watcher are available

#### Transition

Watch all transitions inside the iframe, to i.e. update your router or history state.

Callback format:

```js
{
    name: 'user' // name of the state, i.e. page, home
    location: { // js location object
        pathname: '/users/john',
        host: 'https://yourcommunity.com',
        href: 'https://yourcommunity.com/users/john'
        //etc
    },
    fromParent: false   // will be marked true if this transition
                        //  was done programmatically using embed.to()
}
```

Example:

```js
embed.on("transition", state => {
    if (!state.fromParent) {
        history.push(state.location.pathname);
    }
});
```

#### Scroll

Called anytime the users scrolls, the window resizes or a transition occured.

Callback format:

```js
{
    top: 0, // offset from top
    bottom: 1700, // offset from bottom
    y: 0 // scroll position
}
```

Example:

```js
embed.on('scroll', pos => {
    if(pos.bottom < 200){
        showFooter()
    }
}

```

#### Debug

Watch any debug messages

Example:

```js
embed.on("debug", message => console.log(message));
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcrowded%2Fjs-sdk.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcrowded%2Fjs-sdk?ref=badge_large)