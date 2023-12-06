// 04/12/2023
import React,{useState} from "react";

const DoctorForm=({onAdd})=>{
    const [fromData,setFromData]=useState({
        name:'',
        salary:'',
        gender:'',
        age:'',
        specialization:'',
    });

    const handleChange =(e)=>{
        const {name,value}=e.target;
        setFromData({...fromData,[name]:value});
    };



const handleSubmit=(e)=>{
    e.preventDefault();

    onAdd(fromData);

    setFromData({
        name:'',
        salary:'',
        gender:'',
        age:'',
        specialization:'',

    });
};

return(
    <form onSubmit={handleSubmit}> 
    <div>
    <label htmlFor="name">Enter the Name:</label>
    <input type="text" id='name' name="name" value={fromData.name} onChange={handleChange}/>
    </div>

    <div>
    <label htmlFor="salary">Enter the Salary:</label>
    <input type="text" id='salary' name="salary" value={fromData.salary} onChange={handleChange}/>
    </div>

    <div>
    <label htmlFor="gender">Enter the Gender:</label>
    <input type="text" id='gender' name="gender" value={fromData.gender} onChange={handleChange}/>
    </div>

    <div>
    <label htmlFor="age">Enter the Age:</label>
    <input type="text" id='age' name="age" value={fromData.age} onChange={handleChange}/>
    </div>

    <div>
    <label htmlFor="specialization">Enter the Specialization:</label>
    <input type="text" id='specialization' name="specialization" value={fromData.specialization} onChange={handleChange}/>
    </div>

    <button type="submit">Create</button>
    </form>


);
};
export default DoctorForm;