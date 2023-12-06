// 06/12/2023

import React,{useState,useEffect} from "react";
import axios from "axios";
import PatientsForm from "./PatientForm";
import PatientList from "./PatientList";

function Patient() {
    const [Patients,setPatients]=useState([]);
    
    const handleAddPatient=(newPatient)=>{

        axios.post('http://localhost:5000/patients',newPatient)
        .then((response)=>{
            setPatients([...Patients,response.data]);
        })
        .catch((error)=>{
            console.error('error adding data',error);
        });

    };

    useEffect(()=>{
        axios.get('http://localhost:5000/patients')
        .then((response)=>{
            setPatients(response.data);
        })
        .catch((error)=>{
            console.error('error fetching data ',error);
        });

    },[]);

    const handleDeletePatient=(PatientId)=>{
        axios.delete(`http://localhost:5000/patients/${PatientId}`)
        .then(()=>{
            const updatedPatients=Patient.filter((Patient)=>Patient.id !== PatientId);
            setPatients(updatedPatients);

            localStorage.setItem('Patients',JSON.stringify(updatedPatients));
        })
        .catch((error)=>{
            console.error('error in deletind Pa',error);
        });
    };

    const handleEditPatient=(editedPatient)=>{
        axios.put(`http://localhost:5000/Patients/${editedPatient.id}`,editedPatient)

        .then(()=>{
            const updatedPatients=Patients.map((Patient)=>
            Patient.id=== editedPatient.id ?editedPatient:Patient
            );
            setPatients(updatedPatients);

            localStorage.setItem('Patients',JSON.stringify(updatedPatients));

        })
        .catch((error)=>{
            console.error('error in updateing  the Patients',error);
        });

    };
    return(
        <div className="App">
            <h1>Patient</h1>
            <PatientsForm onAdd={handleAddPatient}/>
            <PatientList Patients={Patients} onDelete={handleDeletePatient} onEdit={handleEditPatient} />
        </div>
    );


};
export default Patient;
