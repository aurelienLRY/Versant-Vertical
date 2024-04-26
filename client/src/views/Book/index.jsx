import React from "react";
import FormBook from "../../features/formBook";

/* styles */
import "./book.scss";


/**
 * Renders the book page component.
 * @returns {JSX.Element} The book page component.
 */
function BookPage() {


  return <main>
    <h2>Reserver</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fugiat esse unde est aliquid. Neque voluptatibus, asperiores natus laborum unde eaque minus ducimus ad, ratione ipsam ab laboriosam necessitatibus aperiam.</p>

    <FormBook />

  </main>;
}

export default BookPage;
