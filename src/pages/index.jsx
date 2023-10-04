// // ** React Imports
// import { useEffect } from 'react'

// // ** Next Imports
// import { useRouter } from 'next/router'

// // ** Spinner Import
// import Spinner from 'src/@core/components/spinner'



// const Home = () => {

//     const router = useRouter();

//     useEffect(() => {
//         router.replace('/home');
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return <Spinner />;
// };

// export default Home;


// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmTable from 'src/views/dashboards/crm/CrmTable'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmMonthlyBudget from 'src/views/dashboards/crm/CrmMonthlyBudget'
import CrmExternalLinks from 'src/views/dashboards/crm/CrmExternalLinks'
import CrmMeetingSchedule from 'src/views/dashboards/crm/CrmMeetingSchedule'
import CrmSocialNetworkVisits from 'src/views/dashboards/crm/CrmSocialNetworkVisits'
import { Grow } from '@mui/material'

const Home = () => {
    return (
        <ApexChartWrapper>
            <Grid container spacing={7} className='match-height'>
                <Grow in timeout={1 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CardStatisticsVertical
                            stats='155k'
                            color='primary'
                            trendNumber='+22%'
                            title='Total Orders'
                            chipText='Last 4 Month'
                            icon={<Icon icon='mdi:cart-plus' />}
                        />
                    </Grid>
                </Grow>
                <Grow in timeout={1.5 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CardStatisticsVertical
                            stats='$13.4k'
                            color='success'
                            trendNumber='+38%'
                            title='Total Sales'
                            chipText='Last Six Month'
                            icon={<Icon icon='mdi:currency-usd' />}
                        />
                    </Grid>
                </Grow>
                <Grow in timeout={2 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CrmTotalProfit />
                    </Grid>
                </Grow>
                <Grow in timeout={2.5 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CrmTotalGrowth />
                    </Grid>
                </Grow>
                <Grow in timeout={3 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CrmTotalGrowth />
                    </Grid>
                </Grow>
                <Grow in timeout={3.5 * 500}>
                    <Grid item xs={12} sm={3} md={2}>
                        <CrmTotalProfit />
                    </Grid>
                </Grow>

                <Grow in timeout={2.5 * 500}>
                    <Grid item xs={12} sm={6} md={4}>
                        <CrmSocialNetworkVisits />
                    </Grid>
                </Grow>
                <Grow in timeout={3 * 500}>
                    <Grid item xs={12} sm={6} md={4}>
                        <CrmMonthlyBudget />
                    </Grid>
                </Grow>
                <Grow in timeout={4 * 500}>
                    <Grid item xs={12} sm={6} md={4}>
                        <CrmMeetingSchedule />
                    </Grid>
                </Grow>
                <Grow in timeout={6 * 500}>
                    <Grid item xs={12} sm={6} md={4}>
                        <CrmExternalLinks />
                    </Grid>
                </Grow>

                <Grow in timeout={6.5 * 500}>
                    <Grid item xs={12} md={8}>
                        <CrmTable />
                    </Grid>
                </Grow>
            </Grid>
        </ApexChartWrapper >
    )
}

export default Home
