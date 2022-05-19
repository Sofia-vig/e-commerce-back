import * as qs from "qs";

/**
 * @param toEmail string
 * @param product
 * @returns Promise<any>
 */
export const sendEmailToUser = async (
  toEmail: string,
  product
): Promise<any> => {
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

/**
 * @param product
 * @returns Promise<any>
 */
export const sendInternEmail = async (product): Promise<any> => {
  const params = qs.stringify(
    {
      apiKey: process.env.ELASTIC_EMAIL_APIKEY,
      from: "sofiavign@gmail.com",
      fromName: "E-Commerce (My products)",
      subject: "La venta de tu producto se ha realizado con exito!",
      to: "sofiavign@gmail.com",
      bodyHtml: `
          <h3>Se ha vendido el producto: ${product.name}</h3>
          <p>E-commerce</p>`,
    },
    { addQueryPrefix: true }
  );

  const url = "https://api.elasticemail.com/v2/email/send" + params;
  return fetch(url);
};

/**
 * @param email string
 * @param code number
 * @returns Promise<any>
 */
export const sendCodeEmail = async (
  email: string,
  code: number
): Promise<any> => {
  const params = qs.stringify(
    {
      apiKey: process.env.ELASTIC_EMAIL_APIKEY,
      from: "sofiavign@gmail.com",
      fromName: "E-Commerce",
      subject: "Code",
      to: email,
      bodyHtml: `
            <h3>Tu codigo para ingresar es: <strong>${code}</strong></h3>
            <p>E-commerce</p>`,
    },
    { addQueryPrefix: true }
  );

  const url = "https://api.elasticemail.com/v2/email/send" + params;
  return fetch(url);
};
