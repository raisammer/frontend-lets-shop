const Loading =()=>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div div className="bg-white p-8 rounded shadow-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="ml-4">Loading...</p>
          </div>
        </div>
        </div>
    )
}

export default Loading;