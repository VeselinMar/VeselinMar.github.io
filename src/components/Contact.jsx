import React, { useRef } from 'react';
import { sendEmail } from '../utils/sendEmail';

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail(
      form,
      () => {
        alert('Thank you for the message, I will come back to you as soon as possible!');
        form.current.reset();
      },
      () => {
        alert('Failed to send message. Please try again.');
      }
    );
  };

  return (
    <div id='contact' className='flex min-h-screen w-full flex-col items-center justify-center gap-16 p-8'>
      <h1 className='text-center text-6xl font-light text-teal-600'>
        Get in Touch
      </h1>

      <form
        ref={form}
        onSubmit={handleSubmit}
        className='flex w-full max-w-md flex-col gap-8 rounded-lg p-6 md:max-w-lg lg:max-w-xl'
      >
        <div className='flex flex-col gap-4'>
          <input
            name='user_name'
            type='text'
            placeholder='Your Name'
            required
            className='rounded-lg border-2 border-teal-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-teal-50 focus:ring-2 focus:ring-teal-500'
          />
          
          <input
            name='user_email'
            type='email'
            placeholder='Your Email'
            required
            className='rounded-lg border-2 border-teal-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-teal-50 focus:ring-2 focus:ring-teal-500'
          />
        </div>

        <textarea
          name='message'
          placeholder='Your Message'
          required
          className='rounded-lg border-2 border-teal-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-teal-50 focus:ring-2 focus:ring-teal-500'
        ></textarea>

        <button
          type='submit'
          className='rounded-lg border-2 border-teal-400 bg-teal-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-600'
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
