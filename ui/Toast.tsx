import { FC, ReactNode, useEffect, useRef } from "react"
import SolidPlus from "../icons/SolidPlus"

export type ToastDurations = "short" | "sticky"
export type ToastTypes = "success" | "error"

export type ToastProps = {
  message: string
  button?: ReactNode
  type?: ToastTypes
  duration?: ToastDurations
  onClose?: () => void
}

const Toast: FC<ToastProps> = ({
  message,
  button,
  type = "success",
  duration = "short",
  onClose,
}) => {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (duration === "sticky") return

    const timer = setTimeout(() => onCloseRef.current?.(), 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [duration])
  return (
    <div
      className={`flex rounded-8 p-3 mb-2 relative w-full items-center justify-center text-button transition-transform duration-300`}
      style={{ backgroundColor: `${type === "success" ? "green" : "red"}` }}
    >
      {onClose && (
        <div
          className="absolute cursor-pointer"
          style={{
            top: 5,
            right: 7,
            width: 13,
            height: 13,
          }}
          onClick={onClose}
        >
          <SolidPlus style={{ transform: "rotate(45deg)" }} />
        </div>
      )}
      <div className="flex space-x-4 items-center">
        <div className="bold">{message}</div>
        {button}
      </div>
    </div>
  )
}

export default Toast
