const Container = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      {children}
    </div>
  )
}

export default Container;