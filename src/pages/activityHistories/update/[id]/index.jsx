// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import { useRouter } from 'next/router'
import useActivityDetails from '../../hooks/useActivityDetails'
import Spinner from 'src/components/Spinner'
import UpdateActivityHistory from '../components/UpdateActivityHistory'

const UpdateForm = () => {
    const router = useRouter()
    const id = router.query.id
    const { isLoading, activityHistory } = useActivityDetails(id)

    return (
        <Grid item xs={12}>
            {isLoading ? <Spinner /> : <UpdateActivityHistory activityHistory={activityHistory} />}
        </Grid>
    )
}

export default UpdateForm
