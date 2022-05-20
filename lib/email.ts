import * as qs from "qs";
import once from "lodash/once";

/**
 * @param toEmail string
 * @param product
 * @description Send an email to buyer
 * @returns Promise<any>
 */
const sendEmailToUser = async (toEmail: string, product): Promise<any> => {
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
export const sendEmailToUserOnce = once(sendEmailToUser);

/**
 * @param product
 * @description Send an email to seller
 * @returns Promise<any>
 */
const sendInternEmail = async (product): Promise<any> => {
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
export const sendInternEmailOnce = once(sendInternEmail);

/**
 * @param email string
 * @param code number
 * @description Send email with a code to user
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
      subject: code,
      to: email,
      bodyHtml: `
            <h3>Tu codigo para ingresar es: ${code}</h3>
            <p>E-commerce</p>`,
    },
    { addQueryPrefix: true }
  );

  const url = "https://api.elasticemail.com/v2/email/send" + params;
  return fetch(url);
};
