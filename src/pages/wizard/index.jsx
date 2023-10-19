// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'

const FormWizard = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h6'>Linear Stepper with Validation</Typography>
            </Grid>
            <Grid item xs={12}>
                <StepperLinearWithValidation />
            </Grid>

        </Grid>
    )
}

export default FormWizard
