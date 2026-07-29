/**
 * Business rule constants shared across the application.
 * Centralising these eliminates magic numbers/strings scattered across files.
 */

/** Promo code that qualifies for a storewide discount. */
export const PROMO_CODE = 'AURA20';

/** Fractional discount rate applied when a valid promo code is used. */
export const PROMO_DISCOUNT_RATE = 0.2;

/** Tax rate applied to the discounted subtotal at checkout. */
export const TAX_RATE = 0.06;

/** Order total threshold (in Rs.) above which shipping becomes free. */
export const FREE_SHIPPING_THRESHOLD = 300;

/** Flat shipping cost applied when the order is below the free threshold (Rs.). */
export const SHIPPING_COST = 25;
