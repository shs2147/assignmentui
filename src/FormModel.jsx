import React, { useEffect, useState } from 'react';
import "../src/FormModel.css"
import axios from 'axios'; 
import "../src/Component/SignUpCss.css"

const MyForm = ({isModalOpen, setIsModalOpen, setNewData, editData, editable, setEditable}) => {
    const [incident, setIncident] = useState({
        incidentId:!editable ? "" : editData.incidentId,
        identifier:'',
        reporterName:'',
        incidentPriority:'',
        incidentStatus:'',
        emailId:''
    })
    const [userData, setUserData] = useState({
        userName: '',
        emailId: '',
        phoneNumber: '',
        address: '',
        pinCode: '',
        city: '',
        country: '',
        password: ''
    });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("username"));
    // console.log(editData);
    axios.get(`http://localhost:8080/incident/list/${user}`)
      .then(response => {
        // console.log(response.data)
        setUserData(prevState => ({
            ...prevState, ...response.data[0].userData
        }))
        setIncident(prevState => ({
            ...prevState, emailId : response.data[0].userData.emailId, reporterName :  response.data[0].reporterName,
        }));

        if(editable){
            setIncident(prevState => ({
                ...prevState, emailId : response.data[0].userData.emailId, reporterName :  response.data[0].reporterName,
                identifier:editData.identifier, incidentPriority : editData.incidentPriority, incidentStatus: editData.incidentStatus
            }))
        }
        
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setIncident(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNewData(false);
    // console.log(incident);
    setIsModalOpen(false);
    setEditable(false);
    axios.post('http://localhost:8080/incident/createIncident', incident).then((res)=>{
        console.log("Post data", res.data);
        setNewData(true);

    }).catch((err)=>{
       console.log(err);
    })
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditable(false);
  };

  function handleEditForm (e){
    e.preventDefault();
    setEditable(false);
    console.log("Edit Form", incident)
    axios.put('http://localhost:8080/incident/update', incident).then(()=>{
        console.log("Form submit");
        setNewData(true);
        setIsModalOpen(false);
    }).catch((err)=>{
        console.log(err)
    })
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="form-container">
            <h2>New Incident</h2>
            <form onSubmit={editable ? handleEditForm : handleFormSubmit}>
            <div className="form-group">
                    <label className='label' >Identifiers</label>
                    <div className="radio-group">
                    <div className='radio'>
                    <label>Government</label>
                    <input type="radio" name='identifier' value={"Government"} checked={incident.identifier === "Government" } onChange={handleChange}   />
                    </div>
                    <div className='radio'>
                        <label htmlFor="enterprise"> Enterprise</label>
                        <input type="radio" name='identifier' id='enterprise' value={"Enterprise"} checked={incident.identifier === "Enterprise"} onChange={handleChange}  />
                    </div>
                    </div>
            </div>
            <div className="form-group">
                    <label className='label'>Reporter Name</label>
                    <input type="text" name="reporterName" value={userData.userName}  placeholder="Reporter Name" disabled />
            </div>
            <div className="form-group">
                  <label className='label'>Incident Priority</label>
                  <select
                    name="incidentPriority"
                    onChange={handleChange}
                    value={incident.incidentPriority}
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    {/* Add more options as needed */}
                  </select>
            </div>
            <div className="form-group">
                  <label className='label'>Incident Status</label>
                  <select
                    name="incidentStatus"
                    onChange={handleChange}
                    value={incident.incidentStatus}
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                    <option value="In-process">In-process</option>
                    {/* Add more options as needed */}
                  </select>
            </div>
                <div className="form-group">
                    <label className='label'>Username</label>
                    <input type="text" name="userName" value={userData.userName}  placeholder="Username" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>Email Id</label>
                    <input type="email" name="emailId" value={userData.emailId}  placeholder="Email" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={userData.phoneNumber}  placeholder="Phone Number" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>Address</label>
                    <input type="text" name="address" value={userData.address}  placeholder="Address" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>Pin Code</label>
                    <input type="text" name="pinCode" value={userData.pinCode}  placeholder="Pin Code" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>City</label>
                    <input type="text" name="city" value={userData.city}  placeholder="City" required disabled/>
                </div>
                <div className="form-group">
                <label className='label'>Country</label>
                    <input type="text" name="country" value={userData.country}  placeholder="Country" required disabled/>
                </div>
                <div className="form-group">
                    <button type="submit">Create Incident</button>
                </div>
            </form>

        </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyForm;
