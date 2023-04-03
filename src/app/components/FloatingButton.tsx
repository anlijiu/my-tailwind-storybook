import { IconButton } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentType, MouseEventHandler } from "react";

export type FloatingButtonProps = {
  icon: ComponentType;
  onClick: MouseEventHandler;
};

export const FloatingButton = (props) => {
  const {icon: Icon, onClick} = props;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ bottom: '0.5rem', opacity: 0 }}
        exit={{ bottom: '0.5rem', opacity: 0 }}
        animate={{ bottom: '3rem', opacity: 1 }}
      >
        <IconButton
          size="lg"
          color="white"
          className="rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={onClick}
        >
          <Icon className="h-5 w-5" />
        </IconButton>
      </motion.div>
    </AnimatePresence>

  )
}

export default FloatingButton;
