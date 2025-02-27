import { loadStripe } from "@stripe/stripe-js";

let stripePromise
const getStripe = () => {
    if (!stipePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

        return stripePromise
    }
}

export default getStripe