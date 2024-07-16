# BMW email template

This repository is a baseline for the BMW email development.

## Prerequisites

You would need to have `node.js` and `npm` installed.

## Installation

```shell
npm install
```

## Run the build

To run the application run **gulp watch** command and it will generate dist folder in the repo and preview the html in this url http://localhost:4000/

To build the package run **gulp prod** command it will generate the dist folder with all the platform specific packages. 

Source folder structure

```
MY_BMW_EMAIL_PROJECT/
│
├── source/
│   ├── BE-[Ticket number(Project code mentioned in wrike)]
│     ├── images
│     ├── index.html
│
...
