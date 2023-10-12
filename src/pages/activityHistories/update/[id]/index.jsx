// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import { useRouter } from 'next/router'
import useActivityDetails from '../../hooks/useActivityDetails'
import Spinner from 'src/components/Spinner'
import UpdateActivityHistory from '../components/UpdateActivityHistory'
import { apiShowActivityHistory } from 'src/api/activityHistories/apiActivityHistories'

const UpdateForm = ({ activityHistory }) => {
    //     const router = useRouter()
    //     const id = router.query.id
    //     const { isLoading, activityHistory } = useActivityDetails(id)

    //     return (
    //         <Grid item xs={12}>
    //             {isLoading ? <Spinner /> : <UpdateActivityHistory activityHistory={activityHistory} />}
    //         </Grid>
    //     )


    return (
        <Grid item xs={12}>
            <UpdateActivityHistory activityHistory={activityHistory} />
        </Grid>
    )

}

export default UpdateForm


export async function getServerSideProps(context) {
    // extract activity id
    const { params } = context;
    const activityId = params.id;

    // get activity details 
    const data = await apiShowActivityHistory(activityId);

    return {
        props: {
            activityHistory: data
        }
    }
}