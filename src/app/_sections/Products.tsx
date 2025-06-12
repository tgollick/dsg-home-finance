import {
  LucidePackageSearch,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";

const Products = () => {
  // Alternative 1: Statistics cards showing your reach
  const stats = [
    { number: "50+", label: "Lenders", icon: Building2 },
    { number: "10,000+", label: "Products", icon: TrendingUp },
    { number: "100%", label: "Market Coverage", icon: Award },
  ];

  // Alternative 2: Feature highlights instead of logos
  const features = [
    {
      icon: Building2,
      title: "Major Banks",
      description: "All major high street banks",
    },
    {
      icon: Users,
      title: "Specialist Lenders",
      description: "Niche and specialist providers",
    },
    {
      icon: Shield,
      title: "Building Societies",
      description: "Traditional building societies",
    },
    {
      icon: TrendingUp,
      title: "Online Lenders",
      description: "Modern digital-first lenders",
    },
    { icon: Clock, title: "Fast Track", description: "Quick decision lenders" },
    { icon: Award, title: "Premium", description: "Exclusive rate providers" },
  ];

  return (
    <div className="w-full flex items-center justify-center bg-[#1e1e1e] border-none">
      <section className="w-full max-w-[1400px] pb-20 pt-56 sm:pt-48 md:pt-42 lg:pt-36 xl:pt-32 px-6 flex flex-col items-center text-center md:gap-10 gap-8">
        <div className="w-full max-w-[800px] text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight mb-6">
            With over 10,000+ Products Available
          </h2>
          <p className="text-sm sm:text-base font-sans">
            Here at DSG Home Finance, we are whole-of-market Mortgage Advisors.
            We do the mortgage comparisons and find a good deal for you. With
            access to over 50 lenders and thousands of products, you can be
            confident you are getting the right deal for you.
          </p>
        </div>

        {/* Option 1: Statistics Display */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-[#F49FB7] mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Option 2: Lender Categories Grid */}
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-serif text-white mb-6">
            Our Lender Network Includes:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-6 h-6 text-[#F49FB7] mb-2" />
                <div className="text-sm font-medium text-white mb-1">
                  {feature.title}
                </div>
                <div className="text-xs text-white/70 text-center">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CTAButton
          route={"/mortgages"}
          text={"Find your perfect product"}
          icon={<LucidePackageSearch />}
          textColor={"text-white"}
          bgColor={"bg-[#F49FB7]"}
          hoverColor={"hover:bg-[#f582a2]"}
        />
      </section>
    </div>
  );
};

export default Products;
