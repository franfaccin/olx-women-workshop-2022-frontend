import React, { useRef } from "react";
import config from "../../config";
import "./PostingForm.css";

const PostingForm = (props) => {
  const { onPostAdd = () => {} } = props;
  const formRef = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch(config.api_ads, {
      method: "POST",
      // headers: { "Content-Type": "form-data" },
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