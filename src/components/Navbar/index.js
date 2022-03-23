function Navbar({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage('planets')}>Planets</button>
      <button onClick={() => setPage('peoples')}>Peoples</button>
    </nav>
  );
}

export default Navbar;
