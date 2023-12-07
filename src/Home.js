import React,{useEffect,useState} from "react";
import axios from 'axios';

function Home(){
    const [doctors,setDoctors]=useState([]);
    const [selectedDoctor,setSelectedDoctor]=useState('');
    const [filteredPatients,setFilteredPatients]=useState([]);
    const [doctorNotFound,setDoctorNotFound]=useState(false);

useEffect(()=>{
    axios.get('http://13.51.86.49:5000/doctors')
    .then((response)=>{
        setDoctors(response.data);
    })
    .catch((error)=>{
        console.error('error feching docator data :',error);
    });
    // for patients Api
    axios.get('http://13.51.86.49:5000/patients')
    .then((response)=>{
        setFilteredPatients(response.data);
    })
    .catch((error)=>{
        console.error('error feching patient data :',error);
    });    
},[]);

    const handleDoctorSelect=(e)=>{
        const selectedDoctor=e.target.value;
        setSelectedDoctor(selectedDoctor);

        const filteredPatientsForDoctor=filteredPatients.filter((patient)=> patient.doctor === selectedDoctor);
        if(filteredPatientsForDoctor.length===0){
            // no patient found for the selected doctors
            setDoctorNotFound(true);
        }
        else{
            setDoctorNotFound(false);
        }
        setFilteredPatients(filteredPatientsForDoctor);
    };

    return(
        <div className="App">
            <h1>Home</h1>
            <div>
                <label htmlFor="doctorDropdown">select a Doctor:</label>
                <select id="doctorDropdown" onChange={handleDoctorSelect}>
                    <option value=''>All Doctors</option>
                    {doctors.map((doctor)=>(
                        <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                    ))}
                </select>

            </div>
            {doctorNotFound ?(
                <p>NO patient found for the selected Doctor</p>
            ):( 
                <div>
                    <h2>Patients List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Weight</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Disease</th>
                                <th>Doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient)=>(
                                <tr key={patient.id}>
                                    <td>{patient.name} </td>
                                    <td>{patient.Weight}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.disease}</td>
                                    <td>{patient.doctor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );

}
export default Home;