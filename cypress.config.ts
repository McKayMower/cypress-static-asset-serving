import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import path from "path";
import fs from "fs"
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

import CopyPlugin from "copy-webpack-plugin"

const cesiumSource = "./node_modules/cesium/Build/Cesium"
const cesiumBaseUrl = "./public/cesium"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
      const options = webpackPreprocessor.defaultOptions;
      if (options.webpackOptions) {
        options.webpackOptions = {
          resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
            plugins: [new TsconfigPathsPlugin()]
          },

          module: {
            rules: [
              {
                test: /\.(sass|less|css)$/,
                use: ["style-loader", "css-loader", 'sass-loader'],
              },
              {
                test: /\.(tsx?|jsx?|js|ts)$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', "@babel/preset-typescript"],
                    },
                  },
                ],
              },
            ],
          },
        }
      }

      on("file:preprocessor", webpackPreprocessor(options));

      return config;
    },
    baseUrl: "http://192.168.1.100:3000",
  },
  component: {
    setupNodeEvents(on, config) {

      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });

      // on('before:browser:launch', (browser, launchOptions) => {
      //   // Copy Cesium assets to Cypress's build directory
      //   const cesiumAssetsPath = path.join(__dirname, './node_modules/cesium/Build/Cesium');
      //   const cypressAssetsPath = path.join(__dirname, './cypress/public/cesium');

      //   fs.cpSync(cesiumAssetsPath, cypressAssetsPath, {recursive: true});
      // });

      const options = webpackPreprocessor.defaultOptions;
      if (options.webpackOptions) {
        options.webpackOptions = {
          resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
            plugins: [new TsconfigPathsPlugin()]
          },
          module: {
            rules: [
              {
                test: /\.(tsx?|jsx?|js|ts)$/,
                exclude: [/node_modules/],
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', "@babel/preset-typescript"],
                    },
                  },
                ],
              },
            ],
          },
          plugins: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopyPlugin({
              patterns: [
                {
                  from: path.join(cesiumSource, "Workers"),
                  to: `${cesiumBaseUrl}/Workers`,
                },
                {
                  from: path.join(cesiumSource, "ThirdParty"),
                  to: `${cesiumBaseUrl}/ThirdParty`,
                },
                {
                  from: path.join(cesiumSource, "Assets"),
                  to: `${cesiumBaseUrl}/Assets`,
                },
                {
                  from: path.join(cesiumSource, "Widgets"),
                  to: `${cesiumBaseUrl}/Widgets`,
                },
              ],
            }),
            new webpack.DefinePlugin({
              // Define relative base path in cesium for loading assets
              CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
            }),
          ]
        }
      }

      on("file:preprocessor", webpackPreprocessor(options));

      return config;
    },
    devServer: {
      framework: "next",
      bundler: "webpack",

    },
    port: 9989,
  },
  downloadsFolder: "./cypress/downloads",
  defaultCommandTimeout: 5000,
  viewportHeight: 1000,
  viewportWidth: 1000,
  video: true,
  videoCompression: 32,
  videosFolder: "./cypress/recordings",
});
