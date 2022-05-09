import axios from "axios";

const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: process.env["TEXT_LOCAL_API_KEY"],
    sender: process.env["TEXT_LOCAL_SENDER"],
  },
});

export const sendBillRecept = (user: { phone: any[]; name: string }) => {
  if (user && user.phone && user.name) {
    const params = new URLSearchParams();
    const numbers: any = user.phone;
    params.append("numbers", numbers);
    params.append("message", `Hi hello welcome`);
    tlClient.post("/send", params);
  }
};
