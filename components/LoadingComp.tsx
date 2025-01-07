
const LoadingComp = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-colorPrimary bg-opacity-50 backdrop-blur-4xl z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-colorSecondary"></div>
    </div>
    )
}

export default LoadingComp;