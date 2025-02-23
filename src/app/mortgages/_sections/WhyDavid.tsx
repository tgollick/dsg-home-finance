import whyDavid from "../../../../public/why-david.png";
import Image from "next/image";
import StatBox from "../_components/StatBox";
import { LucidePhone } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    value: "500+",
    title: "Happy Clients",
  },
  {
    value: "24/7",
    title: "Support",
  },
  {
    value: "20+",
    title: "Years Experience",
  },
];

const WhyDavid = () => {
  return (
    <div className="border-none w-full flex items-center justify-center bg-white text-black">
      <section className="py-20 px-6 w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-20">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-4">
            Why DSG?
          </h2>
          <p className="text-sm sm:text-base font-sans mb-4">
            I&apos;m David, and I&apos;ve spent the last 20 years helping people
            just like you find their perfect mortgage. I believe in keeping
            things simple, being transparent, and always putting your needs
            first.
          </p>
          <p className="text-sm sm:text-base font-sans mb-10">
            As your dedicated mortgage broker, I&apos;ll be with you throughout
            your entire journey &ndash; from our first chat to getting your
            keys. I have direct access to exclusive rates from leading lenders,
            but more importantly, I have the experience to know which mortgage
            will work best for your unique situation.
          </p>

          <Image
            src={whyDavid}
            alt="David Gollick owner of DSG Home Finance"
            width="1000"
            height="1000"
            className="aspect-auto h-full md:hidden mb-10"
          />

          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            {stats.map((stat) => (
              <StatBox key={stat.title} {...stat} />
            ))}
          </div>

          <Button className="w-full md:w-auto bg-[#F49FB7] text-white hover:bg-[#f17a9c] transition text-sm md:text-base font-sans">
            Lets Chat About Your Mortgage
            <LucidePhone />
          </Button>
        </div>

        <Image
          src={whyDavid}
          alt="David Gollick owner of DSG Home Finance"
          width="1000"
          height="1000"
          className="aspect-auto h-full hidden lg:block"
        />
      </section>
    </div>
  );
};

export default WhyDavid;
