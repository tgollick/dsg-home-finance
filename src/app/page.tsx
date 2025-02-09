import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import Products from "./_sections/Products";
import Testimonials from "./_sections/Testimonials";
import PopularProducts from "./_sections/PopularProducts";
import OtherServices from "./_sections/OtherServices";
import { BlogSection } from "./_sections/Blogs";
import { Footer } from "./_sections/components/Footer";

export default async function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <NavBar />
      <Hero />
      <Products />
      <Testimonials />
      <PopularProducts />
      <OtherServices />
      <BlogSection />
      <Footer />
    </main>
  );
}
