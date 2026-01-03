import { motion } from "framer-motion";
import { Heart, Shield } from "lucide-react";

function AdminFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-t bg-white dark:bg-gray-950 py-4 px-6 mt-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1"
        >
          © {new Date().getFullYear()} ShopHub Admin. Made with{" "}
          <Heart className="w-4 h-4 text-red-500 animate-pulse inline" /> by Ramesh Gharami
        </motion.p>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure Admin Panel</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default AdminFooter;
