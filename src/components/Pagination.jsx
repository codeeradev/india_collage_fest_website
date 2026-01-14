const Pagination = () => {
  return (
    <div className="flex my-8 justify-center items-center">
      <div>
        <ul className="flex items-center gap-4 select-none">
          <li>
            <button aria-label="prev" className="cursor-none text-xl leading-4 text-slate-900 h-6 w-6 flex items-center justify-center flex-col prev-next-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          </li>
          <li>
            <button aria-label="next" className="text-xl leading-4 text-slate-900 h-6 w-6 flex items-center justify-center flex-col prev-next-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div className="pagination-info pl-1">
        <p>1 to 8 of </p>
      </div>
    </div>
  );
};

export default Pagination;