// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ShowActivityHistory from '../components/ShowActivityHistory'
import { useRouter } from 'next/router'
import useActivityDetails from '../../hooks/useActivityDetails'
import { CircularProgress } from '@mui/material'
import Spinner from 'src/components/Spinner'

const FormValidation = () => {
    const router = useRouter()
    const id = router.query.id
    const { isLoading, activityHistory } = useActivityDetails(id)

    return (
        <Grid item xs={12}>
            {isLoading ? <Spinner /> : <ShowActivityHistory activityHistory={activityHistory} />}
        </Grid>
    )
}

export default FormValidation
