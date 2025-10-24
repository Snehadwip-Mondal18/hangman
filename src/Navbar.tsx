import logo from './assets/logo.png'

const Navbar = () => {
  return (
    <>
        <div style={{
            width: "full",
            backgroundColor: "rgba(1, 0, 0, 0.2)",
            padding: "1rem 0 1rem 2rem",
            marginBottom: "1rem"
        }}>
            <img src={logo} alt="logo" 
            style={{
                width: "full",
                height: "5rem",
                borderRadius: "50%"
            }} />
        </div>
    </>
  )
}

export default Navbar