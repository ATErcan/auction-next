const Container = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto my-10 p-2 xs:p-0">
      {children}
    </div>
  )
}

export default Container;