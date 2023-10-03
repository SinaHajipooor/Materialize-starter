// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import FormValidationBasic from 'src/views/forms/form-validation/FormValidationBasic'
import FormValidationAsync from 'src/views/forms/form-validation/FormValidationAsync'
import FormValidationSchema from 'src/views/forms/form-validation/FormValidationSchema'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const FormValidation = () => {
    return (
        <DatePickerWrapper>
            <Grid item xs={12}>
                <FormValidationBasic />
            </Grid>
        </DatePickerWrapper>
    )
}

export default FormValidation
