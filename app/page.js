"use client";

import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="homepage">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
