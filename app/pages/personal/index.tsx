export default Page((props: any) => {
  const { personal, store: personalStore } = useRedux('personal');


  const modifyPersonalInfo = async (params: any, form: any, field: string) => { // 修改个人信息
    const data = await utils.post('/modify/tb_member', params);
    if (!data.success) {
      $alert(data.message);
    }
    personalStore.updatePersonal({ [field]: params[field] });
    form.set(field, params[field]);
    $success('设置成功');
    router.back();
  }

  const pageData = {
    formSetting: { labelWidth: 40, labelRight: 30 }, // 表单属性
    fields: [
      {
        label: '昵称',
        name: 'name',
        value: {
          arrow: true,
          type: 'text',
          callback: async ({ params, form }: any) => { // 点击箭头表单组件的回调
            modifyPersonalInfo(params, form, 'name');
            return true;
          },
        },
      },
      {
        label: '头像',
        name: 'head',
        value: {
          arrow: true,
          type: 'head',
          hideArrow: true, // 有值的时候隐藏箭头
          placeholder: '',
          callback: async ({ params, form }: any) => {
            modifyPersonalInfo(params, form, 'head');
            return true;
          },
        },
      },
      {
        label: '个性签名',
        name: 'signature',
        value: {
          arrow: true,
          type: 'text',
          rows: 5,
          callback: async ({ params, form }: any) => {
            modifyPersonalInfo(params, form, 'signature');
            return true;
          },
        },
      },
      {
        label: '性别',
        name: 'sex',
        value: {
          arrow: true,
          type: 'select',
          options: ['男', '女'],
          hideArrow: true,
          callback: async ({ params, form }: any) => {
            modifyPersonalInfo(params, form, 'sex');
            return true;
          },
        },
      },
      {
        label: '生日',
        name: 'birthday',
        value: {
          arrow: true,
          type: 'date',
          callback: async ({ params, form }: any) => {
            modifyPersonalInfo(params, form, 'birthday');
            return true;
          },
        },
      },
    ],
  }

  return (
    <Detail pageData={pageData} record={{ ...personal }} noFooter></Detail>
  );
})
