import { qmsTiepDonConfigReducer } from '@/stores/slices/qms-tiep-don-config.slice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  qmsTiepDonConfig: qmsTiepDonConfigReducer
})

export default rootReducer
