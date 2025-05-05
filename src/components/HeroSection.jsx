import PersonCat from "../assets/image/Person-cat.png";

function HeroSection () {
    return(
      <>
        <section className='flex flex-col items-center justify-evenly h-274.5  px-6 mt-5 mx-auto 
                            sm:flex-row sm:justify-between sm:h-100
                            lg:h-132 lg:max-w-300 '>
          <div className='sm:w-[28%] sm:flex sm:flex-col
                          lg:gap-6' >
            <h1 className='text-4xl leading-12 text-center font-bold 
                          sm:text-2xl sm:text-end sm:leading-[30px]
                          lg:text-[49px]  lg:leading-[55px]'
                          >Stay Informed,<br/> Stay Inspired</h1>
            <p className='text-[16px] text-center text-[#75716B] p-5
                          sm:text-end 
                          '>Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</p>
          </div>
          <img className='h-auto sm:w-[30%]' src={PersonCat}/>
          <div className='sm:w-[35%] sm:h-[284px]
                          lg:w-[28%]'>
              <h6 className='text-[12px] text-[#75716B]'>-Author</h6>
              <h5 className='text-[24px] pb-[12px] font-bold
                            sm:-text[]'>Thompson P.</h5>
              <p className='text-[14px] text-[#75716B]
                            sm:text-[13px]
                            lg:text-[16px]'>I am a pet enthusiast and freelance writer who specializes in animal behavior and care.
                With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.<br/><br/>
                When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes
              </p>
            </div>
        </section>
      </>
    )
  }
  export default HeroSection