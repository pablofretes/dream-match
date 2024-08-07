export default function TeamsSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4 max-w-2xl mx-auto">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
