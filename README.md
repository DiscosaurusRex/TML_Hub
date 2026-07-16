# TML Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-f2c86b.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/DiscosaurusRex/TML_Hub)](https://github.com/DiscosaurusRex/TML_Hub/commits)
[![GitHub issues](https://img.shields.io/github/issues/DiscosaurusRex/TML_Hub)](https://github.com/DiscosaurusRex/TML_Hub/issues)
[![Live site](https://img.shields.io/badge/GitHub%20Pages-Open%20TML%20Hub-8a4fff?logo=github)](https://discosaurusrex.github.io/TML_Hub/)
[![Progressive Web App](https://img.shields.io/badge/PWA-ready-5a0fc8?logo=pwa&logoColor=white)](manifest.webmanifest)
[![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=111)](js/script.js)

An unofficial, community-built hub for festival live streams, One World Radio, and Tomorrowland schedule discovery.

**Live site:** [discosaurusrex.github.io/TML_Hub](https://discosaurusrex.github.io/TML_Hub/)

> [!IMPORTANT]
> TML Hub is an independent community project. It is not affiliated with, endorsed by, sponsored by, or officially connected to Tomorrowland, WEAREONE.world, or One World Radio.

## About the project

TML Hub brings several useful festival tools into one responsive web experience:

- A primary live-stream player with configurable stream choices.
- A persistent One World Radio player that remains available while browsing.
- Live track metadata, artwork, station switching, volume controls, and listening history.
- An expanded, immersive radio-player view.
- Weekend and day schedule navigation with stage filters and artist search.
- A desktop schedule timeline and a compact, vertically stacked mobile schedule.
- Artist detail dialogs with social links and additional showtimes.
- Progressive Web App support for installation and offline app-shell caching.
- Responsive layouts designed to avoid page-level horizontal scrolling.

The project is intentionally lightweight. It uses HTML, CSS, and vanilla JavaScript with no framework or build step.

## Getting started

Clone the repository:

```bash
git clone https://github.com/DiscosaurusRex/TML_Hub.git
cd TML_Hub
```

Serve the directory with any local static server. For example:

```bash
python -m http.server 8080
```

On Windows, the Python launcher can also be used:

```powershell
py -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Opening `index.html` directly may prevent schedule requests, embedded players, or service-worker features from working correctly. Running through a local HTTP server is recommended.

## Configuration

Most runtime configuration lives near the top of `js/script.js`.

### Live streams

Stream configuration lives near the top of [`js/script.js`](js/script.js). The site uses one large primary player and a set of smaller stream-selection cards beneath it. Selecting a card loads that broadcast into the primary player.

#### 1. Find an embeddable URL

Use the provider's iframe or embed URL, not the ordinary page URL. For YouTube, copy the video ID and use this format:

```text
https://www.youtube.com/embed/VIDEO_ID
```

For example, convert:

```text
https://www.youtube.com/watch?v=abc123
```

to:

```text
https://www.youtube.com/embed/abc123
```

The privacy-enhanced `https://www.youtube-nocookie.com/embed/VIDEO_ID` format is also supported. Other providers can be used when they offer an HTTPS iframe URL and permit embedding on the deployed domain.

#### 2. Set the default stream

`mainStreamEmbed` defines the broadcast shown in the large player when the page first loads:

```js
const mainStreamEmbed = 'https://www.youtube.com/embed/VIDEO_ID';
```

This stream also appears as the first option under the player with the label `Main Stream`.

#### 3. Add the other available streams

Add each additional broadcast to `stageStreamEmbeds`. The property is the visible stream name and the value is its embed URL:

```js
const stageStreamEmbeds = {
  'Freedom Stage': 'https://www.youtube.com/embed/FREEDOM_VIDEO_ID',
  'Crystal Garden': 'https://www.youtube.com/embed/CRYSTAL_VIDEO_ID',
};
```

Cards appear in the same order as these entries, after `Main Stream`. Keep the list to broadcasts that are actually available; unused placeholders are not necessary. Entries with `null`, an empty string, or another missing value are hidden.

If a name contains uppercase ` BY `, the interface separates the sponsor automatically. For example:

```js
'FREEDOM BY BUD': 'https://www.youtube.com/embed/VIDEO_ID'
```

is displayed as `FREEDOM` with `Presented by BUD` beneath it.

#### Connecting a stream to the schedule

Use the exact `stage.name` supplied by the schedule endpoint when a broadcast belongs to a particular stage. Matching is case-sensitive. An exact match allows stage actions in the schedule to send the visitor to that stream:

```js
const stageStreamEmbeds = {
  'FREEDOM STAGE': 'https://www.youtube.com/embed/VIDEO_ID',
};
```

Generic names such as `Weekend Stream` also work as stream cards, but they will not be associated with a schedule stage.

#### Testing a stream

1. Start the site through a local HTTP server rather than opening `index.html` directly.
2. Confirm the default broadcast loads in the large player.
3. Confirm every smaller stream card moves its broadcast into the large player when selected.
4. Test playback on both desktop and mobile widths.
5. Check the browser console for iframe, permission, or content-security errors.
6. Increment `CACHE` in `service-worker.js` before deployment so returning visitors receive the updated `js/script.js` file.

If an older URL remains after a change, unregister the site's service worker or clear its stored site data, then reload.

#### Common problems

- **Video unavailable:** The provider may have disabled embedding, the broadcast may not have started, or the URL may be a watch-page URL instead of an embed URL.
- **Refused to display in a frame:** The provider blocks third-party embedding through its security headers. A different official embed source is required.
- **Works locally but not on GitHub Pages:** Confirm the source uses HTTPS and permits embedding on `discosaurusrex.github.io`.
- **Schedule button does not find the stream:** Make the `stageStreamEmbeds` key exactly match the schedule's `stage.name`, including capitalization and spacing.
- **Old stream still appears:** Increase the service-worker cache version and reload after the new deployment becomes available.

Stream URLs included in client-side JavaScript are public. Never place private API keys, account credentials, or provider secrets in this configuration. Only add broadcasts you are permitted to embed, and remove or replace links when an event ends or a provider requests it.

### Radio stations

The `stations` array controls the available radio stations, metadata tag, and fallback stream URLs:

```js
{
  name: 'Station name',
  tag: 'metadata-tag',
  streams: ['https://example.com/live.mp3'],
}
```

Multiple URLs can be supplied in `streams`; the player will try the next URL if the current source fails.

### Festival schedule

Schedule data is loaded directly from the configured Tomorrowland lineup endpoints. A network connection is required to load the schedule. Schedule entries use fields such as:

- `date`
- `startTime` and `endTime`
- `name`
- `stage.name`
- `artists`

Artist entries may include an image and supported social-profile URLs. The interface uses these details for search, profile dialogs, artwork, and social links.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Page structure, player markup, navigation, and dialogs |
| `css/styles.css` | Site layout, stream section, schedule, and responsive styles |
| `css/player-dock.css` | Docked and expanded radio-player layouts |
| `js/script.js` | Streams, radio playback, metadata, schedule rendering, and interactions |
| `assets/` | Favicons, install icons, and fallback artwork |
| `manifest.webmanifest` | Progressive Web App metadata and icons |
| `service-worker.js` | App-shell caching and offline behavior |

## Deployment

TML Hub can be hosted on any static hosting provider, including GitHub Pages, Cloudflare Pages, Netlify, or a conventional web server.

For production deployments:

- Use HTTPS so service workers and installable PWA features are available.
- Confirm that embedded-stream providers permit playback on the deployment domain.
- Keep stream URLs and schedule sources current.
- Increment the cache name in `service-worker.js` when releasing updated cached assets.
- Review third-party branding, embed, metadata, and content terms before publishing.

## Contributing

Community contributions are welcome. Useful areas include:

- Responsive and accessibility improvements.
- Stream-source configuration and failure handling.
- Schedule-data validation and presentation.
- Browser compatibility and PWA behavior.
- Documentation and testing.

When reporting a bug, include the browser, viewport size, reproduction steps, and screenshots when relevant. Please avoid committing copyrighted media or credentials.

## Disclaimer and third-party rights

TML Hub is a fan-made community aggregator. It does not host, store, rebroadcast, or redistribute the linked audio and video content. Streams, embeds, metadata, artwork, artist information, and external links are delivered by their respective third-party services and rights holders.

Tomorrowland, One World Radio, WEAREONE.world, and related names, logos, artwork, and trademarks belong to their respective owners. Their appearance or mention in this project does not imply affiliation, sponsorship, approval, or endorsement.

Users and deployers are responsible for complying with the terms, licenses, and usage requirements of all configured content providers.

## License

The source code is available under the [MIT License](LICENSE). This license applies to the project code and does not grant rights to third-party trademarks, media, artwork, metadata, or other externally provided content.
