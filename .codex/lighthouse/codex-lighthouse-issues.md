# Lighthouse Issues for Codex

## Run Context

| Field | Value |
|---|---|
| Requested URL | http://127.0.0.1:4173/tr/ |
| Final URL | http://127.0.0.1:4173/tr/ |
| Mode | local |
| Generated At | 2026-05-26T08:38:03.412Z |
| Lighthouse Version | 13.3.0 |
| Raw Report | `.codex/lighthouse/report.json` |

## Category Scores

| Category | Key | Score |
|---|---:|---:|
| Performance | `performance` | 74 |
| Accessibility | `accessibility` | 100 |
| Best Practices | `best-practices` | 100 |
| SEO | `seo` | 100 |

## Instructions for Codex

Read this file first, then inspect `.codex/lighthouse/report.json` only when more detail is needed.

Fix the issues with minimal, high-confidence changes.

Priority order:

1. Performance issues that affect Core Web Vitals.
2. Accessibility issues that affect real user interaction.
3. SEO issues that affect indexing or metadata quality.
4. Best-practices issues that affect security, browser compatibility, or reliability.

Constraints:

- Do not change visual design unless required by the audit.
- Do not remove business logic.
- Prefer small, reviewable changes.
- Explain every code change briefly after editing.
- Re-run this script after fixes.

## Actionable Issues

### 1. Reduce unused JavaScript

- Audit ID: `unused-javascript`
- Score: 0
- Score Mode: `metricSavings`
- Display Value: Est savings of 245 KiB
- Description: Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).

Sample Details:

```json
[
  {
    "url": "http://127.0.0.1:4173/en/_next/static/chunks/518-3645d595135ebed9.js",
    "totalBytes": 222694,
    "wastedBytes": 108413,
    "wastedPercent": 48.68249705874428
  },
  {
    "url": "http://127.0.0.1:4173/en/_next/static/chunks/a8a480b7-6910a9cac0fd60a7.js",
    "totalBytes": 199864,
    "wastedBytes": 86783,
    "wastedPercent": 43.42102629788256
  },
  {
    "url": "http://127.0.0.1:4173/en/_next/static/chunks/857-d39b8c98cfa8ea4b.js",
    "totalBytes": 127428,
    "wastedBytes": 55735,
    "wastedPercent": 43.73842483598581
  }
]
```

### 2. Improve image delivery

- Audit ID: `image-delivery-insight`
- Score: 0
- Score Mode: `metricSavings`
- Display Value: Est savings of 379 KiB
- Description: Reducing the download time of images can improve the perceived load time of the page and LCP. [Learn more about optimizing image size](https://developer.chrome.com/docs/performance/insights/image-delivery)

Sample Details:

```json
[
  {
    "node": {
      "type": "node",
      "lhId": "page-0-IMG",
      "path": "1,HTML,1,BODY,1,MAIN,0,SECTION,0,DIV,1,DIV,1,DIV,1,IMG",
      "selector": "div.max-w-lg > div.flex > div.relative > img.object-cover",
      "boundingRect": {
        "top": 298,
        "bottom": 607,
        "left": 0,
        "right": 412,
        "width": 412,
        "height": 309
      },
      "snippet": "<img alt=\"Demiryolu yük treni\" fetchpriority=\"high\" decoding=\"async\" data-nimg=\"fill\" class=\"object-cover\" style=\"position: absolute; height: 100%; width: 100%; inset: 0px;\" src=\"/en/_next/static/media/rail-train.2cc5ce56.webp\">",
      "nodeLabel": "Demiryolu yük treni"
    },
    "url": "http://127.0.0.1:4173/en/_next/static/media/rail-train.2cc5ce56.webp",
    "totalBytes": 143070,
    "wastedBytes": 128398,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "reason": "This image file is larger than it needs to be (1364x1024) for its displayed dimensions (464x309). Use responsive images to reduce the image download size.",
          "wastedBytes": 128398
        }
      ]
    }
  },
  {
    "node": {
      "type": "node",
      "lhId": "page-1-IMG",
      "path": "1,HTML,1,BODY,1,MAIN,2,SECTION,0,DIV,0,DIV,2,IMG",
      "selector": "section.w-screen > div.max-w-lg > div.absolute > img.object-cover",
      "boundingRect": {
        "top": 2041,
        "bottom": 2469,
        "left": 0,
        "right": 412,
        "width": 412,
        "height": 428
      },
      "snippet": "<img alt=\"Tek renkli yük treni ve demiryolu hattı\" loading=\"lazy\" decoding=\"async\" data-nimg=\"fill\" class=\"object-cover mix-blend-darken object-[72%_65%] opacity-75 md:object-right-…\" style=\"position: absolute; height: 100%; width: 100%; inset: 0px;\" src=\"/en/_next/static/media/monochrome-freight-train-on-tracks.7da54a55.webp\">",
      "nodeLabel": "Tek renkli yük treni ve demiryolu hattı"
    },
    "url": "http://127.0.0.1:4173/en/_next/static/media/monochrome-freight-train-on-tracks.7da54a55.webp",
    "totalBytes": 173376,
    "wastedBytes": 119141,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "reason": "Increasing the image compression factor could improve this image's download size.",
          "wastedBytes": 31409
        },
        {
          "reason": "This image file is larger than it needs to be (905x941) for its displayed dimensions (760x428). Use responsive images to reduce the image download size.",
          "wastedBytes": 107142
        }
      ]
    }
  },
  {
    "node": {
      "type": "node",
      "lhId": "page-2-IMG",
      "path": "1,HTML,1,BODY,1,MAIN,4,SECTION,0,DIV,0,DIV,1,IMG",
      "selector": "section.w-screen > div.max-w-lg > div.absolute > img.object-cover",
      "boundingRect": {
        "top": 3802,
        "bottom": 4115,
        "left": 0,
        "right": 412,
        "width": 412,
        "height": 313
      },
      "snippet": "<img alt=\"Demiryolu perspektif arka planı\" loading=\"lazy\" decoding=\"async\" data-nimg=\"fill\" class=\"object-cover object-bottom opacity-70\" style=\"position: absolute; height: 100%; width: 100%; inset: 0px;\" src=\"/en/_next/static/media/services-rail-perspective-bg.dbe6d73e.webp\">",
      "nodeLabel": "Demiryolu perspektif arka planı"
    },
    "url": "http://127.0.0.1:4173/en/_next/static/media/services-rail-perspective-bg.dbe6d73e.webp",
    "totalBytes": 80340,
    "wastedBytes": 68365,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "reason": "This image file is larger than it needs to be (1239x941) for its displayed dimensions (556x313). Use responsive images to reduce the image download size.",
          "wastedBytes": 68365
        }
      ]
    }
  },
  {
    "node": {
      "type": "node",
      "lhId": "page-3-IMG",
      "path": "1,HTML,1,BODY,1,MAIN,0,SECTION,0,DIV,1,DIV,0,DIV,0,IMG",
      "selector": "div.max-w-lg > div.flex > div.flex > img.size-28",
      "boundingRect": {
        "top": 180,
        "bottom": 292,
        "left": 150,
        "right": 262,
        "width": 112,
        "height": 112
      },
      "snippet": "<img alt=\"Khalij Fars Rail logosu\" data-reveal=\"headline\" data-stagger=\"0\" width=\"400\" height=\"400\" decoding=\"async\" data-nimg=\"1\" class=\"size-28 aspect-square\" style=\"color:transparent\" src=\"/en/_next/static/media/logo.f50a9d7b.webp\">",
      "nodeLabel": "Khalij Fars Rail logosu"
    },
    "url": "http://127.0.0.1:4173/en/_next/static/media/logo.f50a9d7b.webp",
    "totalBytes": 46870,
    "wastedBytes": 45825,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "reason": "This image file is larger than it needs to be (750x750) for its displayed dimensions (112x112). Use responsive images to reduce the image download size.",
          "wastedBytes": 45825
        }
      ]
    }
  },
  {
    "node": {
      "type": "node",
      "lhId": "page-4-IMG",
      "path": "1,HTML,1,BODY,1,MAIN,1,SECTION,0,DIV,0,DIV,0,IMG",
      "selector": "section.w-screen > div.max-w-lg > div.absolute > img.object-cover",
      "boundingRect": {
        "top": 1014,
        "bottom": 1654,
        "left": 188,
        "right": 508,
        "width": 320,
        "height": 640
      },
      "snippet": "<img alt=\"Trafik ışıkları\" loading=\"lazy\" decoding=\"async\" data-nimg=\"fill\" class=\"object-cover mix-blend-darken\" style=\"position: absolute; height: 100%; width: 100%; inset: 0px;\" src=\"/en/_next/static/media/traffic-lights.114b50f7.webp\">",
      "nodeLabel": "Trafik ışıkları"
    },
    "url": "http://127.0.0.1:4173/en/_next/static/media/traffic-lights.114b50f7.webp",
    "totalBytes": 37412,
    "wastedBytes": 26449,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "reason": "This image file is larger than it needs to be (724x1448) for its displayed dimensions (480x640). Use responsive images to reduce the image download size.",
          "wastedBytes": 26449
        }
      ]
    }
  }
]
```

### 3. Legacy JavaScript

- Audit ID: `legacy-javascript-insight`
- Score: 0
- Score Mode: `metricSavings`
- Display Value: Est savings of 43 KiB
- Description: Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web.dev/articles/baseline-and-polyfills) features, unless you know you must support older browsers. [Learn why most sites can deploy ES6+ code without transpiling](https://developer.chrome.com/docs/performance/insights/legacy-javascript)

Sample Details:

```json
[
  {
    "url": "http://127.0.0.1:4173/en/_next/static/chunks/518-3645d595135ebed9.js",
    "wastedBytes": 43785,
    "subItems": {
      "type": "subitems",
      "items": [
        {
          "signal": "Array.prototype.at",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "Array.prototype.flat",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "Array.prototype.flatMap",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "Object.fromEntries",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "Object.hasOwn",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "String.prototype.trimEnd",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        },
        {
          "signal": "String.prototype.trimStart",
          "location": {
            "type": "[Max depth reached]",
            "url": "[Max depth reached]",
            "urlProvider": "[Max depth reached]",
            "line": "[Max depth reached]",
            "column": "[Max depth reached]"
          }
        }
      ]
    }
  }
]
```

### 4. Network dependency tree

- Audit ID: `network-dependency-tree-insight`
- Score: 0
- Score Mode: `numeric`
- Description: [Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.

Sample Details:

```json
[
  {
    "type": "list-section",
    "value": {
      "type": "network-tree",
      "chains": {
        "117B4FB3F050CCD96C87583B2002DC47": {
          "url": "http://127.0.0.1:4173/tr/",
          "navStartToEndTime": 43,
          "transferSize": 227623,
          "isLongest": true,
          "children": {
            "74533.6": "[Max depth reached]"
          }
        }
      },
      "longestChain": {
        "duration": 88
      }
    }
  },
  {
    "type": "list-section",
    "title": "Preconnected origins",
    "description": "[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/) hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.",
    "value": {
      "type": "text",
      "value": "no origins were preconnected"
    }
  },
  {
    "type": "list-section",
    "title": "Preconnect candidates",
    "description": "Add [preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/) hints to your most important origins, but try to use no more than 4.",
    "value": {
      "type": "text",
      "value": "No additional origins are good candidates for preconnecting"
    }
  }
]
```

### 5. Render-blocking requests

- Audit ID: `render-blocking-insight`
- Score: 0
- Score Mode: `metricSavings`
- Display Value: Est savings of 320 ms
- Description: Requests are blocking the page's initial render, which may delay LCP. [Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking) can move these network requests out of the critical path.

Sample Details:

```json
[
  {
    "url": "http://127.0.0.1:4173/en/_next/static/css/67fb36920f637d13.css",
    "totalBytes": 40568,
    "wastedMs": 304
  }
]
```

### 6. Largest Contentful Paint

- Audit ID: `largest-contentful-paint`
- Score: 2
- Score Mode: `numeric`
- Display Value: 8.2 s
- Description: Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)

No detailed items were provided by Lighthouse.

### 7. Time to Interactive

- Audit ID: `interactive`
- Score: 39
- Score Mode: `numeric`
- Display Value: 8.4 s
- Description: Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).

No detailed items were provided by Lighthouse.

### 8. Minimize main-thread work

- Audit ID: `mainthread-work-breakdown`
- Score: 50
- Score Mode: `metricSavings`
- Display Value: 2.2 s
- Description: Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)

Sample Details:

```json
[
  {
    "group": "other",
    "groupLabel": "Other",
    "duration": 1012.6680000000014
  },
  {
    "group": "styleLayout",
    "groupLabel": "Style & Layout",
    "duration": 622.5240000000005
  },
  {
    "group": "scriptEvaluation",
    "groupLabel": "Script Evaluation",
    "duration": 271.20799999999895
  },
  {
    "group": "paintCompositeRender",
    "groupLabel": "Rendering",
    "duration": 206.88399999999555
  },
  {
    "group": "scriptParseCompile",
    "groupLabel": "Script Parsing & Compilation",
    "duration": 51.62799999999989
  },
  {
    "group": "parseHTML",
    "groupLabel": "Parse HTML & CSS",
    "duration": 42.391999999999996
  }
]
```

### 9. Use efficient cache lifetimes

- Audit ID: `cache-insight`
- Score: 50
- Score Mode: `metricSavings`
- Display Value: Est savings of 157 KiB
- Description: A long cache lifetime can speed up repeat visits to your page. [Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache).

Sample Details:

```json
[
  {
    "url": "http://127.0.0.1:4173/world-map-dots.svg",
    "cacheLifetimeMs": 3600000,
    "totalBytes": 200385,
    "wastedBytes": 160308
  }
]
```

### 10. Document request latency

- Audit ID: `document-latency-insight`
- Score: 50
- Score Mode: `metricSavings`
- Display Value: Est savings of 149 KiB
- Description: Your first network request is the most important. [Reduce its latency](https://developer.chrome.com/docs/performance/insights/document-latency) by avoiding redirects, ensuring a fast server response, and enabling text compression.

No detailed items were provided by Lighthouse.

### 11. First Contentful Paint

- Audit ID: `first-contentful-paint`
- Score: 81
- Score Mode: `numeric`
- Display Value: 2.1 s
- Description: First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).

No detailed items were provided by Lighthouse.

### 12. Max Potential First Input Delay

- Audit ID: `max-potential-fid`
- Score: 98
- Score Mode: `numeric`
- Display Value: 90 ms
- Description: The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).

No detailed items were provided by Lighthouse.

### 13. Speed Index

- Audit ID: `speed-index`
- Score: 99
- Score Mode: `numeric`
- Display Value: 2.1 s
- Description: Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).

No detailed items were provided by Lighthouse.
