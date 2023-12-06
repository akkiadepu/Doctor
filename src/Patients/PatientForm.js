import React,{useEffect,useState} from "react";
import axios from "axios";

const PatientsForm=({onAdd})=>{
    const [formData,setFromData]=useState({
        name:'',
        weigth:'',
        gender:'',
        age:'',
        disese:'',
        doctor:'',
    });

    const [doctors,setDoctors]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/doctors')
        .then((response)=>{
            setDoctors(response.data);
        })
        .catch((error)=>{
            console.error('error fetching doctor',error);
        });
    },[]);

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFromData({...formData,[name]:value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        const newPatient={
            name:formData.name,
            weigth:formData.weigth,
            gender:formData.gender,
            age:formData.age,
            disese:formData.disese,
            doctor:formData.doctor,
        };

        axios.post('http://localhost:5000/patients',newPatient)
        .then((response)=>{
            onAdd(response.data);

            setFromData({
                name:'',
                weigth:'',
                gender:'',
                age:'',
                disese:'',
                doctor:'',
            });
        })
        .catch((error)=>{
            console.error('the error in adding patient data',error);
        });

    };

    return(
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Enter Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="weigth">Enter Weight:</label>
            <input type="text" id="weigth" name="weigth" value={formData.weigth} onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="gender">Enter Gender:</label>
            <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="age">Enter Age:</label>
            <input type="text" id="age" name="age" value={formData.age} onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="disese">Enter disese:</label>
            <input type="text" id="disese" name="disese" value={formData.disese} onChange={handleChange}/>
        </div>

        <div>
            <label htmlFor="doctor">Enter doctor:</label>
            {/* <input type="text" id="doctor" name="doctor" value={formData.doctor} onChange={handleChange}/> */}

            <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange}>
                <option value=''>select a doctor</option>
                {doctors.map((doctor)=>(
                    <option key={doctor.id} value={doctor.name}>
                        {doctor.name}
                    </option>
                ))}
            </select>
        </div>
            <button type="submit">Create</button>
        </form>
    );
};
export default PatientsForm;