const EventFilters = () => {
  return (
    <div className="flex flex-wrap px-5 md:px-0 lg:flex-nowrap justify-start items-start w-full">
      <div className="mb-8 lg:mb-11">
        <div>
          <div className="flex relative" data-headlessui-state="">
            <div className="flex-1 z-[8] md:z-10 flex items-center focus:outline-none">
              <button
                className="flex items-center justify-start lg:justify-between lg:px-6 md:px-6 px-32 py-2 text-sm rounded-full border border-neutral-300 hover:border-neutral-400 focus:outline-none"
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
              >
                <div className="flex px-9 justify-between items-center">
                  <span>All</span>
                  <i className="las la-angle-down ml-2"></i>
                </div>
                <div></div>
              </button>
            </div>
          </div>
          <span hidden="" style={{ position: 'fixed', top: '1px', left: '1px', width: '1px', height: '0', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0', display: 'none' }}></span>
        </div>
      </div>
      <div className="flex justify-between overflow-hidden lg:w-full pl-2">
        <div className="swiper mySwiper h-fit text-black select-none py-5 lg:w-full">
          <div className="swiper-wrapper">
            <div className="swiper-slide select-none inline-block text-center cursor-pointer rounded-full px-2 lg:px-3 py-2 text-white bg-gradient-to-r from-[#FF9650] to-[#FB426E]">
              <i className="las la-list-ul"></i> All
            </div>
            <div className="swiper-slide select-none inline-block text-center cursor-pointer rounded-full px-2 lg:px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out">
              <i className="las la-calendar-plus"></i> Tomorrow
            </div>
            <div className="swiper-slide select-none inline-block text-center cursor-pointer rounded-full px-2 lg:px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out">
              <i className="las la-hourglass-half"></i> This Week
            </div>
            <div className="swiper-slide select-none inline-block text-center cursor-pointer rounded-full px-2 lg:px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out">
              <i className="las la-calendar"></i> This Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;