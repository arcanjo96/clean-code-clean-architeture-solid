interface Coupon {
    code: string;
    mode: 'PERCENTAGE' | 'ABSOLUTE';
    value: number;
}

export { Coupon };