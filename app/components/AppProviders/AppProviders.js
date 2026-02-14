"use client";

import { ContactModalProvider } from "../../context/ContactModalContext";
import ContactModal from "../ContactModal/ContactModal";

export default function AppProviders({ children }) {
  return (
    <ContactModalProvider>
      {children}
      <ContactModal />
    </ContactModalProvider>
  );
}
