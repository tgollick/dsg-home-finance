import whyDavid from "../../../../public/david3.webp";
import Image from "next/image";
import StatBox from "../_components/StatBox";
import { LucidePhone } from "lucide-react";
import CTAButton from "@/components/CTAButton";

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
      <section className="py-20 px-6 w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-24">
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
            className="aspect-auto h-full md:hidden mb-10 rounded-lg"
          />

          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            {stats.map((stat) => (
              <StatBox key={stat.title} {...stat} />
            ))}
          </div>

          <CTAButton
            route={"/contact"}
            text={"Let's Chat About Your Mortgage"}
            icon={<LucidePhone />}
            textColor={"text-white"}
            bgColor={"bg-[#F49FB7]"}
            hoverColor={"hover:bg-[#f17a9c]"}
          />
        </div>

        <Image
          src={whyDavid}
          alt="David Gollick owner of DSG Home Finance"
          width="1000"
          height="1000"
          className="aspect-auto w-[70%] hidden lg:block rounded-lg"
        />
      </section>
    </div>
  );
};

export default WhyDavid;
