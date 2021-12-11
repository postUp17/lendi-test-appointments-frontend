import {useState, useEffect, useContext} from 'react'
import axios from "axios";
import styled from "styled-components";

import Broker from "./Broker";
import { AppointmentDetailsContext } from '../../../Context/AppointmentDetailsContext';

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

const AppointmentDetails = styled.div`
  margin-top: 10px;
`;

type BrokerAppointments = {
  id: number;
  name: string;
  appointments: { id: number; brokerId: number; date: string }[];
}[];

type Broker = {
	id: number;
	name: string;
};

type Appointment = {
	id: number;
	brokerId: number;
	date: string;
};

export type Details = {
	broker: Broker;
	appointment: Appointment;
}

const AppointmentSelect = () => { 
  const [brokers, setBrokers] = useState<BrokerAppointments>([])
	const [hiddenBrokers, setHiddenBrokers] = useState<number[] >([])
	// const [appointmentDetails, setAppointmentDetails] = useState<Details | null>(null)

	const context = useContext(AppointmentDetailsContext)
	const {appointmentDetails, setAppointmentDetails} = context

	const fetchBrokers = async() => {
		try {
			const {data: brokersData}: {data: Broker[]}  = await axios.get("http://localhost:8080/brokers")
			const {data: appointmentsData} : {data: Appointment[] } = await axios.get("http://localhost:8080/appointments")

			const brokersAppointments: BrokerAppointments = []

			brokersData.forEach(bk => {
			 const appointments: { id: number; brokerId: number; date: string }[] =	appointmentsData.filter(app => bk.id === app.brokerId)
			 const brokerAppointments = {
				 id: bk.id,
				 name: bk.name,
				 appointments,
			 }
			 brokersAppointments.push(brokerAppointments)
			})
		
			setBrokers(brokersAppointments)
		} catch (err) {
			console.log(err);
		}
		
	}

	useEffect(() => {
		fetchBrokers()
	}, [])

	const handleShowHide = (brokerId: number) => {
    const isCurrentlyHidden = hiddenBrokers.includes(brokerId)

    const newHiddenBrokers = isCurrentlyHidden
      ? hiddenBrokers.filter(id => id !== brokerId)
      : hiddenBrokers.concat(brokerId)

    setHiddenBrokers(newHiddenBrokers)
  }

	const showAppointmentDetails = (brokerId: number, appointmentId: number) => {
		for (const bk of brokers) {
			for (const app of bk.appointments) {
				if (bk.id === brokerId && app.id === appointmentId) {
					setAppointmentDetails({
						broker: {
							id: bk.id,
							name: bk.name
						},
						appointment: {
							id: app.id,
							brokerId: app.brokerId,
							date: app.date
						}
					})
				}
			}
		}
	}

  return (
    <Wrapper>
      <SideBar>
        <Heading>Brokers</Heading>
       	{brokers.length > 0 ? <ul>
					{brokers.map(broker => 
						<li key={broker.id} >
							<Broker 
								broker={broker} 
								handleShowHide={handleShowHide} 
								hiddenBrokers={hiddenBrokers}
								showAppointmentDetails={showAppointmentDetails}
								appointmentDetails={appointmentDetails}
							/> 
						</li>)}
        </ul> : <div>No broker available</div>}
        
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
				<AppointmentDetails>
					{appointmentDetails === null ? 
						<div>Click on an appointment date to view the details</div> 
						: 
						<>
							<div>Broker: {appointmentDetails?.broker.name}</div>
							<div>Date: {appointmentDetails?.appointment.date}</div>
						</>
					}
				
				</AppointmentDetails>
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
