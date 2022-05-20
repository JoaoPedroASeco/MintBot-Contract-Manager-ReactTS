import { useState } from "react"
import { Header } from './components/Header'
import { Home } from './pages/Home/Home'

import { MetaMaskInpageProvider } from "@metamask/providers";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import BlockchainContextProvider from "./contexts/BlockchainContexts";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export const App = () => {

  return (
      <BlockchainContextProvider>
        <Header />
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BlockchainContextProvider>
  )
}