import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const CustomToast = ({
  message = "",
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  // Render toast in body using portal
  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CustomToast;
