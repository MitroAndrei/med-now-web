import useAuth from "../core/useAuth";
import SearchBar from "./components/search_patients/SearchBar";
import SearchPatients from "./components/search_patients/SearchPatients";
import {getDatabase, onChildAdded, ref} from "firebase/database";
import {useState} from "react";
import PrescriptionPage from "./components/drag_and_drop/PrescriptionPage";

export function MainPage() {

    const {user,logOut} = useAuth()
    const [patients, setPatients] = useState([]);
    const db = getDatabase();
    const patientsRef = ref(db, 'patients');
    const treatmentsRef = ref(db, 'treatments');
    const [selectedPatient, setSelectedPatient] = useState(null);



    return (
        <div>
            <h1>Main Page</h1>
            <h2>Welcome {user?.email}</h2>
            <SearchPatients selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>

            {selectedPatient &&
                <PrescriptionPage patient={selectedPatient} patientsRef={db}/>
            }
            <button onClick={logOut}>Logout</button>
        </div>
    )
}