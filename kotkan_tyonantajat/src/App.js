import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Employers = ({employers}) => {

	return (
		<div>
		  {employers.map(employer => <div key={employer.nimi}>{employer.nimi} {employer.maara}</div>)}
		</div>
	)
}

const App = () => {
	const [employers, setEmployers] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:3001/tyonantajat')
			.then(response => {
				console.log('promise fulfilled')
				setEmployers(response.data)
			})
	}, [])

	return (
		<div>
		  <h1>Työnantajat</h1>
		  <Employers employers={employers} />
		</div>
	  );
}

export default App;
