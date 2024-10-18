

import { MainHeader } from "."
import { DashMenu } from "../dashboard/sidebar"



const DashboardHeader = () => {


  return (
    <MainHeader
      Menu={<DashMenu />}

      rightSide={<>

      </>}

    >
      {/* {isShowPortalRoutes && (
        <HeaderAdvancedSearch />
      )} */}
    </MainHeader>
  )
}

export default DashboardHeader