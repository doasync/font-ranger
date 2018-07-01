Overdrive… Accelerate! 🚀
======================

Optimize your webfont loading! Split a large Unicode font into smaller subsets
(Latin, Cyrillic etc.) and browser will only download the subset needed
for a particular page (using `unicode-range`).

With **Font-Ranger** you can:
 - Generate subsets for each language you support
 - Use unicode-range subsetting for saving bandwidth
 - Remove bloat from your fonts and optimize them for web
 - Convert your fonts to a compressed woff2 format
 - Provide .woff fallback for older browsers
 - Self-host web fonts or use them locally
 - Generate CSS file with @font-face rules
 - Customize font loading and rendering

Installation
------------
You can install it globally:

```bash
npm i -g font-ranger
```

Or locally:
```bash
npm i --save-dev font-ranger
```

And you can use it without installation (see usage)

**Font-Ranger** requires `fonttools` and `brotli` (for woff2) to be installed on your system.

On Ubuntu:
```
sudo apt install fonttools brotli
```

Using Python:
```
pip install fonttools brotli
```

Usage
-----

`npx` - an official npm tool to run packages. Use it to run `font-ranger` without installation (or with local installation):

```bash
npx font-ranger --help
```

This tool takes your single font file and splits it to multiple subsets using unicode ranges from Google Fonts:
- Latin
- Latin Extended
- Cyrillic
- Cyrillic Extended
- Greek
- Greek Extended
- and other...

For example, you can take 'Roboto-Regular.ttf' and run the following command:
```bash
npx font-ranger -f Roboto-Regular.ttf -o fonts -u latin latin-ext cyrillic cyrillic-ext greek greek-ext -n roboto-400 -p "/fonts/" -m Roboto -b 400 -s normal -i swap -l Roboto Roboto-Regular
```

You will get the following font files:
```
+  fonts/roboto-400.cyrillic.woff2 - 6.42 KB
+  fonts/roboto-400.greek.woff2 - 7.25 KB
+  fonts/roboto-400.greek-ext.woff2 - 4.09 KB
+  fonts/roboto-400.latin.woff2 - 12.51 KB
+  fonts/roboto-400.latin-ext.woff2 - 28.52 KB
+  fonts/roboto-400.cyrillic-ext.woff2 - 18.27 KB
+  fonts/roboto-400.css
```

Here you can see a css-file with your @font-face rules:

```css
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src:
    local('Roboto'),
    local('Roboto-Regular'),
    url('/fonts/roboto-400.latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
...
```

Why `unicode-range`?
--------------------

The purpose of this descriptor is to allow the font resources to be segmented so that a browser only needs to download the font resource needed for the text content of a particular page. For example, a site with many localizations could provide separate font resources for English, Greek and Japanese. For users viewing the English version of a page, the font resources for Greek and Japanese fonts wouldn't need to be downloaded, **saving bandwidth**.

Google Fonts
------------

You can download source fonts from https://github.com/google/fonts

After that just process files (e.g. raw ttf) using **Font-Ranger**

Tips
----

The browser must parse all the HTML and CSS to know what font variants are being used. Only after that any font files will be requested. If we want to kick things off more quickly, we should use preloading:

```html
<link rel="stylesheet" href="/fonts/Roboto~300-400-500.css">
<link rel="preload" href="/fonts/Roboto/roboto-regular.latin.woff2" as="font" type="font/woff2" crossorigin>
```

CLI options
-----------

```
Available subsets:
  latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext, vietnamese,
  sinhala, hebrew, oriya, malayalam, gurmukhi, kannada, arabic, tamil,
  khmer, telugu, bengali, thai, devanagari, myanmar, gujarati

Options:
  -f, --font-file      Source font (to create subsets from)  [string] [required]
  -u, --subsets        Unicode subsets to use (e.g. latin)    [array] [required]
  -r, --ranges         Custom unicode ranges (e.g. U+0000-00FF)          [array]
  -o, --output-folder  Output subsets to specific folder                [string]
  -n, --font-name      Use this font name for your subset files         [string]
  -k, --keep-format    Keep original font format                       [boolean]
  -w, --add-woff       Create and add woff as a fallback format        [boolean]
  -l, --locals         Use local names to check for system fonts         [array]
  -p, --url-prefix     Prefix for your @font-face urls                  [string]
  -m, --font-family    Specify "font-family" for your css file          [string]
  -b, --font-weight    Specify "font-weight" for your css file          [string]
  -s, --font-style     Specify "font-style" for your css file           [string]
  -i, --font-display   Specify "font-display" for your css file         [string]
  -d, --skip-css       Do not generate css file                        [boolean]
  -c, --copy-original  Copy original file to the output folder         [boolean]
  -h, --help           Show help                                       [boolean]
  -v, --version        Show version number                             [boolean]
```

API
---

You can use automate **Font-Ranger** using Node.js API

Author
------
@doasync
