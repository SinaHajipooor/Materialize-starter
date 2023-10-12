// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ShowActivityHistory from '../components/ShowActivityHistory'
import { useRouter } from 'next/router'
import useActivityDetails from '../../../../hooks/activity-history/useActivityDetails'
import Spinner from 'src/components/Spinner'
import { apiShowActivityHistory } from 'src/api/activityHistories/apiActivityHistories'

const FormValidation = ({ activityHistory }) => {
    //     const router = useRouter()
    //     const id = router.query.id
    //     const { isLoading, activityHistory } = useActivityDetails(id)

    //     return (
    //         <Grid item xs={12}>
    //             {isLoading ? <Spinner /> : <ShowActivityHistory activityHistory={activityHistory} />}
    //         </Grid>
    //     )

    return (
        <Grid item xs={12}>
            <ShowActivityHistory activityHistory={activityHistory} />
        </Grid>
    )
}

export default FormValidation;


export async function getServerSideProps(context) {
    //extract activity id 
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
