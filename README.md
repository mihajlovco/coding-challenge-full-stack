# Welcome!

Welcome to Webiny Coding Challenge for the Full-Stack Developer role!

This repo provides everything you need to immediately start working on the problem at hand. The goal of this task is not to intimidate you with weird algorithm tasks, but to see how you approach a real world problem, which resembles things we work with at Webiny, on a daily basis.

## Setup

Out of the box, you get a React app setup, with `webpack`, Typescript, and React Fast Refresh for better DX. You also get the most basic `express` app setup, with `nodemon` and `ts-node`. Feel free to add more utilities and tweak the configs to match your normal workflow.

- Clone the repo.
- Run `yarn` to install dependencies.
- Run `yarn start` to start both the React app and the API.
- Alternatively, you can `cd` into `api` or `app` folders, and run `yarn start` there, to start apps individually.

## The Task

We'd like you to build a very simple file manager app.

**Required Features**:

- Configure your GraphQL client of choice (Apollo, urql, whatever you're comfortable with)
- Build a simple UI using [Material UI](https://mui.com/getting-started/usage/). You don't need to design or style anything, just grab the components from the library, and put them together the way you see fit.
- We need the ability to upload images, edit their name, and delete them.
- Implement an `/upload` API endpoint to handle file uploads (store files locally in a folder of your own choice), and a `/graphql` API endpoint to handle the basic queries/mutations to power the React UI.
- For every uploaded image, generate a thumbnail, which will be used in the UI to display the list of images.

**Bonus Features**:

These are optional features, it would be great if you managed to tackle any of these if the time allows, or you're just interested in doing them, but they're **not** mandatory:

- Handle non-image file types (these won't have a thumbnail, so be creative about the solution)
- A simple "filter by name" capability (using the GraphQL API and an input field)
- come up with an improvement of your own? ;)

## Notes

- The tasks described above are not super detailed. Use your imagination, experience, common sense, and industry best practices, to make a usable application.
- You don't need a database, feel free to use something as simple as a JSON file to persist file related information. Worst case scenario, use a simple array to store data objects. It is `ok` that they don't persist between app restarts.
- Feel free to use _any_ npm library you need to build the app.
- There's no time constraint for this task. Build something you'll enjoy talking to us about, and spend as much or as little time as you can or want.

---

Good luck and have fun!

<img src="https://raw.githubusercontent.com/webiny/webiny-js/69590bb13945dac9ecb19a058536b8cd1ec793b3/static/webiny-logo.svg" width="130">

## App documentation

Full preview of the app
<img src="./app/src/images/readme-docs/webiny-app.png">

#### Image upload

You can upload one image using the image form.

#### Edit and remove images

To edit or remove image click on the "more" icon located in the right bottom corner of the image.
<img src="./app/src/images/readme-docs/edit-remove.png">

#### Image API

Implemented one API image endpoint to retrieve the original image size or thumbnail.

Example:
Original image
http://localhost:3000/image/7b07d4b4-9a31-4e2f-a80b-228add397d41.jpeg

Thumbnail image
http://localhost:3000/image/7b07d4b4-9a31-4e2f-a80b-228add397d41.jpeg?size=thumbnail

#### Search

Basic search filter by name is implemented
<img src="./app/src/images/readme-docs/search.png">

#### Database info

It's a simple typescript file with an array of images. Will not keep the data after the server restart.
