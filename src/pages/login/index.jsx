// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { signIn } from 'next-auth/react'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '48rem',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '38rem'
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
})

const defaultValues = {
    password: 'admin',
    email: 'admin@materialize.com'
}

const LoginPage = () => {
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    // ** Hooks
    //     const auth = useAuth()
    const theme = useTheme()
    const bgColors = useBgColor()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    // ** Vars
    const { skin } = settings
    const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        const { email, password } = data
        auth.login({ email, password, rememberMe }, () => {
            setError('email', {
                type: 'manual',
                message: 'Email or Password is invalid'
            })
        })
    }

    // user info 
    const [user, setUser] = useState({ username: '', password: '' })

    const [isLoading, setIsLoading] = useState(false)

    // router obj
    const router = useRouter()

    // onChange handler 
    function onChangeHandler(e, fieldName) {
        setUser((curUser) => ({ ...curUser, [fieldName]: e.target.value }))
    }

    // onLogin handler
    async function onLoginHandler(e) {
        setIsLoading(true)
        e.preventDefault()
        const response = await signIn('credentials', { username: user.username, password: user.password, redirect: false });
        if (response?.error) {
            toast.error('اطلاعات وارد شده نادرست است')
            setIsLoading(false)

            return;
        } else {
            setIsLoading(false)
            router.push('/')
            toast.success('خوش آمدید')
        }
    }


    return (
        <Box className='content-right' >
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginIllustrationWrapper>
                        <LoginIllustration
                            alt='login-illustration'
                            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                        />
                    </LoginIllustrationWrapper>
                    <FooterIllustrationsV2 />
                </Box>
            ) : null}
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={{
                        p: 7,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper'
                    }}
                >
                    <BoxWrapper>
                        <Box
                            sx={{
                                top: 30,
                                left: 40,
                                display: 'flex',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fill={theme.palette.primary.main}
                                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                                />
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fillOpacity='0.4'
                                    fill='url(#paint0_linear_7821_79167)'
                                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                                />
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fill={theme.palette.primary.main}
                                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                                />
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fill={theme.palette.primary.main}
                                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                                />
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fillOpacity='0.4'
                                    fill='url(#paint1_linear_7821_79167)'
                                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                                />
                                <rect
                                    rx='25.1443'
                                    width='50.2886'
                                    height='143.953'
                                    fill={theme.palette.primary.main}
                                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                                />
                                <defs>
                                    <linearGradient
                                        y1='0'
                                        x1='25.1443'
                                        x2='25.1443'
                                        y2='143.953'
                                        id='paint0_linear_7821_79167'
                                        gradientUnits='userSpaceOnUse'
                                    >
                                        <stop />
                                        <stop offset='1' stopOpacity='0' />
                                    </linearGradient>
                                    <linearGradient
                                        y1='0'
                                        x1='25.1443'
                                        x2='25.1443'
                                        y2='143.953'
                                        id='paint1_linear_7821_79167'
                                        gradientUnits='userSpaceOnUse'
                                    >
                                        <stop />
                                        <stop offset='1' stopOpacity='0' />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                                {themeConfig.templateName}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 8 }}>
                            <TypographyStyled variant='h5'>{`به سامانه تستی حاجی خوش آمدید👋🏻`}</TypographyStyled>
                            <Typography variant='body2'>لطفا اطلاعات حساب کاربری خود را وارد کنید</Typography>
                        </Box>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='نام کاربری'
                                            value={user.username}
                                            onBlur={onBlur}
                                            onChange={(e) => onChangeHandler(e, 'username')}
                                        />
                                    )}
                                />
                                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel
                                    htmlFor='auth-login-v2-password'
                                >
                                    رمز عبور
                                </InputLabel>
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <OutlinedInput
                                            value={user.password}
                                            onBlur={onBlur}
                                            label='Password'
                                            onChange={(e) => onChangeHandler(e, 'password')}
                                            id='auth-login-v2-password'
                                            error={Boolean(errors.password)}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onMouseDown={e => e.preventDefault()}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{ mb: 5, mt: 8, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <Typography
                                    variant='body2'
                                    component={Link}
                                    href='/forgot-password'
                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                >
                                    رمز خود را فراموش کردم
                                </Typography>
                                <Typography
                                    variant='body2'
                                    component={Link}
                                    href='/forgot-password'
                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                >
                                    ورود با تلفن همراه
                                </Typography>
                            </Box>
                            <Button disabled={isLoading} onClick={onLoginHandler} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7, fontFamily: 'inherit' }}>
                                ورود
                            </Button>
                            <Box mb={20} sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ mr: 2, color: 'text.secondary' }}>حسابی ندارید ؟</Typography>
                                <Typography href='/register' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                    ثبت نام
                                </Typography>
                            </Box>
                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper>
        </Box>
    )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
