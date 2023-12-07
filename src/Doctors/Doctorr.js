import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import DoctorForm from './Doctorform';
import DoctorList from './DoctorList'


function Doctorr() {
  const [doctors, setDoctors] = useState([]);

  const handleAddDoctor = (newDoctor) => {
    // Send a POST request to your JSON server to add a new doctor
    axios.post('http://13.51.86.49:5000/doctors', newDoctor)
      .then((response) => {
        // Update the React state with the newly created doctor
        setDoctors([...doctors, response.data]);
  
        // Update localStorage after adding
        const updatedDoctors = [...doctors, response.data];
        localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };
  
  useEffect(() => {
    axios.get('http://13.51.86.49:5000/Doctorr')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteDoctor = (doctorId) => {
    // Send a DELETE request to your JSON server to delete the doctor data
    axios.delete(`http://13.51.86.49:5000/Doctorr/${doctorId}`)
      .then(() => {
        // Remove the deleted doctor from the React state
        const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
        setDoctors(updatedDoctors);
  
        // Update localStorage after deleting
        localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  


  const handleEditDoctor = (editedDoctor) => {
    // Send a PUT request to your JSON server to update the doctor data
    axios.put(`http://13.51.86.49:5000/doctors/${editedDoctor.id}`, editedDoctor)
      .then(() => {
        // Update the React state with the edited doctor data
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === editedDoctor.id ? editedDoctor : doctor
        );
        setDoctors(updatedDoctors);
  
        // Update localStorage after editing
        localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };
  
  

  return (
    <div className="App">
      <h1>Doctor</h1>
      <DoctorForm onAdd={handleAddDoctor} />
      <DoctorList
        doctors={doctors}
        onDelete={handleDeleteDoctor}
        onEdit={handleEditDoctor}
      />
    </div>
  );
}

export default Doctorr;