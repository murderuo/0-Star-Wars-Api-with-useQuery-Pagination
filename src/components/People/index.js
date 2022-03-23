const People = ({ people }) => {
  return (
    <>
      <div className="card">
        <h3>{people.name}</h3>
        <p>Hair Color-{people.hair_color}</p>
        <p>Skin Color- {people.skin_color}</p>
        <p>Gender-{people.gender}</p>
        <p>Birth year- {people.birth_year}</p>
      </div>
    </>
  );
};

export default People;
