import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { getDatabase, ref, onChildAdded, off } from "firebase/database";

const SearchPatients = ({selectedPatient, setSelectedPatient}) => {
    const [results, setResults] = useState([]);

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const patientsRef = ref(db, 'patients');

        const handleNewPatient = (snapshot) => {
            const data = snapshot.val();
            setPatients((prev) => [...prev, data]);
        };

        onChildAdded(patientsRef, handleNewPatient);

        return () => {
            off(patientsRef, 'child_added', handleNewPatient);
        };
    }, []);

    const handleSearch = (searchTerm) => {
        // Mock search logic
        const results = patients.filter((patient) =>
            patient.lastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || patient.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()));
        console.log(results)
        setResults(results);
    };

    const handleSelect = (item) => {
        setSelectedPatient(item);
        setResults([]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={results} onSelect={handleSelect}/>
        </div>
    );
};

export default SearchPatients;
