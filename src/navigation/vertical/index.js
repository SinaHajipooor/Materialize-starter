const navigation = () => {
    return [
        {
            title: 'داشبورد',
            path: '/home',
            icon: 'mdi:home-outline',
        },
        {
            title: 'سوابق فعالیت',
            path: '/activityHistories',
            icon: 'mdi:person-outline',
        },
        {
            title: 'نقشه',
            path: '/map',
            icon: 'mdi:map-outline',
        },

        //     {
        //       path: '/acl',
        //       action: 'read',
        //       subject: 'acl-page',
        //       title: 'Access Control',
        //       icon: 'mdi:shield-outline',
        //     }
    ]
}

export default navigation
