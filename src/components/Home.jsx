import React from 'react';
import image from '../../public/profile-image.png';
import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin } from 'react-icons/bi';

const Home = () => {
  return (
    <div id='home' className='flex min-h-screen
    w-full items-center justify-center
    gap-8 p-5 text-center'>
      
      <div className='flex flex-col items-center
      justify-center gap-8 p-5 text-center'>

        <img src={image} alt='' className='w-[250px]
        sm:w-[300px] rounded-full'/>

        <div className='space-y-1 sm:space-y-3'>
          <h1 className='bg-gradient-to-r
          from-teal-400 to-teal-600 bg-clip-text
          text-4xl font-semibold text-transparent
          md:text-5xl lg:text-6xl
          '>
            Veselin Martinov
          </h1>

          <h3 className='bg-gradient-to-r
          from-teal-400 to-teal-600 bg-clip-text
          text-xl font-semibold text-transparent
          md:text-2xl lg:text-3xl
          '>
            Employee of the month
          </h3>

          <p classname='max-w-[500px] text-sm
          text-gray-500
          '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Esse iusto ab in ipsam, porro odio quo dolorem reiciendis recusandae, 
            molestias officiis obcaecati vero ex sed facere? Placeat inventore excepturi molestiae!</p>
        </div>

        <div className="flex gap-3">
          <a
            href="https://github.com/VeselinMar"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 md:h-12 md:w-12
                      cursor-pointer rounded-full border-2
                      border-transparent bg-teal-600 p-2
                      text-white transition-all duration-200
                      hover:scale-110 hover:border-teal-600
                      hover:bg-white hover:text-teal-600"
          >
            <BiLogoGithub className="h-full w-full" />
          </a>
          <BiLogoLinkedin className='h-10 w-10
          cursor-pointer rounded-full border-2
          border-transparent bg-teal-600 p-2
          text-white transition-all duration-200
          hover:scale-110 hover:border-teal-600
          hover:bg-white hover:text-teal-600 md:h-12
          md:w-12
          '/>
          <a
            href="https://www.instagram.com/veselinmartinov/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 md:h-12 md:w-12
                      cursor-pointer rounded-full border-2
                      border-transparent bg-teal-600 p-2
                      text-white transition-all duration-200
                      hover:scale-110 hover:border-teal-600
                      hover:bg-white hover:text-teal-600"
          >
            <BiLogoInstagram className="h-full w-full" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
