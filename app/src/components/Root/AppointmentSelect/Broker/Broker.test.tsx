import { screen, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Broker from "./Broker";

import {Details} from '../AppointmentSelect'
import { AppointmentDetailsContext } from "../../../../Context/AppointmentDetailsContext";

const testBroker = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
}

const testAppointmentDetails: Details = {
  appointment: {
    brokerId: 1, date: "24/11/2021", id: 1
  },
  broker: {
    id: 1, name: "bob",
  }
}

const mockedShowAppointmentDetails = jest.fn()
const mockedSetAppointmentDetails = jest.fn()



describe("Broker Component", () => {
  test("should hide and show appointments on button click", () => {
    render(
      <AppointmentDetailsContext.Provider value={{appointmentDetails: testAppointmentDetails, setAppointmentDetails: mockedSetAppointmentDetails}}>
        <Broker broker={testBroker} showAppointmentDetails={mockedShowAppointmentDetails}/>
      </AppointmentDetailsContext.Provider>
    );

    const appointmentDate = screen.getByText("24/11/2021")
    const brokerName = screen.getByText(/bob/)
    expect(brokerName).toBeInTheDocument()
    expect(appointmentDate).toBeInTheDocument()

    expect(brokerName).toHaveStyle('color: #41ccb7')
    expect(appointmentDate).toHaveStyle('color: #41ccb7')

    const appointments = screen.getAllByTestId("broker-appointment")
    expect(appointments).toHaveLength(1)
    
    const hideButton = screen.getByRole('button', {name: /hide appointments/i})
    fireEvent.click(hideButton)
    screen.getByRole('button', {name: /show appointments/i})
    expect(appointmentDate).not.toBeInTheDocument()
  });
});
