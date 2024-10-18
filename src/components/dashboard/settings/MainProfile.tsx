
import { Edit, } from "iconsax-react"
import UserProfileData from "./UserProfileData"
import UserGroups from "./UserGroups"
import { Link, useLocation } from "react-router-dom"

import { Button } from "antd"
import { getDashboardSubPath } from "@/services/constants"


const MainProfile = () => {
    const pathname = useLocation().pathname
    const usersUrl = getDashboardSubPath('organization', 'organization-users')
    const changePasswordUrl = getDashboardSubPath('profile', 'change-password')

    // if (isLoading) return <div className="flex flex-col gap-6">
    //     <div className="flex items-center justify-between">

    //         <div className="flex flex-col gap-3">
    //             <Skeleton.Input className="!w-32" active />
    //             <Skeleton.Input className="!w-20" active />
    //         </div>
    //         <div className="flex items-center gap-4">
    //             <Skeleton.Input className="!w-16" active />
    //             <Skeleton.Input className="!w-16" active />
    //         </div>
    //     </div>
    //     <div className="flex flex-col gap-4">

    //         {Array.from({ length: 2 }).map((_, i) => <Skeleton.Input className="!w-full !h-64" active />)}
    //     </div>

    // </div>

    // if (error) return <ErrorMessage error={error} refetch={refetch} />
    // if (!data) return <Empty />

    return (
        <div className="flex flex-col gap-6">
            <h1> Profile </h1>
            <div className="flex items-center gap-3">

                <Link to={`${changePasswordUrl}?next=${pathname}`}>
                    <Button icon={<Edit />}   > changePassword </Button>
                </Link>
                <Link to={`${usersUrl}/${'data?.id'}/edit?next=${pathname}`}>
                    <Button icon={<Edit />}   > edit</Button>
                </Link>
            </div>

            <div>
                <UserProfileData />
            </div>

            <div>
                <UserGroups />
            </div>
        </div>
    )
}

export default MainProfile