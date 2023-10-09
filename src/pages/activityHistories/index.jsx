// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import TableServerSide from 'src/views/table/data-grid/TableServerSide'
import useActivityIndex from './hooks/useActivityIndex'
import Spinner from 'src/components/Spinner'

const DataGrid = () => {

    const { isLoading, activityHistories } = useActivityIndex()

    return (
        isLoading ? <Spinner /> : <Grid container spacing={6}>
            <Grid item xs={12}>
                <TableServerSide activityHistories={activityHistories} />
            </Grid>
        </Grid>
    )
}

export default DataGrid
