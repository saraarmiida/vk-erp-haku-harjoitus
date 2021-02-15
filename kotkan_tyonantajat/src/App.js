import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Employers = ({employers}) => {
	return (
		<tbody>
			{employers.map(employer => 
			<tr key={employer.nimi}>
				<td>{employer.nimi}</td>
				<td>{employer.maara}</td>
		  	</tr>)}
		</tbody>
	)
}

const Table = ({employers}) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Työnantaja</th>
						<th>Työntekijöiden määrä</th>
					</tr>
				</thead>
				<Employers employers={employers} />
			</table>
		</div>
	)
}

const App = () => {
	const [employers, setEmployers] = useState([])
	const [sortType, setSortType] = useState('atoz');

	// get data from data.json

	useEffect(() => {
		axios
			.get('http://localhost:3001/tyonantajat')
			.then(response => {
				console.log('promise fulfilled')
				setEmployers(response.data)
			})
	}, [])

	// sort data with the type defined in select
	// this part would be better if i had 4 different functions and one of them would be sent
	// as a parameter to sortArray, which would then look something like:

	// const sortArray = typeFunction => {
	// 	const sorted = [...employers].sort(typefunction(a,b))
	// 	setEmployers(sorted);
	//   };

	useEffect(() => {
		const atozEmployers = [...employers].sort((a, b) => a.nimi.localeCompare(b.nimi))
		const ztoaEmployers = [...employers].sort((a, b) => b.nimi.localeCompare(a.nimi))
		const bigfirstEmployers = [...employers].sort((a, b) => b.maara - a.maara)
		const smallfirstEmployers = [...employers].sort((a, b) => a.maara - b.maara)

		const sortArray = type => {
			if (type === 'atoz')
				setEmployers(atozEmployers);
			if (type === 'ztoa')
				setEmployers(ztoaEmployers);
			if (type === 'bigfirst')
				setEmployers(bigfirstEmployers);
			if (type === 'smallfirst')
				setEmployers(smallfirstEmployers);
		  };
	
		sortArray(sortType);
	}, [sortType]);

	return (
		<div>
		  <h1>Kotkan suurimmat työnantajat tammikuussa 2010</h1>
		  <select onChange={(e) => setSortType(e.target.value)}>
        	<option value="atoz">a - z</option>
        	<option value="ztoa">z - a</option>
        	<option value="bigfirst">suurimmasta pienimpään</option>
			<option value="smallfirst">pienimmästä suurimpaan</option>
		  </select>
		  <Table employers={employers} />
		</div>
	  );
}

export default App;
