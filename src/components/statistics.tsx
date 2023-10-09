export default function Statistics() {
    return (

        <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
          <div className="p-4 bg-white rounded-lg md:p-8">
              <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">73M+</dt>
                  <dd className="text-secondary ">Developers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">100M+</dt>
                  <dd className="text-secondary ">repositories</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">1000s</dt>
                  <dd className="text-secondary ">projects</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">1B+</dt>
                  <dd className="text-secondary ">Contributors</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">90+</dt>
                  <dd className="text-secondary ">companies</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold text-secondary">4M+</dt>
                  <dd className="text-secondary">Organizations</dd>
                </div>
              </dl>
            </div>
        </div>
      );
}