<a id='readme-top'> </a>

<br />
<div align="center">
  <a href="https://github.com/Revenge-of-the-SithQL/atelier"></a>
  <h3 align="center">
    Project Atelier
  </h3>
  <p align="center">
    <br />
    <a href="https://github.com/Revenge-of-the-SithQL/atelier"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
    <li>
      <a href="#optimizations">Optimizations</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## About

<div align="center">
  <img src="./client/src/assets/demo1.gif" alt="project landing page image" width="700px" />
<br />
  <img src="./client/src/assets/demo2.gif" alt="project landing page image" width="700px" />
</div>

<br />
<p>
  Atelier is a desktop and mobile friendly app utilizing React and Express that enables users to browse through a collection of over 15 million products, add them to their outfits, read through a robust Q&A section, peruse the products ratings and reviews, and add products to their cart.
</p>

### Built With
![node.js](https://img.shields.io/badge/node-%23000000.svg?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-%23000000.svg?style=for-the-badge&logo=react&logoColor)
![Webpack](https://img.shields.io/badge/webpack-%23000000.svg?style=for-the-badge&logo=webpack)
![Babel](https://img.shields.io/badge/babel-%23000000.svg?style=for-the-badge&logo=babel)
![axios](https://img.shields.io/badge/axios-%23000000.svg?style=for-the-badge&logo=axios)
![jest](https://img.shields.io/badge/jest-%23000000.svg?style=for-the-badge&logo=jest)

## Getting Started

<p>
    Instructions to setup Project Atelier on your local machine below.
</p>

### Prerequisites

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

```sh
npm install npm@latest -g 
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Revenge-of-the-SithQL/atelier
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Enter your port, API URL, and Github Token in `.env` file
   ```sh
    GIT_API_URL = (your database URI)
    GIT_TOKEN = (your github token)
   ```
1. Run build command.
   ```sh
   npm run build
   ```
1. Run in production environment
   ```sh
   npm run start
   ```

## Usage

Atelier is run on the designated port and opens a webpage as soon as the npm start command is utilized. It can also be accessed utilizing localhost:3000 directly in the browser.

Run tests: ```npm run test ```

Run tests with coverage: ```npm run test:coverage```


<p align="right"><a href="#readme-top">back to top</a></p>

<!-- ROADMAP -->

## Roadmap

- [x] Strategize each person's roles and widgets
- [x] Setup the environment
- [x] Create respective widgets
- [x] Refactor and optimize code 
- [x] Deploy on AWS

## Optimizations

 1. Consolidate common API calls into shared components
 2. Refactor to memoize variables to minimize unecessary re-renders
 3. Optimize by code-splitting and tree-shaking to bring lighthouse scores up

<!-- CONTACT -->

## Contact
<table>
  <tr>
    <td>
      <h3 align='center'> Nathaniel Wise </h3>
      <h4 align='center'>
        <a href="https://www.linkedin.com/in/nathaniel-wise-911048283/">Linkedin</a> |
        <a href="https://github.com/Gralayer">GitHub</a>
      </h4>
    </td>
    <td>
      <h3 align='center'> Jose Felix </h3>
      <h4 align='center'>
        <a href="https://www.linkedin.com/in/jose-m-felix/">Linkedin</a> |
        <a href="https://github.com/jose-m-f">GitHub</a>
      </h4>
    </td>
  </tr>
  <tr>
    <td>
      <h3 align='center'> Hazel Kimberly Carcido </h3>
      <h4 align='center'>
        <a href="https://www.linkedin.com/in/hazelkcarcido/">Linkedin</a> |
        <a href="https://github.com/hazelkimberly">GitHub</a>
      </h4>
    </td>
    <td>
      <h3 align='center'> Steven Kim </h3>
      <h4 align='center'>
        <a href="https://www.linkedin.com/in/stevkim/">Linkedin</a> |
        <a href="https://github.com/stevkim">GitHub</a>
      </h4>
    </td>
  </tr>
</table>

<p align="right"><a href="#readme-top">back to top</a></p>
