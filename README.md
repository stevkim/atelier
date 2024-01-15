<a id='readme-top'> </a>

<br />
<div align="center">
  <a href="https://github.com/Revenge-of-the-SithQL/atelier"></a>
  <h1 align="center">
    Project Atelier
  </h1>
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
      <a href="#project-overview">Project Overview</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
  </ol>
</details>
<br />

<img src='https://github.com/stevkim/atelier/blob/main/src/gifs/gif2.gif' />
<img src='https://github.com/stevkim/atelier/blob/main/src/gifs/gif3.gif' />

## About

<br />
<p>
  Atelier is a desktop and mobile friendly app utilizing React and Express that enables users to browse through a collection of over 15 million products, add them to their outfits, read through a robust Q&A section, peruse the products ratings and reviews, and add products to their cart.
</p>

This repo is meant to highlight my personal part of the project. The main project repo can be found <a href='https://github.com/Revenge-of-the-SithQL/atelier'>here.</a>
<p>
  The project was then connected to my own backend, which can be found <a href='https://github.com/hr-titan/sk-reviews'>here.</a>
</p>


### My responsibilities were:

- [x] Rating and reviews feature
- [x] Setup of the environment - Webpack config, Babel
- [x] Deployment on AWS EC2

### Built With
![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%23000000.svg?style=for-the-badge&logo=webpack)
![Babel](https://img.shields.io/badge/babel-%23000000.svg?style=for-the-badge&logo=babel)
![axios](https://img.shields.io/badge/axios-%23000000.svg?style=for-the-badge&logo=axios)

## Project Overview
<a id='project-overview'></a>
<strong>Goal: </strong> Create a seamless UI for the product & reviews section of an e-commerce landing page.
<p>
  The challenges for this project revolved around creating reusable components to keep code quantity low while maintaining high code quality. Some of the reused components included - star ratings (to visualize overall ratings), bar ratings (to visualize bar ratings), characteristic forms, etc.
</p>
<p>
  Another challenge was to create an <strong>infinite scrolling feature</strong>, which i created and optimized using a custom throttle hook. The throttle hook reduced the 'infinite' nature of this feature, reducing total calculations by 98%.
</p>

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- ROADMAP -->

## Roadmap to Highlight feature
<a id='roadmap'><a/>
- [x] Fork repo from <a href='https://github.com/Revenge-of-the-SithQL/atelier'>project repo </a>
- [x] Reinstall dependencies/remove code that isn't mine
- [x] Refactor utility functions to connect to my own <a href='https://github.com/hr-titan/sk-reviews'>server</a>
- [x] Refactor and optimize code 


<p align="right"><a href="#readme-top">back to top</a></p>
