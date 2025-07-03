import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/Home/HomePage'
import QMSThuNganPage from '@/pages/QMSThuNgan/QMSThuNganPage'
import QMSTiepDonConfigPage from '@/pages/QMSTiepDon/QMSTiepDonConfigPage'
import QMSTiepDonPage from '@/pages/QMSTiepDon/QMSTiepDonPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/qms-tiep-don-config' element={<QMSTiepDonConfigPage />} />
          <Route path='/qms-thu-ngan-config' element={<QMSTiepDonConfigPage />} />
          <Route path='/qms-thu-ngan' element={<QMSThuNganPage />} />
          <Route path='/qms-tiep-don' element={<QMSTiepDonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter
