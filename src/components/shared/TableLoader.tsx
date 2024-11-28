import { useIsScreen } from "@/services/hooks"
import { Skeleton } from "antd"


const TableLoader = ({ simple = false }: { simple?: boolean }) => {

  const { md, lg, xl } = useIsScreen()

  const ccc = xl ? 42 : lg ? 30 : md ? 20 : 10

  return (
    <div>

      {!simple && (

        <div className="flex flex-col gap-1">
          <Skeleton.Input style={{ width: 80 }} active />
          <Skeleton.Input style={{ width: 100 }} active size="small" />
        </div>
      )}


      <div className={`mt-6  ${simple ? '' : 'bg-bg-lighter border-border border rounded-lg px-4 py-6'}`}>
        <div className="flex items-center gap-3">
          <Skeleton.Input active className="flex-1 !w-full" />
          <Skeleton.Button active />
          <Skeleton.Button active />
        </div>

        <div className="flex gap-x-3 gap-y-4 flex-wrap mt-4 justify-between">

          {Array(ccc).fill(0).map((_, i) => (
            <Skeleton.Input key={i} />
          ))}


        </div>

        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <Skeleton.Avatar active />
          <Skeleton.Avatar active />
          <Skeleton.Avatar active />
          <Skeleton.Avatar active />
        </div>
      </div>
    </div>
  )
}

export default TableLoader