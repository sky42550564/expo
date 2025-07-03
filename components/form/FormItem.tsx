export default ({
  value = {},
  ...attrs
}: any) => {
  const props = { ..._.omit(attrs, 'value'), ...value };
  if (['text', 'name', 'phone', 'email', 'password', 'idNo', 'textPlate'].includes(value.type)) return <FormTextItem  {...props} />;
  if (['number'].includes(value.type)) return <FormNumberItem  {...props} />;
  if (['number'].includes(value.type)) return <FormNumberItem  {...props} precision={2} ratio={100} unit='元' />;
  if (['image', 'head', 'images'].includes(value.type)) return <FormImageItem  {...props} />;
  if (['bool'].includes(value.type)) return <FormBoolItem  {...props} />;
  if (['switch'].includes(value.type)) return <FormSwitchItem  {...props} />;
  if (['radio'].includes(value.type)) return <FormRadioItem  {...props} />;
  if (['checkbox'].includes(value.type)) return <FormCheckboxItem  {...props} />;
  if (['year', 'month', 'day', 'hour', 'minute', 'second', 'week', 'week-day'].includes(value.type)) return <FormDateItem  {...props} />;
  if (['city'].includes(value.type)) return <FormCityItem  {...props} />;
  if (['region'].includes(value.type)) return <FormRegionItem  {...props} />;
  if (['selectTree'].includes(value.type)) return <FormSelectTreeItem  {...props} />;
  if (['picker'].includes(value.type)) return <FormPickerItem  {...props} />;
  if (['slider'].includes(value.type)) return <FormSliderItem  {...props} />;
  if (['score'].includes(value.type)) return <FormScoreItem  {...props} />;
  return <FormPlainItem  {...props} />;
};
