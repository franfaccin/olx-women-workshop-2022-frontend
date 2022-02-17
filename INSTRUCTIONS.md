# OLX Women Workshop - Frontend

## Requirements

- [Node v13+](https://nodejs.org/en/)
- NPM v6.14+ (Automatically installed with Node)
- [Docker (Desktop for Mac/Windows, Engine for Linux)](https://www.docker.com/get-started)
- Your terminal of choice
- Your favorite text editor, we recommend [VS Code](https://code.visualstudio.com) for this workshop

## Development

### Initial Setup

We'll start by using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) to quickly bootstrap our single-page application:

```sh
npx create-react-app mini-olx-frontend
```

and move to the newly created folder

```sh
cd mini-olx-frontend
```

<!-- TODO EXPLAIN FOLDER STRUCTURE -->

At the root of the project, let's create a `.env` file to hold our project variables. This will come in hand later. You can read more about it [here](- https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env).

```sh
REACT_APP_API_BASE="http://localhost:4040"
```

Now run

```sh
npm start
```

and you can see your application running at [http://localhost:3000/](http://localhost:3000/).

<!-- TODO SCREENSHOT OF BOILERPLATE -->

### First steps

Let's clean the React boilerplate in `App.js`.

```diff
-import logo from './logo.svg';
-import './App.css';

// rest of the code ...

  return (
    <div className="App">
      <header className="App-header">
+        <h1>Mini OLX</h1>
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
      </header>
    </div>
```

and let's also clean up the `App.css` file of the styles we don't need and add some new.

```diff
.App {
+  max-width: 1200px;
+  padding: 0 16px 16px;
+  margin: auto;
-  text-align: center;
-}

-.App-logo {
-  height: 40vmin;
-  pointer-events: none;
-}
-
-@media (prefers-reduced-motion: no-preference) {
-  .App-logo {
-    animation: App-logo-spin infinite 20s linear;
-  }
-}
-
.App-header {
+  text-align: center;
-  background-color: #282c34;
-  min-height: 100vh;
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  font-size: calc(10px + 2vmin);
-  color: white;
}
-
-.App-link {
-  color: #61dafb;
-}
-
-@keyframes App-logo-spin {
-  from {
-    transform: rotate(0deg);
-  }
-  to {
-    transform: rotate(360deg);
-  }
-}
```

<!-- TODO SCREENSHOT AFTER CLEANUP -->

## Posting Form

Let's create our posting form.

Create a folder `components` and inside it a another one called `PostingForm`. Inside the last one, create 2 documents: `PostingForm.jsx` and `PostingForm.css`. Your folder structure now should looks like this:

<!-- TODO FOLDER TREE -->

Now, on `PostingForm.jsx` add the following content:

<!-- TODO REMOVE onPostAdd CALLBACK -->

```jsx
import React, { useRef } from "react";
import config from "../../config";
import "./PostingForm.css";

const PostingForm = (props) => {
  const { onPostAdd = () => {} } = props;
  const formRef = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch(config.api_base, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        onPostAdd();
        formRef.current.reset();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleOnSubmit} className="form__posting" ref={formRef}>
      <h2>Post New Ad</h2>
      <label htmlFor="title">
        Title:
        <input id="title" name="title" type="text" />
      </label>
      <label htmlFor="price">
        Price:
        <input id="price" type="number" name="price" step="0.01" />
      </label>
      <label htmlFor="description">
        Description:
        <textarea id="description" name="description" />
      </label>
      <label htmlFor="ad_image">
        Image:
        <input id="ad_image" name="ad_image" type="file" />
      </label>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostingForm;
```

And on `PostingForm.css` add:

```css
.form__posting label {
  display: block;
  margin-top: 8px;
}

.form__posting button {
  margin: 8px 0;
}
```

And let's add our Posting Form to our page:

```diff
import "./App.css"
+import PostingForm from "./components/PostingForm/PostingForm";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mini OLX</h1>
      </header>
+      <main>
+        <PostingForm />
+      </main>
    </div>
  );
}

```

Now it should be looking something like this:

<!-- TODO SCREENSHOT POSTING FORM UGLY -->

### Ads listing

Now let's show all the ads we have created so far. Let's start by fetching our ads. On `App.js` let's add a function to fetch our ads from the backend:

```diff
import "./App.css";
import PostingForm from "./components/PostingForm/PostingForm";
+import Ads from "./components/Ads/Ads";
+import { useState, useEffect } from "react";

function App() {
+  const [ads, setAds] = useState([]);
+
+  const fetchAllAds = () => {
+    fetch(config.api_ads)
+      .then((res) => res.json())
+      .then((response) => setAds(response.data))
+      .catch((err) => console.error(err));
+  };
+
+  useEffect(() => {
+    fetchAllAds();
+  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mini OLX</h1>
      </header>
      <main>
        <PostingForm />
+       <hr />
+       <Ads ads={ads}/>
      </main>
    </div>
  );
}
```
