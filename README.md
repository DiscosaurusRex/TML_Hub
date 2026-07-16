# TML Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-f2c86b.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/DiscosaurusRex/TML_Hub)](https://github.com/DiscosaurusRex/TML_Hub/commits)
[![GitHub issues](https://img.shields.io/github/issues/DiscosaurusRex/TML_Hub)](https://github.com/DiscosaurusRex/TML_Hub/issues)
[![Live site](https://img.shields.io/badge/GitHub%20Pages-Open%20TML%20Hub-8a4fff?logo=github)](https://discosaurusrex.github.io/TML_Hub/)
[![Progressive Web App](https://img.shields.io/badge/PWA-ready-5a0fc8?logo=pwa&logoColor=white)](manifest.webmanifest)
[![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=111)](script.js)

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

Most runtime configuration lives near the top of `script.js`.

### Live streams

`mainStreamEmbed` defines the stream shown in the primary player by default. Additional named streams can be added to `stageStreamEmbeds`:

```js
const mainStreamEmbed = 'https://www.youtube.com/embed/VIDEO_ID';

const stageStreamEmbeds = {
  'Freedom Stage': 'https://www.youtube.com/embed/ANOTHER_VIDEO_ID',
  'Weekend Stream': 'https://player.example.com/embed/STREAM_ID',
};
```

Only entries with a valid URL are displayed. Selecting one promotes it into the main player.

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

Schedule data is loaded from the configured remote sources first, with `week1.json` and `week2.json` acting as local fallbacks. Schedule entries use fields such as:

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
| `styles.css` | Site layout, stream section, schedule, and responsive styles |
| `player-dock.css` | Docked and expanded radio-player layouts |
| `script.js` | Streams, radio playback, metadata, schedule rendering, and interactions |
| `week1.json` / `week2.json` | Local schedule fallbacks |
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
