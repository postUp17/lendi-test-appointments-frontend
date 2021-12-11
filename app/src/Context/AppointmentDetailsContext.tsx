import { createContext } from 'react'
import { Details } from '../components/Root/AppointmentSelect/AppointmentSelect'

interface Context {
    appointmentDetails: Details | null;
    setAppointmentDetails: (details: Details) => void
}

export const AppointmentDetailsContext = createContext<Context>({appointmentDetails: null,  setAppointmentDetails: () => {}})