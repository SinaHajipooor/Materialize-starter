const navigation = () => {


    return [
        {
            title: 'داشبورد',
            path: '/',
            icon: 'mdi:home-outline',
        },
        {
            title: 'تقویم',
            path: '/calendar',
            icon: 'mdi:calendar-outline',
        },
        {
            title: 'اعضای سیستم',
            icon: 'mdi:users-outline',
            children: [
                {
                    title: 'مدیر',
                    path: '/authorize/manager'
                },
                {
                    title: 'ادمین',
                    path: '/authorize/admin'
                },
                {
                    title: 'کاربر',
                    path: '/authorize/user'
                },
            ]
        },

        {
            title: 'SSG',
            path: '/activityHistories',
            icon: 'mdi:person-outline',
        },
        {
            title: 'SSR',
            path: '/ssr',
            icon: 'mdi:home-outline',
        },
        {
            title: 'فرم چند مرحله‌ای',
            path: '/wizard',
            icon: 'mdi:home-outline',
        },
        {
            title: 'نقشه',
            path: '/map',
            icon: 'mdi:map-outline',
        },
        {
            title: 'آپلود فایل',
            path: '/filepondTest',
            icon: 'mdi:upload-outline',
        },
    ]
}

export default navigation
