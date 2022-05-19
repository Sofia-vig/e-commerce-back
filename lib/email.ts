import * as qs from "qs";

export const sendEmailToUser = async (toEmail, product) => {
  const params = qs.stringify(
    {
      apiKey: process.env.ELASTIC_EMAIL_APIKEY,
      from: "sofiavign@gmail.com",
      fromName: "E-Commerce",
      subject: "Pago realizado con exito!",
      to: toEmail,
      bodyHtml: `
        <h1>Su compra se ha realizado con exito</h1>
        <h3>Ha comprado el producto: ${product.name}</h3>
        <p>Le llegará el paquete dentro de 3 a 5 dias habiles</p>
        <h2>Gracias por su compra</h2>
        <p>E-commerce</p>`,
    },
    { addQueryPrefix: true }
  );

  const url = "https://api.elasticemail.com/v2/email/send" + params;
  return fetch(url);
};
