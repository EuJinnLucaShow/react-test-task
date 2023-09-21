import { React } from "react";
import './SectionContainer.css'

function SectionContainer({ title, children }) {
  return (
    <section className="section__wrapper">
      <h2 className="section__title">{title}</h2>
      <div className="section__content">{children}</div>
    </section>
  );
}

export default SectionContainer;