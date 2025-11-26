import { message, notification } from 'antd'

type ToastType = 'success' | 'error' | 'info' | 'warning'

type ToastOptions = {
  message: string
  description?: string
  duration?: number
  className?: string
}

type NotificationOptions = ToastOptions & {
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

export const toaster = {
  show: (type: ToastType, options: ToastOptions) => {
    const { message: content, duration = 3, className } = options
    message[type]({
      content,
      duration,
      className,
    })
  },

  success: (options: ToastOptions) => {
    toaster.show('success', options)
  },

  error: (options: ToastOptions) => {
    toaster.show('error', options)
  },

  info: (options: ToastOptions) => {
    toaster.show('info', options)
  },

  warning: (options: ToastOptions) => {
    toaster.show('warning', options)
  },

  notification: {
    success: (options: NotificationOptions) => {
      notification.success({
        message: options.message,
        description: options.description,
        duration: options.duration ?? 4.5,
        placement: options.placement ?? 'topRight',
        className: options.className,
      })
    },

    error: (options: NotificationOptions) => {
      notification.error({
        message: options.message,
        description: options.description,
        duration: options.duration ?? 4.5,
        placement: options.placement ?? 'topRight',
        className: options.className,
      })
    },

    info: (options: NotificationOptions) => {
      notification.info({
        message: options.message,
        description: options.description,
        duration: options.duration ?? 4.5,
        placement: options.placement ?? 'topRight',
        className: options.className,
      })
    },

    warning: (options: NotificationOptions) => {
      notification.warning({
        message: options.message,
        description: options.description,
        duration: options.duration ?? 4.5,
        placement: options.placement ?? 'topRight',
        className: options.className,
      })
    },
  },
}

export type { ToastOptions, NotificationOptions }

