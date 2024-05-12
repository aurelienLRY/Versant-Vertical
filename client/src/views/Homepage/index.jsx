import React from "react";
import "./homepage.scss";
import Login from "../../components/login";

function HomePage() {
  return (
    <main className="homePage">
      <Login isConnect={() => console.log( 'connecté')} />
    </main>
  );
}

export default HomePage;
