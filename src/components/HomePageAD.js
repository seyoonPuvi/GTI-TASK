import React from "react";

const HomePageAD = () => {
  return (
    <div className="flex-grow mb-10 hidden xl:block">
      <img
        src="https://web-images.credcdn.in/v2/_next/assets/images/landing/datasafe.png"
        alt="secure-icon"
        className="h-14 w-20 object-contain object-center m-auto"
      />
      <h3 className="text-white   md:text-md xl:text-2xl font-mono text-center mt-4">
        your data isn't our business. keeping it safe is.
      </h3>
      <div className="ad-desc font-extrabold  md:text-2xl lg:text-2xl xl:text-5xl 2xl:text-6xl mt-3">
        all your personal data and <br />
        transactions are encrypted and <br />
        secured. there's no room for mistakes <br />
        because we didn't leave any.
      </div>
    </div>
  );
};

export default HomePageAD;
