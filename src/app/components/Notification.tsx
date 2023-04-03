import { useToaster } from "./toast/headless";
import { Transition } from "@headlessui/react";
import { Typography } from "@/components";

const getPositionStyle = (
  position: string,
  offset: number
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle: React.CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {};
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};
export const Notifications = () => {
  const toastPosition = 'top-center';
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        right: 8,
        bottom: 8,
        pointerEvents: 'none',
        zIndex: 9999
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
        });

        const positionStyle = getPositionStyle(toastPosition, offset);
        const ref = (el) => {
          if (el && typeof toast.height !== "number") {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };

        return (
          <div
            key={toast.id}
            ref={ref}
            style={positionStyle}
          >
            <Transition
              appear
              show={toast.visible}
              className="transform p-4 flex bg-white rounded shadow-lg"
              enter="transition-all duration-150"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <Typography variant="h4" color="blue-gray">
                {toast.message}
              </Typography>
            </Transition>
          </div>
        );
      })}
    </div>
  );
};


export default Notifications;
