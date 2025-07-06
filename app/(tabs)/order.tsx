import { Text, View } from 'react-native';

export default function HomeScreen() {
  const listRef = useRef(null); // 列表的引用

  const getList = async ({ params }: any) => {
    console.log('=================params', params);
    // 获取列表
    return await utils.post("/list/student", {
      ...params,
    });
  };

  const pageData = {
    tabs: {
      // tabs页面
      map: [
        // 审核状态
        { class: 1, label: "第一班" },
        { class: 2, label: "第二班" },
      ],
      field: "class", // 对应map的值的字段
      hasAll: false, // 是否有所有的
    },
    apis: {
      list: getList,
    },
  };
  const refreshList = async () => {
    // 刷新
    listRef.value && listRef.value.refreshList();
  };

  return (
    <TabsPage pageData={pageData} ref={listRef}>
    </TabsPage >
  );
}
