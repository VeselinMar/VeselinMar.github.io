import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = (formRef, onSuccess, onError) => {
    
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.error("❌ EmailJS config missing in .env");
        return;
    }

  emailjs
    .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
    .then(
      (result) => {
        console.log('Email sent:', result.text);
        if (onSuccess) onSuccess();
      },
      (error) => {
        console.error('Error sending email:', error);
        if (onError) onError();
      }
    );
};