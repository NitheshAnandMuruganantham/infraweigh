import { toast } from "react-toastify";

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(result: {
  amount: number;
  order_id: string;
  currency: string;
  name?: string;
  mail?: string;
  phone?: string;
}) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("something went wrong");
    return;
  }

  const { amount, order_id, currency } = result;

  const options = {
    key: import.meta.env["VITE_RAZORPAY_ID"],
    amount: `${amount * 100}`,
    method: "upi",
    currency: currency,
    name: "INFRAWEIGH TECHNOLOGIES",
    
    image:"https://imfraweigh-brand-kit.s3.ap-south-1.amazonaws.com/logo.png",
    order_id: order_id,
    prefill: {
      name: result.name,
      email: result.mail,
      contact: result.phone,
    },
    theme: {
      color: "#1976d2",
    },
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
