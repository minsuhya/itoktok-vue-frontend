import { queryUserList, type UserListQuery, type UserInfo } from '@/api/management/user'
import useLoading from '@/hooks/loading'
import { type Pagination } from '@/types/global'
import { exchangeArray } from '@/utils/sort'
import {
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
  name: ViewNames.manageUser,
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

    const renderData = ref<UserInfo[]>([])
    const searchQuery = ref<UserListQuery>({
      name: '',
      birth: '',
      hp: '',
      userId: '',
      status: '',
      birthMonth: '',
      gender: ''
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
        const { data } = await queryUserList(params)

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
        getTitle: () => t('No'),
        dataIndex: 'number',
        checked: true
      },
      {
        getTitle: () => t('이름'),
        dataIndex: 'name',
        checked: true
      },
      {
        getTitle: () => t('성별'),
        dataIndex: 'gender',
        checked: true
      },
      {
        getTitle: () => t('생년월일'),
        dataIndex: 'birth',
        checked: true
      },
      {
        getTitle: () => t('전화번호'),
        dataIndex: 'hp',
        checked: true
      },
      {
        getTitle: () => t('주소'),
        dataIndex: 'address',
        checked: true
      },
      {
        getTitle: () => t('장애정보'),
        dataIndex: 'disability',
        checked: true
      },
      {
        getTitle: () => t('초기상담일'),
        dataIndex: 'firstConsultedTime',
        checked: true
      },
      {
        getTitle: () => t('상태'),
        dataIndex: 'status',
        checked: true
      },
      {
        getTitle: () => t('최종수정'),
        dataIndex: 'updatedTime',
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
          return ret
        })
    })

    return () => (
      <div>
        <Card class="general-card " title={t('이용자 관리')}>
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
                {t('등록')}
              </Button>
            </Space>
            <Space size="medium">
              <Button
                v-slots={{
                  icon: () => <IconDownload />
                }}
              >
                {t('searchTable.operation.download')}
              </Button>
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
