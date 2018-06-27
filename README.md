Overdrive… Accelerate! 🚀
======================

Optimize your webfont loading! Generate the most optimal web font subsets!

Installation
------------
Global installation is optional (use `npx`):
```bash
npm i -g font-ranger
```

**Font-Ranger** uses `fonttools` and `brotli` (for woff2), you may need to install both tools (Ubuntu example):
```
sudo apt install fonttools brotli
```

Usage
-----

`npx` - an official npm tool to run packages. Use it to run `font-ranger` without installation (or local copy is used if installed):

```bash
npx font-ranger --help
```

You just take your single font file and split it to multiple subsets using unicode ranges from Google Fonts:
- Latin
- Latin Extended
- Cyrillic
- Cyrillic Extended
- Greek
- Greek Extended
- Vietnamese

For example, you can take 'Roboto-Regular.ttf' and run the following command:
```bash
npx font-ranger -f Roboto/Roboto-Regular.ttf -l -c -m Roboto -b 400 -s normal
```

You will get the following font files:
```
+  ./roboto-regular.vietnamese.woff2 - 3.2 KB
+  ./roboto-regular.greek-ext.woff2 - 4.09 KB
+  ./roboto-regular.greek.woff2 - 7.25 KB
+  ./roboto-regular.latin.woff2 - 12.51 KB
+  ./roboto-regular.cyrillic.woff2 - 6.42 KB
+  ./roboto-regular.latin-ext.woff2 - 28.52 KB
+  ./roboto-regular.cyrillic-ext.woff2 - 18.27 KB
+  ./roboto-regular.css
```

Here you can see a css-file with your @font-face rules:

```css
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url("/roboto-regular.latin.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
...
```

Why `unicode-range`?
--------------------

The purpose of this descriptor is to allow the font resources to be segmented so that a browser only needs to download the font resource needed for the text content of a particular page. For example, a site with many localizations could provide separate font resources for English, Greek and Japanese. For users viewing the English version of a page, the font resources for Greek and Japanese fonts wouldn't need to be downloaded, **saving bandwidth**.

CLI options
-----------

```
  -f, --font-file      Source font (to create subsets from)  [string] [required]
  -o, --output-folder  Output subsets to specific folder                [string]
  -n, --font-name      Use this font name for your subset files         [string]
  -l, --lower-case     Convert font name to lower case                 [boolean]
  -e, --keep-ext       Keep original font extension                    [boolean]
  -w, --use-woff       Use woff instead of default woff2               [boolean]
  -c, --css            Generate css file with @font-face rules         [boolean]
  -m, --font-family    Specify "font-family" for your css file          [string]
  -b, --font-weight    Specify "font-weight" for your css file          [string]
  -s, --font-style     Specify "font-style" for your css file           [string]
  -i, --font-display   Specify "font-display" for your css file         [string]
  -u, --url-prefix     Prefix for your @font-face urls                  [string]
  -x, --local          Use local name to check user’s system font       [string]
  -d, --skip-css       Do not generate css file                        [boolean]
  -t, --copy-original  Copy original file to the output folder         [boolean]
  -h, --help           Show help                                       [boolean]
  -v, --version        Show version number                             [boolean]
```

Author
------
@doasync
