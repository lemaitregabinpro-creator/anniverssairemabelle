
import React from 'react';
import { Photo } from '../types';

interface PolaroidProps {
  photo: Photo;
  index: number;
}

const Polaroid: React.FC<PolaroidProps> = ({ photo, index }) => {
  return (
    <div 
      className="relative group transition-all duration-1000 ease-out"
      style={{ 
        transform: `rotate(${photo.rotation}deg)`,
      }}
    >
      <div className="bg-white p-3 md:p-5 pb-12 md:pb-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group-hover:shadow-[0_45px_80px_-20px_rgba(0,0,0,0.25)] transition-all duration-700 origin-bottom group-hover:-translate-y-4">
        {/* Ruban Washi tape translucide */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur-sm rotate-[1deg] z-10 border border-white/20"></div>
        
        <div className="relative overflow-hidden aspect-[4/5] bg-[#fafafa]">
          <img 
            src={photo.url} 
            alt={photo.caption} 
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />
          {/* Grain et reflet photo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none"></div>
        </div>
        
        <div className="mt-6 md:mt-10 px-2">
          <p className="font-romantic text-[#3d312d] text-center text-3xl md:text-4xl leading-tight opacity-90 group-hover:opacity-100 transition-opacity">
            {photo.caption}
          </p>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-8 h-[1px] bg-[#3d312d]"></div>
        </div>
      </div>
    </div>
  );
};

export default Polaroid;
