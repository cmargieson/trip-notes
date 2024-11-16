// @ts-check

// https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  /*
   * Required fields
   */

  // Title for your website. Will be used in metadata and as browser tab title.
  title: "Trip Notes",

  // URL for your website. This can also be considered the top-level hostname.
  url: "https://your-docusaurus-site.example.com",

  // Base URL for your site.
  baseUrl: "/",

  /*
   * Optional fields
   */

  // Path to your site favicon
  favicon: "img/favicon.ico",

  // The i18n configuration object to localize your site. Use this field to set metadata like html lang.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // The theme configuration object to customize your site UI like navbar and footer.
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  // https://docusaurus.io/docs/api/plugin-methods
  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],

    // Custom Plugin
    function myPlugin(context, opts) {
      // ...
      return {
        // A compulsory field used as the namespace for directories to cache
        // the intermediate data for each plugin.
        // If you're writing your own local plugin, you will want it to
        // be unique in order not to potentially conflict with imported plugins.
        // A good way will be to add your own project name within.
        name: "docusaurus-plugin",

        configureWebpack(config, isServer, utils, content) {
          // Modify internal webpack config. If returned value is an Object, it
          // will be merged into the final config using webpack-merge;
          // If the returned value is a function, it will receive the config as the 1st argument and an isServer flag as the 2nd argument.
          return {
            module: {
              rules: [
                {
                  test: /\.kml$/,
                  use: [
                    {
                      loader: "file-loader",
                      options: { name: "assets/files/[hash].[ext]" },
                    },
                  ],
                },
              ],
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          // Serve the blog at root
          routeBasePath: "/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
};

export default config;
