import { toast } from "sonner"
export class Toast {
      static success(message: string, option = {}) {
            return toast.success(message || "Operation successful", option)
      }

      static error(message: string, option = {}) {
            return toast.error(message || "Operation failed", option)
      }

      static loading(message: string, option = {}) {
            return toast.loading(message || "En cours", option)
      }

      // static warning(message: string, option = {}) {
      //       return toast.warn(message || "Operation warning", option)
      // }

      static info(message: any, option = {}) {
            return toast.info(message || "Operation info", option)
      }
}