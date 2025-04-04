import Product from "../../_sections/components/Product";
import FirstTimeBuyer from "../../../../public/FirstTimeBuyer.jpg";
import Remortgage from "../../../../public/Remortgage.jpg";
import BuyToLet from "../../../../public/BuyToLet.jpg";
import { LucideHouse } from "lucide-react";
import CTAButton from "@/components/CTAButton";

const PopularProducts = () => {
  return (
    <div
      id="popular-products"
      className="border-none w-full flex items-center justify-center bg-white text-black"
    >
      <section className="pb-20 pt-56 sm:pt-48 md:pt-42 lg:pt-36 xl:pt-32 px-6 w-full max-w-[1400px] flex flex-col items-center gap-8">
        <div className="text-black text-center w-full max-w-[800px]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4">
            Popular Products
          </h2>
          <p className="text-sm sm:text-base font-sans">
            We offer a comprehensive range of products designed to suit
            virtually any need or situation. However, some options stand out as
            favorites among our clients. Below, you will find an overview of the
            most popular products we provide, tailored to meet diverse
            requirements.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
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
        <CTAButton
          route={"/mortgages"}
          text={"Explore Mortgage Products"}
          icon={<LucideHouse />}
          textColor={"text-[#F49FB7]"}
          bgColor={"bg-[#1e1e1e]"}
          hoverColor={"hover:bg-black"}
        />
      </section>
    </div>
  );
};

export default PopularProducts;
