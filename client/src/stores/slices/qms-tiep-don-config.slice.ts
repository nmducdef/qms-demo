import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores/store'

interface QMSTiepDonConfigState {
  visibleClinicIds: string[]
  departmentName: string[]
  department: string
  roomsToShow: string
  roomsPerRow: string
  isConfigured: boolean
  patientsPerCard: number
  maxVisibleCards: number
}

const initialState: QMSTiepDonConfigState = {
  visibleClinicIds: [],
  departmentName: [],
  department: '',
  roomsToShow: '4',
  roomsPerRow: '2',
  isConfigured: false,
  patientsPerCard: 5,
  maxVisibleCards: 6
}

const qmsTiepDonConfigSlice = createSlice({
  name: 'qmsTiepDonConfig',
  initialState,
  reducers: {
    setPatientsPerCard: (state, action: PayloadAction<number>) => {
      state.patientsPerCard = action.payload
    },
    setMaxVisibleCards: (state, action: PayloadAction<number>) => {
      state.maxVisibleCards = action.payload
    },
    setConfiguration: (
      state,
      action: PayloadAction<{
        clinic: string[]
        departmentName: string[]
        department: string
        roomsToShow: string
        roomsPerRow: string
      }>
    ) => {
      state.visibleClinicIds = action.payload.clinic
      state.department = action.payload.department
      state.departmentName = action.payload.departmentName
      state.roomsToShow = action.payload.roomsToShow
      state.roomsPerRow = action.payload.roomsPerRow
      state.isConfigured = true
    },
    resetConfiguration: (state) => {
      state.visibleClinicIds = []
      state.department = ''
      state.departmentName = []
      state.roomsToShow = '4'
      state.roomsPerRow = '2'
      state.isConfigured = false
    }
  }
})

export const qmsTiepDonConfigReducer = qmsTiepDonConfigSlice.reducer
export const qmsTiepDonConfigActions = qmsTiepDonConfigSlice.actions

export const selectPatientsPerCard = (state: RootState) => state.qmsTiepDonConfig.patientsPerCard
export const selectMaxVisibleCards = (state: RootState) => state.qmsTiepDonConfig.maxVisibleCards
export const selectVisibleClinicIds = (state: RootState) => state.qmsTiepDonConfig.visibleClinicIds
export const selectDepartment = (state: RootState) => state.qmsTiepDonConfig.department
export const selectDepartmentName = (state: RootState) => state.qmsTiepDonConfig.departmentName
export const selectRoomsToShow = (state: RootState) => state.qmsTiepDonConfig.roomsToShow
export const selectRoomsPerRow = (state: RootState) => state.qmsTiepDonConfig.roomsPerRow
export const selectIsConfigured = (state: RootState) => state.qmsTiepDonConfig.isConfigured
export const selectQMSConfiguration = (state: RootState) => ({
  visibleClinicIds: state.qmsTiepDonConfig.visibleClinicIds,
  department: state.qmsTiepDonConfig.department,
  departmentName: state.qmsTiepDonConfig.departmentName,
  roomsToShow: state.qmsTiepDonConfig.roomsToShow,
  roomsPerRow: state.qmsTiepDonConfig.roomsPerRow,
  isConfigured: state.qmsTiepDonConfig.isConfigured
})
