import React from "react";

type Props = {};

const BottomContact = (props: Props) => {
  return (
    <section className="w-full max-w-[1400px] h-full mx-auto py-20 px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-4">
        What to Expect in Your First Chat
      </h2>
      <div className="w-full max-w-[700px]">
        <p className="text-sm sm:text-base font-sans mb-6">
          This initial call is simply a no-pressure conversation to understand
          your goals and give you a clear roadmap. You’ll need to share just two
          things:
        </p>
        <ul className="text-sm sm:text-base font-sans mb-6 font-bold list-decimal pl-6">
          <li>The rough price of the property you’re interested in.</li>
          <li>Your general household earnings (a ballpark figure is fine).</li>
        </ul>
        <p className="text-sm sm:text-base font-sans">
          We offer a comprehensive range of products designed to suit virtually
          any need or situation. However, some options stand out as favorites
          among our clients. Below, you will find an overview of the most
          popular products we provide, tailored to meet diverse requirements.
        </p>
      </div>
    </section>
  );
};

export default BottomContact;
