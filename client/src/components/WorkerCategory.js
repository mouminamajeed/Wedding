import React from "react";
import Header from './Header';
import Footer from './Footer';
import hiringCategories from "../data/hiringCategories";
import CategoryHolder from "./CategoryHolder";
import "../styles/workerCategory.css"; 

const workers = hiringCategories.map((category, i) => (
  <li className="category-list" key={i}>
    <CategoryHolder name={category.name} image={category.image} />
  </li>
));

const WorkerCategory = () => {
  return (
    <div >
      
      <div className="back-img"> <Header />
      <h1 className="name-heading">Who do you want to hire?</h1>
      <ul className="category-container">{workers}</ul>
      
    </div><Footer /></div>
  );
};

export default WorkerCategory;
