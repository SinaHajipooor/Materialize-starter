// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import TableServerSide from 'src/views/table/data-grid/TableServerSide'

import { apiFetchAllActivityHistories } from 'src/api/activityHistories/apiActivityHistories'
import useActivityIndex from 'src/hooks/activity-history/useActivityIndex'


const DataGrid = ({ activityHistories }) => {

    const { data } = useActivityIndex(activityHistories)

    return (
        <Grid item xs={12}>
            <TableServerSide activityHistories={data} />
        </Grid>
    )
}

export default DataGrid


export async function getStaticProps() {

    const data = await apiFetchAllActivityHistories()

    return {
        props: {
            activityHistories: data
        },
        revalidate: 10
    }
}

