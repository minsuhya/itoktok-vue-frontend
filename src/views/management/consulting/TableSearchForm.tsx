import type { BoardQuery } from '@/api/board'
import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import {
  Button,
  Form,
  Grid,
  Input,
  Select,
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
      type: Object as PropType<BoardQuery>,
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

    const contentTypeOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('searchTable.form.contentType.img'),
        value: 'img'
      },
      {
        label: t('searchTable.form.contentType.horizontalVideo'),
        value: 'horizontalVideo'
      },
      {
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo'
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
              <Form.Item field="title" label={t('제목')}>
                <Input
                  v-model={props.searchQuery.title}
                  placeholder={t('제목')}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={colSpan.value}>
              <Form.Item field="contentType" label={t('구분')}>
                <Select
                  v-model={props.searchQuery.contentType}
                  options={contentTypeOptions.value}
                  placeholder={t('구분')}
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
