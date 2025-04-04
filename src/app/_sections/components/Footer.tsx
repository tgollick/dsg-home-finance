import Link from "next/link";
import Image from "next/image";
import { LucidePhoneCall } from "lucide-react";
import dsgWhite from "../../../../public/dsg-logo-white.png";
import CTAButton from "@/components/CTAButton";

export function Footer() {
  return (
    <div className="w-full flex flex-col items-center bg-[#1e1e1e] relative">
      <div className="dot-background absolute inset-0 opacity-5" />
      <footer className="w-full max-w-[1400px] h-fit px-6 py-10 relative z-10">
        <div className="w-full space-y-8 sm:space-y-12 text-[#777777]">
          {/* Navigation and CTA Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-[#ffffff] text-xl font-serif">Company</h3>
              <nav className="flex flex-col space-y-2 font-sans">
                <Link
                  href="/"
                  className="text-sm hover:text-[#F49FB7] transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm hover:text-[#F49FB7] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-[#F49FB7] transition-colors"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-[#ffffff] text-xl font-serif">Services</h3>
              <nav className="flex flex-col space-y-2 font-sans">
                <Link
                  href="/mortgages"
                  className="text-sm hover:text-[#F49FB7] transition-colors"
                >
                  Mortgages
                </Link>
                <Link
                  href="/protection"
                  className="text-sm hover:text-[#F49FB7] transition-colors"
                >
                  Protection
                </Link>
              </nav>
            </div>
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-[#ffffff] text-xl font-serif">Contact</h3>
              <div className="space-y-2 font-sans">
                <p className="text-sm">139 Westbrook Avenue</p>
                <p className="text-sm">Margate, Kent</p>
                <p className="text-sm">CT9 5HH</p>
              </div>
            </div>
            {/* CTA Section */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <Image
                src={dsgWhite.src}
                alt="DSG Home Finance"
                width={140}
                height={80}
                className="w-auto h-24"
              />

              <CTAButton
                route={"/contact"}
                text={"Book a call with David"}
                icon={<LucidePhoneCall />}
                textColor={"text-white"}
                bgColor={"bg-[#F49FB7]"}
                hoverColor={"hover:bg-[#f281a4]"}
              />
            </div>
          </div>

          {/* Regulatory Information */}
          <div className="space-y-6 border-t border-[#333333] pt-8 font-sans">
            <div className="space-y-4 max-w-4xl">
              <p className="text-sm leading-relaxed font-semibold">
                Important Information: DSG Home Finance LTD is an Appointed
                Representative of Stonebridge Mortgage Solutions Ltd, which is
                authorised and regulated by the Financial Conduct Authority.
                Your home may be repossessed if you do not keep up repayments on
                your mortgage. As with all insurance policies, conditions and
                exclusions will apply.
              </p>
              <div className="space-y-2">
                <p className="text-sm leading-relaxed">
                  There may be a fee for arranging a mortgage this will
                  typically be £599 and is payable upon the completion of your
                  mortgage.
                </p>
                <p className="text-sm leading-relaxed text-destructive">
                  You may have to pay an early repayment charge to your existing
                  lender if you remortgage.
                </p>
                <p className="text-sm leading-relaxed">
                  Not all Buy to Let Mortgages are regulated by The Financial
                  Conduct Authority.{" "}
                  <Link
                    href="/privacy"
                    className="text-[#F49FB7] hover:text-[#f281a4] transition-colors underline"
                  >
                    Privacy & Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="space-y-1 text-[#777777]">
              <p className="text-xs">
                Registered Company Number: 11174596. Registered in England &
                Wales. FCA Number: 804140
              </p>
              <p className="text-xs">
                Registered Address: 139 Westbrook Avenue, Margate, Kent, CT9
                5HH, United Kingdom
              </p>
            </div>
          </div>

          {/* Copyright and Credits */}
          <div className="border-t border-[#333333] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#777777]">
              © {new Date().getFullYear()} DSG Home Finance. All rights
              reserved.
            </p>
            <p className="text-xs text-[#777777]">
              Designed and developed by{" "}
              <Link
                href="https://tgweb.com"
                className="text-[#F49FB7] hover:text-[#f281a4] transition-colors"
              >
                TGWeb
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
