import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppointmentDetailsContext } from "../../../../Context/AppointmentDetailsContext";
import {Details} from '../AppointmentSelect'

const Title = styled.div`
  margin-bottom: 5px;
  padding-left: 10px;
`;

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
  showAppointmentDetails: (brokerId: number, appointmentId: number) => void;
}

const Broker = (props: BrokerProps) => {
  const { broker, showAppointmentDetails, } = props
  const context = useContext(AppointmentDetailsContext)
  const { appointmentDetails } = context
  const [isHidden, setIsHidden] = useState(false)
  const { name, appointments } = broker

  const handleHidden = () => {
    setIsHidden(prev => !prev)
  } 

  return (
    <li>
      <div style={broker.id === appointmentDetails?.broker.id ? {color: '#41ccb7', marginBottom: '5px'} : {marginBottom: '5px'}}>{name}</div>
      <Title>Appointments:</Title>
      {appointments.length !== 0 &&    
        <button style={{cursor: 'pointer', margin: '10px 5px', paddingLeft: '5px'}} onClick={handleHidden}>
          {`${isHidden ? "Show" : "Hide" } appointments`}
        </button>
      }

      <ul>
      {appointments.length === 0 && <li>No appointment</li>}
      {!isHidden && appointments.map(app => 
        <li 
          key={app.id} 
          style={app.id === appointmentDetails?.appointment.id ? {cursor: 'pointer', color: '#41ccb7'} : {cursor: 'pointer'}} 
          onClick={() => showAppointmentDetails(broker.id, app.id)}>
            {app.date}
        </li>)}
      </ul>
    </li>
  );
};

export default Broker;
