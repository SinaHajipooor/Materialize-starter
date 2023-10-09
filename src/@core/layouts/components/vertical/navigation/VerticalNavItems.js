// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useSession } from 'next-auth/react'

const resolveNavItemComponent = item => {
    if (item.sectionTitle) return VerticalNavSectionTitle
    if (item.children) return VerticalNavGroup

    return VerticalNavLink
}

const VerticalNavItems = props => {

    const session = useSession()

    // ** Props
    const { verticalNavItems } = props

    const RenderMenuItems = verticalNavItems?.map((item, index) => {
        const TagName = resolveNavItemComponent(item)

        if (session?.data?.user?.role === 'manager' && item.title === 'کاربر') {
            return <></>
        }

        return <TagName {...props} key={index} item={item} />
    })

    return <>{RenderMenuItems}</>
}

export default VerticalNavItems
