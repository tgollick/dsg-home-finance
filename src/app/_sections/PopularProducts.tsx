import React from "react";
import Product from "./components/Product";
import FirstTimeBuyer from "../../../public/FirstTimeBuyer.jpg";
import Remortgage from "../../../public/Remortgage.jpg";
import BuyToLet from "../../../public/BuyToLet.jpg";
import { LucidePhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const PopularProducts = () => {
  return (
    <div className="w-full flex items-center justify-center bg-white text-black">
      <section className="py-14 px-6 w-full max-w-[1400px] flex flex-col items-center gap-8">
        <div className="text-black text-center w-full max-w-[800px]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4">
            Popular Products
          </h2>
          <p className="text-sm sm:text-base font-sans">
            We offer a comprehensive range of products designed to suit
            virtually any need or situation. However, some options stand out as
            favorites among our clients. Below, you’ll find an overview of the
            most popular products we provide, tailored to meet diverse
            requirements.
          </p>
        </div>

        <div className="w-full flex lg:flex-row flex-col items-center gap-6">
          <Product
            title={"Buy-To-Let"}
            img={BuyToLet}
            alt={"Photo of terraced houses."}
            content={
              "Whether you're a seasoned landlord or purchasing your first buy-to-let property, we offer a range of tailored solutions to meet your needs and goals."
            }
          />
          <Product
            title={"First Time Buyer"}
            img={FirstTimeBuyer}
            alt={"Phot of Family together with child on shoulders."}
            content={
              "Starting your journey on the property ladder? We offer tailored mortgage solutions to simplify the process and guide you every step of the way."
            }
          />
          <Product
            title={"Re-Mortgages"}
            img={Remortgage}
            alt={"Photo of backgarden of a house"}
            content={
              "Save money, switch deals, or release equity with tailored remortgage solutions designed to meet your goals, with our help every step of the way."
            }
          />
        </div>
        <Button className="w-full md:w-auto bg-[#F49FB7] text-black hover:bg-[#f281a4] transition text-sm md:text-base">
          Book a call with David
          <LucidePhoneCall />
        </Button>
      </section>
    </div>
  );
};

export default PopularProducts;
