import type { UserListQuery } from '@/api/management/user'
import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import {
  Button,
  Form,
  Grid,
  Input,
  Select,
  DatePicker,
  type FormInstance,
  type SelectOptionData
} from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'

export default defineComponent({
  name: 'TableSearchForm',
  emits: ['onSearch'],
  props: {
    searchQuery: {
      type: Object as PropType<UserListQuery>,
      required: true
    },
    searchLoading: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const { currentLocale } = useLocale()

    const formRef = ref<FormInstance>()

    const genderOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('남성'),
        value: 'M'
      },
      {
        label: t('여성'),
        value: 'F'
      }
    ])

    const statusOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('미등록'),
        value: '0'
      },
      {
        label: t('등록'),
        value: '1'
      }
    ])

    const colSpan = computed(() => {
      if (currentLocale.value === LocaleOptions.en) return 12
      return 8
    })
    return () => (
      <div class="flex">
        <Form
          ref={formRef}
          class={styles.form}
          model={props.searchQuery}
          labelAlign="left"
          labelColProps={{
            span: 2
          }}
          wrapperColProps={{
            span: 19
          }}
        >
          <Grid.Row gutter={8}>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="name" label={t('이름')}>
                <Input
                  v-model={props.searchQuery.name}
                  placeholder={t('이름')}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="birthMonth" label={t('생년월')}>
                <DatePicker class="w-full" v-model={props.searchQuery.birthMonth} />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="hp" label={t('전화번호')}>
                <Input
                  v-model={props.searchQuery.hp}
                  placeholder={t('전화번호')}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="userId" label={t('아이디')}>
                <Input
                  v-model={props.searchQuery.userId}
                  placeholder={t('아이디')}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="status" label={t('상태')}>
                <Select
                  v-model={props.searchQuery.status}
                  options={statusOptions.value}
                  placeholder={t('상태')}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="gender" label={t('성별')}>
                <Select
                  v-model={props.searchQuery.gender}
                  options={genderOptions.value}
                  placeholder={t('성별')}
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form>
        <div class={[styles['button-area']]}>
          <Button
            loading={props.searchLoading}
            class="mb-5"
            type="primary"
            v-slots={{
              icon: () => <IconSearch />
            }}
            onClick={() => emit('onSearch')}
          >
            {t('searchTable.form.search')}
          </Button>
          <Button
            loading={props.searchLoading}
            onClick={() => {
              formRef.value?.resetFields()
              emit('onSearch')
            }}
            v-slots={{
              icon: () => <IconRefresh />
            }}
          >
            {t('searchTable.form.reset')}
          </Button>
        </div>
      </div>
    )
  }
})
