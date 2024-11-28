import { TableProps } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSetSingleSearchParam } from ".";
import { SEARCH_PARAMS_NAMES, TABLE_PER_PAGE_LIMIT } from "../constants";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { useTranslation } from "react-i18next";




const useTableQuery = () => {
  const { t, i18n: { language } } = useTranslation()
  const [searchParams, setSingleSearchParam, setMultiSearchParams] = useSetSingleSearchParam()

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(TABLE_PER_PAGE_LIMIT);
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')




  useEffect(() => {
    // page 
    const p = searchParams?.get(SEARCH_PARAMS_NAMES.page)
    if (p && !isNaN(Number(p)) && Number(p) !== page) {
      setPage(Number(p))
    }
    // perPage
    const pz = searchParams?.get(SEARCH_PARAMS_NAMES.limit)
    if (pz && !isNaN(Number(pz)) && Number(pz) !== perPage) {
      setPerPage(Number(pz))
    }
    // sort
    const s = searchParams?.get(SEARCH_PARAMS_NAMES.sort)
    if (s && s !== sort) {
      setSort(s)
    }
    // search
    const sr = searchParams?.get(SEARCH_PARAMS_NAMES.search)
    if (sr && sr !== search) {
      setSearch(sr)
    }
    // filter
    const f = searchParams?.get(SEARCH_PARAMS_NAMES.filter)
    if (f && f !== filter) {
      setFilter(f)
    }

  }, [])


  // change url query param on change any value
  useEffect(() => {
    setMultiSearchParams([
      {
        key: SEARCH_PARAMS_NAMES.page,
        value: page + ''
      },
      {
        key: SEARCH_PARAMS_NAMES.limit,
        value: perPage !== TABLE_PER_PAGE_LIMIT ? perPage + '' : ''
      },
      {
        key: SEARCH_PARAMS_NAMES.sort,
        value: sort
      },
      {
        key: SEARCH_PARAMS_NAMES.search,
        value: search + ''
      },
      {
        key: SEARCH_PARAMS_NAMES.filter,
        value: filter + ''
      }
    ])

  }, [page, perPage, sort, search, filter])


  const handleTableChange: TableProps<any>['onChange'] = (pagination, filters, sorter: any) => {


    if (sorter && sorter?.order) {
      const field = sorter?.field || ''
      const order = sorter?.order === "ascend" ? '' : '-'
      setSort(order + field)
    } else {
      setSort('')
    }

  };


  const getColumns = useCallback(function <T>({ data, sorter = true, actions, actionsFn, allowSort }: { data: T[], sorter?: boolean, actions?: React.ReactNode, actionsFn?: (record: T) => React.ReactNode, allowSort?: boolean }) {


    if (!data || !data?.length) return []

    const singleEl = data[0]

    if (!singleEl || typeof singleEl !== 'object') return []
    const columns: ColumnsType<T> = []


    const sField = sort && sort.includes('-') ? sort.replace('-', '') : sort
    const sOrder = sort && sort.includes('-') ? 'descend' : 'ascend'

    Object.entries(singleEl).forEach(([key, value]) => {
      if (key === 'id') return
      if (key === 'body') return
      // if (typeof value === 'object') 


      // const title = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      const title = t(key)
      const sortOrder = sField === key ? sOrder : undefined

      const col: ColumnType<T> = {
        title: <div className="whitespace-nowrap"> {title} </div>,
        dataIndex: key,
        sorter: allowSort ? sorter : undefined,
      }
      if (sortOrder) {
        col.sortOrder = sortOrder
      }
      if (key === 'is_active') {
        columns.push({
          ...col,
          render: (value) => {
            return value ? 'Yes' : 'No'
          }
        })
        return
      }
      columns.push(col)
    })

    const isAr = language === 'ar'
    if (actions) {
      columns.push({
        title: '',
        dataIndex: 'actions',
        fixed: isAr ? 'left' : "right",
        render: () => actions
      })
    } else if (actionsFn) {
      columns.push({
        title: '',
        dataIndex: 'id',
        fixed: isAr ? 'left' : "right",
        render: actionsFn
      })
    }



    return columns
  }, [sort])


  const apiExtraParams = useMemo(() => {
    let slug = `page=${page}&per_page=${perPage}`

    if (sort) {
      slug += `&sort=${sort}`
    }

    if (search && filter) {
      slug += `&filter[${filter}]=${search}`
    }

    return slug
  }, [page, perPage, sort, search, filter])




  return {
    page, perPage, sort, search, filter, apiExtraParams,
    setPage, setPerPage, setSort, setSearch, setFilter,
    handleTableChange, getColumns
  }
}

export default useTableQuery