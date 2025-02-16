import Image from "next/image";
import ProductCarousel from "../_components/ProductCarousel";

function ProtectionProducts() {
  return (
    <div className="w-full bg-white mx-auto">
      <section className="mx-auto px-6 py-14 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <Image
            src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Family gathering"
            className="object-cover w-full aspect-auto rounded-lg"
            width="1000"
            height="1000"
          />
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">
                Popular Products
              </h2>
              <p className="text-sm sm:text-base font-sans mb-4">
                These are the most popular and most important protection
                products to purchase alongside a mortgage to ensure protection
                in any future situations that can effect your income and ability
                to pay your mortgage.
              </p>
            </div>

            <ProductCarousel />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProtectionProducts;
