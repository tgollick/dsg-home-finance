import { motion } from "framer-motion";
import { redirect, usePathname } from "next/navigation";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Mortgages", href: "/mortgages" },
  { name: "Protection", href: "/protection" },
  { name: "About Us", href: "/about" },
  { name: "Privacy Policy", href: "/privacy" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MobileNav() {
  const pathname = usePathname();
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#1e1e1e] bg-opacity-[0.98] z-[1000] wave-background"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <nav className="flex flex-col items-center space-y-10 text-white font-serif">
        {menuItems.map((item, index) => {
          const activeClass =
            pathname === item.href &&
            " font-bold text-[#F49FB7] hover:text-[#f281a4]";

          return (
            <motion.a
              key={index}
              href={item.href}
              className={`text-4xl hover:text-gray-200 transition-colors${activeClass}`}
              variants={itemVariants}
            >
              {item.name}
            </motion.a>
          );
        })}
        <motion.div variants={itemVariants}>
          <Button
            key="cta"
            onClick={() => redirect("/contact")}
            className="w-auto bg-[#F49FB7] text-white hover:bg-[#f281a4] transition text-4xl px-10 py-8 gap-4 rounded-full"
          >
            Book a Call
          </Button>
        </motion.div>
      </nav>
    </motion.div>
  );
}
