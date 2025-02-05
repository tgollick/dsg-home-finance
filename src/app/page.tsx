import NavBar from "@/components/NavBar";
import Hero from "./_sections/Hero";
import Products from "./_sections/Products";
import Testimonials from "./_sections/Testimonials";
import PopularProducts from "./_sections/PopularProducts";

export default async function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <NavBar />
      <Hero />
      <Products />
      <Testimonials />
      <PopularProducts />
    </main>
  );
}
