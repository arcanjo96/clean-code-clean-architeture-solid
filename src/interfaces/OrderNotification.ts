interface OrderNotification {
    type: 'ERROR' | 'INFO',
    message: string,
}

export { OrderNotification }