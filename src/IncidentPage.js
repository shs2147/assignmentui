// src/components/IncidentPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../src/incidentPage.css"
import MyForm from './FormModel';

const IncidentPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState(false);
  const [editData, setEditData] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("username"));
    console.log(user)
    axios.get(`http://localhost:8080/incident/list/${user}`)
      .then(response => {
        console.log(response.data)
        setIncidents(response.data);
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });
  }, [newData]);

  function handleUser(){
    setIsModalOpen(true);
  }

  function handleEditIncident(data){
    setIsModalOpen(true);
    setEditData(data);
    setEditable(true);
  }

  return (
    <div>
      <div className='top'>
        <div></div>
        <div><h2>Incident Management Page</h2></div>
        <div><button className='btn' onClick={handleUser} >Create New Incident</button></div>
      </div>

      {isModalOpen && <MyForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setNewData={setNewData} editData={editData} editable={editable} setEditable={setEditable}  />}

      <table className="styled-table">
      <thead>
        <tr>
          <th>Incident ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>IncidentPriority</th>
          <th>IncidentReportDate</th>
          <th>Identifier</th>
          <th>IncidentStatus</th>
          <th>ReporterName</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {incidents && incidents.map((incident) => {
          const dateTimeString = incident.incidentReportDate; // Example date-time string
          const date = new Date(dateTimeString);
          
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
          const day = date.getDate();
          
          const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
          
          // console.log(formattedDate); // Output: 2022-05-10

         return  <tr key={incident.incidentId}>
            <td>{incident.incidentId}</td>
            <td>{incident.userData.userName}</td>
            <td>{incident.userData.emailId}</td>
            <td>{incident.userData.phoneNumber}</td>
            <td>{incident.userData.address}</td>
            <td>{incident.incidentPriority}</td>
            <td>{formattedDate}</td>
            <td>{incident.identifier}</td>
            <td>{incident.incidentStatus}</td>
            <td>{incident.reporterName}</td>
            {incident.incidentStatus.toLowerCase() !== "close" ? <td onClick={()=>{handleEditIncident(incident)}} style={{fontWeight:"bold", cursor:"pointer"}}>Edit</td> : <td style={{fontWeight:"bold", cursor:"not-allowed"}}>Edit</td>}
          </tr>
        })}
      </tbody>
    </table>
      
    </div>
  );
};

export default IncidentPage;
