# storyteq-assessment-fe
#### Choices and ideas:
This project was built in Vue 3 (Typescript), 
along with Composition API and Pinia for the store.

More about Pinia: https://pinia.vuejs.org/introduction.html

NaiveUI is a Typescript compatible component library that is made specifically for Vue 3, it was used mainly for some extra styling purposes in this app.

More about NaiveUI: https://www.naiveui.com/en-US/os-theme

The application didn't require routing, below is the followed folder structure within ./src:
* "views" folder: Holds the big components that are basically the views/pages in the application.
* "store" folder: Where all the stores are defined.
* "components" folder: Holds all the reusable small components.
* "types" folder: Usually this one is in Utils folder, but this application is quite small so there was no need for a utils folder.
* "data" folder: Holds the static data that was provided in the assignment.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```
