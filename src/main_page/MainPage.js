import useAuth from "../core/useAuth";
import SearchPatients from "./components/search_patients/SearchPatients";
import {useState} from "react";
import PrescriptionPage from "./components/drag_and_drop/PrescriptionPage";
import PatientPage from "./components/patient_page/PatientPage";
import {Button} from "@mui/material";

export function MainPage() {

    const {user, logOut} = useAuth()
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPrescription, setShowPrescription] = useState(false);

    function changeView() {
        setShowPrescription(!showPrescription);
    }

    return (
        <div style={{position: 'relative', padding: '20px'}}>
            <Button
                variant="contained"
                color="error"
                style={{position: 'absolute', top: '20px', right: '20px'}}
                onClick={logOut}
            >
                Logout
            </Button>


            {selectedPatient ?
                (showPrescription ?
                        <PrescriptionPage patient={selectedPatient} changeView={changeView}/>
                        :
                        <>
                            <h1 style={{margin: '20px 0'}}>Clinic Name</h1>
                            <SearchPatients selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
                            <PatientPage patient={selectedPatient} changeView={changeView}></PatientPage>)
                        </>
                ) : (
                    <>
                        <h1 style={{margin: '20px 0'}}>Clinic Name</h1>
                        <SearchPatients selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
                    </>
                )
            }
        </div>
    )
}