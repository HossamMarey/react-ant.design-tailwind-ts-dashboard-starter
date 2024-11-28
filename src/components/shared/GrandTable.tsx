import { useSetSingleSearchParam, useTableQuery } from "@/services/hooks"
import { Button, Input, Modal, Pagination, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { SearchNormal1 } from "iconsax-react"
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import debounce from 'lodash.debounce';
import { SEARCH_PARAMS_NAMES } from "@/services/constants"
import { TableRowSelection } from "antd/es/table/interface"
import { SelectedRowsActionsContainer } from "."
import { useTranslation } from "react-i18next"


interface GrandTapleProps<T> {
  total: number
  searchKey?: string
  showSizeChanger?: boolean
  // columns: ColumnsType<T>
  data: T[]
  isLoading?: boolean
  setSelected?: (selected: any[]) => void
  selectChildren?: React.ReactNode
  underSearch?: React.ReactNode
  actions?: React.ReactNode
  actionsFn?: (record: T) => React.ReactNode
  allowSort?: boolean
  isLocalPagination?: boolean
  showSearch?: boolean
}

const GrandTable: FC<GrandTapleProps<any>> = ({ total, searchKey = '', showSizeChanger = true, data, isLoading = false, setSelected, selectChildren, actions, actionsFn, allowSort = false, isLocalPagination = false, showSearch = false, underSearch }) => {

  const { t } = useTranslation()
  const [searchParams] = useSetSingleSearchParam()

  const [searchValue, setSearchValue] = useState<string>(searchParams?.get(SEARCH_PARAMS_NAMES.search) || '');

  const { perPage, page, setPage, setPerPage, handleTableChange, getColumns, setSearch, setFilter } = useTableQuery()


  const columns = getColumns({ data, actions, actionsFn, allowSort })



  const handleSearch = useCallback(debounce((val?: string) => {
    setSearch(val || '')
    if (searchKey) {

      setFilter(val ? searchKey : '')
    }
  }, 500), [])






  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue])



  const [isModal, setIsModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setSelected && setSelected(newSelectedRowKeys)
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (keys) => onSelectChange(keys as number[]),
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,

    ],
  };

  useEffect(() => {
    if (selectedRowKeys.length === 0) {
      setIsModal(false)
    } else {
      setIsModal(true)
    }
  }, [selectedRowKeys])


  // ******** END ROW SELECTION ********** //


  return (
    <div >



      <div>

        {(searchKey || showSearch) && !isLoading && (
          <div className="mb-4">
            <Input
              size="large"
              className=" bg-bg/50 "
              placeholder={searchKey ? " Search in " + searchKey.replace(',', ' or ') : t('search')}
              allowClear
              prefix={<SearchNormal1 size={20} />}
              disabled={isLoading}
              value={searchValue}
              autoFocus={!!searchValue}
              onChange={e => setSearchValue(e.target.value || '')}

            />
          </div>
        )}

        {!!underSearch && (
          <div className="mb-4">
            {underSearch}
          </div>
        )}

        <div className="max-w-full  overflow-x-auto ">
          <Table
            rowSelection={selectChildren ? rowSelection : undefined}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={isLocalPagination ? {
              total,
              pageSize: 10,
              showSizeChanger: true
            } : false}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </div>
      </div>

      {!isLoading && !isLocalPagination && (
        <div className="p-4 flex items-center justify-center mt-5">
          <Pagination
            total={total}
            current={page}
            pageSize={perPage}
            showSizeChanger={showSizeChanger}
            onChange={(p, pz) => {
              setPage(p)
              setPerPage(pz)
            }} />
        </div>
      )}

      <Modal
        open={isModal}
        destroyOnClose
        footer={null}
        maskStyle={{ backgroundColor: 'transparent', pointerEvents: 'none' }}
        maskClosable={false}
        rootClassName="modal__scroll"
        className=" modal__basic"
        width={900}
        style={{ top: '75vh' }}
        onCancel={() => setIsModal(false)}
        closable={false}

      >
        <SelectedRowsActionsContainer
          close={() => {
            setIsModal(false)
            setSelectedRowKeys([])
          }}
        >

          {selectChildren}
        </SelectedRowsActionsContainer>
      </Modal>

    </div>
  )
}

export default GrandTable