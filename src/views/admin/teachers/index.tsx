// import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
import { queryTeacherList, type TeacherQuery, type TeacherRecord } from '@/api/admin/teacher'
import useLoading from '@/hooks/loading'
import { type Pagination } from '@/types/global'
import { exchangeArray } from '@/utils/sort'
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Link,
  Popover,
  Space,
  Table,
  Tooltip,
  Upload,
  type PaginationProps,
  type TableColumnData
} from '@arco-design/web-vue'
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import Sortable from 'sortablejs'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableSearchForm from './TableSearchForm'
import { ViewNames } from '@/types/constants'
import usePermission from '@/hooks/permission'

export default defineComponent({
  name: ViewNames.searchTable,
  setup() {
    const { t } = useI18n()
    const { checkButtonPermission } = usePermission()
    const initPagination: Pagination = {
      current: 1,
      pageSize: 20
    }
    const paginationConfig = ref<PaginationProps & Pagination>({
      ...initPagination,
      showTotal: true
    })
    const resetPagination = () => {
      paginationConfig.value = {
        ...paginationConfig.value,
        ...initPagination
      }
    }
    const handleCurrentChange = (page: number) => {
      paginationConfig.value.current = page
      fetchData()
    }
    const handlePageSizeChange = (pageSize: number) => {
      paginationConfig.value.pageSize = pageSize
      fetchData()
    }
    const handleQuerySearch = () => {
      resetPagination()
      fetchData()
    }
    // =============== DIVIDER ==================
    // table size change
    type TableSize = 'medium' | 'mini' | 'small' | 'large'
    const tableSize = ref<TableSize>('medium')
    const densityList = computed(() => [
      {
        name: t('searchTable.size.mini'),
        value: 'mini'
      },
      {
        name: t('searchTable.size.small'),
        value: 'small'
      },
      {
        name: t('searchTable.size.medium'),
        value: 'medium'
      },
      {
        name: t('searchTable.size.large'),
        value: 'large'
      }
    ])
    const handleSelectDensity = (val: unknown) => {
      tableSize.value = val as TableSize
    }

    // =============== DIVIDER ==================
    // fetch data logic

    const renderData = ref<TeacherRecord[]>([])
    const searchQuery = ref<TeacherQuery>({
      is_active: true,
      full_name: ''
    })

    const { loading, setLoading } = useLoading()
    const fetchData = async () => {
      setLoading(true)
      try {
        const query = searchQuery.value
        const params = {
          ...query,
          current: paginationConfig.value.current,
          pageSize: paginationConfig.value.pageSize
        }
        const { data } = await queryTeacherList(params)
        console.log('data:', data)

        renderData.value = data.list
        paginationConfig.value.total = data.total
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    // =============== DIVIDER ==================
    // table columns render logic

    const colList = ref([
      {
        getTitle: () => '이름',
        dataIndex: 'full_name',
        checked: true
      },
      {
        getTitle: () => '직급(호징)',
        dataIndex: 'position',
        checked: true
      },
      {
        getTitle: () => '생년월일',
        dataIndex: 'birthdate',
        checked: true
      },
      {
        getTitle: () => '휴대전화번호',
        dataIndex: 'mobile_number',
        checked: true
      },
      {
        getTitle: () => '업무전화번호',
        dataIndex: 'office_number',
        checked: true
      },
      {
        getTitle: () => '로그인 계정',
        dataIndex: 'username',
        checked: true
      },
      {
        getTitle: () => '계정상태',
        dataIndex: 'is_active',
        checked: true
      },
      {
        getTitle: () => '최종로그인일시',
        dataIndex: 'updated_at',
        checked: true
      },
      {
        getTitle: () => '작업',
        dataIndex: 'operations',
        render: () => checkButtonPermission(['admin']) && <Link>View</Link>,
        checked: true
      }
    ])

    const popupVisibleChange = (val: boolean) => {
      if (val) {
        nextTick(() => {
          const el = document.getElementById('tableSetting') as HTMLElement
          new Sortable(el, {
            onEnd(e: any) {
              const { oldIndex, newIndex } = e
              exchangeArray(colList.value, oldIndex, newIndex)
            }
          })
        })
      }
    }
    const tableColumns = computed(() => {
      return colList.value
        .filter((col) => col.checked)
        .map((item) => {
          const ret: TableColumnData = {
            title: item.getTitle(),
            dataIndex: item.dataIndex
          }
          if (item.render) ret.render = item.render as unknown as TableColumnData['render']
          return ret
        })
    })

    return () => (
      <div>
        <Card class="general-card " title={t('menu.list.searchTable')}>
          <TableSearchForm
            searchLoading={loading.value}
            searchQuery={searchQuery.value}
            onOnSearch={handleQuerySearch}
          />
          <Divider />
          <div class="flex justify-between mb-4">
            <Space>
              <Button
                v-slots={{
                  icon: () => <IconPlus />
                }}
                type="primary"
              >
                {t('searchTable.operation.create')}
              </Button>
            </Space>
            <Space size="medium">
              <Dropdown onSelect={handleSelectDensity}>
                {{
                  default: () => (
                    <Tooltip content={t('searchTable.actions.density')}>
                      <IconLineHeight class="cursor-pointer" size="18" />
                    </Tooltip>
                  ),
                  content: () =>
                    densityList.value.map((item) => (
                      <Dropdown.Option value={item.value}>
                        <span>{item.name}</span>
                      </Dropdown.Option>
                    ))
                }}
              </Dropdown>
              <Tooltip content={t('searchTable.actions.columnSetting')}>
                <Popover trigger="click" position="left" onPopupVisibleChange={popupVisibleChange}>
                  {{
                    content: () => (
                      <div id="tableSetting">
                        {colList.value.map((item) => (
                          <div class="w-32">
                            <Space>
                              <IconDragArrow class="cursor-move" />
                              <Checkbox v-model={item.checked} />
                              <div
                                class="text-ellipsis whitespace-nowrap  overflow-hidden w-20"
                                title={item.getTitle()}
                              >
                                {item.getTitle()}
                              </div>
                            </Space>
                          </div>
                        ))}
                      </div>
                    ),
                    default: () => <IconSettings size="18" class="cursor-pointer" />
                  }}
                </Popover>
              </Tooltip>
            </Space>
          </div>
          <Table
            loading={loading.value}
            data={renderData.value}
            bordered={false}
            size={tableSize.value}
            pagination={paginationConfig.value as PaginationProps}
            columns={tableColumns.value}
            onPageChange={handleCurrentChange}
            onPageSizeChange={handlePageSizeChange}
          ></Table>
        </Card>
      </div>
    )
  }
})
