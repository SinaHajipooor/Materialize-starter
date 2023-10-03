// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableBasic from 'src/views/table/data-grid/TableBasic'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import TableColumns from 'src/views/table/data-grid/TableColumns'
import TableEditable from 'src/views/table/data-grid/TableEditable'
import TableBasicSort from 'src/views/table/data-grid/TableBasicSort'
import TableSelection from 'src/views/table/data-grid/TableSelection'
import TableServerSide from 'src/views/table/data-grid/TableServerSide'
import useActivityIndex from './hooks/useActivityIndex'
import { CircularProgress } from '@mui/material'

const DataGrid = () => {

    const { isLoading, activityHistories } = useActivityIndex()

    return (
        isLoading ? <CircularProgress /> : <Grid container spacing={6}>
            <Grid item xs={12}>
                <TableServerSide activityHistories={activityHistories} />
            </Grid>
        </Grid>
    )
}

export default DataGrid
