"use client";
import Footer from "./(landing)/Footer";
import Header from "./(landing)/Header";
import Container from "./ui/Container";
import Hero from "./(landing)/Body/Hero";
import Offer from "./(landing)/Body/Offer";
import Services from "./(landing)/Body/Services";
import AboutUs from "./(landing)/Body/AboutUs";
import Join from "./(landing)/Body/Join";

export default function Home() {
  const SECTION_HEIGHT = "min-h-[calc(100vh-100px)]";

  return (
    <>
      <Header />
      <Container
        size={{ minHeight: SECTION_HEIGHT }}
        as="main"
      >
        <Hero />
        <Services />
        <Offer />
        <AboutUs />
        <Join />
      </Container>
      <Footer />
    </>
  );
}
