export function Logo() {
  return (
    <>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-fingerprint text-primary"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
        <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
        <path d="M12 11v2a14 14 0 0 0 2.5 8" />
        <path d="M8 15a18 18 0 0 0 1.8 6" />
        <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
      </svg> */}

          <div className="flex items-center justify-center">
            <img src="/assets/logoSena.png" alt="logo" width="36px" />
          </div>

          <h1 className="block text-2xl bolder">Centro Colombo alemán sede TIC</h1>

      {/* <h1 className=" tracking-widest font-bold self-center text-xl sm:text-2xl whitespace-nowrap text-secondary">
        PIA
      </h1> */}
    </>
  );
}
