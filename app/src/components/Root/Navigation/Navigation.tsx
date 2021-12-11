import React, {useContext} from "react";
import styled from "styled-components";
import { AppointmentDetailsContext } from "../../../Context/AppointmentDetailsContext";

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

const Navigation = () => {
  const context = useContext(AppointmentDetailsContext)
  const { appointmentDetails } = context

  return (
    <Wrapper>
      {
        appointmentDetails !== null ?  
          <strong>
          {`Currently selected appointment: ${appointmentDetails?.appointment.date} with ${appointmentDetails?.broker.name}`}
          </strong> 
          : 
          <strong>No selected appointment.</strong>
      }
     
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
