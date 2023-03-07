import React from 'react'

const Card = ({bg, title, description, profile, size}) => {
  return (
    
   <div className='basis-3/4'>
        {/* Banner */}
        <div className='h-60 flex w-full'>
            <img src={bg} className="rounded-t-[1rem] object-cover w-full"/>
        </div>
        <div className='bg-[#292b2f] relative h-[10rem] pl-[1rem] rounded-b-[1rem]'>
         {/* Title */}
        <p className='pt-4 text-white font-bold '>{title}</p>
        {/* Description */}
        {/* <p className='text-white/70 font-medium'>{description}</p> */}
        {/* Size */}
        {/* <p className=' pt-1 text-white/70 text-[12px]'>{size}</p> */}
        </div>
    </div>
  );
};

export default Card