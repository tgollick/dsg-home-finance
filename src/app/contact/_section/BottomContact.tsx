import React from "react";

type Props = {};

const BottomContact = (props: Props) => {
  return (
    <section className="w-full max-w-[1400px] h-full mx-auto py-20 px-6 xl:pt-20 pt-[41rem]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">
        What to Expect in Your First Chat
      </h2>
      <div className="w-full max-w-[700px]">
        <p className="text-sm sm:text-base font-sans mb-6">
          This initial call is simply a no-pressure conversation to understand
          your goals and give you a clear roadmap. You'll need to share just two
          things:
        </p>
        <ul className="text-sm sm:text-base font-sans mb-6 font-bold list-decimal pl-6">
          <li>The rough price of the property you're interested in.</li>
          <li>Your general household earnings (a ballpark figure is fine).</li>
        </ul>
        <p className="text-sm sm:text-base font-sans mb-6">
          Our team is dedicated to providing personalized support throughout
          your journey. We understand that every client's needs are unique, and
          we are here to listen and guide you.
        </p>
        <p className="text-sm sm:text-base font-sans mb-6">
          Whether you're a first-time buyer or looking to invest, we offer
          tailored solutions that align with your financial goals. Our experts
          will help you navigate the options available to you.
        </p>
        <p className="text-sm sm:text-base font-sans">
          With our extensive knowledge of the market, we can provide insights
          and recommendations that empower you to make informed decisions. Your
          satisfaction is our priority, and we look forward to assisting you.
        </p>
      </div>
    </section>
  );
};

export default BottomContact;
