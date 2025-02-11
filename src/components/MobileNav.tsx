import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#1e1e1e] bg-opacity-90 z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <nav className="flex flex-col items-center space-y-8 text-white font-serif">
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="text-3xl hover:text-gray-200 transition-colors"
            variants={itemVariants}
          >
            {item.name}
          </motion.a>
        ))}
      </nav>
    </motion.div>
  );
}
